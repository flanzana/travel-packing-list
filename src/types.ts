export enum ListCategory {
  ESSENTIALS = "essentials",
  CLOTHES = "clothes",
  TOILETRIES = "toiletries",
  OTHER = "other",
}

export enum Language {
  ENGLISH = "en",
  SPANISH = "es",
  SLOVENIAN = "sl", // as expected by html lang attribute
}

export enum EditMode {
  DEFAULT = "default",
  OPEN_SETTINGS = "openSettings",
  REMOVE_ITEMS = "removeItems",
  ADD_ITEM = "addItem",
}

type LanguageData = {
  value: Language
  flagEmoji: string
  title: "English" | "Español" | "Slovenščina"
}

export type LanguagesData = Record<Language, LanguageData>

export type CardItem = {
  tKey: string
  isChecked: boolean
}

export type CardItems = CardItem[]
