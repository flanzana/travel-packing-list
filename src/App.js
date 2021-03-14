// @flow
import React from "react"
import { useTranslation } from "react-i18next"
import ThemeProvider from "@kiwicom/orbit-components/lib/ThemeProvider"
import defaultTheme from "@kiwicom/orbit-components/lib/defaultTheme"

import Header from "./components/Header"
import Main from "./components/Main"
import Footer from "./components/Footer"
import NavbarWithSidebar from "./components/NavbarWithSidebar/NavbarWithSidebar"
import LanguageProvider from "./services/providers/LanguageProvider"

function App(): React$Node {
  const { t } = useTranslation()

  return (
    <ThemeProvider
      theme={{ ...defaultTheme }}
      dictionary={{
        button_close: t("button.close"),
      }}
    >
      <LanguageProvider>
        <>
          <NavbarWithSidebar />
          <Header />
          <Main />
          <Footer />
        </>
      </LanguageProvider>
    </ThemeProvider>
  )
}

export default App
