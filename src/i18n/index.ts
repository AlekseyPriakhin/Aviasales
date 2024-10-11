import ru from '@/i18n/keysets/ru.json';
import en from '@/i18n/keysets/en.json';
import { I18N } from '@gravity-ui/i18n';

const LOCALES = {
  ru: 'ru',
  en: 'en',
} as const;

export type Locale = keyof typeof LOCALES;
export type Keyset = typeof ru;

export const isLocale = (value: any): value is Locale => {
  return value && typeof value === 'string' && ([LOCALES.en, LOCALES.ru] as Locale[]).includes(value as any);
};

// const userLang = navigator.language.split('-')[0] ?? 'ru';
export const defaultLocale: Locale = isLocale('ru') ? 'ru' : 'ru';

const i18n = new I18N();

i18n.registerKeysets(LOCALES.ru, ru);
i18n.registerKeysets(LOCALES.en, en);

i18n.setLang(defaultLocale);
// i18n.setFallbackLang(LOCALES.en);

export default i18n;
