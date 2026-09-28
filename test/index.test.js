import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  getVerse, bless, blessing, format, normalizeLanguage, detectLanguage, LANGUAGES, SUPPORTED_LANGUAGES
} from '../src/index.js';
import { FALLBACK } from '../src/fallback.js';
import { sanitize } from '../src/text.js';

function fakeFetch(body, { status = 200, calls = [] } = {}) {
  return async (url, init) => {
    calls.push({ url, init });
    return { ok: status >= 200 && status < 300, status, json: async () => body };
  };
}

test('every language has a blessing, a book name and a fallback verse', () => {
  for (const code of SUPPORTED_LANGUAGES) {
    const lang = LANGUAGES[code];
    assert.ok(lang.blessing && lang.psalms && lang.name && lang.translation, code);
    assert.match(lang.translation, /^[a-z0-9]+$/, code);
    assert.ok(FALLBACK[code]?.text, `missing fallback for ${code}`);
  }
});

test('normalizeLanguage handles locale tags', () => {
  assert.equal(normalizeLanguage('pt-BR'), 'pt');
  assert.equal(normalizeLanguage('pt_BR.UTF-8'), 'pt');
  assert.equal(normalizeLanguage('EN'), 'en');
  assert.equal(normalizeLanguage('zh-TW'), 'zh-Hant');
  assert.equal(normalizeLanguage('zh-Hant-HK'), 'zh-Hant');
  assert.equal(normalizeLanguage('zh-CN'), 'zh-Hans');
  assert.equal(normalizeLanguage('no'), 'nb');
  assert.equal(normalizeLanguage('C'), undefined);
  assert.equal(normalizeLanguage('xx'), undefined);
  assert.equal(normalizeLanguage('__proto__'), undefined);
  assert.equal(normalizeLanguage(42), undefined);
});

test('detectLanguage always returns a supported language', () => {
  assert.ok(SUPPORTED_LANGUAGES.includes(detectLanguage()));
});

test('blessing() translates "God bless you!"', () => {
  assert.equal(blessing('en'), 'God bless you!');
  assert.equal(blessing('pt-BR'), 'Deus abençoe você!');
  assert.equal(blessing('es'), '¡Dios te bendiga!');
});

test('unsupported language throws RangeError', async () => {
  assert.throws(() => blessing('klingon'), RangeError);
  await assert.rejects(getVerse({ lang: 'klingon', offline: true }), RangeError);
});

test('getVerse fetches a random chapter over HTTPS from the allow-listed translation', async () => {
  const calls = [];
  const fetch = fakeFetch(
    { verses: [{ verse: 1, text: 'first' }, { verse: 2, text: 'second' }] },
    { calls }
  );
  const verse = await getVerse({ lang: 'pt', fetch, random: () => 0.999 });

  assert.equal(calls.length, 1);
  assert.equal(calls[0].url, 'https://api.getbible.net/v2/livre/19/150.json');
  assert.equal(calls[0].init.credentials, 'omit');
  assert.deepEqual(
    { text: verse.text, reference: verse.reference, source: verse.source, blessing: verse.blessing },
    { text: 'second', reference: 'Salmos 150:2', source: 'online', blessing: 'Deus abençoe você!' }
  );
});

test('falls back to the bundled verse on network errors', async () => {
  const fetch = async () => { throw new Error('offline'); };
  const verse = await getVerse({ lang: 'en', fetch });
  assert.equal(verse.source, 'offline');
  assert.equal(verse.reference, 'Psalms 23:1');
});

test('falls back on HTTP errors and malformed responses', async () => {
  assert.equal((await getVerse({ lang: 'en', fetch: fakeFetch({}, { status: 500 }) })).source, 'offline');
  assert.equal((await getVerse({ lang: 'en', fetch: fakeFetch({ verses: 'nope' }) })).source, 'offline');
  assert.equal((await getVerse({ lang: 'en', fetch: fakeFetch(null) })).source, 'offline');
});

test('fallback: false rethrows network errors', async () => {
  const fetch = async () => { throw new Error('boom'); };
  await assert.rejects(getVerse({ lang: 'en', fetch, fallback: false }), /boom/);
});

test('offline: true never calls fetch', async () => {
  const fetch = async () => { throw new Error('should not be called'); };
  const verse = await getVerse({ lang: 'la', offline: true, fetch });
  assert.equal(verse.reference, 'Psalmi 22:1');
});

test('remote text is sanitized (terminal escapes, bidi overrides, HTML)', async () => {
  const evil = '\u001b[31mRed\u001b[0m <script>x</script>‮good\u0007';
  const fetch = fakeFetch({ verses: [{ verse: 1, text: evil }] });
  const verse = await getVerse({ lang: 'en', fetch, random: () => 0 });
  assert.equal(verse.text, '[31mRed [0m x good');
  assert.doesNotMatch(verse.text, /[\u0000-\u001F‪-‮]/);
  assert.equal(sanitize('a'.repeat(5000)).length, 2000);
});

test('bless() returns verse, reference and blessing', async () => {
  const text = await bless({ lang: 'en', offline: true });
  assert.equal(
    text,
    '“Yahweh is my shepherd: I shall lack nothing.”\n— Psalms 23:1 (World English Bible)\n\nGod bless you!'
  );
  assert.equal(format(await getVerse({ lang: 'en', offline: true })), text);
});
