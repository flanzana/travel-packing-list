import { IconButton } from "@chakra-ui/react"
import { useTranslation } from "react-i18next"
import { FaMoon, FaSun } from "react-icons/fa"

import { useColorMode } from "../services/context/ColorModeContext"

const ColorModeButton = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const { t } = useTranslation()
  const isDark = colorMode === "dark"

  return (
    <IconButton
      aria-label={isDark ? t("button.light_mode") : t("button.dark_mode")}
      size="sm"
      variant="ghost"
      rounded="md"
      onClick={toggleColorMode}
    >
      {isDark ? <FaSun aria-hidden /> : <FaMoon aria-hidden />}
    </IconButton>
  )
}

export default ColorModeButton
