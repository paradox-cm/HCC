import type { Metadata } from "next"
import PatientRightsPageClient from "./PatientRightsPageClient"

export const metadata: Metadata = {
  title: "Patient Rights | Houston Cardiology Consultants",
  description: "Learn about your rights as a patient at Houston Cardiology Consultants. Understand your privacy rights, access to medical records, and how to file complaints.",
  keywords: "patient rights, medical rights, healthcare rights, patient privacy, medical records access, patient complaints, healthcare advocacy",
  openGraph: {
    title: "Patient Rights | Houston Cardiology Consultants",
    description: "Learn about your rights as a patient at Houston Cardiology Consultants. Understand your privacy rights, access to medical records, and how to file complaints.",
  },
}

export default function PatientRightsPage() {
  return <PatientRightsPageClient />
}
