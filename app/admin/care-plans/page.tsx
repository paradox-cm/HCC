"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { Trash2, Edit, ArrowRight, Plus, Eye, Calendar, User, FileText } from "lucide-react"
import HeartPulseFillIcon from 'remixicon-react/HeartPulseFillIcon'
import AddCircleFillIcon from 'remixicon-react/AddCircleFillIcon'
import CalendarFillIcon from 'remixicon-react/CalendarFillIcon'
import CapsuleFillIcon from 'remixicon-react/CapsuleFillIcon'
import User3FillIcon from 'remixicon-react/User3FillIcon'
import CheckboxCircleFillIcon from 'remixicon-react/CheckboxCircleFillIcon'
import CloseCircleFillIcon from 'remixicon-react/CloseCircleFillIcon'

// Mock data for care plans
const MOCK_CARE_PLANS = [
  {
    id: 1,
    patientName: "Jane Doe",
    patientId: 1,
    type: "Preventive Care",
    status: "Active",
    createdDate: "2024-01-15",
    lastUpdated: "2024-06-01",
    summary: "Preventive care plan focused on blood pressure and cholesterol management.",
    goals: [
      "Maintain blood pressure below 130/80 mmHg",
      "Keep LDL cholesterol under 100 mg/dL",
      "Exercise at least 150 minutes per week",
      "Follow a heart-healthy diet",
      "Take medications as prescribed"
    ],
    medications: [
      { name: "Metoprolol", dosage: "50mg", frequency: "1 tablet daily" },
      { name: "Atorvastatin", dosage: "20mg", frequency: "1 tablet daily" },
      { name: "Lisinopril", dosage: "10mg", frequency: "1 tablet daily" }
    ],
    appointments: [
      { type: "Follow-up", doctor: "Dr. Asif Ali", date: "2024-07-25", time: "10:00 AM" },
      { type: "Lab work", doctor: "Lab", date: "2024-07-20", time: "9:00 AM" }
    ],
    progress: 75
  },
  {
    id: 2,
    patientName: "John Smith",
    patientId: 2,
    type: "Post-Procedure",
    status: "Active",
    createdDate: "2024-03-20",
    lastUpdated: "2024-05-28",
    summary: "Post-cardiac procedure recovery and monitoring plan.",
    goals: [
      "Complete cardiac rehabilitation program",
      "Monitor incision site for signs of infection",
      "Gradually increase physical activity",
      "Attend all follow-up appointments",
      "Report any chest pain or shortness of breath"
    ],
    medications: [
      { name: "Aspirin", dosage: "81mg", frequency: "1 tablet daily" },
      { name: "Clopidogrel", dosage: "75mg", frequency: "1 tablet daily" },
      { name: "Metoprolol", dosage: "25mg", frequency: "2 tablets daily" }
    ],
    appointments: [
      { type: "Cardiac Rehab", doctor: "Rehab Team", date: "2024-06-15", time: "2:00 PM" },
      { type: "Follow-up", doctor: "Dr. Sajid Ali", date: "2024-06-20", time: "11:00 AM" }
    ],
    progress: 60
  },
  {
    id: 3,
    patientName: "Maria Garcia",
    patientId: 3,
    type: "Chronic Disease Management",
    status: "Inactive",
    createdDate: "2023-11-10",
    lastUpdated: "2024-04-15",
    summary: "Diabetes and hypertension management plan.",
    goals: [
      "Maintain HbA1c below 7%",
      "Keep blood pressure under 140/90 mmHg",
      "Monitor blood glucose regularly",
      "Follow diabetic diet",
      "Exercise regularly"
    ],
    medications: [
      { name: "Metformin", dosage: "500mg", frequency: "2 tablets daily" },
      { name: "Lisinopril", dosage: "5mg", frequency: "1 tablet daily" },
      { name: "Glipizide", dosage: "5mg", frequency: "1 tablet daily" }
    ],
    appointments: [
      { type: "Diabetes Check", doctor: "Dr. Abdul Ali", date: "2024-05-10", time: "9:30 AM" },
      { type: "Lab work", doctor: "Lab", date: "2024-05-08", time: "8:00 AM" }
    ],
    progress: 45
  }
]

const MOCK_PATIENTS = [
  { id: 1, name: "Jane Doe", email: "jane@email.com" },
  { id: 2, name: "John Smith", email: "john@email.com" },
  { id: 3, name: "Maria Garcia", email: "maria@email.com" },
  { id: 4, name: "Robert Johnson", email: "robert@email.com" },
  { id: 5, name: "Sarah Wilson", email: "sarah@email.com" }
]

const CARE_PLAN_TYPES = [
  "Preventive Care",
  "Post-Procedure",
  "Chronic Disease Management",
  "Cardiac Rehabilitation",
  "Hypertension Management",
  "Diabetes Management",
  "Heart Failure Management",
  "Arrhythmia Management"
]

export default function AdminCarePlansPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [carePlans, setCarePlans] = useState(MOCK_CARE_PLANS)
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [addOpen, setAddOpen] = useState(false)
  const [viewPlan, setViewPlan] = useState<any>(null)
  const [editPlan, setEditPlan] = useState<any>(null)
  const [removePlan, setRemovePlan] = useState<any>(null)
  const [newPlan, setNewPlan] = useState({
    patientId: "",
    type: "",
    summary: "",
    goals: [""],
    medications: [{ name: "", dosage: "", frequency: "" }],
    appointments: [{ type: "", doctor: "", date: "", time: "" }]
  })
  const [editPlanData, setEditPlanData] = useState<any>(null)
  const [addError, setAddError] = useState("")
  const [editError, setEditError] = useState("")

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
      router.replace(`/admin/care-plans${params.size ? "?" + params.toString() : ""}`);
    }
  }

  const filtered = carePlans.filter(plan => {
    const matchesSearch = plan.patientName.toLowerCase().includes(search.toLowerCase()) ||
                         plan.type.toLowerCase().includes(search.toLowerCase()) ||
                         plan.summary.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === "all" || plan.status === statusFilter
    const matchesType = typeFilter === "all" || plan.type === typeFilter
    return matchesSearch && matchesStatus && matchesType
  })

  function handleAdd(e: React.FormEvent) {
    e.preventDefault()
    if (!newPlan.patientId || !newPlan.type || !newPlan.summary) {
      setAddError("Patient, type, and summary are required.")
      return
    }
    
    const patient = MOCK_PATIENTS.find(p => p.id === parseInt(newPlan.patientId))
    const plan = {
      id: Date.now(),
      patientName: patient?.name || "",
      patientId: parseInt(newPlan.patientId),
      type: newPlan.type,
      status: "Active",
      createdDate: new Date().toISOString().split('T')[0],
      lastUpdated: new Date().toISOString().split('T')[0],
      summary: newPlan.summary,
      goals: newPlan.goals.filter(g => g.trim()),
      medications: newPlan.medications.filter(m => m.name.trim()),
      appointments: newPlan.appointments.filter(a => a.type.trim()),
      progress: 0
    }
    
    setCarePlans(p => [plan, ...p])
    setAddOpen(false)
    setNewPlan({
      patientId: "",
      type: "",
      summary: "",
      goals: [""],
      medications: [{ name: "", dosage: "", frequency: "" }],
      appointments: [{ type: "", doctor: "", date: "", time: "" }]
    })
    setAddError("")
  }

  function handleRemove(id: number) {
    setCarePlans(p => p.filter(plan => plan.id !== id))
    setRemovePlan(null)
  }

  function addGoal() {
    setNewPlan(p => ({ ...p, goals: [...p.goals, ""] }))
  }

  function removeGoal(index: number) {
    setNewPlan(p => ({ ...p, goals: p.goals.filter((_, i) => i !== index) }))
  }

  function updateGoal(index: number, value: string) {
    setNewPlan(p => ({ ...p, goals: p.goals.map((g, i) => i === index ? value : g) }))
  }

  function addMedication() {
    setNewPlan(p => ({ ...p, medications: [...p.medications, { name: "", dosage: "", frequency: "" }] }))
  }

  function removeMedication(index: number) {
    setNewPlan(p => ({ ...p, medications: p.medications.filter((_, i) => i !== index) }))
  }

  function updateMedication(index: number, field: string, value: string) {
    setNewPlan(p => ({
      ...p,
      medications: p.medications.map((m, i) => i === index ? { ...m, [field]: value } : m)
    }))
  }

  function addAppointment() {
    setNewPlan(p => ({ ...p, appointments: [...p.appointments, { type: "", doctor: "", date: "", time: "" }] }))
  }

  function removeAppointment(index: number) {
    setNewPlan(p => ({ ...p, appointments: p.appointments.filter((_, i) => i !== index) }))
  }

  function updateAppointment(index: number, field: string, value: string) {
    setNewPlan(p => ({
      ...p,
      appointments: p.appointments.map((a, i) => i === index ? { ...a, [field]: value } : a)
    }))
  }

  // Edit plan functions
  function handleEdit(plan: any) {
    setEditPlanData({
      ...plan,
      goals: [...plan.goals],
      medications: [...plan.medications],
      appointments: [...plan.appointments]
    })
    setEditPlan(plan)
  }

  function handleEditSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!editPlanData.summary) {
      setEditError("Summary is required.")
      return
    }
    
    setCarePlans(p => p.map(plan => 
      plan.id === editPlanData.id 
        ? { 
            ...editPlanData, 
            lastUpdated: new Date().toISOString().split('T')[0],
            goals: editPlanData.goals.filter((g: string) => g.trim()),
            medications: editPlanData.medications.filter((m: any) => m.name.trim()),
            appointments: editPlanData.appointments.filter((a: any) => a.type.trim())
          }
        : plan
    ))
    setEditPlan(null)
    setEditPlanData(null)
    setEditError("")
  }

  function updateEditGoal(index: number, value: string) {
    setEditPlanData(p => ({ ...p, goals: p.goals.map((g: string, i: number) => i === index ? value : g) }))
  }

  function addEditGoal() {
    setEditPlanData(p => ({ ...p, goals: [...p.goals, ""] }))
  }

  function removeEditGoal(index: number) {
    setEditPlanData(p => ({ ...p, goals: p.goals.filter((_: string, i: number) => i !== index) }))
  }

  function updateEditMedication(index: number, field: string, value: string) {
    setEditPlanData(p => ({
      ...p,
      medications: p.medications.map((m: any, i: number) => i === index ? { ...m, [field]: value } : m)
    }))
  }

  function addEditMedication() {
    setEditPlanData(p => ({ ...p, medications: [...p.medications, { name: "", dosage: "", frequency: "" }] }))
  }

  function removeEditMedication(index: number) {
    setEditPlanData(p => ({ ...p, medications: p.medications.filter((_: any, i: number) => i !== index) }))
  }

  function updateEditAppointment(index: number, field: string, value: string) {
    setEditPlanData(p => ({
      ...p,
      appointments: p.appointments.map((a: any, i: number) => i === index ? { ...a, [field]: value } : a)
    }))
  }

  function addEditAppointment() {
    setEditPlanData(p => ({ ...p, appointments: [...p.appointments, { type: "", doctor: "", date: "", time: "" }] }))
  }

  function removeEditAppointment(index: number) {
    setEditPlanData(p => ({ ...p, appointments: p.appointments.filter((_: any, i: number) => i !== index) }))
  }

  // Progress tracking functions
  function updateProgress(planId: number, newProgress: number) {
    setCarePlans(p => p.map(plan => 
      plan.id === planId 
        ? { ...plan, progress: Math.max(0, Math.min(100, newProgress)), lastUpdated: new Date().toISOString().split('T')[0] }
        : plan
    ))
  }

  function calculateProgress(plan: any) {
    // Calculate progress based on completed goals, appointments, and medication adherence
    let completedGoals = 0
    let completedAppointments = 0
    let totalGoals = plan.goals.length
    let totalAppointments = plan.appointments.length
    
    // For demo purposes, we'll use a simple calculation
    // In a real system, this would be based on actual patient data and interactions
    const today = new Date()
    const appointmentsCompleted = plan.appointments.filter((apt: any) => new Date(apt.date) < today).length
    const appointmentsProgress = totalAppointments > 0 ? (appointmentsCompleted / totalAppointments) * 30 : 0
    
    // Goals progress (simulated)
    const goalsProgress = totalGoals > 0 ? (completedGoals / totalGoals) * 40 : 0
    
    // Medication adherence (simulated)
    const medicationProgress = plan.medications.length > 0 ? 30 : 0
    
    return Math.round(goalsProgress + appointmentsProgress + medicationProgress)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <HeartPulseFillIcon className="h-6 w-6" /> Care Plans
        </h1>
        <Button variant="default" onClick={() => router.push("/admin/care-plans?add=1")}>
          <AddCircleFillIcon className="h-4 w-4 mr-2" /> Create Care Plan
        </Button>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-wrap gap-4">
        <Input
          placeholder="Search by patient name, type, or summary"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="max-w-xs"
        />
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="Active">Active</SelectItem>
            <SelectItem value="Inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            {CARE_PLAN_TYPES.map(type => (
              <SelectItem key={type} value={type}>{type}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <HeartPulseFillIcon className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Total Care Plans</p>
                <p className="text-2xl font-bold">{carePlans.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckboxCircleFillIcon className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">Active Plans</p>
                <p className="text-2xl font-bold">{carePlans.filter(p => p.status === "Active").length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CloseCircleFillIcon className="h-5 w-5 text-orange-500" />
              <div>
                <p className="text-sm text-muted-foreground">Inactive Plans</p>
                <p className="text-2xl font-bold">{carePlans.filter(p => p.status === "Inactive").length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <User3FillIcon className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">Unique Patients</p>
                <p className="text-2xl font-bold">{new Set(carePlans.map(p => p.patientId)).size}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Care Plans Table */}
      <Card>
        <CardContent className="p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b bg-muted text-muted-foreground">
                  <th className="py-3 px-4 text-left font-semibold">Patient</th>
                  <th className="py-3 px-4 text-left font-semibold">Type</th>
                  <th className="py-3 px-4 text-left font-semibold">Status</th>
                  <th className="py-3 px-4 text-left font-semibold">Progress</th>
                  <th className="py-3 px-4 text-left font-semibold">Last Updated</th>
                  <th className="py-3 px-4 text-left font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 && (
                  <tr><td colSpan={6} className="text-center py-8 text-muted-foreground">No care plans found.</td></tr>
                )}
                {filtered.map(plan => (
                  <tr key={plan.id} className="border-b hover:bg-accent/50 transition-colors">
                    <td className="py-3 px-4 font-medium">{plan.patientName}</td>
                    <td className="py-3 px-4">{plan.type}</td>
                    <td className="py-3 px-4">
                      <Badge variant={plan.status === "Active" ? "default" : "secondary"}>
                        {plan.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-muted rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full transition-all" 
                            style={{ width: `${plan.progress}%` }}
                          />
                        </div>
                        <span className="text-xs">{plan.progress}%</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">{plan.lastUpdated}</td>
                                         <td className="py-3 px-4 flex gap-2">
                       <Button size="sm" variant="outline" onClick={() => setViewPlan(plan)}>
                         <Eye className="h-4 w-4 mr-1" /> View
                       </Button>
                       <Button size="sm" variant="outline" onClick={() => handleEdit(plan)}>
                         <Edit className="h-4 w-4 mr-1" /> Edit
                       </Button>
                       <Button asChild size="sm" variant="outline">
                         <Link href={`/admin/patients/${plan.patientId}`}>
                           <User className="h-4 w-4 mr-1" /> Patient
                         </Link>
                       </Button>
                       <Button size="sm" variant="destructive" onClick={() => setRemovePlan(plan)}>
                         <Trash2 className="h-4 w-4" />
                       </Button>
                     </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Create Care Plan Modal */}
      <Dialog open={addOpen} onOpenChange={handleAddOpenChange}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Care Plan</DialogTitle>
          </DialogHeader>
          <form className="space-y-6" onSubmit={handleAdd}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Patient</label>
                <Select value={newPlan.patientId} onValueChange={(value) => setNewPlan(p => ({ ...p, patientId: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select patient" />
                  </SelectTrigger>
                  <SelectContent>
                    {MOCK_PATIENTS.map(patient => (
                      <SelectItem key={patient.id} value={patient.id.toString()}>
                        {patient.name} ({patient.email})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Care Plan Type</label>
                <Select value={newPlan.type} onValueChange={(value) => setNewPlan(p => ({ ...p, type: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {CARE_PLAN_TYPES.map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Summary</label>
              <Textarea 
                value={newPlan.summary} 
                onChange={e => setNewPlan(p => ({ ...p, summary: e.target.value }))} 
                placeholder="Brief description of the care plan..."
                rows={3}
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium">Goals</label>
                <Button type="button" variant="outline" size="sm" onClick={addGoal}>
                  <Plus className="h-4 w-4 mr-1" /> Add Goal
                </Button>
              </div>
              <div className="space-y-2">
                {newPlan.goals.map((goal, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={goal}
                      onChange={e => updateGoal(index, e.target.value)}
                      placeholder="Enter care goal..."
                    />
                    {newPlan.goals.length > 1 && (
                      <Button type="button" variant="outline" size="sm" onClick={() => removeGoal(index)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium">Medications</label>
                <Button type="button" variant="outline" size="sm" onClick={addMedication}>
                  <Plus className="h-4 w-4 mr-1" /> Add Medication
                </Button>
              </div>
              <div className="space-y-2">
                {newPlan.medications.map((med, index) => (
                  <div key={index} className="grid grid-cols-3 gap-2">
                    <Input
                      value={med.name}
                      onChange={e => updateMedication(index, "name", e.target.value)}
                      placeholder="Medication name"
                    />
                    <Input
                      value={med.dosage}
                      onChange={e => updateMedication(index, "dosage", e.target.value)}
                      placeholder="Dosage"
                    />
                    <div className="flex gap-2">
                      <Input
                        value={med.frequency}
                        onChange={e => updateMedication(index, "frequency", e.target.value)}
                        placeholder="Frequency"
                      />
                      <Button type="button" variant="outline" size="sm" onClick={() => removeMedication(index)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium">Appointments</label>
                <Button type="button" variant="outline" size="sm" onClick={addAppointment}>
                  <Plus className="h-4 w-4 mr-1" /> Add Appointment
                </Button>
              </div>
              <div className="space-y-2">
                {newPlan.appointments.map((apt, index) => (
                  <div key={index} className="grid grid-cols-4 gap-2">
                    <Input
                      value={apt.type}
                      onChange={e => updateAppointment(index, "type", e.target.value)}
                      placeholder="Appointment type"
                    />
                    <Input
                      value={apt.doctor}
                      onChange={e => updateAppointment(index, "doctor", e.target.value)}
                      placeholder="Doctor"
                    />
                    <Input
                      type="date"
                      value={apt.date}
                      onChange={e => updateAppointment(index, "date", e.target.value)}
                    />
                    <div className="flex gap-2">
                      <Input
                        type="time"
                        value={apt.time}
                        onChange={e => updateAppointment(index, "time", e.target.value)}
                      />
                      <Button type="button" variant="outline" size="sm" onClick={() => removeAppointment(index)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {addError && <div className="text-sm text-red-600">{addError}</div>}
            <DialogFooter>
              <Button type="submit" className="w-full">Create Care Plan</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* View Care Plan Modal */}
      <Dialog open={!!viewPlan} onOpenChange={v => { if (!v) setViewPlan(null) }}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Care Plan Details</DialogTitle>
          </DialogHeader>
          {viewPlan && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold mb-2">Patient Information</h3>
                  <p className="text-sm text-muted-foreground">{viewPlan.patientName}</p>
                  <p className="text-sm text-muted-foreground">Plan Type: {viewPlan.type}</p>
                  <p className="text-sm text-muted-foreground">Status: {viewPlan.status}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Progress</h3>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-muted rounded-full h-3">
                      <div 
                        className="bg-primary h-3 rounded-full transition-all" 
                        style={{ width: `${viewPlan.progress}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium">{viewPlan.progress}%</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Summary</h3>
                <p className="text-sm text-muted-foreground">{viewPlan.summary}</p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Goals</h3>
                <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                  {viewPlan.goals.map((goal: string, index: number) => (
                    <li key={index}>{goal}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Medications</h3>
                <div className="space-y-2">
                  {viewPlan.medications.map((med: any, index: number) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <CapsuleFillIcon className="h-4 w-4 text-primary" />
                      <span className="font-medium">{med.name}</span>
                      <span>{med.dosage} – {med.frequency}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Upcoming Appointments</h3>
                <div className="space-y-2">
                  {viewPlan.appointments.map((apt: any, index: number) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <CalendarFillIcon className="h-4 w-4 text-primary" />
                      <span>{apt.type} with {apt.doctor} – {apt.date} at {apt.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" onClick={() => handleEdit(viewPlan)}>
                  <Edit className="h-4 w-4 mr-2" /> Edit Plan
                </Button>
                <Button asChild variant="outline">
                  <Link href={`/admin/patients/${viewPlan.patientId}`}>
                    <User className="h-4 w-4 mr-2" /> View Patient
                  </Link>
                </Button>
                <Button variant="outline" onClick={() => updateProgress(viewPlan.id, Math.min(100, viewPlan.progress + 10))}>
                  <CheckboxCircleFillIcon className="h-4 w-4 mr-2" /> Update Progress
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Care Plan Modal */}
      <Dialog open={!!editPlan} onOpenChange={v => { if (!v) { setEditPlan(null); setEditPlanData(null); } }}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Care Plan</DialogTitle>
          </DialogHeader>
          {editPlanData && (
            <form className="space-y-6" onSubmit={handleEditSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Patient</label>
                  <p className="text-sm text-muted-foreground">{editPlanData.patientName}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Care Plan Type</label>
                  <Select value={editPlanData.type} onValueChange={(value) => setEditPlanData(p => ({ ...p, type: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {CARE_PLAN_TYPES.map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Summary</label>
                <Textarea 
                  value={editPlanData.summary} 
                  onChange={e => setEditPlanData(p => ({ ...p, summary: e.target.value }))} 
                  placeholder="Brief description of the care plan..."
                  rows={3}
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium">Goals</label>
                  <Button type="button" variant="outline" size="sm" onClick={addEditGoal}>
                    <Plus className="h-4 w-4 mr-1" /> Add Goal
                  </Button>
                </div>
                <div className="space-y-2">
                  {editPlanData.goals.map((goal: string, index: number) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={goal}
                        onChange={e => updateEditGoal(index, e.target.value)}
                        placeholder="Enter care goal..."
                      />
                      {editPlanData.goals.length > 1 && (
                        <Button type="button" variant="outline" size="sm" onClick={() => removeEditGoal(index)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium">Medications</label>
                  <Button type="button" variant="outline" size="sm" onClick={addEditMedication}>
                    <Plus className="h-4 w-4 mr-1" /> Add Medication
                  </Button>
                </div>
                <div className="space-y-2">
                  {editPlanData.medications.map((med: any, index: number) => (
                    <div key={index} className="grid grid-cols-3 gap-2">
                      <Input
                        value={med.name}
                        onChange={e => updateEditMedication(index, "name", e.target.value)}
                        placeholder="Medication name"
                      />
                      <Input
                        value={med.dosage}
                        onChange={e => updateEditMedication(index, "dosage", e.target.value)}
                        placeholder="Dosage"
                      />
                      <div className="flex gap-2">
                        <Input
                          value={med.frequency}
                          onChange={e => updateEditMedication(index, "frequency", e.target.value)}
                          placeholder="Frequency"
                        />
                        <Button type="button" variant="outline" size="sm" onClick={() => removeEditMedication(index)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium">Appointments</label>
                  <Button type="button" variant="outline" size="sm" onClick={addEditAppointment}>
                    <Plus className="h-4 w-4 mr-1" /> Add Appointment
                  </Button>
                </div>
                <div className="space-y-2">
                  {editPlanData.appointments.map((apt: any, index: number) => (
                    <div key={index} className="grid grid-cols-4 gap-2">
                      <Input
                        value={apt.type}
                        onChange={e => updateEditAppointment(index, "type", e.target.value)}
                        placeholder="Appointment type"
                      />
                      <Input
                        value={apt.doctor}
                        onChange={e => updateEditAppointment(index, "doctor", e.target.value)}
                        placeholder="Doctor"
                      />
                      <Input
                        type="date"
                        value={apt.date}
                        onChange={e => updateEditAppointment(index, "date", e.target.value)}
                      />
                      <div className="flex gap-2">
                        <Input
                          type="time"
                          value={apt.time}
                          onChange={e => updateEditAppointment(index, "time", e.target.value)}
                        />
                        <Button type="button" variant="outline" size="sm" onClick={() => removeEditAppointment(index)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Progress</label>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="w-full bg-muted rounded-full h-3">
                      <div 
                        className="bg-primary h-3 rounded-full transition-all" 
                        style={{ width: `${editPlanData.progress}%` }}
                      />
                    </div>
                  </div>
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    value={editPlanData.progress}
                    onChange={e => setEditPlanData(p => ({ ...p, progress: parseInt(e.target.value) || 0 }))}
                    className="w-20"
                  />
                  <span className="text-sm text-muted-foreground">%</span>
                </div>
              </div>

              {editError && <div className="text-sm text-red-600">{editError}</div>}
              <DialogFooter>
                <Button type="submit" className="w-full">Update Care Plan</Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* Remove Care Plan Confirmation */}
      <Dialog open={!!removePlan} onOpenChange={v => { if (!v) setRemovePlan(null) }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Remove Care Plan</DialogTitle>
          </DialogHeader>
          {removePlan && (
            <div className="space-y-4">
              <div>Are you sure you want to remove the care plan for <b>{removePlan.patientName}</b>?</div>
              <DialogFooter>
                <Button type="button" variant="destructive" className="w-full" onClick={() => handleRemove(removePlan.id)}>Remove</Button>
                <Button type="button" variant="ghost" className="w-full" onClick={() => setRemovePlan(null)}>Cancel</Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
} 