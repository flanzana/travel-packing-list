// @flow
import React, { useEffect } from "react"
import styled from "styled-components"
import { useTranslation } from "react-i18next"
import { defaultTokens } from "@kiwicom/orbit-design-tokens"
import Stack from "@kiwicom/orbit-components/lib/Stack"
import Checkbox from "@kiwicom/orbit-components/lib/Checkbox"
import ButtonLink from "@kiwicom/orbit-components/lib/ButtonLink"
import { Close } from "@kiwicom/orbit-components/lib/icons"
import useLocalStorage from "../services/hooks/useLocalStorage"
import type { EditMode } from "../services/types"
import { EDIT_MODE } from "../services/consts"

const { heightCheckbox, widthCheckbox } = defaultTokens

const StyledButtonLink = styled.div`
  button {
    height: ${heightCheckbox};
    width: ${widthCheckbox};
  }
`

type Props = {|
  item: string,
  editMode: EditMode,
  setEditMode: EditMode => void,
  handleDeleteItemFromData: string => void,
|}

const TravelItem = ({ item, editMode, setEditMode, handleDeleteItemFromData }: Props) => {
  const [checked, setChecked, removeItem] = useLocalStorage(`${item}-checked`, false)
  const { t } = useTranslation()

  useEffect(() => {
    // reset whole card after pressing button reset
    if (editMode === EDIT_MODE.RESET_CARD) {
      setChecked(false)
      setEditMode(EDIT_MODE.DEFAULT)
    }
  }, [editMode, setEditMode, setChecked])

  const handleDeleteItem = item => {
    handleDeleteItemFromData(item)
    removeItem()
  }

  return (
    <Stack direction="row" align="start" justify="between" spacing="natural">
      <Checkbox
        label={t(item)}
        name={item}
        value={item}
        checked={checked}
        onChange={() => setChecked(!checked)}
        disabled={editMode === EDIT_MODE.REMOVE_ITEMS}
      />
      {editMode === EDIT_MODE.REMOVE_ITEMS && (
        <StyledButtonLink>
          <ButtonLink
            type="secondary"
            size="small"
            iconLeft={<Close color="critical" />}
            title={`Delete item ${item}`}
            transparent
            onClick={() => handleDeleteItem(item)}
          />
        </StyledButtonLink>
      )}
    </Stack>
  )
}

export default TravelItem
