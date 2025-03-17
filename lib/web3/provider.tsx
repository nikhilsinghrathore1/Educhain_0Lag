"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { ethers } from "ethers"
import {
  CHAIN_ID,
  CHAIN_NAME,
  RPC_URL,
  BLOCK_EXPLORER_URL,
  DEADLINE_CONTRACT_ADDRESS,
  DEADLINE_CONTRACT_ABI,
  STAKING_TOKEN_ADDRESS,
  ERC20_ABI,
} from "./config"

// Define a type for window.ethereum
declare global {
  interface Window {
    ethereum?: any
  }
}

type Web3ContextType = {
  provider: any | null
  signer: any | null
  account: string | null
  chainId: number | null
  deadlineContract: any | null
  stakingToken: any | null
  isConnected: boolean
  isConnecting: boolean
  connectWallet: () => Promise<void>
  disconnectWallet: () => void
  switchNetwork: () => Promise<void>
  formatEther: (value: any) => string
  parseEther: (value: string) => any
}

const Web3Context = createContext<Web3ContextType>({
  provider: null,
  signer: null,
  account: null,
  chainId: null,
  deadlineContract: null,
  stakingToken: null,
  isConnected: false,
  isConnecting: false,
  connectWallet: async () => {},
  disconnectWallet: () => {},
  switchNetwork: async () => {},
  formatEther: () => "0",
  parseEther: () => ethers.BigNumber.from(0),
})

export const useWeb3 = () => useContext(Web3Context)

// Helper function to safely check if ethereum is available
const isEthereumAvailable = () => {
  return typeof window !== "undefined" && window.ethereum !== undefined
}

// Create a minimal custom provider
const createMinimalProvider = () => {
  if (!isEthereumAvailable()) {
    return null
  }

  // Create a minimal provider that just wraps window.ethereum
  const minimalProvider = {
    // Basic provider methods
    getNetwork: async () => {
      try {
        const chainIdHex = await window.ethereum.request({ method: "eth_chainId" })
        const chainId = Number.parseInt(chainIdHex, 16)
        return {
          chainId,
          name: chainId === CHAIN_ID ? CHAIN_NAME : "Unknown Network",
        }
      } catch (error) {
        console.error("Error getting network:", error)
        return { chainId: 0, name: "Unknown" }
      }
    },

    // Signer factory method
    getSigner: () => {
      return {
        getAddress: async () => {
          try {
            const accounts = await window.ethereum.request({ method: "eth_accounts" })
            return accounts[0] || null
          } catch (error) {
            console.error("Error getting address:", error)
            return null
          }
        },

        signMessage: async (message) => {
          try {
            const address = await this.getAddress()
            return await window.ethereum.request({
              method: "personal_sign",
              params: [message, address],
            })
          } catch (error) {
            console.error("Error signing message:", error)
            throw error
          }
        },

        // Method needed for contract interactions
        sendTransaction: async (transaction) => {
          try {
            const address = await this.getAddress()
            const txHash = await window.ethereum.request({
              method: "eth_sendTransaction",
              params: [{ ...transaction, from: address }],
            })

            return {
              hash: txHash,
              wait: async () => {
                // Simulate waiting for transaction confirmation
                await new Promise((resolve) => setTimeout(resolve, 1000))
                return { status: 1 }
              },
            }
          } catch (error) {
            console.error("Error sending transaction:", error)
            throw error
          }
        },

        // Connect the provider to the signer for ethers.Contract
        provider: minimalProvider,

        // Add any other methods needed by ethers.Contract
        _signTypedData: async () => {
          throw new Error("_signTypedData not implemented")
        },
      }
    },
  }

  return minimalProvider
}

// Create a mock contract for development
const createMockContract = (address, abi) => {
  return {
    address,
    // Add mock methods based on the ABI
    // This is a simplified example
    callStatic: {},
    estimateGas: {},
    functions: {},
    populateTransaction: {},
    filters: {},
    // Add basic contract methods
    connect: () => createMockContract(address, abi),
  }
}

export const Web3Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [provider, setProvider] = useState<any>(null)
  const [signer, setSigner] = useState<any>(null)
  const [account, setAccount] = useState<string | null>(null)
  const [chainId, setChainId] = useState<number | null>(null)
  const [deadlineContract, setDeadlineContract] = useState<any>(null)
  const [stakingToken, setStakingToken] = useState<any>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)

  // Initialize provider from window.ethereum if available
  useEffect(() => {
    // Skip initialization in server-side rendering
    if (typeof window === "undefined") {
      return
    }

    const initProvider = async () => {
      try {
        // Check if ethereum is available
        if (!isEthereumAvailable()) {
          console.log("No ethereum provider detected")
          return
        }

        // Create our minimal provider
        const minProvider = createMinimalProvider()
        if (!minProvider) {
          console.log("Failed to create provider")
          return
        }

        // Set the provider
        setProvider(minProvider)

        // Check if already connected
        try {
          const accounts = await window.ethereum.request({ method: "eth_accounts" })

          if (accounts && accounts.length > 0) {
            const minSigner = minProvider.getSigner()

            // Set signer and account
            setSigner(minSigner)
            setAccount(accounts[0])

            // Get network info
            const network = await minProvider.getNetwork()
            setChainId(network.chainId)
            setIsConnected(true)

            // Initialize contracts
            try {
              // For development, use mock contracts
              // In production, you would use real ethers.Contract instances
              const mockDeadlineContract = createMockContract(DEADLINE_CONTRACT_ADDRESS, DEADLINE_CONTRACT_ABI)
              const mockStakingToken = createMockContract(STAKING_TOKEN_ADDRESS, ERC20_ABI)

              setDeadlineContract(mockDeadlineContract)
              setStakingToken(mockStakingToken)
            } catch (contractError) {
              console.error("Error initializing contracts:", contractError)
            }
          }
        } catch (accountError) {
          console.error("Error checking accounts:", accountError)
        }
      } catch (error) {
        console.error("Failed to initialize provider:", error)
      }
    }

    // Initialize with a slight delay to ensure DOM is fully loaded
    const timer = setTimeout(() => {
      initProvider()
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  // Set up event listeners for account and chain changes
  useEffect(() => {
    if (!isEthereumAvailable()) return

    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length === 0) {
        // User disconnected their wallet
        disconnectWallet()
      } else {
        // User switched accounts
        setAccount(accounts[0])
      }
    }

    const handleChainChanged = (chainIdHex: string) => {
      // Chain ID is provided as a hex string, convert to number
      const newChainId = Number.parseInt(chainIdHex, 16)
      setChainId(newChainId)

      // Refresh the page to ensure all state is updated correctly
      window.location.reload()
    }

    try {
      window.ethereum.on("accountsChanged", handleAccountsChanged)
      window.ethereum.on("chainChanged", handleChainChanged)
    } catch (error) {
      console.error("Error setting up event listeners:", error)
    }

    return () => {
      if (isEthereumAvailable()) {
        try {
          window.ethereum.removeListener("accountsChanged", handleAccountsChanged)
          window.ethereum.removeListener("chainChanged", handleChainChanged)
        } catch (error) {
          console.error("Error removing event listeners:", error)
        }
      }
    }
  }, [])

  const connectWallet = async () => {
    if (!isEthereumAvailable()) {
      console.error("Cannot connect wallet: Ethereum provider not available")
      return
    }

    setIsConnecting(true)

    try {
      // Request account access
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })

      if (accounts && accounts.length > 0) {
        // Create provider after accounts are requested
        const minProvider = createMinimalProvider()

        if (!minProvider) {
          throw new Error("Failed to create provider")
        }

        const minSigner = minProvider.getSigner()
        const network = await minProvider.getNetwork()

        setProvider(minProvider)
        setSigner(minSigner)
        setAccount(accounts[0])
        setChainId(network.chainId)
        setIsConnected(true)

        // Initialize contracts
        try {
          // For development, use mock contracts
          const mockDeadlineContract = createMockContract(DEADLINE_CONTRACT_ADDRESS, DEADLINE_CONTRACT_ABI)
          const mockStakingToken = createMockContract(STAKING_TOKEN_ADDRESS, ERC20_ABI)

          setDeadlineContract(mockDeadlineContract)
          setStakingToken(mockStakingToken)
        } catch (contractError) {
          console.error("Error initializing contracts:", contractError)
        }

        // Check if we're on the correct network
        if (network.chainId !== CHAIN_ID) {
          await switchNetwork()
        }
      }
    } catch (error) {
      console.error("Failed to connect wallet:", error)
      alert("Failed to connect wallet. Please try again.")
    } finally {
      setIsConnecting(false)
    }
  }

  const disconnectWallet = () => {
    setProvider(null)
    setSigner(null)
    setAccount(null)
    setChainId(null)
    setIsConnected(false)
    setDeadlineContract(null)
    setStakingToken(null)
  }

  const switchNetwork = async () => {
    if (!isEthereumAvailable()) return

    try {
      // Try to switch to the network
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: `0x${CHAIN_ID.toString(16)}` }],
      })
    } catch (switchError: any) {
      // This error code indicates that the chain has not been added to MetaMask
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: `0x${CHAIN_ID.toString(16)}`,
                chainName: CHAIN_NAME,
                rpcUrls: [RPC_URL],
                blockExplorerUrls: [BLOCK_EXPLORER_URL],
              },
            ],
          })
        } catch (addError) {
          console.error("Failed to add network:", addError)
        }
      }
      console.error("Failed to switch network:", switchError)
    }
  }

  const formatEther = (value: any) => {
    try {
      return ethers.utils.formatEther(value)
    } catch (error) {
      console.error("Error formatting ether:", error)
      return "0"
    }
  }

  const parseEther = (value: string) => {
    try {
      return ethers.utils.parseEther(value)
    } catch (error) {
      console.error("Error parsing ether:", error)
      return ethers.BigNumber.from(0)
    }
  }

  const value = {
    provider,
    signer,
    account,
    chainId,
    deadlineContract,
    stakingToken,
    isConnected,
    isConnecting,
    connectWallet,
    disconnectWallet,
    switchNetwork,
    formatEther,
    parseEther,
  }

  return <Web3Context.Provider value={value}>{children}</Web3Context.Provider>
}

