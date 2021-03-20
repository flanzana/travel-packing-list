// @flow
import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import Card, { CardSection } from "@kiwicom/orbit-components/lib/Card"
import Button from "@kiwicom/orbit-components/lib/Button"
import Stack from "@kiwicom/orbit-components/lib/Stack"
import InputField from "@kiwicom/orbit-components/lib/InputField"
import { Plus } from "@kiwicom/orbit-components/lib/icons"

import TravelItem from "./TravelItem"
import SettingsPopover from "./SettingsPopover"
import type { CardItems, ListCategory } from "../services/types"
import useLocalStorage from "../services/hooks/useLocalStorage"
import { capitalize } from "../services/helpers"
import { EDIT_MODE } from "../services/consts"
import CategoryIcon from "./CategoryIcon"
import useTranslatedCategory from "../services/hooks/useTranslatedCategory"

const initialNewItem = { value: "", error: null }

type Props = {|
  category: ListCategory,
  initialCardItems: CardItems,
|}

const TravelCard = ({ category, initialCardItems }: Props): React$Node => {
  const { t } = useTranslation()
  const translatedCategory = useTranslatedCategory(category)
  const [cardItems, setCardItems] = useLocalStorage<CardItems>(
    `travel-packing-list:list-${category}`,
    initialCardItems,
  )
  const [editMode, setEditMode] = useState(EDIT_MODE.DEFAULT)
  const [newItem, setNewItem] = useState(initialNewItem)

  const togglePopover = () => {
    if (editMode === EDIT_MODE.OPEN_SETTINGS) {
      setEditMode(EDIT_MODE.DEFAULT)
    } else {
      setEditMode(EDIT_MODE.OPEN_SETTINGS)
    }
  }

  const handleDeleteItem = (itemTKey: string) => {
    setCardItems(cardItems.filter(item => item.tKey !== itemTKey))
  }

  const toggleCheckedItem = (itemTKey: string) => {
    setCardItems(
      cardItems.map(item =>
        item.tKey === itemTKey ? { ...item, isChecked: !item.isChecked } : item,
      ),
    )
  }

  const handleResetCard = () => {
    setCardItems(initialCardItems)
    setEditMode(EDIT_MODE.DEFAULT)
  }

  const handleSubmitNewItem = e => {
    const doesAlreadyExist = Boolean(cardItems.find(item => t(item.tKey) === newItem.value))

    if (!newItem.value) {
      setNewItem({ ...newItem, error: t("input.error.enter_item") })
    } else if (doesAlreadyExist) {
      setNewItem({ ...newItem, error: t("input.error.already_exist") })
    } else {
      e.preventDefault()
      // update data
      setCardItems([...cardItems, { tKey: newItem.value, isChecked: false }])

      // clear states
      setEditMode(EDIT_MODE.DEFAULT)
      setNewItem(initialNewItem)
    }
  }

  const handleInputChange = e => {
    setNewItem({ error: null, value: capitalize(e.target.value) })
  }

  return (
    <Card
      title={
        <span id={category} style={{ scrollMarginTop: "65px" }}>
          {translatedCategory}
        </span>
      }
      icon={<CategoryIcon category={category} />}
      actions={
        <SettingsPopover
          translatedCategory={translatedCategory}
          togglePopover={togglePopover}
          handleShowDelete={() => setEditMode(EDIT_MODE.REMOVE_ITEMS)}
          handleResetCard={handleResetCard}
          isSettingsOpened={editMode === EDIT_MODE.OPEN_SETTINGS}
        />
      }
    >
      <CardSection>
        <Stack direction="column" spacing="medium" desktop={{ spacing: "XSmall" }}>
          {cardItems.map(item => (
            <TravelItem
              key={item.tKey}
              item={item}
              shouldShowDeleteButton={editMode === EDIT_MODE.REMOVE_ITEMS}
              toggleCheckedItem={toggleCheckedItem}
              handleDeleteItem={handleDeleteItem}
            />
          ))}
          {editMode === EDIT_MODE.ADD_ITEM ? (
            <Stack direction="row" spacing="XSmall">
              <InputField
                name="New item"
                size="small"
                placeholder={t("placeholder.type_item")}
                value={newItem.value}
                onChange={handleInputChange}
                error={newItem.error}
                ref={input => input && input.focus()}
              />
              <Button size="small" onClick={handleSubmitNewItem}>
                {t("button.save")}
              </Button>
            </Stack>
          ) : (
            <Stack direction="row" justify="between">
              <Button
                type="secondary"
                iconLeft={<Plus ariaHidden />}
                size="small"
                onClick={() => setEditMode(EDIT_MODE.ADD_ITEM)}
                disabled={editMode === EDIT_MODE.REMOVE_ITEMS}
              >
                {t("button.add_item")}
              </Button>
              {editMode === EDIT_MODE.REMOVE_ITEMS && (
                <Button type="critical" size="small" onClick={() => setEditMode(EDIT_MODE.DEFAULT)}>
                  {t("button.save")}
                </Button>
              )}
            </Stack>
          )}
        </Stack>
      </CardSection>
    </Card>
  )
}

export default TravelCard
