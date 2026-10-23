(() => {
  const { esc, inline, store } = JM;
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const app = $('#app');
  const layer = $('#layer');
  const side = $('#side');
  const drawer = $('#drawer');
  const bar = $('#bar');
  const fx = $('#fx');
  const bg = $('.bg');

  const DAY = 24 * 60 * 60 * 1000;
  const INTERVALS = [0, 1, 2, 4, 7, 15, 30]; // Days until the next review, per box.
  const REVIEW_SIZE = 12;
  const MAX_TYPED_LINES = 10;
  const ACCENTS = { blue: '#2f6bff', violet: '#7046f5', red: '#e5394a', green: '#0f9b74', orange: '#e5700b', mono: '' };
  const motion = !matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = matchMedia('(pointer: fine)').matches;
  const darkQuery = matchMedia('(prefers-color-scheme: dark)');

  const state = {
    lang: store.get('jm.lang') || (navigator.language?.startsWith('es') ? 'es' : 'en'),
    theme: store.get('jm.theme') || 'system',
    accent: ACCENTS[store.get('jm.accent')] !== undefined ? store.get('jm.accent') : 'blue',
    done: new Set(store.getJSON('jm.done', [])),
  };
  let player = null;
  let sideOpen = false;
  let notesFilter = 'open';
  let lastEditor = null;
  let returnFocus = null;

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
  const view = () => location.hash.split('/')[1] ?? '';
  const editable = element => element?.closest?.('textarea, input, select, [contenteditable="true"]');
  const activeTemplates = () => JM.templates.active(state.lang);

  const svg = (path, size = 20) =>
    `<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${path}</svg>`;
  const icons = {
    back: svg('<path d="M15 6l-6 6 6 6"/>'),
    chevron: svg('<path d="M9 6l6 6-6 6"/>', 18),
    close: svg('<path d="M6 6l12 12M18 6L6 18"/>'),
    settings: svg('<path d="M4 7h9M19 7h1M4 17h3M13 17h7"/><circle cx="16" cy="7" r="2.5"/><circle cx="10" cy="17" r="2.5"/>'),
    notes: svg('<path d="M6 3.5h8.5L19 8v12.5H6z"/><path d="M14 3.5V8h5M9.5 12.5h6M9.5 16h4"/>'),
    braces: svg('<path d="M8.5 4C6.5 4 6 5 6 7v2.5c0 1.2-.8 2.5-2 2.5 1.2 0 2 1.3 2 2.5V17c0 2 .5 3 2.5 3M15.5 4c2 0 2.5 1 2.5 3v2.5c0 1.2.8 2.5 2 2.5-1.2 0-2 1.3-2 2.5V17c0 2-.5 3-2.5 3"/>'),
    search: svg('<circle cx="11" cy="11" r="6"/><path d="M20 20l-4.6-4.6"/>', 17),
    trash: svg('<path d="M5 7h14M10 7V5h4v2M7 7l1 13h8l1-13"/>', 17),
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

  const switchHtml = (act, on, label) =>
    `<button class="switch" type="button" role="switch" data-act="${act}" aria-checked="${on}" aria-label="${esc(label)}"><i></i></button>`;

  const kbd = key => (finePointer ? `<kbd>${key}</kbd>` : '');

  function relativeTime(time) {
    const minutes = Math.round((Date.now() - time) / 60000);
    if (minutes < 1) return t('justNow');
    if (minutes < 60) return t('minutesAgo', { n: minutes });
    if (minutes < 60 * 24) return t('hoursAgo', { n: Math.round(minutes / 60) });
    return t('daysAgo', { n: Math.round(minutes / 60 / 24) });
  }

  function nav(hash) {
    if (location.hash === hash) route();
    else location.hash = hash;
  }

  // Appearance ---------------------------------------------------------------

  function applyAppearance() {
    const root = document.documentElement;
    const dark = state.theme === 'dark' || (state.theme === 'system' && darkQuery.matches);
    root.dataset.theme = dark ? 'dark' : 'light';
    root.dataset.accent = state.accent;
    root.lang = state.lang;
    requestAnimationFrame(() => {
      $('meta[name="theme-color"]').content = getComputedStyle(root).getPropertyValue('--bg').trim();
    });
  }

  // New colours spread as a circle from the control that changed them. Browsers without view transitions
  // fall back to the colour fade on :root.
  function changeAppearance(origin) {
    const root = document.documentElement;
    if (!document.startViewTransition || !motion) return applyAppearance();
    const box = origin?.getBoundingClientRect();
    const x = box ? box.left + box.width / 2 : innerWidth / 2;
    const y = box ? box.top + box.height / 2 : 0;
    root.style.setProperty('--vt-x', `${x}px`);
    root.style.setProperty('--vt-y', `${y}px`);
    root.style.setProperty('--vt-r', `${Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))}px`);
    root.classList.add('theme-vt', 'instant');
    const transition = document.startViewTransition(applyAppearance);
    transition.finished.finally(() => root.classList.remove('theme-vt', 'instant'));
  }

  darkQuery.addEventListener('change', () => state.theme === 'system' && changeAppearance());

  // Effects ------------------------------------------------------------------

  // Wraps every word in a span so text can fade in word by word.
  function animateWords(root) {
    if (!motion) return;
    let index = 0;
    for (const element of $$('[data-words]', root)) {
      for (const node of [...element.childNodes]) {
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

  // Types code out character by character, then swaps in the normal view.
  function typeOut(element, code, delay = 250) {
    if (!motion || !element) return;
    const total = code.length;
    const duration = Math.min(1600, Math.max(400, total * 16));
    element.classList.add('typing');
    let start = null;
    const frame = now => {
      if (!element.isConnected) return;
      start ??= now + delay;
      const progress = Math.min(1, Math.max(0, (now - start) / duration));
      const shown = Math.round(progress * total);
      element.innerHTML = `${JM.highlightLines(code.slice(0, shown))
        .map(line => `<span class="ln">${line || ' '}</span>`)
        .join('')}`;
      element.lastElementChild?.insertAdjacentHTML('beforeend', '<i class="type-caret"></i>');
      if (progress < 1) requestAnimationFrame(frame);
      else {
        element.classList.remove('typing');
        element.innerHTML = $('pre', document.createRange().createContextualFragment(codeView(code, 'static'))).innerHTML;
      }
    };
    requestAnimationFrame(frame);
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
    if (!element) return;
    const box = element.getBoundingClientRect();
    burst(box.left + box.width / 2, box.top + box.height / 2, options);
  };

  function flash() {
    bg.classList.add('flash');
    setTimeout(() => bg.classList.remove('flash'), 350);
  }

  let toastTimer = null;
  function toast(message) {
    let element = $('.toast');
    if (!element) {
      element = document.createElement('div');
      element.className = 'toast';
      element.setAttribute('role', 'status');
      document.body.append(element);
    }
    element.textContent = message;
    element.classList.remove('show');
    void element.offsetWidth;
    element.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => element.classList.remove('show'), 2600);
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
    all[key] = { box, due: Date.now() + INTERVALS[box] * DAY, at: Date.now() };
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

  function topBar(left, { notes = true, extra = '' } = {}) {
    const open = JM.notes.count();
    return `
      <header class="top">
        <div class="group">${left}</div>
        <div class="group">
          ${extra}
          ${notes ? `<button class="icon-btn" type="button" data-act="notesPage" aria-label="${esc(t('notesTitle'))}" title="${esc(t('notesTitle'))} (N)">${icons.notes}${open ? `<span class="count">${open}</span>` : ''}</button>` : ''}
          <button class="icon-btn" type="button" data-act="side" aria-label="${esc(t('templates'))}" title="${esc(t('templates'))} (K)" aria-pressed="${sideOpen}">${icons.braces}</button>
          <button class="icon-btn" type="button" data-act="settings" aria-label="${esc(t('settings'))}" title="${esc(t('settings'))} (,)" aria-expanded="false">${icons.settings}</button>
        </div>
      </header>`;
  }

  const wordmark = () => `<button class="wordmark" type="button" data-act="home"><i></i>Java Monkey</button>`;
  const backButton = (act = 'home') =>
    `<button class="icon-btn" type="button" data-act="${act}" aria-label="${esc(t('back'))}">${icons.back}</button>`;

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
      ? `<button class="btn" type="button" data-act="resume">${t(started ? 'continue' : 'start')}${kbd('↵')}</button>`
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
        ${finePointer ? `<button class="hint-key rise" style="--delay:900ms" type="button" data-act="shortcuts"><kbd>?</kbd> ${t('shortcuts')}</button>` : ''}
      </main>`;
    animateWords(app);
    $('[data-act="resume"], [data-act="topics"]', app)?.focus({ preventScroll: true });
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
              <button class="link" type="button" data-act="summary" data-id="${lesson.id}" tabindex="-1">${t('summary')}</button>
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
      ${topBar(backButton())}
      <main class="topics">
        <div class="topics-head">
          <h2 data-words>${esc(t('topics'))}</h2>
          ${due ? `<button class="btn ghost rise" type="button" data-act="review">${t('reviewCount', { n: Math.min(due, REVIEW_SIZE) })}</button>` : ''}
        </div>
        ${sections.join('')}
      </main>`;
    animateWords(app);
    ($('.lrow.current .lstart', app) ?? $('.topic-head', app))?.focus({ preventScroll: true });
  }

  // Notes page ---------------------------------------------------------------

  function noteHtml(note, { showLesson = true } = {}) {
    const lesson = note.lesson && findLesson(note.lesson);
    return `
      <article class="note${note.done ? ' resolved' : ''}" data-id="${note.id}">
        <p class="note-text" contenteditable="true" spellcheck="true" data-note="${note.id}">${esc(note.text)}</p>
        <div class="note-meta">
          <span>${showLesson ? `${esc(lesson ? lesson.title : t('general'))} · ` : ''}${relativeTime(note.created)}</span>
          <span class="note-actions">
            <a class="icon-btn sm" href="${JM.notes.searchUrl(note.text)}" target="_blank" rel="noopener" title="${esc(t('noteSearch'))}" aria-label="${esc(t('noteSearch'))}">${icons.search}</a>
            <button class="icon-btn sm${note.done ? ' on' : ''}" type="button" data-act="noteToggle" data-id="${note.id}" title="${esc(t(note.done ? 'noteReopen' : 'noteResolve'))}" aria-label="${esc(t(note.done ? 'noteReopen' : 'noteResolve'))}">${icons.check(17)}</button>
            <button class="icon-btn sm" type="button" data-act="noteDelete" data-id="${note.id}" title="${esc(t('noteDelete'))}" aria-label="${esc(t('noteDelete'))}">${icons.trash}</button>
          </span>
        </div>
      </article>`;
  }

  function filteredNotes() {
    const query = ($('[data-role="notes-search"]')?.value ?? '').trim().toLowerCase();
    return JM.notes
      .list()
      .filter(note => (notesFilter === 'all' ? true : notesFilter === 'done' ? note.done : !note.done))
      .filter(note => !query || note.text.toLowerCase().includes(query) || findLesson(note.lesson)?.title.toLowerCase().includes(query))
      .sort((a, b) => b.created - a.created);
  }

  function renderNotesList() {
    const list = $('#notes-list');
    if (!list) return;
    const notes = filteredNotes();
    list.innerHTML = notes.length
      ? notes.map((note, i) => noteHtml(note).replace('class="note', `style="--i:${i}" class="note`)).join('')
      : `<p class="empty">${JM.notes.list().length ? t('notesNone') : t('notesEmpty')}</p>`;
  }

  function renderNotesPage() {
    setBar(0);
    app.innerHTML = `
      ${topBar(backButton(), { notes: false })}
      <main class="notes-page">
        <h2 data-words>${t('notesTitle')}</h2>
        <div class="composer rise" style="--delay:150ms">
          <textarea class="note-input" data-role="note-new" rows="2" placeholder="${esc(t('notePlaceholder'))}"></textarea>
          <div class="composer-foot">
            <span class="muted small">${t('saveHint')}${finePointer ? ` · ${t('writeHint')}` : ''}</span>
            <button class="btn small" type="button" data-act="noteAdd">${t('saveNote')}</button>
          </div>
        </div>
        <div class="notes-tools rise" style="--delay:250ms">
          <input class="field" type="search" data-role="notes-search" placeholder="${esc(t('notesSearch'))}" aria-label="${esc(t('notesSearch'))}">
          ${segment('notesFilter', [['open', t('filterOpen')], ['done', t('filterDone')], ['all', t('filterAll')]], notesFilter)}
        </div>
        <div id="notes-list" class="notes-list"></div>
      </main>`;
    renderNotesList();
    animateWords(app);
  }

  function addNoteFrom(textarea, lessonId) {
    const note = JM.notes.add(textarea.value, lessonId);
    if (!note) return false;
    textarea.value = '';
    toast(t('savedNote'));
    refreshNoteViews();
    return true;
  }

  function refreshNoteViews() {
    renderNotesList();
    renderDrawerList();
    const count = JM.notes.count();
    $$('.icon-btn[data-act="notesPage"]').forEach(button => {
      $('.count', button)?.remove();
      if (count) button.insertAdjacentHTML('beforeend', `<span class="count">${count}</span>`);
    });
    const label = $('.drawer-handle .label');
    if (label) label.textContent = drawerLabel();
  }

  // Notes drawer (inside lessons) --------------------------------------------

  const drawerLabel = () => {
    const lesson = player?.lesson;
    const count = lesson ? JM.notes.list().filter(note => note.lesson === lesson.id).length : 0;
    return count ? `${t('notesTitle')} · ${count}` : t('notesTitle');
  };

  function renderDrawer() {
    if (!player?.lesson) {
      drawer.innerHTML = '';
      document.body.classList.remove('with-drawer');
      return;
    }
    document.body.classList.add('with-drawer');
    drawer.innerHTML = `
      <section class="drawer" aria-label="${esc(t('notesTitle'))}">
        <button class="drawer-handle" type="button" data-act="drawer" aria-expanded="false">
          <span class="label">${esc(drawerLabel())}</span>${kbd('Alt N')}<i class="grip"></i>
        </button>
        <div class="drawer-body">
          <textarea class="note-input" data-role="note-drawer" rows="3" placeholder="${esc(t('notePlaceholder'))}"></textarea>
          <div class="composer-foot">
            <span class="muted small">${t('saveHint')}</span>
            <button class="btn small" type="button" data-act="noteDrawerAdd">${t('saveNote')}</button>
          </div>
          <div class="drawer-list"></div>
          <button class="link" type="button" data-act="notesPage">${t('allNotes')}</button>
        </div>
      </section>`;
    renderDrawerList();
  }

  function renderDrawerList() {
    const list = $('.drawer-list');
    if (!list || !player?.lesson) return;
    const notes = JM.notes
      .list()
      .filter(note => note.lesson === player.lesson.id)
      .sort((a, b) => b.created - a.created);
    list.innerHTML = notes.map(note => noteHtml(note, { showLesson: false })).join('');
  }

  function toggleDrawer(open) {
    const element = $('.drawer');
    if (!element) return false;
    const next = open ?? !element.classList.contains('open');
    element.classList.toggle('open', next);
    $('.drawer-handle').setAttribute('aria-expanded', String(next));
    if (next) {
      returnFocus = document.activeElement;
      $('[data-role="note-drawer"]').focus({ preventScroll: true });
    } else if (element.contains(document.activeElement)) {
      (returnFocus?.isConnected ? returnFocus : $('#primary'))?.focus({ preventScroll: true });
    }
    return true;
  }

  // Template cheat sheet ------------------------------------------------------

  function renderSide() {
    document.body.classList.toggle('side-open', sideOpen);
    $$('[data-act="side"]').forEach(button => button.setAttribute('aria-pressed', String(sideOpen)));
    if (!sideOpen) {
      side.innerHTML = '';
      return;
    }
    const exists = $('.side', side);
    if (!exists) {
      side.innerHTML = `
        <aside class="side" aria-label="${esc(t('templates'))}">
          <div class="side-head">
            <h3>${t('templates')}</h3>
            ${switchHtml('templatesOn', JM.templates.isOn(), t('templates'))}
            <button class="icon-btn sm" type="button" data-act="side" aria-label="${esc(t('close'))}">${icons.close}</button>
          </div>
          <input class="field" type="search" data-role="tpl-search" placeholder="${esc(t('templatesSearch'))}" aria-label="${esc(t('templatesSearch'))}">
          <p class="muted small side-hint">${esc(t('templatesHint'))}</p>
          <div class="side-list"></div>
          <button class="link" type="button" data-act="manageTemplates">${t('manage')}</button>
        </aside>`;
    }
    renderSideList();
  }

  function renderSideList() {
    const list = $('.side-list', side);
    if (!list) return;
    $('.side .switch')?.setAttribute('aria-checked', String(JM.templates.isOn()));
    if (!JM.templates.isOn()) {
      list.innerHTML = `<p class="empty">${t('templatesOff')}</p>`;
      return;
    }
    const query = ($('[data-role="tpl-search"]', side)?.value ?? '').trim().toLowerCase();
    const packs = JM.templates.packs(state.lang).filter(pack => pack.enabled);
    const html = packs
      .map(pack => {
        const items = pack.templates.filter(
          item => item.enabled && (!query || item.name.toLowerCase().includes(query) || item.description.toLowerCase().includes(query))
        );
        if (!items.length) return '';
        return `
          <h4>${esc(pack.name)}</h4>
          ${items
            .map((item, i) => {
              const { text, marks } = JM.templates.preview(item.pattern);
              const preview = text.length > 400 ? `${text.slice(0, 400)}…` : text;
              return `
                <button class="tpl" type="button" data-act="insertTemplate" data-pack="${pack.id}" data-name="${esc(item.name)}" style="--i:${i}">
                  <span class="tpl-head"><b>${esc(item.name)}</b><span>${esc(item.description.replace(/^[A-ZÁÉÍÓÚÑ]+:\s*/, ''))}</span></span>
                  <pre class="code static">${JM.highlight(preview, marks.filter(mark => mark.end <= preview.length))}</pre>
                </button>`;
            })
            .join('')}`;
      })
      .join('');
    list.innerHTML = html || `<p class="empty">${t('templatesEmpty')}</p>`;
  }

  function toggleSide(open) {
    sideOpen = open ?? !sideOpen;
    renderSide();
    if (sideOpen) $('[data-role="tpl-search"]', side)?.focus({ preventScroll: true });
    else if (side.contains(document.activeElement) || !document.activeElement || document.activeElement === document.body) lastEditor?.input.focus({ preventScroll: true });
  }

  function insertTemplate(packId, name) {
    const template = JM.templates.packs(state.lang).find(pack => pack.id === packId)?.templates.find(item => item.name === name);
    const editor = player?.editor ?? null;
    if (!template) return;
    if (!editor || !editor.input.isConnected) return toast(t('insertNeedsEditor'));
    editor.insertTemplate(template);
  }

  function openTemplateManager() {
    const packs = JM.templates.packs(state.lang);
    openSheet(`
      <h3>${t('templates')}</h3>
      <div class="setting-line">
        <span>${t('templates')}</span>
        ${switchHtml('templatesOn', JM.templates.isOn(), t('templates'))}
      </div>
      <p class="muted small">${esc(t('templatesHint'))}</p>
      ${packs
        .map(
          pack => `
            <details class="pack">
              <summary>
                <span class="pack-name">${esc(pack.name)}</span>
                <span class="muted small">${t('templateCount', { n: pack.templates.length })}</span>
                ${pack.builtin ? '' : `<button class="link danger" type="button" data-act="removePack" data-pack="${pack.id}">${t('removePack')}</button>`}
                ${switchHtml('togglePack', pack.enabled, pack.name).replace('data-act="togglePack"', `data-act="togglePack" data-pack="${pack.id}"`)}
              </summary>
              <div class="pack-list">
                ${pack.templates
                  .map(
                    item => `
                      <label class="check-line">
                        <input type="checkbox" data-role="tpl-toggle" data-pack="${pack.id}" data-name="${esc(item.name)}"${item.enabled ? ' checked' : ''}>
                        <b>${esc(item.name)}</b><span class="muted">${esc(item.description)}</span>
                      </label>`
                  )
                  .join('')}
              </div>
            </details>`
        )
        .join('')}
      <div class="row">
        <label class="btn ghost file-btn">${t('importXml')}<input type="file" accept=".xml,text/xml,application/xml" data-role="tpl-import" hidden></label>
        <button class="btn" type="button" data-act="close-sheet">${t('close')}</button>
      </div>`);
  }

  // Lesson player ------------------------------------------------------------

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
    const summary = lesson
      ? `<button class="link" type="button" data-act="summary" data-id="${lesson.id}" data-live="1">${t('summary')}</button>`
      : '';
    app.innerHTML = `
      ${topBar(`<button class="icon-btn" type="button" data-act="${exit}" aria-label="${esc(t('close'))}">${icons.close}</button>`, { notes: !lesson, extra: summary })}
      <main class="stage" id="stage"></main>
      <footer class="dock" id="dock"></footer>`;
    renderDrawer();
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
        <button class="btn" type="button" data-act="${primary.act}" id="primary">${primary.label}${kbd('↵')}</button>
      </div>`;
  }

  function setPrimary(act, label) {
    const primary = $('#primary');
    primary.dataset.act = act;
    primary.innerHTML = `${label}${kbd('↵')}`;
    primary.classList.remove('swap');
    void primary.offsetWidth;
    primary.classList.add('swap');
    updateKeyHint();
  }

  function renderStep(direction) {
    const step = player.steps[player.index];
    Object.assign(player, { solved: false, attempts: 0, revealed: false, hints: 0, editor: null, busy: true });
    setBar(player.index / (player.steps.length - 1));
    if (player.mode === 'lesson') store.setJSON('jm.pos', { id: player.lesson.id, step: player.index });
    if (step.kind === 'done') markDone(step.lesson.id);

    $$('body > .suggest').forEach(element => element.remove());
    const stepView = views[step.kind](step);
    const stage = $('#stage');
    const old = $('.step', stage);

    const show = () => {
      if (!stage.isConnected) return;
      stage.innerHTML = `<div class="step ${stepView.cls ?? ''}" style="--dir:${direction}">${stepView.html}</div>`;
      renderDock({ primary: { act: 'next', label: t('next') }, wide: stepView.cls?.includes('wide'), ...stepView.dock });
      animateWords(stage);
      stepView.setup?.(stage);
      if (!player.editor) $('#primary')?.focus({ preventScroll: true });
      updateKeyHint();
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

  function bindEditor(editor) {
    player.editor = editor;
    lastEditor = editor;
    return editor;
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
        ${codeView(item.code, 'static')}`,
      setup: stage => typeOut($('.code', stage), item.code, 350),
    }),

    type: step => ({
      cls: 'wide',
      html: `
        <p class="eyebrow rise">${esc(step.warmup ? t('warmup', { title: step.lesson.title }) : step.review ? step.lesson.title : t('fromMemory'))}</p>
        <h2 class="big sm" data-words>${esc(step.item.do)}</h2>
        <div class="rise" style="--delay:250ms">${editorHtml({ line: true, label: step.item.do })}</div>
        <div class="msg" id="msg" aria-live="polite">${step.item.code.includes('\n') && finePointer ? `<p class="note-line">${t('multilineHint')}</p>` : ''}</div>
        <div id="answer"></div>`,
      dock: { primary: { act: 'check', label: t('check') }, extra: { act: 'reveal', label: t('showAnswer') } },
      setup(stage) {
        const root = $('.ed', stage);
        const multiline = step.item.code.includes('\n');
        const editor = bindEditor(
          JM.editor(root, {
            value: '',
            templates: activeTemplates,
            onChange: value => {
              if (player.solved) return;
              root.classList.remove('err');
              // Solve live only on an exact match; a looser answer is accepted when the learner checks it,
              // otherwise a half-typed string like "H" would pass before "Hello" is finished.
              const result = JM.grade(value, step.item.code);
              if (result.ok && result.exact) solve(result);
            },
          })
        );
        root.addEventListener(
          'keydown',
          event => {
            if (event.key !== 'Enter' || event.isComposing || editor.busy()) return;
            if (!multiline || event.ctrlKey || event.metaKey) {
              event.preventDefault();
              event.stopPropagation();
              if (player.solved) advance(1);
              else if (player.revealed && !JM.grade(editor.value(), step.item.code).ok) advance(1);
              else check();
            }
          },
          true
        );
        editor.input.focus({ preventScroll: true });
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
          ${['plan', 'hint', 'output', 'solution']
            .map((name, i) => `<button class="chip" type="button" data-act="aid" data-aid="${name}">${t(name)}${kbd(i + 1)}</button>`)
            .join('')}
        </div>
        <div class="panel" id="panel" hidden></div>`,
      dock: { primary: { act: 'next', label: t('markDone') }, flow: true },
      setup(stage) {
        bindEditor(
          JM.editor($('.ed', stage), {
            value: store.get(draftKey(lesson)) ?? lesson.starter,
            templates: activeTemplates,
            imports: true,
            onChange: value => {
              if (value === lesson.starter) store.remove(draftKey(lesson));
              else store.set(draftKey(lesson), value);
            },
          })
        );
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
        setup(stage) {
          celebrate(stage);
          if (store.get('jm.askNote') !== 'off') {
            setTimeout(() => {
              if (player?.steps[player.index]?.kind === 'done' && !layer.innerHTML) openNotePrompt(lesson);
            }, 1500);
          }
        },
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
      burstFrom($('.medal', stage), { count: 46, spread: 320 });
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

    const root = $('.ed', $('#stage'));
    root.classList.remove('err');
    root.classList.add('ok');
    root.querySelector('.inp').readOnly = true;
    root.insertAdjacentHTML('beforeend', `<span class="tick">${icons.check(18)}</span>`);

    const loose = !result.exact && !player.revealed;
    $('#msg').innerHTML = `
      <p class="ok">${t(result.exact ? 'perfect' : 'correct')}</p>
      ${loose ? `<p class="note-line">${t('looseNote')}</p>${codeView(step.item.code, 'static')}` : ''}`;

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
    const root = $('.ed', $('#stage'));
    root.classList.remove('shake');
    void root.offsetWidth;
    root.classList.add('shake', 'err');
    player.editor.input.focus({ preventScroll: true });
  }

  function reveal() {
    const step = player.steps[player.index];
    player.revealed = true;
    $('#answer').innerHTML = codeView(step.item.code, 'static');
    typeOut($('#answer .code'), step.item.code, 0);
    $('#extra')?.remove();
    setPrimary('next', t('next'));
    player.editor.input.focus({ preventScroll: true });
  }

  // Practice aids ------------------------------------------------------------

  function showAid(name) {
    const { lesson } = player.steps[player.index];
    const panel = $('#panel');
    const chip = $(`[data-aid="${name}"]`);
    if (!panel || !chip) return;
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
      panel.innerHTML = codeView(lesson.solution, 'static');
      typeOut($('.code', panel), lesson.solution, 0);
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

  // Layers: settings, sheets ---------------------------------------------------

  function closeLayer() {
    if (!layer.innerHTML) return false;
    layer.innerHTML = '';
    $$('[data-act="settings"]').forEach(button => button.setAttribute('aria-expanded', 'false'));
    const target = returnFocus?.isConnected ? returnFocus : player ? player.editor?.input ?? $('#primary') : null;
    target?.focus({ preventScroll: true });
    returnFocus = null;
    return true;
  }

  function openSheet(html, { soft = false, wide = false, label = '' } = {}) {
    if (!layer.innerHTML) returnFocus = document.activeElement;
    layer.innerHTML = `
      <div class="sheet${soft ? ' soft' : ''}${wide ? ' wide' : ''}" data-act="close-sheet">
        <div class="sheet-card" role="dialog" aria-modal="true" aria-label="${esc(label)}">${html}</div>
      </div>`;
    const first = $('textarea, input:not([type="file"]):not([type="checkbox"]), .btn, button', layer);
    first?.focus({ preventScroll: true });
  }

  const segment = (act, options, current) => {
    const at = Math.max(0, options.findIndex(([value]) => value === current));
    return `
      <div class="seg" role="group" style="--n:${options.length};--at:${at}">
        ${options.map(([value, label]) => `<button type="button" data-act="${act}" data-value="${value}" aria-pressed="${value === current}">${label}</button>`).join('')}
      </div>`;
  };

  function syncLine() {
    if (!JM.sync.connected()) return `<span class="muted small">${t('syncOff')}</span>`;
    const status = JM.sync.status();
    const detail =
      status === 'syncing' ? t('syncing') : status === 'error' ? t('syncError') : t('syncedAgo', { time: relativeTime(JM.sync.last()) });
    return `<span class="small sync-status ${status}">${esc(t('syncedAs', { login: JM.sync.login() }))}<br><span class="muted">${esc(detail)}</span></span>`;
  }

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
    <div class="setting-line">
      <span>${t('templates')}</span>
      <button class="link" type="button" data-act="manageTemplates">${t('manage')}</button>
      ${switchHtml('templatesOn', JM.templates.isOn(), t('templates'))}
    </div>
    <div class="setting-line">
      <span>${t('askNote')}</span>
      ${switchHtml('askNote', store.get('jm.askNote') !== 'off', t('askNote'))}
    </div>
    <p class="pop-label">${t('sync')}</p>
    <div class="sync-box">
      ${syncLine()}
      <button class="link" type="button" data-act="syncSheet">${JM.sync.connected() ? t('manage') : t('syncSetup')}</button>
    </div>
    <div class="pop-foot">
      <button class="link" type="button" data-act="shortcuts">${t('shortcuts')}</button>
      <button class="link danger" type="button" data-act="resetProgress">${t('resetProgress')}</button>
    </div>`;

  function openSettings(button) {
    if ($('.pop', layer)) return closeLayer();
    returnFocus = document.activeElement;
    layer.innerHTML = `<div class="pop" role="dialog" aria-label="${esc(t('settings'))}">${settingsHtml()}</div>`;
    button?.setAttribute('aria-expanded', 'true');
    $('.pop button[aria-pressed="true"]', layer)?.focus({ preventScroll: true });
  }

  function refreshSettings() {
    const pop = $('.pop', layer);
    if (!pop) return;
    const focused = document.activeElement?.dataset;
    pop.innerHTML = settingsHtml();
    if (focused?.act) $(`.pop [data-act="${focused.act}"]${focused.value ? `[data-value="${focused.value}"]` : ''}`, layer)?.focus({ preventScroll: true });
  }

  function updateSegment(act, value) {
    const buttons = $$(`[data-act="${act}"]`, layer.innerHTML ? layer : app);
    buttons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.value === value)));
    buttons[0]?.closest('.seg')?.style.setProperty('--at', buttons.findIndex(button => button.dataset.value === value));
  }

  function openSummary(id, { live }) {
    const lesson = findLesson(id);
    const recall = lesson.recall.map(item => `<p>${esc(item.do)}</p>${codeView(item.code, 'static')}`).join('');
    openSheet(
      `
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
        </div>`,
      { label: lesson.title }
    );
  }

  function openNotePrompt(lesson) {
    openSheet(
      `
        <h3 data-words>${t('promptTitle')}</h3>
        <p class="muted">${t('promptText')}</p>
        <textarea class="note-input" data-role="note-prompt" data-lesson="${lesson.id}" rows="4" placeholder="${esc(t('notePlaceholder'))}"></textarea>
        <label class="check-line small"><input type="checkbox" data-role="ask-off"> ${t('dontAsk')}</label>
        <div class="row">
          <button class="btn" type="button" data-act="notePromptSave">${t('saveNote')}${kbd('Ctrl ↵')}</button>
          <button class="btn ghost" type="button" data-act="close-sheet">${t('promptSkip')}${kbd('Esc')}</button>
        </div>`,
      { soft: true, label: t('promptTitle') }
    );
    animateWords(layer);
  }

  function openSyncSheet() {
    const connected = JM.sync.connected();
    const tokenUrl = 'https://github.com/settings/tokens/new?scopes=gist&description=Java%20Monkey';
    openSheet(
      `
        <h3>${t('syncTitle')}</h3>
        <p class="muted">${t('syncIntro')}</p>
        ${
          connected
            ? `<div class="sync-box big-box">${syncLine()}</div>
               <div class="row">
                 <button class="btn" type="button" data-act="syncNow">${t('syncNow')}</button>
                 <button class="btn ghost" type="button" data-act="syncDisconnect">${t('disconnect')}</button>
               </div>`
            : `<ol class="steps-list">
                 <li>${inline(t('syncStep1'))} <a class="link inline" href="${tokenUrl}" target="_blank" rel="noopener">${t('createToken')} ↗</a></li>
                 <li>${t('syncStep2')}</li>
               </ol>
               <input class="field" type="password" data-role="sync-token" placeholder="ghp_…" autocomplete="off" spellcheck="false" aria-label="GitHub token">
               <p class="msg-line err" data-role="sync-error" hidden></p>
               <div class="row">
                 <button class="btn" type="button" data-act="syncConnect">${t('connect')}</button>
                 <button class="btn ghost" type="button" data-act="close-sheet">${t('close')}</button>
               </div>
               <p class="muted small">${t('tokenNote')}</p>`
        }
        <h4>${t('orFile')}</h4>
        <div class="row left">
          <button class="btn ghost small" type="button" data-act="exportProgress">${t('exportProgress')}</button>
          <label class="btn ghost small file-btn">${t('importProgress')}<input type="file" accept=".json,application/json" data-role="progress-import" hidden></label>
        </div>`,
      { label: t('syncTitle') }
    );
  }

  function openShortcuts() {
    const groups = JM.ui[state.lang].shortcutGroups
      .map(
        ({ title, items }, g) => `
          <section class="key-group" style="--i:${g}">
            <h4>${esc(title)}</h4>
            ${items
              .map(([keys, label]) => `<div class="key-row"><span>${esc(label)}</span><span class="key-set">${keys.split(/\s{2,}/).map(key => `<kbd>${esc(key)}</kbd>`).join('')}</span></div>`)
              .join('')}
          </section>`
      )
      .join('');
    openSheet(
      `<h3>${t('shortcuts')}</h3>
       <p class="muted small">${t('shortcutsIntro')}</p>
       <div class="key-groups">${groups}</div>
       <div class="row"><button class="btn" type="button" data-act="close-sheet">${t('close')}${kbd('Esc')}</button></div>`,
      { label: t('shortcuts'), wide: true }
    );
  }

  function resetProgress() {
    if (!confirm(t('resetConfirm'))) return;
    const keep = new Set(['jm.lang', 'jm.theme', 'jm.accent', 'jm.templates', 'jm.askNote']);
    store
      .keys('jm.')
      .filter(key => !key.startsWith('jm.sync.') && !keep.has(key))
      .forEach(key => store.remove(key));
    state.done = new Set();
    closeLayer();
    nav('#/');
  }

  // Actions ------------------------------------------------------------------

  async function act(name, target) {
    switch (name) {
      case 'settings':
        openSettings(target);
        break;
      case 'theme':
        state.theme = target.dataset.value;
        store.set('jm.theme', state.theme);
        updateSegment('theme', state.theme);
        changeAppearance(target);
        break;
      case 'accent':
        state.accent = target.dataset.value;
        store.set('jm.accent', state.accent);
        $$('.swatch').forEach(button => button.setAttribute('aria-pressed', String(button === target)));
        changeAppearance(target);
        break;
      case 'lang':
        if (state.lang === target.dataset.value) break;
        state.lang = target.dataset.value;
        store.set('jm.lang', state.lang);
        applyAppearance();
        route();
        refreshSettings();
        $('[data-act="settings"]')?.setAttribute('aria-expanded', 'true');
        if (sideOpen) {
          side.innerHTML = '';
          renderSide();
        }
        break;
      case 'templatesOn':
        JM.templates.setOn(!JM.templates.isOn());
        $$('[data-act="templatesOn"]').forEach(button => button.setAttribute('aria-checked', String(JM.templates.isOn())));
        renderSideList();
        break;
      case 'askNote': {
        const on = store.get('jm.askNote') === 'off';
        store.set('jm.askNote', on ? 'on' : 'off');
        target.setAttribute('aria-checked', String(on));
        break;
      }
      case 'manageTemplates':
        openTemplateManager();
        break;
      case 'togglePack':
        JM.templates.togglePack(target.dataset.pack, state.lang);
        target.setAttribute('aria-checked', String(target.getAttribute('aria-checked') !== 'true'));
        renderSideList();
        break;
      case 'removePack':
        JM.templates.removePack(target.dataset.pack);
        target.closest('.pack').remove();
        renderSideList();
        break;
      case 'side':
        toggleSide();
        break;
      case 'insertTemplate':
        insertTemplate(target.dataset.pack, target.dataset.name);
        break;
      case 'syncSheet':
        openSyncSheet();
        break;
      case 'syncConnect': {
        const field = $('[data-role="sync-token"]', layer);
        const error = $('[data-role="sync-error"]', layer);
        if (!field.value.trim()) return field.focus();
        target.disabled = true;
        target.textContent = t('connecting');
        try {
          await JM.sync.connect(field.value.trim());
          openSyncSheet();
        } catch (failure) {
          error.hidden = false;
          error.textContent = failure.message === 'token' ? t('tokenError') : t('syncError');
          target.disabled = false;
          target.textContent = t('connect');
        }
        break;
      }
      case 'syncNow':
        await JM.sync.run();
        if ($('.sync-box', layer)) openSyncSheet();
        break;
      case 'syncDisconnect':
        JM.sync.disconnect();
        openSyncSheet();
        break;
      case 'exportProgress':
        JM.sync.exportFile();
        break;
      case 'shortcuts':
        openShortcuts();
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
      case 'notesPage':
        nav('#/notes');
        break;
      case 'notesFilter':
        notesFilter = target.dataset.value;
        updateSegment('notesFilter', notesFilter);
        renderNotesList();
        break;
      case 'noteAdd':
        addNoteFrom($('[data-role="note-new"]'), null);
        break;
      case 'noteDrawerAdd':
        addNoteFrom($('[data-role="note-drawer"]'), player?.lesson?.id);
        break;
      case 'notePromptSave': {
        const field = $('[data-role="note-prompt"]', layer);
        if ($('[data-role="ask-off"]', layer)?.checked) store.set('jm.askNote', 'off');
        if (JM.notes.add(field.value, field.dataset.lesson)) {
          toast(t('savedNote'));
          refreshNoteViews();
        }
        closeLayer();
        break;
      }
      case 'noteToggle':
        JM.notes.toggle(target.dataset.id);
        refreshNoteViews();
        break;
      case 'noteDelete': {
        const article = target.closest('.note');
        article.classList.add('removing');
        setTimeout(() => {
          JM.notes.remove(target.dataset.id);
          refreshNoteViews();
        }, motion ? 260 : 0);
        break;
      }
      case 'drawer':
        toggleDrawer();
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
      case 'summary':
        openSummary(target.dataset.id, { live: target.dataset.live });
        break;
      case 'start-from-sheet':
        closeLayer();
        startLesson(target.dataset.id);
        break;
      case 'close-sheet': {
        const askOff = $('[data-role="ask-off"]', layer);
        if (askOff?.checked) store.set('jm.askNote', 'off');
        closeLayer();
        break;
      }
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

  // Events -------------------------------------------------------------------

  document.addEventListener('click', event => {
    const target = event.target.closest('[data-act]');
    const pop = $('.pop', layer);
    if (pop && !pop.contains(event.target) && target?.dataset.act !== 'settings') closeLayer();
    if (!target || target.disabled) return;
    // Clicks inside a sheet card should not close it.
    if (target.classList.contains('sheet') && event.target !== target) return;
    // The switch inside a pack summary must not also open or close the pack.
    if (target.closest('summary') && target !== target.closest('summary')) event.preventDefault();
    act(target.dataset.act, target);
  });

  document.addEventListener('change', async event => {
    const element = event.target;
    if (element.dataset.plan !== undefined && player) {
      const key = planKey(player.steps[player.index].lesson);
      const checked = new Set(store.getJSON(key, []));
      if (element.checked) checked.add(Number(element.dataset.plan));
      else checked.delete(Number(element.dataset.plan));
      store.setJSON(key, [...checked]);
    } else if (element.dataset.role === 'tpl-toggle') {
      JM.templates.toggleTemplate(element.dataset.pack, element.dataset.name, state.lang);
      renderSideList();
    } else if (element.dataset.role === 'tpl-import' && element.files[0]) {
      const file = element.files[0];
      try {
        const pack = JM.templates.importXml(await file.text(), file.name);
        toast(t('imported', { n: pack.templates.length }));
        openTemplateManager();
        renderSideList();
      } catch {
        toast(t('importError'));
      }
    } else if (element.dataset.role === 'progress-import' && element.files[0]) {
      try {
        JM.sync.importFile(await element.files[0].text());
        toast(t('importDone'));
      } catch {
        toast(t('importError'));
      }
    }
  });

  document.addEventListener('input', event => {
    const role = event.target.dataset.role;
    if (role === 'notes-search') renderNotesList();
    if (role === 'tpl-search') renderSideList();
  });

  // Inline note editing saves when the text loses focus.
  document.addEventListener(
    'blur',
    event => {
      const id = event.target.dataset?.note;
      if (!id) return;
      const text = event.target.innerText.trim();
      if (text) JM.notes.edit(id, text);
      else event.target.textContent = JM.notes.list().find(note => note.id === id)?.text ?? '';
    },
    true
  );

  // Keyboard ------------------------------------------------------------------

  function moveFocus(selector, step) {
    const items = $$(selector).filter(element => element.offsetParent !== null);
    if (!items.length) return;
    const index = items.indexOf(document.activeElement);
    const next = items[index < 0 ? 0 : Math.min(items.length - 1, Math.max(0, index + step))];
    next.focus();
    next.scrollIntoView({ block: 'nearest', behavior: motion ? 'smooth' : 'auto' });
  }

  function onKey(event) {
    if (event.defaultPrevented || event.isComposing) return;
    const typing = editable(event.target);
    const key = event.key;
    const ctrl = event.ctrlKey || event.metaKey;

    // Shortcuts that work everywhere, even while typing.
    if (event.altKey && !ctrl && event.code === 'KeyN') {
      event.preventDefault();
      if (!toggleDrawer()) nav('#/notes');
      return;
    }
    if (event.altKey && !ctrl && event.code === 'KeyK') {
      event.preventDefault();
      return toggleSide();
    }

    if (key === 'Escape') {
      if (closeLayer()) return;
      if ($('.drawer.open')) return toggleDrawer(false);
      if (sideOpen && side.contains(event.target)) return toggleSide(false);
      if (typing) {
        event.target.blur();
        $('#primary')?.focus({ preventScroll: true });
        return;
      }
      if (sideOpen) return toggleSide(false);
      if (player) return act(player.mode === 'lesson' ? 'topics' : 'home');
      if (view()) return nav('#/');
      return;
    }

    if (typing) {
      if (ctrl && key === 'Enter') {
        const role = event.target.dataset.role;
        event.preventDefault();
        if (role === 'note-new') act('noteAdd');
        else if (role === 'note-drawer') act('noteDrawerAdd');
        else if (role === 'note-prompt') act('notePromptSave');
        else if (role === 'sync-token') act('syncConnect', $('[data-act="syncConnect"]', layer));
        else if (event.target.dataset.note) event.target.blur();
        else if (player && !layer.innerHTML) $('#primary')?.click();
      } else if (event.target.dataset.note && key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        event.target.blur();
      } else if (event.target.dataset.role === 'tpl-search' && (key === 'ArrowDown' || key === 'Enter')) {
        event.preventDefault();
        if (key === 'Enter') $('.tpl', side)?.click();
        else $('.tpl', side)?.focus();
      }
      return;
    }

    if (layer.innerHTML) {
      if (key === 'ArrowDown' || key === 'ArrowUp') {
        const scroller = $('.sheet-card', layer);
        if (scroller && !event.target.closest('.seg')) scroller.scrollBy({ top: key === 'ArrowDown' ? 80 : -80, behavior: 'smooth' });
      }
      return;
    }
    if (event.altKey || ctrl) return;

    if (side.contains(event.target) && (key === 'ArrowDown' || key === 'ArrowUp')) {
      event.preventDefault();
      return moveFocus('.side .tpl', key === 'ArrowDown' ? 1 : -1);
    }

    const lower = key.toLowerCase();
    const global = {
      '?': openShortcuts,
      ',': () => openSettings($('[data-act="settings"]')),
      n: () => (toggleDrawer() ? null : nav('#/notes')),
      k: () => toggleSide(),
      h: () => nav('#/'),
      t: () => nav('#/topics'),
      r: () => dueCards().length && nav('#/review'),
    };
    if (global[key] || global[lower]) {
      event.preventDefault();
      return (global[key] ?? global[lower])();
    }

    const inPanel = event.target.closest('#side, #drawer');
    if (player) {
      const step = player.steps[player.index];
      // Enter always presses the button that shows ↵, wherever the focus was left; Space still presses the focused one.
      if ((key === 'Enter' && !inPanel) || key === 'ArrowRight') {
        event.preventDefault();
        return $('#primary')?.click();
      }
      if (key === 'ArrowLeft') return advance(-1);
      if (lower === 'e' && player.editor) {
        event.preventDefault();
        return player.editor.input.focus();
      }
      if (lower === 's' && player.lesson) return openSummary(player.lesson.id, { live: true });
      if (step.kind === 'practice') {
        const aid = { 1: 'plan', 2: 'hint', 3: 'output', 4: 'solution' }[key];
        if (aid) return showAid(aid);
        if (lower === 'd') return act('download');
      }
      return;
    }

    if (view() === 'topics') {
      if (key === 'ArrowDown' || key === 'ArrowUp') {
        event.preventDefault();
        return moveFocus('.topic-head, .topic.open .lstart', key === 'ArrowDown' ? 1 : -1);
      }
      const head = event.target.closest('.topic')?.querySelector('.topic-head');
      if ((key === 'ArrowRight' || key === 'ArrowLeft') && head) {
        const topic = head.closest('.topic');
        const open = key === 'ArrowRight';
        if (topic.classList.contains('open') !== open) act('toggle', head);
        if (!open) head.focus();
        return;
      }
      if (lower === 's') {
        const id = event.target.closest('.lrow')?.querySelector('[data-act="summary"]')?.dataset.id;
        if (id) openSummary(id, {});
      }
      return;
    }

    if (view() === 'notes') {
      if (key === 'Enter' && !event.target.closest('button, a')) {
        event.preventDefault();
        return $('[data-role="note-new"]')?.focus();
      }
      if (key === '/') {
        event.preventDefault();
        return $('[data-role="notes-search"]')?.focus();
      }
      if (key === 'ArrowDown' || key === 'ArrowUp') {
        event.preventDefault();
        return moveFocus('.notes-list .note-text', key === 'ArrowDown' ? 1 : -1);
      }
    }

    if (key === 'Enter' && !view() && !inPanel) {
      event.preventDefault();
      $('[data-act="resume"], .home [data-act="topics"]', app)?.click();
    }
  }

  document.addEventListener('keydown', onKey);

  // Inside a multi-line editor Enter adds a line, so the primary button advertises Ctrl+Enter instead.
  function updateKeyHint() {
    const hint = $('#primary kbd');
    if (!hint || !player) return;
    const step = player.steps[player.index];
    const inEditor = player.editor && document.activeElement === player.editor.input;
    const multiline = step.kind === 'practice' || step.item?.code.includes('\n');
    hint.textContent = inEditor && multiline ? 'Ctrl ↵' : '↵';
  }
  document.addEventListener('focusin', updateKeyHint);
  document.addEventListener('focusout', () => setTimeout(updateKeyHint));

  // Router -------------------------------------------------------------------

  function route() {
    const [, name, id] = location.hash.split('/');
    $$('body > .suggest').forEach(element => element.remove());
    player = null;
    window.scrollTo(0, 0);

    if (name === 'lesson' && findLesson(id)) {
      const lesson = findLesson(id);
      const saved = position();
      renderPlayer({ mode: 'lesson', lesson, steps: lessonSteps(lesson), index: saved?.id === id ? saved.step : 0 });
      return;
    }
    renderDrawer();
    if (name === 'review') renderPlayer({ mode: 'review', steps: reviewSteps(), index: 0 });
    else if (name === 'topics') renderTopics();
    else if (name === 'notes') renderNotesPage();
    else renderHome();
  }

  window.addEventListener('hashchange', () => {
    closeLayer();
    if (document.startViewTransition && motion) document.startViewTransition(route);
    else route();
  });

  // Sync ----------------------------------------------------------------------

  JM.sync.on('applied', () => {
    state.lang = store.get('jm.lang') || state.lang;
    state.theme = store.get('jm.theme') || state.theme;
    state.accent = ACCENTS[store.get('jm.accent')] !== undefined ? store.get('jm.accent') : state.accent;
    state.done = new Set(store.getJSON('jm.done', []));
    applyAppearance();
    // Do not interrupt a lesson in progress; everything else redraws with the merged data.
    if (!player) route();
    refreshNoteViews();
  });
  JM.sync.on('status', () => {
    refreshSettings();
    const box = $('.sheet .sync-box', layer);
    if (box) box.innerHTML = syncLine();
  });

  // Cursor glow --------------------------------------------------------------

  const glow = $('#glow');
  if (finePointer) {
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

  applyAppearance();
  route();
  JM.sync.run();
})();
