import type React from "react"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"
import { Web3Provider } from "@/components/web3-provider"
import { Toaster } from "@/components/ui/toaster"
import { Footer } from "@/components/footer"
import { Chatbot } from "@/components/chatbot"
import "./globals.css"
import { AuthProvider } from "@/components/auth-provider"

export const metadata = {
  title: "DocPress - Blockchain Certificate Verifier",
  description: "Verify academic credentials on the blockchain",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <AuthProvider>
            <Web3Provider>
              <div className="flex min-h-screen flex-col">
                <Navbar />
                <main className="flex-1">{children}</main>
                <Footer />
              </div>
              <Chatbot />
              <Toaster />
            </Web3Provider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'