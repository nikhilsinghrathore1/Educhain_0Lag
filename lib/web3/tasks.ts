import { ethers } from "ethers"
import { uploadToIPFS, generateZkProof } from "./ipfs"

// Function to create a new task with staking
export const createTask = async (
  contract: ethers.Contract,
  tokenContract: ethers.Contract,
  taskName: string,
  taskDescription: string,
  deadline: Date,
  stakeAmount: string,
) => {
  try {
    // Convert deadline to Unix timestamp
    const deadlineTimestamp = Math.floor(deadline.getTime() / 1000)

    // Convert stake amount to wei
    const stakeAmountWei = ethers.utils.parseEther(stakeAmount)

    // Approve the contract to spend tokens
    const approveTx = await tokenContract.approve(contract.address, stakeAmountWei)
    await approveTx.wait()

    // Create the task
    const tx = await contract.createTask(taskName, taskDescription, deadlineTimestamp, stakeAmountWei)

    // Wait for transaction to be mined
    const receipt = await tx.wait()

    // Parse event logs to get the task ID
    const event = receipt.events?.find((e) => e.event === "TaskCreated")
    const taskId = event?.args?.taskId

    return {
      taskId,
      txHash: receipt.transactionHash,
    }
  } catch (error) {
    console.error("Error creating task:", error)
    throw error
  }
}

// Function to submit proof of task completion
export const submitTaskProof = async (contract: ethers.Contract, taskId: string, proofFile: File, metadata: any) => {
  try {
    // Upload the proof file to IPFS
    const cid = await uploadToIPFS(proofFile, metadata)

    // Generate a zero-knowledge proof (simulated)
    const zkProof = await generateZkProof({
      taskId,
      cid,
      timestamp: Date.now(),
    })

    // Combine CID and zk-proof
    const proofData = JSON.stringify({
      cid,
      zkProof,
      timestamp: Date.now(),
    })

    // Submit the proof to the smart contract
    const tx = await contract.submitProof(taskId, proofData)
    const receipt = await tx.wait()

    return {
      cid,
      zkProof,
      txHash: receipt.transactionHash,
    }
  } catch (error) {
    console.error("Error submitting proof:", error)
    throw error
  }
}

// Function to place a bet on a task
export const placeBet = async (contract: ethers.Contract, taskId: string, willComplete: boolean, betAmount: string) => {
  try {
    // Convert bet amount to wei
    const betAmountWei = ethers.utils.parseEther(betAmount)

    // Place the bet
    const tx = await contract.placeBet(taskId, willComplete, {
      value: betAmountWei,
    })

    // Wait for transaction to be mined
    const receipt = await tx.wait()

    return {
      txHash: receipt.transactionHash,
    }
  } catch (error) {
    console.error("Error placing bet:", error)
    throw error
  }
}

// Function to get task details
export const getTaskDetails = async (contract: ethers.Contract, taskId: string) => {
  try {
    const taskDetails = await contract.getTaskDetails(taskId)

    // Format the task details
    return {
      id: taskId,
      name: taskDetails.name,
      description: taskDetails.description,
      deadline: new Date(taskDetails.deadline.toNumber() * 1000),
      stakeAmount: ethers.utils.formatEther(taskDetails.stakeAmount),
      owner: taskDetails.owner,
      completed: taskDetails.completed,
      proofCid: taskDetails.proofCid,
    }
  } catch (error) {
    console.error("Error getting task details:", error)
    throw error
  }
}

// Function to get user tasks
export const getUserTasks = async (contract: ethers.Contract, address: string) => {
  try {
    const taskIds = await contract.getUserTasks(address)

    // Get details for each task
    const tasks = await Promise.all(
      taskIds.map(async (id: ethers.BigNumber) => {
        const details = await getTaskDetails(contract, id.toString())
        return details
      }),
    )

    return tasks
  } catch (error) {
    console.error("Error getting user tasks:", error)
    throw error
  }
}

// Function to get user streak
export const getUserStreak = async (contract: ethers.Contract, address: string) => {
  try {
    const streak = await contract.getUserStreak(address)
    return streak.toNumber()
  } catch (error) {
    console.error("Error getting user streak:", error)
    throw error
  }
}

