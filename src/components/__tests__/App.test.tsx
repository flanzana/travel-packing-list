import { vi, Mock } from "vitest"
import { act, screen, waitFor, waitForElementToBeRemoved } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { within } from "@testing-library/dom"
import useMediaQuery from "@kiwicom/orbit-components/lib/hooks/useMediaQuery"

import renderWithProviders from "../../services/testUtils/renderWithProviders"
import App from "../../App"
import localStorageMock from "../../services/testUtils/localStorageMock"

vi.mock("@kiwicom/orbit-components/lib/hooks/useMediaQuery")

const expectToSeeCardTitles = (headings: Array<string>) => {
  headings.forEach(heading => {
    expect(screen.getByRole("heading", { name: heading })).toBeVisible()
  })
}

describe("App", () => {
  describe("App (desktop view)", () => {
    beforeEach(() => {
      Object.defineProperty(window, "localStorage", {
        value: localStorageMock({ "travel-packing-list:language": JSON.stringify("en") }),
        writable: true,
      })
      ;(useMediaQuery as Mock).mockReturnValue({ isLargeMobile: true })
      renderWithProviders(<App />)
    })

    it("renders all text in English", () => {
      // Given: I have opened an English version of the app
      expect(screen.getByRole("button", { name: "English" })).toBeVisible()

      // And: I see main title in English
      expect(screen.getByRole("heading", { name: "Travel packing list" })).toBeVisible()

      // And: I see card's titles in English
      expectToSeeCardTitles(["Essentials", "Clothes and shoes", "Toiletries", "Other"])

      // And: I see checkbox labels in English
      expect(screen.getByRole("checkbox", { name: "Passport" })).toBeInTheDocument()
    })

    it("changes all text to Spanish after selecting Spanish language", async () => {
      // Given: I have opened an English version of the app
      expect(screen.queryByRole("button", { name: "Español" })).toBeNull()

      // When: I change to Spanish version of the app in language picker
      await act(() => userEvent.click(screen.getByRole("button", { name: "English" })))
      await waitFor(() => screen.getByRole("dialog"))
      await act(() =>
        userEvent.click(
          within(screen.getByRole("dialog")).getByRole("button", { name: "es Español" }),
        ),
      )
      await waitForElementToBeRemoved(() => screen.queryByRole("dialog"))

      // Then: I see Spanish language button
      expect(screen.getByRole("button", { name: "Español" })).toBeVisible()

      // And: I see main title in Spanish
      expect(screen.getByRole("heading", { name: "Lista de viaje" })).toBeVisible()

      // And: I see card's titles in Spanish
      expectToSeeCardTitles(["Esenciales", "Ropa y zapatos", "Artículos de tocador", "Otro"])

      // And: I see checkbox labels in Spanish
      expect(screen.getByRole("checkbox", { name: "Pasaporte" })).toBeInTheDocument()
    })

    it("changes all text to Slovenian after selecting Slovenian language", async () => {
      // Given: I have opened an English version of the app
      expect(screen.queryByRole("button", { name: "Slovenščina" })).toBeNull()

      // When: I change to Slovenian version of the app in language picker
      await act(() => userEvent.click(screen.getByRole("button", { name: "English" })))
      await waitFor(() => screen.getByRole("dialog"))
      userEvent.click(
        within(screen.getByRole("dialog")).getByRole("button", { name: "si Slovenščina" }),
      )
      await waitForElementToBeRemoved(() => screen.queryByRole("dialog"))

      // Then: I see Slovenian language button
      expect(screen.getByRole("button", { name: "Slovenščina" })).toBeVisible()

      // And: I see main title in Slovenian
      expect(screen.getByRole("heading", { name: "Potovalni seznam" })).toBeVisible()

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

    it("displays sidebar", async () => {
      // Given: I have opened an app
      expect(screen.getByTestId("Sidebar")).not.toBeVisible()

      // When: I click hamburger icon
      userEvent.click(screen.getByRole("button", { name: "Open navigation menu" }))

      // Then: sidebar opens
      await waitFor(() => expect(screen.getByTestId("Sidebar")).toBeVisible())
      const sidebar = screen.getByTestId("SidebarContent")

      // And: I see language section in the sidebar with all 3 languages
      expect(within(sidebar).getByText(/jezik/i)).toBeVisible()
      ;["gb English", "es Español", "si Slovenščina"].forEach(language => {
        expect(within(sidebar).getByRole("button", { name: language })).toBeVisible()
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

    it("closes sidebar by clicking Close button", async () => {
      // Given: sidebar is opened
      expect(screen.getByTestId("Sidebar")).not.toBeVisible()
      userEvent.click(screen.getByRole("button", { name: "Open navigation menu" }))
      await waitFor(() => expect(screen.getByTestId("Sidebar")).toBeVisible())

      // When: I click X button in sidebar
      userEvent.click(screen.getByRole("button", { name: "Hide" }))

      // Then: sidebar closes
      await waitFor(() => expect(screen.getByTestId("Sidebar")).not.toBeVisible())
    })

    it("closes sidebar by selecting language", async () => {
      // Given: sidebar is opened on English version of the app
      expect(screen.getByTestId("Sidebar")).not.toBeVisible()
      userEvent.click(screen.getByRole("button", { name: "Open navigation menu" }))
      await waitFor(() => expect(screen.getByTestId("Sidebar")).toBeVisible())
      expect(screen.queryByRole("heading", { name: "Lista de viaje" })).toBeNull()

      // When: I select Spanish language in the sidebar
      userEvent.click(
        within(screen.getByTestId("Sidebar")).getByRole("button", { name: "es Español" }),
      )

      // Then: sidebar closes
      await waitFor(() => expect(screen.getByTestId("Sidebar")).not.toBeVisible())

      // And: I see main title in Spanish
      expect(screen.getByRole("heading", { name: "Lista de viaje" })).toBeVisible()
    })

    it("does not display bottom navbar", () => {
      // Given: I am on the desktop version of the app
      // And: bottom navbar is not visible
      expect(screen.queryByTestId("BottomNavbar")).toBeNull()
    })
  })

  describe("App (mobile view)", () => {
    beforeEach(() => {
      Object.defineProperty(window, "localStorage", {
        value: localStorageMock({ "travel-packing-list:language": JSON.stringify("en") }),
        writable: true,
      })
      ;(useMediaQuery as Mock).mockReturnValue({ isLargeMobile: false })
      renderWithProviders(<App />)
    })

    it("displays bottom navbar", () => {
      // Given: I am on the mobile version of the app
      // And: bottom navbar is visible
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [_, bottomNavbar] = screen.getAllByRole("navigation")
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

    it("scrolls to the list of category", async () => {
      const scrollIntoViewMock = vi.fn()
      window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock

      // Given: I am on the mobile version of the app
      // When: I click icon of clothes category
      userEvent.click(screen.getByRole("button", { name: "Desplaza a la lista Ropa y zapatos" }))

      // Then: screen scrolls to the corresponding card's title clothes
      await waitFor(() => expect(scrollIntoViewMock).toHaveBeenCalledTimes(1))
    })

    it("opens sidebar from bottom navbar", async () => {
      // Given: I am on the mobile version of the app
      const [topNavbar, bottomNavbar] = screen.getAllByRole("navigation")

      // And: hamburger menu icon is not visible in top navbar
      expect(within(topNavbar).queryAllByRole("button")).toHaveLength(0)

      // But: it is visible in bottom navbar
      expect(within(bottomNavbar).getByRole("button", { name: "Más" })).toBeVisible()

      // When: I click hamburger menu icon in bottom navbar
      userEvent.click(within(bottomNavbar).getByRole("button", { name: "Más" }))

      // Then: sidebar opens
      await waitFor(() => expect(screen.getByTestId("SidebarContent")).toBeVisible())
    })
  })
})
