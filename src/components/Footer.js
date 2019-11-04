import React from 'react';
import styled from "styled-components";
import { Trans } from "react-i18next";
import { defaultTokens } from "@kiwicom/orbit-design-tokens";
import Stack from "@kiwicom/orbit-components/lib/Stack";
import Text from "@kiwicom/orbit-components/lib/Text";
import TextLink from "@kiwicom/orbit-components/lib/TextLink";

const {
  paletteInkLightActive,
  widthBreakpointLargeMobile,
  spaceSmall,
  spaceMedium,
  spaceXXLarge,
} = defaultTokens;

const FooterWrapper = styled.div`
  background-color: ${paletteInkLightActive};
  padding: ${spaceSmall} ${spaceXXLarge};
  
  a {
    color: white !important;
  };
  
  @media screen and (min-width: ${widthBreakpointLargeMobile}px) {
    padding: ${spaceMedium};
  };
`;

function Footer() {
  return (
    <FooterWrapper>
      <Stack direction="column" align="center" justify="center" dataTest="Footer">
        <Text size="small" type="white" align="center">
          <Trans i18nKey="footer.text">
            Copyright © 2019 <TextLink href="https://flanzana.github.io/" external>Žana Flander</TextLink> and <TextLink href="https://orbit.kiwi" external>Orbit</TextLink>
          </Trans>
        </Text>
      </Stack>
    </FooterWrapper>
  );
}

export default Footer;
