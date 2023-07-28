import { Language, LanguagesData } from "./types"

export const LANGUAGES_DATA: LanguagesData = {
  [Language.ENGLISH]: {
    value: Language.ENGLISH,
    flagCode: "gb",
    title: "English",
  },
  [Language.SPANISH]: {
    value: Language.SPANISH,
    flagCode: "es",
    title: "Español",
  },
  [Language.SLOVENIAN]: {
    value: Language.SLOVENIAN,
    flagCode: "si",
    title: "Slovenščina",
  },
}

export const BOTTOM_NAVBAR_HEIGHT = 50 // px
