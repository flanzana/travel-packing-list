import { useState, ReactNode, SyntheticEvent } from "react"
import { useTranslation } from "react-i18next"
import Button from "@kiwicom/orbit-components/lib/Button"
import Stack from "@kiwicom/orbit-components/lib/Stack"
import InputField from "@kiwicom/orbit-components/lib/InputField"
import { capitalize } from "../services/helpers"

type Props = {
  handleSubmitNewItem: (item: string) => void
  doesAlreadyExistInItems: (item: string) => boolean
}

const AddItemControls = ({ handleSubmitNewItem, doesAlreadyExistInItems }: Props): ReactNode => {
  const { t } = useTranslation()
  const [newItem, setNewItem] = useState<{ value: string; error: string | null }>({
    value: "",
    error: null,
  })

  const handleInputChange = (e: SyntheticEvent<HTMLInputElement>) => {
    setNewItem({ error: null, value: capitalize((e.target as HTMLInputElement).value) })
  }

  const handleValidateAndSubmit = (e: SyntheticEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    if (!newItem.value) {
      setNewItem({ ...newItem, error: t("input.error.enter_item") })
    } else if (doesAlreadyExistInItems(newItem.value)) {
      setNewItem({ ...newItem, error: t("input.error.already_exist") })
    } else {
      e.preventDefault()
      handleSubmitNewItem(newItem.value)
    }
  }

  return (
    <Stack direction="row" spacing="XSmall">
      <InputField
        name="New item"
        placeholder={t("placeholder.type_item")}
        value={newItem.value}
        onChange={handleInputChange}
        error={newItem.error}
        ref={input => input && input.focus()}
      />
      <Button onClick={handleValidateAndSubmit}>{t("button.save")}</Button>
    </Stack>
  )
}

export default AddItemControls
