"use client"

import { Pill } from "lucide-react"

export default function AdminPrescriptionsPage() {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center gap-2 mb-6">
        <Pill className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold">Prescriptions</h1>
      </div>
      <div className="p-4 bg-muted rounded-lg text-muted-foreground">
        Prescription management for all patients will appear here.
      </div>
    </div>
  )
} 