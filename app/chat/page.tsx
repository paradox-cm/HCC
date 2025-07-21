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
    <div className="px-4 md:px-8 lg:px-8 xl:px-8 2xl:px-8 max-w-7xl mx-auto h-full flex flex-col pb-12">
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
      <h1 className="text-2xl font-bold tracking-tighter sm:text-4xl md:text-5xl mt-8 mb-4 fade-in-up text-center">Chat with Us</h1>
      <p className="text-center max-w-2xl mx-auto text-muted-foreground text-xs mb-6">
        Our virtual assistant can help you with appointment requests, prescription refills, billing questions, insurance information, and more. You can also ask about our services, locations, or get quick answers to common patient questions.
      </p>
      <div className="flex-grow border rounded-lg mt-4 flex flex-col">
        <ChatInterface />
      </div>
    </div>
  )
}
