"use client"

import { useState, useEffect, useRef } from "react"
import { useSearchParams } from "next/navigation"
import { 
  Filter, 
  Reply, 
  Trash2, 
  Eye, 
  Clock, 
  CheckCircle, 
  Phone,
  MessageSquare,
  Search,
  Send,
  Archive,
  User,
  Calendar,
  Mail,
  AlertCircle,
  ArrowLeft
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { getPriorityColor, getMessageStatusColor, badgeColors } from "@/lib/admin-badge-utils"
import Message2FillIcon from 'remixicon-react/Message2FillIcon'
import { useMessages } from "@/contexts/MessageContext"



// Mock data for patients
const mockPatients = [
  { id: "P001", name: "Sarah Johnson", email: "sarah.johnson@email.com" },
  { id: "P002", name: "Michael Chen", email: "michael.chen@email.com" },
  { id: "P003", name: "Emily Rodriguez", email: "emily.rodriguez@email.com" },
  { id: "P004", name: "Robert Wilson", email: "robert.wilson@email.com" },
  { id: "P005", name: "Lisa Thompson", email: "lisa.thompson@email.com" },
  { id: "P006", name: "David Martinez", email: "david.martinez@email.com" },
  { id: "P007", name: "Jennifer Lee", email: "jennifer.lee@email.com" },
  { id: "P008", name: "Thomas Brown", email: "thomas.brown@email.com" },
  { id: "P009", name: "Amanda Davis", email: "amanda.davis@email.com" },
  { id: "P010", name: "Christopher Garcia", email: "christopher.garcia@email.com" }
]

// Mock data for message threads
const mockMessageThreads = [
  {
    id: 1,
    patientId: "P001",
    patientName: "Sarah Johnson",
    patientEmail: "sarah.johnson@email.com",
    category: "medication",
    priority: "medium",
    status: "unread",
    assignedTo: "Dr. Asif Ali",

    messages: [
      {
        id: 1,
        from: "patient",
        sender: "Sarah Johnson",
        text: "Hi Dr. Ali, I need a refill for my blood pressure medication. I'm running low and would appreciate if you could send the prescription to my pharmacy. Thank you!",
        timestamp: "2024-01-15T10:30:00Z"
      }
    ],
    lastMessageTime: "2024-01-15T10:30:00Z"
  },
  {
    id: 2,
    patientId: "P002", 
    patientName: "Michael Chen",
    patientEmail: "michael.chen@email.com",
    category: "appointment",
    priority: "",
    status: "in-progress",
    assignedTo: "Dr. Sajid Ali",

    messages: [
      {
        id: 1,
        from: "patient",
        sender: "Michael Chen",
        text: "I need to reschedule my appointment from next Tuesday to Thursday due to a work conflict. Is there any availability on Thursday afternoon?",
        timestamp: "2024-01-15T09:15:00Z"
      },
      {
        id: 2,
        from: "admin",
        sender: "Dr. Sajid Ali",
        text: "I can help you reschedule. Let me check our availability for Thursday afternoon.",
        timestamp: "2024-01-15T09:45:00Z"
      }
    ],
    lastMessageTime: "2024-01-15T09:45:00Z"
  },
  {
    id: 3,
    patientId: "P003",
    patientName: "Emily Rodriguez",
    patientEmail: "emily.rodriguez@email.com", 
    category: "test-results",
    priority: "low",
    status: "completed",
    assignedTo: "Dr. Abdul Ali",

    messages: [
      {
        id: 1,
        from: "patient",
        sender: "Emily Rodriguez",
        text: "I received my test results in the patient portal but I have some questions about the numbers. Could someone explain what these results mean?",
        timestamp: "2024-01-14T16:45:00Z"
      },
      {
        id: 2,
        from: "admin",
        sender: "Dr. Abdul Ali",
        text: "I've reviewed your test results. Everything looks normal. The slight elevation in one value is within normal range and not concerning.",
        timestamp: "2024-01-14T17:30:00Z"
      }
    ],
    lastMessageTime: "2024-01-14T17:30:00Z"
  },
  {
    id: 4,
    patientId: "P004",
    patientName: "Robert Wilson",
    patientEmail: "robert.wilson@email.com",
    category: "medication",
    priority: "high",
    status: "urgent",
    assignedTo: "Dr. Asif Ali",

    messages: [
      {
        id: 1,
        from: "patient",
        sender: "Robert Wilson",
        text: "I've been experiencing some side effects from my new medication. I'm feeling dizzy and have a headache. Should I be concerned?",
        timestamp: "2024-01-15T11:20:00Z"
      }
    ],
    lastMessageTime: "2024-01-15T11:20:00Z"
  },
  {
    id: 5,
    patientId: "P005",
    patientName: "Lisa Thompson",
    patientEmail: "lisa.thompson@email.com",
    category: "billing",
    priority: "",
    status: "unread",
    assignedTo: "Billing Team",

    messages: [
      {
        id: 1,
        from: "patient",
        sender: "Lisa Thompson",
        text: "I'm having trouble with my insurance coverage for my recent procedure. Can someone help me understand what's covered?",
        timestamp: "2024-01-15T08:30:00Z"
      }
    ],
    lastMessageTime: "2024-01-15T08:30:00Z"
  },
  {
    id: 6,
    patientId: "P006",
    patientName: "David Martinez",
    patientEmail: "david.martinez@email.com",
    category: "appointment",
    priority: "medium",
    status: "in-progress",
    assignedTo: "Dr. Sajid Ali",

    messages: [
      {
        id: 1,
        from: "patient",
        sender: "David Martinez",
        text: "I need to schedule a follow-up appointment for my heart condition. When would be the best time to come in?",
        timestamp: "2024-01-15T14:20:00Z"
      },
      {
        id: 2,
        from: "admin",
        sender: "Dr. Sajid Ali",
        text: "I can see you're due for a follow-up. Let me check our schedule for next week.",
        timestamp: "2024-01-15T14:45:00Z"
      }
    ],
    lastMessageTime: "2024-01-15T14:45:00Z"
  },
  {
    id: 7,
    patientId: "P007",
    patientName: "Jennifer Lee",
    patientEmail: "jennifer.lee@email.com",
    category: "test-results",
    priority: "high",
    status: "urgent",
    assignedTo: "Dr. Asif Ali",

    messages: [
      {
        id: 1,
        from: "patient",
        sender: "Jennifer Lee",
        text: "I just received my blood work results and I'm very concerned about the cholesterol levels. Can someone call me immediately?",
        timestamp: "2024-01-15T16:30:00Z"
      }
    ],
    lastMessageTime: "2024-01-15T16:30:00Z"
  },
  {
    id: 8,
    patientId: "P008",
    patientName: "Thomas Anderson",
    patientEmail: "thomas.anderson@email.com",
    category: "medication",
    priority: "",
    status: "unread",
    assignedTo: "Dr. Abdul Ali",

    messages: [
      {
        id: 1,
        from: "patient",
        sender: "Thomas Anderson",
        text: "I'm having trouble with my medication schedule. Can you help me understand when to take each pill?",
        timestamp: "2024-01-15T12:15:00Z"
      }
    ],
    lastMessageTime: "2024-01-15T12:15:00Z"
  },
  {
    id: 9,
    patientId: "P009",
    patientName: "Amanda Garcia",
    patientEmail: "amanda.garcia@email.com",
    category: "billing",
    priority: "medium",
    status: "completed",
    assignedTo: "Billing Team",

    messages: [
      {
        id: 1,
        from: "patient",
        sender: "Amanda Garcia",
        text: "I received a bill for my recent visit but I think there might be an error. Can someone review this?",
        timestamp: "2024-01-14T10:20:00Z"
      },
      {
        id: 2,
        from: "admin",
        sender: "Billing Team",
        text: "I've reviewed your bill and found the error. I'll have a corrected statement sent to you.",
        timestamp: "2024-01-14T11:00:00Z"
      }
    ],
    lastMessageTime: "2024-01-14T11:00:00Z"
  },
  {
    id: 10,
    patientId: "P010",
    patientName: "Christopher Brown",
    patientEmail: "christopher.brown@email.com",
    category: "appointment",
    priority: "low",
    status: "in-progress",
    assignedTo: "Dr. Sajid Ali",

    messages: [
      {
        id: 1,
        from: "patient",
        sender: "Christopher Brown",
        text: "I'd like to cancel my appointment for tomorrow. Something came up at work.",
        timestamp: "2024-01-15T09:30:00Z"
      },
      {
        id: 2,
        from: "admin",
        sender: "Dr. Sajid Ali",
        text: "No problem, I've cancelled your appointment. Would you like to reschedule for next week?",
        timestamp: "2024-01-15T09:45:00Z"
      }
    ],
    lastMessageTime: "2024-01-15T09:45:00Z"
  },
  {
    id: 11,
    patientId: "P011",
    patientName: "Rachel Green",
    patientEmail: "rachel.green@email.com",
    category: "test-results",
    priority: "",
    status: "unread",
    assignedTo: "Dr. Asif Ali",

    messages: [
      {
        id: 1,
        from: "patient",
        sender: "Rachel Green",
        text: "I'm waiting for my stress test results. Can you let me know when they're available?",
        timestamp: "2024-01-15T15:45:00Z"
      }
    ],
    lastMessageTime: "2024-01-15T15:45:00Z"
  },
  {
    id: 12,
    patientId: "P012",
    patientName: "Daniel White",
    patientEmail: "daniel.white@email.com",
    category: "medication",
    priority: "high",
    status: "urgent",
    assignedTo: "Dr. Abdul Ali",

    messages: [
      {
        id: 1,
        from: "patient",
        sender: "Daniel White",
        text: "I'm experiencing severe chest pain and shortness of breath. Should I go to the emergency room?",
        timestamp: "2024-01-15T17:20:00Z"
      }
    ],
    lastMessageTime: "2024-01-15T17:20:00Z"
  },
  {
    id: 13,
    patientId: "P013",
    patientName: "Michelle Davis",
    patientEmail: "michelle.davis@email.com",
    category: "appointment",
    priority: "medium",
    status: "completed",
    assignedTo: "Dr. Sajid Ali",

    messages: [
      {
        id: 1,
        from: "patient",
        sender: "Michelle Davis",
        text: "I need to reschedule my appointment from Friday to Monday. Is that possible?",
        timestamp: "2024-01-14T13:30:00Z"
      },
      {
        id: 2,
        from: "admin",
        sender: "Dr. Sajid Ali",
        text: "Yes, I've moved your appointment to Monday at the same time. You'll receive a confirmation email.",
        timestamp: "2024-01-14T14:00:00Z"
      }
    ],
    lastMessageTime: "2024-01-14T14:00:00Z"
  },
  {
    id: 14,
    patientId: "P014",
    patientName: "Kevin Johnson",
    patientEmail: "kevin.johnson@email.com",
    category: "billing",
    priority: "",
    status: "unread",
    assignedTo: "Billing Team",

    messages: [
      {
        id: 1,
        from: "patient",
        sender: "Kevin Johnson",
        text: "I have a question about my insurance coverage for the echocardiogram. What's my copay?",
        timestamp: "2024-01-15T11:45:00Z"
      }
    ],
    lastMessageTime: "2024-01-15T11:45:00Z"
  },
  {
    id: 15,
    patientId: "P015",
    patientName: "Stephanie Wilson",
    patientEmail: "stephanie.wilson@email.com",
    category: "medication",
    priority: "medium",
    status: "in-progress",
    assignedTo: "Dr. Asif Ali",

    messages: [
      {
        id: 1,
        from: "patient",
        sender: "Stephanie Wilson",
        text: "I'm having side effects from my new blood pressure medication. Should I stop taking it?",
        timestamp: "2024-01-15T14:15:00Z"
      },
      {
        id: 2,
        from: "admin",
        sender: "Dr. Asif Ali",
        text: "Please don't stop taking it without consulting me first. What specific side effects are you experiencing?",
        timestamp: "2024-01-15T14:30:00Z"
      }
    ],
    lastMessageTime: "2024-01-15T14:30:00Z"
  },
  {
    id: 16,
    patientId: "P016",
    patientName: "John Smith",
    patientEmail: "john.smith@email.com",
    category: "appointment",
    priority: "low",
    status: "archived",
    assignedTo: "Dr. Sajid Ali",

    messages: [
      {
        id: 1,
        from: "patient",
        sender: "John Smith",
        text: "I need to cancel my appointment for next week. I have a family emergency.",
        timestamp: "2024-01-10T09:00:00Z"
      },
      {
        id: 2,
        from: "admin",
        sender: "Dr. Sajid Ali",
        text: "I've cancelled your appointment. Please let us know when you'd like to reschedule.",
        timestamp: "2024-01-10T09:15:00Z"
      }
    ],
    lastMessageTime: "2024-01-10T09:15:00Z"
  },
  {
    id: 17,
    patientId: "P017",
    patientName: "Maria Garcia",
    patientEmail: "maria.garcia@email.com",
    category: "billing",
    priority: "medium",
    status: "archived",
    assignedTo: "Billing Team",

    messages: [
      {
        id: 1,
        from: "patient",
        sender: "Maria Garcia",
        text: "I have a question about my recent bill. Can someone help me understand the charges?",
        timestamp: "2024-01-08T14:30:00Z"
      },
      {
        id: 2,
        from: "admin",
        sender: "Billing Team",
        text: "I've reviewed your bill. The charges are correct for the services provided. Let me know if you need any clarification.",
        timestamp: "2024-01-08T15:00:00Z"
      }
    ],
    lastMessageTime: "2024-01-08T15:00:00Z"
  }
]

const categories = [
  { value: "all", label: "All Messages" },
  { value: "medication", label: "Medication" },
  { value: "appointment", label: "Appointment" },
  { value: "test-results", label: "Test Results" },
  { value: "billing", label: "Billing" },
  { value: "urgent", label: "Urgent" }
]

const priorities = [
  { value: "all", label: "All Priorities" },
  { value: "urgent", label: "Urgent" },
  { value: "high", label: "High" },
  { value: "medium", label: "Medium" },
  { value: "low", label: "Low" }
]

const statuses = [
  { value: "all", label: "All Status" },
  { value: "unread", label: "Unread" },
  { value: "in-progress", label: "In Progress" },
  { value: "completed", label: "Completed" },
  { value: "urgent", label: "Urgent" }
]



export default function AdminMessagesPage() {
  const searchParams = useSearchParams()
  const { 
    messageThreads, 
    addMessageToThread, 
    addReplyToThread, 
    markThreadAsRead, 
    archiveThread, 
    deleteThread, 
    restoreThread 
  } = useMessages()
  const [selectedThread, setSelectedThread] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedPriority, setSelectedPriority] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [showArchived, setShowArchived] = useState(false)

  const [replyText, setReplyText] = useState("")
  const [isNewMessageDialogOpen, setIsNewMessageDialogOpen] = useState(false)
  const [newMessage, setNewMessage] = useState({
    patientId: "",
    patientName: "",
    patientEmail: "",
    subject: "",
    message: "",
    category: "appointment",
    priority: "medium",
    assignedTo: "Dr. Asif Ali"
  })
  const [patientSearchTerm, setPatientSearchTerm] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const chatContainerRef = useRef<HTMLDivElement>(null)

  const filteredThreads = messageThreads.filter(thread => {
    const matchesSearch = thread.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         thread.messages.some(msg => msg.text.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === "all" || thread.category === selectedCategory
    const matchesPriority = selectedPriority === "all" || thread.priority === selectedPriority
    const matchesStatus = selectedStatus === "all" || thread.status === selectedStatus
    const matchesArchive = showArchived ? thread.status === "archived" : thread.status !== "archived"
    
    return matchesSearch && matchesCategory && matchesPriority && matchesStatus && matchesArchive
  })

  const unreadCount = messageThreads.filter(t => t.status === "unread").length
  const urgentCount = messageThreads.filter(t => t.status === "urgent").length

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      setTimeout(() => {
        if (chatContainerRef.current) {
          chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
        }
      }, 100)
    }
  }

  const sendReply = () => {
    if (!selectedThread || !replyText.trim()) return

    addReplyToThread(selectedThread.id, replyText)

    // Update the selectedThread to include the new message immediately
    setSelectedThread(prev => prev ? {
      ...prev,
      messages: [...prev.messages, {
        id: prev.messages.length + 1,
        from: "admin",
        sender: prev.assignedTo,
        text: replyText,
        timestamp: new Date().toISOString()
      }],
      lastMessageTime: new Date().toISOString(),
      status: prev.status === "unread" ? "in-progress" : prev.status
    } : null)

    setReplyText("")
    
    // Auto-scroll to bottom after sending message
    setTimeout(scrollToBottom, 100)
  }

  const createNewMessage = () => {
    if (!newMessage.patientId || !newMessage.message.trim() || !newMessage.subject.trim()) return

    const selectedPatient = mockPatients.find(p => p.id === newMessage.patientId)
    if (!selectedPatient) return

    addMessageToThread(
      selectedPatient.id,
      selectedPatient.name,
      selectedPatient.email,
      newMessage.subject,
      newMessage.message,
      newMessage.category,
      newMessage.priority
    )

    setNewMessage({
      patientId: "",
      patientName: "",
      patientEmail: "",
      subject: "",
      message: "",
      category: "appointment",
      priority: "medium",
      assignedTo: "Dr. Asif Ali"
    })
    setPatientSearchTerm("")
    setIsNewMessageDialogOpen(false)
  }

  const filteredPatients = mockPatients.filter(patient =>
    patient.name.toLowerCase().includes(patientSearchTerm.toLowerCase()) ||
    patient.email.toLowerCase().includes(patientSearchTerm.toLowerCase())
  )

  // Check for URL parameter to open new message modal
  useEffect(() => {
    if (searchParams?.get("new") === "1") {
      setIsNewMessageDialogOpen(true)
    }
  }, [searchParams])

  const handleMarkAsRead = (threadId: number) => {
    markThreadAsRead(threadId)
  }

  const handleArchiveThread = (threadId: number) => {
    archiveThread(threadId)
    if (selectedThread?.id === threadId) {
      setSelectedThread(null)
    }
  }

  const handleDeleteThread = (threadId: number) => {
    deleteThread(threadId)
    if (selectedThread?.id === threadId) {
      setSelectedThread(null)
    }
  }

  const handleRestoreThread = (threadId: number) => {
    restoreThread(threadId)
  }



  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    
    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${Math.floor(diffInHours)}h ago`
    return date.toLocaleDateString()
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Header */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <Message2FillIcon className="h-6 w-6 text-foreground" />
          <h1 className="text-2xl font-bold">Messages</h1>
        </div>
        
        {/* Badges row - moved below title for mobile */}
        <div className="flex flex-wrap gap-2 mb-3">
          {unreadCount > 0 && (
            <Badge variant="secondary" className={badgeColors.blue}>
              {unreadCount} unread
            </Badge>
          )}
          {urgentCount > 0 && (
            <Badge variant="secondary" className={badgeColors.red}>
              {urgentCount} urgent
            </Badge>
          )}
        </div>
        
        {/* Action buttons */}
        <div className="flex flex-wrap gap-2">
          <Button 
            variant={showArchived ? "default" : "outline"} 
            size="sm"
            onClick={() => setShowArchived(!showArchived)}
          >
            <Archive className="h-4 w-4 mr-2" />
            {showArchived ? "Active Messages" : "Archived Messages"}
          </Button>
          <Button 
            className="flex items-center gap-2"
            size="sm"
            onClick={() => setIsNewMessageDialogOpen(true)}
          >
            <Send className="h-4 w-4" />
            New Message
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="mb-4">
        <CardContent className="pt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
            <div className="relative sm:col-span-2 lg:col-span-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search messages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedPriority} onValueChange={setSelectedPriority}>
              <SelectTrigger>
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                {priorities.map(priority => (
                  <SelectItem key={priority.value} value={priority.value}>
                    {priority.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                {statuses.map(status => (
                  <SelectItem key={status.value} value={status.value}>
                    {status.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Messages List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
        {/* Messages List */}
        <div className={`${selectedThread ? 'hidden lg:block' : 'block'} lg:col-span-1 h-full`}>
          <Card className="h-full flex flex-col">
            <CardHeader className="flex-shrink-0">
              <CardTitle className="flex items-center justify-between">
                Messages
                <span className="text-sm text-muted-foreground">{filteredThreads.length} conversations</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 flex-1 min-h-0 overflow-hidden">
              <div className="overflow-y-auto" style={{ height: 'calc(100vh - 260px)' }}>
                {filteredThreads.length === 0 ? (
                  <div className="p-6 text-center text-muted-foreground">
                    No conversations found
                  </div>
                ) : (
                  filteredThreads.map((thread) => {
                    const latestMessage = thread.messages[thread.messages.length - 1]
                    return (
                      <div
                        key={thread.id}
                        className={`p-4 border-b cursor-pointer hover:bg-muted/50 transition-colors ${
                          selectedThread?.id === thread.id ? "bg-muted" : ""
                        } ${thread.status === "unread" ? "border-l-4 border-l-blue-500" : ""}`}
                        onClick={() => {
                          setSelectedThread(thread)
                          handleMarkAsRead(thread.id)
                          // Auto-scroll to bottom when selecting a thread
                          setTimeout(scrollToBottom, 200)
                        }}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Avatar className="w-7 h-7">
                              <AvatarFallback className="text-xs font-bold">{thread.patientName.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium text-sm">{thread.patientName}</div>
                              <div className="text-xs font-medium text-primary">{thread.subject}</div>
                              <div className="text-xs text-muted-foreground">{formatTimestamp(thread.lastMessageTime)}</div>
                            </div>
                          </div>
                          <div className="flex gap-1">
                            {thread.category && (
                              <Badge variant="secondary" className="text-xs">
                                {thread.category}
                              </Badge>
                            )}
                            {thread.priority && (
                              <Badge className={`text-xs ${getPriorityColor(thread.priority)}`}>
                                {thread.priority}
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground line-clamp-2">
                          {latestMessage.from === "patient" ? `${thread.patientName}: ` : `${latestMessage.sender}: `}
                          {latestMessage.text}
                        </div>
                        <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                          <span>{thread.messages.length} message{thread.messages.length !== 1 ? 's' : ''}</span>
                          <span>•</span>
                          <span>Assigned to {thread.assignedTo}</span>
                          {thread.status === "archived" && (
                            <span className="text-orange-600 font-medium">• Archived</span>
                          )}
                        </div>
                      </div>
                    )
                  })
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Message Detail - Mobile optimized */}
        <div className={`${selectedThread ? 'block' : 'hidden lg:block'} lg:col-span-2 h-full`}>
          {selectedThread ? (
            <Card className="h-full flex flex-col">
              <CardHeader className="flex-shrink-0">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    {/* Mobile back button */}
                    <div className="flex items-center gap-2 mb-2 lg:hidden">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedThread(null)}
                        className="h-8 w-8 p-0"
                      >
                        <ArrowLeft className="h-4 w-4" />
                      </Button>
                      <span className="text-sm text-muted-foreground">Back to messages</span>
                    </div>
                    <CardTitle className="flex items-center gap-2 text-base lg:text-lg">
                      {selectedThread.patientName}
                      {selectedThread.status === "urgent" && (
                        <AlertCircle className="h-5 w-5 text-red-500" />
                      )}
                    </CardTitle>
                    <div className="text-sm font-medium text-primary mt-1">
                      {selectedThread.subject}
                    </div>
                    <div className="flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-4 mt-2">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{formatTimestamp(selectedThread.lastMessageTime)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm">Assigned to: {selectedThread.assignedTo}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 mt-3">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">Type:</span>
                        <Select 
                          value={selectedThread.category || "none"} 
                          onValueChange={(value) => {
                            const newCategory = value === "none" ? "" : value
                            setMessageThreads(prev => prev.map(t => 
                              t.id === selectedThread.id 
                                ? { ...t, category: newCategory }
                                : t
                            ))
                            setSelectedThread(prev => prev ? { ...prev, category: newCategory } : null)
                          }}
                        >
                          <SelectTrigger className="w-24 h-7 text-xs">
                            <SelectValue placeholder="None" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">None</SelectItem>
                            {categories.filter(cat => cat.value !== "all").map(category => (
                              <SelectItem key={category.value} value={category.value}>
                                {category.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">Priority:</span>
                        <Select 
                          value={selectedThread.priority || "none"} 
                          onValueChange={(value) => {
                            const newPriority = value === "none" ? "" : value
                            setMessageThreads(prev => prev.map(t => 
                              t.id === selectedThread.id 
                                ? { ...t, priority: newPriority }
                                : t
                            ))
                            setSelectedThread(prev => prev ? { ...prev, priority: newPriority } : null)
                          }}
                        >
                          <SelectTrigger className="w-20 h-7 text-xs">
                            <SelectValue placeholder="None" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">None</SelectItem>
                            {priorities.filter(pri => pri.value !== "all").map(priority => (
                              <SelectItem key={priority.value} value={priority.value}>
                                {priority.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-1 lg:gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        archiveThread(selectedThread.id)
                        setSelectedThread(null)
                      }}
                      className="h-8 w-8 p-0 lg:h-9 lg:w-auto lg:px-3"
                      title="Archive"
                    >
                      <Archive className="h-4 w-4 lg:mr-2" />
                      <span className="hidden lg:inline">Archive</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        deleteThread(selectedThread.id)
                        setSelectedThread(null)
                      }}
                      className="h-8 w-8 p-0 lg:h-9 lg:w-auto lg:px-3"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4 lg:mr-2" />
                      <span className="hidden lg:inline">Delete</span>
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-1 min-h-0 flex flex-col p-0">
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {selectedThread.messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-3 ${
                        message.from === "admin" ? "flex-row-reverse" : "flex-row"
                      }`}
                    >
                      {message.from === "patient" && (
                        <div className="flex-shrink-0">
                          <Avatar className="w-7 h-7">
                            <AvatarFallback className="text-xs font-bold">{selectedThread.patientName.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                          </Avatar>
                        </div>
                      )}
                      <div className={`flex-1 max-w-[80%] lg:max-w-[70%] ${
                        message.from === "admin" 
                          ? "bg-primary text-primary-foreground rounded-lg p-3" 
                          : "bg-muted rounded-lg p-3"
                      }`}>
                        <div className="font-medium mb-1 text-sm">{message.sender}</div>
                        <div className="text-sm">{message.text}</div>
                        <div className="text-xs opacity-70 mt-1 text-right">{formatTimestamp(message.timestamp)}</div>
                      </div>
                      {message.from === "admin" && (
                        <div className="flex-shrink-0">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src="/images/hcc-logo.png" alt="HCC" className="scale-50" />
                            <AvatarFallback>HCC</AvatarFallback>
                          </Avatar>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Reply Input - Mobile optimized */}
                <div className="flex gap-2 flex-shrink-0 mx-4 mb-4 mt-4">
                  <Textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Type your reply..."
                    className="flex-1 min-h-[60px] max-h-[120px] resize-none"
                    rows={2}
                  />
                  <Button 
                    onClick={sendReply} 
                    disabled={!replyText.trim()}
                    className="self-end h-[60px] px-3 lg:px-4"
                  >
                    <Send className="h-4 w-4 lg:mr-2" />
                    <span className="hidden lg:inline">Send</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-8 text-center text-muted-foreground">
                <MessageSquare className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p>Select a conversation to view details</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      

       {/* New Message Dialog */}
       <Dialog open={isNewMessageDialogOpen} onOpenChange={setIsNewMessageDialogOpen}>
         <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
           <DialogHeader>
             <DialogTitle>Create New Message</DialogTitle>
           </DialogHeader>
           <div className="space-y-4">
             <div>
               <label className="text-sm font-medium">Select Patient *</label>
               <div className="relative mt-1">
                                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                 <Input
                   placeholder="Search patients by name or email..."
                   value={patientSearchTerm}
                   onChange={(e) => setPatientSearchTerm(e.target.value)}
                   className="pl-10"
                 />
               </div>
               {patientSearchTerm && (
                 <div className="mt-2 max-h-24 overflow-y-auto border rounded-md">
                   {filteredPatients.length === 0 ? (
                     <div className="p-3 text-sm text-muted-foreground text-center">
                       No patients found
                     </div>
                   ) : (
                     filteredPatients.map(patient => (
                       <div
                         key={patient.id}
                         className={`p-3 cursor-pointer hover:bg-muted/50 transition-colors border-b last:border-b-0 ${
                           newMessage.patientId === patient.id ? "bg-muted" : ""
                         }`}
                         onClick={() => {
                           setNewMessage(prev => ({
                             ...prev,
                             patientId: patient.id,
                             patientName: patient.name,
                             patientEmail: patient.email
                           }))
                           setPatientSearchTerm(patient.name)
                         }}
                       >
                         <div className="font-medium text-sm">{patient.name}</div>
                         <div className="text-xs text-muted-foreground">{patient.email}</div>
                       </div>
                     ))
                   )}
                 </div>
               )}
               {newMessage.patientId && (
                 <div className="mt-2 p-2 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded">
                   <div className="text-sm font-medium text-green-800 dark:text-green-200">
                     Selected: {newMessage.patientName}
                   </div>
                   <div className="text-xs text-green-600 dark:text-green-400">
                     {newMessage.patientEmail}
                   </div>
                 </div>
               )}
             </div>

             <div>
               <label className="text-sm font-medium">Subject *</label>
               <Input
                 value={newMessage.subject}
                 onChange={(e) => setNewMessage(prev => ({ ...prev, subject: e.target.value }))}
                 placeholder="Enter message subject..."
                 className="mt-1"
               />
             </div>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
               <div>
                 <label className="text-sm font-medium">Category</label>
                 <Select value={newMessage.category} onValueChange={(value) => setNewMessage(prev => ({ ...prev, category: value }))}>
                   <SelectTrigger className="mt-1">
                     <SelectValue />
                   </SelectTrigger>
                   <SelectContent>
                     {categories.filter(cat => cat.value !== "all").map(category => (
                       <SelectItem key={category.value} value={category.value}>
                         {category.label}
                       </SelectItem>
                     ))}
                   </SelectContent>
                 </Select>
               </div>
               <div>
                 <label className="text-sm font-medium">Priority</label>
                 <Select value={newMessage.priority} onValueChange={(value) => setNewMessage(prev => ({ ...prev, priority: value }))}>
                   <SelectTrigger className="mt-1">
                     <SelectValue />
                   </SelectTrigger>
                   <SelectContent>
                     {priorities.filter(pri => pri.value !== "all").map(priority => (
                       <SelectItem key={priority.value} value={priority.value}>
                         {priority.label}
                       </SelectItem>
                     ))}
                   </SelectContent>
                 </Select>
               </div>
               <div>
                 <label className="text-sm font-medium">Assign To</label>
                 <Select value={newMessage.assignedTo} onValueChange={(value) => setNewMessage(prev => ({ ...prev, assignedTo: value }))}>
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
               <label className="text-sm font-medium">Message *</label>
               <Textarea
                 value={newMessage.message}
                 onChange={(e) => setNewMessage(prev => ({ ...prev, message: e.target.value }))}
                 placeholder="Enter the message content..."
                 rows={3}
                 className="mt-1"
               />
             </div>
             <div className="flex justify-end gap-2">
               <Button
                 variant="outline"
                 onClick={() => {
                   setIsNewMessageDialogOpen(false)
                   setNewMessage({
                     patientId: "",
                     patientName: "",
                     patientEmail: "",
                     subject: "",
                     message: "",
                     category: "appointment",
                     priority: "medium",
                     assignedTo: "Dr. Asif Ali"
                   })
                   setPatientSearchTerm("")
                 }}
               >
                 Cancel
               </Button>
                                <Button 
                   onClick={createNewMessage} 
                   disabled={!newMessage.patientId || !newMessage.message.trim()}
                 >
                                      <Send className="h-4 w-4 mr-2" />
                 Create Message
               </Button>
             </div>
           </div>
         </DialogContent>
       </Dialog>
    </div>
  )
} 