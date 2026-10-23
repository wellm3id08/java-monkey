JM.templatePacks = [
  {
    "id": "daw-es",
    "name": "Java DAW",
    "lang": "es",
    "templates": [
      {
        "name": "imprimir",
        "description": "IMPRIMIR: System.out.println",
        "pattern": "System.out.println(${cursor});"
      },
      {
        "name": "imprimirsin",
        "description": "IMPRIMIRSIN: System.out.print (sin salto)",
        "pattern": "System.out.print(${cursor});"
      },
      {
        "name": "imprimirvar",
        "description": "IMPRIMIRVAR: texto + variable",
        "pattern": "System.out.println(\"${texto}: \" + ${variable});${cursor}"
      },
      {
        "name": "imprimirf",
        "description": "IMPRIMIRF: printf con formato",
        "pattern": "System.out.printf(\"${cursor}%n\");"
      },
      {
        "name": "import",
        "description": "IMPORT: crea el Scanner teclado (con import)",
        "pattern": "${imp:import(java.util.Scanner)}Scanner teclado = new Scanner(System.in);\n${cursor}"
      },
      {
        "name": "leer",
        "description": "LEER: lee texto",
        "pattern": "String ${texto} = teclado.nextLine();${cursor}"
      },
      {
        "name": "leerint",
        "description": "LEERINT: lee un entero",
        "pattern": "int ${numero} = teclado.nextInt();\nteclado.nextLine();\n${cursor}"
      },
      {
        "name": "leerdouble",
        "description": "LEERDOUBLE: lee un decimal",
        "pattern": "double ${decimal} = teclado.nextDouble();\nteclado.nextLine();\n${cursor}"
      },
      {
        "name": "leerchar",
        "description": "LEERCHAR: lee un caracter",
        "pattern": "char ${letra} = teclado.nextLine().charAt(0);${cursor}"
      },
      {
        "name": "cerrar",
        "description": "CERRAR: cierra el Scanner",
        "pattern": "teclado.close();"
      },
      {
        "name": "si",
        "description": "SI: if",
        "pattern": "if (${condicion}) {\n\t${cursor}\n}"
      },
      {
        "name": "sino",
        "description": "SINO: if / else",
        "pattern": "if (${condicion}) {\n\t${cursor}\n} else {\n\t\n}"
      },
      {
        "name": "sisino",
        "description": "SISINO: if / else if / else",
        "pattern": "if (${condicion1}) {\n\t${cursor}\n} else if (${condicion2}) {\n\t\n} else {\n\t\n}"
      },
      {
        "name": "segun",
        "description": "SEGUN: switch",
        "pattern": "switch (${variable}) {\ncase ${valor1}:\n\t${cursor}\n\tbreak;\ncase ${valor2}:\n\t\n\tbreak;\ndefault:\n\t\n}"
      },
      {
        "name": "igual",
        "description": "IGUAL: comparar textos con equals",
        "pattern": "if (${texto1}.equals(${texto2})) {\n\t${cursor}\n}"
      },
      {
        "name": "para",
        "description": "PARA: for",
        "pattern": "for (int ${i} = 0; ${i} < ${limite}; ${i}++) {\n\t${cursor}\n}"
      },
      {
        "name": "paracada",
        "description": "PARACADA: for-each",
        "pattern": "for (${Tipo} ${elemento} : ${coleccion}) {\n\t${cursor}\n}"
      },
      {
        "name": "mientras",
        "description": "MIENTRAS: while",
        "pattern": "while (${condicion}) {\n\t${cursor}\n}"
      },
      {
        "name": "hacer",
        "description": "HACER: do-while",
        "pattern": "do {\n\t${cursor}\n} while (${condicion});"
      },
      {
        "name": "menu",
        "description": "MENU: menu con do-while y switch (necesita teclado)",
        "pattern": "int opcion;\ndo {\n\tSystem.out.println(\"1. ${opcion1}\");\n\tSystem.out.println(\"2. ${opcion2}\");\n\tSystem.out.println(\"0. Salir\");\n\tSystem.out.print(\"Elige una opcion: \");\n\topcion = teclado.nextInt();\n\tteclado.nextLine();\n\tswitch (opcion) {\n\tcase 1:\n\t\t${cursor}\n\t\tbreak;\n\tcase 2:\n\t\t\n\t\tbreak;\n\tcase 0:\n\t\tSystem.out.println(\"Adios\");\n\t\tbreak;\n\tdefault:\n\t\tSystem.out.println(\"Opcion no valida\");\n\t}\n} while (opcion != 0);"
      },
      {
        "name": "intentar",
        "description": "INTENTAR: try / catch",
        "pattern": "try {\n\t${cursor}\n} catch (${Exception} e) {\n\tSystem.out.println(\"Error: \" + e.getMessage());\n}"
      },
      {
        "name": "array",
        "description": "ARRAY: con tamano",
        "pattern": "${int}[] ${nombre} = new ${int}[${tamano}];\n${cursor}"
      },
      {
        "name": "arrayvalores",
        "description": "ARRAYVALORES: con valores",
        "pattern": "${int}[] ${nombre} = {${valores}};\n${cursor}"
      },
      {
        "name": "recorrerarray",
        "description": "RECORRERARRAY: for sobre un array",
        "pattern": "for (int ${i} = 0; ${i} < ${array}.length; ${i}++) {\n\t${cursor}\n}"
      },
      {
        "name": "matriz",
        "description": "MATRIZ: array 2D",
        "pattern": "${int}[][] ${nombre} = new ${int}[${filas}][${columnas}];\n${cursor}"
      },
      {
        "name": "recorrermatriz",
        "description": "RECORRERMATRIZ: dos for anidados",
        "pattern": "for (int ${i} = 0; ${i} < ${matriz}.length; ${i}++) {\n\tfor (int ${j} = 0; ${j} < ${matriz}[${i}].length; ${j}++) {\n\t\t${cursor}\n\t}\n}"
      },
      {
        "name": "lista",
        "description": "LISTA: ArrayList",
        "pattern": "${imp:import(java.util.ArrayList,java.util.List)}List<${String}> ${lista} = new ArrayList<>();\n${cursor}"
      },
      {
        "name": "aleatorio",
        "description": "ALEATORIO: numero entre min y max",
        "pattern": "${imp:import(java.util.Random)}Random aleatorio = new Random();\nint ${numero} = aleatorio.nextInt(${max} - ${min} + 1) + ${min};\n${cursor}"
      },
      {
        "name": "constante",
        "description": "CONSTANTE: final",
        "pattern": "final ${int} ${NOMBRE} = ${valor};${cursor}"
      },
      {
        "name": "principal",
        "description": "PRINCIPAL: metodo main",
        "pattern": "public static void main(String[] args) {\n\t${cursor}\n}"
      },
      {
        "name": "metodo",
        "description": "METODO: static void",
        "pattern": "public static void ${nombre}(${}) {\n\t${cursor}\n}"
      },
      {
        "name": "funcion",
        "description": "FUNCION: metodo con return",
        "pattern": "public static ${int} ${nombre}(${}) {\n\t${cursor}\n\treturn ${resultado};\n}"
      },
      {
        "name": "clase",
        "description": "CLASE: clase con atributo y constructor",
        "pattern": "public class ${Nombre} {\n\n\tprivate ${String} ${atributo};\n\n\tpublic ${Nombre}(${String} ${atributo}) {\n\t\tthis.${atributo} = ${atributo};\n\t}\n\n\t${cursor}\n}"
      },
      {
        "name": "constructor",
        "description": "CONSTRUCTOR",
        "pattern": "public ${Clase}(${Tipo} ${param}) {\n\tthis.${param} = ${param};\n\t${cursor}\n}"
      },
      {
        "name": "getter",
        "description": "GETTER",
        "pattern": "public ${Tipo} get${Nombre}() {\n\treturn ${nombre};\n}${cursor}"
      },
      {
        "name": "setter",
        "description": "SETTER",
        "pattern": "public void set${Nombre}(${Tipo} ${nombre}) {\n\tthis.${nombre} = ${nombre};\n}${cursor}"
      },
      {
        "name": "tostring",
        "description": "TOSTRING",
        "pattern": "@Override\npublic String toString() {\n\treturn \"${Clase} [${atributo}=\" + ${atributo} + \"]\";\n}${cursor}"
      },
      {
        "name": "help",
        "description": "HELP: ayuda resumida de Java (tipos, operadores, if, bucles...)",
        "pattern": "/*-\n=================== AYUDA JAVA (borra este bloque cuando quieras) ===================\n\n------------------------ 1. TIPOS DE VARIABLES ------------------------\nint      numeros enteros          int edad = 18;\ndouble   numeros con decimales    double precio = 9.99;\nboolean  verdadero o falso        boolean mayor = true;\nchar     UNA letra (comilla ')    char letra = 'a';\nString   texto (comillas \")       String nombre = \"Ana\";\nfinal    constante (no cambia)    final int MAX = 10;\n\n------------------------ 2. OPERADORES ARITMETICOS ------------------------\n+   sumar                 5 + 2   ->  7\n-   restar                5 - 2   ->  3\n*   multiplicar           5 * 2   ->  10\n/   dividir               5 / 2   ->  2     (entre enteros no hay decimales)\n                          5.0 / 2 ->  2.5   (con un decimal si hay)\n%   resto de dividir      5 % 2   ->  1     (n % 2 == 0 -> n es par)\n++  suma 1                i++     (igual que i = i + 1)\n--  resta 1               i--\n+=  suma y guarda         x += 5  (igual que x = x + 5)\n\n------------------------ 3. OPERADORES RELACIONALES ------------------------\nComparan dos valores y dan true o false\n==  igual                 5 == 5  -> true\n!=  distinto              5 != 3  -> true\n>   mayor                 5 > 3   -> true\n<   menor                 5 < 3   -> false\n>=  mayor o igual         5 >= 5  -> true\n<=  menor o igual         5 <= 3  -> false\nTextos: a.equals(b)   (NUNCA a == b)\n\n------------------------ 4. OPERADORES LOGICOS ------------------------\n&&  Y   las dos ciertas   edad > 17 && edad < 65\n||  O   basta una         dia == 6 || dia == 7\n!   NO  invierte          !(edad > 17)\n\n------------------------ 5. IF / ELSE IF / ELSE ------------------------\nif (nota >= 9) {\n\tSystem.out.println(\"Sobresaliente\");\n} else if (nota >= 5) {      // si no, prueba esta\n\tSystem.out.println(\"Aprobado\");\n} else {                     // si no se cumple ninguna\n\tSystem.out.println(\"Suspenso\");\n}\nSe prueban en orden y entra solo en la primera cierta.\n\n------------------------ 6. SWITCH ------------------------\nElige segun el VALOR de una variable (en vez de muchos if)\nswitch (opcion) {\ncase 1:\n\tSystem.out.println(\"Uno\");\n\tbreak;                   // break = salir del switch\ndefault:                     // si no coincide ningun case\n\tSystem.out.println(\"Otro\");\n}\nSin break sigue ejecutando el siguiente case.\n\n------------------------ 7. WHILE ------------------------\nRepite MIENTRAS la condicion sea cierta (puede no entrar nunca)\nint i = 1;\nwhile (i <= 3) {\n\tSystem.out.println(i);   // 1 2 3\n\ti++;                     // sin esto: bucle infinito\n}\n\n------------------------ 8. DO WHILE ------------------------\nIgual, pero entra SIEMPRE una vez (comprueba al final)\ndo {\n\tSystem.out.println(\"Hola\");\n} while (condicion);         // lleva ; al final\n\n------------------------ 9. FOR ------------------------\nRepite un numero conocido de veces\nfor (int i = 0; i < 3; i++) {    // inicio; condicion; paso\n\tSystem.out.println(i);       // 0 1 2\n}\nfor-each (cada elemento):  for (String n : nombres) { ... }\n\n------------------------ 10. BREAK Y CONTINUE ------------------------\nbreak      sale del bucle (o switch) ya\ncontinue   salta a la siguiente vuelta\nfor (int i = 1; i <= 5; i++) {\n\tif (i == 2) continue;    // se salta el 2\n\tif (i == 4) break;       // sale al llegar a 4\n\tSystem.out.println(i);   // 1 3\n}\n\n------------------------ 11. ARRAYS ------------------------\nVarios valores del MISMO tipo. Tamano fijo. Empieza en 0\nint[] notas = new int[3];        // 3 huecos: 0, 1, 2\nint[] notas = {5, 7, 9};         // con valores\nnotas[0] = 8;                    // guarda en la posicion 0\nnotas.length                     // tamano (3)\n\n------------------------ 12. MATRICES ------------------------\nTabla de filas y columnas: matriz[fila][columna]\nint[][] m = new int[2][3];       // 2 filas, 3 columnas\nm[1][2] = 5;                     // fila 1, columna 2\nm.length = filas      m[0].length = columnas\nSe recorre con un for dentro de otro for\n\n------------------------ 13. TEXTO (String) ------------------------\nt.length()  t.charAt(0)  t.toUpperCase()  t.toLowerCase()\nt.substring(0, 3)  t.contains(\"a\")  t.replace(\"a\", \"b\")  t.trim()\n\n------------------------ 14. METODOS ------------------------\nstatic int sumar(int a, int b) {   // devuelve un int\n\treturn a + b;\n}\nint r = sumar(2, 3);               // r vale 5\nvoid = no devuelve nada\n*/"
      },
      {
        "name": "plantillas",
        "description": "PLANTILLAS: lista de todos los comandos",
        "pattern": "/*-\n=========== PLANTILLAS (nombre + Ctrl+Espacio) ===========\nPANTALLA  : imprimir imprimirsin imprimirvar imprimirf\nTECLADO   : import leer leerint leerdouble leerchar cerrar\nCONDICION : si sino sisino segun igual\nBUCLES    : para paracada mientras hacer menu\nERRORES   : intentar\nARRAYS    : array arrayvalores recorrerarray matriz\n            recorrermatriz lista\nOTROS     : aleatorio constante\nESTRUCTURA: principal metodo funcion clase constructor\n            getter setter tostring\nAYUDA     : help plantillas\n*/"
      }
    ]
  },
  {
    "id": "basics-en",
    "name": "Java basics",
    "lang": "en",
    "templates": [
      {
        "name": "print",
        "description": "PRINT: System.out.println",
        "pattern": "System.out.println(${cursor});"
      },
      {
        "name": "printnl",
        "description": "PRINTNL: System.out.print (no new line)",
        "pattern": "System.out.print(${cursor});"
      },
      {
        "name": "printvar",
        "description": "PRINTVAR: label + variable",
        "pattern": "System.out.println(\"${label}: \" + ${variable});${cursor}"
      },
      {
        "name": "printf",
        "description": "PRINTF: formatted output",
        "pattern": "System.out.printf(\"${cursor}%n\");"
      },
      {
        "name": "scanner",
        "description": "SCANNER: keyboard reader (adds the import)",
        "pattern": "${imp:import(java.util.Scanner)}Scanner keyboard = new Scanner(System.in);\n${cursor}"
      },
      {
        "name": "readline",
        "description": "READLINE: read a line of text",
        "pattern": "String ${text} = keyboard.nextLine();${cursor}"
      },
      {
        "name": "readint",
        "description": "READINT: read an integer",
        "pattern": "int ${number} = keyboard.nextInt();\nkeyboard.nextLine();\n${cursor}"
      },
      {
        "name": "readdouble",
        "description": "READDOUBLE: read a decimal",
        "pattern": "double ${value} = keyboard.nextDouble();\nkeyboard.nextLine();\n${cursor}"
      },
      {
        "name": "close",
        "description": "CLOSE: close the Scanner",
        "pattern": "keyboard.close();"
      },
      {
        "name": "if",
        "description": "IF: if",
        "pattern": "if (${condition}) {\n\t${cursor}\n}"
      },
      {
        "name": "ifelse",
        "description": "IFELSE: if / else",
        "pattern": "if (${condition}) {\n\t${cursor}\n} else {\n\t\n}"
      },
      {
        "name": "switch",
        "description": "SWITCH: switch with default",
        "pattern": "switch (${variable}) {\ncase ${value1}:\n\t${cursor}\n\tbreak;\ndefault:\n\t\n}"
      },
      {
        "name": "equals",
        "description": "EQUALS: compare texts",
        "pattern": "if (${text1}.equals(${text2})) {\n\t${cursor}\n}"
      },
      {
        "name": "for",
        "description": "FOR: counting loop",
        "pattern": "for (int ${i} = 0; ${i} < ${limit}; ${i}++) {\n\t${cursor}\n}"
      },
      {
        "name": "while",
        "description": "WHILE: while loop",
        "pattern": "while (${condition}) {\n\t${cursor}\n}"
      },
      {
        "name": "dowhile",
        "description": "DOWHILE: do-while loop",
        "pattern": "do {\n\t${cursor}\n} while (${condition});"
      },
      {
        "name": "array",
        "description": "ARRAY: array with a size",
        "pattern": "${int}[] ${name} = new ${int}[${size}];\n${cursor}"
      },
      {
        "name": "each",
        "description": "EACH: visit every element of an array",
        "pattern": "for (int ${i} = 0; ${i} < ${array}.length; ${i}++) {\n\t${cursor}\n}"
      },
      {
        "name": "const",
        "description": "CONST: constant",
        "pattern": "final ${int} ${NAME} = ${value};${cursor}"
      },
      {
        "name": "main",
        "description": "MAIN: main method",
        "pattern": "public static void main(String[] args) {\n\t${cursor}\n}"
      },
      {
        "name": "method",
        "description": "METHOD: method that returns a value",
        "pattern": "public static ${int} ${name}(${}) {\n\t${cursor}\n\treturn ${result};\n}"
      }
    ]
  }
];
