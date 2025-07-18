"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { ChatStorage, type ChatMessage } from "@/lib/chat-storage"

interface ChatContextType {
  isChatOpen: boolean
  setChatOpen: (isOpen: boolean) => void
  isChatMinimized: boolean
  setChatMinimized: (isMinimized: boolean) => void
  messages: ChatMessage[]
  addMessage: (content: string, role: "user" | "assistant") => void
  clearChat: () => void
  exportChat: () => void
}

const ChatContext = createContext<ChatContextType | undefined>(undefined)

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [isChatOpen, setChatOpen] = useState(false)
  const [isChatMinimized, setChatMinimized] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])

  // Load chat session on mount
  useEffect(() => {
    const session = ChatStorage.getCurrentSession()
    if (session) {
      setMessages(session.messages)
    } else {
      // Initialize with welcome message if no session exists
      const welcomeMessage: ChatMessage = {
        id: "welcome-msg",
        role: "assistant",
        content:
          "Welcome to Houston Cardiology Consultants! How can I assist you today? You can ask about our services, doctors, or schedule an appointment.",
        timestamp: new Date(),
      }
      setMessages([welcomeMessage])
    }
  }, [])

  const addMessage = (content: string, role: "user" | "assistant") => {
    const session = ChatStorage.addMessage({ content, role })
    setMessages(session.messages)
  }

  const clearChat = () => {
    ChatStorage.clearSession()
    // Reset with welcome message
    const welcomeMessage: ChatMessage = {
      id: "welcome-msg-new",
      role: "assistant",
      content:
        "Welcome to Houston Cardiology Consultants! How can I assist you today? You can ask about our services, doctors, or schedule an appointment.",
      timestamp: new Date(),
    }
    setMessages([welcomeMessage])
  }

  const exportChat = () => {
    const exportText = ChatStorage.exportSession()
    const blob = new Blob([exportText], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `HCC-Chat-${new Date().toISOString().split("T")[0]}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <ChatContext.Provider
      value={{
        isChatOpen,
        setChatOpen,
        isChatMinimized,
        setChatMinimized,
        messages,
        addMessage,
        clearChat,
        exportChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}

export function useChat() {
  const context = useContext(ChatContext)
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider")
  }
  return context
}
