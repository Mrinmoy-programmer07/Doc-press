import Link from "next/link"
import { Award, Github, Twitter, Linkedin, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t py-12 bg-muted/40">
      <div className="container grid grid-cols-1 gap-8 md:grid-cols-4">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center gap-2">
            <Award className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg">DocPress</span>
          </div>
          <p className="text-sm text-muted-foreground max-w-xs">
            Securely issue, verify, and manage academic credentials using blockchain technology.
          </p>
          <div className="flex space-x-4">
            <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <Twitter className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
            </Link>
            <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
              <Github className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
            </Link>
            <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <Linkedin className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
            </Link>
            <Link href="mailto:info@docpress.com">
              <Mail className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
            </Link>
          </div>
        </div>

        <div>
          <h3 className="font-medium text-base mb-4">Platform</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/issue" className="text-muted-foreground hover:text-foreground transition-colors">
                Issue Certificate
              </Link>
            </li>
            <li>
              <Link href="/verify" className="text-muted-foreground hover:text-foreground transition-colors">
                Verify Certificate
              </Link>
            </li>
            <li>
              <Link href="/revoke" className="text-muted-foreground hover:text-foreground transition-colors">
                Revoke Certificate
              </Link>
            </li>
            <li>
              <Link href="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
                Dashboard
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-medium text-base mb-4">Resources</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Documentation
              </Link>
            </li>
            <li>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                API Reference
              </Link>
            </li>
            <li>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Smart Contract
              </Link>
            </li>
            <li>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Tutorials
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-medium text-base mb-4">Company</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="container mt-8 pt-8 border-t">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} DocPress. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">Powered by Blockchain Technology</p>
        </div>
      </div>
    </footer>
  )
}

