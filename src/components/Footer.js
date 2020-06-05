// @flow
import React from "react"
import styled from "styled-components"
import { Trans, useTranslation } from "react-i18next"
import { defaultTokens } from "@kiwicom/orbit-design-tokens"
import Stack from "@kiwicom/orbit-components/lib/Stack"
import Text from "@kiwicom/orbit-components/lib/Text"
import TextLink from "@kiwicom/orbit-components/lib/TextLink"

const {
  borderColorCard,
  widthBreakpointLargeMobile,
  spaceSmall,
  spaceMedium,
  spaceXXLarge,
} = defaultTokens

const FooterWrapper = styled.div`
  background-color: ${borderColorCard};
  padding: 0 ${spaceXXLarge} ${spaceSmall};

  @media screen and (min-width: ${widthBreakpointLargeMobile}px) {
    padding: 0 ${spaceMedium} ${spaceMedium};
  }
`

function Footer() {
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
