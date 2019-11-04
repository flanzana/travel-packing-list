import React from 'react';
import styled from "styled-components";
import {useTranslation} from "react-i18next";
import { defaultTokens } from "@kiwicom/orbit-design-tokens";
import Grid from "@kiwicom/orbit-components/lib/utils/Grid";

import TravelCard from "./TravelCard";
import { lists } from "../services/data";

const {
  borderColorCard,
  widthBreakpointLargeDesktop,
  spaceLarge,
  spaceXLarge,
} = defaultTokens;

const MainWrapper = styled.div`
  background-color: ${borderColorCard};
  padding: ${spaceLarge};
  
  @media screen and (min-width: ${widthBreakpointLargeDesktop}px) {
    padding: ${spaceXLarge};
  };
`;

function Main() {
  const { t } = useTranslation();
  return (
    <MainWrapper>
      <Grid
        columnGap={spaceLarge}
        rowGap={spaceLarge}
        largeMobile={{ columns: "1fr 1fr", rowGap: spaceLarge }}
        desktop={{ columns: "1fr 1fr 1fr 1fr" }}
        largeDesktop={{ columnGap: spaceXLarge }}
      >
        {lists.map((list, index) => (
          <TravelCard
            key={index}
            category={list.category}
            heading={t(list.title)}
            cardData={list.items}
          />
        ))}
      </Grid>
    </MainWrapper>
  );
}

export default Main;
