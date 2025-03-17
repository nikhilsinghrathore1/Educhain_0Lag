"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Calendar, CheckCircle, Clock, FileText, Link2, Wallet, MessageSquare, Shield } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import ProofSubmission from "@/components/web3/ProofSubmission"
import BettingInterface from "@/components/web3/BettingInterface"
import DashboardLayout from "@/components/layout/dashboard-layout"
import { useTheme } from "@/components/theme-provider"

export default function TaskDetailPage({ params }: { params: { id: string } }) {
  const { getThemeValue, getBorderRadius } = useTheme()
  const [progress, setProgress] = useState(65)
  const [activeTab, setActiveTab] = useState("overview")

  // Mock task data - in a real app, this would be fetched from the blockchain
  const task = {
    id: params.id,
    name: "Complete UI Design for Client Project",
    description:
      "Finalize all screens and prepare handoff to development team. Include responsive designs for mobile, tablet, and desktop. Ensure all components follow the design system.",
    deadline: new Date("2025-03-20"),
    createdAt: new Date("2025-03-08"),
    stakeAmount: "0.15",
    status: "in-progress",
    category: "Work",
    priority: "High",
    progress: progress,
    daysLeft: 6,
    contractAddress: "0x1a2b3c4d5e6f7g8h9i0j",
    verificationMethod: "File Upload",
    privacyLevel: "Private",
    collaborators: [
      { name: "John Doe", avatar: "/placeholder.svg?height=40&width=40", initials: "JD" },
      { name: "Sarah Miller", avatar: "/placeholder.svg?height=40&width=40", initials: "SM" },
    ],
    checkIns: [
      { date: "March 12, 2025", note: "Completed 65% of high-fidelity designs", status: "completed" },
      { date: "March 11, 2025", note: "Completed 50% of high-fidelity designs", status: "completed" },
      { date: "March 10, 2025", note: "Started high-fidelity designs", status: "completed" },
      { date: "March 9, 2025", note: "Completed wireframes", status: "completed" },
      { date: "March 8, 2025", note: "Started wireframes", status: "completed" },
    ],
    comments: [
      {
        id: "1",
        author: "John Doe",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "JD",
        content: "I've started working on the mobile designs. Should be ready for review by tomorrow.",
        timestamp: "2 days ago",
      },
      {
        id: "2",
        author: "Sarah Miller",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "SM",
        content: "The client requested some changes to the color scheme. I've updated the design system accordingly.",
        timestamp: "1 day ago",
      },
    ],
  }

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Button variant="ghost" className="p-0 h-8 w-8" asChild>
                  <Link href="/">
                    <ArrowLeft className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  </Link>
                </Button>
                <Badge className="bg-blue-500">In Progress</Badge>
                <Badge
                  variant="outline"
                  className="text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700"
                >
                  {task.category}
                </Badge>
                <Badge
                  variant="outline"
                  className="bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800"
                >
                  {task.priority}
                </Badge>
              </div>
              <h1 className="text-2xl font-bold dark:text-white">{task.name}</h1>
              <p className="text-gray-500 dark:text-gray-400 mt-2">{task.description}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card className={getBorderRadius()}>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-amber-500" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Time Remaining</p>
                    <p className="text-lg font-bold dark:text-white">{task.daysLeft} days</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className={getBorderRadius()}>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Wallet className="h-5 w-5 text-emerald-500" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Staked Amount</p>
                    <p className="text-lg font-bold dark:text-white">{task.stakeAmount} ETH</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className={getBorderRadius()}>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Verification Method</p>
                    <p className="text-lg font-bold dark:text-white">{task.verificationMethod}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-2 mb-6">
            <div className="flex items-center justify-between">
              <h3 className="font-medium dark:text-white">Progress</h3>
              <span className="text-sm font-medium dark:text-white">{task.progress}%</span>
            </div>
            <div className="h-2 w-full bg-gray-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div
                className={`h-full ${getThemeValue("primary")} rounded-full`}
                style={{ width: `${task.progress}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>Created: {task.createdAt.toLocaleDateString()}</span>
              <span>Due: {task.deadline.toLocaleDateString()}</span>
            </div>
          </div>

          <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="checkins">Check-ins</TabsTrigger>
              <TabsTrigger value="proof">Submit Proof</TabsTrigger>
              <TabsTrigger value="betting">Community Bets</TabsTrigger>
              <TabsTrigger value="discussion">Discussion</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className={getBorderRadius()}>
                  <CardHeader>
                    <CardTitle>Task Details</CardTitle>
                    <CardDescription>Key information about this task</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-500  dark:text-gray-400" />
                        <span className="text-sm font-medium dark:text-white">Deadline</span>
                      </div>
                      <span className="text-sm dark:text-gray-300">{task.deadline.toLocaleDateString()}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                        <span className="text-sm font-medium dark:text-white">Time Remaining</span>
                      </div>
                      <span className="text-sm dark:text-gray-300">{task.daysLeft} days</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Wallet className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                        <span className="text-sm font-medium dark:text-white">Stake Amount</span>
                      </div>
                      <span className="text-sm dark:text-gray-300">{task.stakeAmount} ETH</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                        <span className="text-sm font-medium dark:text-white">Privacy Level</span>
                      </div>
                      <span className="text-sm dark:text-gray-300">{task.privacyLevel}</span>
                    </div>

                    <div className="h-px bg-gray-200 dark:bg-slate-700 my-2"></div>

                    <div>
                      <p className="text-sm font-medium mb-2 dark:text-white">Collaborators</p>
                      <div className="flex items-center gap-2">
                        {task.collaborators.map((collaborator, index) => (
                          <Avatar key={index} className="h-8 w-8">
                            <AvatarImage src={collaborator.avatar} />
                            <AvatarFallback>{collaborator.initials}</AvatarFallback>
                          </Avatar>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className={getBorderRadius()}>
                  <CardHeader>
                    <CardTitle>Contract Details</CardTitle>
                    <CardDescription>Blockchain information</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Contract Address</p>
                      <div className="flex items-center gap-2">
                        <code className="text-sm font-mono bg-gray-100 dark:bg-slate-800 p-1 rounded dark:text-white">
                          {task.contractAddress.substring(0, 8)}...
                          {task.contractAddress.substring(task.contractAddress.length - 8)}
                        </code>
                        <Button variant="ghost" size="icon" className="h-6 w-6 text-gray-500 dark:text-gray-400">
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M8 16H6C5.46957 16 4.96086 15.7893 4.58579 15.4142C4.21071 15.0391 4 14.5304 4 14V6C4 5.46957 4.21071 4.96086 4.58579 4.58579C4.96086 4.21071 5.46957 4 6 4H14C14.5304 4 15.0391 4.21071 15.4142 4.58579C15.7893 4.96086 16 5.46957 16 6V8"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M10 14H18V20H10V14Z"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </Button>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Transaction Hash</p>
                      <div className="flex items-center gap-2">
                        <code className="text-sm font-mono bg-gray-100 dark:bg-slate-800 p-1 rounded dark:text-white">
                          0x1a2b...3c4d
                        </code>
                        <Button variant="ghost" size="icon" className="h-6 w-6 text-gray-500 dark:text-gray-400">
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M8 16H6C5.46957 16 4.96086 15.7893 4.58579 15.4142C4.21071 15.0391 4 14.5304 4 14V6C4 5.46957 4.21071 4.96086 4.58579 4.58579C4.96086 4.21071 5.46957 4 6 4H14C14.5304 4 15.0391 4.21071 15.4142 4.58579C15.7893 4.96086 16 5.46957 16 6V8"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M10 14H18V20H10V14Z"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </Button>
                      </div>
                    </div>

                    <div className="h-px bg-gray-200 dark:bg-slate-700 my-2"></div>

                    <div className="flex flex-col gap-2">
                      <Button variant="outline" className="gap-2 justify-start">
                        <Link2 className="h-4 w-4" />
                        View on Etherscan
                      </Button>
                      <Button variant="outline" className="gap-2 justify-start">
                        <Shield className="h-4 w-4" />
                        Verify Proof
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className={getBorderRadius()}>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest updates and check-ins</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {task.checkIns.slice(0, 3).map((checkIn, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="h-8 w-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                            <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                          </div>
                          {index < task.checkIns.slice(0, 3).length - 1 && (
                            <div className="h-full w-0.5 bg-emerald-100 dark:bg-emerald-900/30 my-1"></div>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="font-medium dark:text-white">{checkIn.date}</p>
                            <Badge className="bg-emerald-500">Completed</Badge>
                          </div>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{checkIn.note}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" onClick={() => setActiveTab("checkins")}>
                    View All Check-ins
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="checkins" className="space-y-6">
              <Card className={getBorderRadius()}>
                <CardHeader>
                  <CardTitle>Daily Check-ins</CardTitle>
                  <CardDescription>Track your progress and maintain your streak</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium dark:text-white">Today's Progress Update</label>
                      <Textarea
                        placeholder="What did you accomplish today?"
                        className="border-gray-200 dark:border-slate-700 dark:bg-slate-800"
                      />
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <label className="text-sm font-medium dark:text-white">Progress: {progress}%</label>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={progress}
                            onChange={(e) => setProgress(Number.parseInt(e.target.value))}
                            className="w-32"
                          />
                        </div>
                        <Button size="sm" className={getThemeValue("primary")}>
                          Log Progress
                        </Button>
                      </div>
                    </div>

                    <div className="h-px bg-gray-200 dark:bg-slate-700 my-4"></div>

                    <div className="space-y-4">
                      <h3 className="font-medium dark:text-white">Previous Check-ins</h3>

                      {task.checkIns.map((checkIn, index) => (
                        <div key={index} className="flex gap-4">
                          <div className="flex flex-col items-center">
                            <div className="h-8 w-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                              <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                            </div>
                            {index < task.checkIns.length - 1 && (
                              <div className="h-full w-0.5 bg-emerald-100 dark:bg-emerald-900/30 my-1"></div>
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <p className="font-medium dark:text-white">{checkIn.date}</p>
                              <Badge className="bg-emerald-500">Completed</Badge>
                            </div>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{checkIn.note}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="proof" className="space-y-6">
              <Card className={getBorderRadius()}>
                <CardHeader>
                  <CardTitle>Submit Proof</CardTitle>
                  <CardDescription>Upload proof of task completion to the blockchain</CardDescription>
                </CardHeader>
                <CardContent>
                  <ProofSubmission taskId={task.id} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="betting" className="space-y-6">
              <Card className={getBorderRadius()}>
                <CardHeader>
                  <CardTitle>Community Bets</CardTitle>
                  <CardDescription>Bet on whether this task will be completed on time</CardDescription>
                </CardHeader>
                <CardContent>
                  <BettingInterface taskId={task.id} taskName={task.name} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="discussion" className="space-y-6">
              <Card className={getBorderRadius()}>
                <CardHeader>
                  <CardTitle>Discussion</CardTitle>
                  <CardDescription>Collaborate with team members</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    {task.comments.map((comment) => (
                      <div key={comment.id} className="flex gap-4">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={comment.avatar} />
                          <AvatarFallback>{comment.initials}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <p className="font-medium dark:text-white">{comment.author}</p>
                            <span className="text-xs text-gray-500 dark:text-gray-400">{comment.timestamp}</span>
                          </div>
                          <p className="text-sm dark:text-gray-300 mt-1">{comment.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="h-px bg-gray-200 dark:bg-slate-700 my-2"></div>

                  <div className="flex gap-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="/placeholder.svg?height=40&width=40" />
                      <AvatarFallback>YO</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <Textarea
                        placeholder="Add a comment..."
                        className="border-gray-200 dark:border-slate-700 dark:bg-slate-800"
                      />
                      <div className="flex justify-end mt-2">
                        <Button className={getThemeValue("primary")}>
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Post Comment
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </DashboardLayout>
  )
}

