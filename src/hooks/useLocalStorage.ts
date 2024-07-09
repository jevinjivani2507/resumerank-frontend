"use client";

import { useState } from "react";

// The useLocalStorage hook
function useLocalStorage<T>(key: string) {
  const [stored, setStored] = useState<T | null>(() => {
    if (typeof window === "undefined") return null;

    const storedValue = JSON.parse(localStorage.getItem(key) || "null");
    return storedValue ?? null;
  });

  const setValue = (value: T | null) => {
    try {
      // Save to state
      setStored(value);
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(
        `Error setting localStorage
        key “${key}”:`,
        error
      );
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
