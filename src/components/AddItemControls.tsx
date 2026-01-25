import { Button, Field, HStack, Input } from "@chakra-ui/react"
import {
  type ChangeEvent,
  type FormEvent,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react"
import { useTranslation } from "react-i18next"
import { PRIMARY_COLOR_PALETTE } from "../consts"
import { capitalize } from "../services/helpers"

type Props = {
  handleSubmitNewItem: (item: string) => void
  doesAlreadyExistInItems: (item: string) => boolean
}

const AddItemControls = ({ handleSubmitNewItem, doesAlreadyExistInItems }: Props): ReactNode => {
  const { t } = useTranslation()
  const inputRef = useRef<HTMLInputElement>(null)
  const [newItem, setNewItem] = useState<{ value: string; error: string | null }>({
    value: "",
    error: null,
  })

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewItem({ error: null, value: capitalize(e.target.value) })
  }

  const handleValidateAndSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!newItem.value) {
      setNewItem({ ...newItem, error: t("input.error.enter_item") })
    } else if (doesAlreadyExistInItems(newItem.value)) {
      setNewItem({ ...newItem, error: t("input.error.already_exist") })
    } else {
      handleSubmitNewItem(newItem.value)
    }
  }

  return (
    <HStack as="form" onSubmit={handleValidateAndSubmit} gap="8px" align="flex-start">
      <Field.Root invalid={!!newItem.error} flex="1">
        <Input
          ref={inputRef}
          name="New item"
          placeholder={t("placeholder.type_item")}
          value={newItem.value}
          onChange={handleInputChange}
          rounded="md"
        />
        {newItem.error && <Field.ErrorText>{newItem.error}</Field.ErrorText>}
      </Field.Root>
      <Button type="submit" colorPalette={PRIMARY_COLOR_PALETTE} rounded="md">
        {t("button.save")}
      </Button>
    </HStack>
  )
}

export default AddItemControls
