// @flow
import i18n from "i18next"
import { initReactI18next } from "react-i18next"

import enTranslations from "./services/translations/en.json"
import siTranslations from "./services/translations/si.json"
import esTranslations from "./services/translations/es.json"
import { LANGUAGES } from "./services/consts"

// the translations
// (tip move them in a JSON file and import them)
const resources = {
  [LANGUAGES.ENGLISH]: {
    translations: enTranslations,
  },
  [LANGUAGES.SPANISH]: {
    translations: esTranslations,
  },
  [LANGUAGES.SLOVENIAN]: {
    translations: siTranslations,
  },
}

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng:
      JSON.parse(window.localStorage.getItem("travel-packing-list:language")) || LANGUAGES.ENGLISH,
    fallbackLng: LANGUAGES.ENGLISH,

    // have a common namespace used around the full app
    ns: ["translations"],
    defaultNS: "translations",

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  })

export default i18n
