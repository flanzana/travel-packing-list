const localStorageMock = (store: { [key: string]: string }) => ({
  getItem(key: string) {
    return store[key]
  },
  setItem(key: string, value: string) {
    store[key] = value
  },
})

export default localStorageMock
