import i18n from "i18next"
import { initReactI18next } from "react-i18next"

import enTranslations from "./assets/translations/en.json"
import esTranslations from "./assets/translations/es.json"
import siTranslations from "./assets/translations/si.json"
import { Language } from "./types"

// the translations
// (tip move them in a JSON file and import them)
const resources = {
  [Language.ENGLISH]: {
    translations: enTranslations,
  },
  [Language.SPANISH]: {
    translations: esTranslations,
  },
  [Language.SLOVENIAN]: {
    translations: siTranslations,
  },
}

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: window.localStorage.getItem("travel-packing-list:language")
      ? JSON.parse(window.localStorage.getItem("travel-packing-list:language") as string)
      : Language.ENGLISH,
    fallbackLng: Language.ENGLISH,

    // have a common namespace used around the full app
    ns: ["translations"],
    defaultNS: "translations",

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  })

export default i18n
