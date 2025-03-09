"use client"

import { createContext, useEffect, useState, type ReactNode } from "react"
import { ethers } from "ethers"
import { useToast } from "@/components/ui/use-toast"

// ABI for the certificate contract
const contractABI = [
  "function issueCertificate(string memory studentName, string memory course, string memory university, string memory issueDate) public",
  "function verifyCertificate(string memory studentName, string memory course, string memory university, string memory issueDate) public view returns (bool)",
  "function revokeCertificate(string memory studentName, string memory course, string memory university, string memory issueDate) public",
]

// Contract address - this would be the address of your deployed contract
const contractAddress = "0x0000000000000000000000000000000000000000" // Replace with actual contract address

type Web3ContextType = {
  provider: ethers.BrowserProvider | null
  signer: ethers.Signer | null
  contract: ethers.Contract | null
  address: string | null
  connect: () => Promise<void>
  disconnect: () => void
  issueCertificate: (studentName: string, course: string, university: string, issueDate: string) => Promise<boolean>
  verifyCertificate: (studentName: string, course: string, university: string, issueDate: string) => Promise<boolean>
  revokeCertificate: (studentName: string, course: string, university: string, issueDate: string) => Promise<boolean>
}

export const Web3Context = createContext<Web3ContextType>({
  provider: null,
  signer: null,
  contract: null,
  address: null,
  connect: async () => {},
  disconnect: () => {},
  issueCertificate: async () => false,
  verifyCertificate: async () => false,
  revokeCertificate: async () => false,
})

export function Web3Provider({ children }: { children: ReactNode }) {
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null)
  const [signer, setSigner] = useState<ethers.Signer | null>(null)
  const [contract, setContract] = useState<ethers.Contract | null>(null)
  const [address, setAddress] = useState<string | null>(null)
  const { toast } = useToast()

  // Check if MetaMask is installed
  const checkIfMetaMaskIsInstalled = () => {
    return typeof window !== "undefined" && window.ethereum !== undefined
  }

  // Connect to MetaMask
  const connect = async () => {
    if (!checkIfMetaMaskIsInstalled()) {
      toast({
        title: "MetaMask not installed",
        description: "Please install MetaMask to use this application",
        variant: "destructive",
      })
      return
    }

    try {
      const browserProvider = new ethers.BrowserProvider(window.ethereum)
      const accounts = await browserProvider.send("eth_requestAccounts", [])
      const userSigner = await browserProvider.getSigner()
      const userAddress = await userSigner.getAddress()

      const certificateContract = new ethers.Contract(contractAddress, contractABI, userSigner)

      setProvider(browserProvider)
      setSigner(userSigner)
      setContract(certificateContract)
      setAddress(userAddress)

      toast({
        title: "Wallet Connected",
        description: `Connected to ${userAddress.slice(0, 6)}...${userAddress.slice(-4)}`,
      })
    } catch (error) {
      console.error("Error connecting to MetaMask:", error)
      toast({
        title: "Connection Failed",
        description: "Failed to connect to MetaMask",
        variant: "destructive",
      })
    }
  }

  // Disconnect from MetaMask
  const disconnect = () => {
    setProvider(null)
    setSigner(null)
    setContract(null)
    setAddress(null)
    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been disconnected",
    })
  }

  // Issue certificate
  const issueCertificate = async (studentName: string, course: string, university: string, issueDate: string) => {
    if (!contract || !signer) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet first",
        variant: "destructive",
      })
      return false
    }

    try {
      const tx = await contract.issueCertificate(studentName, course, university, issueDate)
      await tx.wait()
      toast({
        title: "Certificate Issued",
        description: "The certificate has been successfully issued",
      })
      return true
    } catch (error) {
      console.error("Error issuing certificate:", error)
      toast({
        title: "Transaction Failed",
        description: "Failed to issue certificate",
        variant: "destructive",
      })
      return false
    }
  }

  // Verify certificate
  const verifyCertificate = async (studentName: string, course: string, university: string, issueDate: string) => {
    if (!contract || !signer) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet first",
        variant: "destructive",
      })
      return false
    }

    try {
      const isValid = await contract.verifyCertificate(studentName, course, university, issueDate)
      return isValid
    } catch (error) {
      console.error("Error verifying certificate:", error)
      toast({
        title: "Verification Failed",
        description: "Failed to verify certificate",
        variant: "destructive",
      })
      return false
    }
  }

  // Revoke certificate
  const revokeCertificate = async (studentName: string, course: string, university: string, issueDate: string) => {
    if (!contract || !signer) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet first",
        variant: "destructive",
      })
      return false
    }

    try {
      const tx = await contract.revokeCertificate(studentName, course, university, issueDate)
      await tx.wait()
      toast({
        title: "Certificate Revoked",
        description: "The certificate has been successfully revoked",
      })
      return true
    } catch (error) {
      console.error("Error revoking certificate:", error)
      toast({
        title: "Transaction Failed",
        description: "Failed to revoke certificate",
        variant: "destructive",
      })
      return false
    }
  }

  // Listen for account changes
  useEffect(() => {
    if (typeof window !== "undefined" && window.ethereum) {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
          // User disconnected their wallet
          disconnect()
        } else if (accounts[0] !== address) {
          // User switched accounts
          connect()
        }
      }

      window.ethereum.on("accountsChanged", handleAccountsChanged)

      return () => {
        window.ethereum.removeListener("accountsChanged", handleAccountsChanged)
      }
    }
  }, [address])

  return (
    <Web3Context.Provider
      value={{
        provider,
        signer,
        contract,
        address,
        connect,
        disconnect,
        issueCertificate,
        verifyCertificate,
        revokeCertificate,
      }}
    >
      {children}
    </Web3Context.Provider>
  )
}

