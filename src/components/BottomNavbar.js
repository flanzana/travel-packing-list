// @flow
import React from "react"
import { useTranslation } from "react-i18next"
import styled from "styled-components"
import MenuHamburger from "@kiwicom/orbit-components/lib/icons/MenuHamburger"

import { LIST_CATEGORIES } from "../services/consts"
import useTranslatedCategory from "../services/hooks/useTranslatedCategory"
import CategoryIcon from "./CategoryIcon"
import type { ListCategory } from "../services/types"

const { ESSENTIALS, CLOTHES, TOILETRIES, OTHER } = LIST_CATEGORIES

export const BOTTOM_NAVBAR_HEIGHT = 50 // px

const StyledBottomNavbar = styled.nav`
  height: ${BOTTOM_NAVBAR_HEIGHT}px;
  width: 100%;
  background: ${({ theme }) => theme.orbit.paletteWhite};
  box-shadow: ${({ theme }) => theme.orbit.boxShadowFixedReverse};
  position: fixed;
  bottom: 0;
  display: flex;
  align-content: center;
  flex-direction: row;
  justify-content: space-around;
  z-index: 700;
`

const StyledButton = styled.button`
  width: 60px;
  height: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background: transparent;
  border: none;
  padding: 0;
  background: ${({ theme }) => theme.orbit.backgroundButtonLinkPrimary};
  border-radius: ${({ theme }) => theme.orbit.borderRadiusLarge};
  outline: 0;

  @media (hover: hover) {
    &:hover,
    &:focus {
      background: ${({ theme }) => theme.orbit.backgroundButtonLinkPrimaryHover};
    }
  }

  span {
    font-size: 8px;
    letter-spacing: 0.5px;
    text-align: center;
    color: ${({ theme }) => theme.orbit.colorIconPrimary};
    user-select: none; // disable selecting text (Chrome was selecting it when you clicked button text)
  }
`

type HamburgerButtonProps = {|
  toggleSidebar: () => void,
|}
const HamburgerButton = ({ toggleSidebar }: HamburgerButtonProps): React$Node => {
  const { t } = useTranslation()

  return (
    <StyledButton onClick={toggleSidebar}>
      <MenuHamburger ariaHidden />
      <span>{t("button.more")}</span>
    </StyledButton>
  )
}

type CategoryButtonProps = {|
  category: ListCategory,
|}
const CategoryButton = ({ category }: CategoryButtonProps): React$Node => {
  const { t } = useTranslation()
  const translatedCategory = useTranslatedCategory(category)

  return (
    <StyledButton
      key={category}
      onClick={() => {
        const element = document.getElementById(category)
        return element && element.scrollIntoView({ behavior: "smooth" })
      }}
      aria-label={t("button.scroll_to_list", { category: translatedCategory })}
    >
      <CategoryIcon category={category} />
      <span>{translatedCategory}</span>
    </StyledButton>
  )
}

type Props = {|
  toggleSidebar: () => void,
|}

const BottomNavbar = ({ toggleSidebar }: Props): React$Node => {
  return (
    <StyledBottomNavbar aria-label="Category navigation bar">
      {[ESSENTIALS, CLOTHES, TOILETRIES, OTHER].map(category => (
        <CategoryButton key={category} category={category} />
      ))}
      <HamburgerButton toggleSidebar={toggleSidebar} />
    </StyledBottomNavbar>
  )
}

export default BottomNavbar
