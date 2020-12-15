// @flow
import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import Stack from "@kiwicom/orbit-components/lib/Stack"
import CountryFlag from "@kiwicom/orbit-components/lib/CountryFlag"
import ButtonLink from "@kiwicom/orbit-components/lib/ButtonLink"
import Button from "@kiwicom/orbit-components/lib/Button"
import Popover from "@kiwicom/orbit-components/lib/Popover"
import { ChevronDown, ChevronUp } from "@kiwicom/orbit-components/lib/icons"
import useMediaQuery from "@kiwicom/orbit-components/lib/hooks/useMediaQuery"

import { LANGUAGES, LANGUAGES_DATA } from "../services/consts"
import useLocalStorage from "../services/hooks/useLocalStorage"
import type { Language } from "../services/types"

const LanguagePicker = () => {
  const [selectedLanguage, setSelectedLanguage] = useLocalStorage(
    "selected-language",
    LANGUAGES.ENGLISH,
  )
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  const { isLargeMobile } = useMediaQuery()
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
      onOpen={() => setIsPopoverOpen(true)}
      onClose={() => setIsPopoverOpen(false)}
      content={
        <Stack direction="column" spacing="XSmall" tablet={{ spacing: "XXSmall" }}>
          {Object.keys(LANGUAGES_DATA).map(language => (
            <ButtonLink
              key={language}
              iconLeft={
                <CountryFlag
                  code={LANGUAGES_DATA[language].flagCode}
                  name={LANGUAGES_DATA[language].title}
                />
              }
              onClick={() => handleChangeLanguage(language)}
              size="small"
              type="secondary"
              width="100%"
            >
              {LANGUAGES_DATA[language].title}
            </ButtonLink>
          ))}
        </Stack>
      }
      preferredAlign="end"
    >
      <Button
        onClick={togglePopover}
        iconRight={isPopoverOpen ? <ChevronUp /> : <ChevronDown />}
        type="secondary"
        size="small"
        title={LANGUAGES_DATA[selectedLanguage].title}
      >
        <Stack direction="row" align="center" spacing="XSmall">
          <CountryFlag
            code={LANGUAGES_DATA[selectedLanguage].flagCode}
            name={LANGUAGES_DATA[selectedLanguage].title}
          />
          {isLargeMobile && <span>{LANGUAGES_DATA[selectedLanguage].title}</span>}
        </Stack>
      </Button>
    </Popover>
  )
}

export default LanguagePicker
