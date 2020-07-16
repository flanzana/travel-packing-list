// @flow
import React from "react"
import styled from "styled-components"
import { useTranslation } from "react-i18next"
import { defaultTokens } from "@kiwicom/orbit-design-tokens"
import Stack from "@kiwicom/orbit-components/lib/Stack"
import Heading from "@kiwicom/orbit-components/lib/Heading"
import Illustration from "@kiwicom/orbit-components/lib/Illustration"

import LanguagePicker from "./LanguagePicker"

const { widthBreakpointDesktop, spaceMedium, spaceLarge } = defaultTokens

const HeaderWrapper = styled.div`
  padding: ${spaceMedium};

  h1 {
    text-align: center;
  }

  @media screen and (min-width: ${widthBreakpointDesktop}px) {
    padding: ${spaceLarge};
  }
`

const FlagWrapper = styled.div`
  position: absolute;
  top: 4px;
  right: 4px;

  @media screen and (min-width: ${widthBreakpointDesktop}px) {
    top: 12px;
    right: 12px;
  }
`

function Header() {
  const { t } = useTranslation()

  return (
    <HeaderWrapper>
      <FlagWrapper>
        <LanguagePicker />
      </FlagWrapper>
      <Stack direction="column" align="center" dataTest="Header">
        <Illustration name="TimelinePick" size="extraSmall" />
        <Heading type="title2" as="h1">
          {t("title")}
        </Heading>
      </Stack>
    </HeaderWrapper>
  )
}

export default Header
