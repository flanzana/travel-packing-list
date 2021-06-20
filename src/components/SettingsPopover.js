// @flow
import React from "react"
import { useTranslation } from "react-i18next"
import Button from "@kiwicom/orbit-components/lib/Button"
import Stack from "@kiwicom/orbit-components/lib/Stack"
import Heading from "@kiwicom/orbit-components/lib/Heading"
import {
  CheckCircle,
  CircleEmpty,
  Remove,
  Replace,
  Settings,
} from "@kiwicom/orbit-components/lib/icons"
import Popover from "@kiwicom/orbit-components/lib/Popover"

type Props = {|
  translatedCategory: string,
  toggleSettings: () => void,
  handleShowDelete: () => void,
  handleResetCard: () => void,
  handleDeselectAll: () => void,
  handleSelectAll: () => void,
  isSettingsOpened: boolean,
|}

const SettingsPopover = ({
  translatedCategory,
  toggleSettings,
  handleShowDelete,
  handleResetCard,
  handleDeselectAll,
  handleSelectAll,
  isSettingsOpened,
}: Props): React$Node => {
  const { t } = useTranslation()

  return (
    <Popover
      content={
        <Stack direction="column" spacing="medium">
          <Heading type="title4" as="h3">
            {t("title.settings_list", { category: translatedCategory })}
          </Heading>
          {[
            {
              tKey: "button.check_all",
              onClick: handleSelectAll,
              icon: <CheckCircle ariaHidden />,
            },
            {
              tKey: "button.uncheck_all",
              onClick: handleDeselectAll,
              icon: <CircleEmpty ariaHidden />,
            },
            {
              tKey: "button.remove_items",
              onClick: handleShowDelete,
              icon: <Remove ariaHidden />,
            },
            {
              tKey: "button.reset_list",
              onClick: handleResetCard,
              icon: <Replace ariaHidden />,
              type: "criticalSubtle",
            },
          ].map(({ tKey, type = "secondary", onClick, icon }) => (
            <Button key={tKey} type={type} iconLeft={icon} size="small" onClick={onClick} fullWidth>
              {t(tKey)}
            </Button>
          ))}
        </Stack>
      }
      opened={isSettingsOpened}
      onOpen={toggleSettings}
      onClose={toggleSettings}
      width="250px"
    >
      <Button
        size="small"
        type="secondary"
        iconLeft={<Settings ariaHidden />}
        title={t("title.settings_list", { category: translatedCategory })}
      />
    </Popover>
  )
}

export default SettingsPopover
