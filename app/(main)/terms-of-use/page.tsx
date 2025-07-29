import type { Metadata } from "next"
import TermsOfUsePageClient from "./TermsOfUsePageClient"

export const metadata: Metadata = {
  title: "Terms of Use | Houston Cardiology Consultants",
  description: "Read the terms and conditions for using the Houston Cardiology Consultants website and patient portal. Learn about our medical disclaimers and user agreements.",
  keywords: "terms of use, terms and conditions, website terms, medical disclaimer, user agreement, patient portal terms",
  openGraph: {
    title: "Terms of Use | Houston Cardiology Consultants",
    description: "Read the terms and conditions for using the Houston Cardiology Consultants website and patient portal.",
  },
}

export default function TermsOfUsePage() {
  return <TermsOfUsePageClient />
}
