import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Chat with Us | Houston Cardiology Consultants",
  description: "Get instant answers to your questions, request appointments, and more with our virtual assistant at Houston Cardiology Consultants.",
}

import ChatPageClient from "./ChatPageClient"

export default function ChatPage() {
  return <ChatPageClient />
}
