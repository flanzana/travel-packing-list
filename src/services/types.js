// @flow
import { EDIT_MODE, LANGUAGES, LIST_CATEGORIES } from "./consts"

export type ListCategory = $Values<typeof LIST_CATEGORIES>

export type Language = $Values<typeof LANGUAGES>

export type EditMode = $Values<typeof EDIT_MODE>
