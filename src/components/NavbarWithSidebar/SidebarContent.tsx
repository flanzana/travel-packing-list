import Heading from "@kiwicom/orbit-components/lib/Heading"
import Code from "@kiwicom/orbit-components/lib/icons/Code"
import LinkList from "@kiwicom/orbit-components/lib/LinkList"
import Separator from "@kiwicom/orbit-components/lib/Separator"
import Stack from "@kiwicom/orbit-components/lib/Stack"
import TextLink from "@kiwicom/orbit-components/lib/TextLink"
import type { ReactNode } from "react"
import { useTranslation } from "react-i18next"

import { useLanguage } from "../../services/context/LanguageContext"
import { Language } from "../../types"
import LanguageLink from "../LanguageLink"

type SidebarContentPartProps = {
  title: string
  children: ReactNode
}
const SidebarContentPart = ({ title, children }: SidebarContentPartProps): ReactNode => (
  <>
    <Separator />
    <Stack>
      <Heading type="title4" as="h2">
        {title}
      </Heading>
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
    <Stack direction="row" align="center" spacing="200">
      <Code size="small" ariaHidden />
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
