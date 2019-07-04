import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { defaultTokens } from "@kiwicom/orbit-design-tokens";
import Stack from "@kiwicom/orbit-components/lib/Stack";
import Checkbox from "@kiwicom/orbit-components/lib/Checkbox";
import ButtonLink from "@kiwicom/orbit-components/lib/ButtonLink";
import Edit from "@kiwicom/orbit-components/lib/icons/Edit";
import EditOff from "@kiwicom/orbit-components/lib/icons/EditOff";

const { heightCheckbox, widthCheckbox } = defaultTokens;

const StyledButtonLink = styled(ButtonLink)`
  height: ${heightCheckbox};
  width: ${widthCheckbox};
`;

function TravelItem({ item, shouldResetAll, handleUnreset }) {
  const initialChecked = () => (JSON.parse(window.localStorage.getItem(`${item}-checked`)) || false);
  const initialDisabled = () => (JSON.parse(window.localStorage.getItem(`${item}-disabled`)) || false);

  const [ checked, setChecked ] = useState(initialChecked);
  const [ disabled, setDisabled ] = useState(initialDisabled);

  useEffect(() => {
    // reset whole card after pressing button reset
    if (shouldResetAll) {
      setChecked(false);
      setDisabled(false);
      handleUnreset();
    }

    // store in local storage
    window.localStorage.setItem(`${item}-checked`, checked);
    window.localStorage.setItem(`${item}-disabled`, disabled);
  }, [shouldResetAll, handleUnreset, checked, disabled, item]);

  const handleCheckbox = () => {
    setChecked(!checked);
  };

  const handleDisable = () => {
    setDisabled(!disabled);
    setChecked(false);
  };

  return (
    <Stack direction="row" align="start" justify="between" spacing="natural">
      <Checkbox
        label={item}
        name={item}
        value={item}
        checked={!disabled && checked}
        onChange={handleCheckbox}
        disabled={disabled}
      />
      <StyledButtonLink
        type="secondary"
        size="small"
        iconLeft={disabled ? <Edit color="tertiary" /> : <EditOff color="tertiary" />}
        title={disabled ? `Enable item ${item}` : `Disable item ${item}`}
        circled
        transparent
        onClick={handleDisable}
      />
    </Stack>
  );
}

export default TravelItem;
