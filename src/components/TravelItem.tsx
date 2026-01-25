import { Checkbox, HStack, Icon, IconButton } from "@chakra-ui/react"
import type { ReactNode } from "react"
import { useTranslation } from "react-i18next"
import { FaTimes } from "react-icons/fa"
import { PRIMARY_COLOR_PALETTE } from "../consts"
import type { CardItem } from "../types"

type Props = {
  item: CardItem
  shouldShowDeleteButton: boolean
  toggleCheckedItem: (item: string) => void
  handleDeleteItem: (item: string) => void
}

const TravelItem = ({
  item,
  shouldShowDeleteButton,
  toggleCheckedItem,
  handleDeleteItem,
}: Props): ReactNode => {
  const { t } = useTranslation()
  const { tKey, isChecked } = item

  return (
    <HStack align="start" justify="space-between" gap="16px" flexShrink={0}>
      <Checkbox.Root
        checked={isChecked}
        onCheckedChange={() => toggleCheckedItem(tKey)}
        disabled={shouldShowDeleteButton}
        colorPalette={PRIMARY_COLOR_PALETTE}
      >
        <Checkbox.HiddenInput />
        <Checkbox.Control rounded="md" />
        <Checkbox.Label fontWeight="normal" fontSize="md">
          {t(tKey)}
        </Checkbox.Label>
      </Checkbox.Root>
      {shouldShowDeleteButton && (
        <IconButton
          aria-label={t("button.delete_item", { item: t(tKey) })}
          size="xs"
          colorPalette="red"
          variant="ghost"
          height="20px"
          width="20px"
          minWidth="20px"
          rounded="md"
          onClick={() => handleDeleteItem(tKey)}
        >
          <Icon as={FaTimes} boxSize="12px" aria-hidden />
        </IconButton>
      )}
    </HStack>
  )
}

export default TravelItem
