import { ReactNode } from "react"
import Box from "@kiwicom/orbit-components/lib/Box"
import Text from "@kiwicom/orbit-components/lib/Text"
import TextLink from "@kiwicom/orbit-components/lib/TextLink"

const Footer = (): ReactNode => (
  <Box as="footer" padding={{ top: "none", bottom: "small", left: "XXLarge", right: "XXLarge" }}>
    <Text size="small" align="center">
      <TextLink href="https://flanzana.github.io/" external type="secondary" noUnderline>
        Žana Flander
      </TextLink>
      <span> © 2023</span>
    </Text>
  </Box>
)

export default Footer
