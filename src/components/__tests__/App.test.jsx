// @flow
import React from "react"
import { screen, fireEvent, waitForElementToBeRemoved } from "@testing-library/react"
import { within } from "@testing-library/dom"
import useMediaQuery from "@kiwicom/orbit-components/lib/hooks/useMediaQuery"

import renderWithProviders from "../../services/testUtils/renderWithProviders"
import App from "../../App"
import localStorageMock from "../../services/testUtils/localStorageMock"

jest.mock("@kiwicom/orbit-components/lib/hooks/useMediaQuery")

const expectToSeeCardTitles = (headings: Array<string>) => {
  headings.forEach(heading => {
    expect(screen.getByRole("heading", { name: heading })).toBeVisible()
  })
}

describe("App (desktop view)", () => {
  beforeEach(() => {
    Object.defineProperty(window, "localStorage", {
      value: localStorageMock({ "travel-packing-list:language": JSON.stringify("en") }),
      writable: true,
    })
    // $FlowFixMe[prop-missing]
    useMediaQuery.mockReturnValue({ isLargeMobile: true })
    renderWithProviders(<App />)
  })

  it("renders all text in English", () => {
    // Given: I have opened an English version of the app
    expect(screen.getByRole("button", { name: "English" })).toBeVisible()

    // And: I see main title in English
    expect(screen.getByRole("heading", { name: "Travel packing list" })).toBeVisible()

    // And: I see navbar title in English
    expect(within(screen.getByRole("navigation")).getByText("Travel packing list")).toBeVisible()

    // And: I see card's titles in English
    expectToSeeCardTitles(["Essentials", "Clothes and shoes", "Toiletries", "Other"])

    // And: I see checkbox labels in English
    expect(screen.getByRole("checkbox", { name: "Passport" })).toBeInTheDocument()
  })

  it("changes all text to Spanish after selecting Spanish language", async () => {
    // Given: I have opened an English version of the app
    expect(screen.queryByRole("button", { name: "Español" })).toBeNull()

    // When: I change to Spanish version of the app in language picker
    fireEvent.click(screen.getByRole("button", { name: "English" }))
    fireEvent.click(within(screen.getByRole("tooltip")).getByRole("link", { name: "Español" }))

    // Then: I see Spanish language button
    expect(screen.getByRole("button", { name: "Español" })).toBeVisible()

    // And: language popover picker closes
    await waitForElementToBeRemoved(() => screen.queryByRole("tooltip"))

    // And: I see main title in Spanish
    expect(screen.getByRole("heading", { name: "Lista de viaje" })).toBeVisible()

    // And: I see navbar title in Spanish
    expect(within(screen.getByRole("navigation")).getByText("Lista de viaje")).toBeVisible()

    // And: I see card's titles in Spanish
    expectToSeeCardTitles(["Esenciales", "Ropa y zapatos", "Artículos de tocador", "Otro"])

    // And: I see checkbox labels in Spanish
    expect(screen.getByRole("checkbox", { name: "Pasaporte" })).toBeInTheDocument()
  })

  it("changes all text to Slovenian after selecting Slovenian language", () => {
    // Given: I have opened an English version of the app
    expect(screen.queryByRole("button", { name: "Slovenščina" })).toBeNull()

    // When: I change to Slovenian version of the app in language picker
    fireEvent.click(screen.getByRole("button", { name: "English" }))
    fireEvent.click(within(screen.getByRole("tooltip")).getByRole("link", { name: "Slovenščina" }))

    // Then: I see Slovenian language button
    expect(screen.getByRole("button", { name: "Slovenščina" })).toBeVisible()

    // And: I see main title in Slovenian
    expect(screen.getByRole("heading", { name: "Potovalni seznam" })).toBeVisible()

    // And: I see navbar title in Slovenian
    expect(within(screen.getByRole("navigation")).getByText("Potovalni seznam")).toBeVisible()

    // And: I see card's titles in Slovenian
    expectToSeeCardTitles([
      "Osnovne potrebščine",
      "Oblačila in obutev",
      "Toaletne potrebščine",
      "Razno",
    ])

    // And: I see checkbox labels in Slovenian
    expect(screen.getByRole("checkbox", { name: "Potni list" })).toBeInTheDocument()
  })

  it("displays link to my portfolio in the footer", () => {
    // Given: I have opened an app
    // And: I see link to my portfolio
    expect(screen.getByRole("link", { name: "Žana Flander" })).toHaveAttribute(
      "href",
      "https://flanzana.github.io/",
    )
  })

  it("displays sidebar", () => {
    // Given: I have opened an app
    expect(screen.getByTestId("Sidebar")).toHaveAttribute("aria-hidden", "true")

    // When: I click hamburger icon
    fireEvent.click(screen.getByRole("button", { name: "Open navigation menu" }))

    // Then: sidebar opens
    expect(screen.getByTestId("Sidebar")).toHaveAttribute("aria-hidden", "false")
    const sidebar = screen.getByTestId("SidebarContent")

    // And: I see language section in the sidebar with all 3 languages
    expect(within(sidebar).getByText(/jezik/i)).toBeVisible()
    ;["English", "Español", "Slovenščina"].forEach(language => {
      expect(within(sidebar).getByRole("link", { name: language })).toBeVisible()
    })

    // And: I see more about section in the sidebar with link to my portfolio and to Orbit
    expect(within(sidebar).getByText(/več o/i)).toBeVisible()
    expect(within(sidebar).getByRole("link", { name: "Žana Flander" })).toHaveAttribute(
      "href",
      "https://flanzana.github.io/",
    )
    expect(within(sidebar).getByRole("link", { name: "Design system Orbit" })).toHaveAttribute(
      "href",
      "https://orbit.kiwi",
    )
  })

  it("closes sidebar by clicking Close button", () => {
    // Given: sidebar is opened
    expect(screen.getByTestId("Sidebar")).toHaveAttribute("aria-hidden", "true")
    fireEvent.click(screen.getByRole("button", { name: "Open navigation menu" }))
    expect(screen.getByTestId("Sidebar")).toHaveAttribute("aria-hidden", "false")

    // When: I click X button in sidebar
    fireEvent.click(screen.getByRole("button", { name: "Hide" }))

    // Then: sidebar closes
    expect(screen.getByTestId("Sidebar")).toHaveAttribute("aria-hidden", "true")
  })

  it("closes sidebar by selecting language", () => {
    // Given: sidebar is opened on English version of the app
    expect(screen.getByTestId("Sidebar")).toHaveAttribute("aria-hidden", "true")
    fireEvent.click(screen.getByRole("button", { name: "Open navigation menu" }))
    expect(screen.getByTestId("Sidebar")).toHaveAttribute("aria-hidden", "false")
    expect(screen.queryByRole("heading", { name: "Lista de viaje" })).toBeNull()

    // When: I select Spanish language in the sidebar
    fireEvent.click(within(screen.getByTestId("Sidebar")).getByRole("link", { name: "Español" }))

    // Then: sidebar closes
    expect(screen.getByTestId("Sidebar")).toHaveAttribute("aria-hidden", "true")

    // And: I see main title in Spanish
    expect(screen.getByRole("heading", { name: "Lista de viaje" })).toBeVisible()
  })

  it("does not display bottom navbar", () => {
    // Given: I am on the desktop version of the app
    // And: bottom navbar is not visible
    expect(
      screen.queryByRole("navigation", {
        name: "Category navigation bar",
      }),
    ).toBeNull()
  })
})

describe("App (mobile view)", () => {
  beforeEach(() => {
    Object.defineProperty(window, "localStorage", {
      value: localStorageMock({ "travel-packing-list:language": JSON.stringify("en") }),
      writable: true,
    })
    // $FlowFixMe[prop-missing]
    useMediaQuery.mockReturnValue({ isLargeMobile: false })
    renderWithProviders(<App />)
  })

  it("displays bottom navbar", () => {
    // Given: I am on the mobile version of the app
    // And: bottom navbar is visible
    const bottomNavbar = screen.getByRole("navigation", {
      name: "Category navigation bar",
    })
    expect(bottomNavbar).toBeVisible()

    // And: I see icon button to all 4 card's titles
    ;[
      "Desplaza a la lista Esenciales",
      "Desplaza a la lista Ropa y zapatos",
      "Desplaza a la lista Artículos de tocador",
      "Desplaza a la lista Otro",
    ].forEach(name => {
      expect(within(bottomNavbar).getByRole("button", { name })).toBeVisible()
    })
  })

  it("scrolls to the list of category", () => {
    const scrollIntoViewMock = jest.fn()
    window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock

    // Given: I am on the mobile version of the app
    // When: I click icon of clothes category
    fireEvent.click(screen.getByRole("button", { name: "Desplaza a la lista Ropa y zapatos" }))

    // Then: screen scrolls to the corresponding card's title clothes
    expect(scrollIntoViewMock).toHaveBeenCalledTimes(1)
  })

  it("opens sidebar from bottom navbar", () => {
    // Given: I am on the mobile version of the app
    const bottomNavbar = screen.getByRole("navigation", {
      name: "Category navigation bar",
    })
    const topNavbar = screen.getByRole("navigation", { name: "" })

    // And: hamburger menu icon is not visible in top navbar
    expect(within(topNavbar).queryAllByRole("button")).toHaveLength(0)

    // But: it is visible in bottom navbar
    expect(within(bottomNavbar).getByRole("button", { name: "Más" })).toBeVisible()

    // When: I click hamburger menu icon in bottom navbar
    fireEvent.click(within(bottomNavbar).getByRole("button", { name: "Más" }))

    // Then: sidebar opens
    expect(screen.getByTestId("SidebarContent")).toBeVisible()
  })
})
