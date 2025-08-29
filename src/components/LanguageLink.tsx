import CountryFlag from "@kiwicom/orbit-components/lib/CountryFlag"
import Stack from "@kiwicom/orbit-components/lib/Stack"
import TextLink from "@kiwicom/orbit-components/lib/TextLink"
import type { ReactNode } from "react"

import { LANGUAGES_DATA } from "../consts"
import type { Language } from "../types"

type Props = {
  onClick: () => void
  language: Language
}

const LanguageLink = ({ language, onClick }: Props): ReactNode => (
  <TextLink onClick={onClick} type="secondary" standAlone noUnderline>
    <Stack direction="row" align="center" spacing="200">
      <CountryFlag
        code={LANGUAGES_DATA[language].flagCode}
        name={LANGUAGES_DATA[language].flagCode}
      />
      <span>{LANGUAGES_DATA[language].title}</span>
    </Stack>
  </TextLink>
)

export default LanguageLink
