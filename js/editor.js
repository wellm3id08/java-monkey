// Textarea with a syntax-highlighted layer behind it: auto-indent, tabs, auto-closing pairs,
// a soft animation for typed characters and Eclipse-style templates with linked placeholders.
JM.editor = (root, { value, onChange, templates = () => [], imports = false }) => {
  const input = root.querySelector('.inp');
  const code = root.querySelector('.hl code');
  const gutter = root.querySelector('.gutter');
  const pane = root.querySelector('.pane');

  const INDENT = '    ';
  const pairs = { '(': ')', '[': ']', '{': '}', '"': '"', "'": "'" };
  const closers = new Set(Object.values(pairs));
  let trapTab = true;
  let previous = value;
  let fresh = null; // Characters typed by the last keystroke, animated in the highlight layer.
  let session = null; // The template being filled in.
  let suggest = null; // The open suggestion list.
  let silent = false; // True while the editor changes the text itself.

  // Rendering ---------------------------------------------------------------

  function marks() {
    if (session) {
      const { ranges } = render(session);
      return ranges
        .filter(range => range.end > range.start)
        .map(range => ({
          start: session.start + range.start,
          end: session.start + range.end,
          cls: range.name === session.order[session.active] ? 'ph on' : 'ph',
        }));
    }
    return fresh ? [{ ...fresh, cls: 'fresh' }] : [];
  }

  function refresh() {
    code.innerHTML = `${JM.highlight(input.value, marks())}\n`;
    fresh = null;
    if (gutter) {
      gutter.textContent = Array.from({ length: input.value.split('\n').length }, (_, i) => i + 1).join('\n');
    }
    input.style.height = 'auto';
    input.style.height = `${input.scrollHeight}px`;
    trackCaret();
  }

  function trackCaret() {
    const line = input.value.slice(0, input.selectionStart).split('\n').length - 1;
    pane.style.setProperty('--caret-line', line);
  }

  function changed() {
    previous = input.value;
    refresh();
    onChange(input.value);
  }

  function insert(text) {
    silent = true;
    if (!document.execCommand('insertText', false, text)) {
      input.setRangeText(text, input.selectionStart, input.selectionEnd, 'end');
      input.dispatchEvent(new Event('input', { bubbles: true }));
    }
    silent = false;
  }

  function moveCaret(position) {
    input.selectionStart = input.selectionEnd = position;
  }

  // Typing helpers ----------------------------------------------------------

  function handleEnter() {
    const start = input.selectionStart;
    const line = input.value.slice(0, start).split('\n').pop();
    const indent = line.match(/^ */)[0];
    const opens = /[{(\[]$/.test(line.trimEnd());
    const next = input.value[input.selectionEnd];

    if (opens && closers.has(next)) {
      insert(`\n${indent}${INDENT}\n${indent}`);
      moveCaret(start + 1 + indent.length + INDENT.length);
      changed();
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
    if ((quote && /\w/.test(before)) || !/^(\s|[)\]};,]|)$/.test(after)) return false;

    insert(key + pairs[key]);
    moveCaret(start + 1);
    changed();
    return true;
  }

  // Templates ---------------------------------------------------------------

  function render({ segments, values }) {
    let text = '';
    let cursor = null;
    const ranges = [];
    const seen = new Set();
    for (const segment of segments) {
      if (segment.cursor) {
        cursor = text.length;
      } else if (segment.name !== undefined) {
        const valueText = values.get(segment.name);
        ranges.push({ name: segment.name, start: text.length, end: text.length + valueText.length, primary: !seen.has(segment.name) });
        seen.add(segment.name);
        text += valueText;
      } else {
        text += segment.text;
      }
    }
    return { text, ranges, cursor: cursor ?? text.length };
  }

  function wordBeforeCaret() {
    const { selectionStart: start, selectionEnd: end, value: text } = input;
    if (start !== end || /\w/.test(text[start] ?? '')) return null;
    const word = text.slice(0, start).match(/[A-Za-z_$][\w$]*$/)?.[0] ?? '';
    return { word, from: start - word.length, to: start };
  }

  function addImports(names) {
    if (!imports || !names.length) return 0;
    const missing = names.filter(name => !new RegExp(`^\\s*import\\s+${name.replace(/\./g, '\\.')}\\s*;`, 'm').test(input.value));
    if (!missing.length) return 0;
    const lines = missing.map(name => `import ${name};\n`).join('');
    const existing = [...input.value.matchAll(/^\s*import\s+[\w.*]+\s*;\n?/gm)].at(-1);
    const at = existing ? existing.index + existing[0].length : 0;
    const text = existing ? lines : `${lines}\n`;
    const caret = input.selectionStart;
    silent = true;
    input.setRangeText(text, at, at, 'preserve');
    silent = false;
    moveCaret(caret + text.length);
    return { at, length: text.length };
  }

  function expand(template, from, to) {
    closeSuggest();
    const compiled = JM.templates.compile(template.pattern);
    const lineStart = input.value.lastIndexOf('\n', from - 1) + 1;
    const indent = input.value.slice(lineStart).match(/^ */)[0];
    const segments = compiled.segments.map(segment =>
      segment.text === undefined ? segment : { text: segment.text.replace(/\n/g, `\n${indent}`) }
    );
    const next = {
      segments,
      values: new Map(compiled.order.map(name => [name, compiled.labels.get(name)])),
      order: compiled.order,
      active: 0,
      start: from,
    };
    const { text } = render(next);
    input.setSelectionRange(from, to);
    insert(text);

    const shift = addImports(compiled.imports);
    if (shift && shift.at <= next.start) next.start += shift.length;

    if (next.order.length) {
      session = next;
      session.after = input.value.length - session.start - text.length;
      selectPlaceholder();
    } else {
      moveCaret(next.start + render(next).cursor);
    }
    changed();
  }

  function selectPlaceholder() {
    const { ranges } = render(session);
    const range = ranges.find(item => item.primary && item.name === session.order[session.active]);
    input.setSelectionRange(session.start + range.start, session.start + range.end);
    refresh();
  }

  function leaveSession(toCursor) {
    if (!session) return;
    if (toCursor) moveCaret(session.start + render(session).cursor);
    session = null;
    refresh();
  }

  // Keeps every copy of a placeholder in step with the one being typed.
  function syncPlaceholders() {
    const old = render(session);
    const name = session.order[session.active];
    const primary = old.ranges.find(range => range.primary && range.name === name);
    const end = input.value.length - session.after;
    const snippet = input.value.slice(session.start, end);
    const prefix = old.text.slice(0, primary.start);
    const suffix = old.text.slice(primary.end);
    if (end < session.start || !snippet.startsWith(prefix) || !snippet.endsWith(suffix) || snippet.length < prefix.length + suffix.length) {
      session = null;
      return;
    }
    const valueText = snippet.slice(prefix.length, snippet.length - suffix.length);
    if (valueText.includes('\n')) {
      session = null;
      return;
    }
    const caret = input.selectionStart - session.start - primary.start;
    session.values.set(name, valueText);
    const next = render(session);
    silent = true;
    input.setRangeText(next.text, session.start, end, 'preserve');
    silent = false;
    moveCaret(session.start + primary.start + caret);
  }

  function checkSessionBounds() {
    if (!session) return;
    const end = input.value.length - session.after;
    if (input.selectionStart < session.start || input.selectionEnd > end) leaveSession(false);
  }

  // Suggestions -------------------------------------------------------------

  // The list lives on <body> with fixed coordinates, so no surrounding text or panel can overlap it.
  let box = null;

  function openSuggest(force) {
    const target = wordBeforeCaret();
    const list = templates();
    if (!target || !list.length || (!force && target.word.length < 2)) return closeSuggest();
    const query = target.word.toLowerCase();
    const items = list.filter(item => item.name.toLowerCase().startsWith(query)).slice(0, 8);
    if (!items.length) return closeSuggest();

    const keep = suggest?.items[suggest.index]?.name;
    const index = Math.max(0, items.findIndex(item => item.name === keep));
    suggest = { items, index, from: target.from, to: target.to };

    if (!box) {
      box = document.createElement('div');
      box.className = 'suggest';
      box.setAttribute('role', 'listbox');
      box.addEventListener('pointerdown', event => {
        event.preventDefault();
        const option = event.target.closest('[data-index]');
        if (option) accept(Number(option.dataset.index));
      });
      document.body.append(box);
    }
    box.innerHTML = items
      .map(
        (item, i) =>
          `<div class="opt${i === index ? ' on' : ''}" role="option" data-index="${i}" aria-selected="${i === index}"><b>${JM.esc(item.name)}</b><span>${JM.esc(item.description.replace(/^[A-ZÁÉÍÓÚÑ]+:\s*/, ''))}</span></div>`
      )
      .join('');
    placeSuggest();
  }

  function placeSuggest() {
    const before = input.value.slice(0, suggest.from);
    const line = before.split('\n').length - 1;
    const column = before.length - before.lastIndexOf('\n') - 1;
    const probe = document.createElement('span');
    probe.textContent = '0'.repeat(40);
    probe.style.cssText = 'position:absolute;visibility:hidden;white-space:pre;font:inherit';
    pane.append(probe);
    const charWidth = probe.getBoundingClientRect().width / 40;
    probe.remove();
    const lineHeight = parseFloat(getComputedStyle(input).lineHeight);
    const area = pane.getBoundingClientRect();
    const left = Math.min(area.left + Math.max(0, column * charWidth - input.scrollLeft), innerWidth - box.offsetWidth - 12);
    let top = area.top + (line + 1) * lineHeight + 6;
    if (top + box.offsetHeight > innerHeight - 12) top = area.top + line * lineHeight - box.offsetHeight - 6;
    box.style.left = `${Math.max(12, left)}px`;
    box.style.top = `${top}px`;
  }

  function closeSuggest() {
    suggest = null;
    box?.remove();
    box = null;
  }

  addEventListener('scroll', () => suggest && closeSuggest(), { passive: true });
  addEventListener('resize', () => suggest && closeSuggest());

  function moveSuggest(step) {
    suggest.index = (suggest.index + step + suggest.items.length) % suggest.items.length;
    box.querySelectorAll('.opt').forEach((option, i) => {
      option.classList.toggle('on', i === suggest.index);
      option.setAttribute('aria-selected', String(i === suggest.index));
    });
  }

  function accept(index = suggest.index) {
    const { items, from, to } = suggest;
    expand(items[index], from, to);
  }

  function exactTemplate() {
    const target = wordBeforeCaret();
    if (!target?.word) return null;
    const template = templates().find(item => item.name === target.word);
    return template ? { template, ...target } : null;
  }

  // Events ------------------------------------------------------------------

  input.addEventListener('keydown', event => {
    if (event.defaultPrevented || event.isComposing) return;

    if (event.ctrlKey && event.code === 'Space') {
      event.preventDefault();
      openSuggest(true);
      return;
    }
    if (event.metaKey || (event.ctrlKey && !event.altKey)) return;

    if (suggest) {
      const keys = { ArrowDown: () => moveSuggest(1), ArrowUp: () => moveSuggest(-1), Tab: () => accept(), Enter: () => accept(), Escape: closeSuggest };
      if (keys[event.key]) {
        event.preventDefault();
        event.stopPropagation();
        keys[event.key]();
        return;
      }
    }

    if (session && (event.key === 'Tab' || event.key === 'Enter' || event.key === 'Escape')) {
      event.preventDefault();
      event.stopPropagation();
      if (event.key === 'Escape') return leaveSession(false);
      if (event.key === 'Enter') return leaveSession(true);
      session.active += event.shiftKey ? -1 : 1;
      if (session.active < 0) session.active = 0;
      if (session.active >= session.order.length) return leaveSession(true);
      return selectPlaceholder();
    }

    if (event.key === 'Escape') {
      trapTab = false;
    } else if (event.key === 'Tab' && trapTab) {
      event.preventDefault();
      const match = !event.shiftKey && exactTemplate();
      if (match) expand(match.template, match.from, match.to);
      else if (event.shiftKey) handleOutdent();
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
  input.addEventListener('blur', () => setTimeout(closeSuggest, 120));
  input.addEventListener('keyup', event => {
    trackCaret();
    if (event.key.startsWith('Arrow') || event.key === 'Home' || event.key === 'End') {
      checkSessionBounds();
      if (!event.key.startsWith('ArrowU') && !event.key.startsWith('ArrowD')) closeSuggest();
    }
  });
  input.addEventListener('pointerup', () => {
    trackCaret();
    checkSessionBounds();
    closeSuggest();
  });

  input.addEventListener('input', () => {
    const now = input.value;
    if (session) {
      syncPlaceholders();
    } else if (!silent) {
      let start = 0;
      while (start < previous.length && start < now.length && previous[start] === now[start]) start++;
      let tail = 0;
      while (tail < previous.length - start && tail < now.length - start && previous[previous.length - 1 - tail] === now[now.length - 1 - tail]) tail++;
      const added = now.slice(start, now.length - tail);
      const removed = previous.length - start - tail;
      if (!removed && added.length && added.length <= 3 && !added.includes('\n')) fresh = { start, end: start + added.length };
    }
    changed();
    if (!silent && !session) openSuggest(false);
  });

  input.addEventListener('scroll', () => {
    code.style.transform = `translateX(${-input.scrollLeft}px)`;
  });

  input.value = value;
  refresh();

  return {
    input,
    value: () => input.value,
    busy: () => Boolean(session || suggest),
    set(text) {
      session = null;
      closeSuggest();
      input.value = text;
      changed();
    },
    insertTemplate(template) {
      input.focus({ preventScroll: true });
      leaveSession(false);
      const { selectionStart: start, selectionEnd: end } = input;
      expand(template, start, end);
    },
  };
};
