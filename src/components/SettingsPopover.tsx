import { Button, Heading, Icon, IconButton, Popover, Portal, VStack } from "@chakra-ui/react"
import type { ElementType, ReactNode } from "react"
import { useTranslation } from "react-i18next"
import { FaCheckSquare, FaCog, FaSquare, FaTrash, FaUndo } from "react-icons/fa"

const SettingButton = ({
  icon,
  label,
  onClick,
  isCritical = false,
}: {
  icon: ElementType
  label: string
  onClick: () => void
  isCritical?: boolean
}) => {
  return (
    <Button
      width="100%"
      size="sm"
      variant="subtle"
      onClick={onClick}
      rounded="md"
      colorPalette={isCritical ? "red" : undefined}
    >
      <Icon as={icon} boxSize="12px" aria-hidden />
      {label}
    </Button>
  )
}

type Props = {
  translatedCategory: string
  toggleSettings: () => void
  handleShowDelete: () => void
  handleResetCard: () => void
  handleDeselectAll: () => void
  handleSelectAll: () => void
  isSettingsOpened: boolean
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
    <Popover.Root
      open={isSettingsOpened}
      onOpenChange={toggleSettings}
      positioning={{ placement: "bottom-end" }}
    >
      <Popover.Trigger asChild>
        <IconButton
          aria-label={t("title.settings_list", { category: translatedCategory })}
          size="sm"
          rounded="md"
          variant="subtle"
        >
          <FaCog aria-hidden />
        </IconButton>
      </Popover.Trigger>
      <Portal>
        <Popover.Positioner>
          <Popover.Content width="250px">
            <Popover.Header>
              <Heading as="h3" size="sm" id={ARIA_LABEL_ID}>
                {t("title.settings_list", { category: translatedCategory })}
              </Heading>
            </Popover.Header>
            <Popover.Body>
              <VStack gap="12px" align="stretch">
                <SettingButton
                  onClick={handleSelectAll}
                  icon={FaCheckSquare}
                  label={t("button.check_all")}
                />
                <SettingButton
                  onClick={handleDeselectAll}
                  icon={FaSquare}
                  label={t("button.uncheck_all")}
                />
                <SettingButton
                  onClick={handleShowDelete}
                  icon={FaTrash}
                  label={t("button.remove_items")}
                />
                <SettingButton
                  onClick={handleResetCard}
                  icon={FaUndo}
                  label={t("button.reset_list")}
                  isCritical
                />
              </VStack>
            </Popover.Body>
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  )
}

export default SettingsPopover
