"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Pill, Eye, Edit, Trash2, Plus, CheckCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

const MOCK_PRESCRIPTIONS = [
  {
    id: 1,
    patientName: "Jane Doe",
    medication: "Metoprolol",
    dosage: "50mg",
    instructions: "Take 1 tablet daily",
    status: "Active",
    lastUpdated: "2024-06-01",
  },
  {
    id: 2,
    patientName: "John Smith",
    medication: "Atorvastatin",
    dosage: "20mg",
    instructions: "Take 1 tablet daily",
    status: "Filled",
    lastUpdated: "2024-05-28",
  },
  {
    id: 3,
    patientName: "Maria Garcia",
    medication: "Lisinopril",
    dosage: "10mg",
    instructions: "Take 1 tablet daily",
    status: "Active",
    lastUpdated: "2024-06-02",
  },
]

const statusOptions = [
  { value: "Active", label: "Active" },
  { value: "Filled", label: "Filled" },
  { value: "Cancelled", label: "Cancelled" },
]

export default function AdminPrescriptionsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [prescriptions, setPrescriptions] = useState(MOCK_PRESCRIPTIONS)
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [showModal, setShowModal] = useState(false)
  const [editRx, setEditRx] = useState<any>(null)
  type RxForm = {
    id?: number;
    patientName: string;
    medication: string;
    dosage: string;
    instructions: string;
    status: string;
  };
  const [form, setForm] = useState<RxForm>({
    patientName: "",
    medication: "",
    dosage: "",
    instructions: "",
    status: "Active",
  });

  const filtered = prescriptions.filter(rx => {
    const matchesSearch =
      rx.patientName.toLowerCase().includes(search.toLowerCase()) ||
      rx.medication.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === "all" || rx.status === statusFilter
    return matchesSearch && matchesStatus
  })

  function handleOpenModal(rx: any = null) {
    if (rx) {
      setForm({ ...rx })
      setEditRx(rx)
    } else {
      setForm({ patientName: "", medication: "", dosage: "", instructions: "", status: "Active" })
      setEditRx(null)
    }
    setShowModal(true)
  }

  function handleSave(e: React.FormEvent) {
    e.preventDefault()
    if (typeof form.id === 'number') {
      setPrescriptions(prev => prev.map(rx => rx.id === form.id ? { ...form, lastUpdated: new Date().toISOString().slice(0, 10) } : rx))
    } else {
      const newPrescription = {
        id: Date.now(),
        patientName: form.patientName,
        medication: form.medication,
        dosage: form.dosage,
        instructions: form.instructions,
        status: form.status,
        lastUpdated: new Date().toISOString().slice(0, 10)
      };
      setPrescriptions(prev => [
        newPrescription,
        ...prev,
      ])
    }
    setShowModal(false)
  }

  function handleDelete(id: number) {
    setPrescriptions(prev => prev.filter(rx => rx.id !== id))
  }

  function handleMarkFilled(id: number, unmark: boolean) {
    setPrescriptions(prev => prev.map(rx =>
      rx.id === id
        ? {
            ...rx,
            status: unmark ? "Active" : "Filled",
            lastUpdated: new Date().toISOString().slice(0, 10),
          }
        : rx
    ))
  }

  // Open modal if ?add=1 is present
  useEffect(() => {
    if (searchParams?.get("add") === "1") {
      setShowModal(true);
    }
  }, [searchParams]);

  // When modal closes, remove ?add=1 from URL
  function handleShowModalChange(open: boolean) {
    setShowModal(open);
    if (!open && searchParams?.get("add") === "1") {
      const params = new URLSearchParams(Array.from(searchParams.entries()));
      params.delete("add");
      router.replace(`/admin/prescriptions${params.size ? "?" + params.toString() : ""}`);
    }
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6">
        <div className="flex items-center gap-2">
          <Pill className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold">Prescriptions</h1>
        </div>
        <Button variant="default" onClick={() => handleOpenModal()} className="w-full sm:w-auto"><Plus className="h-4 w-4 mr-2" /> Add Prescription</Button>
      </div>
      <div className="mb-4 flex flex-col sm:flex-row gap-2 w-full">
        <Input
          placeholder="Search by patient or medication"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full sm:max-w-xs"
        />
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-36"><SelectValue placeholder="Status" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            {statusOptions.map(opt => (
              <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {/* Table for desktop/tablet */}
      <Card className="hidden sm:block">
        <CardContent className="p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b bg-muted text-muted-foreground">
                  <th className="py-2 px-3 text-left font-semibold rounded-tl-lg">Patient</th>
                  <th className="py-2 px-3 text-left font-semibold">Medication</th>
                  <th className="py-2 px-3 text-left font-semibold">Dosage</th>
                  <th className="py-2 px-3 text-left font-semibold">Instructions</th>
                  <th className="py-2 px-3 text-left font-semibold">Status</th>
                  <th className="py-2 px-3 text-left font-semibold">Last Updated</th>
                  <th className="py-2 px-3 text-left font-semibold rounded-tr-lg">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 && (
                  <tr><td colSpan={7} className="text-center py-8 text-muted-foreground">No prescriptions found.</td></tr>
                )}
                {filtered.map(rx => (
                  <tr key={rx.id} className="border-b hover:bg-accent/50 transition-colors">
                    <td className="py-2 px-3 font-medium">{rx.patientName}</td>
                    <td className="py-2 px-3">{rx.medication}</td>
                    <td className="py-2 px-3">{rx.dosage}</td>
                    <td className="py-2 px-3">{rx.instructions}</td>
                    <td className="py-2 px-3">
                      <span className={
                        rx.status === "Active" ? "text-blue-600 font-semibold" :
                        rx.status === "Filled" ? "text-green-600 font-semibold" :
                        "text-muted-foreground font-semibold"
                      }>{rx.status}</span>
                    </td>
                    <td className="py-2 px-3">{rx.lastUpdated}</td>
                    <td className="py-2 px-3 flex gap-2 flex-wrap">
                      <Button size="sm" variant="outline" onClick={() => handleOpenModal(rx)}><Eye className="h-4 w-4 mr-1" /> View</Button>
                      <Button size="sm" variant="outline" onClick={() => handleOpenModal(rx)}><Edit className="h-4 w-4" /></Button>
                      {rx.status === "Filled" ? (
                        <Button size="sm" variant="secondary" onClick={() => handleMarkFilled(rx.id, true)}><CheckCircle className="h-4 w-4 mr-1" /> Unmark as Filled</Button>
                      ) : (
                        <Button size="sm" variant="outline" onClick={() => handleMarkFilled(rx.id, false)}><CheckCircle className="h-4 w-4 mr-1" /> Mark as Filled</Button>
                      )}
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(rx.id)}><Trash2 className="h-4 w-4" /></Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      {/* Card list for mobile */}
      <div className="sm:hidden flex flex-col gap-4 p-2">
        {filtered.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">No prescriptions found.</div>
        )}
        {filtered.map(rx => (
          <Card key={rx.id} className="border bg-card p-4 shadow flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Pill className="h-5 w-5 text-primary" />
              <span className="font-semibold">{rx.medication}</span>
              <span className="text-xs text-muted-foreground">{rx.dosage}</span>
            </div>
            <div className="text-xs text-muted-foreground">Patient: {rx.patientName}</div>
            <div className="text-xs text-muted-foreground">{rx.instructions}</div>
            <div className="text-xs">Status: <span className={
              rx.status === "Active" ? "text-blue-600 font-semibold" :
              rx.status === "Filled" ? "text-green-600 font-semibold" :
              "text-muted-foreground font-semibold"
            }>{rx.status}</span></div>
            <div className="text-xs text-muted-foreground">Last Updated: {rx.lastUpdated}</div>
            <div className="flex gap-2 mt-2">
              <Button size="sm" variant="outline" onClick={() => handleOpenModal(rx)}><Eye className="h-4 w-4 mr-1" /> View</Button>
              <Button size="sm" variant="outline" onClick={() => handleOpenModal(rx)}><Edit className="h-4 w-4" /></Button>
              <Button size="sm" variant="outline" onClick={() => handleMarkFilled(rx.id, false)}><CheckCircle className="h-4 w-4 mr-1" /> Mark as Filled</Button>
              <Button size="sm" variant="destructive" onClick={() => handleDelete(rx.id)}><Trash2 className="h-4 w-4" /></Button>
            </div>
          </Card>
        ))}
      </div>
      {/* Add/Edit Modal */}
      <Dialog open={showModal} onOpenChange={handleShowModalChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{form.id ? "Edit Prescription" : "Add Prescription"}</DialogTitle>
          </DialogHeader>
          <form className="space-y-4" onSubmit={handleSave}>
            <div>
              <label className="block text-xs font-medium mb-1">Patient Name</label>
              <Input value={form.patientName} onChange={e => setForm(f => ({ ...f, patientName: e.target.value }))} required />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Medication</label>
              <Input value={form.medication} onChange={e => setForm(f => ({ ...f, medication: e.target.value }))} required />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Dosage</label>
              <Input value={form.dosage} onChange={e => setForm(f => ({ ...f, dosage: e.target.value }))} required />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Instructions</label>
              <Textarea value={form.instructions} onChange={e => setForm(f => ({ ...f, instructions: e.target.value }))} rows={2} required />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Status</label>
              <Select value={form.status} onValueChange={v => setForm(f => ({ ...f, status: v }))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {statusOptions.map(opt => (
                    <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <DialogFooter>
              <Button type="submit" className="w-full">{form.id ? "Save Changes" : "Add Prescription"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
} 