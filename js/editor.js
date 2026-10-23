// Textarea with a syntax-highlighted layer behind it, auto-indent, tabs and auto-closing pairs.
JM.editor = (root, { value, onChange }) => {
  const input = root.querySelector('.inp');
  const code = root.querySelector('.hl code');
  const gutter = root.querySelector('.gutter');
  const pane = root.querySelector('.pane');

  const INDENT = '    ';
  const pairs = { '(': ')', '[': ']', '{': '}', '"': '"', "'": "'" };
  const closers = new Set(Object.values(pairs));
  let trapTab = true;

  function refresh() {
    code.innerHTML = `${JM.highlight(input.value)}\n`;
    if (gutter) {
      gutter.textContent = Array.from({ length: input.value.split('\n').length }, (_, i) => i + 1).join('\n');
    }
    input.style.height = 'auto';
    input.style.height = `${input.scrollHeight}px`;
  }

  function trackCaret() {
    const line = input.value.slice(0, input.selectionStart).split('\n').length - 1;
    pane.style.setProperty('--caret-line', line);
  }

  function insert(text) {
    if (document.execCommand('insertText', false, text)) return;
    input.setRangeText(text, input.selectionStart, input.selectionEnd, 'end');
    input.dispatchEvent(new Event('input', { bubbles: true }));
  }

  function moveCaret(position) {
    input.selectionStart = input.selectionEnd = position;
  }

  function handleEnter() {
    const start = input.selectionStart;
    const line = input.value.slice(0, start).split('\n').pop();
    const indent = line.match(/^ */)[0];
    const opens = /[{(\[]$/.test(line.trimEnd());
    const next = input.value[input.selectionEnd];

    if (opens && closers.has(next)) {
      insert(`\n${indent}${INDENT}\n${indent}`);
      moveCaret(start + 1 + indent.length + INDENT.length);
    } else {
      insert(`\n${indent}${opens ? INDENT : ''}`);
    }
  }

  function handleOutdent() {
    const start = input.selectionStart;
    const lineStart = input.value.lastIndexOf('\n', start - 1) + 1;
    const spaces = input.value.slice(lineStart).match(/^ */)[0].length;
    const remove = Math.min(spaces, INDENT.length);
    if (!remove) return;
    input.setSelectionRange(lineStart, lineStart + remove);
    insert('');
    moveCaret(Math.max(lineStart, start - remove));
  }

  function handleBackspace() {
    const { selectionStart: start, selectionEnd: end, value: text } = input;
    if (start !== end || !start || pairs[text[start - 1]] !== text[start]) return false;
    input.setSelectionRange(start - 1, start + 1);
    insert('');
    return true;
  }

  function handlePair(key) {
    const { selectionStart: start, selectionEnd: end, value: text } = input;
    if (start !== end) return false;

    if (closers.has(key) && text[start] === key) {
      moveCaret(start + 1);
      return true;
    }

    if (key === '}') {
      const line = text.slice(text.lastIndexOf('\n', start - 1) + 1, start);
      if (line.length >= INDENT.length && /^ +$/.test(line)) {
        input.setSelectionRange(start - INDENT.length, start);
        insert('}');
        return true;
      }
    }
    if (!pairs[key]) return false;

    const before = text[start - 1] ?? '';
    const after = text[start] ?? '';
    const quote = key === '"' || key === "'";
    if ((quote && /\w/.test(before)) || !/^(\s|[)\]}"']|)$/.test(after)) return false;

    insert(key + pairs[key]);
    moveCaret(start + 1);
    return true;
  }

  input.addEventListener('keydown', event => {
    if (event.defaultPrevented || event.isComposing || event.metaKey || (event.ctrlKey && !event.altKey)) return;

    if (event.key === 'Escape') {
      trapTab = false;
    } else if (event.key === 'Tab' && trapTab) {
      event.preventDefault();
      if (event.shiftKey) handleOutdent();
      else insert(INDENT);
    } else if (event.key === 'Enter') {
      event.preventDefault();
      handleEnter();
    } else if (event.key === 'Backspace') {
      if (handleBackspace()) event.preventDefault();
    } else if (event.key.length === 1 && handlePair(event.key)) {
      event.preventDefault();
    }
  });

  input.addEventListener('focus', () => {
    trapTab = true;
    trackCaret();
  });
  input.addEventListener('keyup', trackCaret);
  input.addEventListener('pointerup', trackCaret);
  input.addEventListener('input', () => {
    refresh();
    trackCaret();
    onChange(input.value);
  });
  input.addEventListener('scroll', () => {
    code.style.transform = `translateX(${-input.scrollLeft}px)`;
  });

  input.value = value;
  refresh();

  return {
    input,
    value: () => input.value,
    set(text) {
      input.value = text;
      refresh();
      onChange(text);
    },
  };
};
