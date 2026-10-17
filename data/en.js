JM.content.en = {
  "sections": [
    {
      "title": "Getting started",
      "lessons": [
        "fundamentals",
        "first-program"
      ]
    },
    {
      "title": "Data and input",
      "lessons": [
        "variables-constants",
        "data-types",
        "arithmetic-operators",
        "scanner-input"
      ]
    },
    {
      "title": "Decisions",
      "lessons": [
        "comparisons",
        "logical-operators",
        "if-conditionals",
        "switch-selection"
      ]
    },
    {
      "title": "Loops",
      "lessons": [
        "while-loop",
        "do-while-loop",
        "for-loop",
        "loop-control"
      ]
    },
    {
      "title": "Tools for real programs",
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
      "title": "Practice problems",
      "lessons": [
        "problem-statistics",
        "problem-menu",
        "problem-tariff"
      ]
    },
    {
      "title": "Arrays and project",
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
      "title": "From a problem to a program",
      "time": "4 min",
      "idea": "Before writing code, decide which data you need, which steps to follow and what result you want.",
      "theory": [
        {
          "title": "Algorithm",
          "text": "An ordered, finite list of steps for solving a problem, like a recipe."
        },
        {
          "title": "Pseudocode",
          "text": "Describe the steps before programming. In PSeInt, you can write `Algoritmo Hola`, `Escribir \"Hola\"` and `FinAlgoritmo`."
        },
        {
          "title": "Program",
          "text": "An algorithm written in a language a computer can run. In Java, instructions go inside `main`."
        }
      ],
      "exampleTitle": "Turn an idea into Java",
      "exampleLead": "The goal is to display two algorithm steps in the console.",
      "example": "public class Demo01 {\n    public static void main(String[] args) {\n        System.out.println(\"Prepare the data\");\n        System.out.println(\"Display the result\");\n    }\n}",
      "explain": [
        "Each `println` is a step that runs in order.",
        "Java is case-sensitive: `System` is not the same as `system`.",
        "Statements end with `;` and blocks are enclosed in braces."
      ],
      "task": "Write a program that displays “1. Read the data” and then “2. Calculate the result”.",
      "think": "Before you write code: which two lines must appear, and which one comes first?",
      "steps": [
        "Write both sentences down in your own words.",
        "Find the Java instruction that shows a line of text.",
        "Use it once per sentence, in the right order.",
        "Run it and compare with the expected output."
      ],
      "hints": [
        "Each sentence is one instruction. Java runs instructions from top to bottom.",
        "The instruction is `System.out.println(___);` and the text goes inside double quotes. You need two of them."
      ],
      "recall": [
        {
          "do": "Print a line of text",
          "code": "System.out.println(\"Hello\");"
        },
        {
          "do": "Program skeleton",
          "code": "public class Name {\n    public static void main(String[] args) {\n        // your code here\n    }\n}"
        }
      ],
      "filename": "Exercise01.java",
      "starter": "public class Exercise01 {\n    public static void main(String[] args) {\n        // Display the first step\n        // Display the second step\n    }\n}",
      "output": "1. Read the data\n2. Calculate the result",
      "outputNote": "Two lines should appear, in the same order.",
      "solution": "public class Exercise01 {\n    public static void main(String[] args) {\n        System.out.println(\"1. Read the data\");\n        System.out.println(\"2. Calculate the result\");\n    }\n}"
    },
    {
      "id": "first-program",
      "title": "Your first Java program",
      "time": "4 min",
      "idea": "Every Java program needs a class structure and an entry point called `main`.",
      "theory": [
        {
          "title": "`class`",
          "text": "Names the class. If it is `public`, the file must have the same name."
        },
        {
          "title": "`main`",
          "text": "The entry point where a console program starts."
        },
        {
          "title": "`print` and `println`",
          "text": "Both display text. `println` ends the line; `print` keeps the cursor on the same line."
        }
      ],
      "exampleTitle": "Display a greeting",
      "exampleLead": "This program prints a sentence and moves to the next line.",
      "example": "public class Demo02 {\n    public static void main(String[] args) {\n        System.out.println(\"Hello, world\");\n    }\n}",
      "explain": [
        "Text goes between double quotes.",
        "Statements go inside the braces of `main`.",
        "Comments start with `//` and Java does not execute them."
      ],
      "task": "Display your name and, below it, “I am learning Java”. Use two `println` calls.",
      "think": "What must stay exactly as it is in the starter, and where does your code go?",
      "steps": [
        "Decide the two lines: your name, then the sentence.",
        "Put your instructions inside the braces of `main`.",
        "Check that the file name and the class name match.",
        "Run it."
      ],
      "hints": [
        "Same tool as the previous lesson: one `println` per line of output.",
        "`System.out.println(\"___\");` twice, inside `main`. Every statement ends with `;`."
      ],
      "recall": [
        {
          "do": "Print without moving to the next line",
          "code": "System.out.print(\"Name: \");"
        },
        {
          "do": "Write a comment",
          "code": "// Java ignores this line"
        }
      ],
      "filename": "Exercise02.java",
      "starter": "public class Exercise02 {\n    public static void main(String[] args) {\n        // Write your name\n        // Display the second message\n    }\n}",
      "output": "My name is Alex\nI am learning Java",
      "outputNote": "Replace “Alex” with your name. The two-line format is what matters.",
      "solution": "public class Exercise02 {\n    public static void main(String[] args) {\n        System.out.println(\"My name is Alex\");\n        System.out.println(\"I am learning Java\");\n    }\n}"
    },
    {
      "id": "variables-constants",
      "title": "Variables and constants",
      "time": "5 min",
      "idea": "A variable has a name, a type and a value. It stores information for later use.",
      "theory": [
        {
          "title": "Declare and initialise",
          "text": "`int age = 20;` creates an integer variable and assigns its first value."
        },
        {
          "title": "Change the value",
          "text": "Later, you can write `age = 21;`. The `=` sign assigns a value; it does not compare."
        },
        {
          "title": "A constant with `final`",
          "text": "`final double PI = 3.14159;` means the value should not be reassigned."
        }
      ],
      "exampleTitle": "Calculate a total",
      "exampleLead": "Store a price, a quantity and the result of multiplying them.",
      "example": "public class Demo03 {\n    public static void main(String[] args) {\n        double price = 3.5;\n        int quantity = 4;\n        double total = price * quantity;\n        System.out.println(\"Total: \" + total);\n    }\n}",
      "explain": [
        "The type comes before the name.",
        "`total` stores the result of the operation, not the formula.",
        "Use descriptive names: `price` says more than `p`."
      ],
      "task": "Calculate the total price of 3 tickets that cost 8 euros each.",
      "think": "Which two values do you know? What do you get by combining them? Which one needs decimals?",
      "steps": [
        "Name the two known values and choose a type for each.",
        "Store the combined result in a third variable.",
        "Print a label and the result on the same line."
      ],
      "hints": [
        "A price can have decimals, a number of tickets cannot. That decides between `double` and `int`.",
        "`double price = ___;` `int quantity = ___;` `double total = price ___ quantity;` then join text and `total` with `+`."
      ],
      "recall": [
        {
          "do": "Create a variable",
          "code": "int age = 18;"
        },
        {
          "do": "Create text",
          "code": "String name = \"Ana\";"
        },
        {
          "do": "Create a constant",
          "code": "final double PI = 3.14159;"
        }
      ],
      "filename": "Exercise03.java",
      "starter": "public class Exercise03 {\n    public static void main(String[] args) {\n        // Declare price and quantity\n        // Calculate the total\n        // Display the result\n    }\n}",
      "output": "Total: 24.0",
      "outputNote": "The total should change when you change the price or quantity.",
      "solution": "public class Exercise03 {\n    public static void main(String[] args) {\n        double price = 8.0;\n        int quantity = 3;\n        double total = price * quantity;\n        System.out.println(\"Total: \" + total);\n    }\n}"
    },
    {
      "id": "data-types",
      "title": "Data types and conversions",
      "time": "6 min",
      "idea": "A variable’s type determines what kind of value it can store. Choosing well avoids errors and unexpected results.",
      "theory": [
        {
          "title": "Common types",
          "text": "Primitive types: `byte`, `short`, `int`, `long` (integers), `float`, `double` (decimals), `char` (a character) and `boolean` (`true`/`false`). `String` stores text."
        },
        {
          "title": "Integer division",
          "text": "If you divide two `int` values, `5 / 2` gives `2` because the decimal part is discarded."
        },
        {
          "title": "Casting",
          "text": "`(double) 5 / 2` produces `2.5`. Converting to a smaller type can lose information: `(int) 3.9` gives `3`."
        }
      ],
      "exampleTitle": "Integer vs decimal",
      "exampleLead": "See how the result changes when we force a decimal operation.",
      "example": "public class Demo04 {\n    public static void main(String[] args) {\n        int a = 5;\n        int b = 2;\n        System.out.println(a / b);\n        System.out.println((double) a / b);\n    }\n}",
      "explain": [
        "The first output is `2`.",
        "The second output is `2.5` because `a` is converted to `double` before division.",
        "`String` is used for text, but it is not a primitive type."
      ],
      "task": "Calculate the average of 7 and 8 as a decimal number.",
      "think": "When you divide two `int` values, what gets lost? Where must the conversion happen?",
      "steps": [
        "Store 7 and 8 in two `int` variables.",
        "Add them and divide by 2 in a way that keeps the decimals.",
        "Save the result in a variable that can hold decimals, then print it."
      ],
      "hints": [
        "Between two ints, `15 / 2` gives `7`. At least one side of the division must be a `double`.",
        "Put `(double)` in front of the sum: `(double) (a + b) / 2`, and store it in a `double`."
      ],
      "recall": [
        {
          "do": "Keep decimals in a division",
          "code": "double average = (double) sum / count;"
        },
        {
          "do": "Create a true/false value",
          "code": "boolean ready = true;"
        },
        {
          "do": "Create one character",
          "code": "char grade = 'A';"
        }
      ],
      "filename": "Exercise04.java",
      "starter": "public class Exercise04 {\n    public static void main(String[] args) {\n        int a = 7;\n        int b = 8;\n        // Calculate a decimal average\n        // Display the average\n    }\n}",
      "output": "Average: 7.5",
      "outputNote": "If you get 7, check that the division is not using integers only.",
      "solution": "public class Exercise04 {\n    public static void main(String[] args) {\n        int a = 7;\n        int b = 8;\n        double average = (double) (a + b) / 2;\n        System.out.println(\"Average: \" + average);\n    }\n}"
    },
    {
      "id": "arithmetic-operators",
      "title": "Arithmetic operators",
      "time": "5 min",
      "idea": "Operators calculate new values. Java also provides shorthand forms for updating variables.",
      "theory": [
        {
          "title": "Basic operations",
          "text": "`+` adds, `-` subtracts, `*` multiplies and `/` divides."
        },
        {
          "title": "Remainder with `%`",
          "text": "`10 % 3` equals `1`: the remainder when 10 is divided by 3. It is useful for detecting even numbers with `n % 2 == 0`."
        },
        {
          "title": "Shorthand",
          "text": "`total += 5` is equivalent to `total = total + 5`. `i++` increases `i` by one and `i--` decreases it by one."
        }
      ],
      "exampleTitle": "Operations and remainder",
      "exampleLead": "Parentheses let you choose which part is calculated first.",
      "example": "public class Demo05 {\n    public static void main(String[] args) {\n        int a = 10;\n        int b = 3;\n        System.out.println(a + b);\n        System.out.println(a % b);\n        a += 2;\n        System.out.println(a);\n    }\n}",
      "explain": [
        "The output is `13`, `1` and `12`, each on a separate line.",
        "`%` is not a percentage: it returns the remainder of a division.",
        "Multiplication and division happen before addition and subtraction unless you use parentheses."
      ],
      "task": "Store 17 in `number` and display its remainder when divided by 2. Then add 1 to the number and display the new value.",
      "think": "Which operator gives what is left after a division? Which shortcut adds one?",
      "steps": [
        "Create the number.",
        "Print its remainder when divided by 2.",
        "Increase the number by one and print it again."
      ],
      "hints": [
        "The remainder operator is `%`. The shortcut for \"add one\" is `++`.",
        "`System.out.println(number ___ 2);` then `number___;` then print `number`."
      ],
      "recall": [
        {
          "do": "Remainder of a division",
          "code": "int rest = 17 % 2;"
        },
        {
          "do": "Add one / subtract one",
          "code": "count++;\ncount--;"
        },
        {
          "do": "Add a value to a variable",
          "code": "total += 5;"
        }
      ],
      "filename": "Exercise05.java",
      "starter": "public class Exercise05 {\n    public static void main(String[] args) {\n        int number = 17;\n        // Display the remainder when divided by 2\n        // Increase the number by one\n        // Display the updated number\n    }\n}",
      "output": "1\n18",
      "outputNote": "The remainder is 1; after incrementing, the value is 18.",
      "solution": "public class Exercise05 {\n    public static void main(String[] args) {\n        int number = 17;\n        System.out.println(number % 2);\n        number++;\n        System.out.println(number);\n    }\n}"
    },
    {
      "id": "scanner-input",
      "title": "Read input with Scanner",
      "time": "6 min",
      "idea": "`Scanner` lets a program receive data typed by the person running it.",
      "theory": [
        {
          "title": "Set it up",
          "text": "Write `import java.util.Scanner;` before the class and create `Scanner keyboard = new Scanner(System.in);`."
        },
        {
          "title": "Choose a reading method",
          "text": "`nextInt()` reads integers, `nextDouble()` decimals, `next()` one word and `nextLine()` a full line of text."
        },
        {
          "title": "An important detail",
          "text": "After `nextInt()`, the line break may remain pending. If you then call `nextLine()`, you may need an extra empty `nextLine()` first to consume it."
        }
      ],
      "exampleTitle": "Ask for an age",
      "exampleLead": "The program asks a question, reads a number and calculates the age for next year.",
      "example": "import java.util.Scanner;\n\npublic class Demo06 {\n    public static void main(String[] args) {\n        Scanner keyboard = new Scanner(System.in);\n        System.out.print(\"Age: \");\n        int age = keyboard.nextInt();\n        System.out.println(\"Next year: \" + (age + 1));\n        keyboard.close();\n    }\n}",
      "explain": [
        "`System.out.print` does not move to a new line, so the answer can be typed next to the question.",
        "`nextInt()` waits for an integer.",
        "Close the reader when you finish with `keyboard.close()`."
      ],
      "task": "Ask for an integer and display its square.",
      "think": "What does the program need before it can calculate? What type of value are you reading?",
      "steps": [
        "Import Scanner and create the keyboard object.",
        "Ask for a number, then read it as an integer.",
        "Multiply the number by itself and print it.",
        "Close the scanner."
      ],
      "hints": [
        "The import goes on the first line, above the class. The scanner is created with `new Scanner(System.in)`.",
        "`int number = keyboard.nextInt();` reads an integer. The square is `number * number`."
      ],
      "recall": [
        {
          "do": "Import Scanner (top of the file)",
          "code": "import java.util.Scanner;"
        },
        {
          "do": "Create the scanner",
          "code": "Scanner keyboard = new Scanner(System.in);"
        },
        {
          "do": "Read an integer, a word, a line",
          "code": "int n = keyboard.nextInt();\nString word = keyboard.next();\nString line = keyboard.nextLine();"
        },
        {
          "do": "Close the scanner",
          "code": "keyboard.close();"
        }
      ],
      "filename": "Exercise06.java",
      "starter": "import java.util.Scanner;\n\npublic class Exercise06 {\n    public static void main(String[] args) {\n        Scanner keyboard = new Scanner(System.in);\n        // Prompt for and read the number\n        // Display its square\n        keyboard.close();\n    }\n}",
      "output": "Number: 4\nSquare: 16",
      "outputNote": "Enter 4 in the console. Its square is 4 multiplied by 4.",
      "solution": "import java.util.Scanner;\n\npublic class Exercise06 {\n    public static void main(String[] args) {\n        Scanner keyboard = new Scanner(System.in);\n        System.out.print(\"Number: \");\n        int number = keyboard.nextInt();\n        System.out.println(\"Square: \" + (number * number));\n        keyboard.close();\n    }\n}"
    },
    {
      "id": "comparisons",
      "title": "Relational operators",
      "time": "4 min",
      "idea": "A comparison answers a question and produces a boolean value: `true` or `false`.",
      "theory": [
        {
          "title": "Compare values",
          "text": "`>` greater than, `<` less than, `>=` greater than or equal to, `<=` less than or equal to."
        },
        {
          "title": "Equality and difference",
          "text": "`==` checks whether two values are equal; `!=` checks whether they are different."
        },
        {
          "title": "Do not confuse them",
          "text": "`age = 18` assigns 18 to the variable. `age == 18` asks whether its value is 18."
        }
      ],
      "exampleTitle": "Compare two numbers",
      "exampleLead": "A comparison can be stored in a `boolean` or displayed directly.",
      "example": "public class Demo07 {\n    public static void main(String[] args) {\n        int age = 17;\n        System.out.println(age >= 18);\n        System.out.println(age != 18);\n    }\n}",
      "explain": [
        "The first output is `false` because 17 is not greater than or equal to 18.",
        "The second is `true` because 17 is different from 18.",
        "Comparisons are often used inside `if` statements and loops."
      ],
      "task": "Store a number in `number` and display whether it is positive (greater than zero).",
      "think": "What exact yes/no question are you asking? What kind of value does a comparison produce?",
      "steps": [
        "Store the number.",
        "Write the comparison that answers \"is it positive?\".",
        "Print the answer, then change the number to a negative one and run again."
      ],
      "hints": [
        "A comparison answers yes or no, so the result is a `boolean`.",
        "`System.out.println(number ___ 0);` Which of `>`, `<`, `==` means \"positive\"?"
      ],
      "recall": [
        {
          "do": "Compare two values",
          "code": "age >= 18"
        },
        {
          "do": "Equal / different",
          "code": "a == b\na != b"
        },
        {
          "do": "Store the answer",
          "code": "boolean adult = age >= 18;"
        }
      ],
      "filename": "Exercise07.java",
      "starter": "public class Exercise07 {\n    public static void main(String[] args) {\n        int number = 6;\n        // Display whether number is greater than zero\n    }\n}",
      "output": "true",
      "outputNote": "With 6, the output should be true; with -2, it should be false.",
      "solution": "public class Exercise07 {\n    public static void main(String[] args) {\n        int number = 6;\n        System.out.println(number > 0);\n    }\n}"
    },
    {
      "id": "logical-operators",
      "title": "Logical operators: &&, || and !",
      "time": "6 min",
      "idea": "Logical operators combine conditions. They are essential when a decision depends on two or more things.",
      "theory": [
        {
          "title": "AND: `&&`",
          "text": "Means “and”. It is `true` only when both conditions are true. Example: having a ticket and being at least 18."
        },
        {
          "title": "OR: `||`",
          "text": "Means “or”. It is `true` when at least one condition is true."
        },
        {
          "title": "NOT: `!`",
          "text": "Reverses the result: `!true` is `false` and `!false` is `true`."
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
      "theoryNote": "For `!`, you do not need a second condition: it simply reverses one value. Remember these three ideas: && needs both; || needs at least one; ! reverses the value.",
      "exampleTitle": "Combine two conditions",
      "exampleLead": "A person can enter only if they have a ticket and are at least 18 years old.",
      "example": "public class Demo08 {\n    public static void main(String[] args) {\n        int age = 20;\n        boolean hasTicket = false;\n        boolean canEnter = age >= 18 && hasTicket;\n        System.out.println(canEnter);\n        System.out.println(!hasTicket);\n    }\n}",
      "explain": [
        "`age >= 18` is `true`.",
        "`hasTicket` is `false`; `true && false` gives `false`.",
        "`!hasTicket` reverses the value and gives `true`."
      ],
      "task": "You can go to the park only if it is not raining and the temperature is at least 18 degrees. Calculate that condition.",
      "think": "Write the rule in plain words first. Which parts must both be true? Which part needs \"not\"?",
      "steps": [
        "Create one variable for each fact.",
        "Combine the facts into one boolean.",
        "Print it, then change the facts to test the other cases."
      ],
      "hints": [
        "Words to symbols: \"and\" is `&&`, \"or\" is `||`, \"not\" is `!`.",
        "`boolean canGoOut = ___raining ___ temperature >= 18;`"
      ],
      "recall": [
        {
          "do": "Both must be true (and)",
          "code": "a && b"
        },
        {
          "do": "At least one is true (or)",
          "code": "a || b"
        },
        {
          "do": "Invert (not)",
          "code": "!a"
        }
      ],
      "filename": "Exercise08.java",
      "starter": "public class Exercise08 {\n    public static void main(String[] args) {\n        boolean raining = false;\n        int temperature = 20;\n        // Calculate canGoOut using ! and &&\n        // Display the result\n    }\n}",
      "output": "true",
      "outputNote": "If raining becomes true, the output should be false even if it is warm.",
      "solution": "public class Exercise08 {\n    public static void main(String[] args) {\n        boolean raining = false;\n        int temperature = 20;\n        boolean canGoOut = !raining && temperature >= 18;\n        System.out.println(canGoOut);\n    }\n}"
    },
    {
      "id": "if-conditionals",
      "title": "Conditions: if, else if and else",
      "time": "6 min",
      "idea": "`if` chooses which instructions to run based on a condition. `else if` adds cases and `else` handles the rest.",
      "theory": [
        {
          "title": "One case",
          "text": "`if (grade >= 5) { ... }` runs the block only when the condition is true."
        },
        {
          "title": "Several cases",
          "text": "`else if` checks another condition if the previous ones were not met."
        },
        {
          "title": "The final fallback",
          "text": "`else` has no condition: it runs if none of the earlier cases matched. Use braces to enclose each block."
        }
      ],
      "theoryNote": "Ternary operator: for a very simple decision, `String result = age >= 18 ? \"Adult\" : \"Minor\";` replaces a short if/else. Learn the normal if first.",
      "exampleTitle": "Classify a grade",
      "exampleLead": "Java checks the conditions from top to bottom and uses the first true case.",
      "example": "public class Demo09 {\n    public static void main(String[] args) {\n        int grade = 7;\n        if (grade >= 9) {\n            System.out.println(\"Excellent\");\n        } else if (grade >= 5) {\n            System.out.println(\"Pass\");\n        } else {\n            System.out.println(\"Fail\");\n        }\n    }\n}",
      "explain": [
        "With a grade of 7, the first condition fails.",
        "The second condition `grade >= 5` is true and displays Pass.",
        "The order of the conditions matters."
      ],
      "task": "Check whether a number is positive, negative or zero.",
      "think": "How many different outcomes are there? Which conditions must be checked, and in what order?",
      "steps": [
        "List the three outcomes.",
        "Check the two outcomes that have a condition.",
        "Let `else` catch whatever is left.",
        "Run it with a positive, a negative and a zero to prove each branch."
      ],
      "hints": [
        "Three outcomes need `if`, `else if` and `else`. The last one has no condition.",
        "`if (number > 0) { ... } else if (number ___ 0) { ... } else { ... }`"
      ],
      "recall": [
        {
          "do": "Do something only if a condition is true",
          "code": "if (age >= 18) {\n    System.out.println(\"Adult\");\n}"
        },
        {
          "do": "Two possible paths",
          "code": "if (grade >= 5) {\n    System.out.println(\"Pass\");\n} else {\n    System.out.println(\"Fail\");\n}"
        },
        {
          "do": "More than two paths",
          "code": "if (n > 0) {\n    // positive\n} else if (n < 0) {\n    // negative\n} else {\n    // zero\n}"
        }
      ],
      "filename": "Exercise09.java",
      "starter": "public class Exercise09 {\n    public static void main(String[] args) {\n        int number = -3;\n        // Check whether it is positive\n        // Otherwise, check whether it is negative\n        // If neither condition is true, it is zero\n    }\n}",
      "output": "Negative",
      "outputNote": "With -3, display Negative; with 0, display Zero.",
      "solution": "public class Exercise09 {\n    public static void main(String[] args) {\n        int number = -3;\n        if (number > 0) {\n            System.out.println(\"Positive\");\n        } else if (number < 0) {\n            System.out.println(\"Negative\");\n        } else {\n            System.out.println(\"Zero\");\n        }\n    }\n}"
    },
    {
      "id": "switch-selection",
      "title": "Choose an option with switch",
      "time": "5 min",
      "idea": "`switch` is useful when comparing one variable with several specific values, such as menu options.",
      "theory": [
        {
          "title": "Each `case`",
          "text": "Defines one possible value of the variable."
        },
        {
          "title": "`break`",
          "text": "Ends that case and prevents the following cases from running."
        },
        {
          "title": "`default`",
          "text": "Runs when no `case` matches. It is optional, but usually useful."
        }
      ],
      "exampleTitle": "Display a weekday",
      "exampleLead": "Each number leads to a different response.",
      "example": "public class Demo10 {\n    public static void main(String[] args) {\n        int day = 2;\n        switch (day) {\n            case 1:\n                System.out.println(\"Monday\");\n                break;\n            case 2:\n                System.out.println(\"Tuesday\");\n                break;\n            default:\n                System.out.println(\"Another day\");\n        }\n    }\n}",
      "explain": [
        "With `day = 2`, the second `case` runs.",
        "`break` exits the `switch`.",
        "If day is neither 1 nor 2, `default` runs."
      ],
      "task": "Create a simple menu: option 1 displays “Play”, option 2 displays “Exit”, and any other option displays “Unknown option”.",
      "think": "Which value are you choosing on? What should happen at the end of each case, and when nothing matches?",
      "steps": [
        "Create the variable that holds the option.",
        "Write one case for each menu option.",
        "Stop each case so it does not run the next one.",
        "Add a branch for any other value."
      ],
      "hints": [
        "Every `case` needs a `break;`. Without it Java keeps running the next case.",
        "`switch (option) { case 1: ... break; case 2: ... break; default: ... }`"
      ],
      "recall": [
        {
          "do": "Choose between fixed options",
          "code": "switch (option) {\n    case 1:\n        System.out.println(\"One\");\n        break;\n    default:\n        System.out.println(\"Other\");\n}"
        }
      ],
      "filename": "Exercise10.java",
      "starter": "public class Exercise10 {\n    public static void main(String[] args) {\n        int option = 1;\n        // Write the switch statement\n    }\n}",
      "output": "Play",
      "outputNote": "Change option to 2 and then 9 to test all three cases.",
      "solution": "public class Exercise10 {\n    public static void main(String[] args) {\n        int option = 1;\n        switch (option) {\n            case 1:\n                System.out.println(\"Play\");\n                break;\n            case 2:\n                System.out.println(\"Exit\");\n                break;\n            default:\n                System.out.println(\"Unknown option\");\n        }\n    }\n}"
    },
    {
      "id": "while-loop",
      "title": "The while loop",
      "time": "5 min",
      "idea": "`while` repeats a block while a condition is true. It checks the condition before each iteration.",
      "theory": [
        {
          "title": "Check first",
          "text": "If the condition is false at the start, the block may not run at all."
        },
        {
          "title": "Make progress",
          "text": "Inside the loop, you usually need to change a variable that affects the condition; otherwise, you may create an infinite loop."
        },
        {
          "title": "When to use it",
          "text": "It is useful when you do not know exactly how many repetitions will be needed."
        }
      ],
      "exampleTitle": "Count to five",
      "exampleLead": "The counter increases each time until the condition is no longer true.",
      "example": "public class Demo11 {\n    public static void main(String[] args) {\n        int i = 1;\n        while (i <= 5) {\n            System.out.println(i);\n            i++;\n        }\n    }\n}",
      "explain": [
        "`i` starts at 1.",
        "While `i <= 5`, it is displayed and incremented.",
        "When it reaches 6, the condition is false and the loop ends."
      ],
      "task": "Display the numbers from 5 down to 1 using `while`.",
      "think": "Where does the counter start, when must it stop, and what changes it on every turn?",
      "steps": [
        "Pick the starting value.",
        "Write the condition that keeps the loop running.",
        "Print the counter, then change it so the loop can end."
      ],
      "hints": [
        "Counting down means the counter decreases. If nothing changes it, the loop never ends.",
        "`int i = 5;` `while (i ___ 1) { print i; i___; }`"
      ],
      "recall": [
        {
          "do": "Repeat while a condition is true",
          "code": "while (counter < 3) {\n    counter++;\n}"
        }
      ],
      "filename": "Exercise11.java",
      "starter": "public class Exercise11 {\n    public static void main(String[] args) {\n        int i = 5;\n        // Write the while loop\n    }\n}",
      "output": "5\n4\n3\n2\n1",
      "outputNote": "If the same number appears repeatedly, check that the counter is decreasing.",
      "solution": "public class Exercise11 {\n    public static void main(String[] args) {\n        int i = 5;\n        while (i >= 1) {\n            System.out.println(i);\n            i--;\n        }\n    }\n}"
    },
    {
      "id": "do-while-loop",
      "title": "The do-while loop",
      "time": "4 min",
      "idea": "`do-while` is similar to `while`, but checks the condition at the end. Therefore, it runs at least once.",
      "theory": [
        {
          "title": "Execution order",
          "text": "First, the program enters the `do { ... }` block; then it checks `while (condition);`."
        },
        {
          "title": "Semicolon",
          "text": "In Java, a semicolon is required after `while (condition);`."
        },
        {
          "title": "When to use it",
          "text": "It fits menus or prompts where you want to ask for input at least once and then decide whether to repeat."
        }
      ],
      "exampleTitle": "Display three attempts",
      "exampleLead": "The condition is checked at the end, and the counter makes the loop stop.",
      "example": "public class Demo12 {\n    public static void main(String[] args) {\n        int attempt = 1;\n        do {\n            System.out.println(\"Attempt \" + attempt);\n            attempt++;\n        } while (attempt <= 3);\n    }\n}",
      "explain": [
        "The block runs when attempt equals 1.",
        "Then `attempt++` increases the counter.",
        "When it reaches 4, the condition is false and the loop ends."
      ],
      "task": "Count backwards from 3 to 1 using `do-while`.",
      "think": "What runs first, the body or the check? How is that different from `while`?",
      "steps": [
        "Create the counter.",
        "Write the body: print it, then change it.",
        "Write the condition after the body."
      ],
      "hints": [
        "`do-while` runs the body once before checking anything. The condition goes after the closing brace.",
        "`do { ... } while (count >= 1);` The `;` at the end is required."
      ],
      "recall": [
        {
          "do": "Run at least once, then repeat",
          "code": "do {\n    count--;\n} while (count > 0);"
        }
      ],
      "filename": "Exercise12.java",
      "starter": "public class Exercise12 {\n    public static void main(String[] args) {\n        int count = 3;\n        // Write the do-while loop\n    }\n}",
      "output": "3\n2\n1",
      "outputNote": "The block runs first; the condition is checked at the end.",
      "solution": "public class Exercise12 {\n    public static void main(String[] args) {\n        int count = 3;\n        do {\n            System.out.println(count);\n            count--;\n        } while (count >= 1);\n    }\n}"
    },
    {
      "id": "for-loop",
      "title": "The for loop",
      "time": "5 min",
      "idea": "`for` puts the starting point, the condition for continuing and the update made each iteration on one line.",
      "theory": [
        {
          "title": "Start",
          "text": "`int i = 1` creates the counter and gives it its initial value."
        },
        {
          "title": "Condition",
          "text": "`i <= 5` allows the loop to continue while the counter is 5 or less."
        },
        {
          "title": "Update",
          "text": "`i++` adds one at the end of each iteration. You can use `i += 2` to count by twos."
        }
      ],
      "exampleTitle": "Count by ones",
      "exampleLead": "This loop displays the numbers from 1 to 3.",
      "example": "public class Demo13 {\n    public static void main(String[] args) {\n        for (int i = 1; i <= 3; i++) {\n            System.out.println(i);\n        }\n    }\n}",
      "explain": [
        "The three parts of `for` are separated by semicolons.",
        "If you start at 1 and use `i <= 3`, you get 1, 2 and 3.",
        "If the condition were `i < 3`, you would get only 1 and 2."
      ],
      "task": "Display the even numbers from 2 to 10.",
      "think": "Answer three questions: where does it start, how long does it keep going, how does it change each turn?",
      "steps": [
        "Start at 2.",
        "Keep going until 10 (included).",
        "Jump by 2 on every turn."
      ],
      "hints": [
        "The three answers go in the parentheses, separated by `;`.",
        "`for (int i = 2; i ___ 10; i ___ 2)`"
      ],
      "recall": [
        {
          "do": "Repeat a known number of times",
          "code": "for (int i = 1; i <= 5; i++) {\n    System.out.println(i);\n}"
        },
        {
          "do": "Jump by 2",
          "code": "for (int i = 0; i <= 10; i += 2) {\n    // ...\n}"
        }
      ],
      "filename": "Exercise13.java",
      "starter": "public class Exercise13 {\n    public static void main(String[] args) {\n        // Write a for loop for even numbers\n    }\n}",
      "output": "2\n4\n6\n8\n10",
      "outputNote": "Five numbers should appear: the first is 2 and the last is 10.",
      "solution": "public class Exercise13 {\n    public static void main(String[] args) {\n        for (int i = 2; i <= 10; i += 2) {\n            System.out.println(i);\n        }\n    }\n}"
    },
    {
      "id": "loop-control",
      "title": "Control a loop: break and continue",
      "time": "4 min",
      "idea": "`break` ends a loop immediately; `continue` skips the rest of the current iteration and moves to the next one.",
      "theory": [
        {
          "title": "`break`",
          "text": "Use it when you have found what you were looking for or want to stop the loop."
        },
        {
          "title": "`continue`",
          "text": "Use it to ignore certain values and continue with the next one."
        },
        {
          "title": "Use sparingly",
          "text": "Too many `break` or `continue` statements can make code harder to follow. Start with simple loops."
        }
      ],
      "exampleTitle": "Skip the number three",
      "exampleLead": "The loop keeps counting, but does not display 3.",
      "example": "public class Demo14 {\n    public static void main(String[] args) {\n        for (int i = 1; i <= 5; i++) {\n            if (i == 3) {\n                continue;\n            }\n            System.out.println(i);\n        }\n    }\n}",
      "explain": [
        "When `i` equals 3, `continue` skips the `println`.",
        "The loop continues with 4 and 5.",
        "If you replaced `continue` with `break`, it would end when it reached 3."
      ],
      "task": "Display the numbers from 1 to 10, but stop the loop when i reaches 7.",
      "think": "What has to be checked on every turn, and what should happen when the check is true?",
      "steps": [
        "Write a normal loop from 1 to 10.",
        "Inside it, add a check for the value that must stop the loop.",
        "Leave the loop when it matches; print the number otherwise."
      ],
      "hints": [
        "`break` leaves the loop immediately. `continue` skips only the current turn.",
        "The check goes before the print: `if (i == 7) { break; }`. Note `==` compares, `=` assigns."
      ],
      "recall": [
        {
          "do": "Leave the loop now",
          "code": "if (i == 7) {\n    break;\n}"
        },
        {
          "do": "Skip this turn only",
          "code": "if (i % 2 == 0) {\n    continue;\n}"
        }
      ],
      "filename": "Exercise14.java",
      "starter": "public class Exercise14 {\n    public static void main(String[] args) {\n        for (int i = 1; i <= 10; i++) {\n            // If i is 7, stop the loop\n            // Otherwise, display i\n        }\n    }\n}",
      "output": "1\n2\n3\n4\n5\n6",
      "outputNote": "7 does not appear: the loop stops before printing it.",
      "solution": "public class Exercise14 {\n    public static void main(String[] args) {\n        for (int i = 1; i <= 10; i++) {\n            if (i == 7) {\n                break;\n            }\n            System.out.println(i);\n        }\n    }\n}"
    },
    {
      "id": "text-and-letters",
      "title": "Read letters and text answers",
      "time": "6 min",
      "idea": "Many programs ask a yes/no question. You read one word, take its first letter and compare it.",
      "theory": [
        {
          "title": "One letter: `char`",
          "text": "`keyboard.next().charAt(0)` reads a word and keeps only its first character. A single character uses single quotes: `'Y'`."
        },
        {
          "title": "Same answer in any case",
          "text": "`Character.toUpperCase(...)` turns `y` into `Y`, so the user can type either and you only compare with `'Y'`."
        },
        {
          "title": "Comparing text",
          "text": "For a `char` use `==`. For a `String` use `.equals(\"yes\")`. Do not compare texts with `==`."
        }
      ],
      "exampleTitle": "Ask for a receipt",
      "exampleLead": "The program asks a yes/no question and reacts to the first letter of the answer.",
      "example": "import java.util.Scanner;\n\npublic class Demo15 {\n    public static void main(String[] args) {\n        Scanner keyboard = new Scanner(System.in);\n        System.out.print(\"Do you want a receipt? (Y/N): \");\n        char answer = Character.toUpperCase(keyboard.next().charAt(0));\n        if (answer == 'Y') {\n            System.out.println(\"Printing receipt...\");\n        } else {\n            System.out.println(\"No receipt.\");\n        }\n        keyboard.close();\n    }\n}",
      "explain": [
        "The letter is converted to uppercase first, so `y` and `Y` both work.",
        "Single quotes for one character, double quotes for text.",
        "`else` catches every other answer, including `N`."
      ],
      "task": "Ask \"Extra luggage? (Y/N)\". If the answer is Y, the luggage fee is 5.0; otherwise it is 0.0. Display the fee.",
      "think": "Which type holds one letter? How do you make `y` and `Y` count as the same answer?",
      "steps": [
        "Ask the question and read the answer as one letter.",
        "Make the letter uppercase.",
        "Start the fee at 0 and change it only when the answer is yes.",
        "Display the fee."
      ],
      "hints": [
        "One character is a `char`. Take it from the typed word with `next().charAt(0)`.",
        "`char answer = Character.toUpperCase(keyboard.next().charAt(0));` then `if (answer == 'Y') { ... }`."
      ],
      "recall": [
        {
          "do": "Read one letter in uppercase",
          "code": "char answer = Character.toUpperCase(keyboard.next().charAt(0));"
        },
        {
          "do": "Compare a letter",
          "code": "if (answer == 'Y') {\n    // yes\n}"
        },
        {
          "do": "Compare text",
          "code": "if (word.equals(\"yes\")) {\n    // same text\n}"
        }
      ],
      "filename": "Exercise15.java",
      "starter": "import java.util.Scanner;\n\npublic class Exercise15 {\n    public static void main(String[] args) {\n        Scanner keyboard = new Scanner(System.in);\n        double fee = 0;\n        // Ask \"Extra luggage? (Y/N): \" and read one letter\n        // If the answer is yes, the fee is 5.0\n        // Display the fee\n        keyboard.close();\n    }\n}",
      "output": "Extra luggage? (Y/N): y\nLuggage fee: 5.0",
      "outputNote": "Type y (lowercase) to prove it also works. With n the fee is 0.0.",
      "solution": "import java.util.Scanner;\n\npublic class Exercise15 {\n    public static void main(String[] args) {\n        Scanner keyboard = new Scanner(System.in);\n        double fee = 0;\n        System.out.print(\"Extra luggage? (Y/N): \");\n        char answer = Character.toUpperCase(keyboard.next().charAt(0));\n        if (answer == 'Y') {\n            fee = 5.0;\n        }\n        System.out.println(\"Luggage fee: \" + fee);\n        keyboard.close();\n    }\n}"
    },
    {
      "id": "validate-input",
      "title": "Validate what the user types",
      "time": "7 min",
      "idea": "A program should not trust the input. Check it, then either stop with an error or ask again.",
      "theory": [
        {
          "title": "Describe what is wrong",
          "text": "Write the condition for the invalid values: `items <= 0`, or `option < 1 || option > 4`. If it is true, the data is not acceptable."
        },
        {
          "title": "Stop the program",
          "text": "Inside `main`, `return;` ends the program right there. Show the error message first."
        },
        {
          "title": "Ask again",
          "text": "A `while` with the invalid condition repeats the question until the value is acceptable. Read again inside the loop."
        }
      ],
      "theoryNote": "If typing `4.5` causes an `InputMismatchException`, your computer expects a comma. Add `import java.util.Locale;` and write `keyboard.useLocale(Locale.US);` right after creating the Scanner.",
      "exampleTitle": "Two ways to validate",
      "exampleLead": "The first value stops the program if it is wrong. The second one is asked again until it is valid.",
      "example": "import java.util.Scanner;\n\npublic class Demo16 {\n    public static void main(String[] args) {\n        Scanner keyboard = new Scanner(System.in);\n        System.out.print(\"Players (1 to 4): \");\n        int players = keyboard.nextInt();\n        if (players < 1 || players > 4) {\n            System.out.println(\"Error: choose between 1 and 4\");\n            keyboard.close();\n            return;\n        }\n        System.out.print(\"Lives (more than 0): \");\n        int lives = keyboard.nextInt();\n        while (lives <= 0) {\n            System.out.println(\"Lives must be more than 0\");\n            System.out.print(\"Lives (more than 0): \");\n            lives = keyboard.nextInt();\n        }\n        System.out.println(players + \" players, \" + lives + \" lives\");\n        keyboard.close();\n    }\n}",
      "explain": [
        "`return;` after the error message ends `main`, so nothing else runs.",
        "The value is read once before the `while` and again inside it.",
        "When the value becomes valid the condition is false and the loop ends."
      ],
      "task": "Ask for the number of items. If it is not greater than 0, display an error and stop. Then ask for a price and keep asking until it is greater than 0. Display both.",
      "think": "Which condition describes the wrong values? Which of the two checks should stop the program, and which should ask again?",
      "steps": [
        "Read the number of items.",
        "If it is not valid: error message and end the program.",
        "Read the price.",
        "While the price is not valid: message and read it again.",
        "Display the items and the price."
      ],
      "hints": [
        "Items use `if` + `return;`. Price uses `while` with the same invalid condition.",
        "`if (items <= 0) { ...; return; }` and `while (price <= 0) { ...; price = keyboard.nextDouble(); }`"
      ],
      "recall": [
        {
          "do": "Stop the program when the input is wrong",
          "code": "if (n <= 0) {\n    System.out.println(\"Error\");\n    return;\n}"
        },
        {
          "do": "Ask again until the value is valid",
          "code": "while (price <= 0) {\n    System.out.print(\"Price: \");\n    price = keyboard.nextDouble();\n}"
        }
      ],
      "filename": "Exercise16.java",
      "starter": "import java.util.Scanner;\n\npublic class Exercise16 {\n    public static void main(String[] args) {\n        Scanner keyboard = new Scanner(System.in);\n        // Read the items. If it is not greater than 0: error and return\n        // Read the price. While it is not greater than 0: ask again\n        // Display items and price\n        keyboard.close();\n    }\n}",
      "output": "Items: 3\nPrice: -2\nThe price must be greater than 0\nPrice: 4.5\n3 items at 4.5",
      "outputNote": "Run it again with 0 items: the program must stop after the error.",
      "solution": "import java.util.Scanner;\n\npublic class Exercise16 {\n    public static void main(String[] args) {\n        Scanner keyboard = new Scanner(System.in);\n        System.out.print(\"Items: \");\n        int items = keyboard.nextInt();\n        if (items <= 0) {\n            System.out.println(\"Error: items must be greater than 0\");\n            keyboard.close();\n            return;\n        }\n        System.out.print(\"Price: \");\n        double price = keyboard.nextDouble();\n        while (price <= 0) {\n            System.out.println(\"The price must be greater than 0\");\n            System.out.print(\"Price: \");\n            price = keyboard.nextDouble();\n        }\n        System.out.println(items + \" items at \" + price);\n        keyboard.close();\n    }\n}"
    },
    {
      "id": "money-percentages",
      "title": "Prices, percentages and tidy output",
      "time": "7 min",
      "idea": "Prices need decimals, discounts and taxes. `printf` prints numbers with exactly the decimals you choose.",
      "theory": [
        {
          "title": "A percentage is a decimal",
          "text": "20% is `0.20`. The discount is `price * 0.20`. The price after the discount is `price - discount`."
        },
        {
          "title": "Add a tax at the end",
          "text": "VAT of 21% on the base is `base * 0.21`. Keep the rate in a constant: `final double VAT = 0.21;`. The total is `base + vat`."
        },
        {
          "title": "`printf` and `%.2f`",
          "text": "`System.out.printf(\"Total: %.2f%n\", total);` shows 2 decimals. `%n` ends the line. The variable keeps its full value."
        }
      ],
      "theoryNote": "If `printf` shows a comma (`77,44`) and you want a dot, use `System.out.printf(Locale.US, \"Total: %.2f%n\", total);` with `import java.util.Locale;`.",
      "exampleTitle": "A small invoice",
      "exampleLead": "A price of 80 with 20% off and then 21% VAT, one variable per step.",
      "example": "public class Demo17 {\n    public static void main(String[] args) {\n        final double VAT = 0.21;\n        double price = 80.0;\n        double discount = price * 0.20;\n        double base = price - discount;\n        double vat = base * VAT;\n        double total = base + vat;\n        System.out.printf(\"Price: %.2f%n\", price);\n        System.out.printf(\"Discount: %.2f%n\", discount);\n        System.out.printf(\"Base: %.2f%n\", base);\n        System.out.printf(\"VAT: %.2f%n\", vat);\n        System.out.printf(\"Total: %.2f%n\", total);\n    }\n}",
      "explain": [
        "The discount is calculated from the original price.",
        "The tax is calculated on the base, after the discount.",
        "`%.2f` only changes how the number is shown, not the variable."
      ],
      "task": "A ticket costs 40. A pensioner gets 30% off, then a 5 luggage surcharge is added. Apply 21% VAT to the result. Display discount, base, VAT and total with 2 decimals.",
      "think": "In what order do the amounts apply: discount, surcharge, tax? Which amount does each percentage use?",
      "steps": [
        "Calculate the discount from the price.",
        "Calculate the base: price, minus discount, plus surcharge.",
        "Calculate the VAT on the base, then the total.",
        "Display the four amounts with 2 decimals."
      ],
      "hints": [
        "30% is `0.30`. The VAT is calculated on the base, never on the original price.",
        "`double base = price - discount + surcharge;` `double vat = base * VAT;` `System.out.printf(\"Total: %.2f%n\", total);`"
      ],
      "recall": [
        {
          "do": "Discount and price after the discount",
          "code": "double discount = price * 0.20;\ndouble base = price - discount;"
        },
        {
          "do": "Tax as a constant",
          "code": "final double VAT = 0.21;\ndouble vat = base * VAT;"
        },
        {
          "do": "Print a number with 2 decimals",
          "code": "System.out.printf(\"Total: %.2f%n\", total);"
        }
      ],
      "filename": "Exercise17.java",
      "starter": "public class Exercise17 {\n    public static void main(String[] args) {\n        final double VAT = 0.21;\n        double price = 40.0;\n        double surcharge = 5.0;\n        // Calculate the 30% discount\n        // Calculate the base: price - discount + surcharge\n        // Calculate the VAT and the total\n        // Display discount, base, VAT and total with 2 decimals\n    }\n}",
      "output": "Discount: 12.00\nBase: 33.00\nVAT: 6.93\nTotal: 39.93",
      "outputNote": "Change the price and check that every amount changes with it.",
      "solution": "public class Exercise17 {\n    public static void main(String[] args) {\n        final double VAT = 0.21;\n        double price = 40.0;\n        double surcharge = 5.0;\n        double discount = price * 0.30;\n        double base = price - discount + surcharge;\n        double vat = base * VAT;\n        double total = base + vat;\n        System.out.printf(\"Discount: %.2f%n\", discount);\n        System.out.printf(\"Base: %.2f%n\", base);\n        System.out.printf(\"VAT: %.2f%n\", vat);\n        System.out.printf(\"Total: %.2f%n\", total);\n    }\n}"
    },
    {
      "id": "counters-accumulators",
      "title": "Count and add while you read",
      "time": "8 min",
      "idea": "You do not need to store every value. Read each one inside a loop and update counters and a running total as you go.",
      "theory": [
        {
          "title": "Counter",
          "text": "Starts at 0 and goes up by one each time something happens: `if (value % 2 == 0) { evens++; }`."
        },
        {
          "title": "Accumulator",
          "text": "Starts at 0 and adds every value: `sum += value;`. The average is `(double) sum / n` at the end."
        },
        {
          "title": "Before the loop",
          "text": "Counters and sums are created before the loop. If you create them inside, they restart from 0 on every turn."
        }
      ],
      "exampleTitle": "Even numbers and the sum",
      "exampleLead": "Read N numbers, count the even ones and add all of them. Nothing is stored.",
      "example": "import java.util.Scanner;\n\npublic class Demo18 {\n    public static void main(String[] args) {\n        Scanner keyboard = new Scanner(System.in);\n        System.out.print(\"How many numbers? \");\n        int n = keyboard.nextInt();\n        int sum = 0;\n        int evens = 0;\n        for (int i = 1; i <= n; i++) {\n            System.out.print(\"Number \" + i + \": \");\n            int value = keyboard.nextInt();\n            sum += value;\n            if (value % 2 == 0) {\n                evens++;\n            }\n        }\n        System.out.println(\"Sum: \" + sum);\n        System.out.println(\"Even numbers: \" + evens);\n        keyboard.close();\n    }\n}",
      "explain": [
        "`sum` and `evens` live outside the loop, so they keep their value between turns.",
        "Each turn reads one value, uses it and forgets it.",
        "`i` is only the turn number: 1, 2, 3..."
      ],
      "task": "Ask how many marks there are. Read each mark (0 to 10) and count how many are failed (below 5), passed (5 to 8) and excellent (above 8). Display the three counters, the sum and the average.",
      "think": "What must you remember after reading each mark? Which variables must exist before the loop starts?",
      "steps": [
        "Create the three counters and the sum, all at 0, before the loop.",
        "Loop N times and read one mark per turn.",
        "Add the mark to the sum and increase the right counter.",
        "After the loop calculate the average keeping decimals, then display everything."
      ],
      "hints": [
        "Three groups and no overlap: use `if`, `else if` and `else`, so each mark is counted once.",
        "`if (mark < 5) { failed++; } else if (mark <= 8) { passed++; } else { excellent++; }`"
      ],
      "recall": [
        {
          "do": "Count how many values meet a condition",
          "code": "int count = 0;\nfor (int i = 1; i <= n; i++) {\n    int value = keyboard.nextInt();\n    if (value > 0) {\n        count++;\n    }\n}"
        },
        {
          "do": "Count by groups",
          "code": "if (v > 30) {\n    high++;\n} else if (v < 0) {\n    low++;\n} else {\n    middle++;\n}"
        },
        {
          "do": "Add values and get the average",
          "code": "sum += value;\n// after the loop\ndouble average = (double) sum / n;"
        }
      ],
      "filename": "Exercise18.java",
      "starter": "import java.util.Scanner;\n\npublic class Exercise18 {\n    public static void main(String[] args) {\n        Scanner keyboard = new Scanner(System.in);\n        System.out.print(\"How many marks? \");\n        int n = keyboard.nextInt();\n        // Create the counters and the sum before the loop\n        // Loop: read each mark, add it and count it in its group\n        // Display the counters, the sum and the average\n        keyboard.close();\n    }\n}",
      "output": "How many marks? 4\nMark 1: 3\nMark 2: 7\nMark 3: 9\nMark 4: 5\nFailed: 1\nPassed: 2\nExcellent: 1\nSum: 24\nAverage: 6.0",
      "outputNote": "The numbers after \"Mark\" are what you type. The average keeps its decimal part.",
      "solution": "import java.util.Scanner;\n\npublic class Exercise18 {\n    public static void main(String[] args) {\n        Scanner keyboard = new Scanner(System.in);\n        System.out.print(\"How many marks? \");\n        int n = keyboard.nextInt();\n        int failed = 0;\n        int passed = 0;\n        int excellent = 0;\n        int sum = 0;\n        for (int i = 1; i <= n; i++) {\n            System.out.print(\"Mark \" + i + \": \");\n            int mark = keyboard.nextInt();\n            sum += mark;\n            if (mark < 5) {\n                failed++;\n            } else if (mark <= 8) {\n                passed++;\n            } else {\n                excellent++;\n            }\n        }\n        double average = (double) sum / n;\n        System.out.println(\"Failed: \" + failed);\n        System.out.println(\"Passed: \" + passed);\n        System.out.println(\"Excellent: \" + excellent);\n        System.out.println(\"Sum: \" + sum);\n        System.out.println(\"Average: \" + average);\n        keyboard.close();\n    }\n}"
    },
    {
      "id": "max-min-position",
      "title": "Largest and smallest, and where they are",
      "time": "8 min",
      "idea": "To find the largest and the smallest value in one pass, remember the best one so far and the turn where you saw it.",
      "theory": [
        {
          "title": "Start with the first value",
          "text": "There is nothing to compare with on the first turn, so the first value is the largest and the smallest. Test it with `i == 1`."
        },
        {
          "title": "Replace only if better",
          "text": "Use `value > max` (strictly greater). With equal values the first position stays. With `>=` it would move to the last one."
        },
        {
          "title": "Save the position too",
          "text": "When you replace the value, replace the position in the same block: `maxPos = i;`."
        }
      ],
      "exampleTitle": "Find the largest value",
      "exampleLead": "Read N heights and show the largest one and the turn where it appeared first. The smallest one is your exercise.",
      "example": "import java.util.Scanner;\n\npublic class Demo19 {\n    public static void main(String[] args) {\n        Scanner keyboard = new Scanner(System.in);\n        System.out.print(\"How many heights? \");\n        int n = keyboard.nextInt();\n        int tallest = 0;\n        int tallestPos = 0;\n        for (int i = 1; i <= n; i++) {\n            System.out.print(\"Height \" + i + \": \");\n            int height = keyboard.nextInt();\n            if (i == 1 || height > tallest) {\n                tallest = height;\n                tallestPos = i;\n            }\n        }\n        System.out.println(\"Tallest: \" + tallest + \" (position \" + tallestPos + \")\");\n        keyboard.close();\n    }\n}",
      "explain": [
        "`i == 1 || ...` accepts the first value without comparing it with anything.",
        "Value and position are updated together, inside the same `if`.",
        "The strict `>` keeps the first position when values repeat."
      ],
      "task": "Ask how many scores there are and read them. Display the highest score and the lowest score, each with the position where it appeared first.",
      "think": "What must you remember between turns for each of the two results? What happens on the very first value?",
      "steps": [
        "Create four variables before the loop: highest, its position, lowest, its position.",
        "Loop and read one score per turn.",
        "Update the highest (value and position) when the score is better, or when it is the first.",
        "Do the same for the lowest, then display both."
      ],
      "hints": [
        "The lowest works exactly like the highest, with `<` instead of `>`.",
        "`if (i == 1 || points < lowest) { lowest = points; lowestPos = i; }`"
      ],
      "recall": [
        {
          "do": "Largest value and its position (first one)",
          "code": "if (i == 1 || value > max) {\n    max = value;\n    maxPos = i;\n}"
        },
        {
          "do": "Smallest value and its position (first one)",
          "code": "if (i == 1 || value < min) {\n    min = value;\n    minPos = i;\n}"
        }
      ],
      "filename": "Exercise19.java",
      "starter": "import java.util.Scanner;\n\npublic class Exercise19 {\n    public static void main(String[] args) {\n        Scanner keyboard = new Scanner(System.in);\n        System.out.print(\"How many scores? \");\n        int n = keyboard.nextInt();\n        // Create the four variables before the loop\n        // Loop: read each score and update highest and lowest\n        // Display both with their positions\n        keyboard.close();\n    }\n}",
      "output": "How many scores? 5\nScore 1: 40\nScore 2: 25\nScore 3: 90\nScore 4: 25\nScore 5: 90\nHighest: 90 (position 3)\nLowest: 25 (position 2)",
      "outputNote": "The highest appears twice (90) but the position shown is the first one. The same for the lowest.",
      "solution": "import java.util.Scanner;\n\npublic class Exercise19 {\n    public static void main(String[] args) {\n        Scanner keyboard = new Scanner(System.in);\n        System.out.print(\"How many scores? \");\n        int n = keyboard.nextInt();\n        int highest = 0;\n        int highestPos = 0;\n        int lowest = 0;\n        int lowestPos = 0;\n        for (int i = 1; i <= n; i++) {\n            System.out.print(\"Score \" + i + \": \");\n            int points = keyboard.nextInt();\n            if (i == 1 || points > highest) {\n                highest = points;\n                highestPos = i;\n            }\n            if (i == 1 || points < lowest) {\n                lowest = points;\n                lowestPos = i;\n            }\n        }\n        System.out.println(\"Highest: \" + highest + \" (position \" + highestPos + \")\");\n        System.out.println(\"Lowest: \" + lowest + \" (position \" + lowestPos + \")\");\n        keyboard.close();\n    }\n}"
    },
    {
      "id": "menu-loop",
      "title": "Menus that repeat",
      "time": "9 min",
      "idea": "A menu shows the options, does what you pick and comes back until you choose to leave. Variables outside the loop remember what happened.",
      "theory": [
        {
          "title": "`do-while` for the menu",
          "text": "The menu must be shown at least once, so use `do { ... } while (option != 0);`. The exit option is what ends the loop."
        },
        {
          "title": "`switch` for the options",
          "text": "One `case` per option, each ending in `break;`. `default` handles any invalid option."
        },
        {
          "title": "State lives outside",
          "text": "Balance, counters and the option are declared before the `do`. A variable used in several cases (like `amount`) is also declared before the `switch`, or Java complains that it is already defined."
        }
      ],
      "exampleTitle": "A counter menu",
      "exampleLead": "Option 1 adds one, option 2 shows the count, option 0 leaves.",
      "example": "import java.util.Scanner;\n\npublic class Demo20 {\n    public static void main(String[] args) {\n        Scanner keyboard = new Scanner(System.in);\n        int count = 0;\n        int option;\n        do {\n            System.out.println(\"1) Add one  2) Show  0) Exit\");\n            System.out.print(\"Option: \");\n            option = keyboard.nextInt();\n            switch (option) {\n                case 1:\n                    count++;\n                    break;\n                case 2:\n                    System.out.println(\"Count: \" + count);\n                    break;\n                case 0:\n                    System.out.println(\"Bye\");\n                    break;\n                default:\n                    System.out.println(\"Invalid option\");\n            }\n        } while (option != 0);\n        keyboard.close();\n    }\n}",
      "explain": [
        "`count` is declared before the loop, so it survives every turn.",
        "Every `case` ends with `break;`, and `default` catches invalid options.",
        "The loop repeats while the option is not 0."
      ],
      "task": "Make a wallet menu. The balance starts at 20.0. Option 1 deposits (amount > 0), option 2 withdraws (amount > 0 and not more than the balance), option 3 shows the balance and how many deposits and withdrawals were made, and option 0 leaves.",
      "think": "Which values must survive between menu turns? What decides whether a withdrawal is allowed?",
      "steps": [
        "Declare the balance, the two counters, the amount and the option before the loop.",
        "Write the `do-while` that shows the menu and reads the option.",
        "Add one `case` per option, starting with the easy ones (3 and 0).",
        "For deposit and withdraw, check the amount before changing the balance.",
        "Try an invalid option and a withdrawal larger than the balance."
      ],
      "hints": [
        "For withdraw you need three outcomes: amount not valid, not enough balance, or OK. That is `if`, `else if`, `else`.",
        "`if (amount <= 0) { ... } else if (amount > balance) { ... } else { balance -= amount; withdrawals++; }`"
      ],
      "recall": [
        {
          "do": "Skeleton of a repeating menu",
          "code": "int option;\ndo {\n    System.out.println(\"1) ...  0) Exit\");\n    option = keyboard.nextInt();\n    switch (option) {\n        case 1:\n            // ...\n            break;\n        case 0:\n            break;\n        default:\n            System.out.println(\"Invalid option\");\n    }\n} while (option != 0);"
        }
      ],
      "filename": "Exercise20.java",
      "starter": "import java.util.Scanner;\n\npublic class Exercise20 {\n    public static void main(String[] args) {\n        Scanner keyboard = new Scanner(System.in);\n        double balance = 20.0;\n        int deposits = 0;\n        int withdrawals = 0;\n        double amount;\n        int option;\n        // Repeat the menu until the option is 0\n        // 1 Deposit: ask the amount (> 0) and add it\n        // 2 Withdraw: ask the amount (> 0); only if there is enough balance\n        // 3 Show the balance and both counters\n        // 0 Exit. Anything else: invalid option\n        keyboard.close();\n    }\n}",
      "output": "1) Deposit  2) Withdraw  3) Show  0) Exit\nOption: 1\nAmount: 10\nDeposited\n\n1) Deposit  2) Withdraw  3) Show  0) Exit\nOption: 2\nAmount: 50\nNot enough balance\n\n1) Deposit  2) Withdraw  3) Show  0) Exit\nOption: 2\nAmount: 5\nWithdrawn\n\n1) Deposit  2) Withdraw  3) Show  0) Exit\nOption: 3\nBalance: 25.0\nDeposits: 1, withdrawals: 1\n\n1) Deposit  2) Withdraw  3) Show  0) Exit\nOption: 7\nInvalid option\n\n1) Deposit  2) Withdraw  3) Show  0) Exit\nOption: 0\nGoodbye",
      "outputNote": "The values after \"Option\" and \"Amount\" are what you type. The withdrawal of 50 is refused.",
      "solution": "import java.util.Scanner;\n\npublic class Exercise20 {\n    public static void main(String[] args) {\n        Scanner keyboard = new Scanner(System.in);\n        double balance = 20.0;\n        int deposits = 0;\n        int withdrawals = 0;\n        double amount;\n        int option;\n        do {\n            System.out.println();\n            System.out.println(\"1) Deposit  2) Withdraw  3) Show  0) Exit\");\n            System.out.print(\"Option: \");\n            option = keyboard.nextInt();\n            switch (option) {\n                case 1:\n                    System.out.print(\"Amount: \");\n                    amount = keyboard.nextDouble();\n                    if (amount > 0) {\n                        balance += amount;\n                        deposits++;\n                        System.out.println(\"Deposited\");\n                    } else {\n                        System.out.println(\"The amount must be greater than 0\");\n                    }\n                    break;\n                case 2:\n                    System.out.print(\"Amount: \");\n                    amount = keyboard.nextDouble();\n                    if (amount <= 0) {\n                        System.out.println(\"The amount must be greater than 0\");\n                    } else if (amount > balance) {\n                        System.out.println(\"Not enough balance\");\n                    } else {\n                        balance -= amount;\n                        withdrawals++;\n                        System.out.println(\"Withdrawn\");\n                    }\n                    break;\n                case 3:\n                    System.out.println(\"Balance: \" + balance);\n                    System.out.println(\"Deposits: \" + deposits + \", withdrawals: \" + withdrawals);\n                    break;\n                case 0:\n                    System.out.println(\"Goodbye\");\n                    break;\n                default:\n                    System.out.println(\"Invalid option\");\n            }\n        } while (option != 0);\n        keyboard.close();\n    }\n}"
    },
    {
      "id": "problem-statistics",
      "title": "Practice problem: rainfall report",
      "time": "15 min",
      "idea": "A complete problem: validate the input, read N values in one pass and report counts, extremes with position, total and average. No arrays needed.",
      "theory": [
        {
          "title": "Read the statement twice",
          "text": "Underline every thing you must display and every rule (validate, one pass). Each one becomes a variable or an `if`."
        },
        {
          "title": "Build it in layers",
          "text": "Do not write everything at once. Get one layer working, run it, then add the next. A program that runs and does little beats one that does a lot and does not compile."
        },
        {
          "title": "Use what you already know",
          "text": "Validation: lesson 16. Counting by groups and sums: lesson 18. Largest and smallest with position: lesson 19."
        }
      ],
      "exampleTitle": "The skeleton",
      "exampleLead": "Layer 1 is written and runs. The other layers are only comments: your plan.",
      "example": "import java.util.Scanner;\n\npublic class Demo21 {\n    public static void main(String[] args) {\n        Scanner keyboard = new Scanner(System.in);\n\n        // Layer 1: read and validate N\n        System.out.print(\"Days: \");\n        int days = keyboard.nextInt();\n        if (days <= 0) {\n            System.out.println(\"Error: days must be greater than 0\");\n            keyboard.close();\n            return;\n        }\n\n        // Layer 2: variables that live outside the loop\n        // Layer 3: loop that reads each value\n        // Layer 4: update counters, sum, max and min inside the loop\n        // Layer 5: display the results\n\n        keyboard.close();\n    }\n}",
      "explain": [
        "Layer 1 already stops the program on a wrong N.",
        "Layers 2 to 5 are the same pieces you used in lessons 18 and 19.",
        "Run the program after each layer you finish."
      ],
      "task": [
        "Ask for the number of days N.",
        "If N is not greater than 0, display an error and finish.",
        "Then read N rainfall values in whole mm (0 or more).",
        "Display: how many days were dry (0 mm), light (1 to 10 mm) and heavy (more than 10 mm); the wettest day and the driest day with the first day they appeared; the total; and the average.",
        "Do it in one pass, without storing the values."
      ],
      "think": "List everything you must display. For each one, which variable do you need, and what must it do on every turn of the loop?",
      "steps": [
        "Layer 1: ask for N and validate it.",
        "Layer 2: create the counters, total, wettest and driest (value and day).",
        "Layer 3: write the loop and read each value. Run it.",
        "Layer 4: inside the loop, add to the total and count the group.",
        "Layer 4: update the wettest and the driest with their day.",
        "Layer 5: display the report. Test it with the sample and with N = 0."
      ],
      "hints": [
        "It is lesson 18 (counters and sum) plus lesson 19 (largest and smallest) inside one loop. The average is `(double) total / days`.",
        "In the loop: `total += mm;` then `if (mm == 0) { dry++; } else if (mm <= 10) { light++; } else { heavy++; }` then two `if (day == 1 || ...)` blocks."
      ],
      "recall": [
        {
          "do": "Skeleton: validate, variables, loop, report",
          "code": "int n = keyboard.nextInt();\nif (n <= 0) {\n    System.out.println(\"Error\");\n    return;\n}\nint sum = 0;\nfor (int i = 1; i <= n; i++) {\n    int value = keyboard.nextInt();\n    sum += value;\n}\nSystem.out.println(sum);"
        }
      ],
      "filename": "Exercise21.java",
      "starter": "import java.util.Scanner;\n\npublic class Exercise21 {\n    public static void main(String[] args) {\n        Scanner keyboard = new Scanner(System.in);\n        // Layer 1: ask for the days and validate (> 0)\n        // Layer 2: create counters, total, wettest and driest (value and day)\n        // Layer 3: loop over the days and read each rainfall\n        // Layer 4: inside the loop, update everything\n        // Layer 5: display the report\n        keyboard.close();\n    }\n}",
      "output": "Days: 5\nDay 1 (mm): 0\nDay 2 (mm): 12\nDay 3 (mm): 4\nDay 4 (mm): 12\nDay 5 (mm): 0\n\nDry: 2, light: 1, heavy: 2\nWettest: 12 mm (day 2)\nDriest: 0 mm (day 1)\nTotal: 28 mm\nAverage: 5.6",
      "outputNote": "The wettest day is the first 12 (day 2) and the driest is the first 0 (day 1). Also try 0 days.",
      "solution": "import java.util.Scanner;\n\npublic class Exercise21 {\n    public static void main(String[] args) {\n        Scanner keyboard = new Scanner(System.in);\n        System.out.print(\"Days: \");\n        int days = keyboard.nextInt();\n        if (days <= 0) {\n            System.out.println(\"Error: days must be greater than 0\");\n            keyboard.close();\n            return;\n        }\n        int dry = 0;\n        int light = 0;\n        int heavy = 0;\n        int total = 0;\n        int wettest = 0;\n        int wettestDay = 0;\n        int driest = 0;\n        int driestDay = 0;\n        for (int day = 1; day <= days; day++) {\n            System.out.print(\"Day \" + day + \" (mm): \");\n            int mm = keyboard.nextInt();\n            total += mm;\n            if (mm == 0) {\n                dry++;\n            } else if (mm <= 10) {\n                light++;\n            } else {\n                heavy++;\n            }\n            if (day == 1 || mm > wettest) {\n                wettest = mm;\n                wettestDay = day;\n            }\n            if (day == 1 || mm < driest) {\n                driest = mm;\n                driestDay = day;\n            }\n        }\n        System.out.println();\n        System.out.println(\"Dry: \" + dry + \", light: \" + light + \", heavy: \" + heavy);\n        System.out.println(\"Wettest: \" + wettest + \" mm (day \" + wettestDay + \")\");\n        System.out.println(\"Driest: \" + driest + \" mm (day \" + driestDay + \")\");\n        System.out.println(\"Total: \" + total + \" mm\");\n        System.out.println(\"Average: \" + (double) total / days);\n        keyboard.close();\n    }\n}"
    },
    {
      "id": "problem-menu",
      "title": "Practice problem: vending machine",
      "time": "15 min",
      "idea": "A complete problem: a repeating menu that changes a balance, validates amounts and keeps statistics.",
      "theory": [
        {
          "title": "Write the state first",
          "text": "List what the program must remember: credit, purchases made, purchases rejected. Each one is a variable declared before the loop."
        },
        {
          "title": "Build it in layers",
          "text": "First the menu with only option 0 working. Then one option at a time. Run after each one."
        },
        {
          "title": "Check before you change",
          "text": "Before subtracting money, check there is enough. Before adding, check the amount is valid. Wrong data must leave the state untouched."
        }
      ],
      "exampleTitle": "The skeleton",
      "exampleLead": "The menu already works for option 0. Every other option is waiting for you.",
      "example": "import java.util.Scanner;\n\npublic class Demo22 {\n    public static void main(String[] args) {\n        Scanner keyboard = new Scanner(System.in);\n        double credit = 5.0;\n        int option;\n        do {\n            System.out.println(\"1) Coin  2) Buy  3) Refund  4) Status  0) Exit\");\n            System.out.print(\"Option: \");\n            option = keyboard.nextInt();\n            switch (option) {\n                // case 1, 2, 3, 4: your work\n                case 0:\n                    System.out.println(\"Goodbye\");\n                    break;\n                default:\n                    System.out.println(\"Invalid option\");\n            }\n        } while (option != 0);\n        keyboard.close();\n    }\n}",
      "explain": [
        "`credit` starts at 5.0 and is declared outside the loop.",
        "Add the counters you need next to `credit`.",
        "Each new option is one more `case`."
      ],
      "task": [
        "Credit starts at 5.0.",
        "Repeat a menu until 0:",
        "(1) insert a coin: ask the amount (> 0) and add it to the credit, counting the coins.",
        "(2) buy a snack: ask the price (> 0); if it is not more than the credit, subtract it and count a purchase, otherwise say there is not enough credit and count a rejected purchase.",
        "(3) refund: show the credit returned and set it to 0.",
        "(4) status: credit, coins, purchases and rejected purchases.",
        "(0) exit.",
        "Wrong amounts and wrong options show a message and change nothing."
      ],
      "think": "What must the program remember? For each option, which variables change, and what must be checked first?",
      "steps": [
        "Declare the credit and the three counters before the loop.",
        "Menu with option 0 and `default`. Run it.",
        "Option 4 (status) and option 3 (refund): no checks needed.",
        "Option 1: validate the amount, add it, count the coin.",
        "Option 2: validate the price, then enough credit or not.",
        "Test every option, including wrong ones."
      ],
      "hints": [
        "Option 2 has three outcomes, like the withdrawal in lesson 20: invalid price, not enough credit, or purchase made.",
        "`if (price <= 0) { ... } else if (price > credit) { rejected++; ... } else { credit -= price; purchases++; ... }` and declare `double amount;` before the `do`."
      ],
      "recall": [
        {
          "do": "Check there is enough before subtracting",
          "code": "if (amount > balance) {\n    System.out.println(\"Not enough balance\");\n} else {\n    balance -= amount;\n}"
        }
      ],
      "filename": "Exercise22.java",
      "starter": "import java.util.Scanner;\n\npublic class Exercise22 {\n    public static void main(String[] args) {\n        Scanner keyboard = new Scanner(System.in);\n        double credit = 5.0;\n        double amount;\n        int option;\n        // Declare the counters: coins, purchases, rejected\n        // Repeat the menu until 0. Add one option at a time\n        keyboard.close();\n    }\n}",
      "output": "1) Coin  2) Buy  3) Refund  4) Status  0) Exit\nOption: 2\nSnack price: 1.5\nEnjoy! Credit: 3.5\n\n1) Coin  2) Buy  3) Refund  4) Status  0) Exit\nOption: 2\nSnack price: 9\nNot enough credit\n\n1) Coin  2) Buy  3) Refund  4) Status  0) Exit\nOption: 1\nCoin amount: -3\nThe amount must be greater than 0\n\n1) Coin  2) Buy  3) Refund  4) Status  0) Exit\nOption: 1\nCoin amount: 2\nCredit: 5.5\n\n1) Coin  2) Buy  3) Refund  4) Status  0) Exit\nOption: 4\nCredit: 5.5\nCoins: 1\nPurchases: 1\nRejected: 1\n\n1) Coin  2) Buy  3) Refund  4) Status  0) Exit\nOption: 3\nRefunded: 5.5\n\n1) Coin  2) Buy  3) Refund  4) Status  0) Exit\nOption: 0\nGoodbye",
      "outputNote": "The purchase of 9 is rejected, the coin of -3 is refused, and the refund returns everything left.",
      "solution": "import java.util.Scanner;\n\npublic class Exercise22 {\n    public static void main(String[] args) {\n        Scanner keyboard = new Scanner(System.in);\n        double credit = 5.0;\n        int coins = 0;\n        int purchases = 0;\n        int rejected = 0;\n        double amount;\n        int option;\n        do {\n            System.out.println();\n            System.out.println(\"1) Coin  2) Buy  3) Refund  4) Status  0) Exit\");\n            System.out.print(\"Option: \");\n            option = keyboard.nextInt();\n            switch (option) {\n                case 1:\n                    System.out.print(\"Coin amount: \");\n                    amount = keyboard.nextDouble();\n                    if (amount > 0) {\n                        credit += amount;\n                        coins++;\n                        System.out.println(\"Credit: \" + credit);\n                    } else {\n                        System.out.println(\"The amount must be greater than 0\");\n                    }\n                    break;\n                case 2:\n                    System.out.print(\"Snack price: \");\n                    amount = keyboard.nextDouble();\n                    if (amount <= 0) {\n                        System.out.println(\"The price must be greater than 0\");\n                    } else if (amount > credit) {\n                        rejected++;\n                        System.out.println(\"Not enough credit\");\n                    } else {\n                        credit -= amount;\n                        purchases++;\n                        System.out.println(\"Enjoy! Credit: \" + credit);\n                    }\n                    break;\n                case 3:\n                    System.out.println(\"Refunded: \" + credit);\n                    credit = 0;\n                    break;\n                case 4:\n                    System.out.println(\"Credit: \" + credit);\n                    System.out.println(\"Coins: \" + coins);\n                    System.out.println(\"Purchases: \" + purchases);\n                    System.out.println(\"Rejected: \" + rejected);\n                    break;\n                case 0:\n                    System.out.println(\"Goodbye\");\n                    break;\n                default:\n                    System.out.println(\"Invalid option\");\n            }\n        } while (option != 0);\n        keyboard.close();\n    }\n}"
    },
    {
      "id": "problem-tariff",
      "title": "Practice problem: parking fee",
      "time": "15 min",
      "idea": "A complete problem: several inputs, a tiered price, a discount by type, a surcharge, VAT and a detailed receipt.",
      "theory": [
        {
          "title": "One variable per step",
          "text": "Base price, discount, surcharge, taxable base, VAT, total: each one in its own variable, in the order the statement describes."
        },
        {
          "title": "Tiers with `if`",
          "text": "Start with the price of the first tier and add the extra only when the limit is exceeded: `if (hours > 2) { price += (hours - 2) * 1.5; }`."
        },
        {
          "title": "Build it in layers",
          "text": "Inputs and validation first, then the calculation, then the output. Print the intermediate values while you test."
        }
      ],
      "exampleTitle": "The skeleton",
      "exampleLead": "The inputs are written. The calculation and the receipt are yours.",
      "example": "import java.util.Scanner;\n\npublic class Demo23 {\n    public static void main(String[] args) {\n        Scanner keyboard = new Scanner(System.in);\n        final double VAT = 0.21;\n\n        System.out.print(\"Hours parked: \");\n        int hours = keyboard.nextInt();\n        if (hours < 0) {\n            System.out.println(\"Error: hours cannot be negative\");\n            keyboard.close();\n            return;\n        }\n\n        // Next: the other inputs\n        // Then: base price, discount, surcharge, taxable base, VAT, total\n        // Last: the receipt\n\n        keyboard.close();\n    }\n}",
      "explain": [
        "The first input is read and validated before anything else.",
        "The VAT rate is a constant, so it is easy to change.",
        "Do the calculation only after all the inputs are valid."
      ],
      "task": [
        "Ask the hours parked (integer, 0 or more; otherwise error and finish), the vehicle type (1 = Car, 2 = Motorbike, 3 = Electric; otherwise error and finish) and whether it stayed overnight (Y/N).",
        "Base price: up to 2 hours costs 3.00; more than 2 hours costs 3.00 plus 1.50 for each extra hour.",
        "Discount on the base price: Motorbike 50%, Electric 20%, Car none.",
        "Overnight surcharge: +6.00.",
        "Apply 21% VAT at the end.",
        "Display: hours, base price, discount, surcharge, taxable base, VAT and TOTAL, with 2 decimals."
      ],
      "think": "In what order do the amounts apply? Which amount does the discount use, and which amount does the VAT use?",
      "steps": [
        "Read and validate the hours. Run it.",
        "Read and validate the vehicle type, then read the overnight letter.",
        "Calculate the base price with the tiers.",
        "Calculate the discount rate by type, then the discount.",
        "Calculate the surcharge, taxable base, VAT and total.",
        "Display the receipt with `printf` and test the three vehicle types."
      ],
      "hints": [
        "The discount is calculated on the base price only, and the VAT is calculated on `base price - discount + surcharge`.",
        "`double rate = 0; if (type == 2) { rate = 0.5; } else if (type == 3) { rate = 0.2; }` then `discount = basePrice * rate;`"
      ],
      "recall": [
        {
          "do": "Charge extra only after a limit",
          "code": "double price = 3.0;\nif (hours > 2) {\n    price += (hours - 2) * 1.5;\n}"
        }
      ],
      "filename": "Exercise23.java",
      "starter": "import java.util.Scanner;\n\npublic class Exercise23 {\n    public static void main(String[] args) {\n        Scanner keyboard = new Scanner(System.in);\n        final double VAT = 0.21;\n        // Read and validate the hours\n        // Read and validate the vehicle type, read the overnight letter (Y/N)\n        // Calculate: base price, discount, surcharge, taxable base, VAT, total\n        // Display the receipt with 2 decimals\n        keyboard.close();\n    }\n}",
      "output": "Hours parked: 4\nVehicle (1 = Car, 2 = Motorbike, 3 = Electric): 3\nOvernight? (Y/N): n\n\nHours: 4\nBase price: 6.00\nDiscount: 1.20\nSurcharge: 0.00\nTaxable base: 4.80\nVAT: 1.01\nTOTAL: 5.81",
      "outputNote": "With 4 hours the base price is 6.00, and the electric discount is 20%. Try 1 hour, a motorbike and overnight.",
      "solution": "import java.util.Scanner;\n\npublic class Exercise23 {\n    public static void main(String[] args) {\n        Scanner keyboard = new Scanner(System.in);\n        final double VAT = 0.21;\n\n        System.out.print(\"Hours parked: \");\n        int hours = keyboard.nextInt();\n        if (hours < 0) {\n            System.out.println(\"Error: hours cannot be negative\");\n            keyboard.close();\n            return;\n        }\n        System.out.print(\"Vehicle (1 = Car, 2 = Motorbike, 3 = Electric): \");\n        int type = keyboard.nextInt();\n        if (type < 1 || type > 3) {\n            System.out.println(\"Error: unknown vehicle type\");\n            keyboard.close();\n            return;\n        }\n        System.out.print(\"Overnight? (Y/N): \");\n        char overnight = Character.toUpperCase(keyboard.next().charAt(0));\n\n        double basePrice = 3.0;\n        if (hours > 2) {\n            basePrice += (hours - 2) * 1.5;\n        }\n        double rate = 0;\n        if (type == 2) {\n            rate = 0.5;\n        } else if (type == 3) {\n            rate = 0.2;\n        }\n        double discount = basePrice * rate;\n        double surcharge = 0;\n        if (overnight == 'Y') {\n            surcharge = 6.0;\n        }\n        double taxable = basePrice - discount + surcharge;\n        double vat = taxable * VAT;\n        double total = taxable + vat;\n\n        System.out.println();\n        System.out.printf(\"Hours: %d%n\", hours);\n        System.out.printf(\"Base price: %.2f%n\", basePrice);\n        System.out.printf(\"Discount: %.2f%n\", discount);\n        System.out.printf(\"Surcharge: %.2f%n\", surcharge);\n        System.out.printf(\"Taxable base: %.2f%n\", taxable);\n        System.out.printf(\"VAT: %.2f%n\", vat);\n        System.out.printf(\"TOTAL: %.2f%n\", total);\n        keyboard.close();\n    }\n}"
    },
    {
      "id": "one-dimensional-arrays",
      "title": "Arrays: lists of values",
      "time": "6 min",
      "idea": "An array stores several values of the same type under one name. Each value has a position called an index.",
      "theory": [
        {
          "title": "Indexes start at zero",
          "text": "In `{4, 6, 8}`, index 0 contains 4, index 1 contains 6 and index 2 contains 8."
        },
        {
          "title": "Length",
          "text": "`numbers.length` tells you how many elements there are. If there are 3 elements, the last index is 2."
        },
        {
          "title": "Loop through it",
          "text": "Use `for (int i = 0; i < numbers.length; i++)` to visit every position without going out of bounds."
        }
      ],
      "exampleTitle": "Loop through an array",
      "exampleLead": "The loop uses position `i` to access each element.",
      "example": "public class Demo24 {\n    public static void main(String[] args) {\n        int[] numbers = {4, 6, 8};\n        for (int i = 0; i < numbers.length; i++) {\n            System.out.println(numbers[i]);\n        }\n    }\n}",
      "explain": [
        "`int[]` declares an integer array.",
        "`numbers[i]` gets the element at position i.",
        "Use `< numbers.length`, not `<=`, so you do not try to read a nonexistent position."
      ],
      "task": "Calculate the sum and average of the values `{4, 6, 8}`.",
      "think": "How do you visit every element? What do you keep adding to while you visit them?",
      "steps": [
        "Create the array and a `sum` that starts at 0.",
        "Visit every element and add it to `sum`.",
        "Divide by the number of elements, keeping the decimals.",
        "Print both results."
      ],
      "hints": [
        "The first index is 0 and the last is `length - 1`. A `for` loop with `i < numbers.length` visits all of them.",
        "Inside the loop: `sum += numbers[i];`. After it: `(double) sum / numbers.length`."
      ],
      "recall": [
        {
          "do": "Create an array",
          "code": "int[] numbers = {2, 4, 6};"
        },
        {
          "do": "Read one element / the size",
          "code": "numbers[0]\nnumbers.length"
        },
        {
          "do": "Visit every element",
          "code": "for (int i = 0; i < numbers.length; i++) {\n    System.out.println(numbers[i]);\n}"
        }
      ],
      "filename": "Exercise24.java",
      "starter": "public class Exercise24 {\n    public static void main(String[] args) {\n        int[] numbers = {4, 6, 8};\n        int sum = 0;\n        // Loop through the array and add its values\n        // Calculate and display the average\n    }\n}",
      "output": "Sum: 18\nAverage: 6.0",
      "outputNote": "The sum is 18, divided by the three elements.",
      "solution": "public class Exercise24 {\n    public static void main(String[] args) {\n        int[] numbers = {4, 6, 8};\n        int sum = 0;\n        for (int i = 0; i < numbers.length; i++) {\n            sum += numbers[i];\n        }\n        double average = (double) sum / numbers.length;\n        System.out.println(\"Sum: \" + sum);\n        System.out.println(\"Average: \" + average);\n    }\n}"
    },
    {
      "id": "two-dimensional-arrays",
      "title": "Matrices: rows and columns",
      "time": "6 min",
      "idea": "A matrix is an array of arrays. It represents data in rows and columns, like a table.",
      "theory": [
        {
          "title": "Two indexes",
          "text": "Access an element with `table[row][column]`: first the row, then the column."
        },
        {
          "title": "Both start at zero",
          "text": "`table[0][0]` is the first row, first column."
        },
        {
          "title": "Loop through a matrix",
          "text": "Two loops are usually used: the outer loop visits rows and the inner loop visits columns."
        }
      ],
      "exampleTitle": "Read a position",
      "exampleLead": "The matrix has two rows and two columns.",
      "example": "public class Demo25 {\n    public static void main(String[] args) {\n        int[][] table = {\n            {5, 1},\n            {-2, 3}\n        };\n        System.out.println(table[1][0]);\n    }\n}",
      "explain": [
        "`table[0]` is the first row.",
        "`table[1][0]` means the second row and first column.",
        "The result is `-2`."
      ],
      "task": "Create the matrix `{{2, 4}, {6, 8}}` and display 4 and 6, each on its own line.",
      "think": "In `table[a][b]`, which one is the row and which the column? Remember to count from 0.",
      "steps": [
        "Create the matrix.",
        "Draw it on paper and find where 4 and 6 are (rows and columns start at 0).",
        "Print each one on its own line."
      ],
      "hints": [
        "The pattern is `table[row][column]`, both starting at 0.",
        "Row 0 is `2 4` and row 1 is `6 8`. Read the position of each number off your drawing."
      ],
      "recall": [
        {
          "do": "Create a matrix",
          "code": "int[][] table = {{1, 2}, {3, 4}};"
        },
        {
          "do": "Read one cell (row, column)",
          "code": "table[1][0]"
        },
        {
          "do": "Visit every cell",
          "code": "for (int r = 0; r < table.length; r++) {\n    for (int c = 0; c < table[r].length; c++) {\n        System.out.println(table[r][c]);\n    }\n}"
        }
      ],
      "filename": "Exercise25.java",
      "starter": "public class Exercise25 {\n    public static void main(String[] args) {\n        // Create the two-row matrix\n        // Display 4\n        // Display 6\n    }\n}",
      "output": "4\n6",
      "outputNote": "Row first, then column; the first position is always 0.",
      "solution": "public class Exercise25 {\n    public static void main(String[] args) {\n        int[][] table = {{2, 4}, {6, 8}};\n        System.out.println(table[0][1]);\n        System.out.println(table[1][0]);\n    }\n}"
    },
    {
      "id": "final-project",
      "title": "Final project: calculate an average",
      "time": "8 min",
      "idea": "This exercise combines variables, arrays, loops, operations and conditions. It is a small example of how to combine concepts.",
      "theory": [
        {
          "title": "Plan",
          "text": "First identify what data you have, what result you need and which steps to follow."
        },
        {
          "title": "Calculate",
          "text": "Add all the array elements and divide by the number of grades. Convert to `double` to keep decimal places."
        },
        {
          "title": "Decide",
          "text": "Use `if` to display whether the average is at least 5. Change the grades to test both outcomes."
        }
      ],
      "exampleTitle": "The complete pattern",
      "exampleLead": "First add the values, then calculate the average, and finally make a decision.",
      "example": "public class Demo26 {\n    public static void main(String[] args) {\n        int[] grades = {7, 5, 6};\n        int sum = 0;\n        for (int i = 0; i < grades.length; i++) {\n            sum += grades[i];\n        }\n        double average = (double) sum / grades.length;\n        System.out.println(\"Average: \" + average);\n        if (average >= 5) {\n            System.out.println(\"Pass\");\n        } else {\n            System.out.println(\"Fail\");\n        }\n    }\n}",
      "explain": [
        "The loop adds all the grades.",
        "The `(double)` conversion lets the average include decimals.",
        "The condition decides which message to display."
      ],
      "task": "Modify the program to use the grades `{3, 8, 9, 5}`. Display the average and whether the student passes.",
      "think": "If you only replace the data, what in the program stays the same? Predict the average before running.",
      "steps": [
        "Read the program and say out loud what each part does.",
        "Add the four grades by hand and divide by 4.",
        "Fill in the missing parts of the starter.",
        "Run it and compare with your prediction."
      ],
      "hints": [
        "The loop and the average calculation work for any number of grades. Only the pass/fail decision is new.",
        "Same pattern as before: `sum += grades[i];`, then `(double) sum / grades.length`, then `if (average >= 5) { ... } else { ... }`."
      ],
      "recall": [
        {
          "do": "Average of an array",
          "code": "double average = (double) sum / numbers.length;"
        },
        {
          "do": "Decide pass or fail",
          "code": "if (average >= 5) {\n    System.out.println(\"Pass\");\n} else {\n    System.out.println(\"Fail\");\n}"
        }
      ],
      "filename": "Exercise26.java",
      "starter": "public class Exercise26 {\n    public static void main(String[] args) {\n        int[] grades = {3, 8, 9, 5};\n        int sum = 0;\n        // Add the grades with a for loop\n        // Calculate the average\n        // Display the average and decide whether the student passes\n    }\n}",
      "output": "Average: 6.25\nPass",
      "outputNote": "Also try `{2, 3, 4}`: it should display Fail.",
      "solution": "public class Exercise26 {\n    public static void main(String[] args) {\n        int[] grades = {3, 8, 9, 5};\n        int sum = 0;\n        for (int i = 0; i < grades.length; i++) {\n            sum += grades[i];\n        }\n        double average = (double) sum / grades.length;\n        System.out.println(\"Average: \" + average);\n        if (average >= 5) {\n            System.out.println(\"Pass\");\n        } else {\n            System.out.println(\"Fail\");\n        }\n    }\n}"
    }
  ]
};
