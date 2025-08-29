import Box from "@kiwicom/orbit-components/lib/Box"
import Stack from "@kiwicom/orbit-components/lib/Stack"
import defaultTheme from "@kiwicom/orbit-components/lib/defaultTheme"
import MenuHamburger from "@kiwicom/orbit-components/lib/icons/MenuHamburger"
import ButtonPrimitive from "@kiwicom/orbit-components/lib/primitives/ButtonPrimitive"
import type { ReactNode } from "react"
import { useTranslation } from "react-i18next"

import useTranslatedCategory from "../services/hooks/useTranslatedCategory"
import { ListCategory } from "../types"
import CategoryIcon from "./CategoryIcon"

const { buttonLinkSecondaryBackground, buttonLinkSecondaryBackgroundHover } = defaultTheme.orbit

type BottomNavbarButtonProps = {
  icon: ReactNode
  ariaLabel?: string
  label: string
  onClick: () => void
}
const BottomNavbarButton = ({ ariaLabel, icon, label, onClick }: BottomNavbarButtonProps) => (
  <ButtonPrimitive
    dataTest="BottomNavbarButton"
    onClick={onClick}
    title={ariaLabel}
    height="50px"
    background={buttonLinkSecondaryBackground}
    backgroundHover={buttonLinkSecondaryBackgroundHover}
    backgroundFocus={buttonLinkSecondaryBackgroundHover}
    fontSize="8px"
    fontWeight="normal"
  >
    <Stack direction="column" spacing="100" align="center">
      {icon}
      <span>{label}</span>
    </Stack>
  </ButtonPrimitive>
)

type HamburgerButtonProps = {
  toggleSidebar: () => void
}
const HamburgerButton = ({ toggleSidebar }: HamburgerButtonProps): ReactNode => {
  const { t } = useTranslation()

  return (
    <BottomNavbarButton
      onClick={toggleSidebar}
      icon={<MenuHamburger ariaHidden size="large" />}
      label={t("button.more")}
    />
  )
}

type CategoryButtonProps = {
  category: ListCategory
}
const CategoryButton = ({ category }: CategoryButtonProps): ReactNode => {
  const { t } = useTranslation()
  const translatedCategory = useTranslatedCategory(category)

  return (
    <BottomNavbarButton
      key={category}
      onClick={() => {
        const element = document.getElementById(category)
        return element?.scrollIntoView({ behavior: "smooth" })
      }}
      ariaLabel={t("button.scroll_to_list", { category: translatedCategory })}
      icon={<CategoryIcon category={category} />}
      label={translatedCategory}
    />
  )
}

type Props = {
  toggleSidebar: () => void
}

const BottomNavbar = ({ toggleSidebar }: Props): ReactNode => (
  <Box
    as="nav"
    position="fixed"
    bottom="0"
    width="100%"
    zIndex={700}
    background="white"
    elevation="fixedReverse"
  >
    <Stack direction="row" justify="around" align="center" spacing="none">
      {[
        ListCategory.ESSENTIALS,
        ListCategory.CLOTHES,
        ListCategory.TOILETRIES,
        ListCategory.OTHER,
      ].map(category => (
        <CategoryButton key={category} category={category} />
      ))}
      <HamburgerButton toggleSidebar={toggleSidebar} />
    </Stack>
  </Box>
)

export default BottomNavbar
