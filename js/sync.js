// Keeps progress in a private GitHub Gist so it follows the learner between devices.
// GitHub Pages has no server, so the learner connects with a personal token that only has the `gist` scope.
JM.sync = (() => {
  const { store } = JM;
  const FILE = 'java-monkey-progress.json';
  const API = 'https://api.github.com';
  const DELAY = 4000;
  let timer = null;
  let running = null;
  const listeners = { status: [], applied: [] };

  const token = () => store.get('jm.sync.token');
  const emit = (name, value) => listeners[name].forEach(listener => listener(value));

  function setStatus(status, detail = '') {
    store.set('jm.sync.status', status);
    if (status === 'ok') store.set('jm.sync.last', String(Date.now()));
    emit('status', { status, detail });
  }

  // Snapshots -----------------------------------------------------------------

  function snapshot() {
    const data = {};
    for (const key of store.keys('jm.')) {
      if (key.startsWith('jm.sync.') || key === 'jm.updated') continue;
      data[key] = store.get(key);
    }
    return { version: 1, updated: Number(store.get('jm.updated') ?? 0), data };
  }

  const parse = (text, fallback) => {
    try {
      return JSON.parse(text) ?? fallback;
    } catch {
      return fallback;
    }
  };

  // The newer copy wins, except for data that can be combined without losing anything.
  function merge(local, remote) {
    if (!remote?.data) return local;
    const [newer, older] = remote.updated > local.updated ? [remote, local] : [local, remote];
    const data = { ...newer.data };
    const both = key => [parse(local.data[key], null), parse(remote.data[key], null)];

    const union = key => {
      const [a, b] = both(key);
      if (a || b) data[key] = JSON.stringify([...new Set([...(a ?? []), ...(b ?? [])])].sort());
    };
    union('jm.done');
    union('jm.days');

    const [localCards, remoteCards] = both('jm.srs');
    if (localCards || remoteCards) {
      const cards = { ...(localCards ?? {}) };
      for (const [key, card] of Object.entries(remoteCards ?? {})) {
        const mine = cards[key];
        if (!mine || (card.at ?? 0) > (mine.at ?? 0)) cards[key] = card;
      }
      data['jm.srs'] = JSON.stringify(cards);
    }

    const [localNotes, remoteNotes] = both('jm.notes');
    if (localNotes || remoteNotes) {
      const notes = new Map((localNotes ?? []).map(note => [note.id, note]));
      for (const note of remoteNotes ?? []) {
        const mine = notes.get(note.id);
        if (!mine || note.updated > mine.updated) notes.set(note.id, note);
      }
      data['jm.notes'] = JSON.stringify([...notes.values()].sort((a, b) => a.created - b.created));
    }

    // Keep keys that only the older copy has when they are combinable; drop the rest.
    for (const key of Object.keys(older.data)) if (!(key in data) && key.startsWith('jm.draft.')) data[key] = older.data[key];
    return { version: 1, updated: Math.max(local.updated, remote.updated), data };
  }

  const same = (a, b) => JSON.stringify(a.data) === JSON.stringify(b.data);

  function apply(merged) {
    try {
      for (const key of store.keys('jm.')) {
        if (!key.startsWith('jm.sync.') && key !== 'jm.updated' && !(key in merged.data)) localStorage.removeItem(key);
      }
      for (const [key, value] of Object.entries(merged.data)) localStorage.setItem(key, value);
      localStorage.setItem('jm.updated', String(merged.updated));
    } catch {}
    emit('applied');
  }

  // GitHub API ----------------------------------------------------------------

  async function api(path, options = {}, auth = token()) {
    const response = await fetch(`${API}${path}`, {
      ...options,
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${auth}`,
        ...(options.body ? { 'Content-Type': 'application/json' } : {}),
      },
    });
    if (response.status === 401) throw new Error('token');
    if (!response.ok) throw new Error(`http ${response.status}`);
    return response.status === 204 ? null : response.json();
  }

  async function findGist() {
    const saved = store.get('jm.sync.gist');
    if (saved) {
      try {
        return await api(`/gists/${saved}`);
      } catch (error) {
        if (error.message === 'token') throw error;
      }
    }
    for (let page = 1; page <= 5; page++) {
      const list = await api(`/gists?per_page=100&page=${page}`);
      const found = list.find(gist => gist.files?.[FILE]);
      if (found) {
        store.set('jm.sync.gist', found.id);
        return api(`/gists/${found.id}`);
      }
      if (list.length < 100) break;
    }
    return null;
  }

  async function readGist(gist) {
    const file = gist?.files?.[FILE];
    if (!file) return null;
    const text = file.truncated ? await (await fetch(file.raw_url)).text() : file.content;
    return parse(text, null);
  }

  async function writeGist(gist, merged) {
    const body = JSON.stringify({
      description: 'Java Monkey progress',
      files: { [FILE]: { content: JSON.stringify(merged) } },
    });
    if (gist) return api(`/gists/${gist.id}`, { method: 'PATCH', body });
    const created = await api('/gists', { method: 'POST', body: JSON.stringify({ ...JSON.parse(body), public: false }) });
    store.set('jm.sync.gist', created.id);
    return created;
  }

  async function run() {
    if (!token()) return;
    if (running) return running;
    running = (async () => {
      setStatus('syncing');
      try {
        const gist = await findGist();
        const remote = await readGist(gist);
        const local = snapshot();
        const merged = merge(local, remote);
        if (!same(merged, local)) apply(merged);
        if (!remote || !same(merged, remote)) await writeGist(gist, merged);
        setStatus('ok');
      } catch (error) {
        setStatus('error', error.message);
      } finally {
        running = null;
      }
    })();
    return running;
  }

  function schedule() {
    if (!token()) return;
    clearTimeout(timer);
    timer = setTimeout(run, DELAY);
  }

  store.listeners.push(schedule);
  addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden' && timer) {
      clearTimeout(timer);
      timer = null;
      run();
    } else if (document.visibilityState === 'visible') {
      schedule();
    }
  });

  return {
    on: (name, listener) => listeners[name].push(listener),
    connected: () => Boolean(token()),
    login: () => store.get('jm.sync.login'),
    last: () => Number(store.get('jm.sync.last') ?? 0),
    status: () => store.get('jm.sync.status'),
    run,

    async connect(value) {
      const user = await api('/user', {}, value);
      store.set('jm.sync.token', value);
      store.set('jm.sync.login', user.login);
      store.remove('jm.sync.gist');
      await run();
      return user.login;
    },

    disconnect() {
      ['jm.sync.token', 'jm.sync.login', 'jm.sync.gist', 'jm.sync.last', 'jm.sync.status'].forEach(key => store.remove(key));
      emit('status', { status: 'off' });
    },

    exportFile() {
      const url = URL.createObjectURL(new Blob([JSON.stringify(snapshot(), null, 2)], { type: 'application/json' }));
      const link = Object.assign(document.createElement('a'), { href: url, download: 'java-monkey-progress.json' });
      document.body.append(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    },

    importFile(text) {
      const remote = parse(text, null);
      if (!remote?.data) throw new Error('invalid');
      apply(merge(snapshot(), remote));
      schedule();
    },
  };
})();
