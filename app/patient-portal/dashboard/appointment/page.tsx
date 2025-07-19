"use client"

import { useState } from "react"
import { SectionWrapper } from "@/components/section-wrapper"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "lucide-react"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"

const MOCK_PATIENT = {
  name: "Jane Doe",
  dob: "1985-04-12",
  email: "jane.doe@email.com",
  phone: "555-123-4567",
}

const PROVIDERS = [
  { value: "ali", label: "Dr. Asif Ali" },
  { value: "abdul", label: "Dr. Abdul" },
  { value: "sajid", label: "Dr. Sajid" },
]

const LOCATIONS = [
  { value: "main", label: "Heart Health Way Clinic" },
  { value: "wellness", label: "Wellness Blvd Clinic" },
]

const REASONS = [
  { value: "followup", label: "Follow-up" },
  { value: "new", label: "New Issue" },
  { value: "test", label: "Test/Results Discussion" },
  { value: "other", label: "Other" },
]

export default function DashboardAppointmentForm() {
  const router = useRouter()
  const [form, setForm] = useState({
    provider: "ali",
    location: "main",
    date: "",
    time: "",
    reason: "followup",
    notes: "",
  })
  const [submitted, setSubmitted] = useState(false)

  function handleChange(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <>
        <div className="px-4 md:px-8 lg:px-8 xl:px-8 2xl:px-8 max-w-7xl mx-auto pt-2">
          <Button variant="outline" onClick={() => router.back()} className="mb-2">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </div>
        <SectionWrapper className="pt-4 md:pt-0">
          <Card className="max-w-lg mx-auto">
            <CardHeader>
              <CardTitle>Appointment Request Submitted</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Thank you, {MOCK_PATIENT.name}! Your appointment request has been received. We will contact you soon to confirm your appointment.</p>
              <div className="text-sm text-muted-foreground mb-2">Summary:</div>
              <ul className="text-sm mb-4">
                <li><b>Provider:</b> {PROVIDERS.find(p => p.value === form.provider)?.label}</li>
                <li><b>Location:</b> {LOCATIONS.find(l => l.value === form.location)?.label}</li>
                <li><b>Date:</b> {form.date}</li>
                <li><b>Time:</b> {form.time}</li>
                <li><b>Reason:</b> {REASONS.find(r => r.value === form.reason)?.label}</li>
                {form.notes && <li><b>Notes:</b> {form.notes}</li>}
              </ul>
              <Button onClick={() => setSubmitted(false)} className="w-full">Book Another Appointment</Button>
            </CardContent>
          </Card>
        </SectionWrapper>
      </>
    )
  }

  return (
    <>
      <div className="px-4 md:px-8 lg:px-8 xl:px-8 2xl:px-8 max-w-7xl mx-auto pt-2">
        <Button variant="outline" onClick={() => router.back()} className="mb-2">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </div>
      <SectionWrapper className="pt-4 md:pt-0">
        <Card className="max-w-lg mx-auto">
          <CardHeader>
            <CardTitle>Book an Appointment</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-5" onSubmit={handleSubmit} autoComplete="off">
              <div>
                <div className="text-xs text-muted-foreground mb-1">Patient</div>
                <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
                  <Input value={MOCK_PATIENT.name} disabled className="bg-muted" />
                  <Input value={MOCK_PATIENT.dob} disabled className="bg-muted" />
                </div>
                <div className="flex flex-col gap-2 sm:flex-row sm:gap-4 mt-2">
                  <Input value={MOCK_PATIENT.email} disabled className="bg-muted" />
                  <Input value={MOCK_PATIENT.phone} disabled className="bg-muted" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Provider</div>
                  <Select value={form.provider} onValueChange={v => handleChange("provider", v)}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {PROVIDERS.map((p) => (
                        <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Location</div>
                  <Select value={form.location} onValueChange={v => handleChange("location", v)}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {LOCATIONS.map((l) => (
                        <SelectItem key={l.value} value={l.value}>{l.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Date</div>
                  <Input type="date" value={form.date} onChange={e => handleChange("date", e.target.value)} required />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Time</div>
                  <Input type="time" value={form.time} onChange={e => handleChange("time", e.target.value)} required />
                </div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-1">Reason for Visit</div>
                <Select value={form.reason} onValueChange={v => handleChange("reason", v)}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {REASONS.map((r) => (
                      <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-1">Notes (optional)</div>
                <Textarea value={form.notes} onChange={e => handleChange("notes", e.target.value)} placeholder="Add any details for your provider..." />
              </div>
              <Button type="submit" className="w-full">Submit Appointment Request</Button>
            </form>
          </CardContent>
        </Card>
      </SectionWrapper>
    </>
  )
} 