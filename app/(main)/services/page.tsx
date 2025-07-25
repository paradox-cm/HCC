import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Our Services | Houston Cardiology Consultants",
  description: "Explore the full range of cardiology services, diagnostics, and treatments offered by Houston Cardiology Consultants. Comprehensive heart care for every patient.",
}

import ServicesPageClient from "./ServicesPageClient"

export default function ServicesPage() {
  return <ServicesPageClient />
}
