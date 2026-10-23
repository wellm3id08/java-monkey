#!/usr/bin/env node
// Converts the Eclipse template files in templates/ into js/templates-data.js.
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');
const packs = [
  { id: 'daw-es', name: 'Java DAW', lang: 'es', file: 'plantillas_java_daw.xml' },
  { id: 'basics-en', name: 'Java basics', lang: 'en', file: 'java_basics_en.xml' },
];

const decode = text =>
  text.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&amp;/g, '&');
const attribute = (attrs, name) => decode(attrs.match(new RegExp(`\\b${name}="([^"]*)"`))?.[1] ?? '');

const data = packs.map(({ file, ...pack }) => {
  const xml = fs.readFileSync(path.join(root, 'templates', file), 'utf8');
  const templates = [...xml.matchAll(/<template\b([^>]*)>([\s\S]*?)<\/template>/g)].map(([, attrs, body]) => ({
    name: attribute(attrs, 'name'),
    description: attribute(attrs, 'description'),
    pattern: decode(body),
  }));
  return { ...pack, templates };
});

fs.writeFileSync(path.join(root, 'js', 'templates-data.js'), `JM.templatePacks = ${JSON.stringify(data, null, 2)};\n`);
console.log(data.map(pack => `${pack.id}: ${pack.templates.length}`).join('\n'));
