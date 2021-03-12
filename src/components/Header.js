// @flow
import React from "react"
import styled, { css } from "styled-components"
import { useTranslation } from "react-i18next"
import media from "@kiwicom/orbit-components/lib/utils/mediaQuery"
import Stack from "@kiwicom/orbit-components/lib/Stack"
import Heading from "@kiwicom/orbit-components/lib/Heading"
import Illustration from "@kiwicom/orbit-components/lib/Illustration"

const HeaderWrapper = styled.header`
  margin-top: 52px; // because of navbar
  padding: ${({ theme }) => theme.orbit.spaceMedium};

  h1 {
    text-align: center;
    text-transform: uppercase;
  }

  ${media.tablet(css`
    margin-top: 64px; // because of navbar
  `)};

  ${media.desktop(css`
    padding: ${({ theme }) => theme.orbit.spaceLarge};
  `)};
`

const Header = (): React$Node => {
  const { t } = useTranslation()

  return (
    <HeaderWrapper>
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
