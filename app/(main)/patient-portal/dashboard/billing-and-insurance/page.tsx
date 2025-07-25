import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Billing & Insurance | Patient Portal | Houston Cardiology Consultants",
  description: "View your billing information, pay balances, and update insurance details in the Houston Cardiology Consultants Patient Portal.",
}

import BillingAndInsurancePageClient from "./BillingAndInsurancePageClient"

export default function DashboardBillingAndInsurance() {
  return <BillingAndInsurancePageClient />
} 