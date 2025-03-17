"use client"

import { useState } from "react"
import { ArrowLeft, Filter, Medal, Search, Trophy } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export default function LeaderboardPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const leaderboardData = [
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
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-100">
            <Trophy className="h-4 w-4 text-amber-600" />
          </div>
        )
      case 2:
        return (
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100">
            <Medal className="h-4 w-4 text-gray-600" />
          </div>
        )
      case 3:
        return (
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-50">
            <Medal className="h-4 w-4 text-amber-500" />
          </div>
        )
      default:
        return (
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100">
            <span className="text-sm font-medium">{rank}</span>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto p-6">
        <Button variant="ghost" className="mb-6 gap-2 text-gray-700" asChild>
          <Link href="/">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold">Global Leaderboard</h1>
                <p className="text-gray-500">Top performers based on task completion and streaks</p>
              </div>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    type="search"
                    placeholder="Search users..."
                    className="pl-8 border-gray-200"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button variant="outline" size="icon" className="border-gray-200">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="flex gap-2 mb-6">
              <Button className="bg-black text-white hover:bg-black/90">Global</Button>
              <Button variant="outline" className="border-gray-200">
                Friends
              </Button>
              <Button variant="outline" className="border-gray-200">
                Monthly
              </Button>
              <Button variant="outline" className="border-gray-200">
                Weekly
              </Button>
            </div>

            <div className="rounded-lg border border-gray-200 overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left p-3 text-sm font-medium text-gray-500">Rank</th>
                    <th className="text-left p-3 text-sm font-medium text-gray-500">User</th>
                    <th className="text-left p-3 text-sm font-medium text-gray-500 hidden md:table-cell">
                      Completion Rate
                    </th>
                    <th className="text-left p-3 text-sm font-medium text-gray-500 hidden md:table-cell">Streak</th>
                    <th className="text-left p-3 text-sm font-medium text-gray-500 hidden md:table-cell">Tasks</th>
                    <th className="text-left p-3 text-sm font-medium text-gray-500">Earnings</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {leaderboardData.slice(0, 5).map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
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
                                <Badge key={index} variant="outline" className="text-xs py-0 border-gray-200">
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
                  <tr className="bg-gray-50">
                    <td colSpan={6} className="p-3 text-center text-sm text-gray-500">
                      • • •
                    </td>
                  </tr>
                  <tr className="bg-blue-50">
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
                              <Badge key={index} variant="outline" className="text-xs py-0 border-gray-200">
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

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-100">
                  <h2 className="font-semibold">Achievement Badges</h2>
                  <p className="text-sm text-gray-500">Unlock badges by completing challenges</p>
                </div>
                <div className="p-4 grid grid-cols-2 gap-4">
                  <div className="p-3 rounded-lg border border-gray-200 flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mb-2">
                      <Trophy className="h-6 w-6 text-emerald-600" />
                    </div>
                    <p className="font-medium">7-Day Streak</p>
                    <p className="text-xs text-gray-500">Complete tasks for 7 days in a row</p>
                    <Badge className="mt-2 bg-emerald-500">Unlocked</Badge>
                  </div>

                  <div className="p-3 rounded-lg border border-gray-200 flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-2">
                      <Trophy className="h-6 w-6 text-gray-400" />
                    </div>
                    <p className="font-medium">30-Day Streak</p>
                    <p className="text-xs text-gray-500">Complete tasks for 30 days in a row</p>
                    <Badge variant="outline" className="mt-2 border-gray-200">
                      18 days left
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-100">
                  <h2 className="font-semibold">Community Challenges</h2>
                  <p className="text-sm text-gray-500">Compete with others for additional rewards</p>
                </div>
                <div className="p-4 space-y-4">
                  <div className="p-4 rounded-lg border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium">March Productivity Sprint</p>
                      <Badge className="bg-emerald-500">Active</Badge>
                    </div>
                    <p className="text-sm text-gray-500 mb-3">Complete 20 tasks before the end of March</p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Your progress</span>
                        <span>12/20 tasks</span>
                      </div>
                      <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: "60%" }}></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-3 text-sm">
                      <span className="text-gray-500">Reward Pool: 2.5 ETH</span>
                      <span className="text-gray-500">125 participants</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

