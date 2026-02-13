import "@testing-library/jest-dom/vitest"
import ResizeObserver from "resize-observer-polyfill"
import { vi } from "vitest"

// Mocks for Chakra UI: https://chakra-ui.com/docs/components/concepts/testing#setup-test-file

// ResizeObserver mock
vi.stubGlobal("ResizeObserver", ResizeObserver)

// matchMedia mock
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

vi.mock("next-themes", () => ({
  ThemeProvider: (props: { children: unknown }) => props.children,
  useTheme: () => ({
    theme: "light",
    setTheme: vi.fn(),
    resolvedTheme: "light",
  }),
}))
