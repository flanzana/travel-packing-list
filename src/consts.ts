import type { ColorPalette } from "@chakra-ui/react"
import { Language, type LanguagesData } from "./types"

export const LANGUAGES_DATA: LanguagesData = {
  [Language.ENGLISH]: {
    value: Language.ENGLISH,
    flagEmoji: "🇬🇧",
    title: "English",
  },
  [Language.SPANISH]: {
    value: Language.SPANISH,
    flagEmoji: "🇪🇸",
    title: "Español",
  },
  [Language.SLOVENIAN]: {
    value: Language.SLOVENIAN,
    flagEmoji: "🇸🇮",
    title: "Slovenščina",
  },
}

export const PRIMARY_COLOR_PALETTE: ColorPalette = "teal"
