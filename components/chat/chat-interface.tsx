"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Send, Expand } from "lucide-react"
import Link from "next/link"
import { useChat } from "./chat-provider"

interface ChatInterfaceProps {
  isModal?: boolean
}

export function ChatInterface({ isModal = false }: ChatInterfaceProps) {
  const { messages, addMessage } = useChat()
  const [input, setInput] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    // Add user message
    addMessage(input.trim(), "user")

    // Simulate assistant response (replace with actual AI integration later)
    setTimeout(() => {
      addMessage(
        "Thank you for your message. This is a simulated response. Our AI integration is coming soon!",
        "assistant",
      )
    }, 1000)

    setInput("")
  }

  return (
    <Card className="flex flex-col h-full w-full border-0 shadow-none bg-transparent">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src="/placeholder.svg?height=40&width=40" alt="HCC Assistant" />
            <AvatarFallback>HA</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-lg">HCC Assistant</CardTitle>
            <p className="text-sm text-muted-foreground">Online</p>
          </div>
        </div>
        {isModal && (
          <Button variant="ghost" size="icon" asChild>
            <Link href="/chat">
              <Expand className="h-5 w-5" />
              <span className="sr-only">Expand Chat</span>
            </Link>
          </Button>
        )}
      </CardHeader>
      <CardContent className="flex-grow overflow-y-auto p-4 space-y-4 bg-muted/40">
        {messages.map((message) => (
          <div key={message.id} className={`flex items-end gap-2 ${message.role === "user" ? "justify-end" : ""}`}>
            {message.role === "assistant" && (
              <Avatar className="h-8 w-8">
                <AvatarFallback>HA</AvatarFallback>
              </Avatar>
            )}
            <div
              className={`rounded-lg p-3 max-w-xs shadow-sm ${
                message.role === "user" ? "bg-primary text-primary-foreground" : "bg-background"
              }`}
            >
              <p className="text-sm">{message.content}</p>
            </div>
            {message.role === "user" && (
              <Avatar className="h-8 w-8">
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            )}
          </div>
        ))}
      </CardContent>
      <CardFooter className="pt-4 border-t">
        <form onSubmit={handleSubmit} className="flex w-full items-center space-x-2">
          <Textarea
            placeholder="Type your message..."
            className="min-h-0 resize-none"
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                handleSubmit(e)
              }
            }}
          />
          <Button type="submit" size="icon" disabled={!input.trim()}>
            <Send className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </CardFooter>
    </Card>
  )
}
