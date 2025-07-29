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
  title: "Houston Cardiology Consultants | Heart Care in Houston, TX",
  description: "Personalized cardiology care, advanced diagnostics, and compassionate heart health services in Houston, Texas. Board-certified cardiologists providing comprehensive cardiovascular care.",
  keywords: "cardiologist, heart doctor, cardiology, Houston, Texas, cardiovascular care, heart health, cardiac diagnostics, POTS, dysautonomia",
  authors: [{ name: "Houston Cardiology Consultants" }],
  creator: "Houston Cardiology Consultants",
  publisher: "Houston Cardiology Consultants",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://hccheart.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://hccheart.com',
    title: 'Houston Cardiology Consultants | Heart Care in Houston, TX',
    description: 'Personalized cardiology care, advanced diagnostics, and compassionate heart health services in Houston, Texas.',
    siteName: 'Houston Cardiology Consultants',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Houston Cardiology Consultants | Heart Care in Houston, TX',
    description: 'Personalized cardiology care, advanced diagnostics, and compassionate heart health services in Houston, Texas.',
  },
  icons: {
    icon: "/images/hcc-logo.ico",
  },
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