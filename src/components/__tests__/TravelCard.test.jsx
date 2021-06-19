// @flow
import React from "react"
import { screen, fireEvent, within, waitForElementToBeRemoved } from "@testing-library/react"
import renderWithProviders from "../../services/testUtils/renderWithProviders"
import TravelCard from "../TravelCard"
import { LIST_CATEGORIES } from "../../services/consts"
import localStorageMock from "../../services/testUtils/localStorageMock"

const initialCardItems = [
  { tKey: "item.passport", isChecked: false },
  { tKey: "item.cash", isChecked: false },
  { tKey: "item.credit_card", isChecked: false },
]

const updatedCardItems = [
  { tKey: "item.passport", isChecked: true },
  { tKey: "item.credit_card", isChecked: false },
  { tKey: "Insurance", isChecked: true },
]

const setup = cardItems => {
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
    <TravelCard category={LIST_CATEGORIES.ESSENTIALS} initialCardItems={initialCardItems} />,
  )
}

const clickButton = name => {
  fireEvent.click(screen.getByRole("button", { name }))
}

const openSettingsAndClickButton = buttonLabel => {
  clickButton("Settings of the list Essentials")
  expect(screen.getByRole("tooltip", { name: /Settings of the list Essentials/i })).toBeVisible()
  clickButton(buttonLabel)
}

const checkUncheckedCheckbox = name => {
  expect(screen.getByRole("checkbox", { name })).not.toBeChecked()
  fireEvent.click(screen.getByRole("checkbox", { name }))
  expect(screen.getByRole("checkbox", { name })).toBeChecked()
}

describe("TravelCard", () => {
  it("renders heading, 3 checkboxes, add item button and settings button", () => {
    setup()

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

  it("can check checkbox", () => {
    setup()

    // Given: I have unchecked Passport checkbox
    // When: I click on Passport checkbox
    // Then: Passport checkbox is checked
    checkUncheckedCheckbox("Passport")
  })

  it("can toggle settings popover", async () => {
    setup()

    // Given: settings popover is not visible
    expect(screen.queryByRole("tooltip", { name: /Settings of the list Essentials/i })).toBeNull()

    // When: I open settings
    clickButton("Settings of the list Essentials")

    // Then: I see settings popover with 5 buttons (4 settings buttons + Close)
    expect(screen.getByRole("tooltip", { name: /Settings of the list Essentials/i })).toBeVisible()
    expect(within(screen.getByRole("tooltip")).getAllByRole("button")).toHaveLength(5)
    ;["Check all", "Uncheck all", "Select and remove items", "Reset the list", "Close"].forEach(
      name => {
        expect(within(screen.getByRole("tooltip")).getByRole("button", { name })).toBeVisible()
      },
    )

    // When: I close settings popover
    clickButton("Close")

    // Then: settings popover is not visible
    await waitForElementToBeRemoved(() => screen.queryByRole("tooltip"))
  })

  it("can add new item to the list", () => {
    setup()

    // Given: I want to add Insurance item
    expect(screen.queryByRole("textbox")).toBeNull()
    expect(screen.queryByRole("checkbox", { name: "Insurance" })).toBeNull()

    // When: I click Add item
    clickButton("Add item")

    // Then: I see input field, no Add item anymore
    expect(screen.getByRole("textbox")).toBeVisible()
    expect(screen.queryByRole("button", { name: "Add item" })).toBeNull()

    // When: I try to submit new item without typing the name
    clickButton("Save")

    // Then: I see error Please enter an item.
    expect(screen.getByText("Please enter an item.")).toBeVisible()

    // When: I type same item as already in the list
    fireEvent.change(screen.getByRole("textbox"), { target: { value: "Passport" } })
    clickButton("Save")

    // Then: I see error Item already exists.
    expect(screen.getByText("Item already exists.")).toBeVisible()

    // When: I type name Insurance (not exist yet in the list)
    fireEvent.change(screen.getByRole("textbox"), { target: { value: "Insurance" } })

    // And: I submit it
    clickButton("Save")

    // Then: I see new unchecked checkbox Insurance
    // And: I can check it
    checkUncheckedCheckbox("Insurance")
  })

  it("can remove items from the list", () => {
    setup([...updatedCardItems, { tKey: "item.cash", isChecked: false }])

    const formattedItems = [
      { name: "Passport", checked: true },
      { name: "Credit card", checked: false },
      { name: "Cash", checked: false },
      { name: "Insurance", checked: true },
    ]

    // Given: I have 4 checkboxes
    expect(screen.getAllByRole("checkbox")).toHaveLength(4)
    formattedItems.forEach(options => {
      expect(screen.getByRole("checkbox", options)).not.toBeDisabled()
    })

    // When: I click remove items in the settings
    openSettingsAndClickButton("Select and remove items")

    // Then: checkboxes and button Add item are disabled
    formattedItems.forEach(options => {
      expect(screen.getByRole("checkbox", options)).toBeDisabled()
    })
    expect(screen.getByRole("button", { name: "Add item" })).toBeDisabled()

    // When: I delete Cash item
    clickButton("Delete item Cash")

    // And: I click Done
    clickButton("Done")

    // Then: I have 3 checkboxes (not disabled), without Cash checkbox
    expect(screen.getAllByRole("checkbox")).toHaveLength(3)
    ;[
      { name: "Passport", checked: true },
      { name: "Credit card", checked: false },
      { name: "Insurance", checked: true },
    ].forEach(options => {
      expect(screen.getByRole("checkbox", options)).not.toBeDisabled()
    })
    expect(screen.queryByRole("checkbox", { name: "Cash" })).toBeNull()
  })

  it("can reset list to default values", () => {
    setup(updatedCardItems)

    // Given: I have checked Passport and Insurance, unchecked Credit card
    expect(screen.getAllByRole("checkbox")).toHaveLength(3)
    expect(screen.getByRole("checkbox", { name: "Passport" })).toBeChecked()
    expect(screen.getByRole("checkbox", { name: "Credit card" })).not.toBeChecked()
    expect(screen.getByRole("checkbox", { name: "Insurance" })).toBeChecked()

    // When: I click reset the list in the settings
    openSettingsAndClickButton("Reset the list")

    // Then: I only see initial checkboxes Passport, Cash and Credit card, all unchecked
    expect(screen.getAllByRole("checkbox")).toHaveLength(3)
    ;["Passport", "Cash", "Credit card"].forEach(name => {
      expect(screen.getByRole("checkbox", { name })).not.toBeChecked()
    })
  })

  it("can uncheck all items on the list", () => {
    setup(updatedCardItems)

    // Given: I have checked Passport and Insurance, unchecked Credit card
    expect(screen.getAllByRole("checkbox")).toHaveLength(3)
    expect(screen.getByRole("checkbox", { name: "Passport" })).toBeChecked()
    expect(screen.getByRole("checkbox", { name: "Credit card" })).not.toBeChecked()
    expect(screen.getByRole("checkbox", { name: "Insurance" })).toBeChecked()

    // When: I click uncheck all items in the settings
    openSettingsAndClickButton("Uncheck all")

    // Then: I see Passport, Insurance, Credit card unchecked
    expect(screen.getAllByRole("checkbox")).toHaveLength(3)
    ;["Passport", "Credit card", "Insurance"].forEach(name => {
      expect(screen.getByRole("checkbox", { name })).not.toBeChecked()
    })
  })

  it("can check all items on the list", () => {
    setup(updatedCardItems)

    // Given: I have checked Passport and Insurance, unchecked Credit card
    expect(screen.getAllByRole("checkbox")).toHaveLength(3)
    expect(screen.getByRole("checkbox", { name: "Passport" })).toBeChecked()
    expect(screen.getByRole("checkbox", { name: "Credit card" })).not.toBeChecked()
    expect(screen.getByRole("checkbox", { name: "Insurance" })).toBeChecked()

    // When: I click check all items in the settings
    openSettingsAndClickButton("Check all")

    // Then: I see Passport, Insurance, Credit card checked
    expect(screen.getAllByRole("checkbox")).toHaveLength(3)
    ;["Passport", "Credit card", "Insurance"].forEach(name => {
      expect(screen.getByRole("checkbox", { name })).toBeChecked()
    })
  })
})
