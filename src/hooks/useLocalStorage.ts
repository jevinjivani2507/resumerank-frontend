"use client";

import { useState } from "react";

// The useLocalStorage hook
function useLocalStorage<T>(key: string, initialValue: T) {
  // Retrieve the initial value from localStorage or set it to the initialValue
  const storedValue = () => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key “${key}”:`, error);
      return initialValue;
    }
  };

  const [stored, setStored] = useState<T>(storedValue);

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function so we have the same API as useState
      const valueToStore = value instanceof Function ? value(stored) : value;
      // Save state
      setStored(valueToStore);
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key “${key}”:`, error);
    }
  };

  const removeValue = () => {
    try {
      // Remove from state
      setStored(undefined as unknown as T);
      // Remove from local storage
      window.localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing localStorage key “${key}”:`, error);
    }
  };

  return [stored, setValue, removeValue] as const;
}

export default useLocalStorage;
