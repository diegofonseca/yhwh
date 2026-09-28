#!/usr/bin/env node
import { parseArgs } from 'node:util';
import { readFileSync } from 'node:fs';
import { bless, LANGUAGES } from '../src/index.js';

const HELP = `Usage: yhwh [options]

Prints one random verse from the book of Psalms and a blessing.

Options:
  -l, --lang <code>   Language (e.g. en, pt, es, fr, zh-Hant). Detected when omitted.
  -o, --offline       Do not use the network (prints a bundled verse).
      --list          List supported languages.
  -v, --version       Show version.
  -h, --help          Show this help.`;

let values;
try {
  ({ values } = parseArgs({
    options: {
      lang: { type: 'string', short: 'l' },
      offline: { type: 'boolean', short: 'o' },
      list: { type: 'boolean' },
      version: { type: 'boolean', short: 'v' },
      help: { type: 'boolean', short: 'h' }
    }
  }));
} catch (error) {
  console.error(`${error.message}\n\n${HELP}`);
  process.exit(2);
}

if (values.help) {
  console.log(HELP);
} else if (values.version) {
  const pkg = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'));
  console.log(pkg.version);
} else if (values.list) {
  for (const [code, lang] of Object.entries(LANGUAGES)) {
    console.log(`${code.padEnd(8)} ${lang.language} — ${lang.name}`);
  }
} else {
  try {
    console.log(await bless({ lang: values.lang, offline: values.offline }));
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}
