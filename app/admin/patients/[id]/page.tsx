"use client"

import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  ArrowLeft, 
  Calendar, 
  MessageSquare, 
  FileText, 
  DollarSign, 
  HeartPulse,
  Phone,
  Mail,
  MapPin,
  Clock,
  AlertCircle,
  CheckCircle,
  User,
  Shield,
  Pill,
  Activity,
  Plus,
  Send,
  Edit,
  Eye,
  Trash2,
  Archive,
  Download,
  Upload,
  Reply,
  BarChart3
} from "lucide-react"
import { useMessages } from "@/contexts/MessageContext"
import { useAppointments } from "@/contexts/AppointmentContext"
import { usePrescriptions } from "@/contexts/PrescriptionContext"
import { useDocuments } from "@/contexts/DocumentContext"
import { useCarePlans } from "@/contexts/CarePlanContext"
import { useDataSync } from "@/contexts/DataSyncContext"

// Mock patient data with comprehensive information
const MOCK_PATIENT = {
  id: 1,
  name: "Sarah Johnson",
  dob: "1985-04-12",
  email: "sarah.johnson@email.com",
  phone: "(555) 123-4567",
  address: "123 Main St, Houston, TX 77001",
  emergencyContact: {
    name: "Michael Johnson",
    relationship: "Spouse",
    phone: "(555) 987-6543"
  },
  insurance: {
    provider: "Aetna",
    memberId: "AET123456789",
    group: "HCC-2024",
    status: "Active"
  },
  assignedDoctor: "Dr. Asif Ali",
  status: "Active",
  lastVisit: "2024-01-15",
  nextAppointment: "2024-02-20",
  outstandingBalance: 150.00,
  recentActivity: [
    {
      id: 1,
      type: "appointment",
      title: "Cardiology Consultation",
      date: "2024-01-15",
      status: "completed",
      description: "Follow-up appointment with Dr. Asif Ali"
    },
    {
      id: 2,
      type: "message",
      title: "Prescription Renewal Request",
      date: "2024-01-14",
      status: "pending",
      description: "Patient requested refill for Lisinopril"
    },
    {
      id: 3,
      type: "document",
      title: "Lab Results Uploaded",
      date: "2024-01-12",
      status: "completed",
      description: "CBC and Lipid Panel results"
    },
    {
      id: 4,
      type: "payment",
      title: "Payment Received",
      date: "2024-01-10",
      status: "completed",
      description: "Payment of $75.00 received"
    }
  ],
  medicalHistory: {
    conditions: ["Hypertension", "Type 2 Diabetes"],
    allergies: ["Penicillin"],
    medications: ["Lisinopril 10mg daily", "Metformin 500mg twice daily"]
  },
  quickStats: {
    totalAppointments: 12,
    pendingDocuments: 2,
    activePrescriptions: 3,
    unreadMessages: 1
  },
  // Enhanced data for tabbed sections
  appointments: [
    {
      id: 1,
      date: "2024-02-20",
      time: "10:00 AM",
      type: "Follow-up Consultation",
      doctor: "Dr. Asif Ali",
      status: "scheduled",
      notes: "Review blood pressure medication effectiveness"
    },
    {
      id: 2,
      date: "2024-01-15",
      time: "2:30 PM",
      type: "Cardiology Consultation",
      doctor: "Dr. Asif Ali",
      status: "completed",
      notes: "Initial consultation, prescribed Lisinopril"
    },
    {
      id: 3,
      date: "2024-03-05",
      time: "9:00 AM",
      type: "Lab Work",
      doctor: "Dr. Asif Ali",
      status: "scheduled",
      notes: "CBC and Lipid Panel"
    }
  ],
  prescriptions: [
    {
      id: 1,
      medication: "Lisinopril",
      dosage: "10mg",
      frequency: "Once daily",
      prescribedBy: "Dr. Asif Ali",
      prescribedDate: "2024-01-15",
      status: "active",
      refills: 2,
      pharmacy: "CVS Pharmacy"
    },
    {
      id: 2,
      medication: "Metformin",
      dosage: "500mg",
      frequency: "Twice daily",
      prescribedBy: "Dr. Asif Ali",
      prescribedDate: "2024-01-15",
      status: "active",
      refills: 1,
      pharmacy: "CVS Pharmacy"
    },
    {
      id: 3,
      medication: "Aspirin",
      dosage: "81mg",
      frequency: "Once daily",
      prescribedBy: "Dr. Asif Ali",
      prescribedDate: "2024-01-10",
      status: "active",
      refills: 3,
      pharmacy: "CVS Pharmacy"
    }
  ],
  carePlans: [
    {
      id: 1,
      type: "Cardiovascular Health",
      status: "active",
      progress: 75,
      startDate: "2024-01-15",
      goals: [
        "Reduce blood pressure to target range",
        "Improve cardiovascular fitness",
        "Maintain healthy diet"
      ],
      nextReview: "2024-03-15"
    },
    {
      id: 2,
      type: "Diabetes Management",
      status: "active",
      progress: 60,
      startDate: "2024-01-15",
      goals: [
        "Maintain blood glucose levels",
        "Regular exercise routine",
        "Weight management"
      ],
      nextReview: "2024-03-15"
    }
  ],
  documents: [
    {
      id: 1,
      name: "Lab Results - CBC",
      type: "lab_results",
      uploadedDate: "2024-01-12",
      uploadedBy: "Dr. Asif Ali",
      status: "reviewed"
    },
    {
      id: 2,
      name: "Lab Results - Lipid Panel",
      type: "lab_results",
      uploadedDate: "2024-01-12",
      uploadedBy: "Dr. Asif Ali",
      status: "reviewed"
    },
    {
      id: 3,
      name: "Insurance Card",
      type: "insurance",
      uploadedDate: "2024-01-10",
      uploadedBy: "Patient",
      status: "pending_review"
    },
    {
      id: 4,
      name: "Medical History Form",
      type: "forms",
      uploadedDate: "2024-01-08",
      uploadedBy: "Patient",
      status: "reviewed"
    }
  ],
  billing: {
    outstandingBalance: 150.00,
    lastPayment: {
      amount: 75.00,
      date: "2024-01-10",
      method: "Credit Card"
    },
    paymentHistory: [
      {
        id: 1,
        amount: 75.00,
        date: "2024-01-10",
        method: "Credit Card",
        description: "Consultation fee"
      },
      {
        id: 2,
        amount: 50.00,
        date: "2023-12-15",
        method: "Insurance",
        description: "Lab work"
      }
    ]
  }
}

export default function AdminPatientDetailPage() {
  const params = useParams()
  const router = useRouter()
  const patient = MOCK_PATIENT // In real app, fetch by ID

  // Tab state
  const [activeTab, setActiveTab] = useState("overview")

  // State for modals
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false)
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false)
  const [isPrescriptionModalOpen, setIsPrescriptionModalOpen] = useState(false)
  const [isContactEditModalOpen, setIsContactEditModalOpen] = useState(false)
  const [isInsuranceEditModalOpen, setIsInsuranceEditModalOpen] = useState(false)
  const [isMedicalEditModalOpen, setIsMedicalEditModalOpen] = useState(false)

  // Form data
  const [appointmentData, setAppointmentData] = useState({
    date: "",
    time: "",
    type: "",
    notes: "",
    doctor: patient.assignedDoctor
  })

  const [messageData, setMessageData] = useState({
    subject: "",
    message: "",
    category: "appointment",
    priority: "medium",
    assignedTo: "Dr. Asif Ali"
  })

  const [prescriptionData, setPrescriptionData] = useState({
    medication: "",
    dosage: "",
    frequency: "",
    duration: "",
    notes: ""
  })

  const [contactData, setContactData] = useState({
    name: patient.name,
    dob: patient.dob,
    email: patient.email,
    phone: patient.phone,
    address: patient.address,
    emergencyContact: {
      name: patient.emergencyContact.name,
      relationship: patient.emergencyContact.relationship,
      phone: patient.emergencyContact.phone
    }
  })

  const [insuranceData, setInsuranceData] = useState({
    provider: patient.insurance.provider,
    memberId: patient.insurance.memberId,
    group: patient.insurance.group,
    status: patient.insurance.status,
    assignedDoctor: patient.assignedDoctor,
    patientStatus: patient.status
  })

  const [medicalData, setMedicalData] = useState({
    conditions: [...patient.medicalHistory.conditions],
    allergies: [...patient.medicalHistory.allergies],
    medications: [...patient.medicalHistory.medications]
  })



  // Context integrations
  const { messageThreads, addReplyToThread, markThreadAsRead } = useMessages()
  const { getPatientAppointments, addAppointment, updateAppointment, deleteAppointment } = useAppointments()
  const { getPatientPrescriptions, addPrescription, updatePrescription, deletePrescription } = usePrescriptions()
  const { getPatientDocuments, addDocument, updateDocument, deleteDocument } = useDocuments()
  const { getPatientCarePlans, addCarePlan, updateCarePlan, deleteCarePlan } = useCarePlans()
  
  // New DataSync context integration
  const { 
    patients, 
    syncPatientData, 
    addMessageThread, 
    addTransaction,
    updatePatientRelatedData,
    updateAppointmentRelatedData,
    getPatientAppointments: getPatientAppointmentsSync,
    getPatientPrescriptions: getPatientPrescriptionsSync,
    getPatientDocuments: getPatientDocumentsSync,
    getPatientCarePlans: getPatientCarePlansSync
  } = useDataSync()
  
  // Get current patient from DataSync context
  const currentPatient = patients.find(p => p.id.toString() === params.id) || patient
  
  // Filter data for this patient using DataSync context
  const patientMessages = messageThreads.filter(thread => 
    thread.patientId === currentPatient.id.toString() || 
    thread.patientName === currentPatient.name
  )
  const patientAppointments = getPatientAppointmentsSync(currentPatient.id)
  const patientPrescriptions = getPatientPrescriptionsSync(currentPatient.id)
  const patientDocuments = getPatientDocumentsSync(currentPatient.id)
  const patientCarePlans = getPatientCarePlansSync(currentPatient.id)

  // Message thread view state
  const [selectedThread, setSelectedThread] = useState<number | null>(null)
  const [replyText, setReplyText] = useState("")

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

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "appointment": return Calendar
      case "message": return MessageSquare
      case "document": return FileText
      case "payment": return DollarSign
      default: return Activity
    }
  }

  const getActivityColor = (status: string) => {
    switch (status) {
      case "completed": return "text-green-600"
      case "pending": return "text-yellow-600"
      case "cancelled": return "text-red-600"
      default: return "text-gray-600"
    }
  }

  const handleScheduleAppointment = () => {
    // Add appointment using DataSync context
    addAppointment({
      patientId: currentPatient.id,
      patientName: currentPatient.name,
      doctorId: 1, // Default to first doctor, in real app would be selected
      doctorName: appointmentData.doctor,
      date: appointmentData.date,
      time: appointmentData.time,
      type: appointmentData.type,
      status: "scheduled",
      notes: appointmentData.notes
    })
    
    // Update patient's next appointment
    updatePatientRelatedData(currentPatient.id, { nextAppointment: appointmentData.date })
    
    console.log("Appointment scheduled for:", currentPatient.name, appointmentData)
    setIsAppointmentModalOpen(false)
    setAppointmentData({
      date: "",
      time: "",
      type: "",
      notes: "",
      doctor: currentPatient.assignedDoctor
    })
  }

  const { addMessageToThread } = useMessages()

  const handleSendMessage = () => {
    // Add message using DataSync context
    addMessageThread({
      patientId: currentPatient.id.toString(),
      patientName: currentPatient.name,
      patientEmail: currentPatient.email,
      subject: messageData.subject,
      category: messageData.category,
      priority: messageData.priority,
      status: "unread",
      assignedTo: messageData.assignedTo,
      messages: [
        {
          id: 1,
          from: "admin",
          sender: messageData.assignedTo,
          text: messageData.message,
          timestamp: new Date().toISOString()
        }
      ],
      lastMessageTime: new Date().toISOString()
    })
    
    console.log("Message sent to:", currentPatient.name, messageData)
    setIsMessageModalOpen(false)
    setMessageData({
      subject: "",
      message: "",
      category: "appointment",
      priority: "medium",
      assignedTo: "Dr. Asif Ali"
    })
    
    // Optionally navigate to messages page to see the sent message
    // router.push(`/admin/messages`)
  }

  const handleCreatePrescription = () => {
    // Add prescription to shared context
    addPrescription({
      patientId: patient.id,
      patientName: patient.name,
      medication: prescriptionData.medication,
      dosage: prescriptionData.dosage,
      frequency: prescriptionData.frequency,
      duration: prescriptionData.duration,
      status: "active",
      prescribedBy: patient.assignedDoctor,
      prescribedDate: new Date().toISOString().split('T')[0],
      refills: 3,
      notes: prescriptionData.notes
    })
    
    console.log("Prescription created for:", patient.name, prescriptionData)
    setIsPrescriptionModalOpen(false)
    setPrescriptionData({
      medication: "",
      dosage: "",
      frequency: "",
      duration: "",
      notes: ""
    })
  }

  const handleUpdateContact = () => {
    // Update patient contact information using DataSync context
    updatePatientRelatedData(currentPatient.id, {
      name: contactData.name,
      dob: contactData.dob,
      email: contactData.email,
      phone: contactData.phone,
      address: contactData.address,
      emergencyContact: contactData.emergencyContact
    })
    
    console.log("Updating contact info for:", currentPatient.name, contactData)
    setIsContactEditModalOpen(false)
  }

  const handleUpdateInsurance = () => {
    // Update patient insurance information using DataSync context
    updatePatientRelatedData(currentPatient.id, {
      insurance: {
        provider: insuranceData.provider,
        memberId: insuranceData.memberId,
        group: insuranceData.group,
        status: insuranceData.status
      },
      assignedDoctor: insuranceData.assignedDoctor,
      status: insuranceData.patientStatus
    })
    
    console.log("Updating insurance info for:", currentPatient.name, insuranceData)
    setIsInsuranceEditModalOpen(false)
  }

  const handleUpdateMedical = () => {
    // Update patient medical information using DataSync context
    updatePatientRelatedData(currentPatient.id, {
      medicalHistory: {
        conditions: medicalData.conditions.filter(c => c.trim() !== ''),
        allergies: medicalData.allergies.filter(a => a.trim() !== ''),
        medications: medicalData.medications.filter(m => m.trim() !== '')
      }
    })
    
    console.log("Updating medical info for:", currentPatient.name, medicalData)
    setIsMedicalEditModalOpen(false)
  }



  // Message handling functions
  const handleViewThread = (threadId: number) => {
    setSelectedThread(threadId)
    markThreadAsRead(threadId)
  }

  const handleReplyToThread = (threadId: number) => {
    setSelectedThread(threadId)
    // Focus on reply input
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  // Appointment handlers
  const handleEditAppointment = (appointmentId: number) => {
    // In real app, this would open an edit modal
    console.log("Edit appointment:", appointmentId)
  }

  const handleDeleteAppointment = (appointmentId: number) => {
    if (confirm("Are you sure you want to delete this appointment?")) {
      deleteAppointment(appointmentId)
    }
  }

  // Prescription handlers
  const handleEditPrescription = (prescriptionId: number) => {
    // In real app, this would open an edit modal
    console.log("Edit prescription:", prescriptionId)
  }

  const handleDeletePrescription = (prescriptionId: number) => {
    if (confirm("Are you sure you want to delete this prescription?")) {
      deletePrescription(prescriptionId)
    }
  }

  // Document handlers
  const handleViewDocument = (documentId: number) => {
    // In real app, this would open a document viewer
    console.log("View document:", documentId)
  }

  const handleDeleteDocument = (documentId: number) => {
    if (confirm("Are you sure you want to delete this document?")) {
      deleteDocument(documentId)
    }
  }

  // Care plan handlers
  const handleEditCarePlan = (carePlanId: number) => {
    // In real app, this would open an edit modal
    console.log("Edit care plan:", carePlanId)
  }

  const handleDeleteCarePlan = (carePlanId: number) => {
    if (confirm("Are you sure you want to delete this care plan?")) {
      deleteCarePlan(carePlanId)
    }
  }

  return (
    <div>
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-6">
        <Button variant="ghost" size="icon" onClick={() => router.push("/admin/patients")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-auto p-0 text-sm text-muted-foreground hover:underline"
          onClick={() => router.push("/admin/patients")}
        >
          Patients
        </Button>
        <span className="mx-2 text-sm text-muted-foreground">/</span>
        <span className="font-semibold text-sm">
          {patient.name}
        </span>
      </div>

      {/* Patient Header */}
      <Card className="mb-6">
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col md:flex-row md:items-start gap-4 sm:gap-6">
            <Avatar className="h-16 w-16 sm:h-20 sm:w-20 mx-auto md:mx-0">
              <AvatarFallback className="text-base sm:text-lg">
                {patient.name.split(" ").map(n => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold mb-2">{patient.name}</h1>
                  <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center justify-center sm:justify-start gap-1">
                      <User className="h-4 w-4" />
                      DOB: {patient.dob}
                    </div>
                    <div className="flex items-center justify-center sm:justify-start gap-1">
                      <Mail className="h-4 w-4" />
                      <span className="truncate">{patient.email}</span>
                    </div>
                    <div className="flex items-center justify-center sm:justify-start gap-1">
                      <Phone className="h-4 w-4" />
                      {patient.phone}
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2">
                    <Badge variant={patient.status === "Active" ? "default" : "secondary"}>
                      {patient.status}
                    </Badge>
                    <span className="text-sm text-muted-foreground text-center sm:text-left">
                      Assigned to {patient.assignedDoctor}
                    </span>
                  </div>
                </div>
                
                <div className="flex flex-col gap-2 w-full sm:w-auto">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setIsAppointmentModalOpen(true)}
                    className="w-full"
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Appointment
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setIsMessageModalOpen(true)}
                    className="w-full"
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabbed Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-1">
          <TabsTrigger value="overview" className="text-xs sm:text-sm">Overview</TabsTrigger>
          <TabsTrigger value="appointments" className="text-xs sm:text-sm">Appointments</TabsTrigger>
          <TabsTrigger value="prescriptions" className="text-xs sm:text-sm">Prescriptions</TabsTrigger>
          <TabsTrigger value="care-plans" className="text-xs sm:text-sm">Care Plans</TabsTrigger>
          <TabsTrigger value="documents" className="text-xs sm:text-sm">Documents</TabsTrigger>
          <TabsTrigger value="messages" className="text-xs sm:text-sm">Messages</TabsTrigger>
          <TabsTrigger value="billing" className="text-xs sm:text-sm">Billing</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-4 sm:space-y-6">
              {/* Patient Stats */}
              <Card>
                <CardHeader className="pb-3 sm:pb-6">
                  <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                    <BarChart3 className="h-5 w-5" />
                    Patient Stats
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                    {/* Outstanding Balance */}
                    <div className="text-center p-3 sm:p-4 rounded-lg bg-red-50 dark:bg-red-950/20">
                      <div className="text-xl sm:text-2xl font-bold text-red-600">
                        ${patient.outstandingBalance.toFixed(2)}
                      </div>
                      <div className="text-xs sm:text-sm text-muted-foreground">Outstanding Balance</div>
                    </div>
                    
                    {/* Next Appointment */}
                    <div className="text-center p-3 sm:p-4 rounded-lg bg-blue-50 dark:bg-blue-950/20">
                      <div className="text-lg sm:text-xl font-bold text-blue-600">
                        {patient.nextAppointment ? new Date(patient.nextAppointment).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'None'}
                      </div>
                      <div className="text-xs sm:text-sm text-muted-foreground">Next Appointment</div>
                    </div>
                    
                    {/* Last Visit */}
                    <div className="text-center p-3 sm:p-4 rounded-lg bg-green-50 dark:bg-green-950/20">
                      <div className="text-lg sm:text-xl font-bold text-green-600">
                        {patient.lastVisit ? new Date(patient.lastVisit).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'Never'}
                      </div>
                      <div className="text-xs sm:text-sm text-muted-foreground">Last Visit</div>
                    </div>
                    
                    {/* Medical Conditions */}
                    <div className="text-center p-3 sm:p-4 rounded-lg bg-purple-50 dark:bg-purple-950/20">
                      <div className="text-xl sm:text-2xl font-bold text-purple-600">
                        {patient.medicalHistory.conditions.length}
                      </div>
                      <div className="text-xs sm:text-sm text-muted-foreground">Medical Conditions</div>
                    </div>
                  </div>
                  
                  {/* Additional Stats Row */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-3 sm:mt-4">
                    {/* Active Prescriptions */}
                    <div className="text-center p-2 sm:p-3 rounded-lg bg-orange-50 dark:bg-orange-950/20">
                      <div className="text-lg sm:text-xl font-bold text-orange-600">
                        {patient.quickStats.activePrescriptions}
                      </div>
                      <div className="text-xs text-muted-foreground">Active Prescriptions</div>
                    </div>
                    
                    {/* Pending Documents */}
                    <div className="text-center p-2 sm:p-3 rounded-lg bg-yellow-50 dark:bg-yellow-950/20">
                      <div className="text-lg sm:text-xl font-bold text-yellow-600">
                        {patient.quickStats.pendingDocuments}
                      </div>
                      <div className="text-xs text-muted-foreground">Pending Documents</div>
                    </div>
                    
                    {/* Unread Messages */}
                    <div className="text-center p-2 sm:p-3 rounded-lg bg-indigo-50 dark:bg-indigo-950/20">
                      <div className="text-lg sm:text-xl font-bold text-indigo-600">
                        {patient.quickStats.unreadMessages}
                      </div>
                      <div className="text-xs text-muted-foreground">Unread Messages</div>
                    </div>
                    
                    {/* Total Appointments */}
                    <div className="text-center p-2 sm:p-3 rounded-lg bg-cyan-50 dark:bg-cyan-950/20">
                      <div className="text-lg sm:text-xl font-bold text-cyan-600">
                        {patient.quickStats.totalAppointments}
                      </div>
                      <div className="text-xs text-muted-foreground">Total Appointments</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader className="pb-3 sm:pb-6">
                  <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                    <Clock className="h-5 w-5" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3 sm:space-y-4">
                    {patient.recentActivity.map((activity) => {
                      const Icon = getActivityIcon(activity.type)
                      return (
                        <div key={activity.id} className="flex items-start gap-3 p-3 sm:p-4 rounded-lg border">
                          <Icon className={`h-5 w-5 mt-0.5 flex-shrink-0 ${getActivityColor(activity.status)}`} />
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
                              <h4 className="font-medium text-sm sm:text-base">{activity.title}</h4>
                              <Badge variant={activity.status === "completed" ? "default" : "secondary"} className="w-fit">
                                {activity.status}
                              </Badge>
                            </div>
                            <p className="text-xs sm:text-sm text-muted-foreground mt-1">{activity.description}</p>
                            <p className="text-xs text-muted-foreground mt-2">{activity.date}</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-4 sm:space-y-6">
          {/* Contact Information */}
          <Card>
            <CardHeader className="pb-3 sm:pb-6">
              <CardTitle className="flex items-center justify-between text-lg sm:text-xl">
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Contact Information
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsContactEditModalOpen(true)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 space-y-4">
              <div>
                <div className="flex items-center gap-2 text-sm font-medium mb-1">
                  <User className="h-4 w-4" />
                  Basic Information
                </div>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div><span className="font-medium">Name:</span> {patient.name}</div>
                  <div><span className="font-medium">DOB:</span> {patient.dob}</div>
                  <div><span className="font-medium">Email:</span> {patient.email}</div>
                  <div><span className="font-medium">Phone:</span> {patient.phone}</div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center gap-2 text-sm font-medium mb-1">
                  <MapPin className="h-4 w-4" />
                  Address
                </div>
                <p className="text-sm text-muted-foreground break-words">{patient.address}</p>
              </div>
              
              <div>
                <div className="flex items-center gap-2 text-sm font-medium mb-1">
                  <AlertCircle className="h-4 w-4" />
                  Emergency Contact
                </div>
                <p className="text-sm text-muted-foreground">
                  {patient.emergencyContact.name} ({patient.emergencyContact.relationship})
                </p>
                <p className="text-sm text-muted-foreground">{patient.emergencyContact.phone}</p>
              </div>
            </CardContent>
          </Card>

          {/* Insurance Information */}
          <Card>
            <CardHeader className="pb-3 sm:pb-6">
              <CardTitle className="flex items-center justify-between text-lg sm:text-xl">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Insurance
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsInsuranceEditModalOpen(true)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 space-y-3">
              <div>
                <div className="text-sm font-medium">Provider</div>
                <div className="text-sm text-muted-foreground break-words">{patient.insurance.provider}</div>
              </div>
              <div>
                <div className="text-sm font-medium">Member ID</div>
                <div className="text-sm text-muted-foreground break-all">{patient.insurance.memberId}</div>
              </div>
              <div>
                <div className="text-sm font-medium">Group</div>
                <div className="text-sm text-muted-foreground break-words">{patient.insurance.group}</div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge variant={patient.insurance.status === "Active" ? "default" : "secondary"} className="w-fit">
                  Insurance: {patient.insurance.status}
                </Badge>
                <Badge variant={patient.status === "Active" ? "default" : "secondary"} className="w-fit">
                  Patient: {patient.status}
                </Badge>
              </div>
              <div>
                <div className="text-sm font-medium">Assigned Doctor</div>
                <div className="text-sm text-muted-foreground">{patient.assignedDoctor}</div>
              </div>
            </CardContent>
          </Card>

          {/* Medical Information */}
          <Card>
            <CardHeader className="pb-3 sm:pb-6">
              <CardTitle className="flex items-center justify-between text-lg sm:text-xl">
                <div className="flex items-center gap-2">
                  <HeartPulse className="h-5 w-5" />
                  Medical Information
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMedicalEditModalOpen(true)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 space-y-4">
              <div>
                <div className="text-sm font-medium mb-2">Conditions</div>
                <div className="flex flex-wrap gap-1">
                  {patient.medicalHistory.conditions.map((condition, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {condition}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <div className="text-sm font-medium mb-2">Allergies</div>
                <div className="flex flex-wrap gap-1">
                  {patient.medicalHistory.allergies.map((allergy, index) => (
                    <Badge key={index} variant="destructive" className="text-xs">
                      {allergy}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <div className="text-sm font-medium mb-2">Current Medications</div>
                <div className="space-y-1">
                  {patient.medicalHistory.medications.map((medication, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <Pill className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      <span className="text-muted-foreground break-words">{medication}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>


        </div>
      </div>
        </TabsContent>

        {/* Appointments Tab */}
        <TabsContent value="appointments" className="space-y-6">
          <Card>
            <CardHeader className="pb-3 sm:pb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <Calendar className="h-5 w-5" />
                  Appointments
                </CardTitle>
                <Button onClick={() => setIsAppointmentModalOpen(true)} className="w-full sm:w-auto">
                  <Plus className="h-4 w-4 mr-2" />
                  Schedule Appointment
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              {patientAppointments.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Calendar className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>No appointments scheduled. Schedule an appointment to get started.</p>
                </div>
              ) : (
                <div className="space-y-3 sm:space-y-4">
                  {patientAppointments.map((appointment) => (
                    <div key={appointment.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 border rounded-lg gap-3 sm:gap-4">
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className="text-center flex-shrink-0">
                          <div className="text-base sm:text-lg font-bold text-blue-600">
                            {new Date(appointment.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </div>
                          <div className="text-xs sm:text-sm text-muted-foreground">{appointment.time}</div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm sm:text-base">{appointment.type}</h4>
                          <p className="text-xs sm:text-sm text-muted-foreground">with {appointment.doctorName}</p>
                          {appointment.notes && (
                            <p className="text-xs sm:text-sm text-muted-foreground mt-1 break-words">{appointment.notes}</p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center justify-between sm:justify-end gap-2">
                        <Badge variant={appointment.status === "scheduled" ? "default" : "secondary"} className="text-xs">
                          {appointment.status}
                        </Badge>
                        <div className="flex items-center gap-1 sm:gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleEditAppointment(appointment.id)}
                            className="h-8 w-8 p-0 sm:h-9 sm:w-auto sm:px-3"
                          >
                            <Edit className="h-3 w-3 sm:h-4 sm:w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleDeleteAppointment(appointment.id)}
                            className="h-8 w-8 p-0 sm:h-9 sm:w-auto sm:px-3"
                          >
                            <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Prescriptions Tab */}
        <TabsContent value="prescriptions" className="space-y-6">
          <Card>
            <CardHeader className="pb-3 sm:pb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <Pill className="h-5 w-5" />
                  Prescriptions
                </CardTitle>
                <Button onClick={() => setIsPrescriptionModalOpen(true)} className="w-full sm:w-auto">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Prescription
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              {patientPrescriptions.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Pill className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>No prescriptions found. Add a prescription to get started.</p>
                </div>
              ) : (
                <div className="space-y-3 sm:space-y-4">
                  {patientPrescriptions.map((prescription) => (
                    <div key={prescription.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 border rounded-lg gap-3 sm:gap-4">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm sm:text-base">{prescription.medication}</h4>
                        <p className="text-xs sm:text-sm text-muted-foreground">
                          {prescription.dosage} • {prescription.frequency}
                        </p>
                        <p className="text-xs sm:text-sm text-muted-foreground">
                          Prescribed by {prescription.prescribedBy} on {prescription.prescribedDate}
                        </p>
                        {prescription.notes && (
                          <p className="text-xs sm:text-sm text-muted-foreground mt-1 break-words">{prescription.notes}</p>
                        )}
                      </div>
                      <div className="flex items-center justify-between sm:justify-end gap-2">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                          <Badge variant={prescription.status === "active" ? "default" : "secondary"} className="text-xs w-fit">
                            {prescription.status}
                          </Badge>
                          <span className="text-xs sm:text-sm text-muted-foreground">
                            {prescription.refills} refills left
                          </span>
                        </div>
                        <div className="flex items-center gap-1 sm:gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleEditPrescription(prescription.id)}
                            className="h-8 w-8 p-0 sm:h-9 sm:w-auto sm:px-3"
                          >
                            <Edit className="h-3 w-3 sm:h-4 sm:w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleDeletePrescription(prescription.id)}
                            className="h-8 w-8 p-0 sm:h-9 sm:w-auto sm:px-3"
                          >
                            <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Care Plans Tab */}
        <TabsContent value="care-plans" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <HeartPulse className="h-5 w-5" />
                  Care Plans
                </CardTitle>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Care Plan
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {patientCarePlans.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <HeartPulse className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>No care plans created. Create a care plan to get started.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {patientCarePlans.map((plan) => (
                    <div key={plan.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium">{plan.type}</h4>
                        <Badge variant={plan.status === "Active" ? "default" : "secondary"}>
                          {plan.status}
                        </Badge>
                      </div>
                      <div className="mb-3">
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span>Progress</span>
                          <span>{plan.progress}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full transition-all" 
                            style={{ width: `${plan.progress}%` }}
                          />
                        </div>
                      </div>
                      <div className="mb-3">
                        <h5 className="text-sm font-medium mb-2">Goals:</h5>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {plan.goals.slice(0, 3).map((goal, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                              {goal}
                            </li>
                          ))}
                          {plan.goals.length > 3 && (
                            <li className="text-xs text-muted-foreground">
                              +{plan.goals.length - 3} more goals
                            </li>
                          )}
                        </ul>
                      </div>
                      <div className="mb-3">
                        <h5 className="text-sm font-medium mb-2">Medications:</h5>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {plan.medications.slice(0, 2).map((med, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <Pill className="h-3 w-3" />
                              {med.name} {med.dosage}
                            </li>
                          ))}
                          {plan.medications.length > 2 && (
                            <li className="text-xs text-muted-foreground">
                              +{plan.medications.length - 2} more medications
                            </li>
                          )}
                        </ul>
                      </div>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>Last Updated: {plan.lastUpdated}</span>
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleEditCarePlan(plan.id)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleDeleteCarePlan(plan.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Documents Tab */}
        <TabsContent value="documents" className="space-y-6">
          <Card>
            <CardHeader className="pb-3 sm:pb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <FileText className="h-5 w-5" />
                  Documents
                </CardTitle>
                <Button className="w-full sm:w-auto">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Document
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              {patientDocuments.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <FileText className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>No documents uploaded. Upload a document to get started.</p>
                </div>
              ) : (
                <div className="space-y-3 sm:space-y-4">
                  {patientDocuments.map((document) => (
                    <div key={document.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 border rounded-lg gap-3 sm:gap-4">
                      <div className="flex items-center gap-3 sm:gap-4">
                        <FileText className="h-6 w-6 sm:h-8 sm:w-8 text-muted-foreground flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm sm:text-base">{document.name}</h4>
                          <p className="text-xs sm:text-sm text-muted-foreground">
                            Uploaded by {document.uploadedBy} on {document.date}
                          </p>
                          <p className="text-xs sm:text-sm text-muted-foreground capitalize">
                            Type: {document.type}
                          </p>
                          {document.notes && (
                            <p className="text-xs sm:text-sm text-muted-foreground mt-1 break-words">{document.notes}</p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center justify-between sm:justify-end gap-2">
                        <Badge variant={document.status === "available" ? "default" : "secondary"} className="text-xs">
                          {document.status}
                        </Badge>
                        <div className="flex items-center gap-1 sm:gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleViewDocument(document.id)}
                            className="h-8 w-8 p-0 sm:h-9 sm:w-auto sm:px-3"
                          >
                            <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleDeleteDocument(document.id)}
                            className="h-8 w-8 p-0 sm:h-9 sm:w-auto sm:px-3"
                          >
                            <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Messages Tab */}
        <TabsContent value="messages" className="space-y-6">
          <Card>
            <CardHeader className="pb-3 sm:pb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <MessageSquare className="h-5 w-5" />
                  Messages
                </CardTitle>
                <Button onClick={() => setIsMessageModalOpen(true)} className="w-full sm:w-auto">
                  <Send className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              {patientMessages.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <MessageSquare className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>No messages yet. Send a message to start a conversation.</p>
                </div>
              ) : (
                <div className="space-y-3 sm:space-y-4">
                  {patientMessages.map((thread) => (
                    <div key={thread.id} className="border rounded-lg p-3 sm:p-4 hover:bg-muted/30 transition-colors">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-0 mb-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-1 sm:gap-2 mb-1">
                            <h4 className="font-medium text-sm sm:text-base">{thread.subject}</h4>
                            <Badge variant={thread.status === "unread" ? "default" : "secondary"} className="text-xs">
                              {thread.status}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {thread.category}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {thread.priority}
                            </Badge>
                          </div>
                          <p className="text-xs sm:text-sm text-muted-foreground">
                            Assigned to: {thread.assignedTo}
                          </p>
                        </div>
                        <div className="flex items-center gap-1 sm:gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewThread(thread.id)}
                            className="h-8 w-8 p-0 sm:h-9 sm:w-auto sm:px-3"
                          >
                            <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleReplyToThread(thread.id)}
                            className="h-8 w-8 p-0 sm:h-9 sm:w-auto sm:px-3"
                          >
                            <Reply className="h-3 w-3 sm:h-4 sm:w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      {/* Latest Message Preview */}
                      {thread.messages.length > 0 && (
                        <div className="bg-muted/20 rounded p-3">
                          <div className="flex items-start gap-3">
                            <Avatar className="h-6 w-6 sm:h-8 sm:w-8 flex-shrink-0">
                              <AvatarFallback className="text-xs">
                                {thread.messages[thread.messages.length - 1].from === "patient" 
                                  ? patient.name.split(" ").map(n => n[0]).join("")
                                  : thread.assignedTo.split(" ").map(n => n[0]).join("")
                                }
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-1">
                                <span className="text-xs sm:text-sm font-medium">
                                  {thread.messages[thread.messages.length - 1].sender}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  {formatTimestamp(thread.messages[thread.messages.length - 1].timestamp)}
                                </span>
                              </div>
                              <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">
                                {thread.messages[thread.messages.length - 1].text}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Billing Tab */}
        <TabsContent value="billing" className="space-y-6">
          <Card>
            <CardHeader className="pb-3 sm:pb-6">
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <DollarSign className="h-5 w-5" />
                Billing & Payments
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-4 sm:space-y-6">
                {/* Outstanding Balance */}
                <div className="p-3 sm:p-4 bg-muted/30 rounded-lg">
                  <h4 className="font-medium mb-2 text-sm sm:text-base">Outstanding Balance</h4>
                  <div className="text-xl sm:text-2xl font-bold text-red-600">
                    ${patient.billing.outstandingBalance.toFixed(2)}
                  </div>
                  <Button className="mt-2 w-full sm:w-auto">
                    <DollarSign className="h-4 w-4 mr-2" />
                    Record Payment
                  </Button>
                </div>

                {/* Last Payment */}
                <div>
                  <h4 className="font-medium mb-3 text-sm sm:text-base">Last Payment</h4>
                  <div className="p-3 sm:p-4 border rounded-lg">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
                      <div>
                        <p className="font-medium text-sm sm:text-base">${patient.billing.lastPayment.amount.toFixed(2)}</p>
                        <p className="text-xs sm:text-sm text-muted-foreground">
                          {patient.billing.lastPayment.date} • {patient.billing.lastPayment.method}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment History */}
                <div>
                  <h4 className="font-medium mb-3 text-sm sm:text-base">Payment History</h4>
                  <div className="space-y-2">
                    {patient.billing.paymentHistory.map((payment) => (
                      <div key={payment.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 border rounded-lg gap-2 sm:gap-0">
                        <div>
                          <p className="font-medium text-sm sm:text-base">${payment.amount.toFixed(2)}</p>
                          <p className="text-xs sm:text-sm text-muted-foreground break-words">{payment.description}</p>
                        </div>
                        <div className="text-left sm:text-right">
                          <p className="text-xs sm:text-sm font-medium">{payment.date}</p>
                          <p className="text-xs sm:text-sm text-muted-foreground">{payment.method}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Schedule Appointment Modal */}
      <Dialog open={isAppointmentModalOpen} onOpenChange={setIsAppointmentModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Schedule Appointment for {patient.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="appointment-date">Date</Label>
                <Input
                  id="appointment-date"
                  type="date"
                  value={appointmentData.date}
                  onChange={(e) => setAppointmentData(prev => ({ ...prev, date: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="appointment-time">Time</Label>
                <Input
                  id="appointment-time"
                  type="time"
                  value={appointmentData.time}
                  onChange={(e) => setAppointmentData(prev => ({ ...prev, time: e.target.value }))}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="appointment-type">Appointment Type</Label>
              <Select value={appointmentData.type} onValueChange={(value) => setAppointmentData(prev => ({ ...prev, type: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select appointment type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="consultation">Consultation</SelectItem>
                  <SelectItem value="follow-up">Follow-up</SelectItem>
                  <SelectItem value="procedure">Procedure</SelectItem>
                  <SelectItem value="emergency">Emergency</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="appointment-notes">Notes</Label>
              <Textarea
                id="appointment-notes"
                placeholder="Appointment notes..."
                value={appointmentData.notes}
                onChange={(e) => setAppointmentData(prev => ({ ...prev, notes: e.target.value }))}
              />
            </div>
          </div>
          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={() => setIsAppointmentModalOpen(false)} className="w-full sm:w-auto">
              Cancel
            </Button>
            <Button onClick={handleScheduleAppointment} className="w-full sm:w-auto">
              Schedule Appointment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Send Message Modal */}
      <Dialog open={isMessageModalOpen} onOpenChange={setIsMessageModalOpen}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Send Message to {patient.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="message-subject">Subject *</Label>
              <Input
                id="message-subject"
                placeholder="Enter message subject..."
                value={messageData.subject}
                onChange={(e) => setMessageData(prev => ({ ...prev, subject: e.target.value }))}
                className="mt-1"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="message-category">Category</Label>
                <Select value={messageData.category} onValueChange={(value) => setMessageData(prev => ({ ...prev, category: value }))}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="appointment">Appointment</SelectItem>
                    <SelectItem value="medication">Medication</SelectItem>
                    <SelectItem value="test-results">Test Results</SelectItem>
                    <SelectItem value="billing">Billing</SelectItem>
                    <SelectItem value="general">General</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="message-priority">Priority</Label>
                <Select value={messageData.priority} onValueChange={(value) => setMessageData(prev => ({ ...prev, priority: value }))}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="message-assigned">Assign To</Label>
                <Select value={messageData.assignedTo} onValueChange={(value) => setMessageData(prev => ({ ...prev, assignedTo: value }))}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Dr. Asif Ali">Dr. Asif Ali</SelectItem>
                    <SelectItem value="Dr. Sajid Ali">Dr. Sajid Ali</SelectItem>
                    <SelectItem value="Dr. Abdul Ali">Dr. Abdul Ali</SelectItem>
                    <SelectItem value="Billing Team">Billing Team</SelectItem>
                    <SelectItem value="Nursing Staff">Nursing Staff</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="message-content">Message *</Label>
              <Textarea
                id="message-content"
                placeholder="Enter the message content..."
                value={messageData.message}
                onChange={(e) => setMessageData(prev => ({ ...prev, message: e.target.value }))}
                rows={3}
                className="mt-1"
              />
            </div>
          </div>
          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={() => setIsMessageModalOpen(false)} className="w-full sm:w-auto">
              Cancel
            </Button>
            <Button 
              onClick={handleSendMessage}
              disabled={!messageData.subject.trim() || !messageData.message.trim()}
              className="w-full sm:w-auto"
            >
              <Send className="h-4 w-4 mr-2" />
              Send Message
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Create Prescription Modal */}
      <Dialog open={isPrescriptionModalOpen} onOpenChange={setIsPrescriptionModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Prescription for {patient.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="prescription-medication">Medication</Label>
              <Input
                id="prescription-medication"
                placeholder="Medication name..."
                value={prescriptionData.medication}
                onChange={(e) => setPrescriptionData(prev => ({ ...prev, medication: e.target.value }))}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="prescription-dosage">Dosage</Label>
                <Input
                  id="prescription-dosage"
                  placeholder="e.g., 10mg"
                  value={prescriptionData.dosage}
                  onChange={(e) => setPrescriptionData(prev => ({ ...prev, dosage: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="prescription-frequency">Frequency</Label>
                <Input
                  id="prescription-frequency"
                  placeholder="e.g., twice daily"
                  value={prescriptionData.frequency}
                  onChange={(e) => setPrescriptionData(prev => ({ ...prev, frequency: e.target.value }))}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="prescription-duration">Duration</Label>
              <Input
                id="prescription-duration"
                placeholder="e.g., 30 days"
                value={prescriptionData.duration}
                onChange={(e) => setPrescriptionData(prev => ({ ...prev, duration: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="prescription-notes">Notes</Label>
              <Textarea
                id="prescription-notes"
                placeholder="Prescription notes..."
                value={prescriptionData.notes}
                onChange={(e) => setPrescriptionData(prev => ({ ...prev, notes: e.target.value }))}
              />
            </div>
          </div>
          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={() => setIsPrescriptionModalOpen(false)} className="w-full sm:w-auto">
              Cancel
            </Button>
            <Button onClick={handleCreatePrescription} className="w-full sm:w-auto">
              Create Prescription
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Contact Information Edit Modal */}
      <Dialog open={isContactEditModalOpen} onOpenChange={setIsContactEditModalOpen}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Contact Information</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="contact-name">Full Name</Label>
                <Input
                  id="contact-name"
                  value={contactData.name}
                  onChange={(e) => setContactData(prev => ({ ...prev, name: e.target.value }))}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="contact-dob">Date of Birth</Label>
                <Input
                  id="contact-dob"
                  type="date"
                  value={contactData.dob}
                  onChange={(e) => setContactData(prev => ({ ...prev, dob: e.target.value }))}
                  className="mt-1"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="contact-email">Email</Label>
                <Input
                  id="contact-email"
                  type="email"
                  value={contactData.email}
                  onChange={(e) => setContactData(prev => ({ ...prev, email: e.target.value }))}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="contact-phone">Phone</Label>
                <Input
                  id="contact-phone"
                  value={contactData.phone}
                  onChange={(e) => setContactData(prev => ({ ...prev, phone: e.target.value }))}
                  className="mt-1"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="contact-address">Address</Label>
              <Textarea
                id="contact-address"
                value={contactData.address}
                onChange={(e) => setContactData(prev => ({ ...prev, address: e.target.value }))}
                rows={2}
                className="mt-1"
              />
            </div>
            <Separator />
            <div className="space-y-4">
              <h4 className="font-medium">Emergency Contact</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="emergency-name">Name</Label>
                  <Input
                    id="emergency-name"
                    value={contactData.emergencyContact.name}
                    onChange={(e) => setContactData(prev => ({ 
                      ...prev, 
                      emergencyContact: { ...prev.emergencyContact, name: e.target.value }
                    }))}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="emergency-relationship">Relationship</Label>
                  <Input
                    id="emergency-relationship"
                    value={contactData.emergencyContact.relationship}
                    onChange={(e) => setContactData(prev => ({ 
                      ...prev, 
                      emergencyContact: { ...prev.emergencyContact, relationship: e.target.value }
                    }))}
                    className="mt-1"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="emergency-phone">Phone</Label>
                <Input
                  id="emergency-phone"
                  value={contactData.emergencyContact.phone}
                  onChange={(e) => setContactData(prev => ({ 
                    ...prev, 
                    emergencyContact: { ...prev.emergencyContact, phone: e.target.value }
                  }))}
                  className="mt-1"
                />
              </div>
            </div>
          </div>
          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={() => setIsContactEditModalOpen(false)} className="w-full sm:w-auto">
              Cancel
            </Button>
            <Button onClick={handleUpdateContact} className="w-full sm:w-auto">
              Update Contact
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Insurance Information Edit Modal */}
      <Dialog open={isInsuranceEditModalOpen} onOpenChange={setIsInsuranceEditModalOpen}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Insurance Information</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="insurance-provider">Provider</Label>
                <Input
                  id="insurance-provider"
                  value={insuranceData.provider}
                  onChange={(e) => setInsuranceData(prev => ({ ...prev, provider: e.target.value }))}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="insurance-member-id">Member ID</Label>
                <Input
                  id="insurance-member-id"
                  value={insuranceData.memberId}
                  onChange={(e) => setInsuranceData(prev => ({ ...prev, memberId: e.target.value }))}
                  className="mt-1"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="insurance-group">Group</Label>
                <Input
                  id="insurance-group"
                  value={insuranceData.group}
                  onChange={(e) => setInsuranceData(prev => ({ ...prev, group: e.target.value }))}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="insurance-status">Insurance Status</Label>
                <Select value={insuranceData.status} onValueChange={(value) => setInsuranceData(prev => ({ ...prev, status: value }))}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="insurance-doctor">Assigned Doctor</Label>
                <Select value={insuranceData.assignedDoctor} onValueChange={(value) => setInsuranceData(prev => ({ ...prev, assignedDoctor: value }))}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Dr. Asif Ali">Dr. Asif Ali</SelectItem>
                    <SelectItem value="Dr. Sajid Ali">Dr. Sajid Ali</SelectItem>
                    <SelectItem value="Dr. Abdul Ali">Dr. Abdul Ali</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="insurance-patient-status">Patient Status</Label>
                <Select value={insuranceData.patientStatus} onValueChange={(value) => setInsuranceData(prev => ({ ...prev, patientStatus: value }))}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={() => setIsInsuranceEditModalOpen(false)} className="w-full sm:w-auto">
              Cancel
            </Button>
            <Button onClick={handleUpdateInsurance} className="w-full sm:w-auto">
              Update Insurance
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Medical Information Edit Modal */}
      <Dialog open={isMedicalEditModalOpen} onOpenChange={setIsMedicalEditModalOpen}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Medical Information</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div>
              <Label htmlFor="medical-conditions">Medical Conditions</Label>
              <div className="mt-2 space-y-2">
                {medicalData.conditions.map((condition, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={condition}
                      onChange={(e) => {
                        const newConditions = [...medicalData.conditions]
                        newConditions[index] = e.target.value
                        setMedicalData(prev => ({ ...prev, conditions: newConditions }))
                      }}
                      className="flex-1"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const newConditions = medicalData.conditions.filter((_, i) => i !== index)
                        setMedicalData(prev => ({ ...prev, conditions: newConditions }))
                      }}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setMedicalData(prev => ({ 
                    ...prev, 
                    conditions: [...prev.conditions, ""]
                  }))}
                >
                  Add Condition
                </Button>
              </div>
            </div>

            <div>
              <Label htmlFor="medical-allergies">Allergies</Label>
              <div className="mt-2 space-y-2">
                {medicalData.allergies.map((allergy, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={allergy}
                      onChange={(e) => {
                        const newAllergies = [...medicalData.allergies]
                        newAllergies[index] = e.target.value
                        setMedicalData(prev => ({ ...prev, allergies: newAllergies }))
                      }}
                      className="flex-1"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const newAllergies = medicalData.allergies.filter((_, i) => i !== index)
                        setMedicalData(prev => ({ ...prev, allergies: newAllergies }))
                      }}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setMedicalData(prev => ({ 
                    ...prev, 
                    allergies: [...prev.allergies, ""]
                  }))}
                >
                  Add Allergy
                </Button>
              </div>
            </div>

            <div>
              <Label htmlFor="medical-medications">Current Medications</Label>
              <div className="mt-2 space-y-2">
                {medicalData.medications.map((medication, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={medication}
                      onChange={(e) => {
                        const newMedications = [...medicalData.medications]
                        newMedications[index] = e.target.value
                        setMedicalData(prev => ({ ...prev, medications: newMedications }))
                      }}
                      className="flex-1"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const newMedications = medicalData.medications.filter((_, i) => i !== index)
                        setMedicalData(prev => ({ ...prev, medications: newMedications }))
                      }}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setMedicalData(prev => ({ 
                    ...prev, 
                    medications: [...prev.medications, ""]
                  }))}
                >
                  Add Medication
                </Button>
              </div>
            </div>
          </div>
          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={() => setIsMedicalEditModalOpen(false)} className="w-full sm:w-auto">
              Cancel
            </Button>
            <Button onClick={handleUpdateMedical} className="w-full sm:w-auto">
              Update Medical Info
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Message Thread View Modal */}
      <Dialog open={selectedThread !== null} onOpenChange={(open) => !open && setSelectedThread(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>Message Thread</DialogTitle>
          </DialogHeader>
          
          {selectedThread && (() => {
            const thread = patientMessages.find(t => t.id === selectedThread)
            if (!thread) return null
            
            return (
              <div className="flex-1 flex flex-col min-h-0">
                {/* Thread Header */}
                <div className="border-b pb-4 mb-4">
                  <h3 className="font-semibold text-lg">{thread.subject}</h3>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant={thread.status === "unread" ? "default" : "secondary"}>
                      {thread.status}
                    </Badge>
                    <Badge variant="outline">{thread.category}</Badge>
                    <Badge variant="outline">{thread.priority}</Badge>
                    <span className="text-sm text-muted-foreground">
                      Assigned to: {thread.assignedTo}
                    </span>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                  {thread.messages.map((message) => (
                    <div key={message.id} className={`flex gap-3 ${message.from === "admin" ? "justify-end" : "justify-start"}`}>
                      <div className={`flex gap-3 max-w-[70%] ${message.from === "admin" ? "flex-row-reverse" : "flex-row"}`}>
                        <Avatar className="h-8 w-8 flex-shrink-0">
                          <AvatarFallback className="text-xs">
                            {message.from === "patient" 
                              ? patient.name.split(" ").map((n: string) => n[0]).join("")
                              : thread.assignedTo.split(" ").map((n: string) => n[0]).join("")
                            }
                          </AvatarFallback>
                        </Avatar>
                        <div className={`flex flex-col ${message.from === "admin" ? "items-end" : "items-start"}`}>
                          <div className={`rounded-lg p-3 ${
                            message.from === "admin" 
                              ? "bg-primary text-primary-foreground" 
                              : "bg-muted"
                          }`}>
                            <p className="text-sm">{message.text}</p>
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-muted-foreground">
                              {message.sender}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {formatTimestamp(message.timestamp)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Reply Input */}
                <div className="border-t pt-4">
                  <div className="flex gap-2">
                    <Textarea
                      placeholder="Type your reply..."
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      className="flex-1"
                      rows={3}
                    />
                    <Button 
                      onClick={() => {
                        if (replyText.trim()) {
                          addReplyToThread(selectedThread, replyText.trim())
                          setReplyText("")
                        }
                      }}
                      disabled={!replyText.trim()}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            )
          })()}
        </DialogContent>
      </Dialog>


    </div>
  )
} 