// @flow
import React from "react"
import { Camera, Spa, Suitcase, Wallet } from "@kiwicom/orbit-components/lib/icons"

import type { ListCategory } from "./types"
import { LIST_CATEGORIES } from "./consts"

export const renderCardIcon = (title: ListCategory): ?React$Node => {
  switch (title) {
    case LIST_CATEGORIES.ESSENTIALS:
      return <Wallet ariaHidden />
    case LIST_CATEGORIES.TOILETRIES:
      return <Spa ariaHidden />
    case LIST_CATEGORIES.OTHER:
      return <Camera ariaHidden />
    case LIST_CATEGORIES.CLOTHES:
    default:
      return <Suitcase ariaHidden />
  }
}

export const capitalize = (text: string): string => {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
}
