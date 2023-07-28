import { ReactNode } from "react"
import { defaultTokens } from "@kiwicom/orbit-design-tokens"
import Grid from "@kiwicom/orbit-components/lib/utils/Grid"
import Box from "@kiwicom/orbit-components/lib/Box"

import TravelCard from "./TravelCard"
import data from "../assets/data.json"
import { ListCategory } from "../types"
import type { CardItems } from "../types"

const { spaceSmall, spaceMedium, spaceLarge } = defaultTokens

function cardItemsMapper(items: string[]): CardItems {
  return items.map(item => ({ tKey: item, isChecked: false }))
}

const Main = (): ReactNode => (
  <Box
    as="main"
    padding="small"
    largeMobile={{ padding: "medium" }}
    largeDesktop={{ padding: "large" }}
  >
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
  </Box>
)

export default Main
