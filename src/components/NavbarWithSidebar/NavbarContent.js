// @flow
import React from "react"
import styled from "styled-components"
import { useTranslation } from "react-i18next"
import Stack from "@kiwicom/orbit-components/lib/Stack"
import Heading from "@kiwicom/orbit-components/lib/Heading"
import Illustration from "@kiwicom/orbit-components/lib/Illustration"
import useMediaQuery from "@kiwicom/orbit-components/lib/hooks/useMediaQuery"

import LanguagePicker from "../LanguagePicker"

const StyledHeading = styled.div`
  h1 {
    text-transform: uppercase;
  }
`
const StyledIllustration = styled.div`
  img {
    max-height: 30px !important;
  }
`

const NavbarContent = (): React$Node => {
  const { t } = useTranslation()
  const { isLargeMobile } = useMediaQuery()

  return (
    <Stack direction="row" align="center" justify="between">
      <Stack
        direction="row"
        align="center"
        spacing="XSmall"
        shrink
        largeMobile={{ spacing: "medium" }}
      >
        <StyledIllustration>
          <Illustration name="CabinBaggage" size="extraSmall" alt="" />
        </StyledIllustration>
        <StyledHeading>
          <Heading type="title3" as="h1">
            {t("title")}
          </Heading>
        </StyledHeading>
      </Stack>
      {isLargeMobile && <LanguagePicker />}
    </Stack>
  )
}

export default NavbarContent
