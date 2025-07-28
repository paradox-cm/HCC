import type { Metadata } from "next"
import { Suspense } from "react"
import ServicesPageClient from "./ServicesPageClient"
import { HeaderAnimation } from "@/components/HeaderAnimation"
import { LoadingAnimation } from "@/components/LoadingAnimation"

export const metadata: Metadata = {
  title: "Our Services | HCC Heart & Vascular",
  description: "Explore the full range of cardiology services, diagnostics, and treatments offered by HCC Heart & Vascular. Comprehensive heart care for every patient.",
}

export default function ServicesPage() {
  return (
    <Suspense fallback={<LoadingAnimation size="lg" className="min-h-screen" />}>
      <ServicesPageClient />
    </Suspense>
  )
}
