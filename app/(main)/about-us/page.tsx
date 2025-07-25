import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Us | Houston Cardiology Consultants",
  description: "Learn about our mission, philosophy, and the expert team at Houston Cardiology Consultants. Serving Houston with compassionate, state-of-the-art cardiac care since 1979.",
}

import AboutUsPageClient from "./AboutUsPageClient"

export default function AboutUsPage() {
  return <AboutUsPageClient />
}
