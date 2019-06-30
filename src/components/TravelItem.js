import React, { useState } from 'react';
import styled from "styled-components";
import { defaultTokens } from "@kiwicom/orbit-design-tokens";
import Stack from "@kiwicom/orbit-components/lib/Stack";
import Checkbox from "@kiwicom/orbit-components/lib/Checkbox";
import ButtonLink from "@kiwicom/orbit-components/lib/ButtonLink";
import Close from "@kiwicom/orbit-components/lib/icons/Close";
import Plus from "@kiwicom/orbit-components/lib/icons/Plus";

const { heightCheckbox, widthCheckbox } = defaultTokens;

const StyledButtonLink = styled(ButtonLink)`
  height: ${heightCheckbox};
  width: ${widthCheckbox};
`;

function TravelItem({ item }) {
  const [ active, setActive ] = useState(false);
  const [ disabled, setDisabled ] = useState(false);

  const handleDisabled = () => {
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
        onChange={() => setActive(!active)}
        disabled={disabled}
      />
      <StyledButtonLink
        type="secondary"
        size="small"
        iconLeft={disabled ? <Plus color="secondary" /> : <Close color="critical" />}
        title={disabled ? `Enable ${item}` : `Disable ${item}`}
        circled
        transparent
        onClick={() => handleDisabled()}
      />
    </Stack>
  );
}

export default TravelItem;
