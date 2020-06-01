import i18n from "i18next"
import { initReactI18next } from "react-i18next"

import enTranslations from "./services/translations/en.json"
import siTranslations from "./services/translations/si.json"
import { ENGLISH } from "./services/consts"

// the translations
// (tip move them in a JSON file and import them)
const resources = {
  en: {
    translations: enTranslations,
  },
  si: {
    translations: siTranslations,
  },
}

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: window.localStorage.getItem("language") || ENGLISH,
    fallbackLng: ENGLISH,

    // have a common namespace used around the full app
    ns: ["translations"],
    defaultNS: "translations",

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  })

export default i18n
