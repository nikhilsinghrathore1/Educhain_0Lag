"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Trophy, Medal, Search, Filter } from "lucide-react"

type LeaderboardUser = {
  id: string
  name: string
  avatar: string
  completionRate: number
  streak: number
  tasksCompleted: number
  earnings: string
  rank: number
  badges: string[]
}

export default function LeaderboardSection() {
  const [searchQuery, setSearchQuery] = useState("")

  const leaderboardData: LeaderboardUser[] = [
    {
      id: "1",
      name: "Alex Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      completionRate: 98,
      streak: 42,
      tasksCompleted: 156,
      earnings: "1.45 ETH",
      rank: 1,
      badges: ["30-Day Streak", "Perfect Month", "Top Earner"],
    },
    {
      id: "2",
      name: "Sarah Williams",
      avatar: "/placeholder.svg?height=40&width=40",
      completionRate: 95,
      streak: 38,
      tasksCompleted: 142,
      earnings: "1.32 ETH",
      rank: 2,
      badges: ["30-Day Streak", "Early Adopter"],
    },
    {
      id: "3",
      name: "Michael Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      completionRate: 92,
      streak: 35,
      tasksCompleted: 128,
      earnings: "1.18 ETH",
      rank: 3,
      badges: ["20-Day Streak", "Task Master"],
    },
    {
      id: "4",
      name: "Jessica Lee",
      avatar: "/placeholder.svg?height=40&width=40",
      completionRate: 90,
      streak: 29,
      tasksCompleted: 115,
      earnings: "1.05 ETH",
      rank: 4,
      badges: ["14-Day Streak"],
    },
    {
      id: "5",
      name: "David Kim",
      avatar: "/placeholder.svg?height=40&width=40",
      completionRate: 88,
      streak: 25,
      tasksCompleted: 102,
      earnings: "0.95 ETH",
      rank: 5,
      badges: ["7-Day Streak"],
    },
    {
      id: "current",
      name: "You",
      avatar: "/placeholder.svg?height=40&width=40",
      completionRate: 87,
      streak: 12,
      tasksCompleted: 45,
      earnings: "0.12 ETH",
      rank: 24,
      badges: ["7-Day Streak"],
    },
  ]

  const getRankBadge = (rank: number) => {
    switch (rank) {
      case 1:
        return (
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/30">
            <Trophy className="h-4 w-4 text-amber-600 dark:text-amber-400" />
          </div>
        )
      case 2:
        return (
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800">
            <Medal className="h-4 w-4 text-slate-600 dark:text-slate-400" />
          </div>
        )
      case 3:
        return (
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-50 dark:bg-amber-900/20">
            <Medal className="h-4 w-4 text-amber-500 dark:text-amber-400" />
          </div>
        )
      default:
        return (
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800">
            <span className="text-sm font-medium">{rank}</span>
          </div>
        )
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle>Global Leaderboard</CardTitle>
              <CardDescription>Top performers based on task completion and streaks</CardDescription>
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
                <Input
                  type="search"
                  placeholder="Search users..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="global">
            <TabsList className="mb-4">
              <TabsTrigger value="global">Global</TabsTrigger>
              <TabsTrigger value="friends">Friends</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
            </TabsList>

            <TabsContent value="global" className="space-y-4">
              <div className="rounded-lg border overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-slate-800">
                      <th className="text-left p-3 text-sm font-medium text-slate-500 dark:text-slate-400">Rank</th>
                      <th className="text-left p-3 text-sm font-medium text-slate-500 dark:text-slate-400">User</th>
                      <th className="text-left p-3 text-sm font-medium text-slate-500 dark:text-slate-400 hidden md:table-cell">
                        Completion Rate
                      </th>
                      <th className="text-left p-3 text-sm font-medium text-slate-500 dark:text-slate-400 hidden md:table-cell">
                        Streak
                      </th>
                      <th className="text-left p-3 text-sm font-medium text-slate-500 dark:text-slate-400 hidden md:table-cell">
                        Tasks
                      </th>
                      <th className="text-left p-3 text-sm font-medium text-slate-500 dark:text-slate-400">Earnings</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {leaderboardData.slice(0, 5).map((user) => (
                      <tr key={user.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                        <td className="p-3">{getRankBadge(user.rank)}</td>
                        <td className="p-3">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={user.avatar} />
                              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{user.name}</p>
                              <div className="flex gap-1 mt-1">
                                {user.badges.slice(0, 2).map((badge, index) => (
                                  <Badge key={index} variant="outline" className="text-xs py-0">
                                    {badge}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="p-3 hidden md:table-cell">{user.completionRate}%</td>
                        <td className="p-3 hidden md:table-cell">{user.streak} days</td>
                        <td className="p-3 hidden md:table-cell">{user.tasksCompleted}</td>
                        <td className="p-3 font-medium">{user.earnings}</td>
                      </tr>
                    ))}
                    <tr className="bg-slate-50 dark:bg-slate-800/50">
                      <td colSpan={6} className="p-3 text-center text-sm text-slate-500 dark:text-slate-400">
                        • • •
                      </td>
                    </tr>
                    <tr className="bg-blue-50 dark:bg-blue-900/20">
                      <td className="p-3">{getRankBadge(leaderboardData[5].rank)}</td>
                      <td className="p-3">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={leaderboardData[5].avatar} />
                            <AvatarFallback>{leaderboardData[5].name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{leaderboardData[5].name}</p>
                            <div className="flex gap-1 mt-1">
                              {leaderboardData[5].badges.map((badge, index) => (
                                <Badge key={index} variant="outline" className="text-xs py-0">
                                  {badge}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="p-3 hidden md:table-cell">{leaderboardData[5].completionRate}%</td>
                      <td className="p-3 hidden md:table-cell">{leaderboardData[5].streak} days</td>
                      <td className="p-3 hidden md:table-cell">{leaderboardData[5].tasksCompleted}</td>
                      <td className="p-3 font-medium">{leaderboardData[5].earnings}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <Button variant="outline" className="w-full">
                View Full Leaderboard
              </Button>
            </TabsContent>

            <TabsContent value="friends">{/* Friends leaderboard content */}</TabsContent>

            <TabsContent value="monthly">{/* Monthly leaderboard content */}</TabsContent>

            <TabsContent value="weekly">{/* Weekly leaderboard content */}</TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Achievement Badges</CardTitle>
            <CardDescription>Unlock badges by completing challenges</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <div className="p-3 rounded-lg border flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mb-2">
                <Trophy className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <p className="font-medium">7-Day Streak</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Complete tasks for 7 days in a row</p>
              <Badge className="mt-2 bg-emerald-500">Unlocked</Badge>
            </div>

            <div className="p-3 rounded-lg border flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-2">
                <Trophy className="h-6 w-6 text-slate-400 dark:text-slate-500" />
              </div>
              <p className="font-medium">30-Day Streak</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Complete tasks for 30 days in a row</p>
              <Badge variant="outline" className="mt-2">
                18 days left
              </Badge>
            </div>

            <div className="p-3 rounded-lg border flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-2">
                <Trophy className="h-6 w-6 text-slate-400 dark:text-slate-500" />
              </div>
              <p className="font-medium">Perfect Month</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Complete all tasks in a month</p>
              <Badge variant="outline" className="mt-2">
                In progress
              </Badge>
            </div>

            <div className="p-3 rounded-lg border flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-2">
                <Trophy className="h-6 w-6 text-slate-400 dark:text-slate-500" />
              </div>
              <p className="font-medium">Top Earner</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Earn over 1 ETH in rewards</p>
              <Badge variant="outline" className="mt-2">
                0.12/1.00 ETH
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Community Challenges</CardTitle>
            <CardDescription>Compete with others for additional rewards</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-lg border">
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium">March Productivity Sprint</p>
                <Badge>Active</Badge>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">
                Complete 20 tasks before the end of March
              </p>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Your progress</span>
                  <span>12/20 tasks</span>
                </div>
                <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: "60%" }}></div>
                </div>
              </div>
              <div className="flex items-center justify-between mt-3 text-sm">
                <span className="text-slate-500 dark:text-slate-400">Reward Pool: 2.5 ETH</span>
                <span className="text-slate-500 dark:text-slate-400">125 participants</span>
              </div>
            </div>

            <div className="p-4 rounded-lg border">
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium">Perfect Week Challenge</p>
                <Badge variant="outline">Starts in 2 days</Badge>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">
                Complete all your tasks for 7 consecutive days
              </p>
              <Button className="w-full">Join Challenge</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

