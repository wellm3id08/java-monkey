# <img src="favicon.svg" alt="" width="28"> Java Monkey

Learn Java in small steps. Each lesson shows one idea at a time, asks you to type the code from memory, and ends with a short exercise.

[Open the website](https://wellm3id08.github.io/java-monkey/)

> [!IMPORTANT]
> Your progress and saved code stay in your browser. Nothing is uploaded to a server.

## How it works

- **Menu:** continue where you left off, review what is due, or pick any topic.
- **Lesson flow:** one idea per screen, a worked example, then typing exercises where you write the code from memory on a single blinking line.
- **Fair grading:** answers are checked as you type. Spacing, comments, variable names and literal values are free (`final double rate = 23;` counts for `final double PI = 3.14159;`), and `x++`, `x += 1` and `x = x + 1` are equivalent. Wrong answers get a specific hint: a missing `;`, a wrong capital letter, a typo in a method name, an unclosed bracket or quote.
- **Spaced review:** every snippet you type goes into a Leitner box. Snippets you struggled with come back sooner; each lesson starts with a warm-up from the previous one.
- **Practice:** a full editor with auto-closing brackets and quotes, auto-indent and tabs. Plan, hints (two steps), expected output and solution are one tap away. Download your code as a `.java` file.
- **Nothing disappears:** replay any lesson or open its notes from the topics list at any time.
- **Appearance:** light, dark or automatic theme; six accent colours (blue, violet, red, green, orange, black and white); English and Spanish.

26 lessons: fundamentals, data and input, decisions, loops, tools for real programs, practice problems, arrays.

## Running the project

Plain HTML, CSS and JavaScript. No build step. Open `index.html`, or serve the folder:

```bash
python3 -m http.server
```

To compile a downloaded exercise, install [JDK 21 or newer](https://adoptium.net/):

```bash
javac Exercise01.java
java Exercise01
```

## Content

Lessons live in `data/en.js` and `data/es.js`. After editing them, `node scripts/generate-exercises.js` regenerates the starter files in `exercises/`.

## License

[MIT](LICENSE)
