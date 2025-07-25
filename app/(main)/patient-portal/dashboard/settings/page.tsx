import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Settings | Patient Portal | Houston Cardiology Consultants",
  description: "Manage your account settings, preferences, and notifications in the Houston Cardiology Consultants Patient Portal.",
}

import SettingsPageClient from "./SettingsPageClient"

export default function DashboardSettings() {
  return <SettingsPageClient />
} 