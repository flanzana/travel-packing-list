// @flow
import React from "react"
import { screen, fireEvent } from "@testing-library/react"
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

    // main title
    expect(screen.getByRole("heading", { name: /travel packing list/i })).toBeVisible()

    // card headings
    expect(screen.getByRole("heading", { name: "Essentials" })).toBeVisible()
    expect(screen.getByRole("heading", { name: "Clothes and shoes" })).toBeVisible()
    expect(screen.getByRole("heading", { name: "Toiletries" })).toBeVisible()
    expect(screen.getByRole("heading", { name: "Other" })).toBeVisible()

    // checkboxes
    expect(screen.getByRole("checkbox", { name: "Passport" })).toBeInTheDocument()
  })

  it("changes all text to Spanish after selecting Spanish language", () => {
    expect(screen.queryByRole("button", { name: /español español/i })).toBeNull()
    fireEvent.click(screen.getByRole("button", { name: "English" }))
    expect(screen.getByRole("tooltip")).toBeInTheDocument()
    fireEvent.click(screen.getByRole("button", { name: /español español/i }))

    // language picker
    expect(screen.getByRole("button", { name: "Español" })).toBeVisible()

    // main title
    expect(
      screen.getByRole("heading", { name: /lista para hacer la maleta de viaje/i }),
    ).toBeVisible()

    // card headings
    expect(screen.getByRole("heading", { name: "Esenciales" })).toBeVisible()
    expect(screen.getByRole("heading", { name: "Ropa y zapatos" })).toBeVisible()
    expect(screen.getByRole("heading", { name: "Artículos de tocador" })).toBeVisible()
    expect(screen.getByRole("heading", { name: "Otro" })).toBeVisible()

    // checkboxes
    expect(screen.getByRole("checkbox", { name: "Pasaporte" })).toBeInTheDocument()
  })

  it("changes all text to Slovenian after selecting Slovenian language", () => {
    expect(screen.queryByRole("button", { name: /slovenščina slovenščina/i })).toBeNull()
    fireEvent.click(screen.getByRole("button", { name: "Español" }))
    expect(screen.getByRole("tooltip")).toBeInTheDocument()
    fireEvent.click(screen.getByRole("button", { name: /slovenščina slovenščina/i }))

    // language picker
    expect(screen.getByRole("button", { name: "Slovenščina" })).toBeVisible()

    // main title
    expect(screen.getByRole("heading", { name: /potovalni pakirni seznam/i })).toBeVisible()

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
