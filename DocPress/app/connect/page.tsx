"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useWeb3 } from "@/hooks/use-web3"
import { Wallet, AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useAuth } from "@/components/auth-provider"
import Link from "next/link"

export default function ConnectPage() {
  const { address, connect } = useWeb3()
  const { user: authUser } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (address || authUser) {
      router.push("/dashboard")
    }
  }, [address, authUser, router])

  return (
    <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[80vh]">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Connect Your Wallet</CardTitle>
          <CardDescription>Connect your MetaMask wallet to interact with the DocPress platform.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Important</AlertTitle>
            <AlertDescription>
              You need MetaMask installed to use this application. Make sure you're on the correct network.
            </AlertDescription>
          </Alert>

          <div className="flex justify-center py-6">
            <Wallet className="h-16 w-16 text-primary" />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button onClick={connect} className="w-full gap-2">
            <Wallet className="h-4 w-4" />
            Connect with MetaMask
          </Button>

          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-2">Or use email/password</p>
            <div className="flex gap-2">
              <Link href="/login" className="w-full">
                <Button variant="outline" className="w-full">
                  Login
                </Button>
              </Link>
              <Link href="/register" className="w-full">
                <Button variant="outline" className="w-full">
                  Register
                </Button>
              </Link>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

