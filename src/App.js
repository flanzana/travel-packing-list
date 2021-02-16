// @flow
import React from "react"
import { ThemeProvider } from "styled-components"
import defaultTheme from "@kiwicom/orbit-components/lib/defaultTheme"

import Header from "./components/Header"
import Main from "./components/Main"
import Footer from "./components/Footer"
import NavbarWithSidebar from "./components/NavbarWithSidebar/NavbarWithSidebar"
import LanguageProvider from "./services/providers/LanguageProvider"

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
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
