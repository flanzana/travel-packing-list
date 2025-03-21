import { vi } from "vitest"
import { act, screen, within, waitFor, waitForElementToBeRemoved } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Props as TooltipProps } from "@kiwicom/orbit-components/lib/ErrorFormTooltip/Tooltip/types"

import renderWithProviders from "../../services/testUtils/renderWithProviders"
import TravelCard from "../TravelCard"
import { CardItem, ListCategory } from "../../types"
import localStorageMock from "../../services/testUtils/localStorageMock"

vi.mock(
  "@kiwicom/orbit-components/lib/ErrorFormTooltip/Tooltip",
  () =>
    // eslint-disable-next-line react/display-name
    ({ children, shown }: TooltipProps) =>
      shown ? <div data-test="orbit-dialog">{children}</div> : null,
)

const initialCardItems: CardItem[] = [
  { tKey: "item.passport", isChecked: false },
  { tKey: "item.cash", isChecked: false },
  { tKey: "item.credit_card", isChecked: false },
]

const updatedCardItems: CardItem[] = [
  { tKey: "item.passport", isChecked: true },
  { tKey: "item.credit_card", isChecked: false },
  { tKey: "Insurance", isChecked: true },
]

const formattedItems = [
  { name: "Passport", checked: true },
  { name: "Credit card", checked: false },
  { name: "Insurance", checked: true },
]

const updatedCardItemsWithCash: CardItem[] = [
  ...updatedCardItems,
  { tKey: "item.cash", isChecked: false },
]

const formattedItemsWithCash = [...formattedItems, { name: "Cash", checked: false }]

const renderComponent = (cardItems?: CardItem[]) => {
  Object.defineProperty(window, "localStorage", {
    value: localStorageMock(
      cardItems
        ? {
            "travel-packing-list:list-essentials": JSON.stringify(cardItems),
          }
        : {},
    ),
    writable: true,
  })

  return renderWithProviders(
    <TravelCard category={ListCategory.ESSENTIALS} initialCardItems={initialCardItems} />,
  )
}

const clickButton = (name: string) => {
  userEvent.click(screen.getByRole("button", { name }))
}

const openSettingsAndClickButton = async (buttonLabel: string) => {
  await act(() =>
    userEvent.click(screen.getByRole("button", { name: "Settings of the list Essentials" })),
  )
  expect(await screen.findByRole("dialog")).toBeVisible()
  expect(
    within(screen.getByRole("dialog")).getByText("Settings of the list Essentials"),
  ).toBeVisible()
  clickButton(buttonLabel)
  await waitForElementToBeRemoved(() => screen.queryByRole("dialog"))
}

const checkUncheckedCheckbox = async (name: string) => {
  expect(screen.getByRole("checkbox", { name })).not.toBeChecked()
  await act(() => userEvent.click(screen.getByRole("checkbox", { name })))
  expect(screen.getByRole("checkbox", { name })).toBeChecked()
}

describe("TravelCard", () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.resetAllMocks()
  })

  it("renders heading, 3 checkboxes, add item button and settings button", () => {
    renderComponent()

    // Given: I have travel card
    // And: I see card's title
    expect(screen.getByRole("heading", { name: "Essentials" })).toBeVisible()

    // And: I see 3 initial checkboxes Passport, Cash and Credit card
    ;["Passport", "Cash", "Credit card"].forEach(name => {
      expect(screen.getByRole("checkbox", { name })).not.toBeChecked()
    })

    // And: I see button add item
    expect(screen.getByRole("button", { name: "Add item" })).toBeVisible()

    // And: I see button settings
    expect(screen.getByRole("button", { name: "Settings of the list Essentials" })).toBeVisible()
  })

  it("can check checkbox", async () => {
    renderComponent()

    // Given: I have unchecked Passport checkbox
    // When: I click on Passport checkbox
    // Then: Passport checkbox is checked
    await checkUncheckedCheckbox("Passport")
  })

  it("can toggle settings popover", async () => {
    renderComponent()

    // Given: settings popover is not visible
    expect(screen.queryByRole("dialog")).toBeNull()

    // When: I open settings
    await act(() =>
      userEvent.click(screen.getByRole("button", { name: "Settings of the list Essentials" })),
    )

    // Then: I see settings popover with 5 buttons (4 settings buttons + Close)
    expect(await screen.findByRole("dialog")).toBeVisible()
    expect(within(screen.getByRole("dialog")).getAllByRole("button")).toHaveLength(5)
    expect(
      within(screen.getByRole("dialog")).getByText("Settings of the list Essentials"),
    ).toBeVisible()
    ;["Check all", "Uncheck all", "Select and remove items", "Reset the list", "Close"].forEach(
      name => {
        expect(within(screen.getByRole("dialog")).getByRole("button", { name })).toBeVisible()
      },
    )

    // When: I close settings popover
    clickButton("Close")

    // Then: settings popover is not visible
    await waitForElementToBeRemoved(() => screen.queryByRole("dialog"))
  })

  it("cannot add new item to the list if nothing typed", async () => {
    renderComponent()

    // Given: I want to add new item
    expect(screen.queryByRole("textbox")).toBeNull()
    expect(screen.getAllByRole("checkbox")).toHaveLength(3)

    // When: I click Add item
    clickButton("Add item")

    // Then: I see input field, no Add item anymore
    await waitForElementToBeRemoved(() => screen.queryByRole("button", { name: "Add item" }))
    expect(screen.getByRole("textbox")).toHaveAttribute("data-state", "ok")

    // When: I try to submit new item without typing the name
    clickButton("Save")

    // Then: I see error Please enter an item.
    await waitFor(() => expect(screen.getByRole("textbox")).toHaveAttribute("data-state", "error"))
    expect(screen.getByText("Please enter an item.")).toBeVisible()
    expect(screen.getAllByRole("checkbox")).toHaveLength(3)
  })

  it("cannot add new item to the list if item already exists", async () => {
    renderComponent()

    // Given: I want to add Passport item
    expect(screen.queryByRole("textbox")).toBeNull()
    expect(screen.getByRole("checkbox", { name: "Passport" })).toBeInTheDocument()
    expect(screen.getAllByRole("checkbox")).toHaveLength(3)

    // When: I click Add item
    clickButton("Add item")

    // Then: I see input field, no Add item anymore
    await waitForElementToBeRemoved(() => screen.queryByRole("button", { name: "Add item" }))
    expect(screen.getByRole("textbox")).toHaveAttribute("data-state", "ok")

    // When: I type same item as already in the list
    userEvent.type(screen.getByRole("textbox"), "Passport")
    await waitFor(() => expect(screen.getByRole("textbox")).toHaveValue("Passport"))
    clickButton("Save")

    // Then: I see error Item already exists.
    await waitFor(() => expect(screen.getByText("Item already exists.")).toBeVisible())
    expect(screen.getByRole("textbox")).toHaveAttribute("data-state", "error")
    expect(screen.getAllByRole("checkbox")).toHaveLength(3)
  })

  it("can add new item to the list", async () => {
    renderComponent()

    // Given: I want to add Insurance item
    expect(screen.queryByRole("textbox")).toBeNull()
    expect(screen.queryByRole("checkbox", { name: "Insurance" })).toBeNull()
    expect(screen.getAllByRole("checkbox")).toHaveLength(3)

    // When: I click Add item
    clickButton("Add item")

    // Then: I see input field, no Add item anymore
    await waitForElementToBeRemoved(() => screen.queryByRole("button", { name: "Add item" }))

    // When: I type name Insurance
    userEvent.type(screen.getByRole("textbox"), "Insurance")
    await waitFor(() => expect(screen.getByRole("textbox")).toHaveValue("Insurance"))

    // And: I submit it
    clickButton("Save")

    // Then: I do not see input field anymore
    await waitForElementToBeRemoved(() => screen.queryByRole("textbox"))

    // And: I see new unchecked checkbox Insurance
    // And: I can check it
    expect(screen.getAllByRole("checkbox")).toHaveLength(4)
    await checkUncheckedCheckbox("Insurance")
  })

  it("can remove items from the list", async () => {
    renderComponent(updatedCardItemsWithCash)

    // Given: I have 4 checkboxes
    expect(screen.getAllByRole("checkbox")).toHaveLength(4)
    formattedItemsWithCash.forEach(options => {
      expect(screen.getByRole("checkbox", options)).not.toBeDisabled()
    })

    // When: I click remove items in the settings
    await openSettingsAndClickButton("Select and remove items")

    // Then: checkboxes and button Add item are disabled
    formattedItemsWithCash.forEach(options => {
      expect(screen.getByRole("checkbox", options)).toBeDisabled()
    })
    expect(screen.getByRole("button", { name: "Add item" })).toBeDisabled()

    // When: I delete Cash item
    clickButton("Delete item Cash")

    // Then: I have 3 checkboxes (disabled), without Cash checkbox
    await waitForElementToBeRemoved(() => screen.queryByRole("checkbox", { name: "Cash" }))
    expect(screen.getAllByRole("checkbox")).toHaveLength(3)
    formattedItems.forEach(options => {
      expect(screen.getByRole("checkbox", options)).toBeDisabled()
    })

    // When: I click Done
    clickButton("Done")

    // Then: I have 3 checkboxes (not disabled)
    await waitForElementToBeRemoved(() => screen.queryByRole("button", { name: "Done" }))
    formattedItems.forEach(options => {
      expect(screen.getByRole("checkbox", options)).not.toBeDisabled()
    })
  })

  it("can reset list to default values", async () => {
    renderComponent(updatedCardItems)

    // Given: I have checked Passport and Insurance, unchecked Credit card
    expect(screen.getAllByRole("checkbox")).toHaveLength(3)
    expect(screen.getByRole("checkbox", { name: "Passport" })).toBeChecked()
    expect(screen.getByRole("checkbox", { name: "Credit card" })).not.toBeChecked()
    expect(screen.getByRole("checkbox", { name: "Insurance" })).toBeChecked()

    // When: I click reset the list in the settings
    await openSettingsAndClickButton("Reset the list")

    // Then: I only see initial checkboxes Passport, Cash and Credit card, all unchecked
    expect(screen.getAllByRole("checkbox")).toHaveLength(3)
    ;["Passport", "Cash", "Credit card"].forEach(name => {
      expect(screen.getByRole("checkbox", { name })).not.toBeChecked()
    })
  })

  it("can uncheck all items on the list", async () => {
    renderComponent(updatedCardItems)

    // Given: I have checked Passport and Insurance, unchecked Credit card
    expect(screen.getAllByRole("checkbox")).toHaveLength(3)
    expect(screen.getByRole("checkbox", { name: "Passport" })).toBeChecked()
    expect(screen.getByRole("checkbox", { name: "Credit card" })).not.toBeChecked()
    expect(screen.getByRole("checkbox", { name: "Insurance" })).toBeChecked()

    // When: I click uncheck all items in the settings
    await openSettingsAndClickButton("Uncheck all")

    // Then: I see Passport, Insurance, Credit card unchecked
    expect(screen.getAllByRole("checkbox")).toHaveLength(3)
    ;["Passport", "Credit card", "Insurance"].forEach(name => {
      expect(screen.getByRole("checkbox", { name })).not.toBeChecked()
    })
  })

  it("can check all items on the list", async () => {
    renderComponent(updatedCardItems)

    // Given: I have checked Passport and Insurance, unchecked Credit card
    expect(screen.getAllByRole("checkbox")).toHaveLength(3)
    expect(screen.getByRole("checkbox", { name: "Passport" })).toBeChecked()
    expect(screen.getByRole("checkbox", { name: "Credit card" })).not.toBeChecked()
    expect(screen.getByRole("checkbox", { name: "Insurance" })).toBeChecked()

    // When: I click check all items in the settings
    await openSettingsAndClickButton("Check all")

    // Then: I see Passport, Insurance, Credit card checked
    expect(screen.getAllByRole("checkbox")).toHaveLength(3)
    ;["Passport", "Credit card", "Insurance"].forEach(name => {
      expect(screen.getByRole("checkbox", { name })).toBeChecked()
    })
  })
})
