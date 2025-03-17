import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Web3Provider } from "@/lib/web3/provider"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Proof of Deadlines - Anti-Procrastination App",
  description: "A blockchain-powered productivity tool that financially incentivizes discipline and accountability",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {


  const opts = {
    redirectUri: 'http://localhost:3000/', // Adjust this URL
    referralCode: 'PARTNER6', 
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <Web3Provider>

       <OCConnectWrapper opts={opts} sandboxMode={true}>
          {children}
        </OCConnectWrapper>
          </Web3Provider>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'
import OCConnectWrapper from "@/components/OCConnectWrapper"
