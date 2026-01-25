import { Box, Button, Heading, HStack, Icon, VStack } from "@chakra-ui/react"
import { type ReactNode, useState } from "react"
import { useTranslation } from "react-i18next"
import { FaPlus } from "react-icons/fa"

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
    <Box bg="white" p={{ base: "16px", xl: "20px" }}>
      <HStack justify="space-between" align="center" gap={0} mb="16px">
        <HStack gap="12px" align="center" flexShrink={1}>
          <CategoryIcon category={category} />
          <Heading as="h2" size="md" id={category} scrollMarginTop="70px">
            {translatedCategory}
          </Heading>
        </HStack>
        <SettingsPopover
          translatedCategory={translatedCategory}
          toggleSettings={toggleSettings}
          handleShowDelete={() => setEditMode(EditMode.REMOVE_ITEMS)}
          handleResetCard={handleResetCard}
          handleDeselectAll={handleDeselectAll}
          handleSelectAll={handleSelectAll}
          isSettingsOpened={editMode === EditMode.OPEN_SETTINGS}
        />
      </HStack>
      <VStack gap={{ base: "12px", lg: "8px" }} align="stretch">
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
          <HStack justify="space-between">
            <Button
              variant="subtle"
              size="sm"
              onClick={() => setEditMode(EditMode.ADD_ITEM)}
              disabled={isRemoveItemsMode}
              rounded="md"
            >
              <Icon as={FaPlus} boxSize="10px" aria-hidden />
              {t("button.add_item")}
            </Button>
            {isRemoveItemsMode && (
              <Button
                colorPalette="red"
                size="sm"
                onClick={() => setEditMode(EditMode.DEFAULT)}
                rounded="md"
              >
                {t("button.done")}
              </Button>
            )}
          </HStack>
        )}
      </VStack>
    </Box>
  )
}

export default TravelCard
