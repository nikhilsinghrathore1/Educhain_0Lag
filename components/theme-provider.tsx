"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { type ThemeConfig, type ThemeColor, defaultTheme, themeColorMap, borderRadiusMap } from "@/lib/theme-config"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: ThemeConfig
}

type ThemeProviderState = {
  theme: ThemeConfig
  setTheme: (theme: ThemeConfig) => void
  setThemeColor: (color: ThemeColor) => void
  setBorderRadius: (radius: ThemeConfig["borderRadius"]) => void
  setMode: (mode: ThemeConfig["mode"]) => void
  getThemeValue: (key: keyof (typeof themeColorMap)[ThemeColor]) => string
  getBorderRadius: () => string
}

const initialState: ThemeProviderState = {
  theme: defaultTheme,
  setTheme: () => null,
  setThemeColor: () => null,
  setBorderRadius: () => null,
  setMode: () => null,
  getThemeValue: () => "",
  getBorderRadius: () => "",
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({ children, defaultTheme: defaultThemeOverride, ...props }: ThemeProviderProps) {
  const [theme, setTheme] = useState<ThemeConfig>(defaultThemeOverride || defaultTheme)

  useEffect(() => {
    const root = window.document.documentElement

    // Remove all previous theme classes
    root.classList.remove("light", "dark")

    // Apply theme mode
    if (theme.mode === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
      root.classList.add(systemTheme)
    } else {
      root.classList.add(theme.mode)
    }

    // Save theme to localStorage
    localStorage.setItem("theme", JSON.stringify(theme))
  }, [theme])

  // Load theme from localStorage on initial render
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme) {
      try {
        setTheme(JSON.parse(savedTheme))
      } catch (e) {
        console.error("Failed to parse saved theme", e)
      }
    }
  }, [])

  const setThemeColor = (color: ThemeColor) => {
    setTheme({ ...theme, color })
  }

  const setBorderRadius = (borderRadius: ThemeConfig["borderRadius"]) => {
    setTheme({ ...theme, borderRadius })
  }

  const setMode = (mode: ThemeConfig["mode"]) => {
    setTheme({ ...theme, mode })
  }

  const getThemeValue = (key: keyof (typeof themeColorMap)[ThemeColor]) => {
    return themeColorMap[theme.color][key]
  }

  const getBorderRadius = () => {
    return borderRadiusMap[theme.borderRadius]
  }

  return (
    <ThemeProviderContext.Provider
      value={{
        theme,
        setTheme,
        setThemeColor,
        setBorderRadius,
        setMode,
        getThemeValue,
        getBorderRadius,
      }}
      {...props}
    >
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}

