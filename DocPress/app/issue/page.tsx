"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CertificateForm } from "@/components/certificate-form"
import { useWeb3 } from "@/hooks/use-web3"
import { Award, ArrowLeft, CheckCircle } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/components/auth-provider"

export default function IssuePage() {
  const { address } = useWeb3()
  const { user: authUser } = useAuth()
  const router = useRouter()
  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    if (!address && !authUser) {
      router.push("/login")
    }
  }, [address, authUser, router])

  if (!address && !authUser) {
    return null
  }

  const handleSuccess = (result: boolean) => {
    setIsSuccess(result)
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
        <Award className="h-12 w-12 text-primary" />
        <h1 className="text-3xl font-bold">Issue Certificate</h1>
        <p className="text-muted-foreground max-w-2xl">Create a new blockchain-verified certificate for a student</p>
      </div>

      {isSuccess ? (
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center justify-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              Certificate Issued Successfully
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="mb-4">The certificate has been successfully issued and recorded on the blockchain.</p>
            <div className="flex justify-center gap-4 mt-6">
              <Button onClick={() => setIsSuccess(false)}>Issue Another</Button>
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
            <CardDescription>Enter the details of the certificate to be issued</CardDescription>
          </CardHeader>
          <CardContent>
            <CertificateForm type="issue" onSuccess={handleSuccess} />
          </CardContent>
        </Card>
      )}
    </div>
  )
}

