// @flow
import React from "react"
import { ThemeProvider } from "styled-components"
import defaultTheme from "@kiwicom/orbit-components/lib/defaultTheme"

import Header from "./components/Header"
import Main from "./components/Main"
import Footer from "./components/Footer"

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <>
        <Header />
        <Main />
        <Footer />
      </>
    </ThemeProvider>
  )
}

export default App
