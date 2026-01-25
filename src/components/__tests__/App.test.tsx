import { within } from "@testing-library/dom"
import { act, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { vi } from "vitest"

import App from "../../App"
import localStorageMock from "../../services/testUtils/localStorageMock"
import renderWithProviders from "../../services/testUtils/renderWithProviders"

const expectToSeeCardTitles = (headings: Array<string>) => {
  headings.forEach(heading => {
    expect(screen.getByRole("heading", { name: heading })).toBeVisible()
  })
}

describe("App", () => {
  describe("App (mobile view)", () => {
    beforeEach(() => {
      Object.defineProperty(window, "localStorage", {
        value: localStorageMock({
          "travel-packing-list:language": JSON.stringify("en"),
        }),
        writable: true,
      })
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
          within(screen.getByRole("dialog")).getByRole("button", {
            name: "Español",
          }),
        ),
      )
      await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument())

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
        within(screen.getByRole("dialog")).getByRole("button", {
          name: "Slovenščina",
        }),
      )
      await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument())

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

    it("displays bottom navbar", () => {
      // Given: I am on the mobile version of the app
      // And: bottom navbar is visible
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const bottomNavbar = screen.getByRole("navigation")
      expect(bottomNavbar).toBeVisible()

      // And: I see icon button to all 4 card's titles
      ;[
        "Pomakni se na seznam Osnovne potrebščine",
        "Pomakni se na seznam Oblačila in obutev",
        "Pomakni se na seznam Toaletne potrebščine",
        "Pomakni se na seznam Razno",
      ].forEach(name => {
        expect(within(bottomNavbar).getByRole("button", { name })).toBeVisible()
      })
    })

    it("scrolls to the list of category", async () => {
      const scrollIntoViewMock = vi.fn()
      window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock

      // Given: I am on the mobile version of the app
      // When: I click icon of clothes category
      userEvent.click(
        screen.getByRole("button", {
          name: "Pomakni se na seznam Oblačila in obutev",
        }),
      )

      // Then: screen scrolls to the corresponding card's title clothes
      await waitFor(() => expect(scrollIntoViewMock).toHaveBeenCalledTimes(1))
    })
  })
})
