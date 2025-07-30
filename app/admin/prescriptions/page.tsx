"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Edit, Trash2, Plus, CheckCircle, ChevronDown, Search } from "lucide-react"
import CapsuleFillIcon from 'remixicon-react/CapsuleFillIcon'
import EyeFillIcon from 'remixicon-react/EyeFillIcon'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { User } from "lucide-react"

const MOCK_PRESCRIPTIONS = [
  {
    id: 1,
    patientId: "P001",
    patientName: "Jane Doe",
    patientEmail: "jane.doe@email.com",
    prescriptions: [
      {
        id: 1,
        medication: "Metoprolol",
        dosage: "50mg",
        instructions: "Take 1 tablet daily",
        status: "Active",
        lastUpdated: "2024-06-01",
        prescribedBy: "Dr. Asif Ali",
        refills: 3,
        canRefill: true,
        pharmacy: "CVS Pharmacy"
      },
      {
        id: 2,
        medication: "Lisinopril",
        dosage: "10mg",
        instructions: "Take 1 tablet daily",
        status: "Active",
        lastUpdated: "2024-05-28",
        prescribedBy: "Dr. Asif Ali",
        refills: 2,
        canRefill: true,
        pharmacy: "CVS Pharmacy"
      },
      {
        id: 3,
        medication: "Atorvastatin",
        dosage: "20mg",
        instructions: "Take 1 tablet daily",
        status: "Filled",
        lastUpdated: "2024-05-15",
        prescribedBy: "Dr. Asif Ali",
        refills: 0,
        canRefill: false,
        pharmacy: "Walgreens"
      }
    ]
  },
  {
    id: 2,
    patientId: "P002",
    patientName: "John Smith",
    patientEmail: "john.smith@email.com",
    prescriptions: [
      {
        id: 4,
        medication: "Amlodipine",
        dosage: "5mg",
        instructions: "Take 1 tablet daily",
        status: "Active",
        lastUpdated: "2024-06-02",
        prescribedBy: "Dr. Sajid Ali",
        refills: 1,
        canRefill: true,
        pharmacy: "Walgreens"
      },
      {
        id: 5,
        medication: "Metformin",
        dosage: "500mg",
        instructions: "Take 1 tablet twice daily",
        status: "Active",
        lastUpdated: "2024-05-20",
        prescribedBy: "Dr. Sajid Ali",
        refills: 2,
        canRefill: true,
        pharmacy: "CVS Pharmacy"
      }
    ]
  },
  {
    id: 3,
    patientId: "P003",
    patientName: "Maria Garcia",
    patientEmail: "maria.garcia@email.com",
    prescriptions: [
      {
        id: 6,
        medication: "Losartan",
        dosage: "50mg",
        instructions: "Take 1 tablet daily",
        status: "Active",
        lastUpdated: "2024-06-01",
        prescribedBy: "Dr. Abdul Ali",
        refills: 3,
        canRefill: true,
        pharmacy: "Walgreens"
      },
      {
        id: 7,
        medication: "Simvastatin",
        dosage: "40mg",
        instructions: "Take 1 tablet daily",
        status: "Cancelled",
        lastUpdated: "2024-04-15",
        prescribedBy: "Dr. Abdul Ali",
        refills: 0,
        canRefill: false,
        pharmacy: "CVS Pharmacy"
      },
      {
        id: 8,
        medication: "Aspirin",
        dosage: "81mg",
        instructions: "Take 1 tablet daily",
        status: "Active",
        lastUpdated: "2024-05-10",
        prescribedBy: "Dr. Abdul Ali",
        refills: 5,
        canRefill: true,
        pharmacy: "Walgreens"
      }
    ]
  },
  {
    id: 4,
    patientId: "P004",
    patientName: "Robert Wilson",
    patientEmail: "robert.wilson@email.com",
    prescriptions: [
      {
        id: 9,
        medication: "Carvedilol",
        dosage: "25mg",
        instructions: "Take 1 tablet twice daily",
        status: "Active",
        lastUpdated: "2024-06-03",
        prescribedBy: "Dr. Asif Ali",
        refills: 2,
        canRefill: true,
        pharmacy: "CVS Pharmacy"
      }
    ]
  }
]

const statusOptions = [
  { value: "Active", label: "Active" },
  { value: "Ongoing", label: "Ongoing" },
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
  const [showViewModal, setShowViewModal] = useState(false)
  const [editRx, setEditRx] = useState<any>(null)
  const [viewRx, setViewRx] = useState<any>(null)
  type PrescriptionForm = {
    id?: number;
    patientId: string;
    patientName: string;
    medication: string;
    dosage: string;
    instructions: string;
    status: string;
    prescribedBy: string;
    refills: number;
    canRefill: boolean;
    pharmacy: string;
  };
  
  const [form, setForm] = useState<PrescriptionForm>({
    patientId: "",
    patientName: "",
    medication: "",
    dosage: "",
    instructions: "",
    status: "Active",
    prescribedBy: "Dr. Asif Ali",
    refills: 3,
    canRefill: true,
    pharmacy: "CVS Pharmacy"
  });

  const [expandedPatients, setExpandedPatients] = useState<Set<string>>(new Set())

  const filtered = prescriptions.filter(patient => {
    const matchesSearch = patient.patientName.toLowerCase().includes(search.toLowerCase()) ||
                         patient.prescriptions.some(rx => rx.medication.toLowerCase().includes(search.toLowerCase()))
    const matchesStatus = statusFilter === "all" || patient.prescriptions.some(rx => rx.status === statusFilter)
    return matchesSearch && matchesStatus
  })

  const togglePatientExpansion = (patientId: string) => {
    setExpandedPatients(prev => {
      const newSet = new Set(prev)
      if (newSet.has(patientId)) {
        newSet.delete(patientId)
      } else {
        newSet.add(patientId)
      }
      return newSet
    })
  }

  function handleOpenModal(rx: any = null) {
    if (rx) {
      setForm({ 
        id: rx.id,
        patientId: rx.patientId,
        patientName: rx.patientName,
        medication: rx.medication,
        dosage: rx.dosage,
        instructions: rx.instructions,
        status: rx.status,
        prescribedBy: rx.prescribedBy,
        refills: rx.refills,
        canRefill: rx.canRefill,
        pharmacy: rx.pharmacy
      })
      setEditRx(rx)
    } else {
      setForm({
        patientId: "",
        patientName: "",
        medication: "",
        dosage: "",
        instructions: "",
        status: "Active",
        prescribedBy: "Dr. Asif Ali",
        refills: 3,
        pharmacy: "CVS Pharmacy"
      })
      setEditRx(null)
    }
    setShowModal(true)
  }

  function handleViewModal(rx: any) {
    setViewRx(rx)
    setShowViewModal(true)
  }

  function handleSave(e: React.FormEvent) {
    e.preventDefault()
    
    // For now, we'll add to the first patient's prescriptions
    // In a real app, you'd have patient selection logic
    const newPrescription = {
      id: Date.now(),
      medication: form.medication,
      dosage: form.dosage,
      instructions: form.instructions,
      status: form.status,
      prescribedBy: form.prescribedBy,
      refills: form.refills,
      canRefill: form.canRefill,
      pharmacy: form.pharmacy,
      lastUpdated: new Date().toISOString().slice(0, 10)
    };

    if (typeof form.id === 'number') {
      // Edit existing prescription
      setPrescriptions(prev => prev.map(patient => ({
        ...patient,
        prescriptions: patient.prescriptions.map(rx => 
          rx.id === form.id ? { ...newPrescription, id: form.id } : rx
        )
      })))
    } else {
      // Add new prescription to first patient (in real app, you'd select the patient)
      setPrescriptions(prev => prev.map((patient, index) => 
        index === 0 ? {
          ...patient,
          prescriptions: [newPrescription, ...patient.prescriptions]
        } : patient
      ))
    }
    
    setForm({
      patientId: "",
      patientName: "",
      medication: "",
      dosage: "",
      instructions: "",
      status: "Active",
      prescribedBy: "Dr. Asif Ali",
      refills: 3,
      canRefill: true,
      pharmacy: "CVS Pharmacy"
    })
    setShowModal(false)
  }

  function handleDelete(id: number) {
    setPrescriptions(prev => prev.map(patient => ({
      ...patient,
      prescriptions: patient.prescriptions.filter(rx => rx.id !== id)
    })))
  }

  function handleMarkFilled(id: number, unmark: boolean) {
    setPrescriptions(prev => prev.map(patient => ({
      ...patient,
      prescriptions: patient.prescriptions.map(rx =>
        rx.id === id
          ? {
              ...rx,
              status: unmark ? "Active" : "Filled",
              lastUpdated: new Date().toISOString().slice(0, 10),
            }
          : rx
      )
    })))
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
          <CapsuleFillIcon className="h-6 w-6 text-foreground" />
          <h1 className="text-2xl font-bold">Prescriptions</h1>
        </div>
        <Button variant="default" onClick={() => handleOpenModal()} className="w-full sm:w-auto"><Plus className="h-4 w-4 mr-2" /> Add Prescription</Button>
      </div>
      <div className="mb-4 flex flex-col sm:flex-row gap-2 w-full">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by patient or medication"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
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
            <table className="min-w-full text-sm" style={{ minWidth: '800px' }}>
              <thead>
                <tr className="border-b bg-muted text-muted-foreground">
                  <th className="py-2 px-3 text-left font-semibold rounded-tl-lg w-1/3">Patient/Medication</th>
                  <th className="py-2 px-3 text-left font-semibold w-1/6">Dosage</th>
                  <th className="py-2 px-3 text-left font-semibold w-1/6">Status</th>
                  <th className="py-2 px-3 text-left font-semibold w-1/6">Refills</th>
                  <th className="py-2 px-3 text-left font-semibold w-1/6">Last Updated</th>
                  <th className="py-2 px-3 text-left font-semibold rounded-tr-lg w-1/6">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 && (
                  <tr><td colSpan={6} className="text-center py-8 text-muted-foreground">No patients found.</td></tr>
                )}
                {filtered.map(patient => {
                  const activeCount = patient.prescriptions.filter(rx => rx.status === "Active").length
                  const lastUpdated = patient.prescriptions.reduce((latest, rx) => 
                    rx.lastUpdated > latest ? rx.lastUpdated : latest, patient.prescriptions[0]?.lastUpdated || ""
                  )
                  const isExpanded = expandedPatients.has(patient.patientId)
                  
                  return (
                    <>
                      <tr key={patient.patientId} className="border-b hover:bg-accent/50 transition-colors cursor-pointer" onClick={() => togglePatientExpansion(patient.patientId)}>
                        <td className="py-2 px-3 font-medium">
                          <div className="flex items-center gap-2">
                            <ChevronDown className={`h-4 w-4 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                            <div>
                              <div className="font-semibold">{patient.patientName}</div>
                              <div className="text-xs text-muted-foreground">ID: {patient.patientId}</div>
                              <div className="text-xs text-muted-foreground">{patient.prescriptions.length} prescriptions</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-2 px-3">
                          <span className="text-muted-foreground text-xs">—</span>
                        </td>
                        <td className="py-2 px-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            activeCount > 0 ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400" : "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
                          }`}>
                            {activeCount} active
                          </span>
                        </td>
                        <td className="py-2 px-3">
                          <span className="text-muted-foreground text-xs">—</span>
                        </td>
                        <td className="py-2 px-3">{lastUpdated}</td>
                        <td className="py-2 px-3">
                          <div className="flex justify-end">
                            <Button size="sm" variant="outline" onClick={(e) => { e.stopPropagation(); handleOpenModal(); }}>
                              <Plus className="h-4 w-4 mr-1" /> Add Rx
                            </Button>
                          </div>
                        </td>
                      </tr>
                      {isExpanded && patient.prescriptions.map(rx => (
                        <tr key={rx.id} className="border-b bg-muted/30">
                          <td className="py-2 px-3 pl-8">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-primary rounded-full"></div>
                              <div>
                                <div className="font-medium">{rx.medication}</div>
                                <div className="text-xs text-muted-foreground">Prescribed by {rx.prescribedBy}</div>
                                <div className="text-xs text-muted-foreground">{rx.pharmacy}</div>
                                <div className="text-xs text-muted-foreground">
                                  <span className={rx.canRefill ? "text-green-600" : "text-red-600"}>
                                    {rx.canRefill ? "✓ Can refill" : "✗ No refills"}
                                  </span>
                                </div>
                                <div className="text-xs text-muted-foreground mt-1" title={rx.instructions}>
                                  {rx.instructions.length > 50 ? `${rx.instructions.substring(0, 50)}...` : rx.instructions}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="py-2 px-3">
                            <span className="font-medium">{rx.dosage}</span>
                          </td>
                          <td className="py-2 px-3">
                            <span className={
                              rx.status === "Active" ? "text-blue-600 font-semibold" :
                              rx.status === "Filled" ? "text-green-600 font-semibold" :
                              "text-red-600 font-semibold"
                            }>{rx.status}</span>
                          </td>
                          <td className="py-2 px-3">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              rx.refills > 2 ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400" :
                              rx.refills > 0 ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400" :
                              "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
                            }`}>
                              {rx.refills} refills
                            </span>
                          </td>
                          <td className="py-2 px-3">{rx.lastUpdated}</td>
                          <td className="py-2 px-3">
                            <div className="flex gap-2 flex-nowrap overflow-x-auto">
                              <Button size="sm" variant="outline" onClick={(e) => { e.stopPropagation(); handleViewModal(rx); }} className="whitespace-nowrap">
                                <EyeFillIcon className="h-4 w-4 mr-1" /> View
                              </Button>
                              <Button size="sm" variant="outline" onClick={(e) => { e.stopPropagation(); handleOpenModal(rx); }} className="whitespace-nowrap">
                                <Edit className="h-4 w-4 mr-1" /> Edit
                              </Button>
                              {rx.status === "Filled" ? (
                                <Button size="sm" variant="secondary" onClick={(e) => { e.stopPropagation(); handleMarkFilled(rx.id, true); }} className="whitespace-nowrap">
                                  <CheckCircle className="h-4 w-4 mr-1" /> Unmark
                                </Button>
                              ) : (
                                <Button size="sm" variant="outline" onClick={(e) => { e.stopPropagation(); handleMarkFilled(rx.id, false); }} className="whitespace-nowrap">
                                  <CheckCircle className="h-4 w-4 mr-1" /> Mark Filled
                                </Button>
                              )}
                              <Button size="sm" variant="destructive" onClick={(e) => { e.stopPropagation(); handleDelete(rx.id); }} className="whitespace-nowrap">
                                <Trash2 className="h-4 w-4 mr-1" /> Delete
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </>
                  )
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Mobile: Card Layout */}
      <div className="sm:hidden space-y-3">
        {filtered.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">No patients found.</div>
        )}
        {filtered.map(patient => {
          const activeCount = patient.prescriptions.filter(rx => rx.status === "Active").length
          const isExpanded = expandedPatients.has(patient.patientId)
          
          return (
            <Card key={patient.patientId} className="p-4">
              <div className="space-y-3">
                <div 
                  className="flex items-start justify-between cursor-pointer"
                  onClick={() => togglePatientExpansion(patient.patientId)}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <ChevronDown className={`h-4 w-4 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                      <h3 className="font-semibold text-base">{patient.patientName}</h3>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">ID: {patient.patientId}</p>
                    <p className="text-sm text-muted-foreground mt-1">{patient.prescriptions.length} prescriptions</p>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      activeCount > 0 ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400" : "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
                    }`}>
                      {activeCount} active
                    </span>
                  </div>
                </div>
                
                {isExpanded && (
                  <div className="space-y-3 pt-3 border-t">
                    {patient.prescriptions.map(rx => (
                      <Card key={rx.id} className="p-3 bg-muted/30">
                        <div className="space-y-2">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-medium text-sm">{rx.medication}</h4>
                              <p className="text-xs text-muted-foreground">Prescribed by {rx.prescribedBy}</p>
                            </div>
                            <div className="text-right">
                              <span className={
                                rx.status === "Active" ? "text-blue-600 font-semibold" :
                                rx.status === "Filled" ? "text-green-600 font-semibold" :
                                "text-red-600 font-semibold"
                              }>{rx.status}</span>
                              <div className="mt-1">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  rx.refills > 2 ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400" :
                                  rx.refills > 0 ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400" :
                                  "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
                                }`}>
                                  {rx.refills} refills
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="space-y-1 text-xs">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Dosage:</span>
                              <span>{rx.dosage}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Pharmacy:</span>
                              <span>{rx.pharmacy}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Can Refill:</span>
                              <span className={rx.canRefill ? "text-green-600" : "text-red-600"}>{rx.canRefill ? "Yes" : "No"}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Instructions:</span>
                              <span className="text-right">{rx.instructions}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Last Updated:</span>
                              <span>{rx.lastUpdated}</span>
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap gap-2 pt-2">
                            <Button size="sm" variant="outline" onClick={() => handleViewModal(rx)} className="flex-1 min-w-[80px]">
                              <EyeFillIcon className="h-4 w-4 mr-1" /> View
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => handleOpenModal(rx)} className="flex-1 min-w-[80px]">
                              <Edit className="h-4 w-4 mr-1" /> Edit
                            </Button>
                            {rx.status === "Filled" ? (
                              <Button size="sm" variant="secondary" onClick={() => handleMarkFilled(rx.id, true)} className="flex-1 min-w-[80px]">
                                <CheckCircle className="h-4 w-4 mr-1" /> Unmark
                              </Button>
                            ) : (
                              <Button size="sm" variant="outline" onClick={() => handleMarkFilled(rx.id, false)} className="flex-1 min-w-[80px]">
                                <CheckCircle className="h-4 w-4 mr-1" /> Mark Filled
                              </Button>
                            )}
                            <Button size="sm" variant="destructive" onClick={() => handleDelete(rx.id)} className="flex-1 min-w-[80px]">
                              <Trash2 className="h-4 w-4 mr-1" /> Delete
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
                
                <div className="pt-2">
                  <Button size="sm" variant="outline" onClick={() => handleOpenModal()} className="w-full">
                    <Plus className="h-4 w-4 mr-1" /> Add Prescription
                  </Button>
                </div>
              </div>
            </Card>
          )
        })}
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
              <label className="block text-xs font-medium mb-1">Prescribed By</label>
              <Input value={form.prescribedBy} onChange={e => setForm(f => ({ ...f, prescribedBy: e.target.value }))} required />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Pharmacy</label>
              <Input value={form.pharmacy} onChange={e => setForm(f => ({ ...f, pharmacy: e.target.value }))} required />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Number of Refills</label>
              <Input 
                type="number" 
                value={form.refills} 
                onChange={e => setForm(f => ({ ...f, refills: parseInt(e.target.value) || 0 }))} 
                min="0"
                required 
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Can Refill</label>
              <Select value={form.canRefill ? "true" : "false"} onValueChange={v => setForm(f => ({ ...f, canRefill: v === "true" }))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">Yes</SelectItem>
                  <SelectItem value="false">No</SelectItem>
                </SelectContent>
              </Select>
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

      {/* View Modal */}
      <Dialog open={showViewModal} onOpenChange={setShowViewModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Prescription Details</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium mb-1 text-muted-foreground">Patient Name</label>
              <p className="text-sm font-medium">{viewRx?.patientName}</p>
              {viewRx?.patientEmail && (
                <p className="text-xs text-muted-foreground">{viewRx.patientEmail}</p>
              )}
            </div>
            <div>
              <label className="block text-xs font-medium mb-1 text-muted-foreground">Medication</label>
              <p className="text-sm font-medium">{viewRx?.medication}</p>
            </div>
            <div>
              <label className="block text-xs font-medium mb-1 text-muted-foreground">Dosage</label>
              <p className="text-sm font-medium">{viewRx?.dosage}</p>
            </div>
            <div>
              <label className="block text-xs font-medium mb-1 text-muted-foreground">Prescribed By</label>
              <p className="text-sm font-medium">{viewRx?.prescribedBy}</p>
            </div>
            <div>
              <label className="block text-xs font-medium mb-1 text-muted-foreground">Pharmacy</label>
              <p className="text-sm font-medium">{viewRx?.pharmacy}</p>
            </div>
            <div>
              <label className="block text-xs font-medium mb-1 text-muted-foreground">Refills</label>
              <p className="text-sm font-medium">{viewRx?.refills} refills remaining</p>
            </div>
            <div>
              <label className="block text-xs font-medium mb-1 text-muted-foreground">Can Refill</label>
              <p className="text-sm font-medium">{viewRx?.canRefill ? "Yes" : "No"}</p>
            </div>
            <div>
              <label className="block text-xs font-medium mb-1 text-muted-foreground">Instructions</label>
              <p className="text-sm">{viewRx?.instructions}</p>
            </div>
            <div>
              <label className="block text-xs font-medium mb-1 text-muted-foreground">Status</label>
              <p className={`text-sm font-medium ${
                viewRx?.status === "Active" ? "text-blue-600" :
                viewRx?.status === "Filled" ? "text-green-600" :
                "text-muted-foreground"
              }`}>{viewRx?.status}</p>
            </div>
            <div>
              <label className="block text-xs font-medium mb-1 text-muted-foreground">Last Updated</label>
              <p className="text-sm">{viewRx?.lastUpdated}</p>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowViewModal(false)}>Close</Button>
              <Button onClick={() => {
                setShowViewModal(false)
                handleOpenModal(viewRx)
              }}>Edit Prescription</Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
} 