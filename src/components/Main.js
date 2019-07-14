import React from 'react';
import styled from "styled-components";
import { defaultTokens } from "@kiwicom/orbit-design-tokens";
import Grid from "@kiwicom/orbit-components/lib/utils/Grid";

import TravelCard from "./TravelCard";
import { data } from "../services/data";

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
  return (
    <MainWrapper>
      <Grid
        columnGap={spaceLarge}
        rowGap={spaceLarge}
        largeMobile={{ columns: "1fr 1fr", rowGap: spaceLarge }}
        desktop={{ columns: "1fr 1fr 1fr 1fr" }}
        largeDesktop={{ columnGap: spaceXLarge }}
      >
        {Object.keys(data).map((list, index) => (
          <TravelCard
            key={index}
            title={list}
            cardData={data[list]}
          />
        ))}
      </Grid>
    </MainWrapper>
  );
}

export default Main;
