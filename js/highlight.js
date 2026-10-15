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

  // Code without whitespace and comments, so answers are compared by meaning and not by layout.
  const significant = source =>
    tokenize(source)
      .filter(({ text, type }) => type !== 'comment' && /\S/.test(text))
      .map(({ text }) => text);

  JM.highlight = source =>
    tokenize(source)
      .map(({ text, type }) => (type ? `<span class="tok-${type}">${JM.esc(text)}</span>` : JM.esc(text)))
      .join('');

  JM.sameCode = (a, b) => {
    const left = significant(a);
    const right = significant(b);
    return left.length === right.length && left.every((token, i) => token === right[i]);
  };
})();
