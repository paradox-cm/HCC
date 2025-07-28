import type { Metadata } from "next"
import { Suspense } from "react"
import { LoadingAnimation } from "@/components/LoadingAnimation"

export const metadata: Metadata = {
  title: "Care Plan | Patient Portal | Houston Cardiology Consultants",
  description: "Review your personalized care plan, goals, and recent visits in the Houston Cardiology Consultants Patient Portal.",
}

import CarePlanPageClient from "./CarePlanPageClient"

export default function CarePlanPage() {
  return (
    <Suspense fallback={<LoadingAnimation size="lg" className="min-h-screen" />}>
      <CarePlanPageClient />
    </Suspense>
  )
} 