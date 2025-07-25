import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Book an Appointment | Houston Cardiology Consultants",
  description: "Schedule a new patient, follow-up, prescription renewal, or pre-op clearance appointment with Houston Cardiology Consultants.",
}

import AppointmentsPageClient from "./AppointmentsPageClient"

export default function AppointmentsPage() {
  return <AppointmentsPageClient />
}
