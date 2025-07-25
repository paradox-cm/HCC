"use client"

import { useState, useEffect } from "react"
import { MessageSquare, Search, Filter, Send, Reply, Archive, Trash2, Eye, Clock, AlertCircle, CheckCircle, User, Calendar, Phone, Mail } from "lucide-react"
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
    messageType: "medication",
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
    messageType: "appointment",
    priority: "high",
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
    messageType: "test-results",
    priority: "medium",
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
    messageType: "urgent",
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
    messageType: "billing",
    priority: "low",
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

const messageTypes = [
  { value: "general", label: "General" },
  { value: "medication", label: "Medication" },
  { value: "appointment", label: "Appointment" },
  { value: "test-results", label: "Test Results" },
  { value: "billing", label: "Billing" },
  { value: "follow-up", label: "Follow-up" },
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
  const [messageThreads, setMessageThreads] = useState(mockMessageThreads)
  const [selectedThread, setSelectedThread] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedPriority, setSelectedPriority] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [replyText, setReplyText] = useState("")
  const [isNewMessageDialogOpen, setIsNewMessageDialogOpen] = useState(false)
  const [newMessage, setNewMessage] = useState({
    patientId: "",
    patientName: "",
    patientEmail: "",
    message: "",
    category: "appointment",
    messageType: "general",
    priority: "medium",
    assignedTo: "Dr. Asif Ali"
  })
  const [patientSearchTerm, setPatientSearchTerm] = useState("")

  const filteredThreads = messageThreads.filter(thread => {
    const matchesSearch = thread.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         thread.messages.some(msg => msg.text.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === "all" || thread.category === selectedCategory
    const matchesPriority = selectedPriority === "all" || thread.priority === selectedPriority
    const matchesStatus = selectedStatus === "all" || thread.status === selectedStatus
    
    return matchesSearch && matchesCategory && matchesPriority && matchesStatus
  })

  const unreadCount = messageThreads.filter(t => t.status === "unread").length
  const urgentCount = messageThreads.filter(t => t.status === "urgent").length

  const sendReply = () => {
    if (!selectedThread || !replyText.trim()) return

    const newMessage = {
      id: Math.max(...selectedThread.messages.map(m => m.id)) + 1,
      from: "admin",
      sender: selectedThread.assignedTo,
      text: replyText,
      timestamp: new Date().toISOString()
    }

    setMessageThreads(prev => prev.map(thread => 
      thread.id === selectedThread.id 
        ? { 
            ...thread, 
            messages: [...thread.messages, newMessage],
            lastMessageTime: newMessage.timestamp,
            status: thread.status === "unread" ? "in-progress" : thread.status
          }
        : thread
    ))
    setReplyText("")
  }

  const createNewMessage = () => {
    if (!newMessage.patientId || !newMessage.message.trim()) return

    const selectedPatient = mockPatients.find(p => p.id === newMessage.patientId)
    if (!selectedPatient) return

    const thread = {
      id: Math.max(...messageThreads.map(t => t.id)) + 1,
      patientId: selectedPatient.id,
      patientName: selectedPatient.name,
      patientEmail: selectedPatient.email,
      category: newMessage.category,
      messageType: newMessage.messageType,
      priority: newMessage.priority,
      status: "unread",
      assignedTo: newMessage.assignedTo,
      messages: [
        {
          id: 1,
          from: "admin",
          sender: newMessage.assignedTo,
          text: newMessage.message,
          timestamp: new Date().toISOString()
        }
      ],
      lastMessageTime: new Date().toISOString()
    }

    setMessageThreads(prev => [thread, ...prev])
    setNewMessage({
      patientId: "",
      patientName: "",
      patientEmail: "",
      message: "",
      category: "appointment",
      messageType: "general",
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

  const markAsRead = (threadId: number) => {
    setMessageThreads(prev => prev.map(thread => 
      thread.id === threadId 
        ? { ...thread, status: thread.status === "unread" ? "in-progress" : thread.status }
        : thread
    ))
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent": return "bg-red-100 text-red-800 border-red-200"
      case "high": return "bg-orange-100 text-orange-800 border-orange-200"
      case "medium": return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low": return "bg-green-100 text-green-800 border-green-200"
      default: return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "urgent": return "bg-red-100 text-red-800 border-red-200"
      case "unread": return "bg-blue-100 text-blue-800 border-blue-200"
      case "in-progress": return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "completed": return "bg-green-100 text-green-800 border-green-200"
      default: return "bg-gray-100 text-gray-800 border-gray-200"
    }
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
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold">Messages</h1>
          <div className="flex gap-2 ml-4">
            {unreadCount > 0 && (
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                {unreadCount} unread
              </Badge>
            )}
            {urgentCount > 0 && (
              <Badge variant="secondary" className="bg-red-100 text-red-800">
                {urgentCount} urgent
              </Badge>
            )}
          </div>
        </div>
        <Button 
          className="flex items-center gap-2"
          onClick={() => setIsNewMessageDialogOpen(true)}
        >
          <Send className="h-4 w-4" />
          New Message
        </Button>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Messages List */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Messages
                <span className="text-sm text-muted-foreground">{filteredThreads.length} conversations</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="max-h-[600px] overflow-y-auto">
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
                          markAsRead(thread.id)
                        }}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>{thread.patientName.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium text-sm">{thread.patientName}</div>
                              <div className="text-xs text-muted-foreground">{formatTimestamp(thread.lastMessageTime)}</div>
                            </div>
                          </div>
                          <div className="flex gap-1">
                            <Badge className={`text-xs ${getPriorityColor(thread.priority)}`}>
                              {thread.priority}
                            </Badge>
                            <Badge className={`text-xs ${getStatusColor(thread.status)}`}>
                              {thread.status}
                            </Badge>
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
                        </div>
                      </div>
                    )
                  })
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Message Detail */}
        <div className="lg:col-span-2">
          {selectedThread ? (
            <Card className="h-full flex flex-col">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {selectedThread.patientName}
                      {selectedThread.status === "urgent" && (
                        <AlertCircle className="h-5 w-5 text-red-500" />
                      )}
                    </CardTitle>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{formatTimestamp(selectedThread.lastMessageTime)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm">Assigned to: {selectedThread.assignedTo}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mt-3">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">Type:</span>
                        <Select 
                          value={selectedThread.messageType} 
                          onValueChange={(value) => {
                            setMessageThreads(prev => prev.map(t => 
                              t.id === selectedThread.id 
                                ? { ...t, messageType: value }
                                : t
                            ))
                          }}
                        >
                          <SelectTrigger className="w-32 h-8">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {messageTypes.map(type => (
                              <SelectItem key={type.value} value={type.value}>
                                {type.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">Priority:</span>
                        <Select 
                          value={selectedThread.priority} 
                          onValueChange={(value) => {
                            setMessageThreads(prev => prev.map(t => 
                              t.id === selectedThread.id 
                                ? { ...t, priority: value }
                                : t
                            ))
                          }}
                        >
                          <SelectTrigger className="w-32 h-8">
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
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Archive className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                {/* Patient Info */}
                <div className="bg-muted/30 rounded-lg p-4 mb-4">
                  <h3 className="font-semibold mb-2">Patient Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span>Patient ID: {selectedThread.patientId}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedThread.patientEmail}</span>
                    </div>
                  </div>
                </div>

                {/* Chat Messages */}
                <div className="flex-1 bg-muted/20 rounded-lg p-4 mb-4 overflow-y-auto max-h-96">
                  <div className="space-y-4">
                    {selectedThread.messages.map((message, index) => (
                      <div key={message.id} className={`flex items-end gap-2 ${message.from === "admin" ? "justify-end" : "justify-start"}`}>
                        {message.from === "patient" && (
                          <div className="flex-shrink-0">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>{selectedThread.patientName.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                            </Avatar>
                          </div>
                        )}
                        <div className={`max-w-[80%] px-3 py-2 rounded-lg text-sm
                          ${message.from === "admin"
                            ? "bg-primary text-primary-foreground"
                            : "bg-background border"
                          }
                        `}>
                          <div className="font-medium mb-1">{message.sender}</div>
                          <div>{message.text}</div>
                          <div className="text-xs opacity-70 mt-1 text-right">{formatTimestamp(message.timestamp)}</div>
                        </div>
                        {message.from === "admin" && (
                          <div className="flex-shrink-0">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>AD</AvatarFallback>
                            </Avatar>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Reply Input */}
                <div className="flex gap-2">
                  <Textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Type your reply..."
                    className="flex-1"
                    rows={3}
                  />
                  <Button 
                    onClick={sendReply} 
                    disabled={!replyText.trim()}
                    className="self-end"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Send
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
        <DialogContent className="max-w-2xl">
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
                <div className="mt-2 max-h-48 overflow-y-auto border rounded-md">
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
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                <label className="text-sm font-medium">Type</label>
                <Select value={newMessage.messageType} onValueChange={(value) => setNewMessage(prev => ({ ...prev, messageType: value }))}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {messageTypes.map(type => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
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
                rows={6}
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
                    message: "",
                    category: "appointment",
                    messageType: "general",
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