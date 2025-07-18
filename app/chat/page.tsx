"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, PlusCircle, Download } from "lucide-react"
import { ChatInterface } from "@/components/chat/chat-interface"
import { useChat } from "@/components/chat/chat-provider"

export default function ChatPage() {
  const router = useRouter()
  const { clearChat, exportChat } = useChat()

  const handleNewChat = () => {
    clearChat()
  }

  const handleExportChat = () => {
    exportChat()
  }

  return (
    <div className="container h-full flex flex-col pb-12">
      <div className="flex-shrink-0 pt-6 flex justify-between items-center">
        <Button variant="outline" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExportChat}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button variant="outline" onClick={handleNewChat}>
            <PlusCircle className="mr-2 h-4 w-4" />
            New Chat
          </Button>
        </div>
      </div>
      <div className="flex-grow border rounded-lg mt-4 flex flex-col">
        <ChatInterface />
      </div>
    </div>
  )
}
