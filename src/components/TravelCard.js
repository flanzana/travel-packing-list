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
import type { ListCategory } from "../services/types"
import useLocalStorage from "../services/hooks/useLocalStorage"
import { capitalize, renderCardIcon } from "../services/helpers"
import { EDIT_MODE } from "../services/consts"

type Props = {|
  heading: string,
  category: ListCategory,
  cardData: Array<string>,
|}

const TravelCard = ({ heading, category, cardData }: Props) => {
  const { t } = useTranslation()
  const [data, setData] = useLocalStorage(`data-${category}`, cardData)
  const [editMode, setEditMode] = useState(EDIT_MODE.DEFAULT)
  const [newItem, setNewItem] = useState({ value: "", error: null })

  const togglePopover = () => {
    if (editMode === EDIT_MODE.OPEN_SETTINGS) {
      setEditMode(EDIT_MODE.DEFAULT)
    } else {
      setEditMode(EDIT_MODE.OPEN_SETTINGS)
    }
  }

  const handleDeleteItemFromData = item => {
    setData(data.filter(i => i !== item))
  }

  const handleResetCard = () => {
    setEditMode(EDIT_MODE.RESET_CARD)
    setData(cardData) // set data to default
  }

  const handleSubmitNewItem = e => {
    // show error if field is empty
    if (newItem.value === "") {
      setNewItem({ ...newItem, error: t("input.error.enter_item") })
      // show error if the new value already exists on the list
    } else if (data.find(item => t(item) === newItem.value)) {
      setNewItem({ ...newItem, error: t("input.error.already_exist") })
    } else {
      e.preventDefault()
      // update data
      setData([...data, newItem.value])

      // clear states
      setEditMode(EDIT_MODE.DEFAULT)
      setNewItem({ value: "", error: null })
    }
  }

  const handleInputChange = e => {
    setNewItem({ ...newItem, value: capitalize(e.target.value) })
  }

  const handleShowDelete = () => {
    setEditMode(EDIT_MODE.REMOVE_ITEMS)
  }

  return (
    <Card
      dataTest={`TravelCard-${category}`}
      title={heading}
      icon={renderCardIcon(category)}
      actions={
        <SettingsPopover
          translatedCategory={heading}
          togglePopover={togglePopover}
          handleShowDelete={handleShowDelete}
          handleResetCard={handleResetCard}
          editMode={editMode}
        />
      }
    >
      <CardSection>
        <Stack direction="column" spacing="natural" tablet={{ spacing: "condensed" }}>
          {data.map(item => (
            <TravelItem
              key={item}
              item={item}
              editMode={editMode}
              setEditMode={setEditMode}
              handleDeleteItemFromData={handleDeleteItemFromData}
            />
          ))}
          {editMode === EDIT_MODE.ADD_ITEM ? (
            <Stack direction="row" spacing="condensed">
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
                iconLeft={<Plus />}
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
