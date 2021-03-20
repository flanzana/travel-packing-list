// @flow
import React from "react"
import { useTranslation } from "react-i18next"

import useLocalStorage from "../hooks/useLocalStorage"
import { LANGUAGES } from "../consts"
import type { Language } from "../types"

type LanguageContextType = {|
  language: Language,
  setLanguage: Language => void,
|}

const LanguageContext = React.createContext<LanguageContextType | null>(null)

type LanguageProviderProps = {|
  children: React$Node,
|}

const LanguageProvider = ({ children }: LanguageProviderProps): React$Node => {
  const [selectedLanguage, setSelectedLanguage] = useLocalStorage<Language>(
    "travel-packing-list:language",
    LANGUAGES.ENGLISH,
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

export const useLanguage = (): LanguageContextType => {
  const context = React.useContext(LanguageContext)

  if (!context) {
    throw new Error("useLanguage must be used within the LanguageProvider.")
  }

  return context
}

export default LanguageProvider
