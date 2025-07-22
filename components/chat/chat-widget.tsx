"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Message3FillIcon from 'remixicon-react/Message3FillIcon';
import MinusFillIcon from 'remixicon-react/SubtractFillIcon';
import CloseFillIcon from 'remixicon-react/CloseFillIcon';
import User3FillIcon from 'remixicon-react/User3FillIcon';
import RefreshFillIcon from 'remixicon-react/RefreshFillIcon';
import Download2FillIcon from 'remixicon-react/Download2FillIcon';
import SendPlane2FillIcon from 'remixicon-react/SendPlane2FillIcon';
import StopFillIcon from 'remixicon-react/StopFillIcon';
import ArrowGoBackFillIcon from 'remixicon-react/ArrowGoBackFillIcon';
import { useChat } from "./chat-provider"
import Link from "next/link"

// Master list of 20 conversation starters
const SUGGESTIONS = [
  "I’d like to schedule an appointment.",
  "Can I reschedule or cancel my appointment?",
  "What are your clinic hours and locations?",
  "I need help with my bill or insurance.",
  "How do I access my test results?",
  "Can I get a prescription refill?",
  "I have a question about my medication.",
  "How do I contact my doctor?",
  "What should I bring to my appointment?",
  "I’m a new patient. How do I register?",
  "Can I speak with a nurse?",
  "I need help with the patient portal.",
  "What services do you offer?",
  "How do I prepare for my procedure?",
  "I have a question about my symptoms.",
  "Can I get a copy of my medical records?",
  "How do I update my personal information?",
  "I need directions to the clinic.",
  "What insurance plans do you accept?",
  "I want to provide feedback about my visit."
]

function getRandomSuggestions() {
  // Always include the first two
  const fixed = SUGGESTIONS.slice(0, 2)
  // Get 3 random from the rest
  const rest = SUGGESTIONS.slice(2)
  const shuffled = rest.sort(() => 0.5 - Math.random())
  return [...fixed, ...shuffled.slice(0, 3)]
}

export function ChatWidget() {
  const { isChatOpen, setChatOpen, isChatMinimized, setChatMinimized, messages, addMessage, clearChat, exportChat } = useChat()
  const [input, setInput] = useState("")
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [isAnswering, setIsAnswering] = useState(false)
  const answerTimeout = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    setSuggestions(getRandomSuggestions())
  }, [])

  if (!isChatOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isAnswering) return

    // Add user message
    addMessage(input.trim(), "user")
    setIsAnswering(true)

    // Simulate assistant response
    answerTimeout.current = setTimeout(() => {
      addMessage(
        "Thank you for your message. This is a simulated response. Our AI integration is coming soon!",
        "assistant",
      )
      setIsAnswering(false)
      answerTimeout.current = null
    }, 1000)

    setInput("")
  }

  const handleStop = () => {
    if (answerTimeout.current) {
      clearTimeout(answerTimeout.current)
      answerTimeout.current = null
    }
    setIsAnswering(false)
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
                <AvatarImage src="/images/hcc-logo.png" alt="HCC Assistant" className="w-1/2 h-1/2 object-contain mx-auto my-auto" />
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
              <CloseFillIcon className="h-4 w-4" />
            </Button>
          </CardHeader>
        </Card>
      ) : (
        // Expanded state - full chat widget
        <Card className="w-80 h-[30rem] shadow-lg border flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between p-4 border-b">
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/images/hcc-logo.png" alt="HCC Assistant" className="w-1/2 h-1/2 object-contain mx-auto my-auto" />
              </Avatar>
              <div>
                <CardTitle className="text-sm">HCC Assistant</CardTitle>
                <p className="text-xs text-muted-foreground">Online</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="h-6 w-6" asChild>
                <Link href="/chat" onClick={() => setChatOpen(false)}>
                  <img src="/expand-diagonal-fill.svg" alt="Expand" className="h-4 w-4 dark:invert" />
                  <span className="sr-only">Expand to full page</span>
                </Link>
              </Button>
              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setChatMinimized(true)}>
                <MinusFillIcon className="h-4 w-4" />
                <span className="sr-only">Minimize</span>
              </Button>
              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setChatOpen(false)}>
                <CloseFillIcon className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </Button>
            </div>
          </CardHeader>

          <CardContent className="flex-grow overflow-y-auto p-4 space-y-4 bg-muted/40">
            {/* Suggestion bubbles */}
            {suggestions.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {suggestions.map((s, i) => (
                  <Button
                    key={i}
                    type="button"
                    variant="secondary"
                    size="sm"
                    className="rounded-full px-3 py-1 text-xs"
                    onClick={() => setInput(s)}
                  >
                    {s}
                  </Button>
                ))}
              </div>
            )}
            {/* Chat messages */}
            {messages.slice(-10).map((message) => (
              <div key={message.id} className={`flex items-end gap-2 ${message.role === "user" ? "justify-end" : ""}`}>
                {message.role === "assistant" && (
                  <Avatar className="h-6 w-6">
                    <AvatarImage src="/images/hcc-logo.png" alt="HCC Assistant" className="w-1/2 h-1/2 object-contain mx-auto my-auto" />
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
                    <AvatarFallback className="text-xs"><User3FillIcon className="w-4 h-4" /></AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
          </CardContent>

          <CardFooter className="p-3 border-t flex flex-col gap-0">
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
              {isAnswering ? (
                <Button type="button" size="icon" className="h-8 w-8 bg-destructive hover:bg-destructive/80" onClick={handleStop}>
                  <StopFillIcon className="h-3 w-3" />
                  <span className="sr-only">Stop</span>
                </Button>
              ) : (
                <Button type="submit" size="icon" className="h-8 w-8" disabled={!input.trim()}>
                  <SendPlane2FillIcon className="h-3 w-3" />
                  <span className="sr-only">Send</span>
                </Button>
              )}
            </form>
            <div className="w-full flex flex-row justify-between items-center mt-2">
              <button
                type="button"
                onClick={exportChat}
                className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
              >
                <Download2FillIcon className="w-3 h-3" />
                <span>Export chat</span>
              </button>
              <button
                type="button"
                onClick={clearChat}
                className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
              >
                <ArrowGoBackFillIcon className="w-3 h-3" />
                <span>Reset chat</span>
              </button>
            </div>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}
