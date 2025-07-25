"use client"

import React, { useState, Suspense } from "react"
import { useRouter } from "next/navigation"
import { useSearchParams } from "next/navigation"
import { SectionWrapper } from "@/components/section-wrapper"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { XCircle } from "lucide-react"
import ArrowLeftFillIcon from 'remixicon-react/ArrowLeftFillIcon';

const MOCK_APPT = {
  id: 1,
  date: "2025-07-25",
  time: "10:00",
  provider: "Dr. Asif Ali",
  location: "Heart Health Way Clinic",
}

function RescheduleContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [form, setForm] = useState({ date: MOCK_APPT.date, time: MOCK_APPT.time, note: "" })
  const [submitted, setSubmitted] = useState(false)
  const [showCancel, setShowCancel] = useState(() => searchParams.get("cancel") === "1")
  const [cancelNote, setCancelNote] = useState("")
  const [cancelled, setCancelled] = useState(false)

  function handleChange(field: string, value: string) {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  function handleReschedule(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  function handleCancel(e: React.FormEvent) {
    e.preventDefault()
    setCancelled(true)
  }

  if (submitted) {
    return (
      <SectionWrapper className="pt-4 md:pt-0">
        <Card className="max-w-lg mx-auto">
          <CardHeader>
            <CardTitle>Reschedule Request Submitted</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Your request to reschedule your appointment has been received. We will contact you soon to confirm the new date and time.</p>
            <ul className="text-sm mb-4">
              <li><b>New Date:</b> {form.date}</li>
              <li><b>New Time:</b> {form.time}</li>
              {form.note && <li><b>Note:</b> {form.note}</li>}
            </ul>
            <Button onClick={() => router.push('/patient-portal/dashboard')} className="w-full">Return to Dashboard</Button>
          </CardContent>
        </Card>
      </SectionWrapper>
    )
  }

  if (cancelled) {
    return (
      <SectionWrapper className="pt-4 md:pt-0">
        <Card className="max-w-lg mx-auto">
          <CardHeader>
            <CardTitle>Appointment Cancelled</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Your appointment has been cancelled.</p>
            {cancelNote && <div className="text-sm mb-4"><b>Reason:</b> {cancelNote}</div>}
            <Button onClick={() => router.push('/patient-portal/dashboard')} className="w-full">Return to Dashboard</Button>
          </CardContent>
        </Card>
      </SectionWrapper>
    )
  }

  return (
    <>
      <div className="px-4 md:px-8 lg:px-8 xl:px-8 2xl:px-8 max-w-7xl mx-auto pt-2">
        <Button variant="outline" onClick={() => router.back()} className="mb-2">
          <ArrowLeftFillIcon className="mr-2 h-4 w-4" />
          Back
        </Button>
      </div>
      <SectionWrapper className="pt-4 md:pt-0">
        <Card className="max-w-lg mx-auto">
          <CardHeader className="flex items-center gap-2 pb-2">
            <CardTitle className="text-lg">{showCancel ? "Cancel Appointment" : "Reschedule Appointment"}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4 text-xs text-muted-foreground">
              <div><b>Date:</b> {MOCK_APPT.date}</div>
              <div><b>Time:</b> {MOCK_APPT.time}</div>
              <div><b>Provider:</b> {MOCK_APPT.provider}</div>
              <div><b>Location:</b> {MOCK_APPT.location}</div>
            </div>
            {!showCancel ? (
              <form className="space-y-4" onSubmit={handleReschedule}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">New Date</div>
                    <Input
                      type="date"
                      value={form.date}
                      onChange={e => handleChange("date", e.target.value)}
                      required
                    />
                  </div>
                  <div className="mt-4 sm:mt-0">
                    <div className="text-xs text-muted-foreground mb-1">New Time</div>
                    <Input type="time" value={form.time} onChange={e => handleChange("time", e.target.value)} required />
                  </div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Note (optional)</div>
                  <Textarea value={form.note} onChange={e => handleChange("note", e.target.value)} placeholder="Add any details for your provider..." />
                </div>
                <div className="flex gap-2">
                  <Button type="submit" className="w-full">Submit Reschedule Request</Button>
                  <Button type="button" variant="secondary" className="w-full border-red-600 text-red-600" onClick={() => setShowCancel(true)}>
                    <XCircle className="mr-2 h-4 w-4" /> Cancel Appointment
                  </Button>
                </div>
              </form>
            ) : (
              <form className="space-y-4" onSubmit={handleCancel}>
                <div className="text-sm mb-2">Are you sure you want to cancel this appointment?</div>
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Reason (optional)</div>
                  <Textarea value={cancelNote} onChange={e => setCancelNote(e.target.value)} placeholder="Let us know why you're cancelling..." />
                </div>
                <div className="flex gap-2">
                  <Button type="submit" variant="destructive" className="w-full">Confirm Cancel</Button>
                  <Button type="button" variant="ghost" className="w-full" onClick={() => setShowCancel(false)}>Go Back</Button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </SectionWrapper>
    </>
  )
}

export default function RescheduleAppointmentPage() {
  return (
    <Suspense>
      <RescheduleContent />
    </Suspense>
  )
}
