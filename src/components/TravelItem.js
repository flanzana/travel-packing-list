import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { defaultTokens } from "@kiwicom/orbit-design-tokens";
import Stack from "@kiwicom/orbit-components/lib/Stack";
import Checkbox from "@kiwicom/orbit-components/lib/Checkbox";
import ButtonLink from "@kiwicom/orbit-components/lib/ButtonLink";
import Remove from "@kiwicom/orbit-components/lib/icons/Remove";

const { heightCheckbox, widthCheckbox } = defaultTokens;

const StyledButtonLink = styled(ButtonLink)`
  height: ${heightCheckbox};
  width: ${widthCheckbox};
`;

function TravelItem({ item, shouldResetAll, handleUnreset, handleDeleteItem }) {
  const initialChecked = () => (JSON.parse(window.localStorage.getItem(`${item}-checked`)) || false);
  const [ checked, setChecked ] = useState(initialChecked);

  useEffect(() => {
    // store in local storage
    window.localStorage.setItem(`${item}-checked`, checked);

    // reset whole card after pressing button reset
    if (shouldResetAll) {
      setChecked(false);
      handleUnreset();
    }
  }, [shouldResetAll, handleUnreset, checked, item]);

  return (
    <Stack direction="row" align="start" justify="between" spacing="natural">
      <Checkbox
        label={item}
        name={item}
        value={item}
        checked={checked}
        onChange={() => setChecked(!checked)}
      />
      <StyledButtonLink
        type="secondary"
        size="small"
        iconLeft={<Remove color="critical" />}
        title={`Delete item ${item}`}
        transparent
        onClick={handleDeleteItem}
      />
    </Stack>
  );
}

export default TravelItem;
