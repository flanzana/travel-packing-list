// @flow
import { EDIT_MODE, LANGUAGES, LIST_CATEGORIES } from "./consts"

export type ListCategory = $Values<typeof LIST_CATEGORIES>

export type Language = $Values<typeof LANGUAGES>

export type EditMode = $Values<typeof EDIT_MODE>

type LanguageData = {|
  value: Language,
  flagCode: "gb" | "es" | "si",
  title: "English" | "Español" | "Slovenščina",
|}

export type LanguagesData = {|
  [key: Language]: LanguageData,
|}

export type CardItem = {|
  tKey: string,
  isChecked: boolean,
|}

export type CardItems = Array<CardItem>
