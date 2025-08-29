import ButtonLink from "@kiwicom/orbit-components/lib/ButtonLink"
import Checkbox from "@kiwicom/orbit-components/lib/Checkbox"
import Stack from "@kiwicom/orbit-components/lib/Stack"
import { Close } from "@kiwicom/orbit-components/lib/icons"
import type { ReactNode } from "react"
import { useTranslation } from "react-i18next"

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
    <Stack direction="row" align="start" justify="between" spacing="400" shrink grow={false}>
      <Checkbox
        label={t(tKey)}
        name={t(tKey)}
        checked={isChecked}
        onChange={() => toggleCheckedItem(tKey)}
        disabled={shouldShowDeleteButton}
      />
      {shouldShowDeleteButton && (
        <ButtonLink
          dataTest="TravelItemDelete"
          type="critical"
          size="small"
          iconLeft={<Close ariaHidden />}
          title={t("button.delete_item", { item: t(tKey) })}
          onClick={() => handleDeleteItem(tKey)}
        />
      )}
    </Stack>
  )
}

export default TravelItem
