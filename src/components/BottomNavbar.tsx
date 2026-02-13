import { Box, HStack, IconButton, Text, VStack } from "@chakra-ui/react"
import type { ReactNode } from "react"
import { useTranslation } from "react-i18next"

import useTranslatedCategory from "../services/hooks/useTranslatedCategory"
import { ListCategory } from "../types"
import CategoryIcon from "./CategoryIcon"

type CategoryButtonProps = {
  category: ListCategory
}
const CategoryButton = ({ category }: CategoryButtonProps): ReactNode => {
  const { t } = useTranslation()
  const translatedCategory = useTranslatedCategory(category)

  return (
    <IconButton
      onClick={() => {
        const element = document.getElementById(category)
        return element?.scrollIntoView({ behavior: "smooth" })
      }}
      aria-label={t("button.scroll_to_list", { category: translatedCategory })}
      variant="ghost"
      justifyContent="center"
      alignItems="center"
      width="70px"
      height="50px"
    >
      <VStack gap="4px" align="center">
        <CategoryIcon category={category} />
        <Text
          fontSize="8px"
          fontWeight="medium"
          letterSpacing="0.5px"
          whiteSpace="wrap"
          lineHeight="1"
          textAlign="center"
        >
          {translatedCategory}
        </Text>
      </VStack>
    </IconButton>
  )
}

const BottomNavbar = (): ReactNode => (
  <Box
    as="nav"
    position="fixed"
    bottom="0"
    width="100%"
    height="50px"
    zIndex="sticky"
    bg="bg.panel"
    boxShadow="sm"
    display={{ base: "block", md: "none" }}
  >
    <HStack justify="space-around" align="center" gap={0}>
      {[
        ListCategory.ESSENTIALS,
        ListCategory.CLOTHES,
        ListCategory.TOILETRIES,
        ListCategory.OTHER,
      ].map(category => (
        <CategoryButton key={category} category={category} />
      ))}
    </HStack>
  </Box>
)

export default BottomNavbar
