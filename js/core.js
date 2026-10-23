const JM = {
  content: {},
  ui: {},
};

// Every change to a progress key stamps `jm.updated`, so sync can tell which copy is newer.
const tracked = key => key.startsWith('jm.') && !key.startsWith('jm.sync.') && key !== 'jm.updated';

JM.store = {
  listeners: [],
  changed(key) {
    if (!tracked(key)) return;
    try {
      localStorage.setItem('jm.updated', String(Date.now()));
    } catch {}
    JM.store.listeners.forEach(listener => listener(key));
  },
  get(key) {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  set(key, value) {
    try {
      if (localStorage.getItem(key) === value) return;
      localStorage.setItem(key, value);
      JM.store.changed(key);
    } catch {}
  },
  remove(key) {
    try {
      if (localStorage.getItem(key) === null) return;
      localStorage.removeItem(key);
      JM.store.changed(key);
    } catch {}
  },
  keys(prefix = 'jm.') {
    try {
      return Object.keys(localStorage).filter(key => key.startsWith(prefix));
    } catch {
      return [];
    }
  },
  getJSON(key, fallback) {
    try {
      return JSON.parse(localStorage.getItem(key)) ?? fallback;
    } catch {
      return fallback;
    }
  },
  setJSON(key, value) {
    JM.store.set(key, JSON.stringify(value));
  },
};

JM.esc = text =>
  String(text).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

JM.inline = text => JM.esc(text).replace(/`([^`]+)`/g, '<code>$1</code>');
