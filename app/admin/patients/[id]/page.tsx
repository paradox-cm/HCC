"use client"

import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { ArrowLeft, Users, Calendar, Pill, MessageSquare, FileText, DollarSign, HeartPulse } from "lucide-react"

const MOCK_PATIENTS = [
  { id: 1, name: "Jane Doe", dob: "1985-04-12", email: "jane@email.com", phone: "555-123-4567", lastVisit: "2024-06-01", status: "Active" },
  { id: 2, name: "John Smith", dob: "1978-09-23", email: "john@email.com", phone: "555-987-6543", lastVisit: "2024-05-20", status: "Active" },
  { id: 3, name: "Maria Garcia", dob: "1990-02-15", email: "maria@email.com", phone: "555-555-5555", lastVisit: "2024-04-10", status: "Inactive" },
]

const TABS = [
  { value: "overview", label: "Overview", icon: Users },
  { value: "appointments", label: "Appointments", icon: Calendar },
  { value: "prescriptions", label: "Prescriptions", icon: Pill },
  { value: "messages", label: "Messages", icon: MessageSquare },
  { value: "documents", label: "Documents", icon: FileText },
  { value: "billing", label: "Billing & Insurance", icon: DollarSign },
  { value: "care-plan", label: "Care Plan", icon: HeartPulse },
]

export default function AdminPatientDetailPage() {
  const params = useParams()
  const router = useRouter()
  const patient = MOCK_PATIENTS.find(p => String(p.id) === params.id)
  const tab = typeof window !== "undefined" ? (new URLSearchParams(window.location.search).get("tab") || "overview") : "overview"

  if (!patient) {
    return (
      <div className="max-w-2xl mx-auto py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Patient Not Found</h1>
        <Button asChild variant="outline">
          <Link href="/admin/patients">Back to Patients</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center gap-2 mb-4">
        <Button variant="ghost" size="icon" onClick={() => router.push("/admin/patients")}> <ArrowLeft className="h-5 w-5" /> </Button>
        <span className="text-xs text-muted-foreground">Patients</span>
        <span className="mx-2 text-xs text-muted-foreground">/</span>
        <span className="font-semibold text-xs">{patient.name}</span>
      </div>
      <Card className="mb-6">
        <CardContent className="flex flex-col md:flex-row md:items-center gap-4 p-6">
          <div className="flex-1">
            <h1 className="text-2xl font-bold mb-1">{patient.name}</h1>
            <div className="text-sm text-muted-foreground mb-2">DOB: {patient.dob} | Email: {patient.email} | Phone: {patient.phone}</div>
            <div className="text-xs text-muted-foreground">Status: <span className="font-semibold">{patient.status}</span> | Last Visit: {patient.lastVisit}</div>
          </div>
          <Button asChild variant="outline" size="sm">
            <Link href="/admin/patients">Change Patient</Link>
          </Button>
        </CardContent>
      </Card>
      <Tabs defaultValue={tab} className="w-full">
        <TabsList className="mb-6 flex flex-wrap gap-2">
          {TABS.map(({ value, label, icon: Icon }) => (
            <TabsTrigger key={value} value={value} className="flex items-center gap-2">
              <Icon className="h-4 w-4" /> {label}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="overview">
          <div className="p-4">Patient overview and summary info here.</div>
        </TabsContent>
        <TabsContent value="appointments">
          <div className="p-4">Appointments management for this patient.</div>
        </TabsContent>
        <TabsContent value="prescriptions">
          <div className="p-4">Prescriptions management for this patient.</div>
        </TabsContent>
        <TabsContent value="messages">
          <div className="p-4">Messages with this patient.</div>
        </TabsContent>
        <TabsContent value="documents">
          <div className="p-4">Documents and results for this patient.</div>
        </TabsContent>
        <TabsContent value="billing">
          <div className="p-4">Billing & insurance info for this patient.</div>
        </TabsContent>
        <TabsContent value="care-plan">
          <div className="p-4">Care plan for this patient.</div>
        </TabsContent>
      </Tabs>
    </div>
  )
} 