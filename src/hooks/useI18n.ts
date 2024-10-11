import i18n, { defaultLocale } from '@/i18n';
import { useState } from 'react';
import type { Keyset, Locale } from '@/i18n';

export const useI18n = () => {
  const [locale, setLocale] = useState<Locale>(defaultLocale);

  const changeLocale = (newLocale: Locale) => {
    i18n.setLang(newLocale);
    setLocale(newLocale);
  };

  const t = <K1 extends keyof Keyset, K2 extends keyof Keyset[K1]>(keyset: K1, key: K2, params = {}) =>
    i18n.i18n(keyset, String(key), params);

  return { locale, changeLocale, t };
};
