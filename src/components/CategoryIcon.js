// @flow
import React from "react"
import { Spa, Suitcase, Wallet, TermsAndConditions } from "@kiwicom/orbit-components/lib/icons"

import { LIST_CATEGORIES } from "../services/consts"
import type { ListCategory } from "../services/types"

type Props = {|
  category: ListCategory,
|}

const CategoryIcon = ({ category }: Props): React$Node => {
  switch (category) {
    case LIST_CATEGORIES.ESSENTIALS:
      return <Wallet ariaHidden />
    case LIST_CATEGORIES.TOILETRIES:
      return <Spa ariaHidden />
    case LIST_CATEGORIES.OTHER:
      return <TermsAndConditions ariaHidden />
    case LIST_CATEGORIES.CLOTHES:
    default:
      return <Suitcase ariaHidden />
  }
}

export default CategoryIcon
