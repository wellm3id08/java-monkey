// Grades a typed answer against a reference snippet.
// Structure must match, but variable names and literal values are free:
// `final double rate = 23;` is a valid answer for `final double PI = 3.14159;`.
JM.grade = (() => {
  const RESERVED = new Set(
    ('abstract assert boolean break byte case catch char class const continue default do double else enum extends ' +
      'final finally float for if implements import instanceof int interface long native new package private ' +
      'protected public return short static strictfp super switch synchronized this throw throws transient try ' +
      'void volatile while var record true false null ' +
      'String System Scanner Math Character Integer Double Boolean Object ArrayList main').split(' ')
  );

  const pattern =
    /\/\/[^\n]*|\/\*[\s\S]*?(?:\*\/|$)|"(?:\\.|[^"\\\n])*"?|'(?:\\.|[^'\\\n])*'?|\d+(?:\.\d+)?[fFdDlL]?|[A-Za-z_$][\w$]*|==|!=|<=|>=|&&|\|\||\+\+|--|[+\-*\/%]=|\S/g;

  function lex(source) {
    const tokens = [];
    for (const [text] of source.matchAll(pattern)) {
      if (text.startsWith('//') || text.startsWith('/*')) continue;
      const kind = text[0] === '"' ? 'string' : text[0] === "'" ? 'char' : /\d/.test(text[0]) ? 'number' : /[A-Za-z_$]/.test(text[0]) ? 'word' : 'punct';
      tokens.push({ text, kind });
    }
    // A word is a free name unless it is Java syntax, a known class, a member (after `.`) or a call.
    tokens.forEach((token, i) => {
      if (token.kind !== 'word') return;
      const member = tokens[i - 1]?.text === '.';
      const call = tokens[i + 1]?.text === '(';
      token.kind = RESERVED.has(token.text) || member || call ? 'fixed' : 'name';
    });
    return normalize(tokens);
  }

  // `x = x + 5` and `x += 5` are the same statement; so are `x++`, `++x`, `x += 1` and `x = x + 1`.
  function normalize(tokens) {
    const compound = [];
    for (let i = 0; i < tokens.length; i++) {
      const [a, b, c, d, e, f] = tokens.slice(i, i + 6);
      const single = e && (e.kind === 'name' || e.kind === 'number') && (!f || f.text === ';' || f.text === ')');
      if (a.kind === 'name' && b?.text === '=' && c?.text === a.text && /^[+\-*\/%]$/.test(d?.text ?? '') && single) {
        compound.push(a, { text: `${d.text}=`, kind: 'punct' }, e);
        i += 4;
      } else {
        compound.push(a);
      }
    }
    tokens = compound;

    const out = [];
    for (let i = 0; i < tokens.length; i++) {
      const [a, b, c, d] = tokens.slice(i, i + 4);
      const end = token => !token || token.text === ';' || token.text === ')';
      if ((a.text === '++' || a.text === '--') && b?.kind === 'name' && end(c) && !isOperand(out.at(-1))) {
        out.push(b, { text: a.text, kind: 'punct' });
        i += 1;
      } else if (a.kind === 'name' && (b?.text === '+=' || b?.text === '-=') && c?.text === '1' && end(d)) {
        out.push(a, { text: b.text === '+=' ? '++' : '--', kind: 'punct' });
        i += 2;
      } else {
        out.push(a);
      }
    }
    return out;
  }

  const isOperand = token => token && (token.kind === 'name' || token.kind === 'number' || token.text === ')' || token.text === ']');

  const distance = (a, b) => {
    const row = Array.from({ length: b.length + 1 }, (_, i) => i);
    for (let i = 1; i <= a.length; i++) {
      let prev = row[0];
      row[0] = i;
      for (let j = 1; j <= b.length; j++) {
        const temp = row[j];
        row[j] = Math.min(row[j] + 1, row[j - 1] + 1, prev + (a[i - 1] === b[j - 1] ? 0 : 1));
        prev = temp;
      }
    }
    return row[b.length];
  };

  const CLOSERS = new Set([')', ']', '}']);

  function diagnose(expected, given, index) {
    const want = expected[index];
    const got = given[index];
    const prev = given[index - 1]?.text ?? '';

    if (got?.kind === 'string' && !/.+"$/.test(got.text.slice(1))) return { key: 'unclosedString' };
    if (got?.kind === 'char' && !/.+'$/.test(got.text.slice(1))) return { key: 'unclosedString' };
    if (!want) return { key: 'extra', vars: { got: got.text } };
    if (!got) {
      if (want.text === ';') return { key: 'semicolon', vars: { prev } };
      if (CLOSERS.has(want.text)) return { key: 'close', vars: { want: want.text } };
      return prev ? { key: 'missingAfter', vars: { prev } } : { key: 'empty' };
    }
    if (want.text === ';') return { key: 'semicolon', vars: { prev } };
    if (want.kind === 'fixed' || got.kind === 'fixed') {
      if (want.text.toLowerCase() === got.text.toLowerCase()) return { key: 'case', vars: { want: want.text, got: got.text } };
      if (/^[A-Za-z]/.test(got.text) && distance(want.text, got.text) <= 2) return { key: 'typo', vars: { want: want.text, got: got.text } };
    }
    if (want.kind === 'punct' && given.slice(index).some(token => token.text === want.text)) {
      return { key: 'extra', vars: { got: got.text } };
    }
    return prev ? { key: 'near', vars: { got: got.text, prev } } : { key: 'start', vars: { got: got.text } };
  }

  return (answer, reference) => {
    const expected = lex(reference);
    const given = lex(answer);

    // The reference is only a comment, so any comment is a valid answer.
    if (!expected.length) {
      const comment = /^\s*(\/\/\s*\S|\/\*[\s\S]*\S[\s\S]*\*\/\s*$)/.test(answer);
      return comment ? { ok: true, exact: answer.trim() === reference.trim() } : { ok: false, issue: { key: 'comment' } };
    }
    if (!given.length) return { ok: false, issue: { key: 'empty' } };

    // A trailing `;` after an expression snippet such as `a && b` is harmless.
    if (expected.at(-1)?.text !== ';' && given.at(-1)?.text === ';' && given.length === expected.length + 1) given.pop();

    const names = new Map();
    const used = new Map();
    let renamed = false;
    let changedValues = false;

    for (let i = 0; i < Math.max(expected.length, given.length); i++) {
      const want = expected[i];
      const got = given[i];
      let match = Boolean(want && got);

      if (match && want.kind === 'name') {
        const mapped = names.get(want.text);
        match = got.kind === 'name' && (mapped ? mapped === got.text : !used.has(got.text));
        if (match && !mapped) {
          names.set(want.text, got.text);
          used.set(got.text, want.text);
          renamed ||= want.text !== got.text;
        }
      } else if (match && (want.kind === 'number' || want.kind === 'string' || want.kind === 'char')) {
        match = got.kind === want.kind && (want.kind === 'number' || /.+["']$/.test(got.text.slice(1)));
        changedValues ||= match && want.text !== got.text;
      } else if (match) {
        match = want.text === got.text;
      }

      if (!match) return { ok: false, issue: diagnose(expected, given, i) };
    }

    return { ok: true, exact: !renamed && !changedValues };
  };
})();
