// @flow
import { useTranslation } from "react-i18next"

import { LIST_CATEGORIES } from "../consts"
import type { ListCategory } from "../types"

const useTranslatedCategory = (category: ListCategory): string => {
  const { t } = useTranslation()

  switch (category) {
    case LIST_CATEGORIES.ESSENTIALS:
      return t("category.essentials")
    case LIST_CATEGORIES.TOILETRIES:
      return t("category.toiletries")
    case LIST_CATEGORIES.OTHER:
      return t("category.other")
    case LIST_CATEGORIES.CLOTHES:
    default:
      return t("category.clothes")
  }
}

export default useTranslatedCategory
