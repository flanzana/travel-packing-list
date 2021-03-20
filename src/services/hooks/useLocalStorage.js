// @flow
import { useState } from "react"

export default function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  // get value from local storage by key
  const item = window.localStorage.getItem(key)

  const [storedValue, setStoredValue] = useState<T>(item ? JSON.parse(item) : initialValue)

  const setValue = (value: T) => {
    // save state
    setStoredValue(value)

    // save to local storage
    window.localStorage.setItem(key, JSON.stringify(value))
  }

  return [storedValue, setValue]
}
