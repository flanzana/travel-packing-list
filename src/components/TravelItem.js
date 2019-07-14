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

function TravelItem({ item, shouldResetAll, handleUnreset }) {
  const initialChecked = () => (JSON.parse(window.localStorage.getItem(`${item}-checked`)) || false);
  const initialDeleted = () => (JSON.parse(window.localStorage.getItem(`${item}-deleted`)) || false);

  const [ checked, setChecked ] = useState(initialChecked);
  const [ deleted, setDeleted ] = useState(initialDeleted);

  useEffect(() => {
    // reset whole card after pressing button reset
    if (shouldResetAll) {
      setChecked(false);
      setDeleted(false);
      handleUnreset();
    }

    // store in local storage
    window.localStorage.setItem(`${item}-checked`, checked);
    window.localStorage.setItem(`${item}-deleted`, deleted);
  }, [shouldResetAll, handleUnreset, checked, deleted, item]);

  const handleCheckbox = () => {
    setChecked(!checked);
  };

  if (deleted) {
    return <></>
  }

  return (
    <Stack direction="row" align="start" justify="between" spacing="natural">
      <Checkbox
        label={item}
        name={item}
        value={item}
        checked={checked}
        onChange={handleCheckbox}
      />
      <StyledButtonLink
        type="secondary"
        size="small"
        iconLeft={<Remove color="critical" />}
        title={`Delete item ${item}`}
        transparent
        onClick={() => setDeleted(true)}
      />
    </Stack>
  );
}

export default TravelItem;
