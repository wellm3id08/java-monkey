# <img src="favicon.svg" alt="" width="28"> Java Monkey

Learn Java in small steps. Each lesson shows one idea at a time, asks you to type the code from memory, and ends with a short exercise.

[Open the website](https://wellm3id08.github.io/java-monkey/)

> [!IMPORTANT]
> Your progress and saved code stay in your browser. Nothing is uploaded to a server.

## How it works

- **Menu:** continue where you left off, or pick any topic.
- **Lesson flow:** idea, key points, a worked example, then typing exercises where you write the code from memory on a single blinking line. Answers are checked as you type, ignoring spacing and comments.
- **Practice:** a full editor with auto-closing brackets and quotes, auto-indent and tabs. Plan, hints (two steps), expected output and solution are one tap away. Download your code as a `.java` file.
- **Nothing disappears:** every lesson stays open. Replay any lesson or open its notes (key points, example, code to remember) from the topics list at any time.
- English and Spanish, light and dark (follows your system).

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
