import i18n from 'i18next';
import detector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import en from '@/app/languages/en/translations.json';
import fr from '@/app/languages/fr/translations.json';

const resources = {
  en: {
    translation: en,
  },
  fr: {
    translation: fr,
  },
};

const detectorOptions = {
  lookupCookie: 'blink_lng',
  lookupLocalStorage: 'blink_lng',
  lookupSessionStorage: 'blink_lng',
  caches: ['localStorage'],
};

i18n.use(detector).use(initReactI18next).init({
  detection: detectorOptions,
  resources,
  fallbackLng: 'fr',
});

export const availableLanguages = Object.keys(resources);
