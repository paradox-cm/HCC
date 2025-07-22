"use client"

import { Settings } from "lucide-react"

export default function AdminSettingsPage() {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center gap-2 mb-6">
        <Settings className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold">Settings</h1>
      </div>
      <div className="p-4 bg-muted rounded-lg text-muted-foreground">
        Admin settings and user management will appear here.
      </div>
    </div>
  )
} 