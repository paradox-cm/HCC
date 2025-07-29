import type { Metadata } from "next"
import HipaaPageClient from "./HipaaPageClient"

export const metadata: Metadata = {
  title: "HIPAA Notice | Houston Cardiology Consultants",
  description: "Learn about your privacy rights under HIPAA and how Houston Cardiology Consultants protects your health information. Read our Notice of Privacy Practices.",
  keywords: "HIPAA, privacy notice, health information privacy, patient rights, medical privacy, HIPAA compliance",
  openGraph: {
    title: "HIPAA Notice | Houston Cardiology Consultants",
    description: "Learn about your privacy rights under HIPAA and how Houston Cardiology Consultants protects your health information.",
  },
}

export default function HipaaPage() {
  return <HipaaPageClient />
}
