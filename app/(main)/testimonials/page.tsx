import type { Metadata } from "next"
import TestimonialsPageClient from "./TestimonialsPageClient"

export const metadata: Metadata = {
  title: "Patient Testimonials | Houston Cardiology Consultants",
  description: "Read patient testimonials and reviews about Houston Cardiology Consultants. Hear from our patients about their experiences with our cardiology care and services.",
  keywords: "patient testimonials, cardiology reviews, patient reviews, heart doctor reviews, cardiologist testimonials, Houston cardiology reviews",
  openGraph: {
    title: "Patient Testimonials | Houston Cardiology Consultants",
    description: "Read patient testimonials and reviews about Houston Cardiology Consultants. Hear from our patients about their experiences with our cardiology care and services.",
  },
}

export default function TestimonialsPage() {
  return <TestimonialsPageClient />
}
