import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Proof of Deadlines - Blockchain-Powered Productivity",
  description:
    "Beat procrastination with blockchain stakes. Set deadlines, stake cryptocurrency, and earn rewards for completing tasks on time.",
}

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div>{children}</div>
}

