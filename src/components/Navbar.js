// @flow
import React from "react"
import styled from "styled-components"
import { useTranslation } from "react-i18next"
import NavigationBar from "@kiwicom/orbit-components/lib/NavigationBar"
import Stack from "@kiwicom/orbit-components/lib/Stack"
import Heading from "@kiwicom/orbit-components/lib/Heading"
import Illustration from "@kiwicom/orbit-components/lib/Illustration"

import LanguagePicker from "./LanguagePicker"

const StyledIllustration = styled.div`
  img {
    max-height: 30px !important;
  }
`

const Navbar = () => {
  const { t } = useTranslation()

  return (
    <NavigationBar dataTest="NavigationBar">
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
          <Heading type="title3">{t("title")}</Heading>
        </Stack>
        <LanguagePicker />
      </Stack>
    </NavigationBar>
  )
}

export default Navbar
