// Template packs in the Eclipse format: built-in packs plus any the user imports.
// Packs and single templates can be switched on and off at any time.
JM.templates = (() => {
  const KEY = 'jm.templates';
  const { store } = JM;

  const settings = () => store.getJSON(KEY, { on: true, packs: {}, custom: [] });
  const save = value => store.setJSON(KEY, value);

  function packs(lang) {
    const current = settings();
    const all = [...JM.templatePacks.map(pack => ({ ...pack, builtin: true })), ...current.custom];
    return all.map(pack => {
      const saved = current.packs[pack.id];
      const enabled = saved?.enabled ?? (pack.builtin ? pack.lang === lang : true);
      const off = new Set(saved?.off ?? []);
      return { ...pack, enabled, templates: pack.templates.map(item => ({ ...item, enabled: !off.has(item.name), pack: pack.id })) };
    });
  }

  function update(change) {
    const current = settings();
    change(current);
    save(current);
  }

  function packState(current, id, lang) {
    const pack = packs(lang).find(item => item.id === id);
    current.packs[id] ??= { enabled: pack.enabled, off: [] };
    return current.packs[id];
  }

  // Turns `${name}`, `${cursor}`, `${}` and `${imp:import(a,b)}` into segments the editor can fill in.
  function compile(pattern) {
    const segments = [];
    const order = [];
    const labels = new Map();
    const imports = [];
    let anonymous = 0;
    let last = 0;
    const literal = text => text && segments.push({ text: text.replace(/\t/g, '    ').replace(/\r/g, '') });

    for (const match of pattern.matchAll(/\$\$|\$\{([^}]*)\}/g)) {
      literal(pattern.slice(last, match.index));
      last = match.index + match[0].length;
      if (match[0] === '$$') {
        literal('$');
        continue;
      }
      const body = match[1].trim();
      const importList = body.match(/^\w*:import\((.*)\)$/);
      if (importList) {
        imports.push(...importList[1].split(',').map(name => name.trim()).filter(Boolean));
      } else if (body === 'cursor') {
        segments.push({ cursor: true });
      } else if (/^(word_selection|line_selection)$/.test(body)) {
        continue;
      } else {
        const name = body ? body.split(':')[0] : `\u0000${anonymous++}`;
        if (!labels.has(name)) {
          labels.set(name, body ? name : '');
          order.push(name);
        }
        segments.push({ name });
      }
    }
    literal(pattern.slice(last));
    return { segments, order, labels, imports };
  }

  // Shows a pattern the way it will be inserted, with each placeholder replaced by its name.
  function preview(pattern) {
    const { segments, labels } = compile(pattern);
    let text = '';
    const marks = [];
    for (const segment of segments) {
      if (segment.text !== undefined) {
        text += segment.text;
      } else if (segment.name !== undefined) {
        const label = labels.get(segment.name) || '…';
        marks.push({ start: text.length, end: text.length + label.length, cls: 'ph' });
        text += label;
      }
    }
    return { text, marks };
  }

  function parseXml(xml) {
    const doc = new DOMParser().parseFromString(xml, 'application/xml');
    if (doc.querySelector('parsererror')) throw new Error('invalid');
    const templates = [...doc.querySelectorAll('template')]
      .filter(node => node.getAttribute('deleted') !== 'true')
      .map(node => ({
        name: node.getAttribute('name') ?? '',
        description: node.getAttribute('description') ?? '',
        pattern: node.textContent,
      }))
      .filter(item => item.name && item.pattern);
    if (!templates.length) throw new Error('empty');
    return templates;
  }

  return {
    compile,
    preview,
    packs,
    isOn: () => settings().on,

    active(lang) {
      if (!settings().on) return [];
      return packs(lang)
        .filter(pack => pack.enabled)
        .flatMap(pack => pack.templates.filter(item => item.enabled));
    },

    setOn: on => update(current => (current.on = on)),

    togglePack: (id, lang) =>
      update(current => {
        const state = packState(current, id, lang);
        state.enabled = !state.enabled;
      }),

    toggleTemplate: (id, name, lang) =>
      update(current => {
        const state = packState(current, id, lang);
        const off = new Set(state.off);
        if (!off.delete(name)) off.add(name);
        state.off = [...off];
      }),

    importXml(xml, fileName) {
      const templates = parseXml(xml);
      const pack = { id: `custom-${Date.now().toString(36)}`, name: fileName.replace(/\.xml$/i, '').replace(/[_-]+/g, ' '), templates };
      update(current => {
        current.custom.push(pack);
        current.packs[pack.id] = { enabled: true, off: [] };
      });
      return pack;
    },

    removePack: id =>
      update(current => {
        current.custom = current.custom.filter(pack => pack.id !== id);
        delete current.packs[id];
      }),
  };
})();
