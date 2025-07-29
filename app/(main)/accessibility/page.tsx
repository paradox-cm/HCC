import type { Metadata } from "next"
import AccessibilityPageClient from "./AccessibilityPageClient"

export const metadata: Metadata = {
  title: "Accessibility | Houston Cardiology Consultants",
  description: "Learn about Houston Cardiology Consultants' commitment to digital accessibility. Find information about our accessibility features and how to request accommodations.",
  keywords: "accessibility, digital accessibility, ADA compliance, web accessibility, disability accommodations, assistive technology, accessible healthcare",
  openGraph: {
    title: "Accessibility | Houston Cardiology Consultants",
    description: "Learn about Houston Cardiology Consultants' commitment to digital accessibility. Find information about our accessibility features and how to request accommodations.",
  },
}

export default function AccessibilityPage() {
  return <AccessibilityPageClient />
}
