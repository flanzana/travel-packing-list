import Box from "@kiwicom/orbit-components/lib/Box"
import Button from "@kiwicom/orbit-components/lib/Button"
import Heading from "@kiwicom/orbit-components/lib/Heading"
import Plus from "@kiwicom/orbit-components/lib/icons/Plus"
import Stack from "@kiwicom/orbit-components/lib/Stack"
import { type ReactNode, useState } from "react"
import { useTranslation } from "react-i18next"

import useLocalStorage from "../services/hooks/useLocalStorage"
import useTranslatedCategory from "../services/hooks/useTranslatedCategory"
import { type CardItems, EditMode, type ListCategory } from "../types"
import AddItemControls from "./AddItemControls"
import CategoryIcon from "./CategoryIcon"
import SettingsPopover from "./SettingsPopover"
import TravelItem from "./TravelItem"

type Props = {
  category: ListCategory
  initialCardItems: CardItems
}

const TravelCard = ({ category, initialCardItems }: Props): ReactNode => {
  const { t } = useTranslation()
  const translatedCategory = useTranslatedCategory(category)
  const [cardItems, setCardItems] = useLocalStorage<CardItems>(
    `travel-packing-list:list-${category}`,
    initialCardItems,
  )
  const [editMode, setEditMode] = useState(EditMode.DEFAULT)

  const isRemoveItemsMode = editMode === EditMode.REMOVE_ITEMS

  const toggleSettings = () => {
    if (editMode === EditMode.OPEN_SETTINGS) {
      setEditMode(EditMode.DEFAULT)
    } else {
      setEditMode(EditMode.OPEN_SETTINGS)
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
    setEditMode(EditMode.DEFAULT)
  }

  const handleDeselectAll = () => {
    setCardItems(cardItems.map(item => ({ ...item, isChecked: false })))
    setEditMode(EditMode.DEFAULT)
  }

  const handleSelectAll = () => {
    setCardItems(cardItems.map(item => ({ ...item, isChecked: true })))
    setEditMode(EditMode.DEFAULT)
  }

  const handleSubmitNewItem = (newItemValue: string) => {
    setCardItems([...cardItems, { tKey: newItemValue, isChecked: false }])
    setEditMode(EditMode.DEFAULT)
  }

  return (
    <Box background="white" padding="400" largeDesktop={{ padding: "600" }}>
      <Stack direction="column" spacing="600">
        <Stack direction="row" justify="between" align="center" spacing="none">
          <Stack direction="row" spacing="300" align="center" grow={false} shrink>
            <CategoryIcon category={category} />
            <Heading as="h2" type="title4">
              <span id={category} style={{ scrollMarginTop: "65px" }}>
                {translatedCategory}
              </span>
            </Heading>
          </Stack>
          <SettingsPopover
            translatedCategory={translatedCategory}
            toggleSettings={toggleSettings}
            handleShowDelete={() => setEditMode(EditMode.REMOVE_ITEMS)}
            handleResetCard={handleResetCard}
            handleDeselectAll={handleDeselectAll}
            handleSelectAll={handleSelectAll}
            isSettingsOpened={editMode === EditMode.OPEN_SETTINGS}
          />
        </Stack>
        <Stack direction="column" spacing="300" desktop={{ spacing: "200" }}>
          {cardItems.map(item => (
            <TravelItem
              key={item.tKey}
              item={item}
              shouldShowDeleteButton={isRemoveItemsMode}
              toggleCheckedItem={toggleCheckedItem}
              handleDeleteItem={handleDeleteItem}
            />
          ))}
          {editMode === EditMode.ADD_ITEM ? (
            <AddItemControls
              handleSubmitNewItem={handleSubmitNewItem}
              doesAlreadyExistInItems={(newItemValue: string) =>
                Boolean(cardItems.find(item => newItemValue === t(item.tKey)))
              }
            />
          ) : (
            <Stack direction="row" justify="between">
              <Button
                type="secondary"
                iconLeft={<Plus ariaHidden />}
                size="small"
                onClick={() => setEditMode(EditMode.ADD_ITEM)}
                disabled={isRemoveItemsMode}
              >
                {t("button.add_item")}
              </Button>
              {isRemoveItemsMode && (
                <Button type="critical" size="small" onClick={() => setEditMode(EditMode.DEFAULT)}>
                  {t("button.done")}
                </Button>
              )}
            </Stack>
          )}
        </Stack>
      </Stack>
    </Box>
  )
}

export default TravelCard
