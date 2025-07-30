"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import UserAddFillIcon from 'remixicon-react/UserAddFillIcon'
import User3FillIcon from 'remixicon-react/User3FillIcon'
import Calendar2FillIcon from 'remixicon-react/Calendar2FillIcon'
import FileTextFillIcon from 'remixicon-react/FileTextFillIcon'
import Message2FillIcon from 'remixicon-react/Message2FillIcon'
import CapsuleFillIcon from 'remixicon-react/CapsuleFillIcon'

import FilterFillIcon from 'remixicon-react/FilterFillIcon'
import DownloadFillIcon from 'remixicon-react/DownloadFillIcon'
import RefreshFillIcon from 'remixicon-react/RefreshFillIcon'
import { Search } from "lucide-react"

// Extended mock activity data
const allActivityData = [
  // Today's activities
  {
    id: 1,
    type: "registration",
    title: "New Patient Registration",
    description: "John Doe registered for the patient portal",
    time: "10:15 AM",
    date: "2024-01-15",
    user: "John Doe",
    avatar: "/placeholder-user.jpg",
    status: "completed",
    icon: UserAddFillIcon,
    color: "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800",
    category: "patient"
  },
  {
    id: 2,
    type: "appointment",
    title: "Appointment Booked",
    description: "Jane Smith scheduled a cardiology consultation",
    time: "10:30 AM",
    date: "2024-01-15",
    user: "Jane Smith",
    avatar: "/placeholder-user.jpg",
    status: "pending",
    icon: Calendar2FillIcon,
    color: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800",
    category: "appointment"
  },
  {
    id: 3,
    type: "prescription",
    title: "Prescription Request",
    description: "Alex Lee requested a prescription renewal",
    time: "11:00 AM",
    date: "2024-01-15",
    user: "Alex Lee",
    avatar: "/placeholder-user.jpg",
    status: "pending",
    icon: CapsuleFillIcon,
    color: "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-400 dark:border-purple-800",
    category: "prescription"
  },
  {
    id: 4,
    type: "message",
    title: "New Message",
    description: "Dr. Patel sent a message to patient",
    time: "11:15 AM",
    date: "2024-01-15",
    user: "Dr. Patel",
    avatar: "/dr-sajid-ali.png",
    status: "completed",
    icon: Message2FillIcon,
    color: "bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-400 dark:border-orange-800",
    category: "communication"
  },
  {
    id: 5,
    type: "document",
    title: "Document Uploaded",
    description: "Maria Garcia uploaded medical records",
    time: "11:45 AM",
    date: "2024-01-15",
    user: "Maria Garcia",
    avatar: "/placeholder-user.jpg",
    status: "completed",
    icon: FileTextFillIcon,
    color: "bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-400 dark:border-indigo-800",
    category: "document"
  },
  {
    id: 6,
    type: "care-plan",
    title: "Care Plan Created",
    description: "New care plan created for Sarah Johnson",
    time: "12:00 PM",
    date: "2024-01-15",
    user: "Dr. Asif Ali",
    avatar: "/dr-asif-ali.png",
    status: "completed",
    icon: CapsuleFillIcon,
    color: "bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-900/30 dark:text-teal-400 dark:border-teal-800",
    category: "care-plan"
  },
  // Yesterday's activities
  {
    id: 7,
    type: "registration",
    title: "New Patient Registration",
    description: "Michael Brown registered for the patient portal",
    time: "09:30 AM",
    date: "2024-01-14",
    user: "Michael Brown",
    avatar: "/placeholder-user.jpg",
    status: "completed",
    icon: UserAddFillIcon,
    color: "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800",
    category: "patient"
  },
  {
    id: 8,
    type: "appointment",
    title: "Appointment Cancelled",
    description: "Lisa Wilson cancelled her appointment",
    time: "02:15 PM",
    date: "2024-01-14",
    user: "Lisa Wilson",
    avatar: "/placeholder-user.jpg",
    status: "completed",
    icon: Calendar2FillIcon,
    color: "bg-red-50 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800",
    category: "appointment"
  },
  {
    id: 9,
    type: "prescription",
    title: "Prescription Approved",
    description: "Dr. Sajid Ali approved prescription for David Chen",
    time: "03:45 PM",
    date: "2024-01-14",
    user: "Dr. Sajid Ali",
    avatar: "/dr-sajid-ali.png",
    status: "completed",
    icon: CapsuleFillIcon,
    color: "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800",
    category: "prescription"
  },
  // Earlier activities
  {
    id: 10,
    type: "message",
    title: "Bulk Message Sent",
    description: "Dr. Abdul Ali sent reminder to 25 patients",
    time: "10:00 AM",
    date: "2024-01-13",
    user: "Dr. Abdul Ali",
    avatar: "/dr-abdul-ali.png",
    status: "completed",
    icon: Message2FillIcon,
    color: "bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-400 dark:border-orange-800",
    category: "communication"
  },
  {
    id: 11,
    type: "document",
    title: "Document Reviewed",
    description: "Dr. Asif Ali reviewed uploaded lab results",
    time: "11:30 AM",
    date: "2024-01-13",
    user: "Dr. Asif Ali",
    avatar: "/dr-asif-ali.png",
    status: "completed",
    icon: FileTextFillIcon,
    color: "bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-400 dark:border-indigo-800",
    category: "document"
  },
  {
    id: 12,
    type: "care-plan",
    title: "Care Plan Updated",
    description: "Care plan modified for Robert Davis",
    time: "04:20 PM",
    date: "2024-01-13",
    user: "Dr. Sajid Ali",
    avatar: "/dr-sajid-ali.png",
    status: "completed",
    icon: CapsuleFillIcon,
    color: "bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-900/30 dark:text-teal-400 dark:border-teal-800",
    category: "care-plan"
  }
]

export default function AdminActivityPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [activeTab, setActiveTab] = useState("all")

  // Filter activities based on search and filters
  const filteredActivities = allActivityData.filter(activity => {
    const matchesSearch = activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.user.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === "all" || activity.status === statusFilter
    const matchesCategory = categoryFilter === "all" || activity.category === categoryFilter
    
    return matchesSearch && matchesStatus && matchesCategory
  })

  const handleExport = () => {
    // Simulate export functionality
    console.log("Exporting activity data...")
  }

  const handleRefresh = () => {
    // Simulate refresh functionality
    console.log("Refreshing activity data...")
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Activity Log</h1>
          <p className="text-muted-foreground">Monitor all system activities and user interactions</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleRefresh} className="flex-1 sm:flex-none">
            <RefreshFillIcon className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" onClick={handleExport} className="flex-1 sm:flex-none">
            <DownloadFillIcon className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search activities..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="patient">Patient</SelectItem>
                  <SelectItem value="appointment">Appointment</SelectItem>
                  <SelectItem value="prescription">Prescription</SelectItem>
                  <SelectItem value="communication">Communication</SelectItem>
                  <SelectItem value="document">Document</SelectItem>
                  <SelectItem value="care-plan">Care Plan</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Activity List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>System Activities</CardTitle>
            <Badge variant="secondary">
              {filteredActivities.length} activities
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredActivities.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No activities found matching your criteria.
              </div>
            ) : (
              filteredActivities.map((activity) => {
                const Icon = activity.icon
                return (
                  <div key={activity.id} className="flex items-start gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors border">
                    {/* Activity Icon */}
                    <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center border ${activity.color}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    
                    {/* Activity Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-sm">{activity.title}</h3>
                            <Badge 
                              variant={activity.status === "completed" ? "default" : "secondary"}
                              className="text-xs"
                            >
                              {activity.status === "completed" ? "Completed" : "Pending"}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {activity.category}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{activity.description}</p>
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-6 w-6">
                                <AvatarImage src={activity.avatar} alt={activity.user} />
                                <AvatarFallback className="text-xs bg-muted text-muted-foreground">
                                  {activity.user.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <span className="text-xs text-muted-foreground">{activity.user}</span>
                            </div>
                            <span className="text-xs text-muted-foreground font-mono">
                              {activity.date} at {activity.time}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 