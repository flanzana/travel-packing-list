import {
  Button,
  HStack,
  IconButton,
  Popover,
  Portal,
  usePopoverContext,
  VStack,
} from "@chakra-ui/react"
import type { ReactNode } from "react"
import { useTranslation } from "react-i18next"

import { LANGUAGES_DATA } from "../consts"
import { useLanguage } from "../services/context/LanguageContext"
import { Language } from "../types"

type LanguageLinkProps = {
  language: Language
}

const LanguageLink = ({ language }: LanguageLinkProps): ReactNode => {
  const { setLanguage } = useLanguage()
  const { setOpen } = usePopoverContext()

  const handleChangeLanguage = (lang: Language) => {
    setLanguage(lang)
    setOpen(false)
  }

  return (
    <Button onClick={() => handleChangeLanguage(language)} variant="ghost" size="sm" rounded="md">
      <HStack gap="8px" align="center">
        <span aria-hidden>{LANGUAGES_DATA[language].flagEmoji}</span>
        <span lang={language}>{LANGUAGES_DATA[language].title}</span>
      </HStack>
    </Button>
  )
}

const LanguagePicker = (): ReactNode => {
  const { t } = useTranslation()
  const { language } = useLanguage()

  return (
    <Popover.Root positioning={{ placement: "bottom-end" }} size="xs">
      <Popover.Trigger asChild>
        <IconButton
          variant="ghost"
          size="sm"
          aria-label={LANGUAGES_DATA[language].title}
          rounded="md"
          fontSize="20px"
        >
          {LANGUAGES_DATA[language].flagEmoji}
        </IconButton>
      </Popover.Trigger>
      <Portal>
        <Popover.Positioner>
          <Popover.Content width="160px" aria-label={t("navbar.language")}>
            <Popover.Body>
              <VStack gap="4px" align="stretch">
                {Object.values(Language).map(lang => (
                  <LanguageLink key={lang} language={lang} />
                ))}
              </VStack>
            </Popover.Body>
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  )
}

export default LanguagePicker
