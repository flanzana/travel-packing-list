// @flow
import React from "react"
import styled, { css } from "styled-components"
import { defaultTokens } from "@kiwicom/orbit-design-tokens"
import Grid from "@kiwicom/orbit-components/lib/utils/Grid"
import media from "@kiwicom/orbit-components/lib/utils/mediaQuery"

import TravelCard from "./TravelCard"
import data from "../services/data.json"
import { LIST_CATEGORIES } from "../services/consts"
import type { CardItems } from "../services/types"

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

function cardItemsMapper(items: Array<string>): CardItems {
  return items.map(item => ({ tKey: item, isChecked: false }))
}

const Main = (): React$Node => {
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
          <TravelCard
            key={category}
            category={category}
            initialCardItems={cardItemsMapper(data[category].items)}
          />
        ))}
      </Grid>
    </MainWrapper>
  )
}

export default Main
