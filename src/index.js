import { LANGUAGES, DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES, normalizeLanguage } from './languages.js';
import { FALLBACK } from './fallback.js';
import { sanitize } from './text.js';

export { LANGUAGES, SUPPORTED_LANGUAGES, normalizeLanguage };

const API = 'https://api.getbible.net/v2';
const PSALMS_BOOK = 19;
const PSALMS_CHAPTERS = 150;
const DEFAULT_TIMEOUT = 8000;

/**
 * Detect the user's language from (in order) the browser, the POSIX
 * environment variables and the Intl API. Falls back to English.
 */
export function detectLanguage() {
  const candidates = [];

  if (typeof navigator !== 'undefined') {
    if (Array.isArray(navigator.languages)) candidates.push(...navigator.languages);
    if (navigator.language) candidates.push(navigator.language);
  }

  if (typeof process !== 'undefined' && process.env) {
    const { LC_ALL, LC_MESSAGES, LANG, LANGUAGE } = process.env;
    candidates.push(LC_ALL, LC_MESSAGES, LANG, ...(LANGUAGE || '').split(':'));
  }

  try {
    candidates.push(Intl.DateTimeFormat().resolvedOptions().locale);
  } catch {
    // Intl unavailable: ignore.
  }

  for (const tag of candidates) {
    const code = normalizeLanguage(tag);
    if (code) return code;
  }
  return DEFAULT_LANGUAGE;
}

/** "God bless you!" in the given (or detected) language. */
export function blessing(lang) {
  return LANGUAGES[resolveLanguage(lang)].blessing;
}

/**
 * Get one random verse from the book of Psalms.
 *
 * @param {object} [options]
 * @param {string} [options.lang] Language code or locale ("pt", "pt-BR"...). Detected when omitted.
 * @param {boolean} [options.offline=false] Do not use the network; return the bundled verse.
 * @param {boolean} [options.fallback=true] On network failure, return the bundled verse instead of throwing.
 * @param {number} [options.timeout=8000] Network timeout in milliseconds.
 * @param {typeof fetch} [options.fetch] Custom fetch implementation.
 * @param {() => number} [options.random=Math.random] Custom random source in [0, 1).
 */
export async function getVerse(options = {}) {
  const code = resolveLanguage(options.lang);
  const lang = LANGUAGES[code];

  if (options.offline) return offlineVerse(code);

  try {
    return await onlineVerse(code, lang, options);
  } catch (error) {
    if (options.fallback === false) throw error;
    return offlineVerse(code);
  }
}

/**
 * Get a random Psalm verse plus the blessing, formatted as plain text.
 * Accepts the same options as `getVerse`.
 */
export async function bless(options = {}) {
  return format(await getVerse(options));
}

/** Format a verse object returned by `getVerse` as plain text. */
export function format(verse) {
  return `“${verse.text}”\n— ${verse.reference} (${verse.translation})\n\n${verse.blessing}`;
}

function resolveLanguage(lang) {
  if (lang === undefined || lang === null || lang === '') return detectLanguage();
  const code = normalizeLanguage(String(lang));
  if (!code) {
    throw new RangeError(
      `Unsupported language "${lang}". Supported: ${SUPPORTED_LANGUAGES.join(', ')}`
    );
  }
  return code;
}

async function onlineVerse(code, lang, options) {
  const fetchImpl = options.fetch || globalThis.fetch;
  if (typeof fetchImpl !== 'function') throw new Error('fetch is not available in this environment');
  const random = options.random || Math.random;
  const timeout = Number.isFinite(options.timeout) && options.timeout > 0 ? options.timeout : DEFAULT_TIMEOUT;

  const chapter = 1 + Math.floor(random() * PSALMS_CHAPTERS);
  // Every path segment comes from our own allow-list or is a number: no user input reaches the URL.
  const url = `${API}/${lang.translation}/${PSALMS_BOOK}/${chapter}.json`;

  const response = await fetchImpl(url, {
    signal: AbortSignal.timeout(timeout),
    headers: { accept: 'application/json' },
    redirect: 'error',
    credentials: 'omit',
    referrerPolicy: 'no-referrer'
  });
  if (!response.ok) throw new Error(`getBible.net responded with HTTP ${response.status}`);

  const data = await response.json();
  const verses = Array.isArray(data?.verses)
    ? data.verses.filter((v) => Number.isInteger(v?.verse) && typeof v.text === 'string' && sanitize(v.text))
    : [];
  if (verses.length === 0) throw new Error('Unexpected response from getBible.net');

  const picked = verses[Math.floor(random() * verses.length)];
  return build(code, chapter, picked.verse, picked.text, 'online');
}

function offlineVerse(code) {
  const { chapter, verse, text } = FALLBACK[code];
  return build(code, chapter, verse, text, 'offline');
}

function build(code, chapter, verse, text, source) {
  const lang = LANGUAGES[code];
  return {
    text: sanitize(text),
    reference: `${lang.psalms} ${chapter}:${verse}`,
    book: lang.psalms,
    chapter,
    verse,
    translation: lang.name,
    lang: code,
    dir: lang.dir,
    blessing: lang.blessing,
    source
  };
}
