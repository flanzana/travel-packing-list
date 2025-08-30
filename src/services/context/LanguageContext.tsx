import { createContext, type ReactNode, useContext, useEffect } from "react"
import { useTranslation } from "react-i18next"

import { Language } from "../../types"
import useLocalStorage from "../hooks/useLocalStorage"

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

  useEffect(() => {
    document.documentElement.lang = selectedLanguage
  }, [selectedLanguage])

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

export function useLanguage() {
  const context = useContext(LanguageContext)

  if (!context) {
    throw new Error("useLanguage must be used within the LanguageProvider.")
  }

  return context
}
