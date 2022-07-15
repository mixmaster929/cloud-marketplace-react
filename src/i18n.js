import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import detector from "i18next-browser-languagedetector";
import backend from "i18next-http-backend";



// Importing translation files

import translationEN from "./locales/en/translation.json";
import translationES from "./locales/es/translation.json";


//Creating object with the variables of imported translation files
const resources = {
  en: {
    translation: translationEN,
  },
  es: {
    translation: translationES,
  },
};

//i18N Initialization

i18n
  .use(detector)
  .use(backend)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en", // use en if detected lng is not available
    keySeparator: false,
    interpolation: {
      escapeValue: false,
    },

    // react-i18next options
    react: {
      wait: true
    }
  });

export default i18n;