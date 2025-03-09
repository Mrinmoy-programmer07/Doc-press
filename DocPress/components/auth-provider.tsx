"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useToast } from "@/components/ui/use-toast"

type User = {
  id: string
  email: string
  name: string
  role: "admin" | "user"
  createdAt: string
}

type AuthContextType = {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  login: async () => false,
  register: async () => false,
  logout: () => {},
})

export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  // Load user from localStorage on initial render
  useEffect(() => {
    const storedUser = localStorage.getItem("docpress_user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error("Failed to parse stored user:", error)
        localStorage.removeItem("docpress_user")
      }
    }
    setIsLoading(false)
  }, [])

  // Mock user database for demo purposes
  const mockUsers: Record<string, { password: string; user: User }> = {
    "admin@docpress.com": {
      password: "password123",
      user: {
        id: "1",
        email: "admin@docpress.com",
        name: "Admin User",
        role: "admin",
        createdAt: "2023-01-01",
      },
    },
    "user@docpress.com": {
      password: "password123",
      user: {
        id: "2",
        email: "user@docpress.com",
        name: "Regular User",
        role: "user",
        createdAt: "2023-02-15",
      },
    },
  }

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const userRecord = mockUsers[email.toLowerCase()]

    if (!userRecord || userRecord.password !== password) {
      toast({
        title: "Login Failed",
        description: "Invalid email or password",
        variant: "destructive",
      })
      return false
    }

    setUser(userRecord.user)
    localStorage.setItem("docpress_user", JSON.stringify(userRecord.user))

    toast({
      title: "Login Successful",
      description: `Welcome back, ${userRecord.user.name}!`,
    })

    return true
  }

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Check if user already exists
    if (mockUsers[email.toLowerCase()]) {
      toast({
        title: "Registration Failed",
        description: "An account with this email already exists",
        variant: "destructive",
      })
      return false
    }

    // Create new user
    const newUser: User = {
      id: `user_${Date.now()}`,
      email: email.toLowerCase(),
      name,
      role: "user",
      createdAt: new Date().toISOString(),
    }

    // In a real app, you would save this to a database
    // For this demo, we'll just update our local state
    mockUsers[email.toLowerCase()] = {
      password,
      user: newUser,
    }

    setUser(newUser)
    localStorage.setItem("docpress_user", JSON.stringify(newUser))

    toast({
      title: "Registration Successful",
      description: `Welcome to DocPress, ${name}!`,
    })

    return true
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("docpress_user")
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
    })
  }

  return <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>{children}</AuthContext.Provider>
}

