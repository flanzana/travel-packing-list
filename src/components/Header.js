// @flow
import React from "react"
import styled, { css } from "styled-components"
import { useTranslation } from "react-i18next"
import media from "@kiwicom/orbit-components/lib/utils/mediaQuery"
import Stack from "@kiwicom/orbit-components/lib/Stack"
import Heading from "@kiwicom/orbit-components/lib/Heading"
import Illustration from "@kiwicom/orbit-components/lib/Illustration"

import LanguagePicker from "./LanguagePicker"

const HeaderWrapper = styled.header`
  padding: ${({ theme }) => theme.orbit.spaceMedium};

  h1 {
    text-align: center;
  }

  ${media.desktop(css`
    padding: ${({ theme }) => theme.orbit.spaceLarge};
  `)};
`

const FlagWrapper = styled.div`
  position: absolute;
  top: ${({ theme }) => theme.orbit.spaceXXSmall};
  right: ${({ theme }) => theme.orbit.spaceXXSmall};

  ${media.desktop(css`
    top: ${({ theme }) => theme.orbit.spaceSmall};
    right: ${({ theme }) => theme.orbit.spaceSmall};
  `)};
`

const Header = () => {
  const { t } = useTranslation()

  return (
    <HeaderWrapper>
      <FlagWrapper>
        <LanguagePicker />
      </FlagWrapper>
      <Stack direction="column" align="center">
        <Illustration name="TimelinePick" size="extraSmall" alt="" />
        <Heading type="title2" as="h1">
          {t("title")}
        </Heading>
      </Stack>
    </HeaderWrapper>
  )
}

export default Header
