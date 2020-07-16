// @flow
import React from "react"
import styled from "styled-components"
import { useTranslation } from "react-i18next"
import { defaultTokens } from "@kiwicom/orbit-design-tokens"
import Grid from "@kiwicom/orbit-components/lib/utils/Grid"

import TravelCard from "./TravelCard"
import data from "../services/data.json"

const {
  borderColorCard,
  widthBreakpointLargeMobile,
  widthBreakpointLargeDesktop,
  spaceSmall,
  spaceMedium,
  spaceLarge,
} = defaultTokens

const MainWrapper = styled.div`
  background-color: ${borderColorCard};
  padding: ${spaceSmall};

  @media screen and (min-width: ${widthBreakpointLargeMobile}px) {
    padding: ${spaceMedium};
  }

  @media screen and (min-width: ${widthBreakpointLargeDesktop}px) {
    padding: ${spaceLarge};
  }
`

function Main() {
  const { t } = useTranslation()
  return (
    <MainWrapper>
      <Grid
        columnGap={spaceMedium}
        rowGap={spaceSmall}
        largeMobile={{ columns: "1fr 1fr", rowGap: spaceMedium }}
        desktop={{ columns: "1fr 1fr 1fr 1fr" }}
        largeDesktop={{ rowGap: spaceLarge, columnGap: spaceLarge }}
      >
        {data.map(list => (
          <TravelCard
            key={list.category}
            category={list.category}
            heading={t(list.title)}
            cardData={list.items}
          />
        ))}
      </Grid>
    </MainWrapper>
  )
}

export default Main
