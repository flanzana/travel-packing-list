import OrbitProvider from "@kiwicom/orbit-components/lib/OrbitProvider"
import defaultTheme from "@kiwicom/orbit-components/lib/defaultTheme"
import { render } from "@testing-library/react"
import React, { type ReactElement, useId } from "react"
import { I18nextProvider } from "react-i18next"

import i18n from "../../i18n"
import { LanguageProvider } from "../context/LanguageContext"

const renderWithProviders = (component: ReactElement) => {
  const comp = React.cloneElement(component, {
    changeLanguage: (lng: string) => {
      i18n.changeLanguage(lng)
      rerender(
        <I18nextProvider i18n={i18n}>
          <OrbitProvider theme={{ ...defaultTheme }} useId={useId}>
            <style>
              .invisible &#123; display: none; &#125; .hidden &#123; display: none; &#125;
            </style>
            <LanguageProvider>{comp}</LanguageProvider>
          </OrbitProvider>
        </I18nextProvider>,
      )
    },
  })
  const defaultRender = render(
    <I18nextProvider i18n={i18n}>
      <OrbitProvider theme={{ ...defaultTheme }} useId={useId}>
        <style>.invisible &#123; display: none; &#125; .hidden &#123; display: none; &#125;</style>
        <LanguageProvider>{comp}</LanguageProvider>
      </OrbitProvider>
    </I18nextProvider>,
  )
  const { rerender } = defaultRender
  return defaultRender
}

export default renderWithProviders
