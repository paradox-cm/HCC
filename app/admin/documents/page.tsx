"use client"

import { FileText } from "lucide-react"

export default function AdminDocumentsPage() {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center gap-2 mb-6">
        <FileText className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold">Documents</h1>
      </div>
      <div className="p-4 bg-muted rounded-lg text-muted-foreground">
        Patient documents and results will appear here.
      </div>
    </div>
  )
} 