// Web3 configuration and constants
export const CHAIN_ID = 11155111 // Sepolia testnet
export const CHAIN_NAME = "Sepolia"
export const RPC_URL = "https://sepolia.infura.io/v3/"
export const BLOCK_EXPLORER_URL = "https://sepolia.etherscan.io"

// Contract addresses
export const DEADLINE_CONTRACT_ADDRESS = "0x1234567890123456789012345678901234567890"
export const STAKING_TOKEN_ADDRESS = "0x0987654321098765432109876543210987654321"

// IPFS gateway
export const IPFS_GATEWAY = "https://ipfs.io/ipfs/"
export const IPFS_API_URL = "https://api.pinata.cloud/pinning/pinFileToIPFS"

// ZK-SNARK verification endpoint (simulated)
export const ZK_VERIFICATION_ENDPOINT = "https://api.proof-of-deadlines.com/verify"

// Smart contract ABIs
export const DEADLINE_CONTRACT_ABI = [
  {
    inputs: [
      {
        internalType: "string",
        name: "_taskName",
        type: "string",
      },
      {
        internalType: "string",
        name: "_taskDescription",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_deadline",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_stakeAmount",
        type: "uint256",
      },
    ],
    name: "createTask",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_taskId",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_proofCid",
        type: "string",
      },
    ],
    name: "submitProof",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_taskId",
        type: "uint256",
      },
    ],
    name: "verifyCompletion",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_taskId",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "_willComplete",
        type: "bool",
      },
    ],
    name: "placeBet",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_user",
        type: "address",
      },
    ],
    name: "getUserStreak",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_user",
        type: "address",
      },
    ],
    name: "getUserTasks",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_taskId",
        type: "uint256",
      },
    ],
    name: "getTaskDetails",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "string",
            name: "description",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "deadline",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "stakeAmount",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            internalType: "bool",
            name: "completed",
            type: "bool",
          },
          {
            internalType: "string",
            name: "proofCid",
            type: "string",
          },
        ],
        internalType: "struct DeadlineContract.Task",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
]

export const ERC20_ABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
]

