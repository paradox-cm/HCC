import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "../globals.css";
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ChatbotPlaceholder } from "@/components/chatbot-placeholder"
import { ChatWidget } from "@/components/chat/chat-widget"
import { ChatProvider } from "@/components/chat/chat-provider"
import ClientOnlyChatWidget from "@/components/ClientOnlyChatWidget"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Houston Cardiology Consultants - Wireframe",
  description: "Wireframe for the Houston Cardiology Consultants website.",
  icons: {
    icon: "/images/hcc-logo.ico", // Set the favicon
  },
    generator: 'v0.dev'
}

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ChatProvider>
      <Header />
      <main className="flex-grow overflow-x-hidden pt-[88px]">{children}</main>
      <ChatbotPlaceholder />
      {/* Only show ChatWidget if not on /chat (client-only check) */}
      <ClientOnlyChatWidget />
      <Footer />
    </ChatProvider>
  )
} 