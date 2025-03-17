"use client"

import { useState, useEffect } from "react"
import { useWeb3 } from "@/lib/web3/provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Loader2, Calendar, Wallet, AlertCircle } from "lucide-react"
import { format } from "date-fns"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { useTheme } from "@/components/theme-provider"

export default function TaskContract() {
  const { deadlineContract, stakingToken, isConnected } = useWeb3()
  const { getThemeValue } = useTheme()
  const [isWeb3Available, setIsWeb3Available] = useState(false)
  const [isClient, setIsClient] = useState(false)

  const [taskName, setTaskName] = useState("")
  const [taskDescription, setTaskDescription] = useState("")
  const [deadline, setDeadline] = useState<Date | undefined>(undefined)
  const [stakeAmount, setStakeAmount] = useState("0.1")
  const [isLoading, setIsLoading] = useState(false)
  const [txHash, setTxHash] = useState("")

  // Check if we're on the client side and if Web3 is available
  useEffect(() => {
    setIsClient(true)
    setIsWeb3Available(typeof window !== "undefined" && !!window.ethereum)
  }, [])

  const handleCreateTask = async () => {
    if (!deadlineContract || !stakingToken || !isConnected || !deadline) {
      alert("Please connect your wallet and fill all fields")
      return
    }

    setIsLoading(true)

    try {
      // In a real app, we would call the contract here
      // For now, we'll just simulate a successful transaction
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setTxHash("0x" + Math.random().toString(16).substring(2, 42))
      alert(`Task created successfully! Task ID: ${Math.floor(Math.random() * 1000)}`)

      // Reset form
      setTaskName("")
      setTaskDescription("")
      setDeadline(undefined)
      setStakeAmount("0.1")
    } catch (error) {
      console.error("Error creating task:", error)
      alert("Failed to create task. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  // Don't render anything during SSR to avoid hydration issues
  if (!isClient) {
    return <div className="p-4 text-center">Loading task form...</div>
  }

  // If Web3 is not available, show a message
  if (!isWeb3Available) {
    return (
      <div className="p-6 border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/30 rounded-lg text-amber-800 dark:text-amber-300">
        <div className="flex items-start gap-3">
          <AlertCircle className="h-6 w-6 text-amber-500 dark:text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-bold mb-2">Web3 Wallet Required</h3>
            <p className="mb-4 text-amber-700 dark:text-amber-400">
              To create tasks and stake cryptocurrency, you need a Web3 wallet like MetaMask installed in your browser.
            </p>
            <Button
              onClick={() => window.open("https://metamask.io/download/", "_blank")}
              className="bg-amber-500 hover:bg-amber-600"
            >
              Install MetaMask
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="task-name">Task Name</Label>
        <Input
          id="task-name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="Enter a clear and specific task name"
          className="border-gray-200 dark:border-slate-700 dark:bg-slate-800"
          disabled={isLoading}
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
          disabled={isLoading}
        />
      </div>

      <div className="space-y-2">
        <Label>Deadline Date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-start text-left font-normal bg-white border-gray-200 dark:border-slate-700 dark:bg-slate-800"
              disabled={isLoading}
            >
              <Calendar className="mr-2 h-4 w-4" />
              {deadline ? format(deadline, "PPP") : "Select a date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <CalendarComponent
              mode="single"
              selected={deadline}
              onSelect={setDeadline}
              initialFocus
              disabled={(date) => date < new Date()}
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="space-y-2">
        <Label htmlFor="stake-amount">Stake Amount (ETH)</Label>
        <div className="flex items-center gap-2">
          <Input
            id="stake-amount"
            type="number"
            value={stakeAmount}
            onChange={(e) => setStakeAmount(e.target.value)}
            className="border-gray-200 dark:border-slate-700 dark:bg-slate-800"
            disabled={isLoading}
            step="0.01"
            min="0.01"
          />
          <Wallet className="h-4 w-4 text-gray-500 dark:text-gray-400" />
        </div>
      </div>

      <Button
        className={`w-full gap-2 bg-[#059669]`}
        onClick={handleCreateTask}
        disabled={isLoading || !isConnected || !taskName || !taskDescription || !deadline}
      >
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Creating Task...
          </>
        ) : (
          <>
            <Wallet className="h-4 w-4" />
            Create Task & Stake ETH
          </>
        )}
      </Button>

      {txHash && (
        <div className="mt-4 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
          <p className="text-sm text-emerald-700 dark:text-emerald-300 bg-[#059669] font-medium">Transaction submitted!</p>
          <p className="text-xs text-emerald-600 bg-[#059669] dark:text-emerald-400 font-mono break-all">{txHash}</p>
          <a
            href={`https://sepolia.etherscan.io/tx/${txHash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-emerald-700 bg-[#059669] dark:text-emerald-300 underline mt-2 inline-block"
          >
            View on Etherscan
          </a>
        </div>
      )}
    </div>
  )
}

