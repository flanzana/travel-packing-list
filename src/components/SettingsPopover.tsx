import Button from "@kiwicom/orbit-components/lib/Button"
import type { Props as ButtonProps } from "@kiwicom/orbit-components/lib/Button/types.d"
import Heading from "@kiwicom/orbit-components/lib/Heading"
import Popover from "@kiwicom/orbit-components/lib/Popover"
import Stack from "@kiwicom/orbit-components/lib/Stack"
import {
  CheckCircle,
  CircleEmpty,
  Remove,
  Replace,
  Settings,
} from "@kiwicom/orbit-components/lib/icons"
import type { ReactNode } from "react"
import { useTranslation } from "react-i18next"

type Props = {
  translatedCategory: string
  toggleSettings: () => void
  handleShowDelete: () => void
  handleResetCard: () => void
  handleDeselectAll: () => void
  handleSelectAll: () => void
  isSettingsOpened: boolean
}

const commonButtonProps: Required<Pick<ButtonProps, "fullWidth" | "size" | "type">> = {
  fullWidth: true,
  size: "small",
  type: "secondary",
}

const ARIA_LABEL_ID = "settings-popover-title"

const SettingsPopover = ({
  translatedCategory,
  toggleSettings,
  handleShowDelete,
  handleResetCard,
  handleDeselectAll,
  handleSelectAll,
  isSettingsOpened,
}: Props): ReactNode => {
  const { t } = useTranslation()

  return (
    <Popover
      content={
        <Stack direction="column" spacing="400">
          <Heading type="title5" as="h3" id={ARIA_LABEL_ID}>
            {t("title.settings_list", { category: translatedCategory })}
          </Heading>
          <Button
            {...commonButtonProps}
            onClick={handleSelectAll}
            iconLeft={<CheckCircle ariaHidden />}
          >
            {t("button.check_all")}
          </Button>
          <Button
            {...commonButtonProps}
            onClick={handleDeselectAll}
            iconLeft={<CircleEmpty ariaHidden />}
          >
            {t("button.uncheck_all")}
          </Button>
          <Button
            {...commonButtonProps}
            onClick={handleShowDelete}
            iconLeft={<Remove ariaHidden />}
          >
            {t("button.remove_items")}
          </Button>
          <Button
            {...commonButtonProps}
            onClick={handleResetCard}
            iconLeft={<Replace ariaHidden />}
            type="criticalSubtle"
          >
            {t("button.reset_list")}
          </Button>
        </Stack>
      }
      opened={isSettingsOpened}
      onOpen={toggleSettings}
      onClose={toggleSettings}
      width="250px"
      ariaLabelledby={ARIA_LABEL_ID}
      labelClose={t("button.close")}
    >
      <Button
        asComponent="div"
        size="small"
        type="secondary"
        iconLeft={<Settings ariaHidden />}
        title={t("title.settings_list", { category: translatedCategory })}
      />
    </Popover>
  )
}

export default SettingsPopover
