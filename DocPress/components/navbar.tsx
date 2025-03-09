"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useWeb3 } from "@/hooks/use-web3"
import { Award, Menu, X, User, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuth } from "@/components/auth-provider"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export default function Navbar() {
  const pathname = usePathname()
  const { address, connect, disconnect } = useWeb3()
  const { user, logout } = useAuth()
  const [isMounted, setIsMounted] = useState(false)
  const [isMobileView, setIsMobileView] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Handle mobile detection with a fallback
  useEffect(() => {
    setIsMounted(true)
    const checkMobile = () => {
      setIsMobileView(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const closeMenu = () => setIsMenuOpen(false)

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/issue", label: "Issue Certificate" },
    { href: "/verify", label: "Verify Certificate" },
    { href: "/revoke", label: "Revoke Certificate" },
  ]

  const handleLogout = () => {
    logout()
    disconnect()
  }

  // Prevent hydration mismatch
  if (!isMounted) {
    return null
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Award className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg hidden md:inline-block">DocPress</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === item.href ? "text-foreground" : "text-muted-foreground",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuLabel className="font-normal text-xs text-muted-foreground">
                  {user.email}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button size="sm">Register</Button>
              </Link>
            </div>
          )}

          {address ? (
            <Button variant="outline" size="sm" onClick={disconnect} className="hidden md:flex">
              {address.slice(0, 6)}...{address.slice(-4)}
            </Button>
          ) : (
            <Button size="sm" onClick={connect} className="hidden md:flex">
              Connect Wallet
            </Button>
          )}

          <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t">
          <div className="container py-4 flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary py-2",
                  pathname === item.href ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {item.label}
              </Link>
            ))}

            {user ? (
              <div className="space-y-2 pt-2 border-t">
                <div className="flex items-center gap-2 py-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                </div>
                <Link href="/profile" onClick={closeMenu}>
                  <Button variant="outline" className="w-full justify-start">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Button>
                </Link>
                <Button onClick={handleLogout} variant="outline" className="w-full justify-start">
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </Button>
              </div>
            ) : (
              <div className="space-y-2 pt-2 border-t">
                <Link href="/login" onClick={closeMenu}>
                  <Button variant="outline" className="w-full">
                    Login
                  </Button>
                </Link>
                <Link href="/register" onClick={closeMenu}>
                  <Button className="w-full">Register</Button>
                </Link>
              </div>
            )}

            {address ? (
              <Button
                variant="outline"
                onClick={() => {
                  disconnect()
                  closeMenu()
                }}
                className="mt-2"
              >
                Disconnect Wallet
              </Button>
            ) : (
              <Button
                onClick={() => {
                  connect()
                  closeMenu()
                }}
                className="mt-2"
              >
                Connect Wallet
              </Button>
            )}
          </div>
        </div>
      )}
    </header>
  )
}

