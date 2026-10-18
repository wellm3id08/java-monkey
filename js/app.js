(() => {
  const { esc, inline, store } = JM;
  const $ = (selector, root = document) => root.querySelector(selector);
  const app = $('#app');
  const sheet = $('#sheet');
  const bar = $('#bar');

  const state = {
    lang: store.get('jm.lang') || (navigator.language?.startsWith('es') ? 'es' : 'en'),
    done: new Set(store.getJSON('jm.done', [])),
  };
  let player = null;

  const content = () => JM.content[state.lang];
  const lessons = () => content().lessons;
  const findLesson = id => lessons().find(lesson => lesson.id === id);
  const t = (key, vars = {}) => (JM.ui[state.lang][key] ?? key).replace(/\{(\w+)\}/g, (_, name) => vars[name] ?? '');
  const pad = number => String(number).padStart(2, '0');
  const setBar = value => (bar.style.transform = `scaleX(${Math.min(1, Math.max(0, value))})`);
  const position = () => store.getJSON('jm.pos', null);
  const draftKey = lesson => `jm.draft.${state.lang}.${lesson.id}`;
  const planKey = lesson => `jm.plan.${state.lang}.${lesson.id}`;

  const svg = path =>
    `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${path}</svg>`;
  const icons = {
    back: svg('<path d="M15 6l-6 6 6 6"/>'),
    close: svg('<path d="M6 6l12 12M18 6L6 18"/>'),
    check: svg('<path d="M5 12.5l4.5 4.5L19 7.5"/>'),
    bigCheck: svg('<path d="M5 12.5l4.5 4.5L19 7.5"/>').replace('width="20" height="20"', 'width="38" height="38"'),
  };

  const codeBlock = code => `<pre class="block code"><code>${JM.highlight(code)}</code></pre>`;

  const editorHtml = ({ line = false, label = '' } = {}) => `
    <div class="ed${line ? ' line' : ''}">
      ${line ? '' : '<pre class="gutter" aria-hidden="true"></pre>'}
      <div class="pane">
        <pre class="hl" aria-hidden="true"><code></code></pre>
        <textarea class="inp" aria-label="${esc(label)}" spellcheck="false" autocapitalize="off" autocomplete="off" autocorrect="off" wrap="off" rows="1"></textarea>
      </div>
    </div>`;

  const className = code => code.match(/public\s+class\s+(\w+)/)?.[1];

  function download(code, fallback) {
    const name = `${className(code) ?? fallback.replace(/\.java$/, '')}.java`;
    const url = URL.createObjectURL(new Blob([`${code}\n`], { type: 'text/x-java-source' }));
    const link = Object.assign(document.createElement('a'), { href: url, download: name });
    document.body.append(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function nav(hash) {
    if (location.hash === hash) route();
    else location.hash = hash;
  }

  // Progress -----------------------------------------------------------------

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

  function markDone(id) {
    state.done.add(id);
    store.setJSON('jm.done', [...state.done]);
  }

  // Views --------------------------------------------------------------------

  const langButton = () =>
    `<button class="pill" type="button" data-act="lang" aria-label="${esc(t('langLabel'))}">${t('langButton')}</button>`;

  function renderHome() {
    const total = lessons().length;
    const done = lessons().filter(lesson => state.done.has(lesson.id)).length;
    const started = done > 0 || position();
    const finished = done === total;
    setBar(done / total);

    app.innerHTML = `
      <header class="top">
        <span class="wordmark">Java Monkey</span>
        <div class="group">${langButton()}</div>
      </header>
      <main class="home">
        <h1>${esc(t('title'))}</h1>
        <p class="sub">${esc(t('subtitle'))}</p>
        <div class="row">
          <button class="btn" type="button" data-act="resume">${t(finished ? 'review' : started ? 'continue' : 'start')}</button>
          ${finished ? '' : `<button class="btn ghost" type="button" data-act="topics">${t('chooseTopic')}</button>`}
        </div>
        ${done ? `<p class="count">${t('count', { n: done, total })}</p>` : ''}
      </main>`;
  }

  function renderTopics() {
    const all = lessons();
    const current = resumeTarget();
    const total = all.length;
    setBar(all.filter(lesson => state.done.has(lesson.id)).length / total);

    const sections = content().sections.map(section => {
      const items = section.lessons.map(findLesson);
      const finished = items.filter(lesson => state.done.has(lesson.id)).length;
      const rows = items
        .map(lesson => {
          const index = all.indexOf(lesson) + 1;
          const cls = state.done.has(lesson.id) ? 'done' : lesson === current ? 'current' : '';
          return `
            <div class="lrow ${cls}">
              <button class="lstart" type="button" data-act="open" data-id="${lesson.id}">
                <span class="n">${pad(index)}</span>
                <span class="lt">${esc(lesson.title)}</span>
                <span class="state">${icons.check.replace('width="20" height="20"', 'width="12" height="12"')}</span>
              </button>
              <button class="link" type="button" data-act="notes" data-id="${lesson.id}">${t('notes')}</button>
            </div>`;
        })
        .join('');
      const dots = items.map(lesson => `<i class="${state.done.has(lesson.id) ? 'on' : ''}"></i>`).join('');
      const open = items.includes(current) ? ' open' : '';
      return `
        <details class="topic"${open}>
          <summary>
            <span class="name">${esc(section.title)}</span>
            <span class="dots">${dots}</span>
            <span class="ratio">${finished}/${items.length}</span>
          </summary>
          <div class="lessons">${rows}</div>
        </details>`;
    });

    app.innerHTML = `
      <header class="top">
        <div class="group">
          <button class="icon-btn" type="button" data-act="home" aria-label="${esc(t('back'))}">${icons.back}</button>
        </div>
        <div class="group">${langButton()}</div>
      </header>
      <main class="topics">
        <h2>${esc(t('topics'))}</h2>
        ${sections.join('')}
      </main>`;
  }

  // Lesson player ------------------------------------------------------------

  function buildSteps(lesson) {
    const steps = [{ kind: 'intro' }];
    lesson.theory.forEach(item => steps.push({ kind: 'read', item }));
    if (lesson.theoryTable) steps.push({ kind: 'table' });
    steps.push({ kind: 'example' }, { kind: 'explain' });
    lesson.recall.forEach(item => {
      steps.push({ kind: 'study', item });
      if (item.code.split('\n').length <= 10) steps.push({ kind: 'type', item });
    });
    steps.push({ kind: 'practice' }, { kind: 'done' });
    return steps;
  }

  function renderPlayer(lesson, step) {
    const steps = buildSteps(lesson);
    player = { lesson, steps, index: Math.min(Math.max(step, 0), steps.length - 1), solved: false, hints: 0 };

    app.innerHTML = `
      <header class="top">
        <div class="group">
          <button class="icon-btn" type="button" data-act="topics" aria-label="${esc(t('allTopics'))}">${icons.close}</button>
        </div>
        <div class="group">
          <button class="link" type="button" data-act="notes" data-id="${lesson.id}" data-live="1">${t('notes')}</button>
          ${langButton()}
        </div>
      </header>
      <main class="stage" id="stage"></main>
      <footer class="dock" id="dock"></footer>`;
    renderStep();
  }

  function renderDock({ primary, extra, secondary, wide }) {
    const dock = $('#dock');
    dock.classList.toggle('wide', Boolean(wide));
    dock.innerHTML = `
      <div class="dock-inner">
        ${player.index > 0 ? `<button class="icon-btn" type="button" data-act="prev" aria-label="${esc(t('back'))}">${icons.back}</button>` : ''}
        <span class="spacer"></span>
        ${extra ? `<button class="link" type="button" data-act="${extra.act}" id="extra">${extra.label}</button>` : ''}
        ${secondary ? `<button class="btn ghost" type="button" data-act="${secondary.act}">${secondary.label}</button>` : ''}
        <button class="btn" type="button" data-act="${primary.act}" id="primary">${primary.label}</button>
      </div>`;
  }

  const setPrimary = (act, label) => {
    const primary = $('#primary');
    primary.dataset.act = act;
    primary.textContent = label;
  };

  function renderStep() {
    const { lesson, steps, index } = player;
    const step = steps[index];
    player.solved = false;
    player.hints = 0;
    setBar(index / (steps.length - 1));
    store.setJSON('jm.pos', { id: lesson.id, step: index });
    if (step.kind === 'done') markDone(lesson.id);

    const view = views[step.kind](step, lesson);
    const stage = $('#stage');
    stage.innerHTML = `<div class="step ${view.cls ?? ''}">${view.html}</div>`;
    renderDock({ primary: { act: 'next', label: t('next') }, wide: view.cls === 'wide', ...view.dock });
    view.setup?.(stage);
    window.scrollTo(0, 0);
  }

  const views = {
    intro: (_, lesson) => ({
      cls: 'center',
      html: `
        <p class="eyebrow">${t('lessonOf', { i: lessons().indexOf(lesson) + 1, n: lessons().length })} · ${esc(lesson.time)}</p>
        <h2 class="big">${esc(lesson.title)}</h2>
        <p class="lead">${inline(lesson.idea)}</p>`,
    }),

    read: ({ item }) => ({
      html: `
        <p class="eyebrow">${inline(item.title)}</p>
        <p class="lead">${inline(item.text)}</p>`,
    }),

    table: (_, lesson) => ({
      html: `
        <p class="lead">${inline(lesson.theoryNote ?? '')}</p>
        <div class="table-wrap">${tableHtml(lesson.theoryTable)}</div>`,
    }),

    example: (_, lesson) => ({
      cls: 'wide',
      html: `
        <p class="eyebrow">${t('example')} · ${inline(lesson.exampleTitle)}</p>
        <p class="lead">${inline(lesson.exampleLead)}</p>
        ${codeBlock(lesson.example)}`,
    }),

    explain: (_, lesson) => ({
      html: `
        <p class="eyebrow">${t('look')}</p>
        <ul class="lines">${lesson.explain.map((line, i) => `<li style="--d:${i}">${inline(line)}</li>`).join('')}</ul>`,
    }),

    study: ({ item }) => ({
      cls: 'wide',
      html: `
        <p class="eyebrow">${t('remember')}</p>
        <h2 class="big sm">${esc(item.do)}</h2>
        ${codeBlock(item.code)}`,
    }),

    type: ({ item }) => ({
      cls: 'wide',
      html: `
        <p class="eyebrow">${t('fromMemory')}</p>
        <h2 class="big sm">${esc(item.do)}</h2>
        ${editorHtml({ line: true, label: item.do })}
        <div class="msg" id="msg" aria-live="polite"></div>
        <div id="answer"></div>`,
      dock: { primary: { act: 'check', label: t('check') }, extra: { act: 'reveal', label: t('showAnswer') } },
      setup(stage) {
        const root = $('.ed', stage);
        const multiline = item.code.includes('\n');
        const editor = JM.editor(root, {
          value: '',
          onChange: value => {
            if (!player.solved && JM.sameCode(value, item.code)) solve();
            else if (!player.solved) $('#msg').textContent = '';
          },
        });
        root.addEventListener(
          'keydown',
          event => {
            if (event.key !== 'Enter' || event.isComposing) return;
            if (!multiline || event.ctrlKey || event.metaKey) {
              event.preventDefault();
              event.stopPropagation();
              act(player.solved ? 'next' : 'check');
            }
          },
          true
        );
        player.editor = editor;
        editor.input.focus();
      },
    }),

    practice: (_, lesson) => {
      const file = `exercises/${state.lang}/${lesson.filename}`;
      return {
        cls: 'wide',
        html: `
          <p class="eyebrow">${t('yourTurn')}</p>
          <h2 class="big sm">${inline(lesson.task)}</h2>
          <p class="muted">${inline(lesson.think)}</p>
          <div class="file">
            <span>${esc(lesson.filename)}</span>
            <span class="tools">
              <button class="link" type="button" data-act="reset">${t('reset')}</button>
              <button class="link" type="button" data-act="download">${t('download')}</button>
            </span>
          </div>
          ${editorHtml({ label: file })}
          <div class="aids">
            ${['plan', 'hint', 'output', 'solution'].map(name => `<button class="chip" type="button" data-act="aid" data-aid="${name}">${t(name)}</button>`).join('')}
          </div>
          <div class="panel" id="panel" hidden></div>`,
        dock: { primary: { act: 'next', label: t('markDone') } },
        setup(stage) {
          player.editor = JM.editor($('.ed', stage), {
            value: store.get(draftKey(lesson)) ?? lesson.starter,
            onChange: value => {
              if (value === lesson.starter) store.remove(draftKey(lesson));
              else store.set(draftKey(lesson), value);
            },
          });
        },
      };
    },

    done: (_, lesson) => {
      const all = lessons();
      const next = all[all.indexOf(lesson) + 1];
      return {
        cls: 'center',
        html: `
          <div class="check">${icons.bigCheck}</div>
          <h2 class="big">${t('complete')}</h2>
          <p class="lead">${next ? esc(t('upNext', { title: next.title })) : t('finished')}</p>`,
        dock: next
          ? { primary: { act: 'nextLesson', label: t('nextLesson') }, secondary: { act: 'topics', label: t('allTopics') } }
          : { primary: { act: 'topics', label: t('allTopics') } },
      };
    },
  };

  function tableHtml({ headers, rows }) {
    const cells = (tag, values) => values.map(value => `<${tag}>${esc(value)}</${tag}>`).join('');
    return `<table><thead><tr>${cells('th', headers)}</tr></thead><tbody>${rows.map(row => `<tr>${cells('td', row)}</tr>`).join('')}</tbody></table>`;
  }

  function solve() {
    player.solved = true;
    const root = $('.ed');
    root.classList.add('ok');
    root.querySelector('.inp').readOnly = true;
    const msg = $('#msg');
    msg.textContent = t('correct');
    msg.className = 'msg ok';
    $('#extra')?.remove();
    setPrimary('next', t('next'));
    $('#primary').focus();
  }

  function check() {
    const { editor, steps, index } = player;
    const { item } = steps[index];
    if (JM.sameCode(editor.value(), item.code)) return solve();
    const root = $('.ed');
    const msg = $('#msg');
    msg.textContent = t('wrong');
    msg.className = 'msg err';
    root.classList.remove('shake');
    void root.offsetWidth;
    root.classList.add('shake');
  }

  function reveal() {
    const { item } = player.steps[player.index];
    $('#answer').innerHTML = codeBlock(item.code);
    $('#extra')?.remove();
    setPrimary('next', t('next'));
  }

  function showAid(name) {
    const { lesson } = player;
    const panel = $('#panel');
    const chip = $(`[data-aid="${name}"]`);
    const open = !chip.classList.contains('on');
    document.querySelectorAll('.chip').forEach(button => button.classList.remove('on'));
    panel.hidden = !open;
    if (!open) return;
    chip.classList.add('on');

    if (name === 'plan') {
      const checked = new Set(store.getJSON(planKey(lesson), []));
      panel.innerHTML = `<ul class="plan">${lesson.steps
        .map((text, i) => `<li><label><input type="checkbox" data-plan="${i}"${checked.has(i) ? ' checked' : ''}><span>${inline(text)}</span></label></li>`)
        .join('')}</ul>`;
    } else if (name === 'hint') {
      player.hints = 1;
      renderHints();
    } else if (name === 'output') {
      const file = lesson.filename;
      panel.innerHTML = `
        ${codeBlock(lesson.output)}
        <p class="muted" style="margin-top:12px">${inline(lesson.outputNote)}</p>
        <p class="muted">${inline(t('run', { file, cls: file.replace(/\.java$/, '') }))}</p>`;
    } else {
      panel.innerHTML = codeBlock(lesson.solution);
    }
  }

  function renderHints() {
    const { lesson, hints } = player;
    $('#panel').innerHTML =
      lesson.hints.slice(0, hints).map(text => `<p>${inline(text)}</p>`).join('') +
      (hints < lesson.hints.length ? `<button class="link" type="button" data-act="morehint">${t('anotherHint')}</button>` : '');
  }

  // Notes --------------------------------------------------------------------

  function openNotes(id, { live }) {
    const lesson = findLesson(id);
    const recall = lesson.recall
      .map(item => `<p>${esc(item.do)}</p>${codeBlock(item.code)}`)
      .join('');
    sheet.innerHTML = `
      <div class="sheet" data-act="close-sheet">
        <div class="sheet-card" role="dialog" aria-modal="true" aria-label="${esc(lesson.title)}">
          <h3>${esc(lesson.title)}</h3>
          <p class="muted">${inline(lesson.idea)}</p>
          <h4>${t('keyPoints')}</h4>
          <ul>${lesson.theory.map(item => `<li><strong>${inline(item.title)}.</strong> ${inline(item.text)}</li>`).join('')}</ul>
          <h4>${t('example')}</h4>
          ${codeBlock(lesson.example)}
          <h4>${t('cheatTitle')}</h4>
          ${recall}
          <h4>${t('practice')}</h4>
          <p>${inline(lesson.task)}</p>
          ${codeBlock(lesson.solution)}
          <div class="row">
            ${live ? '' : `<button class="btn" type="button" data-act="start-from-sheet" data-id="${id}">${t('startLesson')}</button>`}
            <button class="btn ghost" type="button" data-act="close-sheet">${t('close')}</button>
          </div>
        </div>
      </div>`;
    $('.btn', sheet).focus({ preventScroll: true });
  }

  const closeSheet = () => (sheet.innerHTML = '');

  // Events -------------------------------------------------------------------

  function act(name, target) {
    switch (name) {
      case 'lang':
        state.lang = state.lang === 'en' ? 'es' : 'en';
        store.set('jm.lang', state.lang);
        document.documentElement.lang = state.lang;
        closeSheet();
        route();
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
      case 'open':
        startLesson(target.dataset.id);
        break;
      case 'notes':
        openNotes(target.dataset.id, { live: target.dataset.live });
        break;
      case 'start-from-sheet':
        closeSheet();
        startLesson(target.dataset.id);
        break;
      case 'close-sheet':
        if (!target || target.classList.contains('sheet') || target.classList.contains('btn')) closeSheet();
        break;
      case 'next':
        if (player.index < player.steps.length - 1) {
          player.index++;
          renderStep();
        }
        break;
      case 'prev':
        if (player.index > 0) {
          player.index--;
          renderStep();
        }
        break;
      case 'nextLesson': {
        const all = lessons();
        const next = all[all.indexOf(player.lesson) + 1];
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
        player.editor.set(player.lesson.starter);
        break;
      case 'download':
        download(player.editor.value(), player.lesson.filename);
        break;
    }
  }

  document.addEventListener('click', event => {
    const target = event.target.closest('[data-act]');
    if (!target) return;
    if (target.classList.contains('sheet') && event.target !== target) return;
    act(target.dataset.act, target);
  });

  document.addEventListener('change', event => {
    const box = event.target.closest('[data-plan]');
    if (!box || !player) return;
    const key = planKey(player.lesson);
    const checked = new Set(store.getJSON(key, []));
    if (box.checked) checked.add(Number(box.dataset.plan));
    else checked.delete(Number(box.dataset.plan));
    store.setJSON(key, [...checked]);
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') return closeSheet();
    if (event.key !== 'Enter' || !player || !$('#dock') || sheet.innerHTML) return;
    if (event.target.closest('textarea, button, summary, a, input')) return;
    const primary = $('#primary');
    if (primary) {
      event.preventDefault();
      primary.click();
    }
  });

  // Router -------------------------------------------------------------------

  function route() {
    document.documentElement.lang = state.lang;
    const [, view, id] = location.hash.split('/');
    player = null;
    window.scrollTo(0, 0);

    if (view === 'lesson' && findLesson(id)) {
      const saved = position();
      renderPlayer(findLesson(id), saved?.id === id ? saved.step : 0);
    } else if (view === 'topics') {
      renderTopics();
    } else {
      renderHome();
    }
  }

  window.addEventListener('hashchange', () => {
    closeSheet();
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
      x += (targetX - x) * 0.09;
      y += (targetY - y) * 0.09;
      glow.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      running = Math.abs(targetX - x) > 0.5 || Math.abs(targetY - y) > 0.5;
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

  route();
})();
