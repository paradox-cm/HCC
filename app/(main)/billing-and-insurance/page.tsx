import type { Metadata } from "next"
import BillingPageClient from "./BillingPageClient"

export const metadata: Metadata = {
  title: "Billing & Insurance | Houston Cardiology Consultants",
  description: "Learn about billing, insurance coverage, payment options, and financial assistance at Houston Cardiology Consultants. We accept most major insurance plans and offer flexible payment solutions.",
  keywords: "billing, insurance, payment, cardiology billing, health insurance, payment plans, financial assistance, medical billing",
  openGraph: {
    title: "Billing & Insurance | Houston Cardiology Consultants",
    description: "Learn about billing, insurance coverage, payment options, and financial assistance at Houston Cardiology Consultants.",
  },
}

export default function BillingPage() {
  return <BillingPageClient />
}
