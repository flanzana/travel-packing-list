import { useId } from "react"
import OrbitProvider from "@kiwicom/orbit-components/lib/OrbitProvider"
import defaultTheme from "@kiwicom/orbit-components/lib/defaultTheme"

import Main from "./components/Main"
import Footer from "./components/Footer"
import NavbarWithSidebar from "./components/NavbarWithSidebar/NavbarWithSidebar"
import { LanguageProvider } from "./services/context/LanguageContext"

const App = () => (
  <OrbitProvider theme={{ ...defaultTheme }} useId={useId}>
    <LanguageProvider>
      <>
        <NavbarWithSidebar />
        <Main />
        <Footer />
      </>
    </LanguageProvider>
  </OrbitProvider>
)

export default App
