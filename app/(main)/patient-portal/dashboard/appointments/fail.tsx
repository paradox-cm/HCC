"use client"

import { XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

export default function AppointmentFailPage() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <Card className="max-w-md w-full mx-auto text-center p-6">
        <CardContent className="flex flex-col items-center gap-4">
          <XCircle className="h-12 w-12 text-red-600 mb-2" />
          <h1 className="text-2xl font-bold mb-2">Request Failed</h1>
          <p className="text-muted-foreground mb-4">
            Sorry, there was a problem submitting your appointment request. Please try again or contact our office for assistance.
          </p>
          <Button asChild className="w-full mt-2">
            <Link href="/patient-portal/dashboard">Back to Dashboard</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
} 