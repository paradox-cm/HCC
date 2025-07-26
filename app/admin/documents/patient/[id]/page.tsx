"use client"

import React, { useState, useRef } from "react"
import { useRouter, useParams } from "next/navigation"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  FileText, 
  Search, 
  Filter, 
  Upload, 
  Download, 
  Eye, 
  Trash2, 
  Archive, 
  User, 
  Calendar,
  ArrowLeft,
  Folder,
  Tag,
  CheckCircle,
  Clock,
  AlertCircle
} from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Mock patient data
const mockPatient = {
  id: "P001",
  name: "Sarah Johnson",
  email: "sarah.johnson@email.com",
  phone: "(555) 123-4567",
  dateOfBirth: "1985-03-15",
  assignedTo: "Dr. Asif Ali",
  lastVisit: "2024-01-15",
  documentCount: 8,
  pendingCount: 1,
  availableCount: 7
}

// Mock documents for this patient
const mockPatientDocuments = [
  {
    id: 1,
    name: "Cardiac Stress Test Results",
    type: "Test Result",
    date: "2024-01-15",
    status: "available",
    fileSize: "2.4 MB",
    uploadedBy: "Dr. Asif Ali",
    notes: "Stress test shows normal cardiac function",
    assignedTo: "Dr. Asif Ali"
  },
  {
    id: 2,
    name: "Echocardiogram Report",
    type: "Imaging",
    date: "2024-01-10",
    status: "available",
    fileSize: "5.1 MB",
    uploadedBy: "Dr. Asif Ali",
    notes: "Echo shows normal LV function, EF 55%",
    assignedTo: "Dr. Asif Ali"
  },
  {
    id: 3,
    name: "Lab Results - CBC Panel",
    type: "Lab Result",
    date: "2024-01-08",
    status: "available",
    fileSize: "1.2 MB",
    uploadedBy: "Lab Tech",
    notes: "All values within normal range",
    assignedTo: "Dr. Asif Ali"
  },
  {
    id: 4,
    name: "Chest X-Ray Images",
    type: "Imaging",
    date: "2024-01-05",
    status: "pending",
    fileSize: "8.7 MB",
    uploadedBy: "Radiology",
    notes: "Pending review by cardiologist",
    assignedTo: "Dr. Asif Ali"
  },
  {
    id: 5,
    name: "Holter Monitor Report",
    type: "Test Result",
    date: "2024-01-03",
    status: "available",
    fileSize: "3.8 MB",
    uploadedBy: "Dr. Asif Ali",
    notes: "24-hour monitoring shows normal sinus rhythm",
    assignedTo: "Dr. Asif Ali"
  },
  {
    id: 6,
    name: "Cardiac Catheterization Report",
    type: "Test Result",
    date: "2023-12-28",
    status: "available",
    fileSize: "4.2 MB",
    uploadedBy: "Dr. Asif Ali",
    notes: "Normal coronary arteries, no significant stenosis",
    assignedTo: "Dr. Asif Ali"
  },
  {
    id: 7,
    name: "EKG Results",
    type: "Test Result",
    date: "2023-12-20",
    status: "available",
    fileSize: "1.8 MB",
    uploadedBy: "Dr. Asif Ali",
    notes: "Normal sinus rhythm, no abnormalities",
    assignedTo: "Dr. Asif Ali"
  },
  {
    id: 8,
    name: "Blood Work Results",
    type: "Lab Result",
    date: "2023-12-15",
    status: "available",
    fileSize: "2.1 MB",
    uploadedBy: "Lab Tech",
    notes: "Cholesterol panel within normal limits",
    assignedTo: "Dr. Asif Ali"
  }
]

const documentTypes = [
  { value: "all", label: "All Types" },
  { value: "test", label: "Test Result" },
  { value: "lab", label: "Lab Result" },
  { value: "imaging", label: "Imaging" },
  { value: "report", label: "Report" },
  { value: "other", label: "Other" }
]

const documentStatuses = [
  { value: "all", label: "All Status" },
  { value: "available", label: "Available" },
  { value: "pending", label: "Pending Review" },
  { value: "reviewed", label: "Reviewed" },
  { value: "archived", label: "Archived" }
]

const assignedDoctors = [
  { value: "Dr. Asif Ali", label: "Dr. Asif Ali" },
  { value: "Dr. Sajid Ali", label: "Dr. Sajid Ali" },
  { value: "Dr. Abdul Ali", label: "Dr. Abdul Ali" }
]

export default function PatientDocumentProfile() {
  const router = useRouter()
  const params = useParams()
  const patientId = params.id as string
  
  const [documents, setDocuments] = useState(mockPatientDocuments)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedDocuments, setSelectedDocuments] = useState<number[]>([])
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false)
  const [uploadData, setUploadData] = useState({
    file: null as File | null,
    type: "test",
    assignedTo: "Dr. Asif Ali",
    notes: ""
  })
  const [uploadError, setUploadError] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Filter documents based on search and filters
  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === "all" || doc.type.toLowerCase().includes(selectedType)
    const matchesStatus = selectedStatus === "all" || doc.status === selectedStatus
    
    return matchesSearch && matchesType && matchesStatus
  })

  const handleUpload = () => {
    if (!uploadData.file) {
      setUploadError("Please select a file.")
      return
    }

    const newDocument = {
      id: documents.length + 1,
      name: uploadData.file.name,
      type: documentTypes.find(t => t.value === uploadData.type)?.label || "Other",
      date: new Date().toISOString().slice(0, 10),
      status: "available",
      fileSize: `${(uploadData.file.size / (1024 * 1024)).toFixed(1)} MB`,
      uploadedBy: "Admin",
      notes: uploadData.notes,
      assignedTo: uploadData.assignedTo
    }

    setDocuments(prev => [newDocument, ...prev])
    setIsUploadDialogOpen(false)
    setUploadData({ file: null, type: "test", assignedTo: "Dr. Asif Ali", notes: "" })
    setUploadError("")
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  const handleBulkAction = (action: string) => {
    if (selectedDocuments.length === 0) return

    setDocuments(prev => prev.map(doc => {
      if (selectedDocuments.includes(doc.id)) {
        switch (action) {
          case "archive":
            return { ...doc, status: "archived" }
          case "delete":
            return { ...doc, status: "deleted" }
          case "mark-reviewed":
            return { ...doc, status: "reviewed" }
          default:
            return doc
        }
      }
      return doc
    }))
    setSelectedDocuments([])
  }

  const toggleDocumentSelection = (docId: number) => {
    setSelectedDocuments(prev => 
      prev.includes(docId) 
        ? prev.filter(id => id !== docId)
        : [...prev, docId]
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available": return "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800"
      case "pending": return "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800"
      case "reviewed": return "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800"
      case "archived": return "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700"
      default: return "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700"
    }
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Patients
        </Button>
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12">
            <AvatarFallback className="bg-primary/10 text-primary">
              {mockPatient.name.split(" ").map(n => n[0]).join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">{mockPatient.name}</h1>
            <p className="text-muted-foreground">Patient Documents</p>
          </div>
        </div>
      </div>

      {/* Patient Info Card */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium">{mockPatient.email}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Phone</p>
              <p className="font-medium">{mockPatient.phone}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Assigned to</p>
              <p className="font-medium">{mockPatient.assignedTo}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Last visit</p>
              <p className="font-medium">{mockPatient.lastVisit}</p>
            </div>
          </div>
          <div className="flex gap-4 mt-4">
            <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800">
              {mockPatient.documentCount} total documents
            </Badge>
            <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800">
              {mockPatient.availableCount} available
            </Badge>
            {mockPatient.pendingCount > 0 && (
              <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800">
                {mockPatient.pendingCount} pending
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Actions and Filters */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Upload className="h-4 w-4" />
                Upload Document
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Upload Document for {mockPatient.name}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">File <span className="text-red-600">*</span></label>
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                      className="min-w-[120px]"
                    >
                      Choose File
                    </Button>
                    <span className="text-sm text-muted-foreground truncate max-w-[120px]">
                      {uploadData.file ? uploadData.file.name : "No file selected"}
                    </span>
                  </div>
                  <Input
                    type="file"
                    accept="application/pdf,image/*,.doc,.docx"
                    ref={fileInputRef}
                    onChange={e => setUploadData(u => ({ ...u, file: e.target.files?.[0] || null }))}
                    className="hidden"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Document Type</label>
                  <Select value={uploadData.type} onValueChange={(value) => setUploadData(u => ({ ...u, type: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {documentTypes.filter(t => t.value !== "all").map(type => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Assign To</label>
                  <Select value={uploadData.assignedTo} onValueChange={(value) => setUploadData(u => ({ ...u, assignedTo: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {assignedDoctors.map(doctor => (
                        <SelectItem key={doctor.value} value={doctor.value}>
                          {doctor.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Notes (optional)</label>
                  <Textarea
                    placeholder="Add notes about this document..."
                    value={uploadData.notes}
                    onChange={e => setUploadData(u => ({ ...u, notes: e.target.value }))}
                    rows={3}
                  />
                </div>
                {uploadError && <div className="text-sm text-red-600">{uploadError}</div>}
                <div className="flex gap-2 pt-2">
                  <Button onClick={handleUpload} className="flex-1">Upload</Button>
                  <Button variant="outline" onClick={() => setIsUploadDialogOpen(false)}>Cancel</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger>
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                {documentTypes.map(type => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                {documentStatuses.map(status => (
                  <SelectItem key={status.value} value={status.value}>
                    {status.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedDocuments.length > 0 && (
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => handleBulkAction("mark-reviewed")}>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Mark Reviewed
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleBulkAction("archive")}>
                  <Archive className="h-4 w-4 mr-2" />
                  Archive
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleBulkAction("delete")}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Documents List */}
      <div className="space-y-4">
        {filteredDocuments.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium mb-2">No documents found</p>
              <p className="text-sm">Try adjusting your search or filters</p>
            </CardContent>
          </Card>
        ) : (
          filteredDocuments.map(doc => (
            <Card key={doc.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={selectedDocuments.includes(doc.id)}
                        onChange={() => toggleDocumentSelection(doc.id)}
                        className="rounded border-gray-300"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <FileText className="h-5 w-5 text-primary" />
                        <h3 className="font-semibold text-lg truncate">{doc.name}</h3>
                        <Badge className={`text-xs ${getStatusColor(doc.status)}`}>
                          {doc.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Tag className="h-4 w-4" />
                          <span>{doc.type}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>{doc.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          <span>{doc.assignedTo}</span>
                        </div>
                      </div>
                      <div className="mt-2 text-xs text-muted-foreground">
                        <span className="mr-4">Size: {doc.fileSize}</span>
                        <span className="mr-4">Uploaded by: {doc.uploadedBy}</span>
                      </div>
                      {doc.notes && (
                        <div className="mt-2 text-xs text-muted-foreground italic">
                          Notes: {doc.notes}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>View Document</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Download</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
} 