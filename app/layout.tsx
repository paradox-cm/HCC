import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ChatbotPlaceholder } from "@/components/chatbot-placeholder"
import { ChatWidget } from "@/components/chat/chat-widget"
import { ChatProvider } from "@/components/chat/chat-provider"
import ClientOnlyChatWidget from "@/components/ClientOnlyChatWidget"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Houston Cardiology Consultants - Wireframe",
  description: "Wireframe for the Houston Cardiology Consultants website.",
  icons: {
    icon: "/images/hcc-logo.png", // Set the favicon
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-background text-foreground overflow-x-hidden`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ChatProvider>
            <Header />
            <main className="flex-grow pt-28 overflow-x-hidden">{children}</main>
            <ChatbotPlaceholder />
            {/* Only show ChatWidget if not on /chat (client-only check) */}
            <ClientOnlyChatWidget />
            <Footer />
          </ChatProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
