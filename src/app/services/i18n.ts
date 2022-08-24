import i18n from 'i18next';
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

i18n.use(initReactI18next).init({
  lng: 'fr',
  resources,
  fallbackLng: 'fr',
});

export const availableLanguages = Object.keys(resources);
