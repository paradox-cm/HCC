"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import Link from "next/link"
import { Trash2, Edit, ArrowRight } from "lucide-react"
import GroupFillIcon from 'remixicon-react/GroupFillIcon'
import AddCircleFillIcon from 'remixicon-react/AddCircleFillIcon'

const MOCK_PATIENTS = [
  { id: 1, name: "Jane Doe", dob: "1985-04-12", email: "jane@email.com", phone: "555-123-4567", lastVisit: "2024-06-01", status: "Active" },
  { id: 2, name: "John Smith", dob: "1978-09-23", email: "john@email.com", phone: "555-987-6543", lastVisit: "2024-05-20", status: "Active" },
  { id: 3, name: "Maria Garcia", dob: "1990-02-15", email: "maria@email.com", phone: "555-555-5555", lastVisit: "2024-04-10", status: "Inactive" },
]

export default function AdminPatientsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [patients, setPatients] = useState(MOCK_PATIENTS)
  const [search, setSearch] = useState("")
  const [addOpen, setAddOpen] = useState(false)
  const [removePatient, setRemovePatient] = useState<any>(null)
  const [newPatient, setNewPatient] = useState({ name: "", dob: "", email: "", phone: "" })
  const [addError, setAddError] = useState("")

  // Open modal if ?add=1 is present
  useEffect(() => {
    if (searchParams?.get("add") === "1") {
      setAddOpen(true);
    }
  }, [searchParams]);

  // When modal closes, remove ?add=1 from URL
  function handleAddOpenChange(open: boolean) {
    setAddOpen(open);
    if (!open && searchParams?.get("add") === "1") {
      const params = new URLSearchParams(Array.from(searchParams.entries()));
      params.delete("add");
      router.replace(`/admin/patients${params.size ? "?" + params.toString() : ""}`);
    }
  }

  const filtered = patients.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.email.toLowerCase().includes(search.toLowerCase()) ||
    p.phone.includes(search) ||
    p.dob.includes(search)
  )

  function handleAdd(e: React.FormEvent) {
    e.preventDefault()
    if (!newPatient.name || !newPatient.dob || !newPatient.email || !newPatient.phone) {
      setAddError("All fields are required.")
      return
    }
    setPatients(p => [
      { id: Date.now(), ...newPatient, lastVisit: "-", status: "Active" },
      ...p,
    ])
    setAddOpen(false)
    setNewPatient({ name: "", dob: "", email: "", phone: "" })
    setAddError("")
  }

  function handleRemove(id: number) {
    setPatients(p => p.filter(pt => pt.id !== id))
    setRemovePatient(null)
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2"><GroupFillIcon className="h-6 w-6" /> Patients</h1>
        <Button variant="default" onClick={() => router.push("/admin/patients?add=1") } className="w-full sm:w-auto">
          <AddCircleFillIcon className="h-4 w-4 mr-2" /> Add Patient
        </Button>
      </div>
      <div className="mb-4 flex gap-2">
        <Input
          placeholder="Search by name, email, phone, or DOB"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full md:max-w-xs"
        />
      </div>
      
      {/* Mobile: Card Layout */}
      <div className="md:hidden space-y-3">
        {filtered.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">No patients found.</div>
        )}
        {filtered.map(pt => (
          <Card key={pt.id} className="p-4">
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-base">{pt.name}</h3>
                  <p className="text-sm text-muted-foreground">{pt.email}</p>
                </div>
                <div className="text-right">
                  <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                    pt.status === 'Active' 
                      ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400' 
                      : 'bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400'
                  }`}>
                    {pt.status}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-muted-foreground">DOB:</span>
                  <span className="ml-1">{pt.dob}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Phone:</span>
                  <span className="ml-1">{pt.phone}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-muted-foreground">Last Visit:</span>
                  <span className="ml-1">{pt.lastVisit}</span>
                </div>
              </div>
              <div className="flex gap-2 pt-2">
                <Button asChild size="sm" variant="outline" className="flex-1">
                  <Link href={`/admin/patients/${pt.id}`}>
                    <ArrowRight className="h-4 w-4 mr-1" /> Manage
                  </Link>
                </Button>
                <Button size="sm" variant="outline" onClick={() => {}} disabled className="flex-1">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="destructive" onClick={() => setRemovePatient(pt)} className="flex-1">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Desktop: Table Layout */}
      <Card className="hidden md:block">
        <CardContent className="p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b bg-muted text-muted-foreground">
                  <th className="py-2 px-3 text-left font-semibold rounded-tl-lg">Name</th>
                  <th className="py-2 px-3 text-left font-semibold">DOB</th>
                  <th className="py-2 px-3 text-left font-semibold">Email</th>
                  <th className="py-2 px-3 text-left font-semibold">Phone</th>
                  <th className="py-2 px-3 text-left font-semibold">Last Visit</th>
                  <th className="py-2 px-3 text-left font-semibold">Status</th>
                  <th className="py-2 px-3 text-left font-semibold rounded-tr-lg">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 && (
                  <tr><td colSpan={7} className="text-center py-8 text-muted-foreground">No patients found.</td></tr>
                )}
                {filtered.map(pt => (
                  <tr key={pt.id} className="border-b hover:bg-accent/50 transition-colors">
                    <td className="py-2 px-3 font-medium">{pt.name}</td>
                    <td className="py-2 px-3">{pt.dob}</td>
                    <td className="py-2 px-3">{pt.email}</td>
                    <td className="py-2 px-3">{pt.phone}</td>
                    <td className="py-2 px-3">{pt.lastVisit}</td>
                    <td className="py-2 px-3">{pt.status}</td>
                    <td className="py-2 px-3 flex gap-2">
                      <Button asChild size="sm" variant="outline">
                        <Link href={`/admin/patients/${pt.id}`}><ArrowRight className="h-4 w-4 mr-1" /> Manage</Link>
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => {}} disabled><Edit className="h-4 w-4" /></Button>
                      <Button size="sm" variant="destructive" onClick={() => setRemovePatient(pt)}><Trash2 className="h-4 w-4" /></Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      {/* Add Patient Modal */}
      <Dialog open={addOpen} onOpenChange={handleAddOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Patient</DialogTitle>
          </DialogHeader>
          <form className="space-y-4" onSubmit={handleAdd}>
            <div>
              <label className="block text-xs font-medium mb-1">Name</label>
              <Input value={newPatient.name} onChange={e => setNewPatient(p => ({ ...p, name: e.target.value }))} required />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Date of Birth</label>
              <Input type="date" value={newPatient.dob} onChange={e => setNewPatient(p => ({ ...p, dob: e.target.value }))} required />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Email</label>
              <Input type="email" value={newPatient.email} onChange={e => setNewPatient(p => ({ ...p, email: e.target.value }))} required />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Phone</label>
              <Input value={newPatient.phone} onChange={e => setNewPatient(p => ({ ...p, phone: e.target.value }))} required />
            </div>
            {addError && <div className="text-xs text-red-600">{addError}</div>}
            <DialogFooter>
              <Button type="submit" className="w-full">Add Patient</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      {/* Remove Patient Confirmation */}
      <Dialog open={!!removePatient} onOpenChange={v => { if (!v) setRemovePatient(null) }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Remove Patient</DialogTitle>
          </DialogHeader>
          {removePatient && (
            <div className="space-y-4">
              <div>Are you sure you want to remove <b>{removePatient.name}</b>?</div>
              <DialogFooter>
                <Button type="button" variant="destructive" className="w-full" onClick={() => handleRemove(removePatient.id)}>Remove</Button>
                <Button type="button" variant="ghost" className="w-full" onClick={() => setRemovePatient(null)}>Cancel</Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
} 