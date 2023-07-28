import { ReactNode } from "react"
import { useTranslation } from "react-i18next"
import Stack from "@kiwicom/orbit-components/lib/Stack"
import Heading from "@kiwicom/orbit-components/lib/Heading"
import Illustration from "@kiwicom/orbit-components/lib/Illustration"
import useMediaQuery from "@kiwicom/orbit-components/lib/hooks/useMediaQuery"

import LanguagePicker from "../LanguagePicker"

const NavbarContent = (): ReactNode => {
  const { t } = useTranslation()
  const { isLargeMobile } = useMediaQuery()

  return (
    <Stack direction="row" align="center" justify="between">
      <Stack
        direction="row"
        align="center"
        justify="center"
        spacing="XSmall"
        shrink
        largeMobile={{ spacing: "medium", justify: "start" }}
      >
        <Illustration name="CabinBaggage" size="extraSmall" alt="" />
        <Heading type="title3" as="h1">
          {t("title")}
        </Heading>
      </Stack>
      {isLargeMobile && <LanguagePicker />}
    </Stack>
  )
}

export default NavbarContent
