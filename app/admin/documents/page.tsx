"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  FileText, 
  Search, 
  Filter, 
  Upload, 
  Download, 
  Eye, 
  User,
  Calendar,
  FileText as FileTextIcon,
  Users,
  Tag,
  ArrowRight,
  Folder
} from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Mock data for patients with their document summaries
const mockPatients = [
  {
    id: "P001",
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    lastVisit: "2024-01-15",
    dateAdded: "2024-01-10",
    lastEdited: "2024-01-15",
    assignedTo: "Dr. Asif Ali",
    documentCount: 8,
    recentDocuments: [
      { name: "Cardiac Stress Test Results", type: "Test Result", date: "2024-01-15", status: "available" },
      { name: "Echocardiogram Report", type: "Imaging", date: "2024-01-10", status: "available" },
      { name: "Lab Results - CBC Panel", type: "Lab Result", date: "2024-01-08", status: "available" }
    ],
    pendingCount: 1,
    availableCount: 7
  },
  {
    id: "P002",
    name: "Michael Chen",
    email: "michael.chen@email.com",
    lastVisit: "2024-01-14",
    dateAdded: "2024-01-08",
    lastEdited: "2024-01-14",
    assignedTo: "Dr. Sajid Ali",
    documentCount: 5,
    recentDocuments: [
      { name: "Echocardiogram Report", type: "Imaging", date: "2024-01-14", status: "pending" },
      { name: "Chest X-Ray Images", type: "Imaging", date: "2024-01-12", status: "reviewed" },
      { name: "Holter Monitor Report", type: "Test Result", date: "2024-01-10", status: "available" }
    ],
    pendingCount: 1,
    availableCount: 4
  },
  {
    id: "P003",
    name: "Emily Rodriguez",
    email: "emily.rodriguez@email.com",
    lastVisit: "2024-01-13",
    dateAdded: "2024-01-05",
    lastEdited: "2024-01-13",
    assignedTo: "Dr. Abdul Ali",
    documentCount: 12,
    recentDocuments: [
      { name: "Lab Results - CBC Panel", type: "Lab Result", date: "2024-01-13", status: "available" },
      { name: "Cardiac Catheterization Report", type: "Test Result", date: "2024-01-11", status: "available" },
      { name: "Stress Test Results", type: "Test Result", date: "2024-01-09", status: "available" }
    ],
    pendingCount: 0,
    availableCount: 12
  },
  {
    id: "P004",
    name: "Robert Wilson",
    email: "robert.wilson@email.com",
    lastVisit: "2024-01-12",
    dateAdded: "2024-01-03",
    lastEdited: "2024-01-12",
    assignedTo: "Dr. Asif Ali",
    documentCount: 6,
    recentDocuments: [
      { name: "Chest X-Ray Images", type: "Imaging", date: "2024-01-12", status: "reviewed" },
      { name: "EKG Results", type: "Test Result", date: "2024-01-10", status: "available" },
      { name: "Blood Work Results", type: "Lab Result", date: "2024-01-08", status: "available" }
    ],
    pendingCount: 0,
    availableCount: 6
  },
  {
    id: "P005",
    name: "Lisa Thompson",
    email: "lisa.thompson@email.com",
    lastVisit: "2024-01-11",
    dateAdded: "2024-01-02",
    lastEdited: "2024-01-11",
    assignedTo: "Dr. Sajid Ali",
    documentCount: 9,
    recentDocuments: [
      { name: "Holter Monitor Report", type: "Test Result", date: "2024-01-11", status: "available" },
      { name: "Echocardiogram Images", type: "Imaging", date: "2024-01-09", status: "available" },
      { name: "Cardiac Stress Test", type: "Test Result", date: "2024-01-07", status: "available" }
    ],
    pendingCount: 2,
    availableCount: 7
  },
  {
    id: "P006",
    name: "David Martinez",
    email: "david.martinez@email.com",
    lastVisit: "2024-01-10",
    dateAdded: "2024-01-01",
    lastEdited: "2024-01-10",
    assignedTo: "Dr. Abdul Ali",
    documentCount: 3,
    recentDocuments: [
      { name: "Initial Consultation Notes", type: "Report", date: "2024-01-10", status: "available" },
      { name: "Lab Results", type: "Lab Result", date: "2024-01-08", status: "available" }
    ],
    pendingCount: 0,
    availableCount: 3
  },
  {
    id: "P007",
    name: "Jennifer Lee",
    email: "jennifer.lee@email.com",
    lastVisit: "2024-01-09",
    dateAdded: "2023-12-30",
    lastEdited: "2024-01-09",
    assignedTo: "Dr. Asif Ali",
    documentCount: 7,
    recentDocuments: [
      { name: "Cardiac MRI Report", type: "Imaging", date: "2024-01-09", status: "pending" },
      { name: "Stress Test Results", type: "Test Result", date: "2024-01-07", status: "available" },
      { name: "EKG Results", type: "Test Result", date: "2024-01-05", status: "available" }
    ],
    pendingCount: 1,
    availableCount: 6
  },
  {
    id: "P008",
    name: "Thomas Brown",
    email: "thomas.brown@email.com",
    lastVisit: "2024-01-08",
    dateAdded: "2023-12-28",
    lastEdited: "2024-01-08",
    assignedTo: "Dr. Sajid Ali",
    documentCount: 4,
    recentDocuments: [
      { name: "Echocardiogram Report", type: "Imaging", date: "2024-01-08", status: "available" },
      { name: "Lab Results", type: "Lab Result", date: "2024-01-06", status: "available" }
    ],
    pendingCount: 0,
    availableCount: 4
  }
]

const assignedDoctors = [
  { value: "all", label: "All Doctors" },
  { value: "Dr. Asif Ali", label: "Dr. Asif Ali" },
  { value: "Dr. Sajid Ali", label: "Dr. Sajid Ali" },
  { value: "Dr. Abdul Ali", label: "Dr. Abdul Ali" }
]

export default function AdminDocumentsPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDoctor, setSelectedDoctor] = useState("all")
  const [sortBy, setSortBy] = useState("name")

  // Filter patients based on search and doctor filter
  const filteredPatients = mockPatients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDoctor = selectedDoctor === "all" || patient.assignedTo === selectedDoctor
    
    return matchesSearch && matchesDoctor
  })

  // Sort patients
  const sortedPatients = [...filteredPatients].sort((a, b) => {
    switch (sortBy) {
      case "name":
        // Sort by last name
        const aLastName = a.name.split(" ").pop() || ""
        const bLastName = b.name.split(" ").pop() || ""
        return aLastName.localeCompare(bLastName)
      case "dateAdded":
        return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
      case "lastEdited":
        return new Date(b.lastEdited).getTime() - new Date(a.lastEdited).getTime()
      case "lastVisit":
        return new Date(b.lastVisit).getTime() - new Date(a.lastVisit).getTime()
      case "documentCount":
        return b.documentCount - a.documentCount
      case "pendingCount":
        return b.pendingCount - a.pendingCount
      default:
        return 0
    }
  })

  // Counts for header badges
  const totalPatients = mockPatients.length
  const totalDocuments = mockPatients.reduce((sum, patient) => sum + patient.documentCount, 0)
  const totalPending = mockPatients.reduce((sum, patient) => sum + patient.pendingCount, 0)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available": return "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800"
      case "pending": return "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800"
      case "reviewed": return "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800"
      default: return "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700"
    }
  }

  const handlePatientClick = (patientId: string) => {
    // Navigate to the patient's document profile page
    router.push(`/admin/documents/patient/${patientId}`)
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Users className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold">Patient Documents</h1>
          <div className="flex gap-2 ml-4">
            <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800">
              {totalPatients} patients
            </Badge>
            <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800">
              {totalDocuments} documents
            </Badge>
            {totalPending > 0 && (
              <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800">
                {totalPending} pending
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search patients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedDoctor} onValueChange={setSelectedDoctor}>
              <SelectTrigger>
                <SelectValue placeholder="Doctor" />
              </SelectTrigger>
              <SelectContent>
                {assignedDoctors.map(doctor => (
                  <SelectItem key={doctor.value} value={doctor.value}>
                    {doctor.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Alphabetical</SelectItem>
                <SelectItem value="dateAdded">Date Added</SelectItem>
                <SelectItem value="lastEdited">Recently Edited</SelectItem>
                <SelectItem value="lastVisit">Last Visit</SelectItem>
                <SelectItem value="documentCount">Document Count</SelectItem>
                <SelectItem value="pendingCount">Pending Count</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Patients List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedPatients.length === 0 ? (
          <div className="col-span-full">
            <Card>
              <CardContent className="py-12 text-center text-muted-foreground">
                <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium mb-2">No patients found</p>
                <p className="text-sm">Try adjusting your search or filters</p>
              </CardContent>
            </Card>
          </div>
        ) : (
          sortedPatients.map(patient => (
            <Card 
              key={patient.id} 
              className="hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => handlePatientClick(patient.id)}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {patient.name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-lg">{patient.name}</h3>
                      <p className="text-sm text-muted-foreground">{patient.email}</p>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground" />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Assigned to:</span>
                    <span className="font-medium">{patient.assignedTo}</span>
                  </div>
                  
                                     <div className="flex items-center justify-between text-sm">
                     <span className="text-muted-foreground">Last visit:</span>
                     <span>{patient.lastVisit}</span>
                   </div>
                   <div className="flex items-center justify-between text-sm">
                     <span className="text-muted-foreground">Added:</span>
                     <span>{patient.dateAdded}</span>
                   </div>

                  <div className="flex items-center gap-2">
                    <Folder className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">{patient.documentCount} documents</span>
                    {patient.pendingCount > 0 && (
                      <Badge className={`text-xs ${getStatusColor("pending")}`}>
                        {patient.pendingCount} pending
                      </Badge>
                    )}
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground font-medium">Recent Documents:</p>
                    {patient.recentDocuments.slice(0, 2).map((doc, index) => (
                      <div key={index} className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2 min-w-0 flex-1">
                          <FileText className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                          <span className="truncate">{doc.name}</span>
                        </div>
                        <Badge className={`text-xs ${getStatusColor(doc.status)}`}>
                          {doc.status}
                        </Badge>
                      </div>
                    ))}
                    {patient.recentDocuments.length > 2 && (
                      <p className="text-xs text-muted-foreground">
                        +{patient.recentDocuments.length - 2} more documents
                      </p>
                    )}
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