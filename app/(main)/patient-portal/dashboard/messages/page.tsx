import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Messages & Alerts | Patient Portal | Houston Cardiology Consultants",
  description: "View and send secure messages to your care team in the Houston Cardiology Consultants Patient Portal.",
}

import MessagesPageClient from "./MessagesPageClient"

export default function DashboardMessagesPage() {
  return <MessagesPageClient />
} 