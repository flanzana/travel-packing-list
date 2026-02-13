import { ThemeProvider, useTheme } from "next-themes"
import { createContext, type ReactNode, useContext, useMemo } from "react"

export type ColorMode = "light" | "dark"

type ColorModeContextType = {
  colorMode: ColorMode
  setColorMode: (mode: ColorMode | "system") => void
  toggleColorMode: () => void
}

const ColorModeContext = createContext<ColorModeContextType | null>(null)

type ColorModeProviderProps = {
  children: ReactNode
}

function ColorModeContextInner({ children }: { children: ReactNode }): ReactNode {
  const { setTheme, resolvedTheme } = useTheme()
  const colorMode = (resolvedTheme ?? "light") as ColorMode
  const value = useMemo(
    () => ({
      colorMode,
      setColorMode: setTheme,
      toggleColorMode: () => setTheme(colorMode === "dark" ? "light" : "dark"),
    }),
    [colorMode, setTheme],
  )
  return <ColorModeContext.Provider value={value}>{children}</ColorModeContext.Provider>
}

export const ColorModeProvider = ({ children }: ColorModeProviderProps): ReactNode => (
  <ThemeProvider
    attribute="class"
    defaultTheme="system"
    storageKey="travel-packing-list:color-mode"
    disableTransitionOnChange
  >
    <ColorModeContextInner>{children}</ColorModeContextInner>
  </ThemeProvider>
)

export function useColorMode(): ColorModeContextType {
  const context = useContext(ColorModeContext)

  if (!context) {
    throw new Error("useColorMode must be used within the ColorModeProvider.")
  }

  return context
}
