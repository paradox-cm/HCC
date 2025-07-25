"use client"

import { useState, useEffect } from "react"
import { MessageSquare, Search, Filter, Send, Reply, Archive, Trash2, Eye, Clock, AlertCircle, CheckCircle, User, Calendar, Phone, Mail, Plus } from "lucide-react"
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
import { Label } from "@/components/ui/label"

// Mock data for messages
const mockMessages = [
  {
    id: 1,
    patientId: "P001",
    patientName: "Sarah Johnson",
    patientEmail: "sarah.johnson@email.com",
    patientPhone: "713-555-0123",
    subject: "Medication Refill Request",
    message: "Hi Dr. Ali, I need a refill for my blood pressure medication. I'm running low and would appreciate if you could send the prescription to my pharmacy. Thank you!",
    category: "medication",
    priority: "medium",
    status: "unread",
    timestamp: "2024-01-15T10:30:00Z",
    assignedTo: "Dr. Asif Ali",
    response: null,
    attachments: [],
    tags: ["refill", "medication"]
  },
  {
    id: 2,
    patientId: "P002", 
    patientName: "Michael Chen",
    patientEmail: "michael.chen@email.com",
    patientPhone: "713-555-0456",
    subject: "Appointment Reschedule",
    message: "I need to reschedule my appointment from next Tuesday to Thursday due to a work conflict. Is there any availability on Thursday afternoon?",
    category: "appointment",
    priority: "high",
    status: "in-progress",
    timestamp: "2024-01-15T09:15:00Z",
    assignedTo: "Dr. Sajid Ali",
    response: "I can help you reschedule. Let me check our availability for Thursday afternoon.",
    attachments: [],
    tags: ["reschedule", "appointment"]
  },
  {
    id: 3,
    patientId: "P003",
    patientName: "Emily Rodriguez",
    patientEmail: "emily.rodriguez@email.com", 
    patientPhone: "713-555-0789",
    subject: "Test Results Question",
    message: "I received my test results in the patient portal but I have some questions about the numbers. Could someone explain what these results mean?",
    category: "test-results",
    priority: "medium",
    status: "completed",
    timestamp: "2024-01-14T16:45:00Z",
    assignedTo: "Dr. Abdul Ali",
    response: "I've reviewed your test results. Everything looks normal. The slight elevation in one value is within normal range and not concerning.",
    attachments: ["test-results.pdf"],
    tags: ["test-results", "follow-up"]
  },
  {
    id: 4,
    patientId: "P004",
    patientName: "Robert Wilson",
    patientEmail: "robert.wilson@email.com",
    patientPhone: "713-555-0321",
    subject: "Side Effects Concern",
    message: "I've been experiencing some side effects from my new medication. I'm feeling dizzy and have a headache. Should I be concerned?",
    category: "medication",
    priority: "high",
    status: "urgent",
    timestamp: "2024-01-15T11:20:00Z",
    assignedTo: "Dr. Asif Ali",
    response: null,
    attachments: [],
    tags: ["side-effects", "urgent"]
  },
  {
    id: 5,
    patientId: "P005",
    patientName: "Lisa Thompson",
    patientEmail: "lisa.thompson@email.com",
    patientPhone: "713-555-0654",
    subject: "Insurance Coverage Question",
    message: "I'm having trouble with my insurance coverage for my recent procedure. Can someone help me understand what's covered?",
    category: "billing",
    priority: "low",
    status: "unread",
    timestamp: "2024-01-15T08:30:00Z",
    assignedTo: "Billing Team",
    response: null,
    attachments: ["insurance-docs.pdf"],
    tags: ["billing", "insurance"]
  }
]

// Mock patient data for new message dropdown
const mockPatients = [
  { id: "P001", name: "Sarah Johnson", email: "sarah.johnson@email.com" },
  { id: "P002", name: "Michael Chen", email: "michael.chen@email.com" },
  { id: "P003", name: "Emily Rodriguez", email: "emily.rodriguez@email.com" },
  { id: "P004", name: "Robert Wilson", email: "robert.wilson@email.com" },
  { id: "P005", name: "Lisa Thompson", email: "lisa.thompson@email.com" },
  { id: "P006", name: "David Miller", email: "david.miller@email.com" },
  { id: "P007", name: "Jennifer Davis", email: "jennifer.davis@email.com" },
  { id: "P008", name: "James Wilson", email: "james.wilson@email.com" }
]

const categories = [
  { value: "all", label: "All Messages" },
  { value: "medication", label: "Medication" },
  { value: "appointment", label: "Appointment" },
  { value: "test-results", label: "Test Results" },
  { value: "billing", label: "Billing" },
  { value: "urgent", label: "Urgent" }
]

const messageCategories = [
  { value: "general", label: "General" },
  { value: "medication", label: "Medication" },
  { value: "appointment", label: "Appointment" },
  { value: "test-results", label: "Test Results" },
  { value: "billing", label: "Billing" },
  { value: "follow-up", label: "Follow-up" }
]

const priorities = [
  { value: "all", label: "All Priorities" },
  { value: "urgent", label: "Urgent" },
  { value: "high", label: "High" },
  { value: "medium", label: "Medium" },
  { value: "low", label: "Low" }
]

const messagePriorities = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
  { value: "urgent", label: "Urgent" }
]

const statuses = [
  { value: "all", label: "All Status" },
  { value: "unread", label: "Unread" },
  { value: "in-progress", label: "In Progress" },
  { value: "completed", label: "Completed" },
  { value: "urgent", label: "Urgent" }
]

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState(mockMessages)
  const [selectedMessage, setSelectedMessage] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedPriority, setSelectedPriority] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [replyText, setReplyText] = useState("")
  const [isReplyDialogOpen, setIsReplyDialogOpen] = useState(false)
  const [isNewMessageDialogOpen, setIsNewMessageDialogOpen] = useState(false)
  const [newMessage, setNewMessage] = useState({
    patientId: "",
    patientName: "",
    patientEmail: "",
    subject: "",
    message: "",
    category: "general",
    priority: "medium"
  })

  const filteredMessages = messages.filter(message => {
    const matchesSearch = message.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.message.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || message.category === selectedCategory
    const matchesPriority = selectedPriority === "all" || message.priority === selectedPriority
    const matchesStatus = selectedStatus === "all" || message.status === selectedStatus
    
    return matchesSearch && matchesCategory && matchesPriority && matchesStatus
  })

  const unreadCount = messages.filter(m => m.status === "unread").length
  const urgentCount = messages.filter(m => m.status === "urgent").length

  const handleReply = (messageId: number) => {
    const message = messages.find(m => m.id === messageId)
    setSelectedMessage(message)
    setIsReplyDialogOpen(true)
  }

  const sendReply = () => {
    if (!selectedMessage || !replyText.trim()) return

    setMessages(prev => prev.map(msg => 
      msg.id === selectedMessage.id 
        ? { ...msg, response: replyText, status: "completed" }
        : msg
    ))
    setReplyText("")
    setIsReplyDialogOpen(false)
    setSelectedMessage(null)
  }

  const sendNewMessage = () => {
    if (!newMessage.patientId || !newMessage.subject.trim() || !newMessage.message.trim()) return

    const selectedPatient = mockPatients.find(p => p.id === newMessage.patientId)
    if (!selectedPatient) return

    const newMessageObj = {
      id: messages.length + 1,
      patientId: newMessage.patientId,
      patientName: selectedPatient.name,
      patientEmail: selectedPatient.email,
      patientPhone: "713-555-0000", // Default phone
      subject: newMessage.subject,
      message: newMessage.message,
      category: newMessage.category,
      priority: newMessage.priority,
      status: "completed" as const, // Admin-sent messages are marked as completed
      timestamp: new Date().toISOString(),
      assignedTo: "Admin",
      response: null,
      attachments: [],
      tags: [newMessage.category]
    }

    setMessages(prev => [newMessageObj, ...prev])
    
    // Reset form
    setNewMessage({
      patientId: "",
      patientName: "",
      patientEmail: "",
      subject: "",
      message: "",
      category: "general",
      priority: "medium"
    })
    
    setIsNewMessageDialogOpen(false)
  }

  const handlePatientSelect = (patientId: string) => {
    const patient = mockPatients.find(p => p.id === patientId)
    if (patient) {
      setNewMessage(prev => ({
        ...prev,
        patientId: patient.id,
        patientName: patient.name,
        patientEmail: patient.email
      }))
    }
  }

  const markAsRead = (messageId: number) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId 
        ? { ...msg, status: msg.status === "unread" ? "in-progress" : msg.status }
        : msg
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
          <Plus className="h-4 w-4" />
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
                <span className="text-sm text-muted-foreground">{filteredMessages.length} messages</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="max-h-[600px] overflow-y-auto">
                {filteredMessages.length === 0 ? (
                  <div className="p-6 text-center text-muted-foreground">
                    No messages found
                  </div>
                ) : (
                  filteredMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`p-4 border-b cursor-pointer hover:bg-muted/50 transition-colors ${
                        selectedMessage?.id === message.id ? "bg-muted" : ""
                      } ${message.status === "unread" ? "border-l-4 border-l-blue-500" : ""}`}
                      onClick={() => {
                        setSelectedMessage(message)
                        markAsRead(message.id)
                      }}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>{message.patientName.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium text-sm">{message.patientName}</div>
                            <div className="text-xs text-muted-foreground">{formatTimestamp(message.timestamp)}</div>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <Badge className={`text-xs ${getPriorityColor(message.priority)}`}>
                            {message.priority}
                          </Badge>
                          <Badge className={`text-xs ${getStatusColor(message.status)}`}>
                            {message.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-sm font-medium mb-1">{message.subject}</div>
                      <div className="text-xs text-muted-foreground line-clamp-2">
                        {message.message}
                      </div>
                      {message.attachments.length > 0 && (
                        <div className="flex items-center gap-1 mt-2">
                          <Eye className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{message.attachments.length} attachment(s)</span>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Message Detail */}
        <div className="lg:col-span-2">
          {selectedMessage ? (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {selectedMessage.subject}
                      {selectedMessage.status === "urgent" && (
                        <AlertCircle className="h-5 w-5 text-red-500" />
                      )}
                    </CardTitle>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{selectedMessage.patientName}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{formatTimestamp(selectedMessage.timestamp)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm">Assigned to: {selectedMessage.assignedTo}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleReply(selectedMessage.id)}
                    >
                      <Reply className="h-4 w-4 mr-2" />
                      Reply
                    </Button>
                    <Button variant="outline" size="sm">
                      <Archive className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Patient Info */}
                  <div className="bg-muted/30 rounded-lg p-4">
                    <h3 className="font-semibold mb-2">Patient Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span>Patient ID: {selectedMessage.patientId}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span>{selectedMessage.patientEmail}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{selectedMessage.patientPhone}</span>
                      </div>
                    </div>
                  </div>

                  {/* Original Message */}
                  <div>
                    <h3 className="font-semibold mb-2">Original Message</h3>
                    <div className="bg-muted/30 rounded-lg p-4">
                      <p className="text-sm leading-relaxed">{selectedMessage.message}</p>
                    </div>
                  </div>

                  {/* Attachments */}
                  {selectedMessage.attachments.length > 0 && (
                    <div>
                      <h3 className="font-semibold mb-2">Attachments</h3>
                      <div className="space-y-2">
                        {selectedMessage.attachments.map((attachment, index) => (
                          <div key={index} className="flex items-center gap-2 p-2 bg-muted/30 rounded">
                            <Eye className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{attachment}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Response */}
                  {selectedMessage.response && (
                    <div>
                      <h3 className="font-semibold mb-2 flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        Response
                      </h3>
                      <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg p-4">
                        <p className="text-sm leading-relaxed">{selectedMessage.response}</p>
                      </div>
                    </div>
                  )}

                  {/* Tags */}
                  {selectedMessage.tags.length > 0 && (
                    <div>
                      <h3 className="font-semibold mb-2">Tags</h3>
                      <div className="flex gap-2 flex-wrap">
                        {selectedMessage.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-8 text-center text-muted-foreground">
                <MessageSquare className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p>Select a message to view details</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* New Message Dialog */}
      <Dialog open={isNewMessageDialogOpen} onOpenChange={setIsNewMessageDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Send New Message</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="patient">Patient</Label>
                <Select value={newMessage.patientId} onValueChange={handlePatientSelect}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a patient" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockPatients.map(patient => (
                      <SelectItem key={patient.id} value={patient.id}>
                        {patient.name} ({patient.id})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Select value={newMessage.category} onValueChange={(value) => setNewMessage(prev => ({ ...prev, category: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {messageCategories.map(category => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="priority">Priority</Label>
                <Select value={newMessage.priority} onValueChange={(value) => setNewMessage(prev => ({ ...prev, priority: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    {messagePriorities.map(priority => (
                      <SelectItem key={priority.value} value={priority.value}>
                        {priority.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="patient-email">Patient Email</Label>
                <Input
                  id="patient-email"
                  value={newMessage.patientEmail}
                  disabled
                  placeholder="Select patient first"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                value={newMessage.subject}
                onChange={(e) => setNewMessage(prev => ({ ...prev, subject: e.target.value }))}
                placeholder="Enter message subject"
              />
            </div>

            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                value={newMessage.message}
                onChange={(e) => setNewMessage(prev => ({ ...prev, message: e.target.value }))}
                placeholder="Type your message..."
                rows={6}
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
                    category: "general",
                    priority: "medium"
                  })
                }}
              >
                Cancel
              </Button>
              <Button 
                onClick={sendNewMessage} 
                disabled={!newMessage.patientId || !newMessage.subject.trim() || !newMessage.message.trim()}
              >
                <Send className="h-4 w-4 mr-2" />
                Send Message
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Reply Dialog */}
      <Dialog open={isReplyDialogOpen} onOpenChange={setIsReplyDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Reply to {selectedMessage?.patientName}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Original Message</label>
              <div className="mt-1 p-3 bg-muted/30 rounded text-sm">
                {selectedMessage?.message}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Your Response</label>
              <Textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Type your response..."
                rows={6}
                className="mt-1"
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setIsReplyDialogOpen(false)
                  setReplyText("")
                  setSelectedMessage(null)
                }}
              >
                Cancel
              </Button>
              <Button onClick={sendReply} disabled={!replyText.trim()}>
                <Send className="h-4 w-4 mr-2" />
                Send Response
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
} 