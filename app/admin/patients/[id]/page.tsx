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
  Send
} from "lucide-react"

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
  }
}

export default function AdminPatientDetailPage() {
  const params = useParams()
  const router = useRouter()
  const patient = MOCK_PATIENT // In real app, fetch by ID

  // State for modals
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false)
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false)
  const [isPrescriptionModalOpen, setIsPrescriptionModalOpen] = useState(false)

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
    priority: "normal"
  })

  const [prescriptionData, setPrescriptionData] = useState({
    medication: "",
    dosage: "",
    frequency: "",
    duration: "",
    notes: ""
  })

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
    // In real app, this would create an appointment
    console.log("Scheduling appointment for:", patient.name, appointmentData)
    setIsAppointmentModalOpen(false)
    setAppointmentData({
      date: "",
      time: "",
      type: "",
      notes: "",
      doctor: patient.assignedDoctor
    })
    // You could navigate to appointments page with this patient pre-selected
    // router.push(`/admin/appointments?patient=${patient.id}&action=create`)
  }

  const handleSendMessage = () => {
    // In real app, this would send a message
    console.log("Sending message to:", patient.name, messageData)
    setIsMessageModalOpen(false)
    setMessageData({
      subject: "",
      message: "",
      priority: "normal"
    })
    // You could navigate to messages page with this patient pre-selected
    // router.push(`/admin/messages?patient=${patient.id}&action=compose`)
  }

  const handleCreatePrescription = () => {
    // In real app, this would create a prescription
    console.log("Creating prescription for:", patient.name, prescriptionData)
    setIsPrescriptionModalOpen(false)
    setPrescriptionData({
      medication: "",
      dosage: "",
      frequency: "",
      duration: "",
      notes: ""
    })
    // You could navigate to prescriptions page with this patient pre-selected
    // router.push(`/admin/prescriptions?patient=${patient.id}&action=create`)
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-6">
        <Button variant="ghost" size="icon" onClick={() => router.push("/admin/patients")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <span className="text-sm text-muted-foreground">Patients</span>
        <span className="mx-2 text-sm text-muted-foreground">/</span>
        <span className="font-semibold text-sm">{patient.name}</span>
      </div>

      {/* Patient Header */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-start gap-6">
            <Avatar className="h-20 w-20">
              <AvatarFallback className="text-lg">
                {patient.name.split(" ").map(n => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            
          <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{patient.name}</h1>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      DOB: {patient.dob}
                    </div>
                    <div className="flex items-center gap-1">
                      <Mail className="h-4 w-4" />
                      {patient.email}
                    </div>
                    <div className="flex items-center gap-1">
                      <Phone className="h-4 w-4" />
                      {patient.phone}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={patient.status === "Active" ? "default" : "secondary"}>
                      {patient.status}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      Assigned to {patient.assignedDoctor}
                    </span>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setIsAppointmentModalOpen(true)}
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Appointment
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setIsMessageModalOpen(true)}
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Quick Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{patient.quickStats.totalAppointments}</div>
                  <div className="text-sm text-muted-foreground">Total Appointments</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600">{patient.quickStats.pendingDocuments}</div>
                  <div className="text-sm text-muted-foreground">Pending Documents</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{patient.quickStats.activePrescriptions}</div>
                  <div className="text-sm text-muted-foreground">Active Prescriptions</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">{patient.quickStats.unreadMessages}</div>
                  <div className="text-sm text-muted-foreground">Unread Messages</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {patient.recentActivity.map((activity) => {
                  const Icon = getActivityIcon(activity.type)
                  return (
                    <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg border">
                      <Icon className={`h-5 w-5 mt-0.5 ${getActivityColor(activity.status)}`} />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{activity.title}</h4>
                          <Badge variant={activity.status === "completed" ? "default" : "secondary"}>
                            {activity.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{activity.description}</p>
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
        <div className="space-y-6">
          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center gap-2 text-sm font-medium mb-1">
                  <MapPin className="h-4 w-4" />
                  Address
                </div>
                <p className="text-sm text-muted-foreground">{patient.address}</p>
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
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Insurance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <div className="text-sm font-medium">Provider</div>
                <div className="text-sm text-muted-foreground">{patient.insurance.provider}</div>
              </div>
              <div>
                <div className="text-sm font-medium">Member ID</div>
                <div className="text-sm text-muted-foreground">{patient.insurance.memberId}</div>
              </div>
              <div>
                <div className="text-sm font-medium">Group</div>
                <div className="text-sm text-muted-foreground">{patient.insurance.group}</div>
              </div>
              <Badge variant={patient.insurance.status === "Active" ? "default" : "secondary"}>
                {patient.insurance.status}
              </Badge>
            </CardContent>
          </Card>

          {/* Medical Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HeartPulse className="h-5 w-5" />
                Medical Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-sm font-medium mb-2">Conditions</div>
                <div className="space-y-1">
                  {patient.medicalHistory.conditions.map((condition, index) => (
                    <Badge key={index} variant="outline" className="mr-1 mb-1">
                      {condition}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <div className="text-sm font-medium mb-2">Allergies</div>
                <div className="space-y-1">
                  {patient.medicalHistory.allergies.map((allergy, index) => (
                    <Badge key={index} variant="destructive" className="mr-1 mb-1">
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
                      <Pill className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">{medication}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => setIsAppointmentModalOpen(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Appointment
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => setIsMessageModalOpen(true)}
              >
                <Send className="h-4 w-4 mr-2" />
                <MessageSquare className="h-4 w-4 mr-2" />
                Send Message
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => setIsPrescriptionModalOpen(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                <Pill className="h-4 w-4 mr-2" />
                Create Prescription
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href={`/admin/documents/patient/${patient.id}`}>
                  <FileText className="h-4 w-4 mr-2" />
                  View Documents
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href={`/admin/billing?patient=${patient.id}`}>
                  <DollarSign className="h-4 w-4 mr-2" />
                  View Billing
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

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
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAppointmentModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleScheduleAppointment}>
              Schedule Appointment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Send Message Modal */}
      <Dialog open={isMessageModalOpen} onOpenChange={setIsMessageModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send Message to {patient.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="message-subject">Subject</Label>
              <Input
                id="message-subject"
                placeholder="Message subject..."
                value={messageData.subject}
                onChange={(e) => setMessageData(prev => ({ ...prev, subject: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="message-priority">Priority</Label>
              <Select value={messageData.priority} onValueChange={(value) => setMessageData(prev => ({ ...prev, priority: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="message-content">Message</Label>
              <Textarea
                id="message-content"
                placeholder="Type your message..."
                value={messageData.message}
                onChange={(e) => setMessageData(prev => ({ ...prev, message: e.target.value }))}
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsMessageModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSendMessage}>
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
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPrescriptionModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreatePrescription}>
              Create Prescription
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
} 