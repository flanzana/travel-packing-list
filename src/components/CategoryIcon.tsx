import { Icon } from "@chakra-ui/react"
import type { ReactNode } from "react"
import { FaHeadphones, FaPassport, FaPumpSoap, FaTshirt } from "react-icons/fa"
import { ListCategory } from "../types"

type Props = {
  category: ListCategory
}

const CategoryIcon = ({ category }: Props): ReactNode => {
  switch (category) {
    case ListCategory.ESSENTIALS:
      return <Icon as={FaPassport} boxSize="20px" aria-hidden />
    case ListCategory.TOILETRIES:
      return <Icon as={FaPumpSoap} boxSize="20px" aria-hidden />
    case ListCategory.OTHER:
      return <Icon as={FaHeadphones} boxSize="20px" aria-hidden />
    case ListCategory.CLOTHES:
      return <Icon as={FaTshirt} boxSize="20px" aria-hidden />
    default:
      throw new Error("Invalid category")
  }
}

export default CategoryIcon
