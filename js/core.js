const JM = {
  content: {},
  ui: {},
};

JM.store = {
  get(key) {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  set(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch {}
  },
  remove(key) {
    try {
      localStorage.removeItem(key);
    } catch {}
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
