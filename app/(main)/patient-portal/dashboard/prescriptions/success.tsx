"use client"

import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

export default function PrescriptionSuccessPage() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <Card className="max-w-md w-full mx-auto text-center p-6">
        <CardContent className="flex flex-col items-center gap-4">
          <CheckCircle className="h-12 w-12 text-green-600 mb-2" />
          <h1 className="text-2xl font-bold mb-2">Request Submitted!</h1>
          <p className="text-muted-foreground mb-4">
            Your prescription or refill request has been received. Our team will review it and contact you if any additional information is needed.
          </p>
          <Button asChild className="w-full mt-2">
            <Link href="/patient-portal/dashboard/prescriptions">Back to Prescriptions</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
} 