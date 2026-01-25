import { Box, SimpleGrid } from "@chakra-ui/react"
import type { ReactNode } from "react"

import data from "../assets/data.json"
import type { CardItems } from "../types"
import { ListCategory } from "../types"
import TravelCard from "./TravelCard"

function cardItemsMapper(items: string[]): CardItems {
  return items.map(item => ({ tKey: item, isChecked: false }))
}

const Main = (): ReactNode => (
  <Box as="main" p={{ base: "12px", md: "16px", xl: "24px" }} mt="60px">
    <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={{ base: "12px", md: "16px", xl: "24px" }}>
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
    </SimpleGrid>
  </Box>
)

export default Main
