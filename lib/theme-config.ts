export type ThemeColor = "emerald" | "blue" | "purple" | "amber" | "rose" | "slate"

export interface ThemeConfig {
  color: ThemeColor
  borderRadius: "none" | "sm" | "md" | "lg" | "full"
  mode: "light" | "dark" | "system"
}

export const defaultTheme: ThemeConfig = {
  color: "emerald",
  borderRadius: "md",
  mode: "light",
}

// Color mappings for different theme colors
export const themeColorMap = {
  emerald: {
    primary: "bg-emerald-500 hover:bg-emerald-600",
    primaryForeground: "text-white",
    primaryRing: "ring-emerald-500",
    primaryBorder: "border-emerald-500",
    primaryLight: "bg-emerald-50",
    primaryText: "text-emerald-500",
    primaryDark: "bg-emerald-700",
    gradient: "from-emerald-500 to-teal-500",
  },
  blue: {
    primary: "bg-blue-500 hover:bg-blue-600",
    primaryForeground: "text-white",
    primaryRing: "ring-blue-500",
    primaryBorder: "border-blue-500",
    primaryLight: "bg-blue-50",
    primaryText: "text-blue-500",
    primaryDark: "bg-blue-700",
    gradient: "from-blue-500 to-cyan-500",
  },
  purple: {
    primary: "bg-purple-500 hover:bg-purple-600",
    primaryForeground: "text-white",
    primaryRing: "ring-purple-500",
    primaryBorder: "border-purple-500",
    primaryLight: "bg-purple-50",
    primaryText: "text-purple-500",
    primaryDark: "bg-purple-700",
    gradient: "from-purple-500 to-indigo-500",
  },
  amber: {
    primary: "bg-amber-500 hover:bg-amber-600",
    primaryForeground: "text-white",
    primaryRing: "ring-amber-500",
    primaryBorder: "border-amber-500",
    primaryLight: "bg-amber-50",
    primaryText: "text-amber-500",
    primaryDark: "bg-amber-700",
    gradient: "from-amber-500 to-orange-500",
  },
  rose: {
    primary: "bg-rose-500 hover:bg-rose-600",
    primaryForeground: "text-white",
    primaryRing: "ring-rose-500",
    primaryBorder: "border-rose-500",
    primaryLight: "bg-rose-50",
    primaryText: "text-rose-500",
    primaryDark: "bg-rose-700",
    gradient: "from-rose-500 to-pink-500",
  },
  slate: {
    primary: "bg-slate-700 hover:bg-slate-800",
    primaryForeground: "text-white",
    primaryRing: "ring-slate-700",
    primaryBorder: "border-slate-700",
    primaryLight: "bg-slate-50",
    primaryText: "text-slate-700",
    primaryDark: "bg-slate-900",
    gradient: "from-slate-700 to-slate-900",
  },
}

// Border radius mappings
export const borderRadiusMap = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded",
  lg: "rounded-lg",
  full: "rounded-full",
}

