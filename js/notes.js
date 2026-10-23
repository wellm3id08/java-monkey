// Personal notes: doubts the learner writes down to look up later.
// Deleted notes stay as empty tombstones so the deletion syncs to other devices.
JM.notes = (() => {
  const KEY = 'jm.notes';
  const { store } = JM;

  const all = () => store.getJSON(KEY, []);
  const save = notes => store.setJSON(KEY, notes);

  function change(id, patch) {
    save(all().map(note => (note.id === id ? { ...note, ...patch, updated: Date.now() } : note)));
  }

  return {
    list: () => all().filter(note => !note.deleted),
    count: () => all().filter(note => !note.deleted && !note.done).length,

    add(text, lesson) {
      const clean = text.trim();
      if (!clean) return null;
      const now = Date.now();
      const note = { id: `${now.toString(36)}${Math.random().toString(36).slice(2, 6)}`, lesson: lesson ?? null, text: clean, done: false, created: now, updated: now };
      save([...all(), note]);
      return note;
    },

    edit: (id, text) => change(id, { text: text.trim() }),
    toggle: id => change(id, { done: !all().find(note => note.id === id)?.done }),
    remove: id => change(id, { deleted: true, text: '' }),
    searchUrl: text => `https://www.google.com/search?q=${encodeURIComponent(`java ${text}`)}`,
  };
})();
