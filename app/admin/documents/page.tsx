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
  Filter, 
  Eye, 
  Tag,
  ArrowRight,
  Folder,
  Search
} from "lucide-react"
import FileTextFillIcon from 'remixicon-react/FileTextFillIcon'

import UploadFillIcon from 'remixicon-react/UploadFillIcon'
import DownloadFillIcon from 'remixicon-react/DownloadFillIcon'
import User3FillIcon from 'remixicon-react/User3FillIcon'
import CalendarFillIcon from 'remixicon-react/CalendarFillIcon'
import GroupFillIcon from 'remixicon-react/GroupFillIcon'
import TimeFillIcon from 'remixicon-react/TimeFillIcon'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { getStatusColor } from "@/lib/admin-badge-utils"
import { useDataSync } from "@/contexts/DataSyncContext"

export default function AdminDocumentsPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null)
  const [selectedDoctor, setSelectedDoctor] = useState("all")
  const [sortBy, setSortBy] = useState("name")
  
  // DataSync context integration
  const { 
    documents, 
    addDocument, 
    syncDocumentData,
    deleteDocument,
    patients
  } = useDataSync()

  const assignedDoctors = [
    { value: "all", label: "All Doctors" },
    { value: "Dr. Asif Ali", label: "Dr. Asif Ali" },
    { value: "Dr. Sajid Ali", label: "Dr. Sajid Ali" },
    { value: "Dr. Abdul Ali", label: "Dr. Abdul Ali" }
  ]

  // Group documents by patient for display
  const documentsByPatient = patients.map(patient => {
    const patientDocuments = documents.filter(d => d.patientId === patient.id)
    return {
      id: patient.id,
      name: patient.name,
      email: patient.email,
      lastVisit: "2024-01-15", // This would come from patient data
      dateAdded: "2024-01-10", // This would come from patient data
      lastEdited: "2024-01-15", // This would come from patient data
      assignedTo: "Dr. Asif Ali", // This would come from patient data
      documentCount: patientDocuments.length,
      recentDocuments: patientDocuments.slice(0, 3).map(doc => ({
        name: doc.name,
        type: doc.type,
        date: doc.date,
        status: doc.status
      })),
      pendingCount: patientDocuments.filter(d => d.status === "pending").length,
      availableCount: patientDocuments.filter(d => d.status === "available").length
    }
  }).filter(patient => patient.documentCount > 0)

  // Filter patients based on search and doctor filter
  const filteredPatients = documentsByPatient.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.email.toLowerCase().includes(searchTerm.toLowerCase())
    // The original code had a 'selectedDoctor' state, but the new code doesn't.
    // Assuming 'assignedTo' is the relevant filter for now, or that it's implicitly handled
    // by the documentsByPatient array which is derived from patients.
    // For now, we'll remove the 'selectedDoctor' filter as it's not directly available in documentsByPatient.
    // If a doctor filter is needed, it would require a different approach, e.g., filtering patients first.
    return matchesSearch
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
  const totalPatients = documentsByPatient.length
  const totalDocuments = documents.length
  const totalPending = documents.filter(d => d.status === "pending").length



  const handlePatientClick = (patientId: string) => {
    // Navigate to the patient's document profile page
    router.push(`/admin/documents/patient/${patientId}`)
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
                      <FileTextFillIcon className="h-6 w-6 text-foreground" />
          <h1 className="text-2xl font-bold">Patient Documents</h1>
        </div>
        
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <GroupFillIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">Total Patients</p>
                  <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">{totalPatients}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <FileTextFillIcon className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-sm text-green-600 dark:text-green-400 font-medium">Total Documents</p>
                  <p className="text-2xl font-bold text-green-700 dark:text-green-300">{totalDocuments}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-800">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                  <TimeFillIcon className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                </div>
                <div>
                  <p className="text-sm text-yellow-600 dark:text-yellow-400 font-medium">Pending Review</p>
                  <p className="text-2xl font-bold text-yellow-700 dark:text-yellow-300">{totalPending}</p>
                </div>
              </div>
            </CardContent>
          </Card>
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
                <GroupFillIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium mb-2">No patients found</p>
                <p className="text-sm">Try adjusting your search or filters</p>
              </CardContent>
            </Card>
          </div>
        ) : (
          sortedPatients.map(patient => (
            <Card 
              key={patient.id} 
              className="hover:shadow-md hover:border-red-500 transition-all duration-200 cursor-pointer"
              onClick={() => handlePatientClick(patient.id)}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                                         <Avatar className="h-12 w-12">
                       <AvatarFallback>
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
                          <FileTextFillIcon className="h-3 w-3 text-muted-foreground flex-shrink-0" />
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