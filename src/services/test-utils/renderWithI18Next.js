// @flow
import React from "react"
import { I18nextProvider } from "react-i18next"
import i18n from "../../i18n"
import { render } from "@testing-library/react"

// $FlowFixMe
const renderWithI18Next = component => {
  const comp = React.cloneElement(component, {
    changeLanguage: lng => {
      i18n.changeLanguage(lng)
      rerender(<I18nextProvider i18n={i18n}>{comp}</I18nextProvider>)
    },
  })
  const defaultRender = render(<I18nextProvider i18n={i18n}>{comp}</I18nextProvider>)
  const { rerender } = defaultRender
  return defaultRender
}

export default renderWithI18Next
