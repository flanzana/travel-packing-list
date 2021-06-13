// @flow
const localStorageMock = (store: { [key: string]: string }): typeof window.localStorage => ({
  getItem(key) {
    return store[key]
  },
  setItem(key, value) {
    store[key] = value
  },
})

export default localStorageMock
