"use client"

import { useState } from "react"
import { useWeb3 } from "@/lib/web3/provider"
import { placeBet } from "@/lib/web3/tasks"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, ThumbsUp, ThumbsDown, Wallet } from "lucide-react"

interface BettingInterfaceProps {
  taskId: string
  taskName: string
}

export default function BettingInterface({ taskId, taskName }: BettingInterfaceProps) {
  const { deadlineContract, isConnected } = useWeb3()
  const [betAmount, setBetAmount] = useState("0.01")
  const [willComplete, setWillComplete] = useState<boolean | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [txHash, setTxHash] = useState("")

  const handlePlaceBet = async () => {
    if (!deadlineContract || !isConnected || willComplete === null || !taskId) {
      alert("Please connect your wallet and select a bet option")
      return
    }

    setIsLoading(true)

    try {
      const result = await placeBet(deadlineContract, taskId, willComplete, betAmount)

      setTxHash(result.txHash)
      alert("Bet placed successfully!")
    } catch (error) {
      console.error("Error placing bet:", error)
      alert("Failed to place bet. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="p-4 bg-gray-50 rounded-lg">
        <h3 className="font-medium mb-2">Place a Bet</h3>
        <p className="text-sm text-gray-500 mb-4">
          Bet on whether this task will be completed on time. If you win, you'll earn a share of the losing bets.
        </p>

        <div className="space-y-4">
          <div className="flex gap-2">
            <Button
              variant={willComplete === true ? "default" : "outline"}
              className={`flex-1 gap-2 ${willComplete === true ? "bg-emerald-500 hover:bg-emerald-600" : "border-gray-200"}`}
              onClick={() => setWillComplete(true)}
              disabled={isLoading}
            >
              <ThumbsUp className="h-4 w-4" />
              Will Complete
            </Button>

            <Button
              variant={willComplete === false ? "default" : "outline"}
              className={`flex-1 gap-2 ${willComplete === false ? "bg-red-500 hover:bg-red-600" : "border-gray-200"}`}
              onClick={() => setWillComplete(false)}
              disabled={isLoading}
            >
              <ThumbsDown className="h-4 w-4" />
              Will Fail
            </Button>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bet-amount">Bet Amount (ETH)</Label>
            <div className="flex items-center gap-2">
              <Input
                id="bet-amount"
                type="number"
                value={betAmount}
                onChange={(e) => setBetAmount(e.target.value)}
                className="border-gray-200 focus:ring-emerald-500"
                disabled={isLoading}
                step="0.001"
                min="0.001"
              />
              <Wallet className="h-4 w-4 text-gray-500" />
            </div>
          </div>

          <Button
            className="w-full gap-2 bg-black hover:bg-black/90"
            onClick={handlePlaceBet}
            disabled={isLoading || !isConnected || willComplete === null}
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Placing Bet...
              </>
            ) : (
              <>
                <Wallet className="h-4 w-4" />
                Place Bet
              </>
            )}
          </Button>

          {txHash && (
            <div className="mt-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-sm font-medium">Transaction submitted!</p>
              <p className="text-xs font-mono break-all mt-1">{txHash}</p>
              <a
                href={`https://sepolia.etherscan.io/tx/${txHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-600 underline mt-1 inline-block"
              >
                View on Etherscan
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

