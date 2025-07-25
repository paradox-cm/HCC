import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Prescriptions | Patient Portal | Houston Cardiology Consultants",
  description: "View, request refills, and manage your prescriptions securely in the Houston Cardiology Consultants Patient Portal.",
}

import PrescriptionsPageClient from "./PrescriptionsPageClient"

export default function DashboardPrescriptions() {
  return <PrescriptionsPageClient />
} 