"use client"

import { DollarSign } from "lucide-react"

export default function AdminBillingPage() {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center gap-2 mb-6">
        <DollarSign className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold">Billing & Insurance</h1>
      </div>
      <div className="p-4 bg-muted rounded-lg text-muted-foreground">
        Patient billing and insurance management will appear here.
      </div>
    </div>
  )
} 