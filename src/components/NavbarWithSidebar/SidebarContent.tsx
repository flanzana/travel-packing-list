import { ReactNode } from "react"
import { useTranslation } from "react-i18next"
import LinkList from "@kiwicom/orbit-components/lib/LinkList"
import TextLink from "@kiwicom/orbit-components/lib/TextLink"
import Stack from "@kiwicom/orbit-components/lib/Stack"
import Heading from "@kiwicom/orbit-components/lib/Heading"
import Separator from "@kiwicom/orbit-components/lib/Separator"
import { Code } from "@kiwicom/orbit-components/lib/icons"

import LanguageLink from "../LanguageLink"
import { Language } from "../../types"
import { useLanguage } from "../../services/context/LanguageContext"

type SidebarContentPartProps = {
  title: string
  children: ReactNode
}
const SidebarContentPart = ({ title, children }: SidebarContentPartProps): ReactNode => (
  <>
    <Separator />
    <Stack>
      <Heading type="title5">{title}</Heading>
      <LinkList indent spacing="none">
        {children}
      </LinkList>
    </Stack>
  </>
)

type AboutLinkProps = {
  href: string
  label: string
}
const AboutLink = ({ href, label }: AboutLinkProps): ReactNode => (
  <TextLink href={href} type="secondary" title={label} standAlone external noUnderline>
    <Stack direction="row" align="center" spacing="XSmall">
      <Code size="small" />
      <span>{label}</span>
    </Stack>
  </TextLink>
)

type Props = {
  closeSidebar: () => void
}

const SidebarContent = ({ closeSidebar }: Props): ReactNode => {
  const { t } = useTranslation()
  const { setLanguage } = useLanguage()

  const handleChangeLanguage = (language: Language) => {
    setLanguage(language)
    closeSidebar()
  }

  return (
    <Stack dataTest="SidebarContent">
      <SidebarContentPart title={t("sidebar.title.language")}>
        {Object.values(Language).map(lang => (
          <LanguageLink key={lang} language={lang} onClick={() => handleChangeLanguage(lang)} />
        ))}
      </SidebarContentPart>
      <SidebarContentPart title={t("sidebar.title.more_about")}>
        <AboutLink label="Žana Flander" href="https://flanzana.github.io/" />
        <AboutLink label="Design system Orbit" href="https://orbit.kiwi" />
      </SidebarContentPart>
    </Stack>
  )
}

export default SidebarContent
