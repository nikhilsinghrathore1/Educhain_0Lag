"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function LandingPage() {
  const [scrollY, setScrollY] = useState(0)
  const [isWeb3Available, setIsWeb3Available] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)

    // Check if Web3 is available in the browser
    setIsWeb3Available(typeof window !== "undefined" && !!window.ethereum)

    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Don't render full content during SSR to avoid hydration issues
  if (!isClient) {
    return (
      <div className="min-h-screen bg-[#050A14] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 rounded-md bg-gradient-to-br from-emerald-400 to-cyan-400 flex items-center justify-center mx-auto mb-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="white" />
              <path d="M2 17L12 22L22 17" fill="white" />
              <path d="M2 12L12 17L22 12" fill="white" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold">Loading ProofOfDeadlines...</h1>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#050A14] text-white overflow-hidden">
      {/* Floating elements */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          className="absolute top-[15%] left-[10%] w-32 h-32 rounded-xl bg-purple-500/20 blur-sm"
          animate={{
            x: [0, 20, 0],
            y: [0, -20, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-[40%] right-[15%] w-40 h-40 rounded-xl bg-emerald-500/20 blur-sm"
          animate={{
            x: [0, -30, 0],
            y: [0, 20, 0],
            rotate: [0, -8, 0],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-[20%] left-[20%] w-36 h-36 rounded-xl bg-blue-500/20 blur-sm"
          animate={{
            x: [0, 25, 0],
            y: [0, 15, 0],
            rotate: [0, 10, 0],
          }}
          transition={{
            duration: 9,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#050A14]/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-md bg-gradient-to-br from-emerald-400 to-cyan-400 flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="white" />
                      <path d="M2 17L12 22L22 17" fill="white" />
                      <path d="M2 12L12 17L22 12" fill="white" />
                    </svg>
                  </div>
                  <span className="text-xl font-bold">ProofOfDeadlines</span>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <a
                    href="#features"
                    className="px-3 py-2 rounded-md text-sm font-medium text-white/70 hover:text-white"
                  >
                    Features
                  </a>
                  <a
                    href="#how-it-works"
                    className="px-3 py-2 rounded-md text-sm font-medium text-white/70 hover:text-white"
                  >
                    How It Works
                  </a>
                  <a
                    href="#staking"
                    className="px-3 py-2 rounded-md text-sm font-medium text-white/70 hover:text-white"
                  >
                    Staking
                  </a>
                  <a
                    href="#roadmap"
                    className="px-3 py-2 rounded-md text-sm font-medium text-white/70 hover:text-white"
                  >
                    Roadmap
                  </a>
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-4 flex items-center md:ml-6">
                <Button asChild variant="outline" className="mr-3 border-white/20 hover:bg-white/10 hover:text-white">
                  <Link href="/dashboard">Launch App</Link>
                </Button>
                <Button
                  asChild
                  className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600"
                >
                  <Link href="/create-task">Get Started</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Badge className="mb-4 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm">
                Blockchain-Powered Productivity
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-emerald-300 to-cyan-300">
                Beat Procrastination with Blockchain Stakes
              </h1>
              <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
                Set deadlines, stake cryptocurrency, and earn rewards for completing tasks on time. The ultimate
                accountability tool powered by blockchain technology.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {isWeb3Available ? (
                  <>
                    <Button
                      asChild
                      size="lg"
                      className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600"
                    >
                      <Link href="/create-task">
                        Create Your First Task <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                    <Button asChild size="lg" variant="outline" className="border-white/20 hover:bg-white/10">
                      <a href="#how-it-works">Learn How It Works</a>
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                      onClick={() => window.open("https://metamask.io/download/", "_blank")}
                    >
                      Install Web3 Wallet <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                    <Button asChild size="lg" variant="outline" className="border-white/20 hover:bg-white/10">
                      <a href="#how-it-works">Learn How It Works</a>
                    </Button>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Hero image/mockup */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="relative mx-auto max-w-5xl overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 to-cyan-500/10"></div>
              <Image
                src="/placeholder.svg?height=600&width=1200"
                alt="Proof of Deadlines Dashboard"
                width={1200}
                height={600}
                className="w-full h-auto"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-xl bg-emerald-500/30 blur-xl"></div>
            <div className="absolute -top-6 -left-6 w-32 h-32 rounded-xl bg-blue-500/30 blur-xl"></div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

