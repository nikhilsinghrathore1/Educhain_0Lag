"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Wallet, TrendingUp, ArrowUpRight, ArrowDownRight, Clock, Shield } from "lucide-react"

export default function StakingOverview() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Staking Summary</CardTitle>
            <CardDescription>Your current stakes and rewards</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-full">
                    <Wallet className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <p className="font-medium">Total Staked</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Across all tasks</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold">0.75 ETH</p>
                  <div className="flex items-center justify-end gap-1 text-emerald-500">
                    <ArrowUpRight className="h-3 w-3" />
                    <span className="text-xs">+0.25 ETH this month</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                    <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="font-medium">Rewards Earned</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">From completed tasks</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold">0.12 ETH</p>
                  <div className="flex items-center justify-end gap-1 text-emerald-500">
                    <ArrowUpRight className="h-3 w-3" />
                    <span className="text-xs">+0.03 ETH this month</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-full">
                    <Shield className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div>
                    <p className="font-medium">At Risk</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Stakes that may be lost</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold">0.25 ETH</p>
                  <div className="flex items-center justify-end gap-1 text-red-500">
                    <ArrowDownRight className="h-3 w-3" />
                    <span className="text-xs">1 task at risk</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Staking History</CardTitle>
            <CardDescription>Your recent stake transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList className="mb-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="stakes">Stakes</TabsTrigger>
                <TabsTrigger value="rewards">Rewards</TabsTrigger>
                <TabsTrigger value="penalties">Penalties</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4">
                <div className="flex items-center justify-between border-b pb-3">
                  <div className="flex items-center gap-3">
                    <Badge className="bg-blue-500">Stake</Badge>
                    <div>
                      <p className="font-medium">Research Paper</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Mar 14, 2025</p>
                    </div>
                  </div>
                  <p className="font-medium">+0.25 ETH</p>
                </div>

                <div className="flex items-center justify-between border-b pb-3">
                  <div className="flex items-center gap-3">
                    <Badge className="bg-emerald-500">Reward</Badge>
                    <div>
                      <p className="font-medium">Code Refactoring</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Mar 10, 2025</p>
                    </div>
                  </div>
                  <p className="font-medium text-emerald-500">+0.03 ETH</p>
                </div>

                <div className="flex items-center justify-between border-b pb-3">
                  <div className="flex items-center gap-3">
                    <Badge className="bg-blue-500">Stake</Badge>
                    <div>
                      <p className="font-medium">Mobile App Prototype</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Mar 5, 2025</p>
                    </div>
                  </div>
                  <p className="font-medium">+0.20 ETH</p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Badge variant="destructive">Penalty</Badge>
                    <div>
                      <p className="font-medium">Website Redesign</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Feb 28, 2025</p>
                    </div>
                  </div>
                  <p className="font-medium text-red-500">-0.05 ETH</p>
                </div>
              </TabsContent>

              <TabsContent value="stakes">{/* Stakes content */}</TabsContent>

              <TabsContent value="rewards">{/* Rewards content */}</TabsContent>

              <TabsContent value="penalties">{/* Penalties content */}</TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Smart Contract Details</CardTitle>
          <CardDescription>Your blockchain-based task contracts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium">Research Paper</p>
                <Badge className="bg-blue-500">Active</Badge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-slate-500 dark:text-slate-400">Contract Address</p>
                  <p className="font-mono">0x1a2b...3c4d</p>
                </div>
                <div>
                  <p className="text-slate-500 dark:text-slate-400">Staked Amount</p>
                  <p>0.25 ETH</p>
                </div>
                <div>
                  <p className="text-slate-500 dark:text-slate-400">Deadline</p>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <p>March 16, 2025</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 mt-3">
                <Button size="sm" variant="outline">
                  View on Explorer
                </Button>
                <Button size="sm" variant="outline">
                  Verify Proof
                </Button>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium">Mobile App Prototype</p>
                <Badge className="bg-blue-500">Active</Badge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-slate-500 dark:text-slate-400">Contract Address</p>
                  <p className="font-mono">0x5e6f...7g8h</p>
                </div>
                <div>
                  <p className="text-slate-500 dark:text-slate-400">Staked Amount</p>
                  <p>0.20 ETH</p>
                </div>
                <div>
                  <p className="text-slate-500 dark:text-slate-400">Deadline</p>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <p>March 25, 2025</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 mt-3">
                <Button size="sm" variant="outline">
                  View on Explorer
                </Button>
                <Button size="sm" variant="outline">
                  Verify Proof
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

