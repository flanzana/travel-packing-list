// @flow
import React from "react"
import { screen, fireEvent } from "@testing-library/react"
import { within } from "@testing-library/dom"
import useMediaQuery from "@kiwicom/orbit-components/lib/hooks/useMediaQuery"

import renderWithProviders from "../../services/test-utils/renderWithProviders"
import App from "../../App"

jest.mock("@kiwicom/orbit-components/lib/hooks/useMediaQuery")

describe("App (desktop view)", () => {
  beforeEach(() => {
    // $FlowFixMe[prop-missing]
    useMediaQuery.mockReturnValue({ isLargeMobile: true })
    renderWithProviders(<App />)
  })

  it("renders all text in English", () => {
    //language picker
    expect(screen.getByRole("button", { name: "English" })).toBeVisible()

    // title in header
    expect(screen.getByRole("heading", { name: "Travel packing list" })).toBeVisible()

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
    expect(screen.getByRole("heading", { name: "Lista de viaje" })).toBeVisible()

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
    expect(screen.getByRole("heading", { name: "Potovalni seznam" })).toBeVisible()

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

  it("displays link to my portfolio in the footer", () => {
    expect(screen.getByRole("link", { name: "Žana Flander" })).toHaveAttribute(
      "href",
      "https://flanzana.github.io/",
    )
  })

  it("displays sidebar", () => {
    expect(screen.queryByTestId("SidebarContent")).not.toBeVisible()

    // open sidebar
    fireEvent.click(screen.getByRole("button", { name: "Open navigation menu" }))
    const sidebar = screen.getByTestId("SidebarContent")
    expect(sidebar).toBeVisible()

    // language
    expect(within(sidebar).getByText(/jezik/i)).toBeVisible()
    expect(within(sidebar).getByRole("link", { name: "English" })).toBeVisible()
    expect(within(sidebar).getByRole("link", { name: "Español" })).toBeVisible()
    expect(within(sidebar).getByRole("link", { name: "Slovenščina" })).toBeVisible()

    // more about
    expect(within(sidebar).getByText(/več o/i)).toBeVisible()
    expect(within(sidebar).getByRole("link", { name: "Žana Flander" })).toHaveAttribute(
      "href",
      "https://flanzana.github.io/",
    )
    expect(within(sidebar).getByRole("link", { name: "Design system Orbit" })).toHaveAttribute(
      "href",
      "https://orbit.kiwi",
    )

    // click language closes sidebar and changes language
    expect(screen.queryByRole("heading", { name: "Lista de viaje" })).toBeNull()
    fireEvent.click(within(sidebar).getByRole("link", { name: "Español" }))
    expect(screen.getByRole("heading", { name: "Lista de viaje" })).toBeVisible()
  })

  it("does not display bottom navbar", () => {
    expect(
      screen.queryByRole("navigation", {
        name: "Category navigation bar",
      }),
    ).toBeNull()
  })
})

describe("App (mobile view)", () => {
  beforeEach(() => {
    // $FlowFixMe[prop-missing]
    useMediaQuery.mockReturnValue({ isLargeMobile: false })
    renderWithProviders(<App />)
  })

  it("displays bottom navbar", () => {
    const bottomNavbar = screen.getByRole("navigation", {
      name: "Category navigation bar",
    })
    expect(bottomNavbar).toBeVisible()

    expect(
      within(bottomNavbar).getByRole("button", { name: "Desplaza a la lista Esenciales" }),
    ).toBeVisible()
    expect(
      within(bottomNavbar).getByRole("button", { name: "Desplaza a la lista Ropa y zapatos" }),
    ).toBeVisible()
    expect(
      within(bottomNavbar).getByRole("button", {
        name: "Desplaza a la lista Artículos de tocador",
      }),
    ).toBeVisible()
    expect(
      within(bottomNavbar).getByRole("button", { name: "Desplaza a la lista Otro" }),
    ).toBeVisible()
  })

  it("scrolls to the list of category", () => {
    const scrollIntoViewMock = jest.fn()
    window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock

    fireEvent.click(screen.getByRole("button", { name: "Desplaza a la lista Ropa y zapatos" }))

    expect(scrollIntoViewMock).toHaveBeenCalledTimes(1)
  })

  it("opens sidebar from bottom navbar", () => {
    const bottomNavbar = screen.getByRole("navigation", {
      name: "Category navigation bar",
    })
    const topNavbar = screen.getByRole("navigation", { name: "" })

    expect(within(topNavbar).queryAllByRole("button")).toHaveLength(0)

    expect(within(bottomNavbar).getByRole("button", { name: "Más" })).toBeVisible()
    fireEvent.click(within(bottomNavbar).getByRole("button", { name: "Más" }))
    expect(screen.getByTestId("SidebarContent")).toBeVisible()
  })
})
