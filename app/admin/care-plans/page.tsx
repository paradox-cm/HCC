"use client"

import { HeartPulse } from "lucide-react"

export default function AdminCarePlansPage() {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center gap-2 mb-6">
        <HeartPulse className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold">Care Plans</h1>
      </div>
      <div className="p-4 bg-muted rounded-lg text-muted-foreground">
        Patient care plan management will appear here.
      </div>
    </div>
  )
} 