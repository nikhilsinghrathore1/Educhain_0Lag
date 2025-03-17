"use client"

import { useState, useEffect } from "react"
import { useWeb3 } from "@/lib/web3/provider"
import { Button } from "@/components/ui/button"
import { Wallet, Loader2, AlertCircle } from "lucide-react"
import { useTheme } from "@/components/theme-provider"

export default function ConnectWallet() {
  const { isConnected, isConnecting, account, connectWallet, disconnectWallet } = useWeb3()
  const { getThemeValue } = useTheme()
  const [isWeb3Available, setIsWeb3Available] = useState(false)
  const [isClient, setIsClient] = useState(false)

  // Check if we're on the client side and if Web3 is available
  useEffect(() => {
    setIsClient(true)
    setIsWeb3Available(typeof window !== "undefined" && !!window.ethereum)
  }, [])

  const handleConnect = async () => {
    try {
      await connectWallet()
    } catch (error) {
      console.error("Failed to connect wallet:", error)
    }
  }

  const handleDisconnect = () => {
    disconnectWallet()
  }

  // Don't render anything during SSR to avoid hydration issues
  if (!isClient) {
    return <Button className="gap-2 bg-gray-200 dark:bg-gray-700">Loading...</Button>
  }

  // If Web3 is not available, show install wallet button
  if (!isWeb3Available) {
    return (
      <Button
        className="gap-2 bg-amber-500 hover:bg-amber-600"
        onClick={() => window.open("https://metamask.io/download/", "_blank")}
      >
        <AlertCircle className="h-4 w-4" />
        Install Wallet
      </Button>
    )
  }

  if (isConnected && account) {
    return (
      <div className="flex items-center gap-2">
        <Button variant="outline" className="gap-2 border-gray-200 dark:border-slate-700" onClick={handleDisconnect}>
          <Wallet className="h-4 w-4" />
          <span className="hidden md:inline">
            {account.substring(0, 6)}...{account.substring(account.length - 4)}
          </span>
          <span className="md:hidden">{account.substring(0, 4)}...</span>
        </Button>
      </div>
    )
  }

  return (
    <Button className={`gap-2 ${getThemeValue("primary")}`} onClick={handleConnect} disabled={isConnecting}>
      {isConnecting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Wallet className="h-4 w-4" />}
      <span className="hidden md:inline">Connect Wallet</span>
      <span className="md:hidden">Connect</span>
    </Button>
  )
}

