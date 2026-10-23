JM.content.es = {
  "sections": [
    {
      "title": "Primeros pasos",
      "lessons": [
        "fundamentals",
        "first-program"
      ]
    },
    {
      "title": "Datos y entrada",
      "lessons": [
        "variables-constants",
        "data-types",
        "arithmetic-operators",
        "scanner-input"
      ]
    },
    {
      "title": "Decisiones",
      "lessons": [
        "comparisons",
        "logical-operators",
        "if-conditionals",
        "switch-selection"
      ]
    },
    {
      "title": "Bucles",
      "lessons": [
        "while-loop",
        "do-while-loop",
        "for-loop",
        "loop-control"
      ]
    },
    {
      "title": "Herramientas para programas reales",
      "lessons": [
        "text-and-letters",
        "validate-input",
        "money-percentages",
        "counters-accumulators",
        "max-min-position",
        "menu-loop"
      ]
    },
    {
      "title": "Problemas de práctica",
      "lessons": [
        "problem-statistics",
        "problem-menu",
        "problem-tariff"
      ]
    },
    {
      "title": "Arrays y proyecto",
      "lessons": [
        "one-dimensional-arrays",
        "two-dimensional-arrays",
        "final-project"
      ]
    }
  ],
  "lessons": [
    {
      "id": "fundamentals",
      "title": "De un problema a un programa",
      "time": "4 min",
      "idea": "Antes de escribir código, decide qué datos necesitas, qué pasos vas a seguir y qué resultado quieres obtener.",
      "theory": [
        {
          "title": "Algoritmo",
          "text": "Es una lista ordenada y finita de pasos para resolver un problema, como una receta."
        },
        {
          "title": "Pseudocódigo",
          "text": "Describe los pasos antes de programar. En PSeInt se puede escribir `Algoritmo Hola`, `Escribir \"Hola\"` y `FinAlgoritmo`."
        },
        {
          "title": "Programa",
          "text": "Es el algoritmo escrito en un lenguaje que el ordenador puede ejecutar. En Java, las instrucciones se escriben dentro de `main`."
        }
      ],
      "exampleTitle": "Traducir una idea a Java",
      "exampleLead": "El objetivo es mostrar dos pasos de un algoritmo en la consola.",
      "example": "public class Demo01 {\n    public static void main(String[] args) {\n        System.out.println(\"Preparar los datos\");\n        System.out.println(\"Mostrar el resultado\");\n    }\n}",
      "explain": [
        "Cada `println` es un paso que se ejecuta en orden.",
        "Java distingue mayúsculas y minúsculas: `System` no es lo mismo que `system`.",
        "Las instrucciones terminan con `;` y los bloques se delimitan con llaves."
      ],
      "task": "Escribe un programa que muestre “1. Leer los datos” y luego “2. Calcular el resultado”.",
      "think": "Antes de escribir: ¿qué dos líneas deben aparecer y cuál va primero?",
      "steps": [
        "Escribe las dos frases con tus palabras.",
        "Busca la instrucción de Java que muestra una línea de texto.",
        "Úsala una vez por frase, en el orden correcto.",
        "Ejecútalo y compáralo con el resultado esperado."
      ],
      "hints": [
        "Cada frase es una instrucción. Java ejecuta las instrucciones de arriba abajo.",
        "La instrucción es `System.out.println(___);` y el texto va entre comillas dobles. Necesitas dos."
      ],
      "recall": [
        {
          "do": "Mostrar una línea de texto",
          "code": "System.out.println(\"Hola\");"
        },
        {
          "do": "Esqueleto de un programa",
          "code": "public class Nombre {\n    public static void main(String[] args) {\n        // tu código aquí\n    }\n}"
        }
      ],
      "filename": "Ejercicio01.java",
      "starter": "public class Ejercicio01 {\n    public static void main(String[] args) {\n        // Muestra el primer paso\n        // Muestra el segundo paso\n    }\n}",
      "output": "1. Leer los datos\n2. Calcular el resultado",
      "outputNote": "Deben aparecer dos líneas, en el mismo orden.",
      "solution": "public class Ejercicio01 {\n    public static void main(String[] args) {\n        System.out.println(\"1. Leer los datos\");\n        System.out.println(\"2. Calcular el resultado\");\n    }\n}"
    },
    {
      "id": "first-program",
      "title": "Tu primer programa Java",
      "time": "4 min",
      "idea": "Todos los programas Java necesitan una estructura de clase y un punto de entrada llamado `main`.",
      "theory": [
        {
          "title": "`class`",
          "text": "Da nombre a la clase. Si es `public`, el archivo debe tener el mismo nombre."
        },
        {
          "title": "`main`",
          "text": "Es el punto por el que empieza un programa de consola."
        },
        {
          "title": "`print` y `println`",
          "text": "Ambos muestran texto. `println` termina la línea; `print` deja el cursor en la misma línea."
        }
      ],
      "exampleTitle": "Mostrar un saludo",
      "exampleLead": "Este programa imprime una frase y baja a la siguiente línea.",
      "example": "public class Demo02 {\n    public static void main(String[] args) {\n        System.out.println(\"Hola, mundo\");\n    }\n}",
      "explain": [
        "El texto se escribe entre comillas dobles.",
        "Las instrucciones van dentro de las llaves de `main`.",
        "Los comentarios empiezan por `//` y Java no los ejecuta."
      ],
      "task": "Muestra tu nombre y debajo “Estoy aprendiendo Java”. Usa dos `println`.",
      "think": "¿Qué debe quedarse exactamente igual en la plantilla y dónde va tu código?",
      "steps": [
        "Decide las dos líneas: tu nombre y después la frase.",
        "Pon tus instrucciones dentro de las llaves de `main`.",
        "Comprueba que el nombre del archivo y el de la clase coinciden.",
        "Ejecútalo."
      ],
      "hints": [
        "La misma herramienta de la lección anterior: un `println` por cada línea de salida.",
        "`System.out.println(\"___\");` dos veces, dentro de `main`. Cada instrucción termina en `;`."
      ],
      "recall": [
        {
          "do": "Mostrar sin saltar de línea",
          "code": "System.out.print(\"Nombre: \");"
        },
        {
          "do": "Escribir un comentario",
          "code": "// Java ignora esta línea"
        }
      ],
      "filename": "Ejercicio02.java",
      "starter": "public class Ejercicio02 {\n    public static void main(String[] args) {\n        // Escribe tu nombre\n        // Escribe el segundo mensaje\n    }\n}",
      "output": "Me llamo Alex\nEstoy aprendiendo Java",
      "outputNote": "Cambia “Alex” por tu nombre. El formato de las dos líneas es lo importante.",
      "solution": "public class Ejercicio02 {\n    public static void main(String[] args) {\n        System.out.println(\"Me llamo Alex\");\n        System.out.println(\"Estoy aprendiendo Java\");\n    }\n}"
    },
    {
      "id": "variables-constants",
      "title": "Variables y constantes",
      "time": "5 min",
      "idea": "Una variable tiene nombre, tipo y valor. Guarda información para utilizarla después.",
      "theory": [
        {
          "title": "Declarar e inicializar",
          "text": "`int edad = 20;` crea una variable entera y le asigna su primer valor."
        },
        {
          "title": "Cambiar el valor",
          "text": "Después puedes escribir `edad = 21;`. El signo `=` asigna un valor; no compara."
        },
        {
          "title": "Constante con `final`",
          "text": "`final double PI = 3.14159;` indica que ese valor no se debe reasignar."
        }
      ],
      "exampleTitle": "Calcular un total",
      "exampleLead": "Se guarda un precio, una cantidad y el resultado de multiplicarlos.",
      "example": "public class Demo03 {\n    public static void main(String[] args) {\n        double precio = 3.5;\n        int cantidad = 4;\n        double total = precio * cantidad;\n        System.out.println(\"Total: \" + total);\n    }\n}",
      "explain": [
        "El tipo aparece antes del nombre.",
        "`total` guarda el resultado de la operación, no la fórmula.",
        "Usa nombres descriptivos: `precio` dice más que `p`."
      ],
      "task": "Calcula el precio total de 3 entradas que cuestan 8 euros cada una.",
      "think": "¿Qué dos valores conoces? ¿Qué obtienes al combinarlos? ¿Cuál necesita decimales?",
      "steps": [
        "Pon nombre a los dos valores conocidos y elige un tipo para cada uno.",
        "Guarda el resultado de combinarlos en una tercera variable.",
        "Muestra una etiqueta y el resultado en la misma línea."
      ],
      "hints": [
        "Un precio puede tener decimales, un número de entradas no. Eso decide entre `double` e `int`.",
        "`double precio = ___;` `int cantidad = ___;` `double total = precio ___ cantidad;` y une el texto con `total` usando `+`."
      ],
      "recall": [
        {
          "do": "Crear una variable",
          "code": "int edad = 18;"
        },
        {
          "do": "Crear un texto",
          "code": "String nombre = \"Ana\";"
        },
        {
          "do": "Crear una constante",
          "code": "final double PI = 3.14159;"
        }
      ],
      "filename": "Ejercicio03.java",
      "starter": "public class Ejercicio03 {\n    public static void main(String[] args) {\n        // Declara precio y cantidad\n        // Calcula total\n        // Muestra el resultado\n    }\n}",
      "output": "Total: 24.0",
      "outputNote": "El total debe cambiar si cambias el precio o la cantidad.",
      "solution": "public class Ejercicio03 {\n    public static void main(String[] args) {\n        double precio = 8.0;\n        int cantidad = 3;\n        double total = precio * cantidad;\n        System.out.println(\"Total: \" + total);\n    }\n}"
    },
    {
      "id": "data-types",
      "title": "Tipos de datos y conversiones",
      "time": "6 min",
      "idea": "El tipo de una variable determina qué clase de valor puede guardar. Elegirlo bien evita errores y resultados inesperados.",
      "theory": [
        {
          "title": "Los tipos más usados",
          "text": "Primitivos: `byte`, `short`, `int`, `long` (enteros), `float`, `double` (decimales), `char` (carácter) y `boolean` (`true`/`false`). `String` guarda texto."
        },
        {
          "title": "División entera",
          "text": "Si divides dos `int`, `5 / 2` da `2`, porque se descarta la parte decimal."
        },
        {
          "title": "Casting",
          "text": "`(double) 5 / 2` produce `2.5`. Convertir a un tipo más pequeño puede perder información: `(int) 3.9` da `3`."
        }
      ],
      "exampleTitle": "Entero frente a decimal",
      "exampleLead": "Observa cómo cambia el resultado cuando forzamos una operación decimal.",
      "example": "public class Demo04 {\n    public static void main(String[] args) {\n        int a = 5;\n        int b = 2;\n        System.out.println(a / b);\n        System.out.println((double) a / b);\n    }\n}",
      "explain": [
        "La primera salida es `2`.",
        "La segunda salida es `2.5`, porque convertimos `a` a `double` antes de dividir.",
        "`String` se usa para texto, pero no es un tipo primitivo."
      ],
      "task": "Calcula la media de 7 y 8 como un número decimal.",
      "think": "Al dividir dos valores `int`, ¿qué se pierde? ¿Dónde debe hacerse la conversión?",
      "steps": [
        "Guarda 7 y 8 en dos variables `int`.",
        "Súmalas y divide entre 2 de forma que se conserven los decimales.",
        "Guarda el resultado en una variable que admita decimales y muéstralo."
      ],
      "hints": [
        "Entre dos enteros, `15 / 2` da `7`. Al menos un lado de la división debe ser `double`.",
        "Pon `(double)` delante de la suma: `(double) (a + b) / 2`, y guárdalo en un `double`."
      ],
      "recall": [
        {
          "do": "Conservar decimales en una división",
          "code": "double media = (double) suma / cantidad;"
        },
        {
          "do": "Crear un valor verdadero/falso",
          "code": "boolean listo = true;"
        },
        {
          "do": "Crear un carácter",
          "code": "char nota = 'A';"
        }
      ],
      "filename": "Ejercicio04.java",
      "starter": "public class Ejercicio04 {\n    public static void main(String[] args) {\n        int a = 7;\n        int b = 8;\n        // Calcula una media decimal\n        // Muestra la media\n    }\n}",
      "output": "Media: 7.5",
      "outputNote": "Si te sale 7, revisa que la división no se esté haciendo solo con enteros.",
      "solution": "public class Ejercicio04 {\n    public static void main(String[] args) {\n        int a = 7;\n        int b = 8;\n        double media = (double) (a + b) / 2;\n        System.out.println(\"Media: \" + media);\n    }\n}"
    },
    {
      "id": "arithmetic-operators",
      "title": "Operadores aritméticos",
      "time": "5 min",
      "idea": "Los operadores permiten calcular valores nuevos. Java también ofrece formas abreviadas para actualizar variables.",
      "theory": [
        {
          "title": "Operaciones básicas",
          "text": "`+` suma, `-` resta, `*` multiplica y `/` divide."
        },
        {
          "title": "Resto con `%`",
          "text": "`10 % 3` vale `1`: es el resto de dividir 10 entre 3. Es muy útil para detectar números pares con `n % 2 == 0`."
        },
        {
          "title": "Abreviaturas",
          "text": "`total += 5` equivale a `total = total + 5`. `i++` aumenta `i` en uno y `i--` lo reduce en uno."
        }
      ],
      "exampleTitle": "Operaciones y resto",
      "exampleLead": "Los paréntesis permiten indicar qué se calcula primero.",
      "example": "public class Demo05 {\n    public static void main(String[] args) {\n        int a = 10;\n        int b = 3;\n        System.out.println(a + b);\n        System.out.println(a % b);\n        a += 2;\n        System.out.println(a);\n    }\n}",
      "explain": [
        "La salida es `13`, `1` y `12`, cada valor en una línea.",
        "`%` no es un porcentaje: obtiene el resto de la división.",
        "Multiplicaciones y divisiones se calculan antes que sumas y restas, salvo que uses paréntesis."
      ],
      "task": "Guarda 17 en `numero` y muestra su resto al dividirlo entre 2. Después suma 1 al número y muestra el nuevo valor.",
      "think": "¿Qué operador da lo que sobra de una división? ¿Qué atajo suma uno?",
      "steps": [
        "Crea el número.",
        "Muestra su resto al dividir entre 2.",
        "Súmale uno y muéstralo otra vez."
      ],
      "hints": [
        "El operador de resto es `%`. El atajo para \"sumar uno\" es `++`.",
        "`System.out.println(numero ___ 2);` después `numero___;` y vuelve a mostrar `numero`."
      ],
      "recall": [
        {
          "do": "Resto de una división",
          "code": "int resto = 17 % 2;"
        },
        {
          "do": "Sumar uno / restar uno",
          "code": "cuenta++;\ncuenta--;"
        },
        {
          "do": "Sumar un valor a una variable",
          "code": "total += 5;"
        }
      ],
      "filename": "Ejercicio05.java",
      "starter": "public class Ejercicio05 {\n    public static void main(String[] args) {\n        int numero = 17;\n        // Muestra el resto al dividir entre 2\n        // Aumenta el número en uno\n        // Muestra el número actualizado\n    }\n}",
      "output": "1\n18",
      "outputNote": "El resto es 1 y, después del incremento, el valor es 18.",
      "solution": "public class Ejercicio05 {\n    public static void main(String[] args) {\n        int numero = 17;\n        System.out.println(numero % 2);\n        numero++;\n        System.out.println(numero);\n    }\n}"
    },
    {
      "id": "scanner-input",
      "title": "Leer datos con Scanner",
      "time": "6 min",
      "idea": "`Scanner` permite que el programa reciba datos escritos por la persona que lo ejecuta.",
      "theory": [
        {
          "title": "Prepararlo",
          "text": "Escribe `import java.util.Scanner;` antes de la clase y crea `Scanner teclado = new Scanner(System.in);`."
        },
        {
          "title": "Elegir lectura",
          "text": "`nextInt()` lee enteros, `nextDouble()` decimales, `next()` una palabra y `nextLine()` una línea de texto."
        },
        {
          "title": "Un detalle importante",
          "text": "Después de `nextInt()` puede quedar pendiente el salto de línea. Si luego llamas a `nextLine()`, a veces debes llamar antes a un `nextLine()` vacío para consumirlo."
        }
      ],
      "exampleTitle": "Pedir una edad",
      "exampleLead": "El programa pregunta, lee un número y calcula la edad del año que viene.",
      "example": "import java.util.Scanner;\n\npublic class Demo06 {\n    public static void main(String[] args) {\n        Scanner teclado = new Scanner(System.in);\n        System.out.print(\"Edad: \");\n        int edad = teclado.nextInt();\n        System.out.println(\"El año que viene: \" + (edad + 1));\n        teclado.close();\n    }\n}",
      "explain": [
        "`System.out.print` no baja de línea, por eso puedes escribir la respuesta junto a la pregunta.",
        "`nextInt()` espera un número entero.",
        "Cierra el lector al terminar con `teclado.close()`."
      ],
      "task": "Pide un número entero y muestra su cuadrado.",
      "think": "¿Qué necesita el programa antes de calcular? ¿Qué tipo de valor vas a leer?",
      "steps": [
        "Importa Scanner y crea el objeto del teclado.",
        "Pide un número y léelo como entero.",
        "Multiplica el número por sí mismo y muéstralo.",
        "Cierra el Scanner."
      ],
      "hints": [
        "El import va en la primera línea, encima de la clase. El scanner se crea con `new Scanner(System.in)`.",
        "`int numero = teclado.nextInt();` lee un entero. El cuadrado es `numero * numero`."
      ],
      "recall": [
        {
          "do": "Importar Scanner (arriba del archivo)",
          "code": "import java.util.Scanner;"
        },
        {
          "do": "Crear el scanner",
          "code": "Scanner teclado = new Scanner(System.in);"
        },
        {
          "do": "Leer un entero, una palabra, una línea",
          "code": "int n = teclado.nextInt();\nString palabra = teclado.next();\nString linea = teclado.nextLine();"
        },
        {
          "do": "Cerrar el scanner",
          "code": "teclado.close();"
        }
      ],
      "filename": "Ejercicio06.java",
      "starter": "import java.util.Scanner;\n\npublic class Ejercicio06 {\n    public static void main(String[] args) {\n        Scanner teclado = new Scanner(System.in);\n        // Pregunta y lee el número\n        // Muestra su cuadrado\n        teclado.close();\n    }\n}",
      "output": "Número: 4\nCuadrado: 16",
      "outputNote": "Introduce 4 en la consola. El cuadrado es 4 multiplicado por 4.",
      "solution": "import java.util.Scanner;\n\npublic class Ejercicio06 {\n    public static void main(String[] args) {\n        Scanner teclado = new Scanner(System.in);\n        System.out.print(\"Número: \");\n        int numero = teclado.nextInt();\n        System.out.println(\"Cuadrado: \" + (numero * numero));\n        teclado.close();\n    }\n}"
    },
    {
      "id": "comparisons",
      "title": "Operadores relacionales",
      "time": "4 min",
      "idea": "Una comparación responde a una pregunta y produce un valor booleano: `true` o `false`.",
      "theory": [
        {
          "title": "Comparar valores",
          "text": "`>` mayor, `<` menor, `>=` mayor o igual, `<=` menor o igual."
        },
        {
          "title": "Igualdad y diferencia",
          "text": "`==` comprueba si dos valores son iguales; `!=` comprueba si son distintos."
        },
        {
          "title": "No confundirlos",
          "text": "`edad = 18` asigna 18 a la variable. `edad == 18` pregunta si su valor es 18."
        }
      ],
      "exampleTitle": "Comparar dos números",
      "exampleLead": "La comparación se puede guardar en un `boolean` o mostrar directamente.",
      "example": "public class Demo07 {\n    public static void main(String[] args) {\n        int edad = 17;\n        System.out.println(edad >= 18);\n        System.out.println(edad != 18);\n    }\n}",
      "explain": [
        "La primera salida es `false`, porque 17 no es mayor o igual que 18.",
        "La segunda es `true`, porque 17 es distinto de 18.",
        "Las comparaciones se suelen usar dentro de `if` y los bucles."
      ],
      "task": "Guarda un número en `numero` y muestra si es positivo (mayor que cero).",
      "think": "¿Qué pregunta exacta de sí/no haces? ¿Qué tipo de valor produce una comparación?",
      "steps": [
        "Guarda el número.",
        "Escribe la comparación que responde a \"¿es positivo?\".",
        "Muestra la respuesta, cambia el número a uno negativo y ejecútalo otra vez."
      ],
      "hints": [
        "Una comparación responde sí o no, así que el resultado es un `boolean`.",
        "`System.out.println(numero ___ 0);` ¿Cuál de `>`, `<`, `==` significa \"positivo\"?"
      ],
      "recall": [
        {
          "do": "Comparar dos valores",
          "code": "edad >= 18"
        },
        {
          "do": "Igual / distinto",
          "code": "a == b\na != b"
        },
        {
          "do": "Guardar la respuesta",
          "code": "boolean adulto = edad >= 18;"
        }
      ],
      "filename": "Ejercicio07.java",
      "starter": "public class Ejercicio07 {\n    public static void main(String[] args) {\n        int numero = 6;\n        // Muestra si numero es mayor que cero\n    }\n}",
      "output": "true",
      "outputNote": "Con 6 debe salir true; con -2 debe salir false.",
      "solution": "public class Ejercicio07 {\n    public static void main(String[] args) {\n        int numero = 6;\n        System.out.println(numero > 0);\n    }\n}"
    },
    {
      "id": "logical-operators",
      "title": "Operadores lógicos: &&, || y !",
      "time": "6 min",
      "idea": "Los operadores lógicos permiten combinar condiciones. Son básicos cuando una decisión depende de dos o más cosas.",
      "theory": [
        {
          "title": "AND: `&&`",
          "text": "Significa “y”. Solo es `true` cuando ambas condiciones son verdaderas. Ejemplo: tener entrada y ser mayor de edad."
        },
        {
          "title": "OR: `||`",
          "text": "Significa “o”. Es `true` cuando al menos una condición es verdadera."
        },
        {
          "title": "NOT: `!`",
          "text": "Invierte el resultado: `!true` es `false` y `!false` es `true`."
        }
      ],
      "theoryTable": {
        "headers": [
          "A",
          "B",
          "A && B",
          "A || B"
        ],
        "rows": [
          [
            "true",
            "true",
            "true",
            "true"
          ],
          [
            "true",
            "false",
            "false",
            "true"
          ],
          [
            "false",
            "true",
            "false",
            "true"
          ],
          [
            "false",
            "false",
            "false",
            "false"
          ]
        ]
      },
      "theoryNote": "Para `!`, no hace falta una segunda condición: simplemente invierte una. Memoriza primero estas tres ideas: && necesita ambas; || necesita alguna; ! da la vuelta al valor.",
      "exampleTitle": "Combinar dos condiciones",
      "exampleLead": "La persona solo puede entrar si tiene entrada y tiene 18 años o más.",
      "example": "public class Demo08 {\n    public static void main(String[] args) {\n        int edad = 20;\n        boolean tieneEntrada = false;\n        boolean puedeEntrar = edad >= 18 && tieneEntrada;\n        System.out.println(puedeEntrar);\n        System.out.println(!tieneEntrada);\n    }\n}",
      "explain": [
        "`edad >= 18` es `true`.",
        "`tieneEntrada` es `false`; `true && false` da `false`.",
        "`!tieneEntrada` invierte el valor y da `true`."
      ],
      "task": "Solo se puede salir al parque si no llueve y la temperatura es de 18 grados o más. Calcula esa condición.",
      "think": "Escribe primero la regla con palabras. ¿Qué partes deben cumplirse a la vez? ¿Cuál necesita \"no\"?",
      "steps": [
        "Crea una variable para cada dato.",
        "Combina los datos en un solo boolean.",
        "Muéstralo y cambia los datos para probar los otros casos."
      ],
      "hints": [
        "De palabras a símbolos: \"y\" es `&&`, \"o\" es `||`, \"no\" es `!`.",
        "`boolean podemosSalir = ___llueve ___ temperatura >= 18;`"
      ],
      "recall": [
        {
          "do": "Deben cumplirse las dos (y)",
          "code": "a && b"
        },
        {
          "do": "Basta con una (o)",
          "code": "a || b"
        },
        {
          "do": "Invertir (no)",
          "code": "!a"
        }
      ],
      "filename": "Ejercicio08.java",
      "starter": "public class Ejercicio08 {\n    public static void main(String[] args) {\n        boolean llueve = false;\n        int temperatura = 20;\n        // Calcula podemosSalir con ! y &&\n        // Muestra el resultado\n    }\n}",
      "output": "true",
      "outputNote": "Si llueve pasa a true, la salida debe ser false aunque haga calor.",
      "solution": "public class Ejercicio08 {\n    public static void main(String[] args) {\n        boolean llueve = false;\n        int temperatura = 20;\n        boolean podemosSalir = !llueve && temperatura >= 18;\n        System.out.println(podemosSalir);\n    }\n}"
    },
    {
      "id": "if-conditionals",
      "title": "Condiciones: if, else if y else",
      "time": "6 min",
      "idea": "`if` permite elegir qué instrucciones ejecutar según una condición. `else if` añade casos y `else` recoge el resto.",
      "theory": [
        {
          "title": "Un caso",
          "text": "`if (nota >= 5) { ... }` ejecuta el bloque solo cuando la condición es verdadera."
        },
        {
          "title": "Varios casos",
          "text": "`else if` comprueba otra condición si las anteriores no se cumplieron."
        },
        {
          "title": "Último recurso",
          "text": "`else` no lleva condición: se ejecuta si ningún caso anterior se ha cumplido. Usa llaves para delimitar cada bloque."
        }
      ],
      "theoryNote": "Operador ternario: para una decisión muy sencilla, `String resultado = edad >= 18 ? \"Mayor\" : \"Menor\";` sustituye a un if/else corto. Aprende primero el if normal.",
      "exampleTitle": "Clasificar una nota",
      "exampleLead": "Java comprueba primero la condición de arriba y se queda con el primer caso verdadero.",
      "example": "public class Demo09 {\n    public static void main(String[] args) {\n        int nota = 7;\n        if (nota >= 9) {\n            System.out.println(\"Sobresaliente\");\n        } else if (nota >= 5) {\n            System.out.println(\"Aprobado\");\n        } else {\n            System.out.println(\"Suspenso\");\n        }\n    }\n}",
      "explain": [
        "Con nota 7, la primera condición falla.",
        "La segunda condición `nota >= 5` se cumple y muestra Aprobado.",
        "El orden de las condiciones importa."
      ],
      "task": "Comprueba si un número es positivo, negativo o cero.",
      "think": "¿Cuántos resultados distintos hay? ¿Qué condiciones hay que comprobar y en qué orden?",
      "steps": [
        "Haz la lista de los tres resultados.",
        "Comprueba los dos resultados que tienen condición.",
        "Deja que `else` recoja lo que quede.",
        "Pruébalo con un positivo, un negativo y un cero para comprobar cada rama."
      ],
      "hints": [
        "Tres resultados necesitan `if`, `else if` y `else`. El último no lleva condición.",
        "`if (numero > 0) { ... } else if (numero ___ 0) { ... } else { ... }`"
      ],
      "recall": [
        {
          "do": "Hacer algo solo si se cumple una condición",
          "code": "if (edad >= 18) {\n    System.out.println(\"Adulto\");\n}"
        },
        {
          "do": "Dos caminos posibles",
          "code": "if (nota >= 5) {\n    System.out.println(\"Aprobado\");\n} else {\n    System.out.println(\"Suspenso\");\n}"
        },
        {
          "do": "Más de dos caminos",
          "code": "if (n > 0) {\n    // positivo\n} else if (n < 0) {\n    // negativo\n} else {\n    // cero\n}"
        }
      ],
      "filename": "Ejercicio09.java",
      "starter": "public class Ejercicio09 {\n    public static void main(String[] args) {\n        int numero = -3;\n        // Comprueba si es positivo\n        // Si no, comprueba si es negativo\n        // Si no se cumple ninguna, es cero\n    }\n}",
      "output": "Negativo",
      "outputNote": "Con -3 debe mostrar Negativo; con 0 debe mostrar Cero.",
      "solution": "public class Ejercicio09 {\n    public static void main(String[] args) {\n        int numero = -3;\n        if (numero > 0) {\n            System.out.println(\"Positivo\");\n        } else if (numero < 0) {\n            System.out.println(\"Negativo\");\n        } else {\n            System.out.println(\"Cero\");\n        }\n    }\n}"
    },
    {
      "id": "switch-selection",
      "title": "Elegir una opción con switch",
      "time": "5 min",
      "idea": "`switch` es cómodo cuando comparas una misma variable con varios valores concretos, como opciones de un menú.",
      "theory": [
        {
          "title": "Cada `case`",
          "text": "Define un posible valor de la variable."
        },
        {
          "title": "`break`",
          "text": "Termina ese caso y evita que se ejecuten los siguientes."
        },
        {
          "title": "`default`",
          "text": "Es la opción que se ejecuta cuando ningún `case` coincide. Es opcional, pero suele ser útil."
        }
      ],
      "exampleTitle": "Mostrar un día de la semana",
      "exampleLead": "Cada número conduce a una respuesta distinta.",
      "example": "public class Demo10 {\n    public static void main(String[] args) {\n        int dia = 2;\n        switch (dia) {\n            case 1:\n                System.out.println(\"Lunes\");\n                break;\n            case 2:\n                System.out.println(\"Martes\");\n                break;\n            default:\n                System.out.println(\"Otro día\");\n        }\n    }\n}",
      "explain": [
        "Con `dia = 2` se ejecuta el segundo `case`.",
        "`break` sale del `switch`.",
        "Si dia no es 1 ni 2, se ejecuta `default`."
      ],
      "task": "Crea un menú sencillo: opción 1 muestra “Jugar”, opción 2 muestra “Salir” y otra opción muestra “Opción desconocida”.",
      "think": "¿Sobre qué valor eliges? ¿Qué debe pasar al final de cada caso y cuando ninguno coincide?",
      "steps": [
        "Crea la variable que guarda la opción.",
        "Escribe un caso para cada opción del menú.",
        "Detén cada caso para que no ejecute el siguiente.",
        "Añade una rama para cualquier otro valor."
      ],
      "hints": [
        "Cada `case` necesita un `break;`. Sin él, Java sigue ejecutando el siguiente caso.",
        "`switch (opcion) { case 1: ... break; case 2: ... break; default: ... }`"
      ],
      "recall": [
        {
          "do": "Elegir entre opciones fijas",
          "code": "switch (opcion) {\n    case 1:\n        System.out.println(\"Uno\");\n        break;\n    default:\n        System.out.println(\"Otra\");\n}"
        }
      ],
      "filename": "Ejercicio10.java",
      "starter": "public class Ejercicio10 {\n    public static void main(String[] args) {\n        int opcion = 1;\n        // Escribe el switch\n    }\n}",
      "output": "Jugar",
      "outputNote": "Cambia opcion a 2 y después a 9 para probar los tres casos.",
      "solution": "public class Ejercicio10 {\n    public static void main(String[] args) {\n        int opcion = 1;\n        switch (opcion) {\n            case 1:\n                System.out.println(\"Jugar\");\n                break;\n            case 2:\n                System.out.println(\"Salir\");\n                break;\n            default:\n                System.out.println(\"Opción desconocida\");\n        }\n    }\n}"
    },
    {
      "id": "while-loop",
      "title": "Bucle while",
      "time": "5 min",
      "idea": "`while` repite un bloque mientras una condición sea verdadera. Comprueba la condición antes de cada vuelta.",
      "theory": [
        {
          "title": "Primero comprueba",
          "text": "Si la condición es falsa desde el principio, el bloque puede no ejecutarse ninguna vez."
        },
        {
          "title": "Hay que avanzar",
          "text": "Dentro del bucle normalmente debes modificar una variable que cambie la condición; si no, puedes crear un bucle infinito."
        },
        {
          "title": "Cuándo usarlo",
          "text": "Es útil cuando no sabes exactamente cuántas veces habrá que repetir algo."
        }
      ],
      "exampleTitle": "Contar hasta cinco",
      "exampleLead": "El contador aumenta en cada vuelta hasta que deja de cumplir la condición.",
      "example": "public class Demo11 {\n    public static void main(String[] args) {\n        int i = 1;\n        while (i <= 5) {\n            System.out.println(i);\n            i++;\n        }\n    }\n}",
      "explain": [
        "`i` empieza en 1.",
        "Mientras `i <= 5`, se muestra y se incrementa.",
        "Al llegar a 6, la condición es falsa y el bucle termina."
      ],
      "task": "Muestra los números del 5 al 1, en orden descendente, usando while.",
      "think": "¿Dónde empieza el contador, cuándo debe parar y qué lo cambia en cada vuelta?",
      "steps": [
        "Elige el valor inicial.",
        "Escribe la condición que mantiene el bucle en marcha.",
        "Muestra el contador y cámbialo para que el bucle pueda terminar."
      ],
      "hints": [
        "Contar hacia atrás significa que el contador disminuye. Si nada lo cambia, el bucle no termina nunca.",
        "`int i = 5;` `while (i ___ 1) { mostrar i; i___; }`"
      ],
      "recall": [
        {
          "do": "Repetir mientras se cumpla una condición",
          "code": "while (contador < 3) {\n    contador++;\n}"
        }
      ],
      "filename": "Ejercicio11.java",
      "starter": "public class Ejercicio11 {\n    public static void main(String[] args) {\n        int i = 5;\n        // Escribe el while\n    }\n}",
      "output": "5\n4\n3\n2\n1",
      "outputNote": "Si aparece siempre el mismo número, revisa que el contador se reduzca.",
      "solution": "public class Ejercicio11 {\n    public static void main(String[] args) {\n        int i = 5;\n        while (i >= 1) {\n            System.out.println(i);\n            i--;\n        }\n    }\n}"
    },
    {
      "id": "do-while-loop",
      "title": "Bucle do-while",
      "time": "4 min",
      "idea": "`do-while` se parece a `while`, pero comprueba la condición al final. Por eso ejecuta el bloque al menos una vez.",
      "theory": [
        {
          "title": "Orden de ejecución",
          "text": "Primero entra en el bloque `do { ... }`; después comprueba `while (condicion);`."
        },
        {
          "title": "Punto y coma",
          "text": "En Java, al final de `while (condicion);` sí va un punto y coma."
        },
        {
          "title": "Cuándo usarlo",
          "text": "Encaja cuando quieres mostrar un menú o pedir un dato al menos una vez y luego decidir si repites."
        }
      ],
      "exampleTitle": "Mostrar tres intentos",
      "exampleLead": "Aunque la condición se comprueba después, el contador hace que el bucle pare.",
      "example": "public class Demo12 {\n    public static void main(String[] args) {\n        int intento = 1;\n        do {\n            System.out.println(\"Intento \" + intento);\n            intento++;\n        } while (intento <= 3);\n    }\n}",
      "explain": [
        "El bloque se ejecuta con intento igual a 1.",
        "Después `intento++` aumenta el contador.",
        "Al llegar a 4, la condición es falsa y termina."
      ],
      "task": "Cuenta hacia atrás de 3 a 1 usando do-while.",
      "think": "¿Qué se ejecuta primero, el cuerpo o la comprobación? ¿En qué se diferencia de `while`?",
      "steps": [
        "Crea el contador.",
        "Escribe el cuerpo: muéstralo y cámbialo.",
        "Escribe la condición después del cuerpo."
      ],
      "hints": [
        "`do-while` ejecuta el cuerpo una vez antes de comprobar nada. La condición va después de la llave de cierre.",
        "`do { ... } while (cuenta >= 1);` El `;` del final es obligatorio."
      ],
      "recall": [
        {
          "do": "Ejecutar al menos una vez y repetir",
          "code": "do {\n    cuenta--;\n} while (cuenta > 0);"
        }
      ],
      "filename": "Ejercicio12.java",
      "starter": "public class Ejercicio12 {\n    public static void main(String[] args) {\n        int cuenta = 3;\n        // Escribe el do-while\n    }\n}",
      "output": "3\n2\n1",
      "outputNote": "El bloque se ejecuta primero; la comprobación va al final.",
      "solution": "public class Ejercicio12 {\n    public static void main(String[] args) {\n        int cuenta = 3;\n        do {\n            System.out.println(cuenta);\n            cuenta--;\n        } while (cuenta >= 1);\n    }\n}"
    },
    {
      "id": "for-loop",
      "title": "Bucle for",
      "time": "5 min",
      "idea": "`for` concentra en una línea el inicio, la condición para continuar y el cambio que se hace en cada vuelta.",
      "theory": [
        {
          "title": "Inicio",
          "text": "`int i = 1` crea el contador y le da su valor inicial."
        },
        {
          "title": "Condición",
          "text": "`i <= 5` permite seguir mientras el contador valga 5 o menos."
        },
        {
          "title": "Actualización",
          "text": "`i++` suma uno al final de cada vuelta. Puedes cambiarlo por `i += 2` para avanzar de dos en dos."
        }
      ],
      "exampleTitle": "Contar de uno en uno",
      "exampleLead": "Este bucle muestra los números del 1 al 3.",
      "example": "public class Demo13 {\n    public static void main(String[] args) {\n        for (int i = 1; i <= 3; i++) {\n            System.out.println(i);\n        }\n    }\n}",
      "explain": [
        "Los tres componentes del `for` van separados por punto y coma.",
        "Si empiezas en 1 y la condición es `i <= 3`, aparecen 1, 2 y 3.",
        "Si la condición fuera `i < 3`, aparecerían solo 1 y 2."
      ],
      "task": "Muestra los números pares del 2 al 10.",
      "think": "Responde tres preguntas: ¿dónde empieza?, ¿hasta cuándo sigue?, ¿cómo cambia en cada vuelta?",
      "steps": [
        "Empieza en 2.",
        "Sigue hasta 10 (incluido).",
        "Salta de 2 en 2 en cada vuelta."
      ],
      "hints": [
        "Las tres respuestas van entre los paréntesis, separadas por `;`.",
        "`for (int i = 2; i ___ 10; i ___ 2)`"
      ],
      "recall": [
        {
          "do": "Repetir un número conocido de veces",
          "code": "for (int i = 1; i <= 5; i++) {\n    System.out.println(i);\n}"
        },
        {
          "do": "Saltar de 2 en 2",
          "code": "for (int i = 0; i <= 10; i += 2) {\n    // ...\n}"
        }
      ],
      "filename": "Ejercicio13.java",
      "starter": "public class Ejercicio13 {\n    public static void main(String[] args) {\n        // Escribe el for de los pares\n    }\n}",
      "output": "2\n4\n6\n8\n10",
      "outputNote": "Deben aparecer cinco números: el primero es 2 y el último 10.",
      "solution": "public class Ejercicio13 {\n    public static void main(String[] args) {\n        for (int i = 2; i <= 10; i += 2) {\n            System.out.println(i);\n        }\n    }\n}"
    },
    {
      "id": "loop-control",
      "title": "Controlar un bucle: break y continue",
      "time": "4 min",
      "idea": "`break` termina un bucle de inmediato; `continue` salta lo que queda de la vuelta actual y pasa a la siguiente.",
      "theory": [
        {
          "title": "`break`",
          "text": "Úsalo si ya has encontrado lo que buscabas o quieres detener el bucle."
        },
        {
          "title": "`continue`",
          "text": "Úsalo para ignorar ciertos valores y seguir con el siguiente."
        },
        {
          "title": "No abusar",
          "text": "Muchos `break` o `continue` pueden hacer el código más difícil de seguir. Empieza con bucles simples."
        }
      ],
      "exampleTitle": "Saltar el número tres",
      "exampleLead": "El bucle sigue contando, pero no muestra el 3.",
      "example": "public class Demo14 {\n    public static void main(String[] args) {\n        for (int i = 1; i <= 5; i++) {\n            if (i == 3) {\n                continue;\n            }\n            System.out.println(i);\n        }\n    }\n}",
      "explain": [
        "Cuando `i` vale 3, `continue` salta el `println`.",
        "El bucle sigue con 4 y 5.",
        "Si sustituyeras `continue` por `break`, terminaría al llegar a 3."
      ],
      "task": "Muestra los números del 1 al 10, pero detén el bucle cuando i llegue a 7.",
      "think": "¿Qué hay que comprobar en cada vuelta y qué debe pasar cuando se cumple?",
      "steps": [
        "Escribe un bucle normal de 1 a 10.",
        "Dentro, añade una comprobación para el valor que debe detenerlo.",
        "Sal del bucle cuando coincida; en otro caso, muestra el número."
      ],
      "hints": [
        "`break` sale del bucle al instante. `continue` salta solo la vuelta actual.",
        "La comprobación va antes de mostrar: `if (i == 7) { break; }`. Ojo: `==` compara y `=` asigna."
      ],
      "recall": [
        {
          "do": "Salir del bucle ahora",
          "code": "if (i == 7) {\n    break;\n}"
        },
        {
          "do": "Saltar solo esta vuelta",
          "code": "if (i % 2 == 0) {\n    continue;\n}"
        }
      ],
      "filename": "Ejercicio14.java",
      "starter": "public class Ejercicio14 {\n    public static void main(String[] args) {\n        for (int i = 1; i <= 10; i++) {\n            // Si i vale 7, termina el bucle\n            // Si no, muestra i\n        }\n    }\n}",
      "output": "1\n2\n3\n4\n5\n6",
      "outputNote": "El 7 no aparece: el bucle se detiene antes de imprimirlo.",
      "solution": "public class Ejercicio14 {\n    public static void main(String[] args) {\n        for (int i = 1; i <= 10; i++) {\n            if (i == 7) {\n                break;\n            }\n            System.out.println(i);\n        }\n    }\n}"
    },
    {
      "id": "text-and-letters",
      "title": "Leer letras y respuestas de texto",
      "time": "6 min",
      "idea": "Muchos programas hacen una pregunta de sí/no. Lees una palabra, tomas su primera letra y la comparas.",
      "theory": [
        {
          "title": "Una letra: `char`",
          "text": "`teclado.next().charAt(0)` lee una palabra y se queda con su primer carácter. Un solo carácter va entre comillas simples: `'S'`."
        },
        {
          "title": "La misma respuesta en mayúscula o minúscula",
          "text": "`Character.toUpperCase(...)` convierte `s` en `S`, así el usuario puede escribir cualquiera y tú solo comparas con `'S'`."
        },
        {
          "title": "Comparar texto",
          "text": "Con un `char` usa `==`. Con un `String` usa `.equals(\"si\")`. No compares textos con `==`."
        }
      ],
      "exampleTitle": "Preguntar por el ticket",
      "exampleLead": "El programa hace una pregunta de sí/no y reacciona a la primera letra de la respuesta.",
      "example": "import java.util.Scanner;\n\npublic class Demo15 {\n    public static void main(String[] args) {\n        Scanner teclado = new Scanner(System.in);\n        System.out.print(\"¿Quieres el ticket? (S/N): \");\n        char respuesta = Character.toUpperCase(teclado.next().charAt(0));\n        if (respuesta == 'S') {\n            System.out.println(\"Imprimiendo ticket...\");\n        } else {\n            System.out.println(\"Sin ticket.\");\n        }\n        teclado.close();\n    }\n}",
      "explain": [
        "Primero se pasa la letra a mayúscula, así que `s` y `S` funcionan.",
        "Comillas simples para un carácter, comillas dobles para texto.",
        "`else` recoge cualquier otra respuesta, incluida la `N`."
      ],
      "task": "Pregunta \"¿Equipaje especial? (S/N)\". Si la respuesta es S, el recargo es 5.0; en otro caso es 0.0. Muestra el recargo.",
      "think": "¿Qué tipo guarda una letra? ¿Cómo haces que `s` y `S` cuenten como la misma respuesta?",
      "steps": [
        "Haz la pregunta y lee la respuesta como una letra.",
        "Pasa la letra a mayúscula.",
        "Empieza el recargo en 0 y cámbialo solo si la respuesta es sí.",
        "Muestra el recargo."
      ],
      "hints": [
        "Un carácter es un `char`. Sácalo de la palabra escrita con `next().charAt(0)`.",
        "`char respuesta = Character.toUpperCase(teclado.next().charAt(0));` y después `if (respuesta == 'S') { ... }`."
      ],
      "recall": [
        {
          "do": "Leer una letra en mayúscula",
          "code": "char respuesta = Character.toUpperCase(teclado.next().charAt(0));"
        },
        {
          "do": "Comparar una letra",
          "code": "if (respuesta == 'S') {\n    // sí\n}"
        },
        {
          "do": "Comparar texto",
          "code": "if (word.equals(\"si\")) {\n    // mismo texto\n}"
        }
      ],
      "filename": "Ejercicio15.java",
      "starter": "import java.util.Scanner;\n\npublic class Ejercicio15 {\n    public static void main(String[] args) {\n        Scanner teclado = new Scanner(System.in);\n        double recargo = 0;\n        // Pregunta \"¿Equipaje especial? (S/N): \" y lee una letra\n        // Si la respuesta es sí, el recargo es 5.0\n        // Muestra el recargo\n        teclado.close();\n    }\n}",
      "output": "¿Equipaje especial? (S/N): s\nRecargo de equipaje: 5.0",
      "outputNote": "Escribe s (minúscula) para comprobar que también funciona. Con n el recargo es 0.0.",
      "solution": "import java.util.Scanner;\n\npublic class Ejercicio15 {\n    public static void main(String[] args) {\n        Scanner teclado = new Scanner(System.in);\n        double recargo = 0;\n        System.out.print(\"¿Equipaje especial? (S/N): \");\n        char respuesta = Character.toUpperCase(teclado.next().charAt(0));\n        if (respuesta == 'S') {\n            recargo = 5.0;\n        }\n        System.out.println(\"Recargo de equipaje: \" + recargo);\n        teclado.close();\n    }\n}"
    },
    {
      "id": "validate-input",
      "title": "Validar lo que escribe el usuario",
      "time": "7 min",
      "idea": "Un programa no debe fiarse de los datos. Compruébalos y después termina con un error o vuelve a preguntar.",
      "theory": [
        {
          "title": "Describe lo que está mal",
          "text": "Escribe la condición de los valores no válidos: `cantidad <= 0`, o `opcion < 1 || opcion > 4`. Si es cierta, el dato no vale."
        },
        {
          "title": "Terminar el programa",
          "text": "Dentro de `main`, `return;` termina el programa en ese punto. Muestra antes el mensaje de error."
        },
        {
          "title": "Volver a preguntar",
          "text": "Un `while` con la condición de dato no válido repite la pregunta hasta que el valor sirve. Vuelve a leer dentro del bucle."
        }
      ],
      "theoryNote": "Si al escribir `4.5` aparece un `InputMismatchException`, tu ordenador espera una coma. Añade `import java.util.Locale;` y escribe `teclado.useLocale(Locale.US);` justo después de crear el Scanner.",
      "exampleTitle": "Dos formas de validar",
      "exampleLead": "El primer valor termina el programa si es incorrecto. El segundo se vuelve a pedir hasta que sea válido.",
      "example": "import java.util.Scanner;\n\npublic class Demo16 {\n    public static void main(String[] args) {\n        Scanner teclado = new Scanner(System.in);\n        System.out.print(\"Jugadores (1 a 4): \");\n        int jugadores = teclado.nextInt();\n        if (jugadores < 1 || jugadores > 4) {\n            System.out.println(\"Error: elige entre 1 y 4\");\n            teclado.close();\n            return;\n        }\n        System.out.print(\"Vidas (más de 0): \");\n        int vidas = teclado.nextInt();\n        while (vidas <= 0) {\n            System.out.println(\"Las vidas deben ser más de 0\");\n            System.out.print(\"Vidas (más de 0): \");\n            vidas = teclado.nextInt();\n        }\n        System.out.println(jugadores + \" jugadores, \" + vidas + \" vidas\");\n        teclado.close();\n    }\n}",
      "explain": [
        "`return;` después del mensaje de error termina `main`, así que no se ejecuta nada más.",
        "El valor se lee una vez antes del `while` y otra vez dentro.",
        "Cuando el valor pasa a ser válido, la condición es falsa y el bucle termina."
      ],
      "task": "Pide el número de artículos. Si no es mayor que 0, muestra un error y termina. Después pide un precio y sigue preguntando hasta que sea mayor que 0. Muestra los dos.",
      "think": "¿Qué condición describe los valores incorrectos? ¿Cuál de las dos comprobaciones debe terminar el programa y cuál volver a preguntar?",
      "steps": [
        "Lee el número de artículos.",
        "Si no es válido: mensaje de error y terminar el programa.",
        "Lee el precio.",
        "Mientras el precio no sea válido: mensaje y volver a leerlo.",
        "Muestra los artículos y el precio."
      ],
      "hints": [
        "Los artículos usan `if` + `return;`. El precio usa `while` con la misma condición de dato no válido.",
        "`if (articulos <= 0) { ...; return; }` y `while (precio <= 0) { ...; precio = teclado.nextDouble(); }`"
      ],
      "recall": [
        {
          "do": "Terminar el programa si el dato es incorrecto",
          "code": "if (n <= 0) {\n    System.out.println(\"Error\");\n    return;\n}"
        },
        {
          "do": "Preguntar de nuevo hasta que el valor sea válido",
          "code": "while (precio <= 0) {\n    System.out.print(\"Precio: \");\n    precio = teclado.nextDouble();\n}"
        }
      ],
      "filename": "Ejercicio16.java",
      "starter": "import java.util.Scanner;\n\npublic class Ejercicio16 {\n    public static void main(String[] args) {\n        Scanner teclado = new Scanner(System.in);\n        // Lee los artículos. Si no es mayor que 0: error y return\n        // Lee el precio. Mientras no sea mayor que 0: vuelve a preguntar\n        // Muestra artículos y precio\n        teclado.close();\n    }\n}",
      "output": "Artículos: 3\nPrecio: -2\nEl precio debe ser mayor que 0\nPrecio: 4.5\n3 artículos a 4.5",
      "outputNote": "Ejecútalo otra vez con 0 artículos: el programa debe terminar después del error.",
      "solution": "import java.util.Scanner;\n\npublic class Ejercicio16 {\n    public static void main(String[] args) {\n        Scanner teclado = new Scanner(System.in);\n        System.out.print(\"Artículos: \");\n        int articulos = teclado.nextInt();\n        if (articulos <= 0) {\n            System.out.println(\"Error: los artículos deben ser más de 0\");\n            teclado.close();\n            return;\n        }\n        System.out.print(\"Precio: \");\n        double precio = teclado.nextDouble();\n        while (precio <= 0) {\n            System.out.println(\"El precio debe ser mayor que 0\");\n            System.out.print(\"Precio: \");\n            precio = teclado.nextDouble();\n        }\n        System.out.println(articulos + \" artículos a \" + precio);\n        teclado.close();\n    }\n}"
    },
    {
      "id": "money-percentages",
      "title": "Precios, porcentajes y salida ordenada",
      "time": "7 min",
      "idea": "Los precios necesitan decimales, descuentos e impuestos. `printf` muestra los números con los decimales que elijas.",
      "theory": [
        {
          "title": "Un porcentaje es un decimal",
          "text": "El 20 % es `0.20`. El descuento es `precio * 0.20`. El precio con descuento es `precio - descuento`."
        },
        {
          "title": "Añadir un impuesto al final",
          "text": "El IVA del 21 % sobre la base es `base * 0.21`. Guarda el tipo en una constante: `final double IVA = 0.21;`. El total es `base + iva`."
        },
        {
          "title": "`printf` y `%.2f`",
          "text": "`System.out.printf(\"Total: %.2f%n\", total);` muestra 2 decimales. `%n` termina la línea. La variable conserva su valor completo."
        }
      ],
      "theoryNote": "Si `printf` muestra una coma (`77,44`) y quieres un punto, usa `System.out.printf(Locale.US, \"Total: %.2f%n\", total);` con `import java.util.Locale;`.",
      "exampleTitle": "Una factura pequeña",
      "exampleLead": "Un precio de 80 con un 20 % de descuento y después un 21 % de IVA, una variable por paso.",
      "example": "public class Demo17 {\n    public static void main(String[] args) {\n        final double IVA = 0.21;\n        double precio = 80.0;\n        double descuento = precio * 0.20;\n        double base = precio - descuento;\n        double iva = base * IVA;\n        double total = base + iva;\n        System.out.printf(\"Precio: %.2f%n\", precio);\n        System.out.printf(\"Descuento: %.2f%n\", descuento);\n        System.out.printf(\"Base: %.2f%n\", base);\n        System.out.printf(\"IVA: %.2f%n\", iva);\n        System.out.printf(\"Total: %.2f%n\", total);\n    }\n}",
      "explain": [
        "El descuento se calcula sobre el precio original.",
        "El impuesto se calcula sobre la base, después del descuento.",
        "`%.2f` solo cambia cómo se muestra el número, no la variable."
      ],
      "task": "Una entrada cuesta 40. Un jubilado tiene un 30 % de descuento y después se suma un recargo de 5 por equipaje. Aplica un 21 % de IVA al resultado. Muestra descuento, base, IVA y total con 2 decimales.",
      "think": "¿En qué orden se aplican los importes: descuento, recargo, impuesto? ¿Sobre qué importe se calcula cada porcentaje?",
      "steps": [
        "Calcula el descuento a partir del precio.",
        "Calcula la base: precio, menos descuento, más recargo.",
        "Calcula el IVA sobre la base y después el total.",
        "Muestra los cuatro importes con 2 decimales."
      ],
      "hints": [
        "El 30 % es `0.30`. El IVA se calcula sobre la base, nunca sobre el precio original.",
        "`double base = precio - descuento + recargo;` `double iva = base * IVA;` `System.out.printf(\"Total: %.2f%n\", total);`"
      ],
      "recall": [
        {
          "do": "Descuento y precio con descuento",
          "code": "double descuento = precio * 0.20;\ndouble base = precio - descuento;"
        },
        {
          "do": "Impuesto como constante",
          "code": "final double IVA = 0.21;\ndouble iva = base * IVA;"
        },
        {
          "do": "Mostrar un número con 2 decimales",
          "code": "System.out.printf(\"Total: %.2f%n\", total);"
        }
      ],
      "filename": "Ejercicio17.java",
      "starter": "public class Ejercicio17 {\n    public static void main(String[] args) {\n        final double IVA = 0.21;\n        double precio = 40.0;\n        double recargo = 5.0;\n        // Calcula el descuento del 30 %\n        // Calcula la base: precio - descuento + recargo\n        // Calcula el IVA y el total\n        // Muestra descuento, base, IVA y total con 2 decimales\n    }\n}",
      "output": "Descuento: 12.00\nBase: 33.00\nIVA: 6.93\nTotal: 39.93",
      "outputNote": "Cambia el precio y comprueba que todos los importes cambian con él.",
      "solution": "public class Ejercicio17 {\n    public static void main(String[] args) {\n        final double IVA = 0.21;\n        double precio = 40.0;\n        double recargo = 5.0;\n        double descuento = precio * 0.30;\n        double base = precio - descuento + recargo;\n        double iva = base * IVA;\n        double total = base + iva;\n        System.out.printf(\"Descuento: %.2f%n\", descuento);\n        System.out.printf(\"Base: %.2f%n\", base);\n        System.out.printf(\"IVA: %.2f%n\", iva);\n        System.out.printf(\"Total: %.2f%n\", total);\n    }\n}"
    },
    {
      "id": "counters-accumulators",
      "title": "Contar y sumar mientras lees",
      "time": "8 min",
      "idea": "No necesitas guardar cada valor. Lee cada uno dentro de un bucle y actualiza contadores y un total acumulado sobre la marcha.",
      "theory": [
        {
          "title": "Contador",
          "text": "Empieza en 0 y sube uno cada vez que ocurre algo: `if (valor % 2 == 0) { pares++; }`."
        },
        {
          "title": "Acumulador",
          "text": "Empieza en 0 y suma cada valor: `suma += valor;`. La media es `(double) suma / n` al final."
        },
        {
          "title": "Antes del bucle",
          "text": "Los contadores y las sumas se crean antes del bucle. Si los creas dentro, vuelven a empezar en 0 en cada vuelta."
        }
      ],
      "exampleTitle": "Pares y suma",
      "exampleLead": "Lee N números, cuenta los pares y súmalos todos. No se guarda nada.",
      "example": "import java.util.Scanner;\n\npublic class Demo18 {\n    public static void main(String[] args) {\n        Scanner teclado = new Scanner(System.in);\n        System.out.print(\"¿Cuántos números? \");\n        int n = teclado.nextInt();\n        int suma = 0;\n        int pares = 0;\n        for (int i = 1; i <= n; i++) {\n            System.out.print(\"Número \" + i + \": \");\n            int valor = teclado.nextInt();\n            suma += valor;\n            if (valor % 2 == 0) {\n                pares++;\n            }\n        }\n        System.out.println(\"Suma: \" + suma);\n        System.out.println(\"Pares: \" + pares);\n        teclado.close();\n    }\n}",
      "explain": [
        "`suma` y `pares` viven fuera del bucle, así que conservan su valor entre vueltas.",
        "Cada vuelta lee un valor, lo usa y lo olvida.",
        "`i` es solo el número de vuelta: 1, 2, 3..."
      ],
      "task": "Pregunta cuántas notas hay. Lee cada nota (0 a 10) y cuenta cuántas son suspensos (menos de 5), aprobados (de 5 a 8) y sobresalientes (más de 8). Muestra los tres contadores, la suma y la media.",
      "think": "¿Qué debes recordar después de leer cada nota? ¿Qué variables deben existir antes de empezar el bucle?",
      "steps": [
        "Crea los tres contadores y la suma, todos a 0, antes del bucle.",
        "Repite N veces y lee una nota por vuelta.",
        "Suma la nota y aumenta el contador que corresponda.",
        "Después del bucle calcula la media con decimales y muestra todo."
      ],
      "hints": [
        "Tres grupos sin solaparse: usa `if`, `else if` y `else`, así cada nota se cuenta una sola vez.",
        "`if (nota < 5) { suspensos++; } else if (nota <= 8) { aprobados++; } else { sobresalientes++; }`"
      ],
      "recall": [
        {
          "do": "Contar cuántos valores cumplen una condición",
          "code": "int cuenta = 0;\nfor (int i = 1; i <= n; i++) {\n    int valor = teclado.nextInt();\n    if (valor > 0) {\n        cuenta++;\n    }\n}"
        },
        {
          "do": "Contar por grupos",
          "code": "if (v > 30) {\n    altos++;\n} else if (v < 0) {\n    bajos++;\n} else {\n    medios++;\n}"
        },
        {
          "do": "Sumar valores y obtener la media",
          "code": "suma += valor;\n// después del bucle\ndouble media = (double) suma / n;"
        }
      ],
      "filename": "Ejercicio18.java",
      "starter": "import java.util.Scanner;\n\npublic class Ejercicio18 {\n    public static void main(String[] args) {\n        Scanner teclado = new Scanner(System.in);\n        System.out.print(\"¿Cuántas notas? \");\n        int n = teclado.nextInt();\n        // Crea los contadores y la suma antes del bucle\n        // Bucle: lee cada nota, súmala y cuéntala en su grupo\n        // Muestra los contadores, la suma y la media\n        teclado.close();\n    }\n}",
      "output": "¿Cuántas notas? 4\nNota 1: 3\nNota 2: 7\nNota 3: 9\nNota 4: 5\nSuspensos: 1\nAprobados: 2\nSobresalientes: 1\nSuma: 24\nMedia: 6.0",
      "outputNote": "Los números después de \"Nota\" son lo que escribes. La media conserva la parte decimal.",
      "solution": "import java.util.Scanner;\n\npublic class Ejercicio18 {\n    public static void main(String[] args) {\n        Scanner teclado = new Scanner(System.in);\n        System.out.print(\"¿Cuántas notas? \");\n        int n = teclado.nextInt();\n        int suspensos = 0;\n        int aprobados = 0;\n        int sobresalientes = 0;\n        int suma = 0;\n        for (int i = 1; i <= n; i++) {\n            System.out.print(\"Nota \" + i + \": \");\n            int nota = teclado.nextInt();\n            suma += nota;\n            if (nota < 5) {\n                suspensos++;\n            } else if (nota <= 8) {\n                aprobados++;\n            } else {\n                sobresalientes++;\n            }\n        }\n        double media = (double) suma / n;\n        System.out.println(\"Suspensos: \" + suspensos);\n        System.out.println(\"Aprobados: \" + aprobados);\n        System.out.println(\"Sobresalientes: \" + sobresalientes);\n        System.out.println(\"Suma: \" + suma);\n        System.out.println(\"Media: \" + media);\n        teclado.close();\n    }\n}"
    },
    {
      "id": "max-min-position",
      "title": "El mayor y el menor, y dónde están",
      "time": "8 min",
      "idea": "Para encontrar el mayor y el menor en una sola pasada, recuerda el mejor hasta ahora y la vuelta en la que lo viste.",
      "theory": [
        {
          "title": "Empieza con el primer valor",
          "text": "En la primera vuelta no hay con qué comparar, así que el primer valor es el mayor y el menor. Compruébalo con `i == 1`."
        },
        {
          "title": "Reemplaza solo si es mejor",
          "text": "Usa `valor > maximo` (estrictamente mayor). Con valores iguales se queda la primera posición. Con `>=` pasaría a la última."
        },
        {
          "title": "Guarda también la posición",
          "text": "Cuando cambies el valor, cambia también la posición en el mismo bloque: `posMaximo = i;`."
        }
      ],
      "exampleTitle": "Encontrar el valor mayor",
      "exampleLead": "Lee N alturas y muestra la mayor y la vuelta en la que apareció primero. La menor es tu ejercicio.",
      "example": "import java.util.Scanner;\n\npublic class Demo19 {\n    public static void main(String[] args) {\n        Scanner teclado = new Scanner(System.in);\n        System.out.print(\"¿Cuántas alturas? \");\n        int n = teclado.nextInt();\n        int maxima = 0;\n        int posMaxima = 0;\n        for (int i = 1; i <= n; i++) {\n            System.out.print(\"Altura \" + i + \": \");\n            int altura = teclado.nextInt();\n            if (i == 1 || altura > maxima) {\n                maxima = altura;\n                posMaxima = i;\n            }\n        }\n        System.out.println(\"Máxima: \" + maxima + \" (posición \" + posMaxima + \")\");\n        teclado.close();\n    }\n}",
      "explain": [
        "`i == 1 || ...` acepta el primer valor sin compararlo con nada.",
        "Valor y posición se actualizan juntos, dentro del mismo `if`.",
        "El `>` estricto mantiene la primera posición cuando los valores se repiten."
      ],
      "task": "Pregunta cuántas puntuaciones hay y léelas. Muestra la puntuación más alta y la más baja, cada una con la posición en la que apareció primero.",
      "think": "¿Qué debes recordar entre vueltas para cada uno de los dos resultados? ¿Qué pasa con el primer valor?",
      "steps": [
        "Crea cuatro variables antes del bucle: la más alta, su posición, la más baja y su posición.",
        "Repite y lee una puntuación por vuelta.",
        "Actualiza la más alta (valor y posición) si la puntuación es mejor, o si es la primera.",
        "Haz lo mismo con la más baja y después muestra las dos."
      ],
      "hints": [
        "La más baja funciona exactamente igual que la más alta, con `<` en lugar de `>`.",
        "`if (i == 1 || puntos < minima) { minima = puntos; posMinima = i; }`"
      ],
      "recall": [
        {
          "do": "Valor mayor y su posición (la primera)",
          "code": "if (i == 1 || valor > maximo) {\n    maximo = valor;\n    posMaximo = i;\n}"
        },
        {
          "do": "Valor menor y su posición (la primera)",
          "code": "if (i == 1 || valor < minimo) {\n    minimo = valor;\n    posMinimo = i;\n}"
        }
      ],
      "filename": "Ejercicio19.java",
      "starter": "import java.util.Scanner;\n\npublic class Ejercicio19 {\n    public static void main(String[] args) {\n        Scanner teclado = new Scanner(System.in);\n        System.out.print(\"¿Cuántas puntuaciones? \");\n        int n = teclado.nextInt();\n        // Crea las cuatro variables antes del bucle\n        // Bucle: lee cada puntuación y actualiza la más alta y la más baja\n        // Muestra las dos con sus posiciones\n        teclado.close();\n    }\n}",
      "output": "¿Cuántas puntuaciones? 5\nPuntos 1: 40\nPuntos 2: 25\nPuntos 3: 90\nPuntos 4: 25\nPuntos 5: 90\nMás alta: 90 (posición 3)\nMás baja: 25 (posición 2)",
      "outputNote": "La más alta aparece dos veces (90) pero se muestra la primera posición. Igual con la más baja.",
      "solution": "import java.util.Scanner;\n\npublic class Ejercicio19 {\n    public static void main(String[] args) {\n        Scanner teclado = new Scanner(System.in);\n        System.out.print(\"¿Cuántas puntuaciones? \");\n        int n = teclado.nextInt();\n        int maxima = 0;\n        int posMaxima = 0;\n        int minima = 0;\n        int posMinima = 0;\n        for (int i = 1; i <= n; i++) {\n            System.out.print(\"Puntos \" + i + \": \");\n            int puntos = teclado.nextInt();\n            if (i == 1 || puntos > maxima) {\n                maxima = puntos;\n                posMaxima = i;\n            }\n            if (i == 1 || puntos < minima) {\n                minima = puntos;\n                posMinima = i;\n            }\n        }\n        System.out.println(\"Más alta: \" + maxima + \" (posición \" + posMaxima + \")\");\n        System.out.println(\"Más baja: \" + minima + \" (posición \" + posMinima + \")\");\n        teclado.close();\n    }\n}"
    },
    {
      "id": "menu-loop",
      "title": "Menús que se repiten",
      "time": "9 min",
      "idea": "Un menú muestra las opciones, hace lo que eliges y vuelve hasta que decides salir. Las variables fuera del bucle recuerdan lo que ha pasado.",
      "theory": [
        {
          "title": "`do-while` para el menú",
          "text": "El menú debe mostrarse al menos una vez, así que usa `do { ... } while (opcion != 0);`. La opción de salir es la que termina el bucle."
        },
        {
          "title": "`switch` para las opciones",
          "text": "Un `case` por opción, cada uno terminado en `break;`. `default` se ocupa de cualquier opción no válida."
        },
        {
          "title": "El estado vive fuera",
          "text": "El saldo, los contadores y la opción se declaran antes del `do`. Una variable usada en varios casos (como `importe`) también se declara antes del `switch`, o Java dice que ya está definida."
        }
      ],
      "exampleTitle": "Un menú con contador",
      "exampleLead": "La opción 1 suma uno, la 2 muestra la cuenta y la 0 sale.",
      "example": "import java.util.Scanner;\n\npublic class Demo20 {\n    public static void main(String[] args) {\n        Scanner teclado = new Scanner(System.in);\n        int cuenta = 0;\n        int opcion;\n        do {\n            System.out.println(\"1) Sumar uno  2) Ver  0) Salir\");\n            System.out.print(\"Opción: \");\n            opcion = teclado.nextInt();\n            switch (opcion) {\n                case 1:\n                    cuenta++;\n                    break;\n                case 2:\n                    System.out.println(\"Cuenta: \" + cuenta);\n                    break;\n                case 0:\n                    System.out.println(\"Adiós\");\n                    break;\n                default:\n                    System.out.println(\"Opción no válida\");\n            }\n        } while (opcion != 0);\n        teclado.close();\n    }\n}",
      "explain": [
        "`cuenta` se declara antes del bucle, así que sobrevive a cada vuelta.",
        "Cada `case` termina con `break;` y `default` recoge las opciones no válidas.",
        "El bucle se repite mientras la opción no sea 0."
      ],
      "task": "Haz un menú de monedero. El saldo empieza en 20.0. La opción 1 ingresa (importe > 0), la 2 retira (importe > 0 y no mayor que el saldo), la 3 muestra el saldo y cuántos ingresos y retiradas se han hecho, y la 0 sale.",
      "think": "¿Qué valores deben sobrevivir entre vueltas del menú? ¿Qué decide si una retirada está permitida?",
      "steps": [
        "Declara el saldo, los dos contadores, el importe y la opción antes del bucle.",
        "Escribe el `do-while` que muestra el menú y lee la opción.",
        "Añade un `case` por opción, empezando por las fáciles (3 y 0).",
        "En ingresar y retirar, comprueba el importe antes de cambiar el saldo.",
        "Prueba una opción no válida y una retirada mayor que el saldo."
      ],
      "hints": [
        "Para retirar necesitas tres resultados: importe no válido, saldo insuficiente o correcto. Eso es `if`, `else if`, `else`.",
        "`if (importe <= 0) { ... } else if (importe > saldo) { ... } else { saldo -= importe; retiradas++; }`"
      ],
      "recall": [
        {
          "do": "Esqueleto de un menú que se repite",
          "code": "int opcion;\ndo {\n    System.out.println(\"1) ...  0) Salir\");\n    opcion = teclado.nextInt();\n    switch (opcion) {\n        case 1:\n            // ...\n            break;\n        case 0:\n            break;\n        default:\n            System.out.println(\"Opción no válida\");\n    }\n} while (opcion != 0);"
        }
      ],
      "filename": "Ejercicio20.java",
      "starter": "import java.util.Scanner;\n\npublic class Ejercicio20 {\n    public static void main(String[] args) {\n        Scanner teclado = new Scanner(System.in);\n        double saldo = 20.0;\n        int ingresos = 0;\n        int retiradas = 0;\n        double importe;\n        int opcion;\n        // Repite el menú hasta que la opción sea 0\n        // 1 Ingresar: pide el importe (> 0) y súmalo\n        // 2 Retirar: pide el importe (> 0); solo si hay saldo suficiente\n        // 3 Mostrar el saldo y los dos contadores\n        // 0 Salir. Cualquier otra: opción no válida\n        teclado.close();\n    }\n}",
      "output": "1) Ingresar  2) Retirar  3) Ver  0) Salir\nOpción: 1\nImporte: 10\nIngresado\n\n1) Ingresar  2) Retirar  3) Ver  0) Salir\nOpción: 2\nImporte: 50\nSaldo insuficiente\n\n1) Ingresar  2) Retirar  3) Ver  0) Salir\nOpción: 2\nImporte: 5\nRetirado\n\n1) Ingresar  2) Retirar  3) Ver  0) Salir\nOpción: 3\nSaldo: 25.0\nIngresos: 1, retiradas: 1\n\n1) Ingresar  2) Retirar  3) Ver  0) Salir\nOpción: 7\nOpción no válida\n\n1) Ingresar  2) Retirar  3) Ver  0) Salir\nOpción: 0\nHasta pronto",
      "outputNote": "Los valores después de \"Opción\" e \"Importe\" son lo que escribes. La retirada de 50 se rechaza.",
      "solution": "import java.util.Scanner;\n\npublic class Ejercicio20 {\n    public static void main(String[] args) {\n        Scanner teclado = new Scanner(System.in);\n        double saldo = 20.0;\n        int ingresos = 0;\n        int retiradas = 0;\n        double importe;\n        int opcion;\n        do {\n            System.out.println();\n            System.out.println(\"1) Ingresar  2) Retirar  3) Ver  0) Salir\");\n            System.out.print(\"Opción: \");\n            opcion = teclado.nextInt();\n            switch (opcion) {\n                case 1:\n                    System.out.print(\"Importe: \");\n                    importe = teclado.nextDouble();\n                    if (importe > 0) {\n                        saldo += importe;\n                        ingresos++;\n                        System.out.println(\"Ingresado\");\n                    } else {\n                        System.out.println(\"El importe debe ser mayor que 0\");\n                    }\n                    break;\n                case 2:\n                    System.out.print(\"Importe: \");\n                    importe = teclado.nextDouble();\n                    if (importe <= 0) {\n                        System.out.println(\"El importe debe ser mayor que 0\");\n                    } else if (importe > saldo) {\n                        System.out.println(\"Saldo insuficiente\");\n                    } else {\n                        saldo -= importe;\n                        retiradas++;\n                        System.out.println(\"Retirado\");\n                    }\n                    break;\n                case 3:\n                    System.out.println(\"Saldo: \" + saldo);\n                    System.out.println(\"Ingresos: \" + ingresos + \", retiradas: \" + retiradas);\n                    break;\n                case 0:\n                    System.out.println(\"Hasta pronto\");\n                    break;\n                default:\n                    System.out.println(\"Opción no válida\");\n            }\n        } while (opcion != 0);\n        teclado.close();\n    }\n}"
    },
    {
      "id": "problem-statistics",
      "title": "Problema de práctica: informe de lluvia",
      "time": "15 min",
      "idea": "Un problema completo: valida los datos, lee N valores en una sola pasada y muestra recuentos, extremos con su posición, total y media. No hacen falta arrays.",
      "theory": [
        {
          "title": "Lee el enunciado dos veces",
          "text": "Subraya todo lo que debes mostrar y cada regla (validar, una pasada). Cada cosa se convierte en una variable o un `if`."
        },
        {
          "title": "Constrúyelo por capas",
          "text": "No escribas todo de golpe. Haz que funcione una capa, ejecútala y añade la siguiente. Un programa que se ejecuta y hace poco vale más que uno que hace mucho y no compila."
        },
        {
          "title": "Usa lo que ya sabes",
          "text": "Validación: lección 16. Contar por grupos y sumas: lección 18. Mayor y menor con posición: lección 19."
        }
      ],
      "exampleTitle": "El esqueleto",
      "exampleLead": "La capa 1 está escrita y se ejecuta. Las demás capas son solo comentarios: tu plan.",
      "example": "import java.util.Scanner;\n\npublic class Demo21 {\n    public static void main(String[] args) {\n        Scanner teclado = new Scanner(System.in);\n\n        // Capa 1: leer y validar N\n        System.out.print(\"Días: \");\n        int dias = teclado.nextInt();\n        if (dias <= 0) {\n            System.out.println(\"Error: los días deben ser más de 0\");\n            teclado.close();\n            return;\n        }\n\n        // Capa 2: variables que viven fuera del bucle\n        // Capa 3: bucle que lee cada valor\n        // Capa 4: actualizar contadores, suma, máximo y mínimo dentro del bucle\n        // Capa 5: mostrar los resultados\n\n        teclado.close();\n    }\n}",
      "explain": [
        "La capa 1 ya termina el programa si N es incorrecto.",
        "Las capas 2 a 5 son las mismas piezas de las lecciones 18 y 19.",
        "Ejecuta el programa después de cada capa que termines."
      ],
      "task": [
        "Pide el número de días N.",
        "Si N no es mayor que 0, muestra un error y termina.",
        "Después lee N valores de lluvia en mm enteros (0 o más).",
        "Muestra: cuántos días fueron secos (0 mm), flojos (de 1 a 10 mm) y fuertes (más de 10 mm); el día más lluvioso y el más seco con el primer día en que aparecieron; el total; y la media.",
        "Hazlo en una sola pasada, sin guardar los valores."
      ],
      "think": "Haz una lista de todo lo que debes mostrar. Para cada cosa, ¿qué variable necesitas y qué debe hacer en cada vuelta del bucle?",
      "steps": [
        "Capa 1: pide N y valídalo.",
        "Capa 2: crea los contadores, el total, el más lluvioso y el más seco (valor y día).",
        "Capa 3: escribe el bucle y lee cada valor. Ejecútalo.",
        "Capa 4: dentro del bucle, suma al total y cuenta el grupo.",
        "Capa 4: actualiza el más lluvioso y el más seco con su día.",
        "Capa 5: muestra el informe. Pruébalo con el ejemplo y con N = 0."
      ],
      "hints": [
        "Es la lección 18 (contadores y suma) más la lección 19 (mayor y menor) dentro de un mismo bucle. La media es `(double) total / dias`.",
        "En el bucle: `total += mm;`, luego `if (mm == 0) { secos++; } else if (mm <= 10) { flojos++; } else { fuertes++; }` y después dos bloques `if (dia == 1 || ...)`."
      ],
      "recall": [
        {
          "do": "Esqueleto: validar, variables, bucle, informe",
          "code": "int n = teclado.nextInt();\nif (n <= 0) {\n    System.out.println(\"Error\");\n    return;\n}\nint suma = 0;\nfor (int i = 1; i <= n; i++) {\n    int valor = teclado.nextInt();\n    suma += valor;\n}\nSystem.out.println(suma);"
        }
      ],
      "filename": "Ejercicio21.java",
      "starter": "import java.util.Scanner;\n\npublic class Ejercicio21 {\n    public static void main(String[] args) {\n        Scanner teclado = new Scanner(System.in);\n        // Capa 1: pide los días y valídalos (> 0)\n        // Capa 2: crea contadores, total, más lluvioso y más seco (valor y día)\n        // Capa 3: recorre los días y lee cada lluvia\n        // Capa 4: dentro del bucle, actualiza todo\n        // Capa 5: muestra el informe\n        teclado.close();\n    }\n}",
      "output": "Días: 5\nDía 1 (mm): 0\nDía 2 (mm): 12\nDía 3 (mm): 4\nDía 4 (mm): 12\nDía 5 (mm): 0\n\nSecos: 2, flojos: 1, fuertes: 2\nMás lluvioso: 12 mm (día 2)\nMás seco: 0 mm (día 1)\nTotal: 28 mm\nMedia: 5.6",
      "outputNote": "El día más lluvioso es el primer 12 (día 2) y el más seco es el primer 0 (día 1). Prueba también con 0 días.",
      "solution": "import java.util.Scanner;\n\npublic class Ejercicio21 {\n    public static void main(String[] args) {\n        Scanner teclado = new Scanner(System.in);\n        System.out.print(\"Días: \");\n        int dias = teclado.nextInt();\n        if (dias <= 0) {\n            System.out.println(\"Error: los días deben ser más de 0\");\n            teclado.close();\n            return;\n        }\n        int secos = 0;\n        int flojos = 0;\n        int fuertes = 0;\n        int total = 0;\n        int masLluvioso = 0;\n        int diaMasLluvioso = 0;\n        int masSeco = 0;\n        int diaMasSeco = 0;\n        for (int dia = 1; dia <= dias; dia++) {\n            System.out.print(\"Día \" + dia + \" (mm): \");\n            int mm = teclado.nextInt();\n            total += mm;\n            if (mm == 0) {\n                secos++;\n            } else if (mm <= 10) {\n                flojos++;\n            } else {\n                fuertes++;\n            }\n            if (dia == 1 || mm > masLluvioso) {\n                masLluvioso = mm;\n                diaMasLluvioso = dia;\n            }\n            if (dia == 1 || mm < masSeco) {\n                masSeco = mm;\n                diaMasSeco = dia;\n            }\n        }\n        System.out.println();\n        System.out.println(\"Secos: \" + secos + \", flojos: \" + flojos + \", fuertes: \" + fuertes);\n        System.out.println(\"Más lluvioso: \" + masLluvioso + \" mm (día \" + diaMasLluvioso + \")\");\n        System.out.println(\"Más seco: \" + masSeco + \" mm (día \" + diaMasSeco + \")\");\n        System.out.println(\"Total: \" + total + \" mm\");\n        System.out.println(\"Media: \" + (double) total / dias);\n        teclado.close();\n    }\n}"
    },
    {
      "id": "problem-menu",
      "title": "Problema de práctica: máquina expendedora",
      "time": "15 min",
      "idea": "Un problema completo: un menú que se repite, cambia un saldo, valida importes y lleva estadísticas.",
      "theory": [
        {
          "title": "Escribe primero el estado",
          "text": "Haz una lista de lo que el programa debe recordar: crédito, compras hechas, compras rechazadas. Cada cosa es una variable declarada antes del bucle."
        },
        {
          "title": "Constrúyelo por capas",
          "text": "Primero el menú con solo la opción 0 funcionando. Después una opción cada vez. Ejecuta después de cada una."
        },
        {
          "title": "Comprueba antes de cambiar",
          "text": "Antes de restar dinero, comprueba que hay suficiente. Antes de sumar, comprueba que el importe es válido. Un dato incorrecto no debe tocar el estado."
        }
      ],
      "exampleTitle": "El esqueleto",
      "exampleLead": "El menú ya funciona con la opción 0. Las demás opciones te están esperando.",
      "example": "import java.util.Scanner;\n\npublic class Demo22 {\n    public static void main(String[] args) {\n        Scanner teclado = new Scanner(System.in);\n        double credito = 5.0;\n        int opcion;\n        do {\n            System.out.println(\"1) Moneda  2) Comprar  3) Devolver  4) Estado  0) Salir\");\n            System.out.print(\"Opción: \");\n            opcion = teclado.nextInt();\n            switch (opcion) {\n                // case 1, 2, 3, 4: tu trabajo\n                case 0:\n                    System.out.println(\"Hasta pronto\");\n                    break;\n                default:\n                    System.out.println(\"Opción no válida\");\n            }\n        } while (opcion != 0);\n        teclado.close();\n    }\n}",
      "explain": [
        "`credito` empieza en 5.0 y se declara fuera del bucle.",
        "Añade los contadores que necesites junto a `credito`.",
        "Cada opción nueva es un `case` más."
      ],
      "task": [
        "El crédito empieza en 5.0.",
        "Repite un menú hasta 0:",
        "(1) insertar moneda: pide el importe (> 0) y súmalo al crédito, contando las monedas.",
        "(2) comprar: pide el precio (> 0); si no es mayor que el crédito, réstalo y cuenta una compra; si no, avisa de que no hay crédito suficiente y cuenta una compra rechazada.",
        "(3) devolver: muestra el crédito devuelto y ponlo a 0.",
        "(4) estado: crédito, monedas, compras y compras rechazadas.",
        "(0) salir.",
        "Los importes o las opciones incorrectos muestran un mensaje y no cambian nada."
      ],
      "think": "¿Qué debe recordar el programa? Para cada opción, ¿qué variables cambian y qué hay que comprobar antes?",
      "steps": [
        "Declara el crédito y los tres contadores antes del bucle.",
        "Menú con la opción 0 y `default`. Ejecútalo.",
        "Opción 4 (estado) y opción 3 (devolver): no necesitan comprobaciones.",
        "Opción 1: valida el importe, súmalo y cuenta la moneda.",
        "Opción 2: valida el precio y después hay crédito suficiente o no.",
        "Prueba todas las opciones, también las incorrectas."
      ],
      "hints": [
        "La opción 2 tiene tres resultados, como la retirada de la lección 20: precio no válido, crédito insuficiente o compra hecha.",
        "`if (precio <= 0) { ... } else if (precio > credito) { rechazadas++; ... } else { credito -= precio; compras++; ... }` y declara `double importe;` antes del `do`."
      ],
      "recall": [
        {
          "do": "Comprobar que hay suficiente antes de restar",
          "code": "if (importe > saldo) {\n    System.out.println(\"Saldo insuficiente\");\n} else {\n    saldo -= importe;\n}"
        }
      ],
      "filename": "Ejercicio22.java",
      "starter": "import java.util.Scanner;\n\npublic class Ejercicio22 {\n    public static void main(String[] args) {\n        Scanner teclado = new Scanner(System.in);\n        double credito = 5.0;\n        double importe;\n        int opcion;\n        // Declara los contadores: monedas, compras, rechazadas\n        // Repite el menú hasta 0. Añade una opción cada vez\n        teclado.close();\n    }\n}",
      "output": "1) Moneda  2) Comprar  3) Devolver  4) Estado  0) Salir\nOpción: 2\nPrecio del producto: 1.5\n¡Que aproveche! Crédito: 3.5\n\n1) Moneda  2) Comprar  3) Devolver  4) Estado  0) Salir\nOpción: 2\nPrecio del producto: 9\nCrédito insuficiente\n\n1) Moneda  2) Comprar  3) Devolver  4) Estado  0) Salir\nOpción: 1\nImporte de la moneda: -3\nEl importe debe ser mayor que 0\n\n1) Moneda  2) Comprar  3) Devolver  4) Estado  0) Salir\nOpción: 1\nImporte de la moneda: 2\nCrédito: 5.5\n\n1) Moneda  2) Comprar  3) Devolver  4) Estado  0) Salir\nOpción: 4\nCrédito: 5.5\nMonedas: 1\nCompras: 1\nRechazadas: 1\n\n1) Moneda  2) Comprar  3) Devolver  4) Estado  0) Salir\nOpción: 3\nDevuelto: 5.5\n\n1) Moneda  2) Comprar  3) Devolver  4) Estado  0) Salir\nOpción: 0\nHasta pronto",
      "outputNote": "La compra de 9 se rechaza, la moneda de -3 se rechaza y la devolución entrega todo lo que queda.",
      "solution": "import java.util.Scanner;\n\npublic class Ejercicio22 {\n    public static void main(String[] args) {\n        Scanner teclado = new Scanner(System.in);\n        double credito = 5.0;\n        int monedas = 0;\n        int compras = 0;\n        int rechazadas = 0;\n        double importe;\n        int opcion;\n        do {\n            System.out.println();\n            System.out.println(\"1) Moneda  2) Comprar  3) Devolver  4) Estado  0) Salir\");\n            System.out.print(\"Opción: \");\n            opcion = teclado.nextInt();\n            switch (opcion) {\n                case 1:\n                    System.out.print(\"Importe de la moneda: \");\n                    importe = teclado.nextDouble();\n                    if (importe > 0) {\n                        credito += importe;\n                        monedas++;\n                        System.out.println(\"Crédito: \" + credito);\n                    } else {\n                        System.out.println(\"El importe debe ser mayor que 0\");\n                    }\n                    break;\n                case 2:\n                    System.out.print(\"Precio del producto: \");\n                    importe = teclado.nextDouble();\n                    if (importe <= 0) {\n                        System.out.println(\"El precio debe ser mayor que 0\");\n                    } else if (importe > credito) {\n                        rechazadas++;\n                        System.out.println(\"Crédito insuficiente\");\n                    } else {\n                        credito -= importe;\n                        compras++;\n                        System.out.println(\"¡Que aproveche! Crédito: \" + credito);\n                    }\n                    break;\n                case 3:\n                    System.out.println(\"Devuelto: \" + credito);\n                    credito = 0;\n                    break;\n                case 4:\n                    System.out.println(\"Crédito: \" + credito);\n                    System.out.println(\"Monedas: \" + monedas);\n                    System.out.println(\"Compras: \" + compras);\n                    System.out.println(\"Rechazadas: \" + rechazadas);\n                    break;\n                case 0:\n                    System.out.println(\"Hasta pronto\");\n                    break;\n                default:\n                    System.out.println(\"Opción no válida\");\n            }\n        } while (opcion != 0);\n        teclado.close();\n    }\n}"
    },
    {
      "id": "problem-tariff",
      "title": "Problema de práctica: tarifa de aparcamiento",
      "time": "15 min",
      "idea": "Un problema completo: varios datos de entrada, un precio por tramos, un descuento según el tipo, un recargo, IVA y un recibo detallado.",
      "theory": [
        {
          "title": "Una variable por paso",
          "text": "Precio base, descuento, recargo, base imponible, IVA, total: cada uno en su propia variable, en el orden que describe el enunciado."
        },
        {
          "title": "Tramos con `if`",
          "text": "Empieza con el precio del primer tramo y añade el extra solo cuando se supera el límite: `if (horas > 2) { precio += (horas - 2) * 1.5; }`."
        },
        {
          "title": "Constrúyelo por capas",
          "text": "Primero los datos y la validación, luego el cálculo y por último la salida. Muestra los valores intermedios mientras pruebas."
        }
      ],
      "exampleTitle": "El esqueleto",
      "exampleLead": "Los datos de entrada están escritos. El cálculo y el recibo son tuyos.",
      "example": "import java.util.Scanner;\n\npublic class Demo23 {\n    public static void main(String[] args) {\n        Scanner teclado = new Scanner(System.in);\n        final double IVA = 0.21;\n\n        System.out.print(\"Horas aparcado: \");\n        int horas = teclado.nextInt();\n        if (horas < 0) {\n            System.out.println(\"Error: las horas no pueden ser negativas\");\n            teclado.close();\n            return;\n        }\n\n        // Siguiente: los otros datos de entrada\n        // Después: precio base, descuento, recargo, base imponible, IVA, total\n        // Al final: el recibo\n\n        teclado.close();\n    }\n}",
      "explain": [
        "El primer dato se lee y se valida antes que nada.",
        "El tipo de IVA es una constante, así es fácil de cambiar.",
        "Haz el cálculo solo cuando todos los datos sean válidos."
      ],
      "task": [
        "Pide las horas aparcado (entero, 0 o más; si no, error y terminar), el tipo de vehículo (1 = Coche, 2 = Moto, 3 = Eléctrico; si no, error y terminar) y si pasó la noche (S/N).",
        "Precio base: hasta 2 horas cuesta 3.00; más de 2 horas cuesta 3.00 más 1.50 por cada hora extra.",
        "Descuento sobre el precio base: Moto 50 %, Eléctrico 20 %, Coche ninguno.",
        "Recargo nocturno: +6.00.",
        "Aplica un 21 % de IVA al final.",
        "Muestra: horas, precio base, descuento, recargo, base imponible, IVA y TOTAL, con 2 decimales."
      ],
      "think": "¿En qué orden se aplican los importes? ¿Sobre qué importe se calcula el descuento y sobre cuál el IVA?",
      "steps": [
        "Lee y valida las horas. Ejecútalo.",
        "Lee y valida el tipo de vehículo y después lee la letra de la noche.",
        "Calcula el precio base con los tramos.",
        "Calcula el porcentaje de descuento según el tipo y después el descuento.",
        "Calcula el recargo, la base imponible, el IVA y el total.",
        "Muestra el recibo con `printf` y prueba los tres tipos de vehículo."
      ],
      "hints": [
        "El descuento se calcula solo sobre el precio base, y el IVA se calcula sobre `precio base - descuento + recargo`.",
        "`double tasa = 0; if (tipo == 2) { tasa = 0.5; } else if (tipo == 3) { tasa = 0.2; }` y después `descuento = precioBase * tasa;`"
      ],
      "recall": [
        {
          "do": "Cobrar extra solo a partir de un límite",
          "code": "double precio = 3.0;\nif (horas > 2) {\n    precio += (horas - 2) * 1.5;\n}"
        }
      ],
      "filename": "Ejercicio23.java",
      "starter": "import java.util.Scanner;\n\npublic class Ejercicio23 {\n    public static void main(String[] args) {\n        Scanner teclado = new Scanner(System.in);\n        final double IVA = 0.21;\n        // Lee y valida las horas\n        // Lee y valida el tipo de vehículo, lee la letra de la noche (S/N)\n        // Calcula: precio base, descuento, recargo, base imponible, IVA, total\n        // Muestra el recibo con 2 decimales\n        teclado.close();\n    }\n}",
      "output": "Horas aparcado: 4\nVehículo (1 = Coche, 2 = Moto, 3 = Eléctrico): 3\n¿Pasó la noche? (S/N): n\n\nHoras: 4\nPrecio base: 6.00\nDescuento: 1.20\nRecargo: 0.00\nBase imponible: 4.80\nIVA: 1.01\nTOTAL: 5.81",
      "outputNote": "Con 4 horas el precio base es 6.00 y el descuento eléctrico es del 20 %. Prueba con 1 hora, una moto y noche.",
      "solution": "import java.util.Scanner;\n\npublic class Ejercicio23 {\n    public static void main(String[] args) {\n        Scanner teclado = new Scanner(System.in);\n        final double IVA = 0.21;\n\n        System.out.print(\"Horas aparcado: \");\n        int horas = teclado.nextInt();\n        if (horas < 0) {\n            System.out.println(\"Error: las horas no pueden ser negativas\");\n            teclado.close();\n            return;\n        }\n        System.out.print(\"Vehículo (1 = Coche, 2 = Moto, 3 = Eléctrico): \");\n        int tipo = teclado.nextInt();\n        if (tipo < 1 || tipo > 3) {\n            System.out.println(\"Error: tipo de vehículo desconocido\");\n            teclado.close();\n            return;\n        }\n        System.out.print(\"¿Pasó la noche? (S/N): \");\n        char noche = Character.toUpperCase(teclado.next().charAt(0));\n\n        double precioBase = 3.0;\n        if (horas > 2) {\n            precioBase += (horas - 2) * 1.5;\n        }\n        double tasa = 0;\n        if (tipo == 2) {\n            tasa = 0.5;\n        } else if (tipo == 3) {\n            tasa = 0.2;\n        }\n        double descuento = precioBase * tasa;\n        double recargo = 0;\n        if (noche == 'S') {\n            recargo = 6.0;\n        }\n        double imponible = precioBase - descuento + recargo;\n        double iva = imponible * IVA;\n        double total = imponible + iva;\n\n        System.out.println();\n        System.out.printf(\"Horas: %d%n\", horas);\n        System.out.printf(\"Precio base: %.2f%n\", precioBase);\n        System.out.printf(\"Descuento: %.2f%n\", descuento);\n        System.out.printf(\"Recargo: %.2f%n\", recargo);\n        System.out.printf(\"Base imponible: %.2f%n\", imponible);\n        System.out.printf(\"IVA: %.2f%n\", iva);\n        System.out.printf(\"TOTAL: %.2f%n\", total);\n        teclado.close();\n    }\n}"
    },
    {
      "id": "one-dimensional-arrays",
      "title": "Arrays: listas de valores",
      "time": "6 min",
      "idea": "Un array guarda varios valores del mismo tipo bajo un solo nombre. Cada valor tiene una posición llamada índice.",
      "theory": [
        {
          "title": "Índices desde cero",
          "text": "En `{4, 6, 8}`, la posición 0 contiene 4, la 1 contiene 6 y la 2 contiene 8."
        },
        {
          "title": "Longitud",
          "text": "`numeros.length` indica cuántos elementos hay. Si hay 3 elementos, el último índice es 2."
        },
        {
          "title": "Recorrerlo",
          "text": "Usa `for (int i = 0; i < numeros.length; i++)` para visitar todas las posiciones sin salirte del array."
        }
      ],
      "exampleTitle": "Recorrer un array",
      "exampleLead": "El bucle utiliza la posición `i` para acceder a cada elemento.",
      "example": "public class Demo24 {\n    public static void main(String[] args) {\n        int[] numeros = {4, 6, 8};\n        for (int i = 0; i < numeros.length; i++) {\n            System.out.println(numeros[i]);\n        }\n    }\n}",
      "explain": [
        "`int[]` declara un array de enteros.",
        "`numeros[i]` obtiene el elemento situado en la posición i.",
        "La condición usa `< numeros.length`, no `<=`, para no intentar leer una posición inexistente."
      ],
      "task": "Calcula la suma y la media de los valores `{4, 6, 8}`.",
      "think": "¿Cómo recorres todos los elementos? ¿Qué vas acumulando mientras los recorres?",
      "steps": [
        "Crea el array y una `suma` que empiece en 0.",
        "Recorre cada elemento y súmalo a `suma`.",
        "Divide entre el número de elementos conservando los decimales.",
        "Muestra los dos resultados."
      ],
      "hints": [
        "El primer índice es 0 y el último es `length - 1`. Un `for` con `i < numeros.length` los recorre todos.",
        "Dentro del bucle: `suma += numeros[i];`. Después: `(double) suma / numeros.length`."
      ],
      "recall": [
        {
          "do": "Crear un array",
          "code": "int[] numeros = {2, 4, 6};"
        },
        {
          "do": "Leer un elemento / el tamaño",
          "code": "numeros[0]\nnumeros.length"
        },
        {
          "do": "Recorrer todos los elementos",
          "code": "for (int i = 0; i < numeros.length; i++) {\n    System.out.println(numeros[i]);\n}"
        }
      ],
      "filename": "Ejercicio24.java",
      "starter": "public class Ejercicio24 {\n    public static void main(String[] args) {\n        int[] numeros = {4, 6, 8};\n        int suma = 0;\n        // Recorre el array y suma sus valores\n        // Calcula y muestra la media\n    }\n}",
      "output": "Suma: 18\nMedia: 6.0",
      "outputNote": "La suma es 18 y se divide entre los tres elementos.",
      "solution": "public class Ejercicio24 {\n    public static void main(String[] args) {\n        int[] numeros = {4, 6, 8};\n        int suma = 0;\n        for (int i = 0; i < numeros.length; i++) {\n            suma += numeros[i];\n        }\n        double media = (double) suma / numeros.length;\n        System.out.println(\"Suma: \" + suma);\n        System.out.println(\"Media: \" + media);\n    }\n}"
    },
    {
      "id": "two-dimensional-arrays",
      "title": "Matrices: filas y columnas",
      "time": "6 min",
      "idea": "Una matriz es un array de arrays. Sirve para representar datos en filas y columnas, como una tabla.",
      "theory": [
        {
          "title": "Dos índices",
          "text": "Se accede con `tabla[fila][columna]`: primero se indica la fila y después la columna."
        },
        {
          "title": "Ambos empiezan en cero",
          "text": "`tabla[0][0]` es la primera fila, primera columna."
        },
        {
          "title": "Recorrer una matriz",
          "text": "Normalmente se usan dos bucles: el exterior recorre las filas y el interior recorre las columnas."
        }
      ],
      "exampleTitle": "Leer una posición",
      "exampleLead": "La matriz tiene dos filas y dos columnas.",
      "example": "public class Demo25 {\n    public static void main(String[] args) {\n        int[][] tabla = {\n            {5, 1},\n            {-2, 3}\n        };\n        System.out.println(tabla[1][0]);\n    }\n}",
      "explain": [
        "`tabla[0]` es la primera fila.",
        "`tabla[1][0]` significa segunda fila y primera columna.",
        "El resultado es `-2`."
      ],
      "task": "Crea la matriz `{{2, 4}, {6, 8}}` y muestra 4 y 6, cada uno en una línea.",
      "think": "En `tabla[a][b]`, ¿cuál es la fila y cuál la columna? Recuerda que se cuenta desde 0.",
      "steps": [
        "Crea la matriz.",
        "Dibújala en papel y localiza el 4 y el 6 (filas y columnas empiezan en 0).",
        "Muestra cada uno en su propia línea."
      ],
      "hints": [
        "El patrón es `tabla[fila][columna]`, ambos desde 0.",
        "La fila 0 es `2 4` y la fila 1 es `6 8`. Lee la posición de cada número en tu dibujo."
      ],
      "recall": [
        {
          "do": "Crear una matriz",
          "code": "int[][] tabla = {{1, 2}, {3, 4}};"
        },
        {
          "do": "Leer una celda (fila, columna)",
          "code": "tabla[1][0]"
        },
        {
          "do": "Recorrer todas las celdas",
          "code": "for (int f = 0; f < tabla.length; f++) {\n    for (int c = 0; c < tabla[f].length; c++) {\n        System.out.println(tabla[f][c]);\n    }\n}"
        }
      ],
      "filename": "Ejercicio25.java",
      "starter": "public class Ejercicio25 {\n    public static void main(String[] args) {\n        // Crea la matriz de dos filas\n        // Muestra el 4\n        // Muestra el 6\n    }\n}",
      "output": "4\n6",
      "outputNote": "Primero fila, después columna; la primera posición siempre es 0.",
      "solution": "public class Ejercicio25 {\n    public static void main(String[] args) {\n        int[][] tabla = {{2, 4}, {6, 8}};\n        System.out.println(tabla[0][1]);\n        System.out.println(tabla[1][0]);\n    }\n}"
    },
    {
      "id": "final-project",
      "title": "Proyecto final: calcular una media",
      "time": "8 min",
      "idea": "Este ejercicio reúne variables, arrays, bucles, operaciones y condiciones. Es un ejemplo pequeño de cómo combinar conceptos.",
      "theory": [
        {
          "title": "Planifica",
          "text": "Primero identifica qué datos tienes, qué resultado necesitas y qué pasos hay que seguir."
        },
        {
          "title": "Calcula",
          "text": "Suma todos los elementos del array y divide por la cantidad de notas. Convierte a `double` para conservar decimales."
        },
        {
          "title": "Decide",
          "text": "Usa `if` para mostrar si la media llega al 5. Cambia las notas para probar ambos resultados."
        }
      ],
      "exampleTitle": "El patrón completo",
      "exampleLead": "Primero se suma, después se calcula la media y por último se toma una decisión.",
      "example": "public class Demo26 {\n    public static void main(String[] args) {\n        int[] notas = {7, 5, 6};\n        int suma = 0;\n        for (int i = 0; i < notas.length; i++) {\n            suma += notas[i];\n        }\n        double media = (double) suma / notas.length;\n        System.out.println(\"Media: \" + media);\n        if (media >= 5) {\n            System.out.println(\"Aprobado\");\n        } else {\n            System.out.println(\"Suspenso\");\n        }\n    }\n}",
      "explain": [
        "El bucle suma todas las notas.",
        "La conversión `(double)` permite que la media tenga decimales.",
        "La condición decide qué mensaje mostrar."
      ],
      "task": "Modifica el programa para usar las notas `{3, 8, 9, 5}`. Muestra la media y si aprueba.",
      "think": "Si solo cambias los datos, ¿qué parte del programa sigue igual? Predice la media antes de ejecutar.",
      "steps": [
        "Lee el programa y explica en voz alta qué hace cada parte.",
        "Suma las cuatro notas a mano y divide entre 4.",
        "Completa las partes que faltan en la plantilla.",
        "Ejecútalo y compáralo con tu predicción."
      ],
      "hints": [
        "El bucle y el cálculo de la media sirven para cualquier número de notas. Lo único nuevo es decidir si aprueba.",
        "Mismo patrón de antes: `suma += notas[i];`, luego `(double) suma / notas.length`, luego `if (media >= 5) { ... } else { ... }`."
      ],
      "recall": [
        {
          "do": "Media de un array",
          "code": "double media = (double) suma / numeros.length;"
        },
        {
          "do": "Decidir si aprueba",
          "code": "if (media >= 5) {\n    System.out.println(\"Aprobado\");\n} else {\n    System.out.println(\"Suspenso\");\n}"
        }
      ],
      "filename": "Ejercicio26.java",
      "starter": "public class Ejercicio26 {\n    public static void main(String[] args) {\n        int[] notas = {3, 8, 9, 5};\n        int suma = 0;\n        // Suma las notas con un for\n        // Calcula la media\n        // Muestra la media y decide si aprueba\n    }\n}",
      "output": "Media: 6.25\nAprobado",
      "outputNote": "Prueba también con `{2, 3, 4}`: debe aparecer Suspenso.",
      "solution": "public class Ejercicio26 {\n    public static void main(String[] args) {\n        int[] notas = {3, 8, 9, 5};\n        int suma = 0;\n        for (int i = 0; i < notas.length; i++) {\n            suma += notas[i];\n        }\n        double media = (double) suma / notas.length;\n        System.out.println(\"Media: \" + media);\n        if (media >= 5) {\n            System.out.println(\"Aprobado\");\n        } else {\n            System.out.println(\"Suspenso\");\n        }\n    }\n}"
    }
  ]
};
