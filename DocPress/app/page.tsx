import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ArrowRight, Award, CheckCircle, Shield } from "lucide-react"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col items-center justify-center text-center space-y-8">
        <div className="relative w-24 h-24 mb-4">
          <div className="absolute inset-0 bg-primary/20 rounded-full animate-pulse"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Award className="h-12 w-12 text-primary" />
          </div>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">DocPress</h1>

        <p className="text-xl text-muted-foreground max-w-2xl">
          Securely issue, verify, and manage academic credentials using blockchain technology
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <Link href="/connect">
            <Button size="lg" className="gap-2">
              Connect Wallet <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/verify">
            <Button size="lg" variant="outline" className="gap-2">
              Verify Certificate <CheckCircle className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Secure Verification
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Verify academic credentials directly on the blockchain without relying on third-party services.
            </CardDescription>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              Tamper-Proof
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Certificates stored on the blockchain cannot be altered or falsified, ensuring authenticity.
            </CardDescription>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              Instant Validation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Employers and institutions can instantly verify credentials with complete confidence.
            </CardDescription>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

