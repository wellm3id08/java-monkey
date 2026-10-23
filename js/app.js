(() => {
  const { esc, inline, store } = JM;
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const app = $('#app');
  const layer = $('#layer');
  const bar = $('#bar');
  const fx = $('#fx');
  const bg = $('.bg');

  const DAY = 24 * 60 * 60 * 1000;
  const INTERVALS = [0, 1, 2, 4, 7, 15, 30]; // Days until the next review, per box.
  const REVIEW_SIZE = 12;
  const MAX_TYPED_LINES = 10;
  const ACCENTS = { blue: '#2f6bff', violet: '#7046f5', red: '#e5394a', green: '#0f9b74', orange: '#e5700b', mono: '' };
  const motion = !matchMedia('(prefers-reduced-motion: reduce)').matches;
  const darkQuery = matchMedia('(prefers-color-scheme: dark)');

  const state = {
    lang: store.get('jm.lang') || (navigator.language?.startsWith('es') ? 'es' : 'en'),
    theme: store.get('jm.theme') || 'system',
    accent: ACCENTS[store.get('jm.accent')] !== undefined ? store.get('jm.accent') : 'blue',
    done: new Set(store.getJSON('jm.done', [])),
  };
  let player = null;

  const content = () => JM.content[state.lang];
  const lessons = () => content().lessons;
  const findLesson = id => lessons().find(lesson => lesson.id === id);
  const lessonNumber = lesson => lessons().indexOf(lesson) + 1;
  const t = (key, vars = {}) => {
    const value = key.split('.').reduce((node, part) => node?.[part], JM.ui[state.lang]);
    return typeof value === 'string' ? value.replace(/\{(\w+)\}/g, (_, name) => vars[name] ?? '') : key;
  };
  const pad = number => String(number).padStart(2, '0');
  const setBar = value => (bar.style.width = `${Math.min(1, Math.max(0, value)) * 100}%`);
  const position = () => store.getJSON('jm.pos', null);
  const draftKey = lesson => `jm.draft.${state.lang}.${lesson.id}`;
  const planKey = lesson => `jm.plan.${state.lang}.${lesson.id}`;
  const typeable = item => item.code.split('\n').length <= MAX_TYPED_LINES;

  const svg = (path, size = 20) =>
    `<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${path}</svg>`;
  const icons = {
    back: svg('<path d="M15 6l-6 6 6 6"/>'),
    chevron: svg('<path d="M9 6l6 6-6 6"/>', 18),
    close: svg('<path d="M6 6l12 12M18 6L6 18"/>'),
    settings: svg('<path d="M4 7h9M19 7h1M4 17h3M13 17h7"/><circle cx="16" cy="7" r="2.5"/><circle cx="10" cy="17" r="2.5"/>'),
    check: size => svg('<path d="M5 12.5l4.5 4.5L19 7.5"/>', size),
  };

  const codeView = (code, cls = '') =>
    `<pre class="code ${cls}">${JM.highlightLines(code)
      .map((line, i) => `<span class="ln" style="--i:${i}">${line || ' '}</span>`)
      .join('')}</pre>`;

  const editorHtml = ({ line = false, label = '' } = {}) => `
    <div class="ed${line ? ' line' : ''}">
      ${line ? '' : '<pre class="gutter" aria-hidden="true"></pre>'}
      <div class="pane">
        <pre class="hl" aria-hidden="true"><code></code></pre>
        <textarea class="inp" aria-label="${esc(label)}" spellcheck="false" autocapitalize="off" autocomplete="off" autocorrect="off" wrap="off" rows="1"></textarea>
      </div>
    </div>`;

  function nav(hash) {
    if (location.hash === hash) route();
    else location.hash = hash;
  }

  // Appearance ---------------------------------------------------------------

  function applyAppearance(animate) {
    const root = document.documentElement;
    if (animate) {
      root.classList.add('theming');
      setTimeout(() => root.classList.remove('theming'), 600);
    }
    const dark = state.theme === 'dark' || (state.theme === 'system' && darkQuery.matches);
    root.dataset.theme = dark ? 'dark' : 'light';
    root.dataset.accent = state.accent;
    root.lang = state.lang;
    $('meta[name="theme-color"]').content = getComputedStyle(root).getPropertyValue('--bg').trim();
  }

  darkQuery.addEventListener('change', () => state.theme === 'system' && applyAppearance(true));

  // Effects ------------------------------------------------------------------

  // Wraps every word in a span so headings can fade in word by word.
  function animateWords(root) {
    if (!motion) return;
    let index = 0;
    for (const element of $$('[data-words]', root)) {
      const nodes = [...element.childNodes];
      for (const node of nodes) {
        if (node.nodeType === Node.TEXT_NODE) {
          const fragment = document.createDocumentFragment();
          for (const part of node.textContent.split(/(\s+)/)) {
            if (!part) continue;
            if (/^\s+$/.test(part)) {
              fragment.append(part);
            } else {
              const word = document.createElement('span');
              word.className = 'w';
              word.style.setProperty('--i', index++);
              word.textContent = part;
              fragment.append(word);
            }
          }
          node.replaceWith(fragment);
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          node.classList.add('w');
          node.style.setProperty('--i', index++);
        }
      }
    }
  }

  function burst(x, y, { count = 30, spread = 240 } = {}) {
    if (!motion) return;
    const styles = getComputedStyle(document.documentElement);
    const colors = ['--accent', '--blob-1', '--blob-2'].map(name => styles.getPropertyValue(name).trim());
    const pieces = Array.from({ length: count }, (_, i) => {
      const piece = document.createElement('i');
      const angle = Math.random() * Math.PI * 2;
      const distance = spread * (0.35 + Math.random() * 0.65);
      if (Math.random() < 0.4) piece.className = 'sq';
      piece.style.cssText = [
        `left:${x}px`,
        `top:${y}px`,
        `--x:${Math.cos(angle) * distance}px`,
        `--y:${Math.sin(angle) * distance + spread * 0.3}px`,
        `--r:${Math.random() * 540 - 270}deg`,
        `--s:${4 + Math.random() * 7}px`,
        `--t:${700 + Math.random() * 700}ms`,
        `--c:${colors[i % colors.length]}`,
      ].join(';');
      return piece;
    });
    fx.append(...pieces);
    setTimeout(() => pieces.forEach(piece => piece.remove()), 1500);
  }

  const burstFrom = (element, options) => {
    const box = element.getBoundingClientRect();
    burst(box.left + box.width / 2, box.top + box.height / 2, options);
  };

  function flash() {
    bg.classList.add('flash');
    setTimeout(() => bg.classList.remove('flash'), 350);
  }

  // Progress, reviews and streak --------------------------------------------

  function markDone(id) {
    state.done.add(id);
    store.setJSON('jm.done', [...state.done]);
  }

  function resumeTarget() {
    const saved = position();
    const current = saved && !state.done.has(saved.id) && findLesson(saved.id);
    return current || lessons().find(lesson => !state.done.has(lesson.id)) || null;
  }

  function startLesson(id) {
    const saved = position();
    if (!(saved?.id === id && !state.done.has(id))) store.setJSON('jm.pos', { id, step: 0 });
    nav(`#/lesson/${id}`);
  }

  // Leitner boxes: a right answer moves a card up a box, a struggle sends it back.
  const cards = () => store.getJSON('jm.srs', {});

  function schedule(key, quality) {
    const all = cards();
    const box = quality === 'perfect' ? Math.min((all[key]?.box ?? 0) + 1, INTERVALS.length - 1) : quality === 'struggled' ? 1 : 0;
    all[key] = { box, due: Date.now() + INTERVALS[box] * DAY };
    store.setJSON('jm.srs', all);
  }

  function cardItem(key) {
    const [id, index] = key.split('#');
    const lesson = findLesson(id);
    const item = lesson?.recall[index];
    return item && typeable(item) ? { lesson, item, key } : null;
  }

  const dueCards = () =>
    Object.entries(cards())
      .filter(([, card]) => card.due <= Date.now())
      .sort((a, b) => a[1].due - b[1].due)
      .map(([key]) => cardItem(key))
      .filter(Boolean);

  const dayKey = date => date.toLocaleDateString('en-CA');

  function recordActivity() {
    const days = store.getJSON('jm.days', []);
    const today = dayKey(new Date());
    if (days.at(-1) === today) return;
    days.push(today);
    store.setJSON('jm.days', days.slice(-400));
  }

  function streak() {
    const days = new Set(store.getJSON('jm.days', []));
    const date = new Date();
    if (!days.has(dayKey(date))) date.setDate(date.getDate() - 1);
    let count = 0;
    while (days.has(dayKey(date))) {
      count++;
      date.setDate(date.getDate() - 1);
    }
    return count;
  }

  // Shared chrome ------------------------------------------------------------

  const topBar = (left, extra = '') => `
    <header class="top">
      <div class="group">${left}</div>
      <div class="group">
        ${extra}
        <button class="icon-btn" type="button" data-act="settings" aria-label="${esc(t('settings'))}" aria-expanded="false">${icons.settings}</button>
      </div>
    </header>`;

  const wordmark = () => `<button class="wordmark" type="button" data-act="home"><i></i>Java Monkey</button>`;

  // Home ---------------------------------------------------------------------

  function renderHome() {
    const all = lessons();
    const total = all.length;
    const done = all.filter(lesson => state.done.has(lesson.id)).length;
    const next = resumeTarget();
    const due = dueCards().length;
    const days = streak();
    const started = done > 0 || position();
    setBar(done / total);

    const primary = next
      ? `<button class="btn" type="button" data-act="resume">${t(started ? 'continue' : 'start')}</button>`
      : `<button class="btn" type="button" data-act="topics">${t('reviewLessons')}</button>`;

    app.innerHTML = `
      ${topBar(wordmark())}
      <main class="home">
        ${days >= 2 ? `<span class="badge rise"><i></i>${esc(t('streak', { n: days }))}</span>` : ''}
        <h1 data-words>${esc(t('title'))}</h1>
        <p class="sub" data-words>${esc(t('subtitle'))}</p>
        <div class="row rise" style="--delay:500ms">
          ${primary}
          ${due ? `<button class="btn ghost" type="button" data-act="review">${t('reviewCount', { n: Math.min(due, REVIEW_SIZE) })}</button>` : ''}
          ${next ? `<button class="btn ghost" type="button" data-act="topics">${t('chooseTopic')}</button>` : ''}
        </div>
        ${
          started
            ? `<div class="meta rise" style="--delay:700ms">
                ${next ? `<span>${esc(t('nextUp', { title: `${pad(lessonNumber(next))} · ${next.title}` }))}</span>` : ''}
                <span class="meter"><i style="--value:${(done / total) * 100}%"></i></span>
                <span>${t('count', { n: done, total })}</span>
              </div>`
            : ''
        }
      </main>`;
    animateWords(app);
  }

  // Topics -------------------------------------------------------------------

  function renderTopics() {
    const all = lessons();
    const current = resumeTarget();
    const due = dueCards().length;
    setBar(all.filter(lesson => state.done.has(lesson.id)).length / all.length);

    const sections = content().sections.map((section, s) => {
      const items = section.lessons.map(findLesson);
      const finished = items.filter(lesson => state.done.has(lesson.id)).length;
      const open = items.includes(current);
      const rows = items
        .map((lesson, i) => {
          const cls = state.done.has(lesson.id) ? 'done' : lesson === current ? 'current' : '';
          return `
            <div class="lrow ${cls}" style="--i:${i}">
              <button class="lstart" type="button" data-act="open" data-id="${lesson.id}">
                <span class="n">${pad(lessonNumber(lesson))}</span>
                <span class="lt">${esc(lesson.title)}</span>
                <span class="state">${icons.check(12)}</span>
              </button>
              <button class="link" type="button" data-act="notes" data-id="${lesson.id}">${t('notes')}</button>
            </div>`;
        })
        .join('');
      const dots = items.map(lesson => `<i class="${state.done.has(lesson.id) ? 'on' : ''}"></i>`).join('');
      return `
        <section class="topic rise${open ? ' open' : ''}" style="--delay:${s * 60 + 100}ms">
          <button class="topic-head" type="button" data-act="toggle" aria-expanded="${open}">
            <span class="name">${esc(section.title)}</span>
            <span class="dots">${dots}</span>
            <span class="ratio">${finished}/${items.length}</span>
            <span class="chev">${icons.chevron}</span>
          </button>
          <div class="topic-body"><div>${rows}</div></div>
        </section>`;
    });

    app.innerHTML = `
      ${topBar(`<button class="icon-btn" type="button" data-act="home" aria-label="${esc(t('home'))}">${icons.back}</button>`)}
      <main class="topics">
        <div class="topics-head">
          <h2 data-words>${esc(t('topics'))}</h2>
          ${due ? `<button class="btn ghost rise" type="button" data-act="review">${t('reviewCount', { n: Math.min(due, REVIEW_SIZE) })}</button>` : ''}
        </div>
        ${sections.join('')}
      </main>`;
    animateWords(app);
  }

  // Player -------------------------------------------------------------------

  function lessonSteps(lesson) {
    const steps = [];
    const all = lessons();
    const previous = all[all.indexOf(lesson) - 1];

    // Warm-up: recall the weakest snippet of the previous lesson before starting.
    if (previous && state.done.has(previous.id)) {
      const known = cards();
      const options = previous.recall
        .map((item, index) => ({ item, key: `${previous.id}#${index}` }))
        .filter(({ item }) => typeable(item))
        .sort((a, b) => (known[a.key]?.box ?? 0) - (known[b.key]?.box ?? 0));
      if (options.length) steps.push({ kind: 'type', lesson: previous, ...options[0], warmup: true });
    }

    steps.push({ kind: 'intro', lesson });
    lesson.theory.forEach(item => steps.push({ kind: 'read', lesson, item }));
    if (lesson.theoryTable) steps.push({ kind: 'table', lesson });
    steps.push({ kind: 'example', lesson }, { kind: 'explain', lesson });
    lesson.recall.forEach((item, index) => {
      steps.push({ kind: 'study', lesson, item });
      if (typeable(item)) steps.push({ kind: 'type', lesson, item, key: `${lesson.id}#${index}` });
    });
    steps.push({ kind: 'practice', lesson }, { kind: 'done', lesson });
    return steps;
  }

  function reviewSteps() {
    const steps = dueCards()
      .slice(0, REVIEW_SIZE)
      .map(card => ({ kind: 'type', review: true, ...card }));
    return [...steps, { kind: 'reviewDone' }];
  }

  function renderPlayer({ mode, lesson, steps, index }) {
    player = {
      mode,
      lesson,
      steps,
      index: Math.min(Math.max(index, 0), steps.length - 1),
      stats: { typed: 0, perfect: 0 },
    };
    const exit = mode === 'lesson' ? 'topics' : 'home';
    const notes = lesson
      ? `<button class="link" type="button" data-act="notes" data-id="${lesson.id}" data-live="1">${t('notes')}</button>`
      : '';
    app.innerHTML = `
      ${topBar(`<button class="icon-btn" type="button" data-act="${exit}" aria-label="${esc(t('close'))}">${icons.close}</button>`, notes)}
      <main class="stage" id="stage"></main>
      <footer class="dock" id="dock"></footer>`;
    renderStep(1);
  }

  function renderDock({ primary, extra, secondary, wide, flow }) {
    const dock = $('#dock');
    dock.classList.toggle('wide', Boolean(wide));
    dock.classList.toggle('flow', Boolean(flow));
    dock.innerHTML = `
      <div class="dock-inner rise">
        ${player.index > 0 ? `<button class="icon-btn" type="button" data-act="prev" aria-label="${esc(t('back'))}">${icons.back}</button>` : ''}
        <span class="spacer"></span>
        ${extra ? `<button class="link" type="button" data-act="${extra.act}" id="extra">${extra.label}</button>` : ''}
        ${secondary ? `<button class="btn ghost" type="button" data-act="${secondary.act}">${secondary.label}</button>` : ''}
        <button class="btn" type="button" data-act="${primary.act}" id="primary">${primary.label}</button>
      </div>`;
  }

  function setPrimary(act, label) {
    const primary = $('#primary');
    primary.dataset.act = act;
    primary.textContent = label;
    primary.classList.remove('swap');
    void primary.offsetWidth;
    primary.classList.add('swap');
  }

  function renderStep(direction) {
    const step = player.steps[player.index];
    Object.assign(player, { solved: false, attempts: 0, revealed: false, hints: 0, editor: null, busy: true });
    setBar(player.index / (player.steps.length - 1));
    if (player.mode === 'lesson') store.setJSON('jm.pos', { id: player.lesson.id, step: player.index });
    if (step.kind === 'done') markDone(step.lesson.id);

    const view = views[step.kind](step);
    const stage = $('#stage');
    const old = $('.step', stage);

    const show = () => {
      stage.innerHTML = `<div class="step ${view.cls ?? ''}" style="--dir:${direction}">${view.html}</div>`;
      renderDock({ primary: { act: 'next', label: t('next') }, wide: view.cls?.includes('wide'), ...view.dock });
      animateWords(stage);
      view.setup?.(stage);
      window.scrollTo(0, 0);
      player.busy = false;
    };

    if (old && motion) {
      old.style.setProperty('--dir', direction);
      old.classList.add('out');
      setTimeout(show, 200);
    } else {
      show();
    }
  }

  function advance(direction) {
    if (!player || player.busy) return;
    const step = player.steps[player.index];
    if (direction > 0 && step.kind === 'type' && !player.solved) {
      if (step.key) schedule(step.key, 'revealed');
      player.stats.typed++;
    }
    const index = player.index + direction;
    if (index < 0 || index >= player.steps.length) return;
    if (direction > 0) recordActivity();
    player.index = index;
    renderStep(direction);
  }

  // Steps --------------------------------------------------------------------

  const views = {
    intro: ({ lesson }) => ({
      cls: 'center',
      html: `
        <p class="eyebrow rise">${t('lessonOf', { i: lessonNumber(lesson), n: lessons().length })} · ${esc(lesson.time)}</p>
        <h2 class="big" data-words>${esc(lesson.title)}</h2>
        <p class="lead" data-words>${inline(lesson.idea)}</p>`,
    }),

    read: ({ item }) => ({
      html: `
        <p class="eyebrow rise">${inline(item.title)}</p>
        <p class="lead" data-words>${inline(item.text)}</p>`,
    }),

    table: ({ lesson }) => ({
      html: `
        <p class="lead" data-words>${inline(lesson.theoryNote ?? '')}</p>
        <div class="table-wrap">${tableHtml(lesson.theoryTable)}</div>`,
    }),

    example: ({ lesson }) => ({
      cls: 'wide',
      html: `
        <p class="eyebrow rise">${t('example')} · ${inline(lesson.exampleTitle)}</p>
        <p class="lead" data-words>${inline(lesson.exampleLead)}</p>
        ${codeView(lesson.example)}`,
    }),

    explain: ({ lesson }) => ({
      html: `
        <p class="eyebrow rise">${t('look')}</p>
        <ul class="lines">${lesson.explain.map((line, i) => `<li style="--i:${i}">${inline(line)}</li>`).join('')}</ul>`,
    }),

    study: ({ item }) => ({
      cls: 'wide',
      html: `
        <p class="eyebrow rise">${t('remember')}</p>
        <h2 class="big sm" data-words>${esc(item.do)}</h2>
        ${codeView(item.code)}`,
    }),

    type: step => ({
      cls: 'wide',
      html: `
        <p class="eyebrow rise">${esc(step.warmup ? t('warmup', { title: step.lesson.title }) : step.review ? step.lesson.title : t('fromMemory'))}</p>
        <h2 class="big sm" data-words>${esc(step.item.do)}</h2>
        ${editorHtml({ line: true, label: step.item.do })}
        <div class="msg" id="msg" aria-live="polite"></div>
        <div id="answer"></div>`,
      dock: { primary: { act: 'check', label: t('check') }, extra: { act: 'reveal', label: t('showAnswer') } },
      setup(stage) {
        const root = $('.ed', stage);
        const multiline = step.item.code.includes('\n');
        player.editor = JM.editor(root, {
          value: '',
          onChange: value => {
            if (player.solved) return;
            root.classList.remove('err');
            const result = JM.grade(value, step.item.code);
            if (result.ok) solve(result);
          },
        });
        root.addEventListener(
          'keydown',
          event => {
            if (event.key !== 'Enter' || event.isComposing) return;
            if (!multiline || event.ctrlKey || event.metaKey) {
              event.preventDefault();
              event.stopPropagation();
              if (player.solved) advance(1);
              else check();
            }
          },
          true
        );
        player.editor.input.focus({ preventScroll: true });
      },
    }),

    practice: ({ lesson }) => ({
      cls: 'wide',
      html: `
        <p class="eyebrow rise">${t('yourTurn')}</p>
        <h2 class="big sm" data-words>${inline(lesson.task)}</h2>
        <p class="muted rise" style="--delay:300ms">${inline(lesson.think)}</p>
        <div class="file rise" style="--delay:450ms">
          <span>${esc(lesson.filename)}</span>
          <span class="tools">
            <button class="link" type="button" data-act="reset">${t('reset')}</button>
            <button class="link" type="button" data-act="download">${t('download')}</button>
          </span>
        </div>
        <div class="rise" style="--delay:550ms">${editorHtml({ label: lesson.filename })}</div>
        <div class="aids rise" style="--delay:650ms">
          ${['plan', 'hint', 'output', 'solution'].map(name => `<button class="chip" type="button" data-act="aid" data-aid="${name}">${t(name)}</button>`).join('')}
        </div>
        <div class="panel" id="panel" hidden></div>`,
      dock: { primary: { act: 'next', label: t('markDone') }, flow: true },
      setup(stage) {
        player.editor = JM.editor($('.ed', stage), {
          value: store.get(draftKey(lesson)) ?? lesson.starter,
          onChange: value => {
            if (value === lesson.starter) store.remove(draftKey(lesson));
            else store.set(draftKey(lesson), value);
          },
        });
      },
    }),

    done: ({ lesson }) => {
      const all = lessons();
      const next = all[all.indexOf(lesson) + 1];
      return {
        cls: 'center',
        html: `
          <div class="medal">${icons.check(40)}</div>
          <h2 class="big" data-words>${t('complete')}</h2>
          <p class="lead" data-words>${esc(next ? t('upNext', { title: next.title }) : t('finished'))}</p>
          ${statLine()}`,
        dock: next
          ? { primary: { act: 'nextLesson', label: t('nextLesson') }, secondary: { act: 'topics', label: t('allTopics') } }
          : { primary: { act: 'topics', label: t('allTopics') } },
        setup: celebrate,
      };
    },

    reviewDone: () => ({
      cls: 'center',
      html: player.stats.typed
        ? `<div class="medal">${icons.check(40)}</div>
           <h2 class="big" data-words>${t('reviewDone')}</h2>
           ${statLine()}`
        : `<h2 class="big sm" data-words>${t('reviewEmpty')}</h2>`,
      dock: { primary: { act: 'home', label: t('home') } },
      setup: player.stats.typed ? celebrate : null,
    }),
  };

  const statLine = () =>
    player.stats.typed
      ? `<p class="stat rise" style="--delay:700ms">${t('firstTry', { n: player.stats.perfect, total: player.stats.typed })}</p>`
      : '';

  function celebrate(stage) {
    recordActivity();
    setTimeout(() => {
      const medal = $('.medal', stage);
      if (medal) burstFrom(medal, { count: 46, spread: 320 });
      flash();
    }, 350);
  }

  function tableHtml({ headers, rows }) {
    const cells = (tag, values) => values.map(value => `<${tag}>${esc(value)}</${tag}>`).join('');
    return `<table><thead><tr>${cells('th', headers)}</tr></thead><tbody>${rows
      .map((row, i) => `<tr style="--i:${i}">${cells('td', row)}</tr>`)
      .join('')}</tbody></table>`;
  }

  // Answer checking ----------------------------------------------------------

  function solve(result) {
    const step = player.steps[player.index];
    player.solved = true;
    const quality = player.revealed ? 'revealed' : player.attempts ? 'struggled' : 'perfect';
    if (step.key) schedule(step.key, quality);
    player.stats.typed++;
    if (quality === 'perfect') player.stats.perfect++;

    const root = $('.ed');
    root.classList.remove('err');
    root.classList.add('ok');
    root.querySelector('.inp').readOnly = true;
    root.insertAdjacentHTML('beforeend', `<span class="tick">${icons.check(18)}</span>`);

    const loose = !result.exact && !player.revealed;
    $('#msg').innerHTML = `
      <p class="ok">${t(result.exact ? 'perfect' : 'correct')}</p>
      ${loose ? `<p class="note">${t('looseNote')}</p>${codeView(step.item.code, 'static')}` : ''}`;

    $('#extra')?.remove();
    setPrimary('next', t('next'));
    $('#primary').focus({ preventScroll: true });
    burstFrom($('.tick', root), { count: 16, spread: 110 });
    flash();
  }

  function check() {
    if (player.solved) return advance(1);
    const step = player.steps[player.index];
    const result = JM.grade(player.editor.value(), step.item.code);
    if (result.ok) return solve(result);

    player.attempts++;
    const { key, vars } = result.issue;
    $('#msg').innerHTML = `<p class="err">${inline(t(`issues.${key}`, vars))}</p>`;
    const root = $('.ed');
    root.classList.remove('shake');
    void root.offsetWidth;
    root.classList.add('shake', 'err');
    player.editor.input.focus({ preventScroll: true });
  }

  function reveal() {
    const step = player.steps[player.index];
    player.revealed = true;
    $('#answer').innerHTML = codeView(step.item.code);
    $('#extra')?.remove();
    setPrimary('next', t('next'));
    player.editor.input.focus({ preventScroll: true });
  }

  // Practice aids ------------------------------------------------------------

  function showAid(name) {
    const { lesson } = player.steps[player.index];
    const panel = $('#panel');
    const chip = $(`[data-aid="${name}"]`);
    const open = !chip.classList.contains('on');
    $$('.chip').forEach(button => button.classList.remove('on'));
    panel.hidden = !open;
    if (!open) return;
    chip.classList.add('on');
    panel.style.animation = 'none';
    void panel.offsetWidth;
    panel.style.animation = '';

    if (name === 'plan') {
      const checked = new Set(store.getJSON(planKey(lesson), []));
      panel.innerHTML = `<ul class="plan">${lesson.steps
        .map((text, i) => `<li style="--i:${i}"><label><input type="checkbox" data-plan="${i}"${checked.has(i) ? ' checked' : ''}><span>${inline(text)}</span></label></li>`)
        .join('')}</ul>`;
    } else if (name === 'hint') {
      player.hints = 1;
      renderHints();
    } else if (name === 'output') {
      const file = lesson.filename;
      panel.innerHTML = `
        ${codeView(lesson.output)}
        <p class="muted" style="margin-top:14px">${inline(lesson.outputNote)}</p>
        <p class="muted">${inline(t('run', { file, cls: file.replace(/\.java$/, '') }))}</p>`;
    } else {
      panel.innerHTML = codeView(lesson.solution);
    }
  }

  function renderHints() {
    const { lesson } = player.steps[player.index];
    $('#panel').innerHTML =
      lesson.hints.slice(0, player.hints).map(text => `<p class="rise">${inline(text)}</p>`).join('') +
      (player.hints < lesson.hints.length ? `<button class="link" type="button" data-act="morehint">${t('anotherHint')}</button>` : '');
  }

  function download(code, fallback) {
    const name = `${code.match(/public\s+class\s+(\w+)/)?.[1] ?? fallback.replace(/\.java$/, '')}.java`;
    const url = URL.createObjectURL(new Blob([`${code}\n`], { type: 'text/x-java-source' }));
    const link = Object.assign(document.createElement('a'), { href: url, download: name });
    document.body.append(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  // Layers: settings and notes ----------------------------------------------

  function closeLayer() {
    layer.innerHTML = '';
    $$('[data-act="settings"]').forEach(button => button.setAttribute('aria-expanded', 'false'));
  }

  const segment = (act, options, current) => {
    const at = Math.max(0, options.findIndex(([value]) => value === current));
    return `
      <div class="seg" role="group" style="--n:${options.length};--at:${at}">
        ${options.map(([value, label]) => `<button type="button" data-act="${act}" data-value="${value}" aria-pressed="${value === current}">${label}</button>`).join('')}
      </div>`;
  };

  const settingsHtml = () => `
    <p class="pop-label">${t('theme')}</p>
    ${segment('theme', [['system', t('system')], ['light', t('light')], ['dark', t('dark')]], state.theme)}
    <p class="pop-label">${t('color')}</p>
    <div class="swatches">
      ${Object.entries(ACCENTS)
        .map(([name, color]) => `<button class="swatch ${name}" type="button" style="--c:${color}" data-act="accent" data-value="${name}" aria-pressed="${name === state.accent}" aria-label="${esc(t(`accents.${name}`))}" title="${esc(t(`accents.${name}`))}"></button>`)
        .join('')}
    </div>
    <p class="pop-label">${t('language')}</p>
    ${segment('lang', [['en', 'English'], ['es', 'Español']], state.lang)}
    <button class="link danger" type="button" data-act="resetProgress">${t('resetProgress')}</button>`;

  function openSettings(button) {
    if ($('.pop', layer)) return closeLayer();
    layer.innerHTML = `<div class="pop" role="dialog" aria-label="${esc(t('settings'))}">${settingsHtml()}</div>`;
    button.setAttribute('aria-expanded', 'true');
  }

  function updateSegment(act, value) {
    const buttons = $$(`.pop [data-act="${act}"]`);
    buttons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.value === value)));
    const segmentElement = buttons[0]?.closest('.seg');
    segmentElement?.style.setProperty('--at', buttons.findIndex(button => button.dataset.value === value));
  }

  function openNotes(id, { live }) {
    const lesson = findLesson(id);
    const recall = lesson.recall.map(item => `<p>${esc(item.do)}</p>${codeView(item.code, 'static')}`).join('');
    layer.innerHTML = `
      <div class="sheet" data-act="close-sheet">
        <div class="sheet-card" role="dialog" aria-modal="true" aria-label="${esc(lesson.title)}">
          <h3>${esc(lesson.title)}</h3>
          <p class="muted">${inline(lesson.idea)}</p>
          <h4>${t('keyPoints')}</h4>
          <ul>${lesson.theory.map(item => `<li><strong>${inline(item.title)}.</strong> ${inline(item.text)}</li>`).join('')}</ul>
          <h4>${t('example')}</h4>
          ${codeView(lesson.example, 'static')}
          <h4>${t('cheatTitle')}</h4>
          ${recall}
          <h4>${t('practice')}</h4>
          <p>${inline(lesson.task)}</p>
          ${codeView(lesson.solution, 'static')}
          <div class="row">
            ${live ? '' : `<button class="btn" type="button" data-act="start-from-sheet" data-id="${id}">${t('startLesson')}</button>`}
            <button class="btn ghost" type="button" data-act="close-sheet">${t('close')}</button>
          </div>
        </div>
      </div>`;
    $('.btn', layer).focus({ preventScroll: true });
  }

  function resetProgress() {
    if (!confirm(t('resetConfirm'))) return;
    const keep = new Set(['jm.lang', 'jm.theme', 'jm.accent']);
    try {
      Object.keys(localStorage)
        .filter(key => key.startsWith('jm.') && !keep.has(key))
        .forEach(key => store.remove(key));
    } catch {}
    state.done = new Set();
    closeLayer();
    nav('#/');
  }

  // Events -------------------------------------------------------------------

  function act(name, target) {
    switch (name) {
      case 'settings':
        openSettings(target);
        break;
      case 'theme':
        state.theme = target.dataset.value;
        store.set('jm.theme', state.theme);
        updateSegment('theme', state.theme);
        applyAppearance(true);
        break;
      case 'accent':
        state.accent = target.dataset.value;
        store.set('jm.accent', state.accent);
        $$('.swatch').forEach(button => button.setAttribute('aria-pressed', String(button === target)));
        applyAppearance(true);
        flash();
        break;
      case 'lang':
        if (state.lang === target.dataset.value) break;
        state.lang = target.dataset.value;
        store.set('jm.lang', state.lang);
        applyAppearance(false);
        route();
        $('.pop', layer).innerHTML = settingsHtml();
        $('[data-act="settings"]').setAttribute('aria-expanded', 'true');
        break;
      case 'resetProgress':
        resetProgress();
        break;
      case 'resume': {
        const lesson = resumeTarget();
        if (lesson) startLesson(lesson.id);
        else nav('#/topics');
        break;
      }
      case 'home':
        nav('#/');
        break;
      case 'topics':
        nav('#/topics');
        break;
      case 'review':
        nav('#/review');
        break;
      case 'toggle': {
        const topic = target.closest('.topic');
        const open = topic.classList.toggle('open');
        target.setAttribute('aria-expanded', String(open));
        break;
      }
      case 'open':
        startLesson(target.dataset.id);
        break;
      case 'notes':
        openNotes(target.dataset.id, { live: target.dataset.live });
        break;
      case 'start-from-sheet':
        closeLayer();
        startLesson(target.dataset.id);
        break;
      case 'close-sheet':
        closeLayer();
        break;
      case 'next':
        advance(1);
        break;
      case 'prev':
        advance(-1);
        break;
      case 'nextLesson': {
        const all = lessons();
        const next = all[all.indexOf(player.steps[player.index].lesson) + 1];
        if (next) startLesson(next.id);
        break;
      }
      case 'check':
        check();
        break;
      case 'reveal':
        reveal();
        break;
      case 'aid':
        showAid(target.dataset.aid);
        break;
      case 'morehint':
        player.hints++;
        renderHints();
        break;
      case 'reset':
        player.editor.set(player.steps[player.index].lesson.starter);
        break;
      case 'download':
        download(player.editor.value(), player.steps[player.index].lesson.filename);
        break;
    }
  }

  document.addEventListener('click', event => {
    const target = event.target.closest('[data-act]');
    const pop = $('.pop', layer);
    if (pop && !pop.contains(event.target) && target?.dataset.act !== 'settings') closeLayer();
    if (!target) return;
    // Clicks inside the notes card should not close it.
    if (target.classList.contains('sheet') && event.target !== target) return;
    act(target.dataset.act, target);
  });

  document.addEventListener('change', event => {
    const box = event.target.closest('[data-plan]');
    if (!box || !player) return;
    const key = planKey(player.steps[player.index].lesson);
    const checked = new Set(store.getJSON(key, []));
    if (box.checked) checked.add(Number(box.dataset.plan));
    else checked.delete(Number(box.dataset.plan));
    store.setJSON(key, [...checked]);
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') return closeLayer();
    if (event.key !== 'Enter' || !player || layer.innerHTML) return;
    if (event.target.closest('textarea, button, a, input')) return;
    event.preventDefault();
    $('#primary')?.click();
  });

  // Router -------------------------------------------------------------------

  function route() {
    const [, view, id] = location.hash.split('/');
    player = null;
    window.scrollTo(0, 0);

    if (view === 'lesson' && findLesson(id)) {
      const lesson = findLesson(id);
      const saved = position();
      renderPlayer({ mode: 'lesson', lesson, steps: lessonSteps(lesson), index: saved?.id === id ? saved.step : 0 });
    } else if (view === 'review') {
      renderPlayer({ mode: 'review', steps: reviewSteps(), index: 0 });
    } else if (view === 'topics') {
      renderTopics();
    } else {
      renderHome();
    }
  }

  window.addEventListener('hashchange', () => {
    closeLayer();
    route();
  });

  // Cursor glow --------------------------------------------------------------

  const glow = $('#glow');
  if (matchMedia('(pointer: fine)').matches) {
    let x = innerWidth / 2;
    let y = innerHeight / 2;
    let targetX = x;
    let targetY = y;
    let running = false;

    const tick = () => {
      x += (targetX - x) * 0.08;
      y += (targetY - y) * 0.08;
      glow.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      running = Math.abs(targetX - x) > 0.3 || Math.abs(targetY - y) > 0.3;
      if (running) requestAnimationFrame(tick);
    };

    addEventListener('pointermove', event => {
      targetX = event.clientX;
      targetY = event.clientY;
      glow.classList.add('on');
      if (!running) {
        running = true;
        requestAnimationFrame(tick);
      }
    });
    document.documentElement.addEventListener('pointerleave', () => glow.classList.remove('on'));
  }

  applyAppearance(false);
  route();
})();
