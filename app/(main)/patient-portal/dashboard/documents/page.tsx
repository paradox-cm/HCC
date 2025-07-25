import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Documents & Results | Patient Portal | Houston Cardiology Consultants",
  description: "Access your test results, medical documents, and reports securely in the Houston Cardiology Consultants Patient Portal.",
}

import DocumentsPageClient from "./DocumentsPageClient"

export default function DashboardDocumentsPage() {
  return <DocumentsPageClient />
} 