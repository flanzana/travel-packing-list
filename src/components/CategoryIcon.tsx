import Spa from "@kiwicom/orbit-components/lib/icons/Spa"
import Suitcase from "@kiwicom/orbit-components/lib/icons/Suitcase"
import TermsAndConditions from "@kiwicom/orbit-components/lib/icons/TermsAndConditions"
import Wallet from "@kiwicom/orbit-components/lib/icons/Wallet"
import type { ReactNode } from "react"
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
      return <Suitcase ariaHidden size="large" />
    default:
      throw new Error("Invalid category")
  }
}

export default CategoryIcon
