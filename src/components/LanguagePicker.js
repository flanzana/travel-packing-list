// @flow
import React, { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import Stack from "@kiwicom/orbit-components/lib/Stack"
import CountryFlag from "@kiwicom/orbit-components/lib/CountryFlag"
import ButtonLink from "@kiwicom/orbit-components/lib/ButtonLink"
import Button from "@kiwicom/orbit-components/lib/Button"
import Popover from "@kiwicom/orbit-components/lib/Popover"
import { ChevronDown, ChevronUp } from "@kiwicom/orbit-components/lib/icons"

import { LANGUAGES, LANGUAGES_DATA } from "../services/consts"

function LanguagePicker() {
  const initialLanguage = () => window.localStorage.getItem("language") || LANGUAGES.ENGLISH
  const [selectedLanguage, setSelectedLanguage] = useState(initialLanguage)
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)

  useEffect(() => {
    window.localStorage.setItem("language", selectedLanguage)
  }, [selectedLanguage])

  const { i18n } = useTranslation()

  const changeLanguage = lang => {
    setSelectedLanguage(lang)
    i18n.changeLanguage(lang)
    setIsPopoverOpen(false)
  }

  const togglePopover = () => {
    setIsPopoverOpen(!isPopoverOpen)
  }

  return (
    <Popover
      opened={isPopoverOpen}
      onOpen={() => setIsPopoverOpen(true)}
      onClose={() => setIsPopoverOpen(false)}
      content={
        <Stack direction="column" spacing="condensed" tablet={{ spacing: "tight" }}>
          {Object.keys(LANGUAGES_DATA).map(lang => (
            <ButtonLink
              key={lang}
              iconLeft={
                <CountryFlag
                  code={LANGUAGES_DATA[lang].flagCode}
                  name={LANGUAGES_DATA[lang].title}
                />
              }
              onClick={() => changeLanguage(lang)}
              size="small"
              type="secondary"
              width="100%"
            >
              {LANGUAGES_DATA[lang].title}
            </ButtonLink>
          ))}
        </Stack>
      }
    >
      <Button
        onClick={togglePopover}
        iconRight={isPopoverOpen ? <ChevronUp /> : <ChevronDown />}
        type="secondary"
        size="small"
        title={LANGUAGES_DATA[selectedLanguage].title}
      >
        <CountryFlag
          code={LANGUAGES_DATA[selectedLanguage].flagCode}
          name={LANGUAGES_DATA[selectedLanguage].title}
        />
      </Button>
    </Popover>
  )
}

export default LanguagePicker
