// @flow
import "@testing-library/jest-dom/extend-expect"
import { configure } from "@testing-library/dom"

Object.defineProperty(window, "matchMedia", {
  value: () => ({
    matches: false,
    addListener: () => {},
    removeListener: () => {},
  }),
})

Object.defineProperty(window, "getComputedStyle", {
  value: () => ({
    getPropertyValue: () => {},
  }),
})

configure({ testIdAttribute: "data-test" })
