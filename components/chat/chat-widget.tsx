"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Send, Minus, Maximize2, X } from "lucide-react"
import { useChat } from "./chat-provider"
import Link from "next/link"

export function ChatWidget() {
  const { isChatOpen, setChatOpen, isChatMinimized, setChatMinimized, messages, addMessage } = useChat()
  const [input, setInput] = useState("")

  if (!isChatOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    // Add user message
    addMessage(input.trim(), "user")

    // Simulate assistant response
    setTimeout(() => {
      addMessage(
        "Thank you for your message. This is a simulated response. Our AI integration is coming soon!",
        "assistant",
      )
    }, 1000)

    setInput("")
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isChatMinimized ? (
        // Minimized state - just the header bar
        <Card className="w-80 shadow-lg border">
          <CardHeader
            className="flex flex-row items-center justify-between p-4 cursor-pointer"
            onClick={() => setChatMinimized(false)}
          >
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="HCC Assistant" />
                <AvatarFallback>HA</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-sm">HCC Assistant</CardTitle>
                <p className="text-xs text-muted-foreground">Online</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={(e) => {
                e.stopPropagation()
                setChatOpen(false)
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
        </Card>
      ) : (
        // Expanded state - full chat widget
        <Card className="w-80 h-[30rem] shadow-lg border flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between p-4 border-b">
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="HCC Assistant" />
                <AvatarFallback>HA</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-sm">HCC Assistant</CardTitle>
                <p className="text-xs text-muted-foreground">Online</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="h-6 w-6" asChild>
                <Link href="/chat" onClick={() => setChatOpen(false)}>
                  <Maximize2 className="h-4 w-4" />
                  <span className="sr-only">Expand to full page</span>
                </Link>
              </Button>
              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setChatMinimized(true)}>
                <Minus className="h-4 w-4" />
                <span className="sr-only">Minimize</span>
              </Button>
              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setChatOpen(false)}>
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </Button>
            </div>
          </CardHeader>

          <CardContent className="flex-grow overflow-y-auto p-4 space-y-4 bg-muted/40">
            {messages.slice(-10).map((message) => (
              <div key={message.id} className={`flex items-end gap-2 ${message.role === "user" ? "justify-end" : ""}`}>
                {message.role === "assistant" && (
                  <Avatar className="h-6 w-6">
                    <AvatarFallback className="text-xs">HA</AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={`rounded-lg p-3 max-w-xs shadow-sm ${
                    message.role === "user" ? "bg-primary text-primary-foreground" : "bg-background"
                  }`}
                >
                  <p className="text-xs">{message.content}</p>
                </div>
                {message.role === "user" && (
                  <Avatar className="h-6 w-6">
                    <AvatarFallback className="text-xs">U</AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
          </CardContent>

          <CardFooter className="p-3 border-t">
            <form onSubmit={handleSubmit} className="flex w-full items-center space-x-2">
              <Textarea
                placeholder="Type your message..."
                className="min-h-0 resize-none text-sm"
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
              <Button type="submit" size="icon" className="h-8 w-8" disabled={!input.trim()}>
                <Send className="h-3 w-3" />
                <span className="sr-only">Send</span>
              </Button>
            </form>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}
