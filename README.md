# yhwh

> *"The LORD bless thee, and keep thee."* — Numbers 6:24

A tiny, dependency-free JavaScript library (and CLI) that prints **one random verse from the book of Psalms** followed by **"God bless you!"** — in 36 languages, chosen by you or detected automatically.

🇧🇷 [Leia em português](docs/README.pt-BR.md)

```
$ npx yhwh --lang en
“The heavens declare the glory of God. The expanse shows his handiwork.”
— Psalms 19:1 (World English Bible)

God bless you!
```

## Install

```sh
npm install yhwh
```

Requires Node.js ≥ 18.17. Also works in modern browsers and in Deno/Bun (anything with `fetch`).

## Usage

```js
import { bless, getVerse, blessing } from 'yhwh';

console.log(await bless());               // detected language
console.log(await bless({ lang: 'pt' })); // Portuguese

const verse = await getVerse({ lang: 'es' });
// {
//   text: 'JEHOVÁ es mi pastor; nada me faltará.',
//   reference: 'Salmos 23:1',
//   book: 'Salmos', chapter: 23, verse: 1,
//   translation: 'Reina-Valera 1909',
//   lang: 'es', dir: 'ltr',
//   blessing: '¡Dios te bendiga!',
//   source: 'online'
// }

blessing('fr'); // 'Que Dieu vous bénisse !'
```

### CLI

```sh
npx yhwh                # language detected from your system
npx yhwh --lang de      # choose a language
npx yhwh --offline      # no network: prints a bundled verse
npx yhwh --list         # list supported languages
```

### API

| Function | Description |
| --- | --- |
| `bless(options?)` | `Promise<string>` — verse, reference and blessing, formatted as text. |
| `getVerse(options?)` | `Promise<Verse>` — the verse as an object (see above). |
| `format(verse)` | Formats a `Verse` as text (what `bless` returns). |
| `blessing(lang?)` | "God bless you!" in the given/detected language. |
| `detectLanguage()` | Detected language code (browser → `LC_ALL`/`LANG` → `Intl` → `en`). |
| `SUPPORTED_LANGUAGES`, `LANGUAGES` | Supported codes and their metadata. |

**Options**

| Option | Default | Description |
| --- | --- | --- |
| `lang` | detected | Language code or locale (`pt`, `pt-BR`, `zh-TW`…). Unsupported values throw `RangeError`. |
| `offline` | `false` | Never use the network; return the bundled verse (Psalm 23:1). |
| `fallback` | `true` | On network failure, return the bundled verse instead of throwing. |
| `timeout` | `8000` | Network timeout (ms). |
| `fetch` | `globalThis.fetch` | Custom `fetch` implementation. |
| `random` | `Math.random` | Custom random source, useful for tests. |

## Languages

`en` English · `pt` Português · `es` Español · `fr` Français · `de` Deutsch · `it` Italiano · `nl` Nederlands · `ru` Русский · `uk` Українська · `pl` Polski · `cs` Čeština · `ro` Română · `hu` Magyar · `sv` Svenska · `da` Dansk · `nb` Norsk bokmål · `nn` Norsk nynorsk · `fi` Suomi · `el` Ελληνικά · `he` עברית · `ar` العربية · `zh-Hans` 简体中文 · `zh-Hant` 繁體中文 · `ja` 日本語 · `ko` 한국어 · `vi` Tiếng Việt · `tl` Tagalog · `af` Afrikaans · `sq` Shqip · `hr` Hrvatski · `sr` Српски · `tr` Türkçe · `th` ไทย · `lt` Lietuvių · `eo` Esperanto · `la` Latina

Run `npx yhwh --list` to see which translation is used for each one. Contributions of new languages and blessing corrections are very welcome — see below.

> **Note on numbering:** Russian, Ukrainian and Latin translations follow the Septuagint/Vulgate numbering, so their Psalm numbers are usually one lower than in other Bibles (e.g. Psalm 23 → 22).

## Where do the verses come from?

Verses are fetched from **[getBible.net](https://getbible.net)** — a free, open API with no key, no sign-up and no tracking, serving static JSON files. Only **public-domain** translations, or translations whose license **explicitly allows free distribution**, are used (e.g. World English Bible, Reina-Valera 1909, Louis Segond 1910, Elberfelder 1905, Bíblia Livre — CC BY 3.0 BR). The translation name is always shown next to the reference.

One verse per language (Psalm 23:1) is bundled in the package, so it still works offline.

## Security & privacy

- **Zero dependencies.** Nothing to audit but ~200 lines of code.
- **No install scripts** (`preinstall`/`postinstall`), no telemetry, no side effects on import — nothing runs until you call a function.
- **Only one network request**, to `https://api.getbible.net`, and only when you call `getVerse`/`bless` (or never, with `offline: true`). No cookies/credentials are sent, redirects are rejected, and the request has a timeout.
- **No user input reaches the URL**: the translation comes from an internal allow-list and the chapter is a number.
- **Remote text is sanitized** before being returned: control characters (terminal escape sequences), Unicode bidi overrides ("Trojan Source") and HTML tags are removed, and length is capped. Still, treat it as text: use `textContent`, not `innerHTML`, in the browser.
- Releases are published from GitHub Actions with [npm provenance](https://docs.npmjs.com/generating-provenance-statements).

See [SECURITY.md](SECURITY.md) to report a vulnerability.

## Contributing

1. Fork and clone, then `npm test` (uses the built-in `node:test`, no dev dependencies).
2. To add a language: add an entry to `src/languages.js` with a getBible.net translation whose license allows distribution, then run `npm run update-fallback` and open a pull request.
3. Native speakers: please help us check the blessings!

## License

[MIT](LICENSE) for the code. Bible texts belong to their respective translations (public domain or freely distributable; see [getBible.net](https://api.getbible.net/v2/translations.json) for each license).
