"use client"

import { usePathname } from "next/navigation"
import { ChatWidget } from "@/components/chat/chat-widget"

export default function ClientOnlyChatWidget() {
  const pathname = usePathname()
  if (pathname && pathname.startsWith("/chat")) return null
  return <ChatWidget />
} 