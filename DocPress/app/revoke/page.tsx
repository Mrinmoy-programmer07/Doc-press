"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CertificateForm } from "@/components/certificate-form"
import { useWeb3 } from "@/hooks/use-web3"
import { XCircle, ArrowLeft, CheckCircle } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/components/auth-provider"

export default function RevokePage() {
  const { address } = useWeb3()
  const { user: authUser } = useAuth()
  const router = useRouter()
  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    if (!address && !authUser) {
      router.push("/login")
    }
  }, [address, authUser, router])

  const handleSuccess = (result: boolean) => {
    setIsSuccess(result)
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

      <div className="flex flex-col items-center justify-center text-center space-y-4 mb-8">
        <XCircle className="h-12 w-12 text-primary" />
        <h1 className="text-3xl font-bold">Revoke Certificate</h1>
        <p className="text-muted-foreground max-w-2xl">Revoke a previously issued blockchain certificate</p>
      </div>

      {isSuccess ? (
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center justify-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              Certificate Revoked Successfully
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="mb-4">The certificate has been successfully revoked on the blockchain.</p>
            <div className="flex justify-center gap-4 mt-6">
              <Button onClick={() => setIsSuccess(false)}>Revoke Another</Button>
              <Link href="/dashboard">
                <Button variant="outline">Back to Dashboard</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Certificate Details</CardTitle>
            <CardDescription>Enter the details of the certificate to be revoked</CardDescription>
          </CardHeader>
          <CardContent>
            <CertificateForm type="revoke" onSuccess={handleSuccess} />
          </CardContent>
        </Card>
      )}
    </div>
  )
}

