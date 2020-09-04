// @flow
import React, { useEffect } from "react"
import styled from "styled-components"
import { useTranslation } from "react-i18next"
import { defaultTokens } from "@kiwicom/orbit-design-tokens"
import Stack from "@kiwicom/orbit-components/lib/Stack"
import Checkbox from "@kiwicom/orbit-components/lib/Checkbox"
import ButtonLink from "@kiwicom/orbit-components/lib/ButtonLink"
import Close from "@kiwicom/orbit-components/lib/icons/Close"
import useLocalStorage from "../services/useLocalStorage"

const { heightCheckbox, widthCheckbox } = defaultTokens

const StyledButtonLink = styled.div`
  button {
    height: ${heightCheckbox};
    width: ${widthCheckbox};
  }
`

type Props = {
  item: string,
  shouldResetAll: boolean,
  showDelete: boolean,
  handleUnreset: () => void,
  handleDeleteItemFromData: string => void,
}

function TravelItem({
  item,
  shouldResetAll,
  handleUnreset,
  handleDeleteItemFromData,
  showDelete,
}: Props) {
  const [checked, setChecked, removeItem] = useLocalStorage(`${item}-checked`, false)
  const { t } = useTranslation()

  useEffect(() => {
    // reset whole card after pressing button reset
    if (shouldResetAll) {
      setChecked(false)
      handleUnreset()
    }
  }, [shouldResetAll, handleUnreset, setChecked, item])

  const handleDeleteItem = item => {
    handleDeleteItemFromData(item)
    removeItem()
  }

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
            onClick={() => handleDeleteItem(item)}
          />
        </StyledButtonLink>
      )}
    </Stack>
  )
}

export default TravelItem
