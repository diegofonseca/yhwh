export type LanguageCode =
  | 'en' | 'pt' | 'es' | 'fr' | 'de' | 'it' | 'nl' | 'ru' | 'uk' | 'pl' | 'cs' | 'ro'
  | 'hu' | 'sv' | 'da' | 'nb' | 'nn' | 'fi' | 'el' | 'he' | 'ar' | 'zh-Hans' | 'zh-Hant'
  | 'ja' | 'ko' | 'vi' | 'tl' | 'af' | 'sq' | 'hr' | 'sr' | 'tr' | 'th' | 'lt' | 'eo' | 'la';

export interface Language {
  language: string;
  translation: string;
  name: string;
  psalms: string;
  blessing: string;
  dir: 'ltr' | 'rtl';
}

export interface Verse {
  /** The verse text (sanitized plain text). */
  text: string;
  /** e.g. "Salmos 23:1" */
  reference: string;
  book: string;
  chapter: number;
  verse: number;
  /** Translation name, e.g. "World English Bible". */
  translation: string;
  lang: LanguageCode;
  dir: 'ltr' | 'rtl';
  /** "God bless you!" in the verse's language. */
  blessing: string;
  /** Whether the verse came from the network or the bundled fallback. */
  source: 'online' | 'offline';
}

export interface Options {
  /** Language code or locale ("pt", "pt-BR", "zh-TW"...). Detected when omitted. */
  lang?: string;
  /** Do not use the network; return the bundled verse. Default: false. */
  offline?: boolean;
  /** On network failure, return the bundled verse instead of throwing. Default: true. */
  fallback?: boolean;
  /** Network timeout in milliseconds. Default: 8000. */
  timeout?: number;
  /** Custom fetch implementation. */
  fetch?: typeof fetch;
  /** Custom random source returning a number in [0, 1). Default: Math.random. */
  random?: () => number;
}

export const LANGUAGES: Readonly<Record<LanguageCode, Language>>;
export const SUPPORTED_LANGUAGES: readonly LanguageCode[];

export function getVerse(options?: Options): Promise<Verse>;
export function bless(options?: Options): Promise<string>;
export function format(verse: Verse): string;
export function blessing(lang?: string): string;
export function detectLanguage(): LanguageCode;
export function normalizeLanguage(tag: string): LanguageCode | undefined;
