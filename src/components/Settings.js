// @flow
import React from "react"
import { useTranslation } from "react-i18next"
import Button from "@kiwicom/orbit-components/lib/Button"
import Stack from "@kiwicom/orbit-components/lib/Stack"
import Heading from "@kiwicom/orbit-components/lib/Heading"
import Remove from "@kiwicom/orbit-components/lib/icons/Remove"
import Popover from "@kiwicom/orbit-components/lib/Popover"
import Replace from "@kiwicom/orbit-components/lib/icons/Replace"
import SettingsIcon from "@kiwicom/orbit-components/lib/icons/Settings"

type Props = {
  translatedCategory: string,
  togglePopover: () => void,
  handleShowDelete: () => void,
  handleReset: () => void,
  showDelete: boolean,
  showInput: boolean,
  showSettingsPopover: boolean,
}

function Settings({
  translatedCategory,
  togglePopover,
  handleShowDelete,
  handleReset,
  showDelete,
  showInput,
  showSettingsPopover,
}: Props) {
  const { t } = useTranslation()

  return (
    <Popover
      content={
        <Stack direction="column" spacing="natural" dataTest="Settings-popover">
          <Heading type="title4" as="h3">
            {t("title.settings_list", { category: translatedCategory })}
          </Heading>
          <Button
            type="secondary"
            iconLeft={<Remove />}
            size="small"
            onClick={handleShowDelete}
            fullWidth
          >
            {t("button.remove_items")}
          </Button>
          <Button
            type="criticalSubtle"
            iconLeft={<Replace />}
            size="small"
            onClick={handleReset}
            fullWidth
          >
            {t("button.reset_list")}
          </Button>
        </Stack>
      }
      opened={showSettingsPopover}
      onClose={togglePopover}
      width="250px"
    >
      <Button
        size="small"
        type="secondary"
        iconLeft={<SettingsIcon />}
        title={t("button.settings")}
        onClick={togglePopover}
        disabled={showDelete || showInput}
      />
    </Popover>
  )
}

export default Settings
