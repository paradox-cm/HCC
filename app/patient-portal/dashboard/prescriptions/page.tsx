"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { SectionWrapper } from "@/components/section-wrapper"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Pill, ArrowLeft } from "lucide-react"

const MOCK_PRESCRIPTIONS = [
  {
    id: 1,
    name: "Metoprolol",
    dosage: "50mg",
    instructions: "Take 1 tablet daily",
    status: "Active",
    canRefill: true,
  },
  {
    id: 2,
    name: "Atorvastatin",
    dosage: "20mg",
    instructions: "Take 1 tablet daily",
    status: "Ongoing",
    canRefill: false,
  },
  {
    id: 3,
    name: "Lisinopril",
    dosage: "10mg",
    instructions: "Take 1 tablet daily",
    status: "Active",
    canRefill: true,
  },
]

type Prescription = typeof MOCK_PRESCRIPTIONS[number]

const MOCK_PHARMACY = {
  name: "CVS Pharmacy",
  address: "123 Main St, Houston, TX 77001",
  phone: "(555) 987-6543",
}

export default function DashboardPrescriptions() {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>(MOCK_PRESCRIPTIONS)
  const [refillId, setRefillId] = useState<number | null>(null)
  const [refillNotes, setRefillNotes] = useState("")
  const [refillStatus, setRefillStatus] = useState<{ [id: number]: boolean }>({})
  const [showNew, setShowNew] = useState(false)
  const [newRx, setNewRx] = useState({ name: "", dosage: "", notes: "" })
  const router = useRouter()

  function handleRefillRequest(id: number) {
    setRefillStatus(status => ({ ...status, [id]: true }))
    setRefillId(null)
    setRefillNotes("")
  }

  function handleNewRx(e: React.FormEvent) {
    e.preventDefault()
    setPrescriptions(prev => [
      {
        id: prev.length + 1,
        name: newRx.name,
        dosage: newRx.dosage,
        instructions: newRx.notes || "",
        status: "Requested",
        canRefill: false,
      },
      ...prev,
    ])
    setShowNew(false)
    setNewRx({ name: "", dosage: "", notes: "" })
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
        <Card className="max-w-2xl mx-auto">
          <CardHeader className="flex items-center gap-2 pb-2">
            <Pill className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Prescriptions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <span className="font-semibold text-base">Your Current Prescriptions</span>
              <Button size="sm" variant="default" className="bg-red-600 hover:bg-red-700 text-white" onClick={() => setShowNew(v => !v)}>
                Request New Prescription
              </Button>
            </div>
            {showNew && (
              <form className="mb-6 p-3 border rounded-lg bg-muted/40 space-y-2" onSubmit={handleNewRx}>
                <Input
                  placeholder="Medication Name"
                  value={newRx.name}
                  onChange={e => setNewRx(rx => ({ ...rx, name: e.target.value }))}
                  required
                />
                <Input
                  placeholder="Dosage (optional)"
                  value={newRx.dosage}
                  onChange={e => setNewRx(rx => ({ ...rx, dosage: e.target.value }))}
                />
                <Textarea
                  placeholder="Notes for your provider (optional)"
                  value={newRx.notes}
                  onChange={e => setNewRx(rx => ({ ...rx, notes: e.target.value }))}
                  rows={2}
                  className="text-xs"
                />
                <div className="flex gap-2">
                  <Button type="submit" size="sm" className="w-full">Submit</Button>
                  <Button type="button" size="sm" variant="ghost" onClick={() => setShowNew(false)}>Cancel</Button>
                </div>
              </form>
            )}
            <div className="space-y-4">
              {prescriptions.length === 0 && (
                <div className="py-8 text-center text-muted-foreground">
                  <div className="mb-4">No prescriptions found.</div>
                  <Button size="sm" variant="default" className="bg-red-600 hover:bg-red-700 text-white" onClick={() => setShowNew(true)}>
                    Request New Prescription
                  </Button>
                </div>
              )}
              {prescriptions.map(rx => (
                <div key={rx.id} className="border rounded-lg p-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 bg-muted/40">
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-base truncate">{rx.name} <span className="text-xs font-normal text-muted-foreground">{rx.dosage}</span></div>
                    <div className="text-xs text-muted-foreground truncate">{rx.instructions}</div>
                    <div className="text-xs text-muted-foreground mt-1">Status: <span className="font-medium text-primary">{rx.status}</span></div>
                  </div>
                  <div className="flex flex-col gap-2 min-w-[160px]">
                    {refillStatus[rx.id] ? (
                      <span className="inline-block bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full text-center">Refill Requested</span>
                    ) : refillId === rx.id ? (
                      <form className="flex flex-col gap-2" onSubmit={e => { e.preventDefault(); handleRefillRequest(rx.id) }}>
                        <Textarea
                          value={refillNotes}
                          onChange={e => setRefillNotes(e.target.value)}
                          placeholder="Notes for your provider (optional)"
                          rows={2}
                          className="text-xs"
                        />
                        <div className="flex gap-2">
                          <Button type="submit" size="sm" className="w-full">Submit</Button>
                          <Button type="button" size="sm" variant="ghost" onClick={() => setRefillId(null)}>Cancel</Button>
                        </div>
                      </form>
                    ) : rx.canRefill ? (
                      <Button size="sm" variant="outline" className="border-red-600 text-red-600" onClick={() => setRefillId(rx.id)}>
                        Request Refill
                      </Button>
                    ) : (
                      <span className="inline-block bg-gray-100 text-gray-500 text-xs px-3 py-1 rounded-full text-center">Not Eligible</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
            {/* Pharmacy Info Card */}
            <div className="mt-8 border rounded-lg p-4 bg-muted/30 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <div className="font-semibold text-base mb-1">Preferred Pharmacy</div>
                <div className="text-sm text-muted-foreground">{MOCK_PHARMACY.name}</div>
                <div className="text-xs text-muted-foreground">{MOCK_PHARMACY.address}</div>
                <div className="text-xs text-muted-foreground">{MOCK_PHARMACY.phone}</div>
              </div>
              <Button size="sm" variant="outline" className="mt-2 sm:mt-0">Update</Button>
            </div>
          </CardContent>
        </Card>
      </SectionWrapper>
    </>
  )
} 