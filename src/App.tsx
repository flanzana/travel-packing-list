import { ChakraProvider, createSystem, defaultConfig, defineConfig } from "@chakra-ui/react"
import BottomNavbar from "./components/BottomNavbar"
import Footer from "./components/Footer"
import Main from "./components/Main"
import TopNavbar from "./components/TopNavbar"
import { LanguageProvider } from "./services/context/LanguageContext"

const config = defineConfig({
  globalCss: {
    html: {
      colorPalette: "gray",
    },
  },
})

const system = createSystem(defaultConfig, config)

const App = () => (
  <ChakraProvider value={system}>
    <LanguageProvider>
      <TopNavbar />
      <Main />
      <Footer />
      <BottomNavbar />
    </LanguageProvider>
  </ChakraProvider>
)

export default App
