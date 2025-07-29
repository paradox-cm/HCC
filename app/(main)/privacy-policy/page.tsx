import type { Metadata } from "next"
import PrivacyPolicyPageClient from "./PrivacyPolicyPageClient"

export const metadata: Metadata = {
  title: "Privacy Policy | Houston Cardiology Consultants",
  description: "Learn how Houston Cardiology Consultants protects your privacy and personal information. Our comprehensive privacy policy explains how we collect, use, and safeguard your data.",
  keywords: "privacy policy, data protection, HIPAA, patient privacy, medical privacy, personal information",
  openGraph: {
    title: "Privacy Policy | Houston Cardiology Consultants",
    description: "Learn how Houston Cardiology Consultants protects your privacy and personal information.",
  },
}

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyPageClient />
}
