import { create } from "zustand"

export const useThemeStore = create((set) => ({
    themebg: localStorage.getItem("theme") || "coffee",
    setTheme: (theme) => {
        localStorage.setItem("theme", theme)
        set({ themebg: theme })
    }
}))