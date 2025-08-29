import Box from "@kiwicom/orbit-components/lib/Box"
import Grid from "@kiwicom/orbit-components/lib/utils/Grid"
import { defaultTokens } from "@kiwicom/orbit-design-tokens"
import type { ReactNode } from "react"

import data from "../assets/data.json"
import type { CardItems } from "../types"
import { ListCategory } from "../types"
import TravelCard from "./TravelCard"

const { space300, space400, space600 } = defaultTokens

function cardItemsMapper(items: string[]): CardItems {
  return items.map(item => ({ tKey: item, isChecked: false }))
}

const Main = (): ReactNode => (
  <Box as="main" padding="300" largeMobile={{ padding: "400" }} largeDesktop={{ padding: "600" }}>
    <Grid
      columnGap={space400}
      rowGap={space300}
      largeMobile={{ columns: "1fr 1fr", rowGap: space400 }}
      desktop={{ columns: "1fr 1fr 1fr 1fr" }}
      largeDesktop={{ rowGap: space600, columnGap: space600 }}
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
