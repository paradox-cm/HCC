import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Book Appointment | Patient Portal | Houston Cardiology Consultants",
  description: "Book or manage your appointments as a patient of Houston Cardiology Consultants through the secure patient portal.",
}

import AppointmentPageClient from "./AppointmentPageClient"

export default function DashboardAppointmentForm() {
  return <AppointmentPageClient />
} 