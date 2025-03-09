"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CertificateForm } from "@/components/certificate-form"
import { CheckCircle, XCircle, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useAuth } from "@/components/auth-provider"
import { useRouter } from "next/navigation"
import { useWeb3 } from "@/hooks/use-web3"

export default function VerifyPage() {
  const [verificationResult, setVerificationResult] = useState<boolean | null>(null)

  const router = useRouter()
  const { user: authUser } = useAuth()
  const { address } = useWeb3()

  const handleSuccess = (result: boolean) => {
    setVerificationResult(result)
  }

  useEffect(() => {
    // For verify, we'll allow public access but encourage login
    // No redirect needed
  }, [])

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex items-center mb-8">
        <Link href="/">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </div>

      <div className="flex flex-col items-center justify-center text-center space-y-4 mb-8">
        <CheckCircle className="h-12 w-12 text-primary" />
        <h1 className="text-3xl font-bold">Verify Certificate</h1>
        <p className="text-muted-foreground max-w-2xl">Check the authenticity of a blockchain-verified certificate</p>
      </div>

      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Certificate Details</CardTitle>
          <CardDescription>Enter the details of the certificate to verify</CardDescription>
        </CardHeader>
        <CardContent>
          {verificationResult !== null && (
            <Alert
              className={
                verificationResult
                  ? "bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800 mb-6"
                  : "bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800 mb-6"
              }
            >
              {verificationResult ? (
                <>
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <AlertTitle>Valid Certificate</AlertTitle>
                  <AlertDescription>This certificate is valid and was issued on the blockchain.</AlertDescription>
                </>
              ) : (
                <>
                  <XCircle className="h-4 w-4 text-red-500" />
                  <AlertTitle>Invalid Certificate</AlertTitle>
                  <AlertDescription>This certificate could not be verified on the blockchain.</AlertDescription>
                </>
              )}
            </Alert>
          )}
          <CertificateForm type="verify" onSuccess={handleSuccess} />
        </CardContent>
      </Card>
    </div>
  )
}

