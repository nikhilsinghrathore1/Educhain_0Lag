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

  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - Tasks */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold dark:text-white">Your Tasks</h2>
            <Button asChild className={`gap-2 ${getThemeValue('primary')}`}>
              <Link href="/create-task">
                <Plus className="h-4 w-4" />
                New Task
              </Link>
            </Button>
          </div>
          
          <Tabs defaultValue="active" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="all">All Tasks</TabsTrigger>
            </TabsList>
            
            <TabsContent value="active" className="space-y-4">
              {mockTasks.filter(task => task.status !== 'completed').map((task, index) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className={`overflow-hidden ${getBorderRadius()}`}>
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <CardTitle className="text-lg dark:text-white">{task.name}</CardTitle>
                          <CardDescription>{task.description}</CardDescription>
                        </div>
                        <Badge className={task.status === 'in-progress' ? 'bg-blue-500' : getThemeValue('primary')}>
                          {task.status === 'in-progress' ? 'In Progress' : 'At Risk'}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                          <span className="text-sm dark:text-slate-300">Due: {task.deadline.toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                          <span className="text-sm dark:text-slate-300">{getDaysLeft(task.deadline)} days left</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                          <span className="text-sm dark:text-slate-300">Staked: {task.stakeAmount} ETH</span>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-sm">
                          <span className="dark:text-slate-400">Progress</span>
                          <span className="font-medium dark:text-white">{task.progress}%</span>
                        </div>
                        <div className="h-2 w-full bg-gray-100 dark:bg-slate-800 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${getThemeValue('primary')} rounded-full`} 
                            style={{ width: `${task.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between pt-2">
                      <div className="flex -space-x-2">
                        <Avatar className="border-2 border-white dark:border-slate-900 h-8 w-8">
                          <AvatarImage src="/placeholder.svg?height=32&width=32" />
                          <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        {task.collaborators > 0 && (
                          <Avatar className="border-2 border-white dark:border-slate-900 h-8 w-8">
                            <AvatarImage src="/placeholder.svg?height=32&width=32" />
                            <AvatarFallback>SM</AvatarFallback>
                          </Avatar>
                        )}
                        {task.collaborators > 1 && (
                          <div className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-100 dark:bg-slate-800 border-2 border-white dark:border-slate-900 text-xs">
                            +{task.collaborators}
                          </div>
                        )}
                      </div>
                      <Button asChild size="sm" className={`gap-1 ${getThemeValue('primary')}`}>
                        <Link href={`/task/${task.id}`}>
                          View Details
                          <ChevronRight className="h-4 w-4" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </TabsContent>
            
            <TabsContent value="completed" className="space-y-4">
              {mockTasks.filter(task => task.status === 'completed').map((task, index) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className={`overflow-hidden ${getBorderRadius()}`}>
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <CardTitle className="text-lg dark:text-white">{task.name}</CardTitle>
                          <CardDescription>{task.description}</CardDescription>
                        </div>
                        <Badge className="bg-emerald-500">Completed</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-emerald-500" />
                          <span className="text-sm dark:text-slate-300">Completed on time</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                          <span className="text-sm dark:text-slate-300">Due: {task.deadline.toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                          <span className="text-sm dark:text-slate-300">Earned: {task.stakeAmount} ETH</span>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-sm">
                          <span className="dark:text-slate-400">Progress</span>
                          <span className="font-medium dark:text-white">{task.progress}%</span>
                        </div>
                        <div className="h-2 w-full bg-gray-100 dark:bg-slate-800 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-emerald-500 rounded-full" 
                            style={{ width: `${task.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between pt-2">
                      <div className="flex -space-x-2">
                        <Avatar className="border-2 border-white dark:border-slate-900 h-8 w-8">
                          <AvatarImage src="/placeholder.svg?height=32&width=32" />
                          <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                      </div>
                      <Button asChild size="sm" variant="outline">
                        <Link href={`/task/${task.id}`}>
                          View Details
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </TabsContent>
            
            <TabsContent value="all" className="space-y-4">
              {mockTasks.map((task, index) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className={`overflow-hidden ${getBorderRadius()}`}>
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <CardTitle className="text-lg dark:text-white">{task.name}</CardTitle>
                          <CardDescription>{task.description}</CardDescription>
                        </div>
                        <Badge className={
                          task.status === 'completed' 
                            ? 'bg-emerald-500' 
                            : task.status === 'in-progress' 
                              ? 'bg-blue-500' 
                              : getThemeValue('primary')
                        }>
                          {task.status === 'completed' 
                            ? 'Completed' 
                            : task.status === 'in-progress' 
                              ? 'In Progress' 
                              : 'At Risk'}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center gap-2">
                          {task.status === 'completed' 
                            ? <CheckCircle className="h-4 w-4 text-emerald-500" />
                            : <Clock className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                          }
                          <span className="text-sm dark:text-slate-300">
                            {task.status === 'completed' 
                              ? 'Completed on time' 
                              : `Due: ${task.deadline.toLocaleDateString()}`}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                          <span className="text-sm dark:text-slate-300">
                            {task.status === 'completed' 
                              ? `Completed: ${task.deadline.toLocaleDateString()}` 
                              : `${getDaysLeft(task.deadline)} days left`}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                          <span className="text-sm dark:text-slate-300">
                            {task.status === 'completed' 
                              ? `Earned: ${task.stakeAmount} ETH` 
                              : `Staked: ${task.stakeAmount} ETH`}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-sm">
                          <span className="dark:text-slate-400">Progress</span>
                          <span className="font-medium dark:text-white">{task.progress}%</span>
                        </div>
                        <div className="h-2 w-full bg-gray-100 dark:bg-slate-800 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${task.status === 'completed' ? 'bg-emerald-500' : getThemeValue('primary')} rounded-full`} 
                            style={{ width: `${task.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between pt-2">
                      <div className="flex -space-x-2">
                        <Avatar className="border-2 border-white dark:border-slate-900 h-8 w-8">
                          <AvatarImage src="/placeholder.svg?height=32&width=32" />
                          <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        {task.collaborators > 0 && (
                          <Avatar className="border-2 border-white dark:border-slate-900 h-8 w-8">
                            <AvatarImage src="/placeholder.svg?height=32&width=32" />
                            <AvatarFallback>SM</AvatarFallback>
                          </Avatar>
                        )}
                        {task.collaborators > 1 && (
                          <div className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-100 dark:bg-slate-800 border-2 border-white dark:border-slate-900 text-xs">
                            +{task.collaborators}
                          </div>
                        )}
                      </div>
                      <Button asChild size="sm" className={task.status === 'completed' ? 'bg-emerald-500 hover:bg-emerald-600' : getThemeValue('primary')}>
                        <Link href={`/task/${task.id}`}>
                          View Details
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Right column - Stats */}
        <div className="space-y-6">
          <Card className={getBorderRadius()}>
            <CardHeader>
              <CardTitle>Staking Summary</CardTitle>
              <CardDescription>Your current stakes and rewards</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className={`flex items-center justify-between p-4 ${getThemeValue('primaryLight')} rounded-lg`}>
                <div className="flex items-center gap-3">
                  <div className={`p-2 ${getThemeValue('primary')} rounded-full`}>
                    <TrendingUp className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium dark:text-slate-900">Total Staked</p>
                    <p className="text-sm text-slate-500 dark:text-slate-700">Across all tasks</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold dark:text-slate-900">0.75 ETH</p>
                  <div className="flex items-center justify-end gap-1 text-emerald-500 dark:text-emerald-600">
                    <ArrowRight className="h-3 w-3" />
                    <span className="text-xs">+0.25 ETH this month</span>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium dark:text-white">Current Streak</p>
                  <Badge className={getThemeValue('primary')}>12 days</Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">12/30 days</span>
                    <span className="font-medium dark:text-white">40%</span>
                  </div>
                  <div className="h-2 w-full bg-gray-100 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${getThemeValue('primary')} rounded-full`} 
                      style={{ width: '40%' }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span>Reward: 0.5 ETH</span>
                    <span>18 days left</span>
                  </div>
                </div>
              </div>
              
              <Button asChild className={`w-full ${getThemeValue('primary')}`}>
                <Link href="/staking">
                  View Staking Details
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </CardContent>
          </Card>
          
          <Card className={getBorderRadius()}>
            <CardHeader>
              <CardTitle>Upcoming Deadlines</CardTitle>
              <CardDescription>Tasks due in the next 7 days</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockTasks
                .filter(task => task.status !== 'completed' && getDaysLeft(task.deadline) <= 7)
                .map((task, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg dark:border-slate-700">
                    <div>
                      <p className="font-medium dark:text-white">{task.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Clock className="h-3 w-3 text-gray-500 dark:text-gray-400" />
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {getDaysLeft(task.deadline) === 0 
                            ? 'Due today!' 
                            : `${getDaysLeft(task.deadline)} days left`}
                        </span>
                      </div>
                    </div>
                    <Badge className={getDaysLeft(task.deadline) <= 2 ? 'bg-red-500' : 'bg-amber-500'}>
                      {getDaysLeft(task.deadline) <= 2 ? 'Urgent' : 'Soon'}
                    </Badge>
                  </div>
                ))}
              
              {mockTasks.filter(task => task.status !== 'completed' && getDaysLeft(task.deadline) <= 7).length === 0 && (
                <div className="text-center p-4">
                  <CheckCircle className="h-8 w-8 text-emerald-500 mx-auto mb-2" />
                  <p className="font-medium dark:text-white">No urgent deadlines</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">You're all caught up!</p>
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card className={getBorderRadius()}>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Frequently used features</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button asChild className={`w-full justify-start`}>
                <Link href="/create-task">
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Task
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full bg-white justify-start">
                <Link href="/leaderboard">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  View Leaderboard
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start">
                <Link href="/calendar">
                  <Calendar className="h-4 w-4 mr-2" />
                  Open Calendar
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
  }