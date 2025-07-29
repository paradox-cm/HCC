"use client"

import React, { createContext, useContext, useState, ReactNode } from 'react'

export interface Message {
  id: number
  from: "patient" | "admin"
  sender: string
  text: string
  timestamp: string
}

export interface MessageThread {
  id: number
  patientId: string
  patientName: string
  patientEmail: string
  subject: string
  category: string
  priority: string
  status: string
  assignedTo: string
  messages: Message[]
  lastMessageTime: string
}

interface MessageContextType {
  messageThreads: MessageThread[]
  addMessageToThread: (patientId: string, patientName: string, patientEmail: string, subject: string, message: string, category?: string, priority?: string) => void
  addReplyToThread: (threadId: number, message: string) => void
  markThreadAsRead: (threadId: number) => void
  archiveThread: (threadId: number) => void
  deleteThread: (threadId: number) => void
  restoreThread: (threadId: number) => void
}

const MessageContext = createContext<MessageContextType | undefined>(undefined)

// Initial mock data
const initialMessageThreads: MessageThread[] = [
  {
    id: 1,
    patientId: "P001",
    patientName: "Sarah Johnson",
    patientEmail: "sarah.johnson@email.com",
    subject: "Blood Pressure Medication Refill Request",
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
    subject: "Appointment Rescheduling Request",
    category: "appointment",
    priority: "medium",
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
    subject: "Test Results Inquiry",
    category: "test-results",
    priority: "high",
    status: "unread",
    assignedTo: "Dr. Asif Ali",
    messages: [
      {
        id: 1,
        from: "patient",
        sender: "Emily Rodriguez",
        text: "Hello, I had blood work done last week and was wondering if the results are available. I'm a bit anxious about them.",
        timestamp: "2024-01-15T14:20:00Z"
      }
    ],
    lastMessageTime: "2024-01-15T14:20:00Z"
  },
  {
    id: 4,
    patientId: "P004",
    patientName: "Robert Wilson",
    patientEmail: "robert.wilson@email.com",
    subject: "Billing Question - Insurance Coverage",
    category: "billing",
    priority: "low",
    status: "in-progress",
    assignedTo: "Billing Team",
    messages: [
      {
        id: 1,
        from: "patient",
        sender: "Robert Wilson",
        text: "I received a bill for my recent visit but I think my insurance should have covered more. Can someone help me understand the charges?",
        timestamp: "2024-01-15T11:45:00Z"
      },
      {
        id: 2,
        from: "admin",
        sender: "Billing Team",
        text: "I'll be happy to help you review your bill and insurance coverage. Can you provide your insurance information and the date of your visit?",
        timestamp: "2024-01-15T12:15:00Z"
      }
    ],
    lastMessageTime: "2024-01-15T12:15:00Z"
  },
  {
    id: 5,
    patientId: "P005",
    patientName: "Lisa Thompson",
    patientEmail: "lisa.thompson@email.com",
    subject: "Side Effects from New Medication",
    category: "medication",
    priority: "high",
    status: "urgent",
    assignedTo: "Dr. Abdul Ali",
    messages: [
      {
        id: 1,
        from: "patient",
        sender: "Lisa Thompson",
        text: "I started the new medication you prescribed last week and I'm experiencing some concerning side effects. Should I stop taking it?",
        timestamp: "2024-01-15T16:30:00Z"
      }
    ],
    lastMessageTime: "2024-01-15T16:30:00Z"
  },
  {
    id: 6,
    patientId: "P006",
    patientName: "David Martinez",
    patientEmail: "david.martinez@email.com",
    subject: "Follow-up Appointment Scheduling",
    category: "appointment",
    priority: "medium",
    status: "unread",
    assignedTo: "Dr. Sajid Ali",
    messages: [
      {
        id: 1,
        from: "patient",
        sender: "David Martinez",
        text: "I need to schedule a follow-up appointment for my diabetes management. What's the earliest available time?",
        timestamp: "2024-01-15T13:10:00Z"
      }
    ],
    lastMessageTime: "2024-01-15T13:10:00Z"
  },
  {
    id: 7,
    patientId: "P007",
    patientName: "Jennifer Lee",
    patientEmail: "jennifer.lee@email.com",
    subject: "Prescription Transfer Request",
    category: "medication",
    priority: "medium",
    status: "in-progress",
    assignedTo: "Nursing Staff",
    messages: [
      {
        id: 1,
        from: "patient",
        sender: "Jennifer Lee",
        text: "I'd like to transfer my prescriptions to your pharmacy. Can you help me with this process?",
        timestamp: "2024-01-15T10:00:00Z"
      },
      {
        id: 2,
        from: "admin",
        sender: "Nursing Staff",
        text: "Absolutely! I can help you transfer your prescriptions. Please provide the names of your current medications and your current pharmacy.",
        timestamp: "2024-01-15T10:30:00Z"
      }
    ],
    lastMessageTime: "2024-01-15T10:30:00Z"
  },
  {
    id: 8,
    patientId: "P008",
    patientName: "Thomas Brown",
    patientEmail: "thomas.brown@email.com",
    subject: "Medical Records Request",
    category: "records",
    priority: "low",
    status: "unread",
    assignedTo: "Dr. Asif Ali",
    messages: [
      {
        id: 1,
        from: "patient",
        sender: "Thomas Brown",
        text: "I need copies of my medical records for my new insurance provider. How do I request these?",
        timestamp: "2024-01-15T15:45:00Z"
      }
    ],
    lastMessageTime: "2024-01-15T15:45:00Z"
  }
]

export function MessageProvider({ children }: { children: ReactNode }) {
  const [messageThreads, setMessageThreads] = useState<MessageThread[]>(initialMessageThreads)
  const [nextThreadId, setNextThreadId] = useState(3)

  const addMessageToThread = (
    patientId: string, 
    patientName: string, 
    patientEmail: string, 
    subject: string,
    message: string, 
    category: string = "general", 
    priority: string = "normal"
  ) => {
    const now = new Date().toISOString()
    
    // Check if thread already exists for this patient
    const existingThread = messageThreads.find(thread => thread.patientId === patientId)
    
    if (existingThread) {
      // Add message to existing thread
      const newMessage: Message = {
        id: existingThread.messages.length + 1,
        from: "admin",
        sender: "Dr. Asif Ali", // Default sender
        text: message,
        timestamp: now
      }
      
      setMessageThreads(prev => prev.map(thread => 
        thread.id === existingThread.id 
          ? {
              ...thread,
              messages: [...thread.messages, newMessage],
              lastMessageTime: now,
              status: "in-progress"
            }
          : thread
      ))
    } else {
      // Create new thread
      const newThread: MessageThread = {
        id: nextThreadId,
        patientId,
        patientName,
        patientEmail,
        subject,
        category,
        priority,
        status: "unread",
        assignedTo: "Dr. Asif Ali",
        messages: [
          {
            id: 1,
            from: "admin",
            sender: "Dr. Asif Ali",
            text: message,
            timestamp: now
          }
        ],
        lastMessageTime: now
      }
      
      setMessageThreads(prev => [...prev, newThread])
      setNextThreadId(prev => prev + 1)
    }
  }

  const addReplyToThread = (threadId: number, message: string) => {
    const now = new Date().toISOString()
    
    setMessageThreads(prev => prev.map(thread => {
      if (thread.id === threadId) {
        const newMessage: Message = {
          id: thread.messages.length + 1,
          from: "admin",
          sender: "Dr. Asif Ali",
          text: message,
          timestamp: now
        }
        
        return {
          ...thread,
          messages: [...thread.messages, newMessage],
          lastMessageTime: now,
          status: "in-progress"
        }
      }
      return thread
    }))
  }

  const markThreadAsRead = (threadId: number) => {
    setMessageThreads(prev => prev.map(thread => 
      thread.id === threadId 
        ? { ...thread, status: "read" }
        : thread
    ))
  }

  const archiveThread = (threadId: number) => {
    setMessageThreads(prev => prev.map(thread => 
      thread.id === threadId 
        ? { ...thread, status: "archived" }
        : thread
    ))
  }

  const deleteThread = (threadId: number) => {
    setMessageThreads(prev => prev.filter(thread => thread.id !== threadId))
  }

  const restoreThread = (threadId: number) => {
    setMessageThreads(prev => prev.map(thread => 
      thread.id === threadId 
        ? { ...thread, status: "read" }
        : thread
    ))
  }

  return (
    <MessageContext.Provider value={{
      messageThreads,
      addMessageToThread,
      addReplyToThread,
      markThreadAsRead,
      archiveThread,
      deleteThread,
      restoreThread
    }}>
      {children}
    </MessageContext.Provider>
  )
}

export function useMessages() {
  const context = useContext(MessageContext)
  if (context === undefined) {
    throw new Error('useMessages must be used within a MessageProvider')
  }
  return context
} 