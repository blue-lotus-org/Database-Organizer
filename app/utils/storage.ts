export const saveToLocalStorage = (key: string, data: any) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(data))
  }
}

export const loadFromLocalStorage = (key: string, defaultValue: any = null) => {
  if (typeof window !== "undefined") {
    try {
      const data = localStorage.getItem(key)
      return data ? JSON.parse(data) : defaultValue
    } catch (error) {
      console.error(`Error loading data for key ${key}:`, error)
      return defaultValue
    }
  }
  return defaultValue
}

