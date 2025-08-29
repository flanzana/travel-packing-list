import { useTranslation } from "react-i18next"

import { ListCategory } from "../../types"

const useTranslatedCategory = (category: ListCategory): string => {
  const { t } = useTranslation()

  switch (category) {
    case ListCategory.ESSENTIALS:
      return t("category.essentials")
    case ListCategory.TOILETRIES:
      return t("category.toiletries")
    case ListCategory.OTHER:
      return t("category.other")
    case ListCategory.CLOTHES:
      return t("category.clothes")
    default:
      throw new Error("Invalid category")
  }
}

export default useTranslatedCategory
