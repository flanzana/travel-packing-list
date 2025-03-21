import { ReactNode } from "react"
import Stack from "@kiwicom/orbit-components/lib/Stack"
import CountryFlag from "@kiwicom/orbit-components/lib/CountryFlag"
import TextLink from "@kiwicom/orbit-components/lib/TextLink"

import { LANGUAGES_DATA } from "../consts"
import type { Language } from "../types"

type Props = {
  onClick: () => void
  language: Language
}

const LanguageLink = ({ language, onClick }: Props): ReactNode => (
  <TextLink
    onClick={onClick}
    type="secondary"
    title={LANGUAGES_DATA[language].title}
    standAlone
    noUnderline
  >
    <Stack direction="row" align="center" spacing="200">
      <CountryFlag code={LANGUAGES_DATA[language].flagCode} name="" />
      <span>{LANGUAGES_DATA[language].title}</span>
    </Stack>
  </TextLink>
)

export default LanguageLink
