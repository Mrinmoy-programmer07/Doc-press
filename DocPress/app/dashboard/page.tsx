"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useWeb3 } from "@/hooks/use-web3"
import { Award, CheckCircle, XCircle, ArrowRight, User } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/components/auth-provider"

export default function DashboardPage() {
  const { address } = useWeb3()
  const { user: authUser } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!address && !authUser) {
      router.push("/login")
    }
  }, [address, authUser, router])

  if (!address && !authUser) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col items-center justify-center text-center space-y-4 mb-12">
        <Award className="h-12 w-12 text-primary" />
        <h1 className="text-3xl font-bold">Certificate Management Dashboard</h1>
        <p className="text-muted-foreground max-w-2xl">
          {authUser && <span className="mr-2">Logged in as: {authUser.name}</span>}
          {address && (
            <span className="font-mono">
              Wallet: {address.slice(0, 6)}...{address.slice(-4)}
            </span>
          )}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              My Profile
            </CardTitle>
            <CardDescription>View and manage your account</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Access your profile details and transaction history.</p>
          </CardContent>
          <CardFooter>
            <Link href="/profile" className="w-full">
              <Button variant="outline" className="w-full gap-2">
                Profile <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              Issue Certificate
            </CardTitle>
            <CardDescription>Create a new blockchain-verified certificate</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Issue new certificates to students who have completed their courses.
            </p>
          </CardContent>
          <CardFooter>
            <Link href="/issue" className="w-full">
              <Button className="w-full gap-2">
                Issue <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              Verify Certificate
            </CardTitle>
            <CardDescription>Verify the authenticity of a certificate</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Check if a certificate is valid and was issued by an authorized institution.
            </p>
          </CardContent>
          <CardFooter>
            <Link href="/verify" className="w-full">
              <Button variant="outline" className="w-full gap-2">
                Verify <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <XCircle className="h-5 w-5 text-primary" />
              Revoke Certificate
            </CardTitle>
            <CardDescription>Revoke a previously issued certificate</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Revoke certificates that were issued incorrectly or need to be invalidated.
            </p>
          </CardContent>
          <CardFooter>
            <Link href="/revoke" className="w-full">
              <Button variant="outline" className="w-full gap-2">
                Revoke <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

