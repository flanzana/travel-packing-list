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

type Props = {|
  heading: string,
  category: ListCategory,
  cardData: Array<string>,
|}

const TravelCard = ({ heading, category, cardData }: Props) => {
  const { t } = useTranslation()
  const [data, setData] = useLocalStorage(`data-${category}`, cardData)

  const [shouldResetCard, setShouldResetCard] = useState(false)
  const [shouldShowSettingsPopover, setShouldShowSettingsPopover] = useState(false)
  const [shouldShowInput, setShouldShowInput] = useState(false)
  const [shouldShowDelete, setShouldShowDelete] = useState(false)
  const [newItem, setNewItem] = useState("")
  const [error, setError] = useState(null)

  const togglePopover = () => {
    setShouldShowSettingsPopover(!shouldShowSettingsPopover)
    setShouldShowInput(false)
  }

  const handleDeleteItemFromData = item => {
    setData(data.filter(i => i !== item))
  }

  const handleResetCard = () => {
    setShouldResetCard(true)
    setShouldShowInput(false)
    setShouldShowDelete(false)
    // set data to default
    setData(cardData)
    setShouldShowSettingsPopover(false)
  }

  const handleSubmitNewItem = e => {
    // show error if field is empty
    if (newItem === "") {
      setError(t("input.error.enter_item"))
      // show error if the new value already exists on the list
    } else if (data.find(item => t(item) === newItem)) {
      setError(t("input.error.already_exist"))
    } else {
      e.preventDefault()
      // update data
      setData([...data, newItem])

      // clear states
      setShouldShowInput(false)
      setNewItem("")
    }
  }

  const handleInputChange = e => {
    setNewItem(capitalize(e.target.value))
    setError(null)
  }

  const handleShowDelete = () => {
    setShouldShowDelete(true)
    setShouldShowSettingsPopover(false)
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
          shouldShowSettingsPopover={shouldShowSettingsPopover}
        />
      }
    >
      <CardSection>
        <Stack direction="column" spacing="natural" tablet={{ spacing: "condensed" }}>
          {data.map(item => (
            <TravelItem
              key={item}
              item={item}
              shouldResetCard={shouldResetCard}
              setShouldResetCard={setShouldResetCard}
              handleDeleteItemFromData={handleDeleteItemFromData}
              shouldShowDelete={shouldShowDelete}
            />
          ))}
          {shouldShowInput ? (
            <Stack direction="row" spacing="condensed">
              <InputField
                name="New item"
                size="small"
                placeholder={t("placeholder.type_item")}
                value={newItem}
                onChange={handleInputChange}
                error={error}
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
                onClick={() => setShouldShowInput(true)}
                disabled={shouldShowDelete}
              >
                {t("button.add_item")}
              </Button>
              {shouldShowDelete && (
                <Button type="critical" size="small" onClick={() => setShouldShowDelete(false)}>
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
