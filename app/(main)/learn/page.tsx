import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Learn About Heart Health | Houston Cardiology Consultants",
  description: "Watch educational videos and access resources to learn about heart health, prevention, diagnostics, and treatments from Houston Cardiology Consultants.",
}

import LearnPageClient from "./LearnPageClient"

export default function LearnPage() {
  return <LearnPageClient />
}
