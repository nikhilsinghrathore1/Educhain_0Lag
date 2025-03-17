"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Clock, FileText, Upload, CheckCircle, AlertCircle, ChevronRight } from "lucide-react"

type Task = {
  id: string
  title: string
  description: string
  deadline: string
  stakeAmount: string
  progress: number
  status: "in-progress" | "at-risk" | "completed"
  proofSubmitted: boolean
  daysLeft: number
}

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Complete UI Design for Client Project",
      description: "Finalize all screens and prepare handoff to development team",
      deadline: "March 20, 2025",
      stakeAmount: "0.15 ETH",
      progress: 65,
      status: "in-progress",
      proofSubmitted: false,
      daysLeft: 6,
    },
    {
      id: "2",
      title: "Research Paper on Blockchain Applications",
      description: "Minimum 10 pages with citations and case studies",
      deadline: "March 16, 2025",
      stakeAmount: "0.25 ETH",
      progress: 30,
      status: "at-risk",
      proofSubmitted: false,
      daysLeft: 2,
    },
    {
      id: "3",
      title: "Code Refactoring for Legacy System",
      description: "Improve performance and reduce technical debt",
      deadline: "March 10, 2025",
      stakeAmount: "0.10 ETH",
      progress: 100,
      status: "completed",
      proofSubmitted: true,
      daysLeft: 0,
    },
    {
      id: "4",
      title: "Mobile App Prototype",
      description: "Create interactive prototype for investor presentation",
      deadline: "March 25, 2025",
      stakeAmount: "0.20 ETH",
      progress: 45,
      status: "in-progress",
      proofSubmitted: false,
      daysLeft: 11,
    },
  ])

  const getStatusBadge = (status: Task["status"]) => {
    switch (status) {
      case "in-progress":
        return <Badge className="bg-blue-500">In Progress</Badge>
      case "at-risk":
        return <Badge variant="destructive">At Risk</Badge>
      case "completed":
        return <Badge className="bg-emerald-500">Completed</Badge>
      default:
        return null
    }
  }

  const getStatusIcon = (status: Task["status"]) => {
    switch (status) {
      case "in-progress":
        return <Clock className="h-5 w-5 text-blue-500" />
      case "at-risk":
        return <AlertCircle className="h-5 w-5 text-red-500" />
      case "completed":
        return <CheckCircle className="h-5 w-5 text-emerald-500" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <Card key={task.id} className="overflow-hidden">
          <CardHeader className="pb-2">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <CardTitle className="text-lg">{task.title}</CardTitle>
                <p className="text-sm text-slate-500 dark:text-slate-400">{task.description}</p>
              </div>
              {getStatusBadge(task.status)}
            </div>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-slate-500" />
                <span className="text-sm">Deadline: {task.deadline}</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-slate-500" />
                <span className="text-sm">{task.proofSubmitted ? "Proof Submitted" : "Proof Required"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Avatar className="h-5 w-5">
                  <AvatarImage src="/placeholder.svg?height=20&width=20" />
                  <AvatarFallback>ET</AvatarFallback>
                </Avatar>
                <span className="text-sm">Staked: {task.stakeAmount}</span>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span>Progress</span>
                <span>{task.progress}%</span>
              </div>
              <Progress value={task.progress} className="h-2" />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between pt-2">
            <div className="flex items-center gap-2">
              {getStatusIcon(task.status)}
              <span className="text-sm font-medium">
                {task.status === "completed"
                  ? "Completed on time"
                  : task.daysLeft === 0
                    ? "Due today"
                    : `${task.daysLeft} days remaining`}
              </span>
            </div>
            <div className="flex gap-2">
              {!task.proofSubmitted && task.status !== "completed" && (
                <Button size="sm" variant="outline" className="gap-1">
                  <Upload className="h-4 w-4" />
                  Submit Proof
                </Button>
              )}
              <Button size="sm" className="gap-1">
                View Details
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

