"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Calendar, Clock, TrendingUp, CheckCircle, ChevronRight, Plus } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import DashboardLayout from "@/components/layout/dashboard-layout"
import { useTheme } from "@/components/theme-provider"
import { useWeb3 } from "@/lib/web3/provider"

export default function Dashboard() {
  const { getThemeValue, getBorderRadius } = useTheme()
  const { isConnected } = useWeb3()
  const [isClient, setIsClient] = useState(false)
  const [isWeb3Available, setIsWeb3Available] = useState(false)

  // Check if we're on the client side and if Web3 is available
  useEffect(() => {
    setIsClient(true)
    setIsWeb3Available(typeof window !== "undefined" && !!window.ethereum)
  }, [])

  // Mock tasks for demonstration
  const mockTasks = [
    {
      id: "1",
      name: "Research Paper on Blockchain Applications",
      description: "Complete blockchain applications research paper (10 pages)",
      deadline: new Date("2025-03-16"),
      stakeAmount: "0.25",
      progress: 65,
      collaborators: 2,
      status: "in-progress",
    },
    {
      id: "2",
      name: "UI Design Project",
      description: "Finalize all screens for the client project",
      deadline: new Date("2025-03-20"),
      stakeAmount: "0.15",
      progress: 80,
      collaborators: 1,
      status: "in-progress",
    },
    {
      id: "3",
      name: "Code Refactoring for Legacy System",
      description: "Improve performance and reduce technical debt",
      deadline: new Date("2025-03-10"),
      stakeAmount: "0.10",
      progress: 100,
      collaborators: 0,
      status: "completed",
    },
  ]

  // Calculate days left for a task
  const getDaysLeft = (deadline: Date) => {
    const today = new Date()
    const diffTime = deadline.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays > 0 ? diffDays : 0
  }

  // Don't render full content during SSR to avoid hydration issues
  if (!isClient) {
    return null
  }

  // Web3 not available message
  if (!isWeb3Available) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-900 flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800 rounded-lg p-6 text-center">
        <div className="max-w-md w-full bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800 rounded-lg p-6 text-center">
          <div className="w-16 h-16 bg-amber-100 dark:bg-amber-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 9V13M12 17H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                stroke="#F59E0B"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-amber-800 dark:text-amber-300 mb-2">Web3 Wallet Required</h2>
          <p className="text-amber-700 dark:text-amber-400 mb-6">
            To use Proof of Deadlines, you need a Web3 wallet like MetaMask installed in your browser.
          </p>
          <div className="space-y-3">
            <Button
              className={`w-full ${getThemeValue('primary')}`}
              onClick={() => window.open("https://metamask.io/download/", "_blank")}
            >
              Install MetaMask
            </Button>
            <Button asChild variant="outline" className="w-full border-amber-300 dark:border-amber-700">
              <Link href="/landing">Learn More</Link>
            </Button>
          </div>
        </div>
      </div>
      </div>

    )

  }

}