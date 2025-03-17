"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Calendar } from "@/components/ui/calendar"
import { FlameIcon as Fire, Trophy, TrendingUp, CalendarIcon } from "lucide-react"

export default function StreakCalendar() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  // Example streak data
  const streakData = {
    currentStreak: 12,
    longestStreak: 21,
    thisMonth: 15,
    daysUntilReward: 18,
    completedDays: [
      new Date(2025, 2, 1),
      new Date(2025, 2, 2),
      new Date(2025, 2, 3),
      new Date(2025, 2, 4),
      new Date(2025, 2, 5),
      new Date(2025, 2, 6),
      new Date(2025, 2, 7),
      new Date(2025, 2, 8),
      new Date(2025, 2, 9),
      new Date(2025, 2, 10),
      new Date(2025, 2, 11),
      new Date(2025, 2, 12),
      new Date(2025, 2, 13),
      new Date(2025, 2, 14),
    ],
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Fire className="h-5 w-5 text-orange-500" />
              <span className="text-2xl font-bold">{streakData.currentStreak} days</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Longest Streak</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-amber-500" />
              <span className="text-2xl font-bold">{streakData.longestStreak} days</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5 text-blue-500" />
              <span className="text-2xl font-bold">{streakData.thisMonth} days</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Reward Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">{streakData.currentStreak}/30 days</span>
                <span className="text-sm font-medium">{Math.round((streakData.currentStreak / 30) * 100)}%</span>
              </div>
              <Progress value={(streakData.currentStreak / 30) * 100} className="h-2" />
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {streakData.daysUntilReward} days until reward unlock
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Streak Calendar</CardTitle>
              <CardDescription>Track your daily progress and consistency</CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
                modifiers={{
                  completed: streakData.completedDays,
                }}
                modifiersClassNames={{
                  completed: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 font-bold",
                }}
              />
              <div className="flex items-center justify-center gap-4 mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                  <span className="text-sm">Completed</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-slate-200 dark:bg-slate-700"></div>
                  <span className="text-sm">Missed</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span className="text-sm">Today</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Streak Rewards</CardTitle>
              <CardDescription>Unlock rewards with consistent progress</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Badge>7 Days</Badge>
                    <span className="font-medium">Weekly Bonus</span>
                  </div>
                  <Badge
                    variant="outline"
                    className="bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800"
                  >
                    Unlocked
                  </Badge>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400">5% bonus on all completed tasks</p>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Badge>14 Days</Badge>
                    <span className="font-medium">Fortnight Shield</span>
                  </div>
                  <Badge
                    variant="outline"
                    className="bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800"
                  >
                    In Progress
                  </Badge>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400">One free deadline extension</p>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Badge>30 Days</Badge>
                    <span className="font-medium">Monthly Master</span>
                  </div>
                  <Badge
                    variant="outline"
                    className="bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400 border-slate-200 dark:border-slate-700"
                  >
                    Locked
                  </Badge>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400">Share of the monthly reward pool</p>
              </div>

              <Button className="w-full gap-2">
                <TrendingUp className="h-4 w-4" />
                View All Rewards
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

