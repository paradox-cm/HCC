import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Patient Portal Dashboard | Houston Cardiology Consultants",
  description: "View your upcoming appointments, prescriptions, documents, and messages in the Houston Cardiology Consultants Patient Portal Dashboard.",
}

import PatientPortalDashboardClient from "./PatientPortalDashboardClient"

export default function PatientPortalDashboard() {
  return <PatientPortalDashboardClient />
}
