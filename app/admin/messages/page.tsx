"use client"

import { MessageSquare } from "lucide-react"

export default function AdminMessagesPage() {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center gap-2 mb-6">
        <MessageSquare className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold">Messages</h1>
      </div>
      <div className="p-4 bg-muted rounded-lg text-muted-foreground">
        Patient messages and communication will appear here.
      </div>
    </div>
  )
} 