// @flow
import React, { useState } from "react"
import CountryFlag from "@kiwicom/orbit-components/lib/CountryFlag"
import LinkList from "@kiwicom/orbit-components/lib/LinkList"
import ButtonLink from "@kiwicom/orbit-components/lib/ButtonLink"
import Popover from "@kiwicom/orbit-components/lib/Popover"

import { LANGUAGES_DATA } from "../services/consts"
import type { Language } from "../services/types"
import { useLanguage } from "../services/providers/LanguageProvider"
import LanguageLink from "./LanguageLink"

const LanguagePicker = () => {
  const { language, setLanguage } = useLanguage()
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)

  const handleChangeLanguage = (lang: Language) => {
    setLanguage(lang)
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
      <ButtonLink onClick={togglePopover} type="secondary" title={LANGUAGES_DATA[language].title}>
        <CountryFlag code={LANGUAGES_DATA[language].flagCode} name="" />
      </ButtonLink>
    </Popover>
  )
}

export default LanguagePicker
