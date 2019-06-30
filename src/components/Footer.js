import React from 'react';
import styled from "styled-components";
import { defaultTokens } from "@kiwicom/orbit-design-tokens";
import Stack from "@kiwicom/orbit-components/lib/Stack";
import Text from "@kiwicom/orbit-components/lib/Text";
import TextLink from "@kiwicom/orbit-components/lib/TextLink";

const {
  paletteProductDarkActive,
  widthBreakpointLargeMobile,
  spaceSmall,
  spaceMedium,
} = defaultTokens;

const FooterWrapper = styled.div`
  background-color: ${paletteProductDarkActive};
  padding: ${spaceSmall};
  
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
      <Stack direction="column" align="center" dataTest="Footer">
        <Text size="small" type="white">
          <TextLink href="https://flanzana.github.io/" external>Žana Flander</TextLink> & <TextLink href="https://orbit.kiwi" external>Orbit</TextLink> © 2019
        </Text>
      </Stack>
    </FooterWrapper>
  );
}

export default Footer;
