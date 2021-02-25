// @flow
import React from "react"
import styled, { css } from "styled-components"
import { defaultTokens } from "@kiwicom/orbit-design-tokens"
import Grid from "@kiwicom/orbit-components/lib/utils/Grid"
import media from "@kiwicom/orbit-components/lib/utils/mediaQuery"

import TravelCard from "./TravelCard"
import data from "../services/data.json"
import { LIST_CATEGORIES } from "../services/consts"

const { ESSENTIALS, CLOTHES, TOILETRIES, OTHER } = LIST_CATEGORIES

const { spaceSmall, spaceMedium, spaceLarge } = defaultTokens

const MainWrapper = styled.main`
  background-color: ${({ theme }) => theme.orbit.borderColorCard};
  padding: ${({ theme }) => theme.orbit.spaceSmall};

  ${media.largeMobile(css`
    padding: ${({ theme }) => theme.orbit.spaceMedium};
  `)};

  ${media.largeDesktop(css`
    padding: ${({ theme }) => theme.orbit.spaceLarge};
  `)};
`

const Main = () => {
  return (
    <MainWrapper>
      <Grid
        columnGap={spaceMedium}
        rowGap={spaceSmall}
        largeMobile={{ columns: "1fr 1fr", rowGap: spaceMedium }}
        desktop={{ columns: "1fr 1fr 1fr 1fr" }}
        largeDesktop={{ rowGap: spaceLarge, columnGap: spaceLarge }}
      >
        {[ESSENTIALS, CLOTHES, TOILETRIES, OTHER].map(category => (
          <TravelCard key={category} category={category} cardData={data[category].items} />
        ))}
      </Grid>
    </MainWrapper>
  )
}

export default Main
