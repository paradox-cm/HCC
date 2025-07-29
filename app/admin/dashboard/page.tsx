"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import BarChart2FillIcon from 'remixicon-react/BarChart2FillIcon';
import UserAddFillIcon from 'remixicon-react/UserAddFillIcon';
import User3FillIcon from 'remixicon-react/User3FillIcon';
import Calendar2FillIcon from 'remixicon-react/Calendar2FillIcon';
import FileTextFillIcon from 'remixicon-react/FileTextFillIcon';
import Message2FillIcon from 'remixicon-react/Message2FillIcon';
import CapsuleFillIcon from 'remixicon-react/CapsuleFillIcon';
import { useState, useRef, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Search, User } from "lucide-react"
import { useRouter } from "next/navigation"

const quickLinks = [
  { href: "/admin/patients", label: "Manage Patients", icon: User3FillIcon },
  { href: "/admin/appointments", label: "Appointments", icon: Calendar2FillIcon },
  { href: "/admin/prescriptions", label: "Prescriptions", icon: CapsuleFillIcon },
  { href: "/admin/messages", label: "Messages", icon: Message2FillIcon },
  { href: "/admin/documents", label: "Documents", icon: FileTextFillIcon },
  { href: "/admin/billing", label: "Billing & Insurance", icon: BarChart2FillIcon },
  { href: "/admin/care-plans", label: "Care Plans", icon: CapsuleFillIcon },
]

// Mock patient data for search
const mockPatients = [
  { id: 1, name: "Sarah Johnson", email: "sarah.johnson@email.com", phone: "(555) 123-4567" },
  { id: 2, name: "Michael Chen", email: "michael.chen@email.com", phone: "(555) 234-5678" },
  { id: 3, name: "Emily Rodriguez", email: "emily.rodriguez@email.com", phone: "(555) 345-6789" },
  { id: 4, name: "Robert Wilson", email: "robert.wilson@email.com", phone: "(555) 456-7890" },
  { id: 5, name: "Lisa Thompson", email: "lisa.thompson@email.com", phone: "(555) 567-8901" },
  { id: 6, name: "David Martinez", email: "david.martinez@email.com", phone: "(555) 678-9012" },
  { id: 7, name: "Jennifer Lee", email: "jennifer.lee@email.com", phone: "(555) 789-0123" },
  { id: 8, name: "Thomas Brown", email: "thomas.brown@email.com", phone: "(555) 890-1234" },
  { id: 9, name: "Amanda Davis", email: "amanda.davis@email.com", phone: "(555) 901-2345" },
  { id: 10, name: "Christopher Garcia", email: "christopher.garcia@email.com", phone: "(555) 012-3456" },
]

// Mock activity data
const recentActivity = [
  {
    id: 1,
    type: "registration",
    title: "New Patient Registration",
    description: "John Doe registered for the patient portal",
    time: "10:15 AM",
    user: "John Doe",
    avatar: "/placeholder-user.jpg",
    status: "completed",
    icon: UserAddFillIcon,
    color: "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800"
  },
  {
    id: 2,
    type: "appointment",
    title: "Appointment Booked",
    description: "Jane Smith scheduled a cardiology consultation",
    time: "10:30 AM",
    user: "Jane Smith",
    avatar: "/placeholder-user.jpg",
    status: "pending",
    icon: Calendar2FillIcon,
    color: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800"
  },
  {
    id: 3,
    type: "prescription",
    title: "Prescription Request",
    description: "Alex Lee requested a prescription renewal",
    time: "11:00 AM",
    user: "Alex Lee",
    avatar: "/placeholder-user.jpg",
    status: "pending",
    icon: CapsuleFillIcon,
    color: "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-400 dark:border-purple-800"
  },
  {
    id: 4,
    type: "message",
    title: "New Message",
    description: "Dr. Patel sent a message to patient",
    time: "11:15 AM",
    user: "Dr. Patel",
    avatar: "/dr-sajid-ali.png",
    status: "completed",
    icon: Message2FillIcon,
    color: "bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-400 dark:border-orange-800"
  },
  {
    id: 5,
    type: "document",
    title: "Document Uploaded",
    description: "Maria Garcia uploaded medical records",
    time: "11:45 AM",
    user: "Maria Garcia",
    avatar: "/placeholder-user.jpg",
    status: "completed",
    icon: FileTextFillIcon,
    color: "bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-400 dark:border-indigo-800"
  },
  {
    id: 6,
    type: "care-plan",
    title: "Care Plan Created",
    description: "New care plan created for Sarah Johnson",
    time: "12:00 PM",
    user: "Dr. Asif Ali",
    avatar: "/dr-asif-ali.png",
    status: "completed",
    icon: CapsuleFillIcon,
    color: "bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-900/30 dark:text-teal-400 dark:border-teal-800"
  }
]

export default function AdminDashboardPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState<typeof mockPatients>([])
  const [showSearchResults, setShowSearchResults] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  // Handle click outside to close search results
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchResults(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    if (term.trim() === "") {
      setSearchResults([])
      setShowSearchResults(false)
      return
    }

    const filtered = mockPatients.filter(patient =>
      patient.name.toLowerCase().includes(term.toLowerCase()) ||
      patient.email.toLowerCase().includes(term.toLowerCase()) ||
      patient.phone.includes(term)
    )
    setSearchResults(filtered)
    setShowSearchResults(true)
  }

  const handlePatientSelect = (patientId: number) => {
    router.push(`/admin/patients/${patientId}`)
    setSearchTerm("")
    setSearchResults([])
    setShowSearchResults(false)
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4 pt-16 sm:pt-0">Welcome, Admin</h1>
      <p className="text-muted-foreground mb-8">Manage all aspects of the patient portal from this dashboard.</p>
      
      {/* Patient Search Bar */}
      <div className="mb-8">
        <div className="relative max-w-md" ref={searchRef}>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search patients by name, email, or phone..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10 pr-4"
            />
          </div>
          
          {/* Search Results Dropdown */}
          {showSearchResults && searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-background border rounded-md shadow-lg z-50 max-h-60 overflow-y-auto">
              {searchResults.map((patient) => (
                <button
                  key={patient.id}
                  onClick={() => handlePatientSelect(patient.id)}
                  className="w-full p-3 text-left hover:bg-muted/50 transition-colors border-b last:border-b-0 flex items-center gap-3"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="text-xs">
                      {patient.name.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm truncate">{patient.name}</div>
                    <div className="text-xs text-muted-foreground truncate">{patient.email}</div>
                    <div className="text-xs text-muted-foreground">{patient.phone}</div>
                  </div>
                  <User className="h-4 w-4 text-muted-foreground" />
                </button>
              ))}
            </div>
          )}
          
          {/* No Results Message */}
          {showSearchResults && searchTerm.trim() !== "" && searchResults.length === 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-background border rounded-md shadow-lg z-50 p-3 text-center text-muted-foreground">
              No patients found matching "{searchTerm}"
            </div>
          )}
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 mb-10 instant-theme-switch">
        {quickLinks.map(({ href, label, icon: Icon }) => (
          <Link key={href} href={href}>
            <Card className="h-full border border-muted transition-all cursor-pointer hover:border-primary">
              <CardContent className="flex flex-col items-center justify-center p-4 sm:p-6 text-center gap-2 sm:gap-3">
                <Icon className="h-7 w-7 sm:h-8 sm:w-8 text-primary mb-1 sm:mb-2" />
                <span className="text-sm font-medium sm:text-lg sm:font-semibold">{label}</span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
      {/* Patient Portal Stats */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Patient Portal Stats</h2>
        <div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="flex flex-col items-center bg-transparent rounded-lg border p-4">
            <User3FillIcon className="h-6 w-6 text-primary mb-1" />
            <span className="text-2xl font-bold">1,234</span>
            <span className="text-muted-foreground text-xs">Total Patients</span>
          </div>
          <div className="flex flex-col items-center bg-transparent rounded-lg border p-4">
            <UserAddFillIcon className="h-6 w-6 text-primary mb-1" />
            <span className="text-2xl font-bold">27</span>
            <span className="text-muted-foreground text-xs">New Signups This Week</span>
          </div>
          <div className="flex flex-col items-center bg-transparent rounded-lg border p-4">
            <BarChart2FillIcon className="h-6 w-6 text-primary mb-1" />
            <span className="text-2xl font-bold">89</span>
            <span className="text-muted-foreground text-xs">Active Patients Today</span>
          </div>
          <div className="flex flex-col items-center bg-transparent rounded-lg border p-4">
            <Calendar2FillIcon className="h-6 w-6 text-primary mb-1" />
            <span className="text-2xl font-bold">42</span>
            <span className="text-muted-foreground text-xs">Appointments Booked</span>
          </div>
          <div className="flex flex-col items-center bg-transparent rounded-lg border p-4">
            <CapsuleFillIcon className="h-6 w-6 text-primary mb-1" />
            <span className="text-2xl font-bold">15</span>
            <span className="text-muted-foreground text-xs">Prescriptions Requested</span>
          </div>
          <div className="flex flex-col items-center bg-transparent rounded-lg border p-4">
            <Message2FillIcon className="h-6 w-6 text-primary mb-1" />
            <span className="text-2xl font-bold">58</span>
            <span className="text-muted-foreground text-xs">Messages Sent</span>
          </div>
        </div>
      </div>
      {/* 2nd Row: Quick Links as Buttons */}
      <div className="flex flex-col gap-3 mb-8 w-full max-w-xs mx-auto sm:flex-row sm:flex-wrap sm:justify-center sm:max-w-none instant-theme-switch">
        <Link href="/admin/patients?add=1">
          <Button className="w-full sm:min-w-[160px] shadow font-semibold flex items-center gap-2">
            <User3FillIcon className="h-5 w-5" /> Add New Patient
          </Button>
        </Link>
        <Link href="/admin/appointments?add=1">
          <Button className="w-full sm:min-w-[160px] shadow font-semibold flex items-center gap-2">
            <Calendar2FillIcon className="h-5 w-5" /> Schedule Appointment
          </Button>
        </Link>
        <Link href="/admin/prescriptions?add=1">
          <Button className="w-full sm:min-w-[160px] shadow font-semibold flex items-center gap-2">
            <CapsuleFillIcon className="h-5 w-5" /> Add Prescription
          </Button>
        </Link>
        <Link href="/admin/messages?new=1">
          <Button className="w-full sm:min-w-[160px] shadow font-semibold flex items-center gap-2">
            <Message2FillIcon className="h-5 w-5" /> Send Message
          </Button>
        </Link>
        <Link href="/admin/documents">
          <Button className="w-full sm:min-w-[160px] shadow font-semibold flex items-center gap-2">
            <FileTextFillIcon className="h-5 w-5" /> Upload Document
          </Button>
        </Link>
      </div>
      {/* 3rd Row: Recent Activity Feed */}
      <div className="bg-card rounded-lg shadow border">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">Recent Activity</h2>
            <Badge variant="secondary" className="text-xs">
              Last 24 hours
            </Badge>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {recentActivity.map((activity, index) => {
              const Icon = activity.icon
              return (
                <div key={activity.id} className="flex items-start gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors">
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
                          <span className="text-xs text-muted-foreground font-mono">{activity.time}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          
          {/* View All Activity Button */}
          <div className="mt-6 pt-4 border-t">
            <Button variant="outline" className="w-full" asChild>
              <Link href="/admin/activity">
                View All Activity
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
} 