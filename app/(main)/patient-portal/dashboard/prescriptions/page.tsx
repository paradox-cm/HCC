import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Prescriptions | Patient Portal | Houston Cardiology Consultants",
  description: "View, request refills, and manage your prescriptions securely in the Houston Cardiology Consultants Patient Portal.",
}

"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSearchParams, useRouter as useNextRouter } from "next/navigation"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog"
import { SectionWrapper } from "@/components/section-wrapper"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import CapsuleFillIcon from 'remixicon-react/CapsuleFillIcon';
import ArrowLeftFillIcon from 'remixicon-react/ArrowLeftFillIcon';
import React, { Suspense } from "react"

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

function PrescriptionsContent() {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>(MOCK_PRESCRIPTIONS)
  const [refillId, setRefillId] = useState<number | null>(null)
  const [refillNotes, setRefillNotes] = useState("")
  const [refillStatus, setRefillStatus] = useState<{ [id: number]: boolean }>({})
  const [showNew, setShowNew] = useState(false)
  const [newModalOpen, setNewModalOpen] = useState(false)
  const [newModalSuccess, setNewModalSuccess] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [modalSuccess, setModalSuccess] = useState(false)
  const [newRx, setNewRx] = useState({ name: "", dosage: "", notes: "" })
  const router = useRouter()
  const nextRouter = useNextRouter()
  const searchParams = useSearchParams()
  const refillParam = searchParams?.get("refill")
  const modalRx = prescriptions.find(rx => String(rx.id) === refillParam)

  // Open modal if ?refill=ID is present
  React.useEffect(() => {
    if (modalRx) {
      setModalOpen(true)
      setRefillNotes("")
      setModalSuccess(false)
    } else {
      setModalOpen(false)
    }
  }, [refillParam, modalRx])

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
    setNewModalSuccess(true)
    setTimeout(() => {
      setNewModalOpen(false)
      setNewModalSuccess(false)
      setNewRx({ name: "", dosage: "", notes: "" })
    }, 1200)
  }

  function handleModalRefill(e: React.FormEvent) {
    e.preventDefault()
    if (!modalRx) return
    setRefillStatus(status => ({ ...status, [modalRx.id]: true }))
    setModalSuccess(true)
    setTimeout(() => {
      setModalOpen(false)
      setModalSuccess(false)
      setRefillNotes("")
      // Remove ?refill param from URL
      const params = new URLSearchParams(Array.from(searchParams?.entries() || []))
      params.delete("refill")
      nextRouter.replace(`/patient-portal/dashboard/prescriptions${params.size ? "?" + params.toString() : ""}`)
    }, 1200)
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
        <Card className="max-w-2xl mx-auto">
          <CardHeader className="flex items-center gap-2 pb-2">
            <CapsuleFillIcon className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Prescriptions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <span className="font-semibold text-base">Your Current Prescriptions</span>
              <Button size="sm" variant="default" className="bg-red-600 hover:bg-red-700 text-white" onClick={() => setNewModalOpen(true)}>
                Request New Prescription
              </Button>
            </div>
            <Dialog open={newModalOpen} onOpenChange={setNewModalOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Request New Prescription</DialogTitle>
                  <DialogDescription>Fill out the form below to request a new prescription.</DialogDescription>
                </DialogHeader>
                {newModalSuccess ? (
                  <div className="text-green-700 text-center py-8">Prescription request submitted!</div>
                ) : (
                  <form className="space-y-4" onSubmit={handleNewRx}>
                    <div>
                      <label className="block text-xs font-medium mb-1">Medication Name</label>
                      <Input
                        placeholder="Medication Name"
                        value={newRx.name}
                        onChange={e => setNewRx(rx => ({ ...rx, name: e.target.value }))}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1">Dosage (optional)</label>
                      <Input
                        placeholder="Dosage (optional)"
                        value={newRx.dosage}
                        onChange={e => setNewRx(rx => ({ ...rx, dosage: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1">Notes for your provider (optional)</label>
                      <Textarea
                        placeholder="Notes for your provider (optional)"
                        value={newRx.notes}
                        onChange={e => setNewRx(rx => ({ ...rx, notes: e.target.value }))}
                        rows={2}
                        className="text-xs"
                      />
                    </div>
                    <DialogFooter>
                      <Button type="submit" size="sm" className="w-full">Submit</Button>
                      <Button type="button" size="sm" variant="ghost" className="w-full" onClick={() => setNewModalOpen(false)}>Cancel</Button>
                    </DialogFooter>
                  </form>
                )}
              </DialogContent>
            </Dialog>
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
                    ) : rx.canRefill ? (
                      <Button size="sm" variant="outline" className="border-red-600 text-red-600" onClick={() => {
                        const params = new URLSearchParams(Array.from(searchParams?.entries() || []))
                        params.set("refill", String(rx.id))
                        nextRouter.replace(`/patient-portal/dashboard/prescriptions?${params.toString()}`)
                      }}>
                        Request Refill
                      </Button>
                    ) : (
                      <span className="inline-block bg-gray-100 text-gray-500 text-xs px-3 py-1 rounded-full text-center dark:bg-[hsl(0,0%,20%)] dark:text-[hsl(0,0%,60%)]">Not Eligible</span>
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
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Request Refill</DialogTitle>
            <DialogDescription>
              {modalRx ? (
                <>
                  Request a refill for <b>{modalRx.name}</b> ({modalRx.dosage})
                </>
              ) : null}
            </DialogDescription>
          </DialogHeader>
          {modalSuccess ? (
            <div className="text-green-700 text-center py-8">Refill request submitted!</div>
          ) : modalRx ? (
            <form className="space-y-4" onSubmit={handleModalRefill}>
              <div>
                <label className="block text-xs font-medium mb-1">Notes for your provider (optional)</label>
                <div className="mb-2" />
                <Textarea
                  value={refillNotes}
                  onChange={e => setRefillNotes(e.target.value)}
                  rows={2}
                  className="text-xs"
                />
              </div>
              <DialogFooter>
                <Button type="submit" className="w-full">Submit Refill Request</Button>
                <Button type="button" variant="ghost" className="w-full" onClick={() => {
                  setModalOpen(false)
                  // Remove ?refill param from URL
                  const params = new URLSearchParams(Array.from(searchParams?.entries() || []))
                  params.delete("refill")
                  nextRouter.replace(`/patient-portal/dashboard/prescriptions${params.size ? "?" + params.toString() : ""}`)
                }}>Cancel</Button>
              </DialogFooter>
            </form>
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  )
}

export default function DashboardPrescriptions() {
  return (
    <Suspense>
      <PrescriptionsContent />
    </Suspense>
  )
} 