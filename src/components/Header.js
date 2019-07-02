import React from 'react';
import styled from "styled-components";
import { defaultTokens } from "@kiwicom/orbit-design-tokens";
import Stack from "@kiwicom/orbit-components/lib/Stack";
import Heading from "@kiwicom/orbit-components/lib/Heading";
import Illustration from "@kiwicom/orbit-components/lib/Illustration";

const {
  widthBreakpointLargeDesktop,
  spaceMedium,
  spaceXLarge,
} = defaultTokens;

const HeaderWrapper = styled.div`
  padding: ${spaceMedium};
  
  @media screen and (min-width: ${widthBreakpointLargeDesktop}px) {
    padding: ${spaceXLarge};
  };
`;

function Header() {
  return (
    <HeaderWrapper>
      <Stack direction="column" align="center" dataTest="Header">
        <Illustration name="TimelinePick" size="small" />
        <Heading type="title2">TRAVEL PACKING LIST</Heading>
      </Stack>
    </HeaderWrapper>
  );
}

export default Header;
