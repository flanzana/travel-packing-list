// @flow
import React from "react"
import styled, { css } from "styled-components"
import media from "@kiwicom/orbit-components/lib/utils/mediaQuery"
import Text from "@kiwicom/orbit-components/lib/Text"
import TextLink from "@kiwicom/orbit-components/lib/TextLink"

const FooterWrapper = styled.footer`
  background-color: ${({ theme }) => theme.orbit.borderColorCard};
  padding: ${({ theme }) => `0 ${theme.orbit.spaceXXLarge} ${theme.orbit.spaceSmall}`};

  ${media.largeMobile(css`
    padding: ${({ theme }) => `0 ${theme.orbit.spaceMedium} ${theme.orbit.spaceMedium}`};
  `)};
`

const Footer = () => {
  return (
    <FooterWrapper>
      <Text size="small" align="center">
        <TextLink href="https://flanzana.github.io/" external type="secondary" noUnderline>
          Žana Flander
        </TextLink>
        <span> © 2021</span>
      </Text>
    </FooterWrapper>
  )
}

export default Footer
