import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Houston Cardiology Consultants | Heart Care in Houston, TX",
  description: "Personalized cardiology care, advanced diagnostics, and compassionate heart health services in Houston, Texas. Book your appointment today.",
}

import HomePageClient from "./HomePageClient"

export default function HomePage() {
  return <HomePageClient />
}
