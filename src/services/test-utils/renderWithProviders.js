// @flow
import React from "react"
import { I18nextProvider } from "react-i18next"
import ThemeProvider from "@kiwicom/orbit-components/lib/ThemeProvider"
import defaultTheme from "@kiwicom/orbit-components/lib/defaultTheme"
import { render } from "@testing-library/react"

import i18n from "../../i18n"
import LanguageProvider from "../providers/LanguageProvider"

// $FlowFixMe[signature-verification-failure] - RenderResult is untyped
const renderWithProviders = (component: React$Element<*>) => {
  const comp = React.cloneElement(component, {
    changeLanguage: lng => {
      i18n.changeLanguage(lng)
      rerender(
        <I18nextProvider i18n={i18n}>
          <ThemeProvider theme={{ ...defaultTheme }}>
            <LanguageProvider>{comp}</LanguageProvider>
          </ThemeProvider>
        </I18nextProvider>,
      )
    },
  })
  const defaultRender = render(
    <I18nextProvider i18n={i18n}>
      <ThemeProvider theme={{ ...defaultTheme }}>
        <LanguageProvider>{comp}</LanguageProvider>
      </ThemeProvider>
    </I18nextProvider>,
  )
  const { rerender } = defaultRender
  return defaultRender
}

export default renderWithProviders
