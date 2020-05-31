import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { useTranslation } from 'react-i18next';
import { defaultTokens } from "@kiwicom/orbit-design-tokens";
import Stack from "@kiwicom/orbit-components/lib/Stack";
import Checkbox from "@kiwicom/orbit-components/lib/Checkbox";
import ButtonLink from "@kiwicom/orbit-components/lib/ButtonLink";
import Close from "@kiwicom/orbit-components/lib/icons/Close";

const { heightCheckbox, widthCheckbox } = defaultTokens;

const StyledButtonLink = styled.div`
button {
  height: ${heightCheckbox};
  width: ${widthCheckbox};
}
`;

function TravelItem({ item, shouldResetAll, handleUnreset, handleDeleteItem, showDelete }) {
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

  const { t } = useTranslation();

  return (
    <Stack direction="row" align="start" justify="between" spacing="natural">
      <Checkbox
        label={t(item)}
        name={item}
        value={item}
        checked={checked}
        onChange={() => setChecked(!checked)}
        disabled={showDelete}
      />
      {showDelete && (
        <StyledButtonLink>
          <ButtonLink
            type="secondary"
            size="small"
            iconLeft={<Close color="critical" />}
            title={`Delete item ${item}`}
            transparent
            onClick={handleDeleteItem}
          />
        </StyledButtonLink>
      )}
    </Stack>
  );
}

export default TravelItem;
