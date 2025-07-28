import type { Metadata } from "next"
import { Suspense } from "react"
import AboutUsPageClient from "./AboutUsPageClient"
import { HeaderAnimation } from "@/components/HeaderAnimation"
import { LoadingAnimation } from "@/components/LoadingAnimation"

export const metadata: Metadata = {
  title: "About Us | HCC Heart & Vascular",
  description: "Learn about our team of experienced cardiologists and our commitment to providing exceptional cardiovascular care.",
}

export default function AboutUsPage() {
  return (
    <Suspense fallback={<LoadingAnimation size="lg" className="min-h-screen" />}>
      <AboutUsPageClient />
    </Suspense>
  )
}
