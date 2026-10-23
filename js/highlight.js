(() => {
  const keywords = new Set(
    ('abstract assert break case catch class const continue default do else enum extends final finally for if ' +
      'implements import instanceof interface native new package private protected public return static ' +
      'strictfp super switch synchronized this throw throws transient try void volatile while var record').split(' ')
  );
  const types = new Set(
    'byte short int long float double boolean char String Object System Scanner Math Integer Double Boolean Character ArrayList'.split(' ')
  );
  const constants = new Set(['true', 'false', 'null']);

  const pattern = new RegExp(
    [
      /(?<comment>\/\/[^\n]*|\/\*[\s\S]*?(?:\*\/|$))/,
      /(?<string>"(?:\\.|[^"\\\n])*"?|'(?:\\.|[^'\\\n])*'?)/,
      /(?<number>\d+(?:\.\d+)?[fFdDlL]?)/,
      /(?<word>[A-Za-z_$][\w$]*)/,
      /(?<other>[\s\S])/,
    ]
      .map(part => part.source)
      .join('|'),
    'g'
  );

  function wordType(word, next) {
    if (keywords.has(word)) return 'keyword';
    if (types.has(word)) return 'type';
    if (constants.has(word)) return 'constant';
    return next === '(' ? 'method' : '';
  }

  function tokenize(source) {
    const tokens = [];
    for (const match of source.matchAll(pattern)) {
      const [kind] = Object.entries(match.groups).find(([, value]) => value !== undefined);
      const text = match[0];
      const type =
        kind === 'word' ? wordType(text, source[match.index + text.length]) : kind === 'other' ? '' : kind;
      tokens.push({ text, type });
    }
    return tokens;
  }

  // `marks` wrap character ranges in extra spans: placeholders of a template or freshly typed characters.
  JM.highlight = (source, marks = []) => {
    let offset = 0;
    let html = '';
    for (const { text, type } of tokenize(source)) {
      const start = offset;
      const end = (offset += text.length);
      let inner = '';
      let cursor = start;
      for (const mark of marks) {
        const from = Math.max(mark.start, start);
        const to = Math.min(mark.end, end);
        if (from >= to) continue;
        inner += JM.esc(source.slice(cursor, from));
        inner += `<span class="${mark.cls}">${JM.esc(source.slice(from, to))}</span>`;
        cursor = to;
      }
      inner += JM.esc(source.slice(cursor, end));
      html += type ? `<span class="tok-${type}">${inner}</span>` : inner;
    }
    return html;
  };

  JM.highlightLines = source => source.split('\n').map(line => JM.highlight(line));
})();
