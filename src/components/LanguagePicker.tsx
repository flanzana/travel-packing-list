import ButtonLink from "@kiwicom/orbit-components/lib/ButtonLink"
import CountryFlag from "@kiwicom/orbit-components/lib/CountryFlag"
import LinkList from "@kiwicom/orbit-components/lib/LinkList"
import Popover from "@kiwicom/orbit-components/lib/Popover"
import { type ReactNode, useState } from "react"
import { useTranslation } from "react-i18next"

import { LANGUAGES_DATA } from "../consts"
import { useLanguage } from "../services/context/LanguageContext"
import { Language } from "../types"
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
      ariaLabel={t("sidebar.title.language")}
      labelClose={t("button.close")}
    >
      <ButtonLink asComponent="div" type="secondary">
        <CountryFlag
          code={LANGUAGES_DATA[language].flagCode}
          name={LANGUAGES_DATA[language].title}
        />
      </ButtonLink>
    </Popover>
  )
}

export default LanguagePicker
