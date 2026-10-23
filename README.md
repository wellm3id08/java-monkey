# <img src="favicon.svg" alt="" width="28"> Java Monkey

Learn Java in small steps. Each lesson shows one idea at a time, asks you to type the code from memory, and ends with a short exercise.

[Open the website](https://wellm3id08.github.io/java-monkey/)

> [!IMPORTANT]
> Your progress and saved code stay in your browser. Nothing is uploaded to a server.

## How it works

- **Menu:** continue where you left off, review what is due, or pick any topic.
- **Lesson flow:** one idea per screen, a worked example, then typing exercises where you write the code from memory on a single blinking line.
- **Fair grading:** spacing, comments, variable names and literal values are free (`final double rate = 23;` counts for `final double PI = 3.14159;`), and `x++`, `x += 1` and `x = x + 1` are equivalent. Wrong answers get a specific hint: a missing `;`, a wrong capital letter, a typo in a method name, an unclosed bracket or quote.
- **Spaced review:** every snippet you type goes into a Leitner box. Snippets you struggled with come back sooner; each lesson starts with a warm-up from the previous one.
- **Practice:** a full editor with auto-closing brackets and quotes, auto-indent and tabs. Plan, hints, expected output and solution are one key away. Download your code as a `.java` file.
- **Templates:** Eclipse-style templates (`imprimir`, `leerint`, `para`, `menu`…). Type a name and press Tab, or Ctrl+Space for the list. Linked placeholders change together, Tab jumps between them, and imports such as `java.util.Scanner` are added for you. Turn packs or single templates on and off at any time, import your own Eclipse `.xml`, and open the cheat sheet with K.
- **Notes:** a drawer peeks from the bottom of every lesson for writing down doubts; after each lesson a prompt asks if anything is unclear. All notes live in the Notes page, searchable, with a Google search button for each one.
- **Sync:** connect a GitHub token with only the `gist` scope and your progress, notes and settings are kept in a private gist, merged across devices. You can also export and import a file.
- **Keyboard first:** Enter and arrows move through lessons, Esc leaves the editor or closes things, N notes, K templates, T topics, R review, H home, `,` settings, `?` lists every shortcut.
- **Appearance:** light, dark or automatic theme; six accent colours; English and Spanish.

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

Built-in templates live in `templates/` as Eclipse XML. After editing them, run `node scripts/build-templates.js` to rebuild `js/templates-data.js`.

## Why sync uses a token

GitHub Pages only serves static files, so there is no server to complete a "Sign in with GitHub" (OAuth needs a secret that cannot live in the browser). A personal token with only the `gist` scope lets the page talk to the GitHub API directly. A one-click sign-in would need a small backend, such as a serverless function, to exchange the OAuth code.

## License

[MIT](LICENSE)
