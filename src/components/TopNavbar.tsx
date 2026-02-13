import { Box, Heading, HStack } from "@chakra-ui/react"
import type { ReactNode } from "react"
import { useTranslation } from "react-i18next"

import ColorModeButton from "./ColorModeButton"
import LanguagePicker from "./LanguagePicker"

const TopNavbar = (): ReactNode => {
  const { t } = useTranslation()

  return (
    <Box
      as="header"
      position="fixed"
      top="0"
      width="100%"
      zIndex="sticky"
      bg="bg.panel"
      boxShadow="sm"
      height="60px"
      p="12px 16px"
    >
      <HStack align="center" justify="space-between" width="100%">
        <Heading as="h1" size="lg" textTransform="uppercase" fontWeight="bold">
          {t("title")}
        </Heading>
        <HStack gap="12px">
          <ColorModeButton />
          <LanguagePicker />
        </HStack>
      </HStack>
    </Box>
  )
}

export default TopNavbar
