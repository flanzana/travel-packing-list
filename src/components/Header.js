import React from 'react';
import styled from "styled-components";
import { useTranslation } from 'react-i18next';
import { defaultTokens } from "@kiwicom/orbit-design-tokens";
import Stack from "@kiwicom/orbit-components/lib/Stack";
import Heading from "@kiwicom/orbit-components/lib/Heading";
import Illustration from "@kiwicom/orbit-components/lib/Illustration";

import LangPicker from "./LangPicker";

const {
  widthBreakpointLargeDesktop,
  spaceMedium,
  spaceXLarge,
} = defaultTokens;

const HeaderWrapper = styled.div`
  padding: ${spaceMedium};

  h1 {
    text-align: center;
  };
  
  @media screen and (min-width: ${widthBreakpointLargeDesktop}px) {
    padding: ${spaceXLarge};
  };
`;

const FlagWrapper = styled.div`
  position: absolute;
  top: 2px;
  right: 2px;

  @media screen and (min-width: ${widthBreakpointLargeDesktop}px) {
    top: 12px;
    right: 12px;
  };
`;

function Header() {
  const { t } = useTranslation();

  return (
    <HeaderWrapper>
      <FlagWrapper>
        <LangPicker />
      </FlagWrapper>
      <Stack direction="column" align="center" dataTest="Header">
        <Illustration name="TimelinePick" size="small" />
        <Heading type="title2">{t("title")}</Heading>
      </Stack>
    </HeaderWrapper>
  );
}

export default Header;
