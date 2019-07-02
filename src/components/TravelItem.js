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

function TravelItem({ item, shouldResetAll, onUndoReset }) {
  const [ active, setActive ] = useState(false);
  const [ disabled, setDisabled ] = useState(false);

  useEffect(() => {
    shouldResetAll && handleInitial()
  });

  const handleInitial = () => {
    setActive(false);
    setDisabled(false);
    onUndoReset();
  };

  const handleCheckbox = () => {
    setActive(!active);
  };

  const handleDisable = () => {
    setDisabled(!disabled);
    setActive(false);
  };

  return (
    <Stack direction="row" align="start" justify="between" spacing="natural">
      <Checkbox
        label={item}
        name={item}
        value={item}
        checked={!disabled && active}
        onChange={() => handleCheckbox()}
        disabled={disabled}
      />
      <StyledButtonLink
        type="secondary"
        size="small"
        iconLeft={disabled ? <Edit color="tertiary" /> : <EditOff color="tertiary" />}
        title={disabled ? `Enable item ${item}` : `Disable item ${item}`}
        circled
        transparent
        onClick={() => handleDisable()}
      />
    </Stack>
  );
}

export default TravelItem;
