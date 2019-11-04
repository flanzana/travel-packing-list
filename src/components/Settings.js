import React from 'react';
import { useTranslation } from "react-i18next";
import Button from "@kiwicom/orbit-components/lib/Button";
import Stack from "@kiwicom/orbit-components/lib/Stack";
import Remove from "@kiwicom/orbit-components/lib/icons/Remove";
import Popover from "@kiwicom/orbit-components/lib/Popover";
import Replace from "@kiwicom/orbit-components/lib/icons/Replace";
import SettingsIcon from "@kiwicom/orbit-components/lib/icons/Settings";

function Settings({ category, togglePopover, toggleShowDelete, handleReset, showDelete, showInput, showSettingsPopover }) {
  const { t } = useTranslation();

  return (
    <Popover
      content={
        <Stack direction="column" spacing="natural" dataTest="Settings-popover">
          <Button
            type="secondary"
            iconLeft={<Remove />}
            size="small"
            onClick={toggleShowDelete}
          >
            Select and remove items
          </Button>
          <Button
              type="critical"
              iconLeft={<Replace />}
              size="small"
              onClick={handleReset}
            >
              Reset the list {category}
          </Button>
        </Stack>
      }
      opened={showSettingsPopover}
    >
      <Button
        size="small"
        type="secondary"
        iconLeft={<SettingsIcon />}
        title="Settings"
        onClick={togglePopover}
        disabled={showDelete || showInput}
      />
    </Popover>
  );
}

export default Settings;
