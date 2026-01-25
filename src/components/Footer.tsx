import { Box, Link, Text } from "@chakra-ui/react"
import type { ReactNode } from "react"
import { PRIMARY_COLOR_PALETTE } from "../consts"

const Footer = (): ReactNode => (
  <Box as="footer" pt={0} pb="12px" px="40px" mb={{ base: "50px", md: "0" }}>
    <Text fontSize="sm" textAlign="center">
      <Link
        href="https://flanzana.github.io/"
        target="_blank"
        rel="noopener noreferrer"
        colorPalette={PRIMARY_COLOR_PALETTE}
        variant="underline"
        fontWeight="medium"
      >
        Žana Flander
      </Link>
      <span> © 2026</span>
    </Text>
  </Box>
)

export default Footer
