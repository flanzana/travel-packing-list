// @flow
import React, { useState } from "react"
import CountryFlag from "@kiwicom/orbit-components/lib/CountryFlag"
import LinkList from "@kiwicom/orbit-components/lib/LinkList"
import Button from "@kiwicom/orbit-components/lib/Button"
import Popover from "@kiwicom/orbit-components/lib/Popover"
import { ChevronDown, ChevronUp } from "@kiwicom/orbit-components/lib/icons"

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
      <Button
        onClick={togglePopover}
        iconRight={isPopoverOpen ? <ChevronUp ariaHidden /> : <ChevronDown ariaHidden />}
        type="secondary"
        size="small"
        title={LANGUAGES_DATA[language].title}
      >
        <CountryFlag code={LANGUAGES_DATA[language].flagCode} name="" />
      </Button>
    </Popover>
  )
}

export default LanguagePicker
