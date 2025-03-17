"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useWeb3 } from "@/lib/web3/provider"
import { submitTaskProof } from "@/lib/web3/tasks"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, Upload, FileText, Check } from "lucide-react"

interface ProofSubmissionProps {
  taskId: string
}

export default function ProofSubmission({ taskId }: ProofSubmissionProps) {
  const { deadlineContract, isConnected } = useWeb3()
  const [file, setFile] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [txHash, setTxHash] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0])
    }
  }

  const handleSubmitProof = async () => {
    if (!deadlineContract || !isConnected || !file || !taskId) {
      alert("Please connect your wallet and select a file")
      return
    }

    setIsLoading(true)

    try {
      const metadata = {
        taskId,
        submittedAt: new Date().toISOString(),
        fileType: file.type,
        fileName: file.name,
      }

      const result = await submitTaskProof(deadlineContract, taskId, file, metadata)

      setTxHash(result.txHash)
      setIsSuccess(true)
    } catch (error) {
      console.error("Error submitting proof:", error)
      alert("Failed to submit proof. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      {isSuccess ? (
        <div className="p-4 bg-emerald-50 rounded-lg flex items-start gap-3">
          <Check className="h-5 w-5 text-emerald-500 mt-0.5" />
          <div>
            <p className="font-medium text-emerald-700">Proof submitted successfully!</p>
            <p className="text-sm text-emerald-600">
              Your proof has been uploaded to IPFS and verified on the blockchain.
            </p>
            <p className="text-xs font-mono text-emerald-600 mt-2 break-all">{txHash}</p>
            <a
              href={`https://sepolia.etherscan.io/tx/${txHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-emerald-700 underline mt-1 inline-block"
            >
              View on Etherscan
            </a>
          </div>
        </div>
      ) : (
        <>
          <div className="space-y-2">
            <Label htmlFor="proof-file">Upload Proof</Label>
            <div className="flex items-center gap-2">
              <Input
                id="proof-file"
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="border-gray-200 focus:ring-emerald-500"
                disabled={isLoading}
              />
              <Button
                variant="outline"
                size="icon"
                type="button"
                className="border-gray-200"
                onClick={() => fileInputRef.current?.click()}
                disabled={isLoading}
              >
                <FileText className="h-4 w-4" />
              </Button>
            </div>
            {file && (
              <p className="text-sm text-gray-500">
                Selected file: {file.name} ({(file.size / 1024).toFixed(2)} KB)
              </p>
            )}
          </div>

          <Button
            className="w-full gap-2 bg-emerald-500 hover:bg-emerald-600"
            onClick={handleSubmitProof}
            disabled={isLoading || !isConnected || !file}
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Submitting Proof...
              </>
            ) : (
              <>
                <Upload className="h-4 w-4" />
                Submit Proof
              </>
            )}
          </Button>

          <div className="p-4 rounded-lg bg-blue-50 text-blue-700 text-sm">
            <p className="font-medium">Privacy Protection</p>
            <p className="text-blue-600 text-sm mt-1">
              Your proof will be stored on IPFS with a tamper-proof timestamp. Zero-knowledge proofs ensure you can
              verify completion without revealing sensitive information.
            </p>
          </div>
        </>
      )}
    </div>
  )
}

