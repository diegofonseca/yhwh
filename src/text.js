const MAX_LENGTH = 2000;

// C0/C1 control characters (includes ESC, which could inject terminal escape
// sequences) and Unicode bidi override/isolate characters ("Trojan Source").
// Natural RTL scripts (Hebrew, Arabic) do not need these to render correctly.
// eslint-disable-next-line no-control-regex
const UNSAFE = /[\u0000-\u001F\u007F-\u009F‪-‮⁦-⁩]/g;
const TAGS = /<[^>]*>/g;

/** Make remote text safe to print in a terminal or insert as plain text. */
export function sanitize(value) {
  if (typeof value !== 'string') return '';
  return value
    .replace(TAGS, '')
    .replace(UNSAFE, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, MAX_LENGTH);
}
