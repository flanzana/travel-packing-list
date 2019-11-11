import React from 'react';
import { useTranslation } from "react-i18next";
import Button from "@kiwicom/orbit-components/lib/Button";
import Stack from "@kiwicom/orbit-components/lib/Stack";
import Remove from "@kiwicom/orbit-components/lib/icons/Remove";
import Popover from "@kiwicom/orbit-components/lib/Popover";
import Replace from "@kiwicom/orbit-components/lib/icons/Replace";
import SettingsIcon from "@kiwicom/orbit-components/lib/icons/Settings";

function Settings({ translatedCategory, togglePopover, handleShowDelete, handleReset, showDelete, showInput, showSettingsPopover }) {
  const { t } = useTranslation();

  return (
    <Popover
      content={
        <Stack direction="column" spacing="natural" dataTest="Settings-popover">
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
              type="critical"
              iconLeft={<Replace />}
              size="small"
              onClick={handleReset}
              fullWidth
            >
              {t("button.reset_list", { category: translatedCategory })}
          </Button>
        </Stack>
      }
      opened={showSettingsPopover}
      onClose={togglePopover}
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
  );
}

export default Settings;
