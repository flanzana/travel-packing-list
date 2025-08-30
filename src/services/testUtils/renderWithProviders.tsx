import defaultTheme from "@kiwicom/orbit-components/lib/defaultTheme"
import OrbitProvider from "@kiwicom/orbit-components/lib/OrbitProvider"
import { render } from "@testing-library/react"
import { type ReactElement, useId } from "react"
import { I18nextProvider } from "react-i18next"

import i18n from "../../i18n"
import { LanguageProvider } from "../context/LanguageContext"

const renderWithProviders = (component: ReactElement) => {
  return render(
    <I18nextProvider i18n={i18n}>
      <OrbitProvider theme={{ ...defaultTheme }} useId={useId}>
        <style>.invisible &#123; display: none; &#125; .hidden &#123; display: none; &#125;</style>
        <LanguageProvider>{component}</LanguageProvider>
      </OrbitProvider>
    </I18nextProvider>,
  )
}

export default renderWithProviders
