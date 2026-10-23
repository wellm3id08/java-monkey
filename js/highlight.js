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

  JM.highlight = source =>
    tokenize(source)
      .map(({ text, type }) => (type ? `<span class="tok-${type}">${JM.esc(text)}</span>` : JM.esc(text)))
      .join('');

  JM.highlightLines = source => source.split('\n').map(line => JM.highlight(line));
})();
