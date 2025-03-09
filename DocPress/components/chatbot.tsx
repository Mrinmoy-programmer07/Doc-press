"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MessageCircle, Send, X, Award, Bot } from "lucide-react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

type Message = {
  id: number
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

const initialMessages: Message[] = [
  {
    id: 1,
    text: "👋 Hi there! I'm the DocPress assistant. How can I help you today?",
    sender: "bot",
    timestamp: new Date(),
  },
]

const botResponses: Record<string, string> = {
  "what is docpress":
    "DocPress is a blockchain-based certificate verification platform that allows universities to issue verified certificates and employers to verify credentials without third-party involvement.",
  "how does it work":
    "DocPress uses blockchain technology to securely store and verify academic credentials. Universities can issue certificates, and anyone can verify their authenticity using our platform.",
  "how to verify certificate":
    "To verify a certificate, go to the 'Verify Certificate' page, enter the certificate details (student name, course, university, and issue date), and click the 'Verify Certificate' button.",
  "how to issue certificate":
    "To issue a certificate, connect your wallet, navigate to the 'Issue Certificate' page, fill in the required details, and submit the form. The certificate will be recorded on the blockchain.",
  "what is blockchain":
    "Blockchain is a distributed ledger technology that enables secure, transparent, and tamper-proof record-keeping. In DocPress, it ensures that certificates cannot be falsified.",
  "connect wallet":
    "You can connect your MetaMask wallet by clicking the 'Connect Wallet' button in the navigation bar. This allows you to issue and revoke certificates.",
  help: "I can help you with information about DocPress, how to verify certificates, issue certificates, connect your wallet, and understand blockchain technology. Just ask me a question!",
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    if (isOpen) {
      scrollToBottom()
    }
  }, [messages, isOpen])

  const handleSend = () => {
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: input,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")

    // Generate bot response
    setTimeout(() => {
      const botMessage: Message = {
        id: messages.length + 2,
        text: generateResponse(input.toLowerCase()),
        sender: "bot",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])
    }, 500)
  }

  const generateResponse = (query: string): string => {
    // Check for matches in our predefined responses
    for (const [key, response] of Object.entries(botResponses)) {
      if (query.includes(key)) {
        return response
      }
    }

    // Default responses
    if (query.includes("hello") || query.includes("hi") || query.includes("hey")) {
      return "Hello! How can I assist you with DocPress today?"
    }

    if (query.includes("thank")) {
      return "You're welcome! Is there anything else I can help you with?"
    }

    return "I'm not sure I understand. You can ask me about DocPress, how to verify or issue certificates, or how to connect your wallet."
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSend()
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <Card className="w-80 md:w-96 shadow-lg">
          <CardHeader className="p-4 flex flex-row items-center justify-between space-y-0 bg-primary text-primary-foreground rounded-t-lg">
            <CardTitle className="text-base font-medium flex items-center gap-2">
              <Bot className="h-5 w-5" />
              DocPress Assistant
            </CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8 text-primary-foreground hover:text-primary-foreground/80 hover:bg-primary/80"
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="h-80 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn("flex", message.sender === "user" ? "justify-end" : "justify-start")}
                >
                  <div
                    className={cn(
                      "max-w-[80%] rounded-lg p-3",
                      message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted",
                    )}
                  >
                    {message.sender === "bot" && (
                      <div className="flex items-center gap-2 mb-1">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                            <Award className="h-3 w-3" />
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-xs font-medium">DocPress Bot</span>
                      </div>
                    )}
                    <p className="text-sm">{message.text}</p>
                    <p className="text-xs opacity-70 mt-1 text-right">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </CardContent>
          <CardFooter className="p-3 border-t">
            <div className="flex w-full items-center space-x-2">
              <Input
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1"
              />
              <Button size="icon" onClick={handleSend} disabled={!input.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardFooter>
        </Card>
      ) : (
        <Button size="icon" className="h-12 w-12 rounded-full shadow-lg" onClick={() => setIsOpen(true)}>
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}
    </div>
  )
}

