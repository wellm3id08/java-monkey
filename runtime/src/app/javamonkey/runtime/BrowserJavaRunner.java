package app.javamonkey.runtime;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.PrintStream;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.lang.reflect.Modifier;
import java.net.URI;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import javax.tools.Diagnostic;
import javax.tools.DiagnosticCollector;
import javax.tools.ForwardingJavaFileManager;
import javax.tools.JavaCompiler;
import javax.tools.JavaFileManager;
import javax.tools.JavaFileObject;
import javax.tools.SimpleJavaFileObject;
import javax.tools.StandardJavaFileManager;
import javax.tools.ToolProvider;

public final class BrowserJavaRunner {
    private static final String SEPARATOR = "\u001e";

    private BrowserJavaRunner() {
    }

    public static String run(String fileName, String source, String input) {
        if (source == null || source.isBlank()) {
            return result("compile_error", "The editor is empty.");
        }
        if (source.contains("System.exit(") || source.contains("Runtime.getRuntime().halt(") || source.contains("Runtime.getRuntime().exit(")) {
            return result("runtime_error", "Process termination is not supported in the browser runner.");
        }

        JavaCompiler compiler = ToolProvider.getSystemJavaCompiler();
        if (compiler == null) {
            return result("system_error", "The Java compiler is not available in this runtime.");
        }

        DiagnosticCollector<JavaFileObject> diagnostics = new DiagnosticCollector<>();
        Map<String, byte[]> classes = new LinkedHashMap<>();
        String safeFileName = normalizeFileName(fileName);

        try (StandardJavaFileManager standard = compiler.getStandardFileManager(diagnostics, Locale.ENGLISH, StandardCharsets.UTF_8);
             MemoryFileManager fileManager = new MemoryFileManager(standard, classes)) {
            JavaFileObject sourceFile = new SourceFile(safeFileName, source);
            JavaCompiler.CompilationTask task = compiler.getTask(
                null,
                fileManager,
                diagnostics,
                List.of("-proc:none"),
                null,
                List.of(sourceFile)
            );

            if (!Boolean.TRUE.equals(task.call())) {
                return result("compile_error", formatDiagnostics(safeFileName, diagnostics));
            }
        } catch (Exception error) {
            return result("system_error", error.getClass().getSimpleName() + ": " + message(error));
        }

        if (classes.isEmpty()) {
            return result("compile_error", "Compilation did not produce any class files.");
        }

        return execute(classes, safeFileName, input == null ? "" : input);
    }

    private static String execute(Map<String, byte[]> classes, String fileName, String input) {
        MemoryClassLoader loader = new MemoryClassLoader(classes);
        Method main;
        try {
            main = findMain(loader, classes, fileName);
        } catch (Exception error) {
            return result("runtime_error", message(error));
        }

        PrintStream originalOut = System.out;
        PrintStream originalErr = System.err;
        InputStream originalIn = System.in;
        ByteArrayOutputStream output = new ByteArrayOutputStream();

        try (PrintStream stream = new PrintStream(output, true, StandardCharsets.UTF_8)) {
            System.setOut(stream);
            System.setErr(stream);
            System.setIn(new ByteArrayInputStream(input.getBytes(StandardCharsets.UTF_8)));

            try {
                main.invoke(null, (Object) new String[0]);
            } catch (InvocationTargetException error) {
                Throwable cause = error.getCause() == null ? error : error.getCause();
                cause.printStackTrace(stream);
                return result("runtime_error", output.toString(StandardCharsets.UTF_8));
            } catch (Throwable error) {
                error.printStackTrace(stream);
                return result("runtime_error", output.toString(StandardCharsets.UTF_8));
            }

            return result("ok", output.toString(StandardCharsets.UTF_8));
        } finally {
            System.setOut(originalOut);
            System.setErr(originalErr);
            System.setIn(originalIn);
        }
    }

    private static Method findMain(MemoryClassLoader loader, Map<String, byte[]> classes, String fileName) throws Exception {
        String preferred = fileName.substring(0, fileName.length() - 5);
        List<String> names = new ArrayList<>(classes.keySet());
        names.sort((left, right) -> score(right, preferred) - score(left, preferred));

        for (String name : names) {
            if (name.contains("$")) {
                continue;
            }
            Class<?> type = loader.loadClass(name);
            try {
                Method method = type.getMethod("main", String[].class);
                int modifiers = method.getModifiers();
                if (Modifier.isPublic(modifiers) && Modifier.isStatic(modifiers) && method.getReturnType() == void.class) {
                    return method;
                }
            } catch (NoSuchMethodException ignored) {
            }
        }

        throw new IllegalStateException("No public static void main(String[] args) method was found.");
    }

    private static int score(String className, String preferred) {
        if (className.equals(preferred)) {
            return 3;
        }
        if (className.endsWith("." + preferred)) {
            return 2;
        }
        return 1;
    }

    private static String formatDiagnostics(String fileName, DiagnosticCollector<JavaFileObject> diagnostics) {
        StringBuilder text = new StringBuilder();
        for (Diagnostic<? extends JavaFileObject> diagnostic : diagnostics.getDiagnostics()) {
            if (diagnostic.getKind() != Diagnostic.Kind.ERROR && diagnostic.getKind() != Diagnostic.Kind.WARNING && diagnostic.getKind() != Diagnostic.Kind.MANDATORY_WARNING) {
                continue;
            }
            if (!text.isEmpty()) {
                text.append('\n');
            }
            text.append(fileName);
            if (diagnostic.getLineNumber() > 0) {
                text.append(':').append(diagnostic.getLineNumber());
            }
            text.append(": ")
                .append(diagnostic.getKind().name().toLowerCase(Locale.ROOT))
                .append(": ")
                .append(diagnostic.getMessage(Locale.ENGLISH));
        }
        return text.isEmpty() ? "Compilation failed." : text.toString();
    }

    private static String normalizeFileName(String fileName) {
        String name = fileName == null ? "Main.java" : fileName.trim();
        if (!name.matches("[A-Za-z_$][A-Za-z0-9_$]*\\.java")) {
            return "Main.java";
        }
        return name;
    }

    private static String message(Throwable error) {
        String value = error.getMessage();
        return value == null || value.isBlank() ? error.getClass().getSimpleName() : value;
    }

    private static String result(String status, String output) {
        return status + SEPARATOR + (output == null ? "" : output);
    }

    private static final class SourceFile extends SimpleJavaFileObject {
        private final String source;

        SourceFile(String fileName, String source) {
            super(URI.create("string:///" + fileName), Kind.SOURCE);
            this.source = source;
        }

        @Override
        public CharSequence getCharContent(boolean ignoreEncodingErrors) {
            return source;
        }
    }

    private static final class ClassFile extends SimpleJavaFileObject {
        private final String className;
        private final Map<String, byte[]> classes;
        private final ByteArrayOutputStream output = new ByteArrayOutputStream();

        ClassFile(String className, Kind kind, Map<String, byte[]> classes) {
            super(URI.create("mem:///" + className.replace('.', '/') + kind.extension), kind);
            this.className = className;
            this.classes = classes;
        }

        @Override
        public OutputStream openOutputStream() {
            return new OutputStream() {
                @Override
                public void write(int value) {
                    output.write(value);
                }

                @Override
                public void write(byte[] data, int offset, int length) {
                    output.write(data, offset, length);
                }

                @Override
                public void close() throws IOException {
                    classes.put(className, output.toByteArray());
                    output.close();
                }
            };
        }
    }

    private static final class MemoryFileManager extends ForwardingJavaFileManager<JavaFileManager> {
        private final Map<String, byte[]> classes;

        MemoryFileManager(JavaFileManager fileManager, Map<String, byte[]> classes) {
            super(fileManager);
            this.classes = classes;
        }

        @Override
        public JavaFileObject getJavaFileForOutput(Location location, String className, JavaFileObject.Kind kind, javax.tools.FileObject sibling) {
            return new ClassFile(className, kind, classes);
        }
    }

    private static final class MemoryClassLoader extends ClassLoader {
        private final Map<String, byte[]> classes;

        MemoryClassLoader(Map<String, byte[]> classes) {
            super(BrowserJavaRunner.class.getClassLoader());
            this.classes = classes;
        }

        @Override
        protected Class<?> findClass(String name) throws ClassNotFoundException {
            byte[] data = classes.get(name);
            if (data == null) {
                return super.findClass(name);
            }
            return defineClass(name, data, 0, data.length);
        }
    }
}
