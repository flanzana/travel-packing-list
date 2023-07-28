import { useState, ReactNode } from "react"
import { useTranslation } from "react-i18next"
import CountryFlag from "@kiwicom/orbit-components/lib/CountryFlag"
import LinkList from "@kiwicom/orbit-components/lib/LinkList"
import ButtonLink from "@kiwicom/orbit-components/lib/ButtonLink"
import Popover from "@kiwicom/orbit-components/lib/Popover"

import { LANGUAGES_DATA } from "../consts"
import { Language } from "../types"
import { useLanguage } from "../services/context/LanguageContext"
import LanguageLink from "./LanguageLink"

const LanguagePicker = (): ReactNode => {
  const { t } = useTranslation()
  const { language, setLanguage } = useLanguage()
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)

  const handleChangeLanguage = (lang: Language) => {
    setLanguage(lang)
    setIsPopoverOpen(false)
  }

  return (
    <Popover
      opened={isPopoverOpen}
      onOpen={() => setIsPopoverOpen(true)}
      onClose={() => setIsPopoverOpen(false)}
      content={
        <LinkList spacing="none">
          {Object.values(Language).map(lang => (
            <LanguageLink key={lang} language={lang} onClick={() => handleChangeLanguage(lang)} />
          ))}
        </LinkList>
      }
      placement="bottom-end"
      fixed
      labelClose={t("button.close")}
    >
      <ButtonLink type="secondary" title={LANGUAGES_DATA[language].title}>
        <CountryFlag code={LANGUAGES_DATA[language].flagCode} name="" />
      </ButtonLink>
    </Popover>
  )
}

export default LanguagePicker
