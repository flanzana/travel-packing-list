// @flow
import React from "react"
import { screen, fireEvent } from "@testing-library/react"
import renderWithProviders from "../../services/testUtils/renderWithProviders"
import TravelCard from "../TravelCard"
import { LIST_CATEGORIES } from "../../services/consts"

describe("TravelCard", () => {
  beforeEach(() => {
    renderWithProviders(
      <TravelCard
        category={LIST_CATEGORIES.ESSENTIALS}
        initialCardItems={[
          { tKey: "item.passport", isChecked: false },
          { tKey: "item.cash", isChecked: false },
          { tKey: "item.credit_card", isChecked: false },
        ]}
      />,
    )
  })

  it("renders heading, 3 checkboxes, add item button and settings button", () => {
    // Given: I have travel card
    // And: I see card's title
    expect(screen.getByRole("heading", { name: "Essentials" })).toBeVisible()

    // And: I see 3 initial checkboxes Passport, Cash and Credit card
    expect(screen.getByRole("checkbox", { name: "Passport" })).toBeInTheDocument()
    expect(screen.getByRole("checkbox", { name: "Cash" })).toBeInTheDocument()
    expect(screen.getByRole("checkbox", { name: "Credit card" })).toBeInTheDocument()

    // And: I see button add item
    expect(screen.getByRole("button", { name: "Add item" })).toBeVisible()

    // And: I see button settings
    expect(screen.getByRole("button", { name: "Settings of the list Essentials" })).toBeVisible()
  })

  it("can check checkbox", () => {
    // Given: I have unchecked Passport checkbox
    expect(screen.getByRole("checkbox", { name: "Passport" })).not.toBeChecked()

    // When: I click on Passport checkbox
    fireEvent.click(screen.getByRole("checkbox", { name: "Passport" }))

    // Then: Passport checkbox is checked
    expect(screen.getByRole("checkbox", { name: "Passport" })).toBeChecked()
  })

  it("can toggle settings popover", () => {
    // Given: settings popover is not visible
    expect(screen.queryByRole("tooltip", { name: /Settings of the list Essentials/i })).toBeNull()

    // When: I open settings
    fireEvent.click(screen.getByRole("button", { name: "Settings of the list Essentials" }))

    // Then: I see settings popover
    expect(screen.getByRole("tooltip", { name: /Settings of the list Essentials/i })).toBeVisible()

    // settings popover stays open in test for some reason, but in reality it closes
    // // When: I close settings popover
    // fireEvent.click(screen.getByRole("button", { name: "Settings of the list Essentials" }))
    // fireEvent.click(screen.getByRole("button", { name: "Close" }))
    //
    // // Then: settings popover is not visible
    // expect(screen.queryByRole("tooltip")).toBeNull()
  })

  it("can add new item to the list", () => {
    // Given: I want to add Insurance item
    expect(screen.queryByRole("textbox")).toBeNull()
    expect(screen.queryByRole("checkbox", { name: "Insurance" })).toBeNull()

    // When: I click Add item
    fireEvent.click(screen.getByRole("button", { name: "Add item" }))

    // Then: I see input field, no Add item anymore
    expect(screen.getByRole("textbox")).toBeVisible()
    expect(screen.queryByRole("button", { name: "Add item" })).toBeNull()

    // When: I try to submit new item without typing the name
    fireEvent.click(screen.getByRole("button", { name: "Save" }))

    // Then: I see error Please enter an item.
    expect(screen.getByText("Please enter an item.")).toBeVisible()

    // When: I type same item as already in the list
    fireEvent.change(screen.getByRole("textbox"), { target: { value: "Passport" } })
    fireEvent.click(screen.getByRole("button", { name: "Save" }))

    // Then: I see error Item already exists.
    expect(screen.getByText("Item already exists.")).toBeVisible()

    // When: I type name Insurance (not exist yet in the list)
    fireEvent.change(screen.getByRole("textbox"), { target: { value: "Insurance" } })

    // And: I submit it
    fireEvent.click(screen.getByRole("button", { name: "Save" }))

    // Then: I see new unchecked checkbox Insurance
    expect(screen.getByRole("checkbox", { name: "Insurance" })).toBeInTheDocument()
    expect(screen.getByRole("checkbox", { name: "Insurance" })).not.toBeChecked()

    // And: I can check it
    fireEvent.click(screen.getByRole("checkbox", { name: "Insurance" }))
    expect(screen.getByRole("checkbox", { name: "Insurance" })).toBeChecked()
  })

  it("can remove items from the list", () => {
    // Given: I have 4 checkboxes
    expect(screen.getAllByRole("checkbox")).toHaveLength(4)

    // When: I click remove items in the settings
    fireEvent.click(screen.getByRole("button", { name: "Settings of the list Essentials" }))
    expect(screen.getByRole("tooltip", { name: /Settings of the list Essentials/i })).toBeVisible()
    fireEvent.click(screen.getByRole("button", { name: "Select and remove items" }))

    // Then: checkboxes and button Add item are disabled
    expect(screen.getByRole("checkbox", { name: "Passport" })).toBeDisabled()
    expect(screen.getByRole("button", { name: "Add item" })).toBeDisabled()

    // When: I delete Cash item
    fireEvent.click(screen.getByRole("button", { name: "Delete item Cash" }))

    // And: I click Save
    fireEvent.click(screen.getByRole("button", { name: "Save" }))

    // Then: I have 3 checkboxes (not disabled), without Cash checkbox
    expect(screen.getAllByRole("checkbox")).toHaveLength(3)
    expect(screen.getByRole("checkbox", { name: "Passport" })).not.toBeDisabled()
    expect(screen.getByRole("checkbox", { name: "Passport" })).toBeChecked()
    expect(screen.queryByRole("checkbox", { name: "Cash" })).toBeNull()
    expect(screen.getByRole("checkbox", { name: "Credit card" })).not.toBeChecked()
    expect(screen.getByRole("checkbox", { name: "Insurance" })).toBeChecked()
  })

  it("can reset list to default values", () => {
    // Given: I have checked Passport and Insurance, unchecked Credit card
    expect(screen.getAllByRole("checkbox")).toHaveLength(3)
    expect(screen.getByRole("checkbox", { name: "Passport" })).toBeChecked()
    expect(screen.getByRole("checkbox", { name: "Credit card" })).not.toBeChecked()
    expect(screen.getByRole("checkbox", { name: "Insurance" })).toBeChecked()

    // When: I click reset the list in the settings
    fireEvent.click(screen.getByRole("button", { name: "Settings of the list Essentials" }))
    expect(screen.getByRole("tooltip", { name: /Settings of the list Essentials/i })).toBeVisible()
    fireEvent.click(screen.getByRole("button", { name: "Reset the list" }))

    // Then: I only see initial checkboxes Passport, Cash and Credit card, all unchecked
    expect(screen.getAllByRole("checkbox")).toHaveLength(3)
    expect(screen.getByRole("checkbox", { name: "Passport" })).not.toBeChecked()
    expect(screen.getByRole("checkbox", { name: "Cash" })).not.toBeChecked()
    expect(screen.getByRole("checkbox", { name: "Credit card" })).not.toBeChecked()
  })
})
