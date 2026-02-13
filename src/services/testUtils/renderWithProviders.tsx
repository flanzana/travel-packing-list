import { ChakraProvider, createSystem, defaultConfig } from "@chakra-ui/react"
import { render } from "@testing-library/react"
import type { ReactElement } from "react"
import { I18nextProvider } from "react-i18next"

import i18n from "../../i18n"
import { ColorModeProvider } from "../context/ColorModeContext"
import { LanguageProvider } from "../context/LanguageContext"

const system = createSystem(defaultConfig)

const renderWithProviders = (component: ReactElement) => {
  return render(
    <I18nextProvider i18n={i18n}>
      <ChakraProvider value={system}>
        <ColorModeProvider>
          <LanguageProvider>{component}</LanguageProvider>
        </ColorModeProvider>
      </ChakraProvider>
    </I18nextProvider>,
  )
}

export default renderWithProviders
