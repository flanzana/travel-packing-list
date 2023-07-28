import { createContext, ReactNode, useContext } from "react"
import { useTranslation } from "react-i18next"

import useLocalStorage from "../hooks/useLocalStorage"
import { Language } from "../../types"

type LanguageContextType = {
  language: Language
  setLanguage: (language: Language) => void
}

const LanguageContext = createContext<LanguageContextType | null>(null)

type LanguageProviderProps = {
  children: ReactNode
}

export const LanguageProvider = ({ children }: LanguageProviderProps): ReactNode => {
  const [selectedLanguage, setSelectedLanguage] = useLocalStorage<Language>(
    "travel-packing-list:language",
    Language.ENGLISH,
  )
  const { i18n } = useTranslation()

  const handleSetLanguage = (language: Language) => {
    setSelectedLanguage(language)
    i18n.changeLanguage(language)
  }

  return (
    <LanguageContext.Provider
      value={{
        language: selectedLanguage,
        setLanguage: handleSetLanguage,
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

// example in official React doc keeps hook within context/provider file
// eslint-disable-next-line react-refresh/only-export-components
export function useLanguage() {
  const context = useContext(LanguageContext)

  if (!context) {
    throw new Error("useLanguage must be used within the LanguageProvider.")
  }

  return context
}
