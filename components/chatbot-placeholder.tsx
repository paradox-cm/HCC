"use client"

import { Button } from "@/components/ui/button"
import { MessageSquare } from "lucide-react"
import { useChat } from "@/components/chat/chat-provider"

export function ChatbotPlaceholder() {
  const { isChatOpen, setChatOpen, setChatMinimized } = useChat()

  const handleChatOpen = () => {
    setChatOpen(true)
    setChatMinimized(false)
  }

  // Don't show the button if chat is already open
  if (isChatOpen) return null

  return (
    <div className="fixed bottom-4 right-4 z-30">
      <Button size="lg" className="rounded-full shadow-lg" onClick={handleChatOpen}>
        <MessageSquare className="mr-2 h-5 w-5" />
        Chat with us
      </Button>
    </div>
  )
}
