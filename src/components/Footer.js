// @flow
import React from "react"
import styled, { css } from "styled-components"
import { Trans, useTranslation } from "react-i18next"
import media from "@kiwicom/orbit-components/lib/utils/mediaQuery"
import Stack from "@kiwicom/orbit-components/lib/Stack"
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
  const { t } = useTranslation("translations")
  return (
    <FooterWrapper>
      <Stack direction="column" align="center" justify="center" dataTest="Footer">
        <Text size="small" align="center">
          <Trans t={t} i18nKey="footer.text">
            © 2019-2020
            <TextLink href="https://flanzana.github.io/" external>
              Žana Flander
            </TextLink>
            and
            <TextLink href="https://orbit.kiwi" external>
              Orbit
            </TextLink>
          </Trans>
        </Text>
      </Stack>
    </FooterWrapper>
  )
}

export default Footer
