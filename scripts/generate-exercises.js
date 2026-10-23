#!/usr/bin/env node
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.join(__dirname, '..');
const dataDir = path.join(root, 'data');

for (const file of fs.readdirSync(dataDir).filter(name => name.endsWith('.js'))) {
  const lang = path.basename(file, '.js');
  const sandbox = { JM: { content: {} } };
  vm.runInNewContext(fs.readFileSync(path.join(dataDir, file), 'utf8'), sandbox);

  const outDir = path.join(root, 'exercises', lang);
  fs.rmSync(outDir, { recursive: true, force: true });
  fs.mkdirSync(outDir, { recursive: true });

  for (const lesson of sandbox.JM.content[lang].lessons) {
    fs.writeFileSync(path.join(outDir, lesson.filename), `${lesson.starter}\n`);
  }
}
