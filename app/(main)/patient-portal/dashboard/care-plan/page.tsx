import type { Metadata } from "next"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "Care Plan | Patient Portal | Houston Cardiology Consultants",
  description: "Review your personalized care plan, goals, and recent visits in the Houston Cardiology Consultants Patient Portal.",
}

import CarePlanPageClient from "./CarePlanPageClient"

export default function CarePlanPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CarePlanPageClient />
    </Suspense>
  )
} 