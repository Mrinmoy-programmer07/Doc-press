"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useWeb3 } from "@/hooks/use-web3"
import { ArrowLeft, Copy, ExternalLink, User, Shield } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
// Add the useAuth import
import { useAuth } from "@/components/auth-provider"

export default function ProfilePage() {
  const { address } = useWeb3()
  // Add user from auth context
  const { user: authUser } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [transactions, setTransactions] = useState([
    { type: "Issue", date: "2023-12-15", hash: "0x1234...5678" },
    { type: "Verify", date: "2023-12-14", hash: "0x8765...4321" },
    { type: "Revoke", date: "2023-12-10", hash: "0x9876...1234" },
  ])

  useEffect(() => {
    if (!address && !authUser) {
      router.push("/connect")
    }
  }, [address, authUser, router])

  const copyToClipboard = () => {
    if (address) {
      navigator.clipboard.writeText(address)
      toast({
        title: "Address Copied",
        description: "Wallet address copied to clipboard",
      })
    }
  }

  if (!address && !authUser) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex items-center mb-8">
        <Link href="/dashboard">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                User Profile
              </CardTitle>
              <CardDescription>Your blockchain identity and details</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-4">
              <Avatar className="h-24 w-24">
                <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                  {address ? address.slice(2, 4).toUpperCase() : "??"}
                </AvatarFallback>
              </Avatar>

              <div className="text-center">
                {authUser && (
                  <div className="mb-4">
                    <h3 className="font-medium">{authUser.name}</h3>
                    <p className="text-sm text-muted-foreground">{authUser.email}</p>
                  </div>
                )}

                {address && (
                  <>
                    <h3 className="font-medium">Connected Wallet</h3>
                    <div className="flex items-center justify-center gap-2 mt-1">
                      <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
                        {address.slice(0, 6)}...{address.slice(-4)}
                      </code>
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={copyToClipboard}>
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </>
                )}
              </div>

              <Separator />

              <div className="w-full">
                <h3 className="font-medium mb-2">Account Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Role:</span>
                    <span className="font-medium">
                      {authUser ? authUser.role.charAt(0).toUpperCase() + authUser.role.slice(1) : "User"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status:</span>
                    <span className="font-medium text-green-500">Active</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Joined:</span>
                    <span className="font-medium">
                      {authUser
                        ? new Date(authUser.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "short" })
                        : "Dec 2023"}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full gap-2">
                <ExternalLink className="h-4 w-4" />
                View on Etherscan
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Transaction History
              </CardTitle>
              <CardDescription>Your recent blockchain interactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {transactions.length > 0 ? (
                  <div className="rounded-md border">
                    <div className="grid grid-cols-3 p-4 font-medium border-b">
                      <div>Type</div>
                      <div>Date</div>
                      <div>Transaction Hash</div>
                    </div>
                    {transactions.map((tx, index) => (
                      <div key={index} className="grid grid-cols-3 p-4 text-sm items-center border-b last:border-0">
                        <div>{tx.type}</div>
                        <div>{tx.date}</div>
                        <div className="flex items-center gap-2">
                          <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-xs">
                            {tx.hash}
                          </code>
                          <Button variant="ghost" size="icon" className="h-6 w-6">
                            <ExternalLink className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">No transactions found</div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">Security Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Two-Factor Authentication</h4>
                    <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                  </div>
                  <Button variant="outline">Enable</Button>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Transaction Notifications</h4>
                    <p className="text-sm text-muted-foreground">Get notified when your certificates are verified</p>
                  </div>
                  <Button variant="outline">Configure</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

