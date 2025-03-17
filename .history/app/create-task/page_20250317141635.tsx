"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Info, Shield, Calendar, Wallet, Users, Clock, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import Link from "next/link"
import TaskContract from "@/components/web3/TaskContract"
import DashboardLayout from "@/components/layout/dashboard-layout"
import { useTheme } from "@/components/theme-provider"

export default function CreateTaskPage() {
  const { getThemeValue, getBorderRadius } = useTheme()
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [stakeAmount, setStakeAmount] = useState(0.1)
  const [enableBetting, setEnableBetting] = useState(false)
  const [taskName, setTaskName] = useState("")
  const [taskDescription, setTaskDescription] = useState("")
  const [collaborators, setCollaborators] = useState("0")
  const [priority, setPriority] = useState("medium")

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold dark:text-white">Create New Task</h1>
              <p className="text-gray-500 dark:text-gray-400">Set up a new task with blockchain-based accountability</p>
            </div>
            <Button variant="outline" className="gap-2 text-gray-700 dark:text-gray-300" asChild>
              <Link href="/">
                <ArrowLeft className="h-4 w-4" />
                Back to Dashboard
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <Card className={getBorderRadius()}>
                <CardHeader>
                  <CardTitle>Task Details</CardTitle>
                  <CardDescription>Define what needs to be accomplished</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="task-name">Task Name</Label>
                    <Input
                      id="task-name"
                      value={taskName}
                      onChange={(e) => setTaskName(e.target.value)}
                      placeholder="Enter a clear and specific task name"
                      className="border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="task-description">Description</Label>
                    <Textarea
                      id="task-description"
                      value={taskDescription}
                      onChange={(e) => setTaskDescription(e.target.value)}
                      placeholder="Describe what needs to be done and any specific requirements"
                      rows={4}
                      className="border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Deadline Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal border-gray-200 bg-white dark:border-slate-700 dark:bg-slate-800"
                          >
                            <Calendar className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP") : "Select a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <CalendarComponent
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                            disabled={(date) => date < new Date()}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="priority">Priority Level</Label>
                      <Select value={priority} onValueChange={setPriority}>
                        <SelectTrigger
                          id="priority"
                          className="border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                        >
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="urgent">Urgent</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="collaborators">Collaborators</Label>
                      <Select value={collaborators} onValueChange={setCollaborators}>
                        <SelectTrigger
                          id="collaborators"
                          className="border-gray-200 bg-white dark:border-slate-700 dark:bg-slate-800"
                        >
                          <SelectValue placeholder="Select number of collaborators" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">Just me</SelectItem>
                          <SelectItem value="1">1 collaborator</SelectItem>
                          <SelectItem value="2">2 collaborators</SelectItem>
                          <SelectItem value="3">3 collaborators</SelectItem>
                          <SelectItem value="4+">4+ collaborators</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="stake-amount">Stake Amount (ETH)</Label>
                      <div className="flex items-center gap-2">
                        <Input
                          id="stake-amount"
                          type="number"
                          value={stakeAmount}
                          onChange={(e) => setStakeAmount(Number(e.target.value))}
                          className="border-gray-200 dark:border-slate-700 dark:bg-slate-800"
                          step="0.01"
                          min="0.01"
                        />
                        <Wallet className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className={getBorderRadius()}>
                <CardHeader>
                  <CardTitle>Verification Method</CardTitle>
                  <CardDescription>How will you prove task completion?</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="verification-method">Verification Method</Label>
                    <Select defaultValue="file">
                      <SelectTrigger
                        id="verification-method"
                        className="border-gray-200 dark:border-slate-700 dark:bg-slate-800"
                      >
                        <SelectValue placeholder="Select verification method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="file">File Upload</SelectItem>
                        <SelectItem value="link">External Link</SelectItem>
                        <SelectItem value="commit">Code Commit</SelectItem>
                        <SelectItem value="photo">Photo Evidence</SelectItem>
                        <SelectItem value="witness">Witness Verification</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      How will you prove that you've completed this task?
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-gray-50 dark:bg-slate-800 space-y-4">
                    <div className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                      <h3 className="font-medium dark:text-white">Privacy Protection</h3>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Your task verification will use zero-knowledge proofs (zk-SNARKs) to ensure that you can prove
                      completion without revealing sensitive information. The proof will be stored on IPFS with a
                      tamper-proof timestamp.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="enable-betting">Enable Community Betting</Label>
                      <Switch id="enable-betting" checked={enableBetting} onCheckedChange={setEnableBetting} />
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Allow others to bet on whether you'll complete this task on time.
                    </p>
                  </div>

                  {enableBetting && (
                    <div className="p-4 rounded-lg border border-gray-200 dark:border-slate-700 space-y-4">
                      <h3 className="font-medium dark:text-white">Betting Settings</h3>
                      <div className="space-y-2">
                        <Label htmlFor="min-bet">Minimum Bet (ETH)</Label>
                        <Input
                          id="min-bet"
                          type="number"
                          defaultValue={0.01}
                          min={0.001}
                          step={0.001}
                          className="border-gray-200 dark:border-slate-700 dark:bg-slate-800"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="max-bettors">Maximum Number of Bettors</Label>
                        <Input
                          id="max-bettors"
                          type="number"
                          defaultValue={10}
                          min={1}
                          max={100}
                          className="border-gray-200 dark:border-slate-700 dark:bg-slate-800"
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="anonymous-betting" />
                        <Label htmlFor="anonymous-betting">Anonymous Betting</Label>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className={getBorderRadius()}>
                <CardHeader>
                  <CardTitle>Blockchain Contract</CardTitle>
                  <CardDescription>Stake ETH to commit to your deadline</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex gap-3 mb-4">
                    <Info className="h-5 w-5 text-blue-500 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-blue-700 dark:text-blue-300">
                        Blockchain-Powered Accountability
                      </p>
                      <p className="text-sm text-blue-600 dark:text-blue-400">
                        Your task will be recorded on the Ethereum blockchain, ensuring immutability and transparency.
                        The staked amount will be locked in a smart contract until you complete the task or miss the
                        deadline.
                      </p>
                    </div>
                  </div>

                  <TaskContract />
                </CardContent>
              </Card>

              <Card className={getBorderRadius()}>
                <CardHeader>
                  <CardTitle>Task Summary</CardTitle>
                  <CardDescription>Review your task details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {taskName ? (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                          <span className="text-sm font-medium dark:text-white">Deadline</span>
                        </div>
                        <span className="text-sm dark:text-gray-300">{date ? format(date, "PPP") : "Not set"}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Wallet className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                          <span className="text-sm font-medium dark:text-white">Stake Amount</span>
                        </div>
                        <span className="text-sm dark:text-gray-300">{stakeAmount} ETH</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                          <span className="text-sm font-medium dark:text-white">Collaborators</span>
                        </div>
                        <span className="text-sm dark:text-gray-300">
                          {collaborators === "0" ? "Just me" : collaborators}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <AlertCircle className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                          <span className="text-sm font-medium dark:text-white">Priority</span>
                        </div>
                        <span className="text-sm dark:text-gray-300 capitalize">{priority}</span>
                      </div>

                      <div className="h-px bg-gray-200 dark:bg-slate-700 my-2"></div>

                      <Button className={`w-full ${getThemeValue("primary")}`}>
                        Create Task & Stake {stakeAmount} ETH
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <AlertCircle className="h-10 w-10 text-gray-300 dark:text-gray-600 mx-auto mb-2" />
                      <p className="text-gray-500 dark:text-gray-400">Fill in the task details to see a summary</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  )
}

