import { ReactNode } from "react"
import { Spa, Suitcase, Wallet, TermsAndConditions } from "@kiwicom/orbit-components/lib/icons"

import { ListCategory } from "../types"

type Props = {
  category: ListCategory
}

const CategoryIcon = ({ category }: Props): ReactNode => {
  switch (category) {
    case ListCategory.ESSENTIALS:
      return <Wallet ariaHidden size="large" />
    case ListCategory.TOILETRIES:
      return <Spa ariaHidden size="large" />
    case ListCategory.OTHER:
      return <TermsAndConditions ariaHidden size="large" />
    case ListCategory.CLOTHES:
    default:
      return <Suitcase ariaHidden size="large" />
  }
}

export default CategoryIcon
