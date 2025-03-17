"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Bell,
  Calendar,
  Clock,
  MessageSquare,
  Search,
  Settings,
  Users,
  Menu,
  X,
  Home,
  Moon,
  Sun,
  Palette,
  Sliders,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import ConnectWallet from "@/components/web3/ConnectWallet"
import { useTheme } from "@/components/theme-provider"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { type ThemeColor, themeColorMap } from "@/lib/theme-config"
import { cn } from "@/lib/utils"
import { useWeb3 } from "@/lib/web3/provider"

interface DashboardLayoutProps {
  children: React.ReactNode
}

const borderRadiusMap = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  full: "rounded-full",
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname()
  const { theme, setThemeColor, setBorderRadius, setMode, getThemeValue, getBorderRadius } = useTheme()
  const { isConnected } = useWeb3()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // Check if we're on the client side
  useEffect(() => {
    setIsClient(true)

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navigation = [
    { name: "Dashboard", href: "/", icon: Home },
    { name: "Create Task", href: "/create-task", icon: MessageSquare },
    { name: "My Tasks", href: "/my-tasks", icon: Clock },
    { name: "Leaderboard", href: "/leaderboard", icon: Users },
    { name: "Calendar", href: "/calendar", icon: Calendar, badge: "+2" },
  ]

  // Don't render full content during SSR to avoid hydration issues
  if (!isClient) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div
            className={`w-10 h-10 rounded-md bg-gradient-to-br ${getThemeValue("gradient")} flex items-center justify-center mx-auto mb-4`}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="white" />
              <path d="M2 17L12 22L22 17" fill="white" />
              <path d="M2 12L12 17L22 12" fill="white" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold dark:text-white">Loading Dashboard...</h1>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-white dark:bg-slate-900">
      {/* Sidebar - Desktop */}
      <div
        className={`hidden md:flex w-72 border-r border-gray-100 dark:border-slate-800 flex-col fixed h-full z-30 transition-all duration-300 ease-in-out ${isMobileMenuOpen ? "left-0" : "-left-72"} md:left-0`}
      >
        <div className="p-6 flex flex-col h-full">
          <div className="flex items-center gap-2 mb-8">
            <div
              className={`w-10 h-10 rounded-md bg-gradient-to-br ${getThemeValue("gradient")} flex items-center justify-center`}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="white" />
                <path d="M2 17L12 22L22 17" fill="white" />
                <path d="M2 12L12 17L22 12" fill="white" />
              </svg>
            </div>
            <h1 className="text-xl font-bold dark:text-white">ProofOfDeadlines</h1>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-black dark:text-white">Start Your Day</h2>
            <h2 className="text-2xl font-bold flex items-center gap-2 dark:text-white">
              & Be Productive <span className="text-2xl">✌️</span>
            </h2>
          </div>

          <div className="uppercase text-xs font-semibold text-gray-500 dark:text-gray-400 mb-4 tracking-wider">
            MENU
          </div>

          <nav className="space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Button
                  key={item.name}
                  variant={isActive ? "default" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-3 font-normal",
                    isActive
                      ? `${getThemeValue("primary")} ${getThemeValue("primaryForeground")}`
                      : "text-gray-700 dark:text-gray-300",
                  )}
                  asChild
                >
                  <Link href={item.href}>
                    <item.icon className="h-5 w-5" />
                    {item.name}
                    {item.badge && (
                      <Badge className={`ml-auto ${getThemeValue("primary")} ${getThemeValue("primaryForeground")}`}>
                        {item.badge}
                      </Badge>
                    )}
                  </Link>
                </Button>
              )
            })}
          </nav>

          <div className="mt-auto">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex -space-x-2">
                <Avatar className="border-2 border-white dark:border-slate-900">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <Avatar className="border-2 border-white dark:border-slate-900">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" />
                  <AvatarFallback>SM</AvatarFallback>
                </Avatar>
                <Avatar className="border-2 border-white dark:border-slate-900">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" />
                  <AvatarFallback>RK</AvatarFallback>
                </Avatar>
                <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-slate-800 flex items-center justify-center text-xs font-medium border-2 border-white dark:border-slate-900">
                  10+
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="font-medium dark:text-white">Current Streak</span>
                <span>🔥</span>
                <Badge
                  variant="outline"
                  className="text-xs bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-300 border-0"
                >
                  12 days
                </Badge>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <span>Streak Reward</span>
                <span>💰</span>
                <span className="ml-auto text-xs">18 days left</span>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">12/30 days</span>
                  <span className="font-medium dark:text-white">40%</span>
                </div>
                <div className="h-2 w-full bg-gray-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className={`h-full ${getThemeValue("primary")} rounded-full`} style={{ width: "40%" }}></div>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-xs text-gray-500 dark:text-gray-400">Reward: 0.5 ETH</span>
                <div
                  className={`flex items-center gap-2 ${getThemeValue("primaryLight")} ${getThemeValue("primaryText")} px-3 py-1 rounded-full`}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M8 0C3.6 0 0 3.6 0 8C0 12.4 3.6 16 8 16C12.4 16 16 12.4 16 8C16 3.6 12.4 0 8 0ZM7 11.4L3.6 8L5 6.6L7 8.6L11 4.6L12.4 6L7 11.4Z"
                      fill="currentColor"
                    />
                  </svg>
                  <span>Keep it up!</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col md:ml-72">
        {/* Header */}
        <header
          className={cn(
            "h-16 border-b border-gray-100 dark:border-slate-800 flex items-center justify-between px-4 md:px-6 sticky top-0 z-10 transition-all duration-300",
            isScrolled ? "bg-white/80 dark:bg-slate-900/80 backdrop-blur-md" : "bg-white dark:bg-slate-900",
          )}
        >
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-gray-500 dark:text-gray-400"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>

            <div className="relative w-64 hidden md:block">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search..."
                className="pl-8 border-gray-200 dark:border-slate-700 focus:ring-primary dark:bg-slate-800 dark:text-white"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-gray-500 dark:text-gray-400">
                  <Palette className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Appearance</DropdownMenuLabel>
                <DropdownMenuSeparator />

                <div className="p-2">
                  <p className="text-sm font-medium mb-2">Theme</p>
                  <div className="grid grid-cols-3 gap-2">
                    {(Object.keys(themeColorMap) as ThemeColor[]).map((color) => (
                      <button
                        key={color}
                        className={cn(
                          "w-full h-8 rounded flex items-center justify-center",
                          themeColorMap[color].primary,
                          theme.color === color && "ring-2 ring-offset-2 dark:ring-offset-slate-900",
                        )}
                        onClick={() => setThemeColor(color)}
                      >
                        {theme.color === color && (
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M13.3334 4L6.00008 11.3333L2.66675 8"
                              stroke="white"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <DropdownMenuSeparator />

                <div className="p-2">
                  <p className="text-sm font-medium mb-2">Border Radius</p>
                  <div className="grid grid-cols-3 gap-2">
                    {["none", "sm", "md", "lg", "full"].map((radius) => (
                      <button
                        key={radius}
                        className={cn(
                          "w-full h-8 border dark:border-slate-700 flex items-center justify-center",
                          borderRadiusMap[radius as keyof typeof borderRadiusMap],
                          theme.borderRadius === radius &&
                            `${getThemeValue("primaryBorder")} ${getThemeValue("primaryText")}`,
                        )}
                        onClick={() => setBorderRadius(radius as any)}
                      >
                        {radius.charAt(0).toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>

                <DropdownMenuSeparator />

                <div className="p-2">
                  <p className="text-sm font-medium mb-2">Mode</p>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      className={cn(
                        "w-full h-8 border dark:border-slate-700 rounded flex items-center justify-center gap-2",
                        theme.mode === "light" && `${getThemeValue("primaryBorder")} ${getThemeValue("primaryText")}`,
                      )}
                      onClick={() => setMode("light")}
                    >
                      <Sun className="h-4 w-4" />
                      <span className="text-xs">Light</span>
                    </button>
                    <button
                      className={cn(
                        "w-full h-8 border dark:border-slate-700 rounded flex items-center justify-center gap-2",
                        theme.mode === "dark" && `${getThemeValue("primaryBorder")} ${getThemeValue("primaryText")}`,
                      )}
                      onClick={() => setMode("dark")}
                    >
                      <Moon className="h-4 w-4" />
                      <span className="text-xs">Dark</span>
                    </button>
                    <button
                      className={cn(
                        "w-full h-8 border dark:border-slate-700 rounded flex items-center justify-center gap-2",
                        theme.mode === "system" && `${getThemeValue("primaryBorder")} ${getThemeValue("primaryText")}`,
                      )}
                      onClick={() => setMode("system")}
                    >
                      <Sliders className="h-4 w-4" />
                      <span className="text-xs">Auto</span>
                    </button>
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="ghost" size="icon" className="text-gray-500 dark:text-gray-400 relative">
              <Bell className="h-5 w-5" />
              <span className={`absolute top-1 right-1 w-2 h-2 ${getThemeValue("primary")} rounded-full`}></span>
            </Button>

            <Button variant="ghost" size="icon" className="text-gray-500 dark:text-gray-400">
              <Settings className="h-5 w-5" />
            </Button>

            <ConnectWallet />
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 p-4 md:p-6">{children}</div>
      </div>
    </div>
  )
}

