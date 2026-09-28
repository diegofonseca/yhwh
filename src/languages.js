/**
 * Supported languages.
 *
 * - `translation`: getBible.net abbreviation (https://api.getbible.net/v2/translations.json).
 *   Only public-domain translations, or translations whose license explicitly
 *   permits free distribution, are used.
 * - `name`: human-readable translation name (shown in the reference line).
 * - `psalms`: the book name in that language.
 * - `blessing`: "God bless you!" in that language.
 * - `dir`: text direction.
 */
export const LANGUAGES = Object.freeze({
  en: { language: 'English', translation: 'web', name: 'World English Bible', psalms: 'Psalms', blessing: 'God bless you!', dir: 'ltr' },
  pt: { language: 'Português', translation: 'livre', name: 'Bíblia Livre', psalms: 'Salmos', blessing: 'Deus abençoe você!', dir: 'ltr' },
  es: { language: 'Español', translation: 'valera', name: 'Reina-Valera 1909', psalms: 'Salmos', blessing: '¡Dios te bendiga!', dir: 'ltr' },
  fr: { language: 'Français', translation: 'ls1910', name: 'Louis Segond 1910', psalms: 'Psaumes', blessing: 'Que Dieu vous bénisse !', dir: 'ltr' },
  de: { language: 'Deutsch', translation: 'elberfelder1905', name: 'Elberfelder 1905', psalms: 'Psalm', blessing: 'Gott segne dich!', dir: 'ltr' },
  it: { language: 'Italiano', translation: 'riveduta', name: 'Riveduta 1927', psalms: 'Salmi', blessing: 'Dio ti benedica!', dir: 'ltr' },
  nl: { language: 'Nederlands', translation: 'statenvertaling', name: 'Statenvertaling', psalms: 'Psalmen', blessing: 'God zegene je!', dir: 'ltr' },
  ru: { language: 'Русский', translation: 'synodal', name: 'Синодальный перевод', psalms: 'Псалтирь', blessing: 'Благослови вас Бог!', dir: 'ltr' },
  uk: { language: 'Українська', translation: 'ukrogienko', name: 'Переклад Івана Огієнка', psalms: 'Псалми', blessing: 'Нехай Бог благословить вас!', dir: 'ltr' },
  pl: { language: 'Polski', translation: 'polgdanska', name: 'Biblia Gdańska', psalms: 'Psalmy', blessing: 'Niech Bóg cię błogosławi!', dir: 'ltr' },
  cs: { language: 'Čeština', translation: 'bkr', name: 'Bible kralická', psalms: 'Žalmy', blessing: 'Bůh vám žehnej!', dir: 'ltr' },
  ro: { language: 'Română', translation: 'cornilescu', name: 'Cornilescu', psalms: 'Psalmii', blessing: 'Dumnezeu să te binecuvânteze!', dir: 'ltr' },
  hu: { language: 'Magyar', translation: 'karoli', name: 'Károli Gáspár', psalms: 'Zsoltárok', blessing: 'Isten áldjon meg!', dir: 'ltr' },
  sv: { language: 'Svenska', translation: 'swedish', name: 'Bibeln 1917', psalms: 'Psaltaren', blessing: 'Gud välsigne dig!', dir: 'ltr' },
  da: { language: 'Dansk', translation: 'danish', name: 'Dansk Bibel', psalms: 'Salmernes Bog', blessing: 'Gud velsigne dig!', dir: 'ltr' },
  nb: { language: 'Norsk bokmål', translation: 'bibelselskap', name: 'Det Norske Bibelselskap 1930', psalms: 'Salmenes bok', blessing: 'Gud velsigne deg!', dir: 'ltr' },
  nn: { language: 'Norsk nynorsk', translation: 'norsmb', name: 'Studentmållagsbibelen 1921', psalms: 'Salmane', blessing: 'Gud velsigne deg!', dir: 'ltr' },
  fi: { language: 'Suomi', translation: 'pyharaamattu1933', name: 'Pyhä Raamattu 1933/1938', psalms: 'Psalmit', blessing: 'Jumala siunatkoon sinua!', dir: 'ltr' },
  el: { language: 'Ελληνικά', translation: 'moderngreek', name: 'Νεοελληνική μετάφραση', psalms: 'Ψαλμοί', blessing: 'Ο Θεός να σε ευλογεί!', dir: 'ltr' },
  he: { language: 'עברית', translation: 'codex', name: 'Westminster Leningrad Codex', psalms: 'תהלים', blessing: 'אלוהים יברך אותך!', dir: 'rtl' },
  ar: { language: 'العربية', translation: 'arabicsv', name: 'ترجمة فاندايك', psalms: 'المزامير', blessing: 'الله يباركك!', dir: 'rtl' },
  'zh-Hans': { language: '简体中文', translation: 'cus', name: '和合本（简体）', psalms: '诗篇', blessing: '愿上帝祝福你！', dir: 'ltr' },
  'zh-Hant': { language: '繁體中文', translation: 'cut', name: '和合本（繁體）', psalms: '詩篇', blessing: '願上帝祝福你！', dir: 'ltr' },
  ja: { language: '日本語', translation: 'japkougo', name: '口語訳', psalms: '詩篇', blessing: '神の祝福がありますように！', dir: 'ltr' },
  ko: { language: '한국어', translation: 'korean', name: '개역한글', psalms: '시편', blessing: '하나님께서 당신을 축복하시기를!', dir: 'ltr' },
  vi: { language: 'Tiếng Việt', translation: 'vietnamese', name: 'Kinh Thánh 1934', psalms: 'Thi Thiên', blessing: 'Chúa ban phước cho bạn!', dir: 'ltr' },
  tl: { language: 'Tagalog', translation: 'tagalog', name: 'Ang Dating Biblia 1905', psalms: 'Mga Awit', blessing: 'Pagpalain ka ng Diyos!', dir: 'ltr' },
  af: { language: 'Afrikaans', translation: 'aov', name: 'Ou Vertaling', psalms: 'Psalms', blessing: 'God seën jou!', dir: 'ltr' },
  sq: { language: 'Shqip', translation: 'alb', name: 'Bibla Shqip', psalms: 'Psalmet', blessing: 'Zoti të bekoftë!', dir: 'ltr' },
  hr: { language: 'Hrvatski', translation: 'croatia', name: 'Hrvatska Biblija', psalms: 'Psalmi', blessing: 'Bog te blagoslovio!', dir: 'ltr' },
  sr: { language: 'Српски', translation: 'srkdekavski', name: 'Даничић-Караџић', psalms: 'Псалми', blessing: 'Бог те благословио!', dir: 'ltr' },
  tr: { language: 'Türkçe', translation: 'turkish', name: 'Kutsal Kitap', psalms: 'Mezmurlar', blessing: 'Tanrı seni kutsasın!', dir: 'ltr' },
  th: { language: 'ไทย', translation: 'thai', name: 'พระคัมภีร์ไทย', psalms: 'สดุดี', blessing: 'ขอพระเจ้าอวยพรคุณ!', dir: 'ltr' },
  lt: { language: 'Lietuvių', translation: 'lithuanian', name: 'Lietuviškoji Biblija', psalms: 'Psalmynas', blessing: 'Tegul Dievas tave laimina!', dir: 'ltr' },
  eo: { language: 'Esperanto', translation: 'esperanto', name: 'Zamenhof', psalms: 'Psalmaro', blessing: 'Dio benu vin!', dir: 'ltr' },
  la: { language: 'Latina', translation: 'vulgate', name: 'Vulgata Clementina', psalms: 'Psalmi', blessing: 'Deus te benedicat!', dir: 'ltr' }
});

export const DEFAULT_LANGUAGE = 'en';

export const SUPPORTED_LANGUAGES = Object.freeze(Object.keys(LANGUAGES));

const ALIASES = { no: 'nb', iw: 'he', fil: 'tl', 'zh-tw': 'zh-Hant', 'zh-hk': 'zh-Hant', 'zh-mo': 'zh-Hant' };

/**
 * Normalize a locale tag ("pt-BR", "pt_BR.UTF-8", "zh-TW", "zh-Hant-HK")
 * to a supported language code, or `undefined` if not supported.
 */
export function normalizeLanguage(tag) {
  if (typeof tag !== 'string') return undefined;
  const clean = tag.trim().split(/[.@]/)[0].replace(/_/g, '-').toLowerCase();
  if (!clean || clean === 'c' || clean === 'posix') return undefined;

  if (clean.startsWith('zh')) {
    if (clean.includes('hant')) return 'zh-Hant';
    if (clean.includes('hans')) return 'zh-Hans';
    const region = clean.split('-').slice(0, 2).join('-');
    return ALIASES[region] || 'zh-Hans';
  }

  const base = clean.split('-')[0];
  const code = ALIASES[base] || base;
  return Object.hasOwn(LANGUAGES, code) ? code : undefined;
}
