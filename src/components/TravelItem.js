// @flow
import React, { useEffect } from "react"
import styled from "styled-components"
import { useTranslation } from "react-i18next"
import Stack from "@kiwicom/orbit-components/lib/Stack"
import Checkbox from "@kiwicom/orbit-components/lib/Checkbox"
import ButtonLink from "@kiwicom/orbit-components/lib/ButtonLink"
import { Close } from "@kiwicom/orbit-components/lib/icons"
import useLocalStorage from "../services/hooks/useLocalStorage"
import type { EditMode } from "../services/types"
import { EDIT_MODE } from "../services/consts"

const StyledButtonLink = styled.div`
  button {
    height: ${({ theme }) => theme.orbit.heightCheckbox};
    width: ${({ theme }) => theme.orbit.widthCheckbox};
  }
`

type Props = {|
  item: string,
  editMode: EditMode,
  setEditMode: EditMode => void,
  handleDeleteItemFromData: string => void,
|}

const TravelItem = ({
  item,
  editMode,
  setEditMode,
  handleDeleteItemFromData,
}: Props): React$Node => {
  const [checked, setChecked, removeItem] = useLocalStorage<boolean>(`${item}-checked`, false)
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

  const toggleCheckItem = () => {
    setChecked(!checked)
    // to close settings popover in case it is still open
    setEditMode(EDIT_MODE.DEFAULT)
  }

  return (
    <Stack direction="row" align="start" justify="between" spacing="medium">
      <Checkbox
        label={t(item)}
        name={item}
        value={item}
        checked={checked}
        onChange={toggleCheckItem}
        disabled={editMode === EDIT_MODE.REMOVE_ITEMS}
      />
      {editMode === EDIT_MODE.REMOVE_ITEMS && (
        <StyledButtonLink>
          <ButtonLink
            type="critical"
            size="small"
            iconLeft={<Close ariaHidden />}
            title={t("button.delete_item", { item: t(item) })}
            onClick={() => handleDeleteItem(item)}
          />
        </StyledButtonLink>
      )}
    </Stack>
  )
}

export default TravelItem
