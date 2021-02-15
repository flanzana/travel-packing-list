// @flow
import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import CountryFlag from "@kiwicom/orbit-components/lib/CountryFlag"
import LinkList from "@kiwicom/orbit-components/lib/LinkList"
import Button from "@kiwicom/orbit-components/lib/Button"
import Popover from "@kiwicom/orbit-components/lib/Popover"
import { ChevronDown, ChevronUp } from "@kiwicom/orbit-components/lib/icons"

import { LANGUAGES, LANGUAGES_DATA } from "../services/consts"
import useLocalStorage from "../services/hooks/useLocalStorage"
import type { Language } from "../services/types"
import LanguageLink from "./LanguageLink"

const LanguagePicker = () => {
  const [selectedLanguage, setSelectedLanguage] = useLocalStorage(
    "selected-language",
    LANGUAGES.ENGLISH,
  )
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  const { i18n } = useTranslation()

  const handleChangeLanguage = (language: Language) => {
    setSelectedLanguage(language)
    i18n.changeLanguage(language)
    setIsPopoverOpen(false)
  }

  const togglePopover = () => {
    setIsPopoverOpen(!isPopoverOpen)
  }

  return (
    <Popover
      opened={isPopoverOpen}
      onClose={() => setIsPopoverOpen(false)}
      content={
        <LinkList spacing="none">
          {Object.keys(LANGUAGES_DATA).map(lang => (
            <LanguageLink key={lang} language={lang} onClick={() => handleChangeLanguage(lang)} />
          ))}
        </LinkList>
      }
      preferredAlign="end"
    >
      <Button
        onClick={togglePopover}
        iconRight={isPopoverOpen ? <ChevronUp ariaHidden /> : <ChevronDown ariaHidden />}
        type="secondary"
        size="small"
        title={LANGUAGES_DATA[selectedLanguage].title}
      >
        <CountryFlag code={LANGUAGES_DATA[selectedLanguage].flagCode} name="" />
      </Button>
    </Popover>
  )
}

export default LanguagePicker
