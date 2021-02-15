// @flow
import React from "react"
import { screen, fireEvent } from "@testing-library/react"
import { within } from "@testing-library/dom"
import renderWithProviders from "../../services/test-utils/renderWithProviders"
import App from "../../App"

jest.mock("@kiwicom/orbit-components/lib/hooks/useMediaQuery", () => () => ({
  isLargeMobile: true,
}))

describe("App", () => {
  beforeEach(() => {
    renderWithProviders(<App />)
  })

  it("renders all text in English", () => {
    //language picker
    expect(screen.getByRole("button", { name: "English" })).toBeVisible()

    // title in header
    expect(
      within(screen.getByRole("banner")).getByRole("heading", { name: "Travel packing list" }),
    ).toBeVisible()

    // title in navbar
    expect(within(screen.getByRole("navigation")).getByText("Travel packing list")).toBeVisible()

    // card headings
    expect(screen.getByRole("heading", { name: "Essentials" })).toBeVisible()
    expect(screen.getByRole("heading", { name: "Clothes and shoes" })).toBeVisible()
    expect(screen.getByRole("heading", { name: "Toiletries" })).toBeVisible()
    expect(screen.getByRole("heading", { name: "Other" })).toBeVisible()

    // checkboxes
    expect(screen.getByRole("checkbox", { name: "Passport" })).toBeInTheDocument()
  })

  it("changes all text to Spanish after selecting Spanish language", () => {
    expect(screen.queryByRole("button", { name: "Español" })).toBeNull()
    fireEvent.click(screen.getByRole("button", { name: "English" }))
    expect(screen.getByRole("tooltip")).toBeVisible()
    fireEvent.click(screen.getByRole("link", { name: "Español" }))

    // language picker
    expect(screen.getByRole("button", { name: "Español" })).toBeVisible()

    // title in header
    expect(
      within(screen.getByRole("banner")).getByRole("heading", { name: "Lista de viaje" }),
    ).toBeVisible()

    // title in navbar
    expect(within(screen.getByRole("navigation")).getByText("Lista de viaje")).toBeVisible()

    // card headings
    expect(screen.getByRole("heading", { name: "Esenciales" })).toBeVisible()
    expect(screen.getByRole("heading", { name: "Ropa y zapatos" })).toBeVisible()
    expect(screen.getByRole("heading", { name: "Artículos de tocador" })).toBeVisible()
    expect(screen.getByRole("heading", { name: "Otro" })).toBeVisible()

    // checkboxes
    expect(screen.getByRole("checkbox", { name: "Pasaporte" })).toBeInTheDocument()
  })

  it("changes all text to Slovenian after selecting Slovenian language", () => {
    expect(screen.queryByRole("button", { name: "Slovenščina" })).toBeNull()
    fireEvent.click(screen.getByRole("button", { name: "Español" }))
    expect(screen.getByRole("tooltip")).toBeVisible()
    fireEvent.click(screen.getByRole("link", { name: "Slovenščina" }))

    // language picker
    expect(screen.getByRole("button", { name: "Slovenščina" })).toBeVisible()

    // title in header
    expect(
      within(screen.getByRole("banner")).getByRole("heading", { name: "Potovalni seznam" }),
    ).toBeVisible()

    // title in navbar
    expect(within(screen.getByRole("navigation")).getByText("Potovalni seznam")).toBeVisible()

    // card headings
    expect(screen.getByRole("heading", { name: "Osnovne potrebščine" })).toBeVisible()
    expect(screen.getByRole("heading", { name: "Oblačila in obutev" })).toBeVisible()
    expect(screen.getByRole("heading", { name: "Toaletne potrebščine" })).toBeVisible()
    expect(screen.getByRole("heading", { name: "Razno" })).toBeVisible()

    // checkboxes
    expect(screen.getByRole("checkbox", { name: "Potni list" })).toBeInTheDocument()
  })

  it("displays link to my portfolio and to Orbit website", () => {
    expect(screen.getByRole("link", { name: "Žana Flander" })).toBeVisible()
    expect(screen.getByRole("link", { name: "Žana Flander" })).toHaveAttribute(
      "href",
      "https://flanzana.github.io/",
    )

    expect(screen.getByRole("link", { name: "Orbit" })).toBeVisible()
    expect(screen.getByRole("link", { name: "Orbit" })).toHaveAttribute(
      "href",
      "https://orbit.kiwi",
    )
  })
})
