import { ReactNode } from "react"
import styled, { css } from "styled-components"
import { defaultTokens } from "@kiwicom/orbit-design-tokens"
import Grid from "@kiwicom/orbit-components/lib/utils/Grid"
import media from "@kiwicom/orbit-components/lib/utils/mediaQuery"

import TravelCard from "./TravelCard"
import data from "../assets/data.json"
import { ListCategory } from "../types"
import type { CardItems } from "../types"

const { spaceSmall, spaceMedium, spaceLarge } = defaultTokens

const MainWrapper = styled.main`
  background-color: ${({ theme }) => theme.orbit.paletteCloudLight};
  padding: ${({ theme }) => theme.orbit.spaceSmall};
  margin-top: 52px; // because of navbar

  ${media.largeMobile(css`
    padding: ${({ theme }) => theme.orbit.spaceMedium};
  `)};

  ${media.tablet(css`
    margin-top: 64px; // because of navbar
  `)};

  ${media.largeDesktop(css`
    padding: ${({ theme }) => theme.orbit.spaceLarge};
  `)};
`

function cardItemsMapper(items: string[]): CardItems {
  return items.map(item => ({ tKey: item, isChecked: false }))
}

const Main = (): ReactNode => {
  return (
    <MainWrapper>
      <Grid
        columnGap={spaceMedium}
        rowGap={spaceSmall}
        largeMobile={{ columns: "1fr 1fr", rowGap: spaceMedium }}
        desktop={{ columns: "1fr 1fr 1fr 1fr" }}
        largeDesktop={{ rowGap: spaceLarge, columnGap: spaceLarge }}
      >
        {[
          ListCategory.ESSENTIALS,
          ListCategory.CLOTHES,
          ListCategory.TOILETRIES,
          ListCategory.OTHER,
        ].map(category => (
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