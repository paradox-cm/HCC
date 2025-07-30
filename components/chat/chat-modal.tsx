"use client"

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { useChat } from "./chat-provider"
import { ChatInterface } from "./chat-interface"

export function ChatModal() {
  const { isChatOpen, setChatOpen } = useChat()

  return (
    <Dialog open={isChatOpen} onOpenChange={setChatOpen}>
      <DialogContent className="p-0 gap-0 max-w-lg h-[70vh] flex flex-col">
        <DialogTitle className="sr-only">Chat with HCC</DialogTitle>
        <ChatInterface isModal />
      </DialogContent>
    </Dialog>
  )
}
