"use client"

import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react'

// Centralized data types
export interface Patient {
  id: string | number
  name: string
  email: string
  phone: string
  dob: string
  address: string
  status: string
  assignedDoctor: string
  outstandingBalance: number
  lastVisit?: string
  nextAppointment?: string
  insurance: {
    provider: string
    memberId: string
    group: string
    status: string
  }
  emergencyContact: {
    name: string
    relationship: string
    phone: string
  }
  medicalHistory: {
    conditions: string[]
    allergies: string[]
    medications: string[]
  }
  quickStats: {
    totalAppointments: number
    pendingDocuments: number
    unreadMessages: number
    activePrescriptions: number
  }
  recentActivity: Array<{
    id: number
    type: string
    title: string
    date: string
    status: string
    description: string
  }>
  billing: {
    lastPayment: {
      amount: number
      date: string
      method: string
    }
    paymentHistory: Array<{
      id: number
      amount: number
      date: string
      method: string
      description: string
    }>
  }
}

export interface Appointment {
  id: number
  patientId: string | number
  patientName: string
  doctorId: number
  doctorName: string
  date: string
  time: string
  type: string
  status: string
  notes?: string
}

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

export interface Prescription {
  id: number
  patientId: string | number
  patientName: string
  medication: string
  dosage: string
  instructions: string
  status: string
  prescribedBy: string
  refills: number
  canRefill: boolean
  pharmacy: string
  lastUpdated: string
}

export interface Document {
  id: number
  patientId: string | number
  patientName: string
  name: string
  type: string
  date: string
  status: string
  uploadedBy: string
  fileSize: string
}

export interface CarePlan {
  id: number
  patientId: string | number
  patientName: string
  type: string
  status: string
  createdDate: string
  lastUpdated: string
  summary: string
  goals: string[]
  medications: Array<{
    name: string
    dosage: string
    frequency: string
  }>
  appointments: Array<{
    type: string
    doctor: string
    date: string
    time: string
  }>
  progress: number
}

export interface Transaction {
  id: number
  patientId: string | number
  patientName: string
  amount: number
  type: string
  method: string
  status: string
  date: string
  description?: string
}

export interface InsuranceClaim {
  id: number
  patientId: string | number
  patientName: string
  insuranceProvider: string
  memberId: string
  amount: number
  status: string
  serviceDate: string
  serviceType: string
  claimNumber: string
  dateSubmitted: string
  description?: string
}

interface DataSyncContextType {
  // Centralized data
  patients: Patient[]
  appointments: Appointment[]
  messageThreads: MessageThread[]
  prescriptions: Prescription[]
  documents: Document[]
  carePlans: CarePlan[]
  transactions: Transaction[]
  insuranceClaims: InsuranceClaim[]
  
  // Data synchronization functions
  syncPatientData: (patientId: string | number, updates: Partial<Patient>) => void
  syncAppointmentData: (appointmentId: number, updates: Partial<Appointment>) => void
  syncMessageData: (threadId: number, updates: Partial<MessageThread>) => void
  syncPrescriptionData: (prescriptionId: number, updates: Partial<Prescription>) => void
  syncDocumentData: (documentId: number, updates: Partial<Document>) => void
  syncCarePlanData: (carePlanId: number, updates: Partial<CarePlan>) => void
  syncTransactionData: (transactionId: number, updates: Partial<Transaction>) => void
  syncInsuranceClaimData: (claimId: number, updates: Partial<InsuranceClaim>) => void
  
  // Add new data
  addPatient: (patient: Omit<Patient, 'id'>) => void
  addAppointment: (appointment: Omit<Appointment, 'id'>) => void
  addMessageThread: (thread: Omit<MessageThread, 'id'>) => void
  addPrescription: (prescription: Omit<Prescription, 'id'>) => void
  addDocument: (document: Omit<Document, 'id'>) => void
  addCarePlan: (carePlan: Omit<CarePlan, 'id'>) => void
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void
  addInsuranceClaim: (claim: Omit<InsuranceClaim, 'id'>) => void
  
  // Delete data
  deletePatient: (patientId: string | number) => void
  deleteAppointment: (appointmentId: number) => void
  deleteMessageThread: (threadId: number) => void
  deletePrescription: (prescriptionId: number) => void
  deleteDocument: (documentId: number) => void
  deleteCarePlan: (carePlanId: number) => void
  deleteTransaction: (transactionId: number) => void
  deleteInsuranceClaim: (claimId: number) => void
  
  // Get data by patient
  getPatientAppointments: (patientId: string | number) => Appointment[]
  getPatientMessages: (patientId: string | number) => MessageThread[]
  getPatientPrescriptions: (patientId: string | number) => Prescription[]
  getPatientDocuments: (patientId: string | number) => Document[]
  getPatientCarePlans: (patientId: string | number) => CarePlan[]
  getPatientTransactions: (patientId: string | number) => Transaction[]
  getPatientInsuranceClaims: (patientId: string | number) => InsuranceClaim[]
  
  // Update related data when primary data changes
  updatePatientRelatedData: (patientId: string | number, updates: Partial<Patient>) => void
  updateAppointmentRelatedData: (appointmentId: number, updates: Partial<Appointment>) => void
}

const DataSyncContext = createContext<DataSyncContextType | undefined>(undefined)

// Initial mock data
const initialPatients: Patient[] = [
  {
    id: "P001",
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "(555) 123-4567",
    dob: "1985-04-12",
    address: "123 Main St, Houston, TX 77001",
    status: "Active",
    assignedDoctor: "Dr. Asif Ali",
    outstandingBalance: 150.00,
    lastVisit: "2024-01-15",
    nextAppointment: "2024-02-20",
    insurance: {
      provider: "Aetna",
      memberId: "AET123456789",
      group: "HCC-2024",
      status: "Active"
    },
    emergencyContact: {
      name: "Michael Johnson",
      relationship: "Spouse",
      phone: "(555) 987-6543"
    },
    medicalHistory: {
      conditions: ["Hypertension", "Type 2 Diabetes"],
      allergies: ["Penicillin"],
      medications: ["Metformin", "Lisinopril"]
    },
    quickStats: {
      totalAppointments: 12,
      pendingDocuments: 2,
      unreadMessages: 1,
      activePrescriptions: 3
    },
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
      }
    ],
    billing: {
      lastPayment: {
        amount: 75.00,
        date: "2024-01-10",
        method: "Credit Card"
      },
      paymentHistory: [
        {
          id: 1,
          amount: 75.00,
          date: "2024-01-10",
          method: "Credit Card",
          description: "Cardiology consultation"
        },
        {
          id: 2,
          amount: 150.00,
          date: "2024-01-05",
          method: "Insurance",
          description: "Lab work and tests"
        }
      ]
    }
  },
  {
    id: "P002",
    name: "Michael Chen",
    email: "michael.chen@email.com",
    phone: "(555) 234-5678",
    dob: "1978-09-23",
    address: "456 Oak Ave, Houston, TX 77002",
    status: "Active",
    assignedDoctor: "Dr. Sajid Ali",
    outstandingBalance: 0.00,
    lastVisit: "2024-01-10",
    nextAppointment: "2024-02-15",
    insurance: {
      provider: "Blue Cross",
      memberId: "BC123456789",
      group: "HCC-2024",
      status: "Active"
    },
    emergencyContact: {
      name: "Lisa Chen",
      relationship: "Spouse",
      phone: "(555) 876-5432"
    },
    medicalHistory: {
      conditions: ["High Cholesterol"],
      allergies: ["Sulfa Drugs"],
      medications: ["Atorvastatin"]
    },
    quickStats: {
      totalAppointments: 8,
      pendingDocuments: 0,
      unreadMessages: 0,
      activePrescriptions: 1
    },
    recentActivity: [
      {
        id: 1,
        type: "appointment",
        title: "Cardiology Follow-up",
        date: "2024-01-10",
        status: "completed",
        description: "Routine checkup with Dr. Sajid Ali"
      }
    ],
    billing: {
      lastPayment: {
        amount: 100.00,
        date: "2024-01-10",
        method: "Insurance"
      },
      paymentHistory: [
        {
          id: 1,
          amount: 100.00,
          date: "2024-01-10",
          method: "Insurance",
          description: "Cardiology consultation"
        }
      ]
    }
  },
  {
    id: "P003",
    name: "Emily Rodriguez",
    email: "emily.rodriguez@email.com",
    phone: "(555) 345-6789",
    dob: "1992-03-15",
    address: "789 Pine St, Houston, TX 77003",
    status: "Active",
    assignedDoctor: "Dr. Abdul Ali",
    outstandingBalance: 75.00,
    lastVisit: "2024-01-12",
    nextAppointment: "2024-02-18",
    insurance: {
      provider: "Cigna",
      memberId: "CIG123456789",
      group: "HCC-2024",
      status: "Active"
    },
    emergencyContact: {
      name: "Carlos Rodriguez",
      relationship: "Father",
      phone: "(555) 765-4321"
    },
    medicalHistory: {
      conditions: ["Heart Failure"],
      allergies: ["Latex"],
      medications: ["Carvedilol", "Furosemide"]
    },
    quickStats: {
      totalAppointments: 15,
      pendingDocuments: 1,
      unreadMessages: 2,
      activePrescriptions: 2
    },
    recentActivity: [
      {
        id: 1,
        type: "appointment",
        title: "Heart Failure Management",
        date: "2024-01-12",
        status: "completed",
        description: "Follow-up with Dr. Abdul Ali"
      },
      {
        id: 2,
        type: "message",
        title: "Symptom Report",
        date: "2024-01-13",
        status: "unread",
        description: "Patient reported increased shortness of breath"
      }
    ],
    billing: {
      lastPayment: {
        amount: 50.00,
        date: "2024-01-12",
        method: "Credit Card"
      },
      paymentHistory: [
        {
          id: 1,
          amount: 50.00,
          date: "2024-01-12",
          method: "Credit Card",
          description: "Heart failure consultation"
        }
      ]
    }
  },
  {
    id: "P004",
    name: "Robert Wilson",
    email: "robert.wilson@email.com",
    phone: "(555) 456-7890",
    dob: "1965-11-08",
    address: "321 Elm St, Houston, TX 77004",
    status: "Active",
    assignedDoctor: "Dr. Asif Ali",
    outstandingBalance: 200.00,
    lastVisit: "2024-01-08",
    nextAppointment: "2024-02-22",
    insurance: {
      provider: "UnitedHealth",
      memberId: "UHC123456789",
      group: "HCC-2024",
      status: "Active"
    },
    emergencyContact: {
      name: "Patricia Wilson",
      relationship: "Spouse",
      phone: "(555) 654-3210"
    },
    medicalHistory: {
      conditions: ["Hypertension", "Atrial Fibrillation"],
      allergies: ["Aspirin"],
      medications: ["Losartan", "Metoprolol"]
    },
    quickStats: {
      totalAppointments: 20,
      pendingDocuments: 3,
      unreadMessages: 0,
      activePrescriptions: 2
    },
    recentActivity: [
      {
        id: 1,
        type: "appointment",
        title: "Cardiology Consultation",
        date: "2024-01-08",
        status: "completed",
        description: "Regular checkup with Dr. Asif Ali"
      }
    ],
    billing: {
      lastPayment: {
        amount: 125.00,
        date: "2024-01-08",
        method: "Credit Card"
      },
      paymentHistory: [
        {
          id: 1,
          amount: 125.00,
          date: "2024-01-08",
          method: "Credit Card",
          description: "Cardiology consultation"
        }
      ]
    }
  },
  {
    id: "P005",
    name: "Lisa Thompson",
    email: "lisa.thompson@email.com",
    phone: "(555) 567-8901",
    dob: "1988-07-22",
    address: "654 Maple Dr, Houston, TX 77005",
    status: "Active",
    assignedDoctor: "Dr. Sajid Ali",
    outstandingBalance: 0.00,
    lastVisit: "2024-01-14",
    nextAppointment: "2024-02-25",
    insurance: {
      provider: "Humana",
      memberId: "HUM123456789",
      group: "HCC-2024",
      status: "Active"
    },
    emergencyContact: {
      name: "David Thompson",
      relationship: "Spouse",
      phone: "(555) 543-2109"
    },
    medicalHistory: {
      conditions: ["Chest Pain", "Anxiety"],
      allergies: ["Codeine"],
      medications: ["Diltiazem", "Alprazolam"]
    },
    quickStats: {
      totalAppointments: 6,
      pendingDocuments: 1,
      unreadMessages: 1,
      activePrescriptions: 2
    },
    recentActivity: [
      {
        id: 1,
        type: "appointment",
        title: "Chest Pain Evaluation",
        date: "2024-01-14",
        status: "completed",
        description: "Evaluation with Dr. Sajid Ali"
      },
      {
        id: 2,
        type: "message",
        title: "Medication Question",
        date: "2024-01-15",
        status: "unread",
        description: "Patient has questions about medication side effects"
      }
    ],
    billing: {
      lastPayment: {
        amount: 150.00,
        date: "2024-01-14",
        method: "Insurance"
      },
      paymentHistory: [
        {
          id: 1,
          amount: 150.00,
          date: "2024-01-14",
          method: "Insurance",
          description: "Chest pain evaluation"
        }
      ]
    }
  },
  {
    id: "P006",
    name: "David Martinez",
    email: "david.martinez@email.com",
    phone: "(555) 678-9012",
    dob: "1973-12-03",
    address: "987 Cedar Ln, Houston, TX 77006",
    status: "Active",
    assignedDoctor: "Dr. Abdul Ali",
    outstandingBalance: 300.00,
    lastVisit: "2024-01-05",
    nextAppointment: "2024-02-28",
    insurance: {
      provider: "Aetna",
      memberId: "AET987654321",
      group: "HCC-2024",
      status: "Active"
    },
    emergencyContact: {
      name: "Maria Martinez",
      relationship: "Spouse",
      phone: "(555) 432-1098"
    },
    medicalHistory: {
      conditions: ["Heart Disease", "Diabetes"],
      allergies: ["Iodine"],
      medications: ["Valsartan", "Metformin"]
    },
    quickStats: {
      totalAppointments: 25,
      pendingDocuments: 2,
      unreadMessages: 0,
      activePrescriptions: 2
    },
    recentActivity: [
      {
        id: 1,
        type: "appointment",
        title: "Cardiology Follow-up",
        date: "2024-01-05",
        status: "completed",
        description: "Follow-up with Dr. Abdul Ali"
      }
    ],
    billing: {
      lastPayment: {
        amount: 200.00,
        date: "2024-01-05",
        method: "Credit Card"
      },
      paymentHistory: [
        {
          id: 1,
          amount: 200.00,
          date: "2024-01-05",
          method: "Credit Card",
          description: "Cardiology consultation"
        }
      ]
    }
  },
  {
    id: "P007",
    name: "Jennifer Lee",
    email: "jennifer.lee@email.com",
    phone: "(555) 789-0123",
    dob: "1990-05-18",
    address: "147 Birch Rd, Houston, TX 77007",
    status: "Active",
    assignedDoctor: "Dr. Asif Ali",
    outstandingBalance: 0.00,
    lastVisit: "2024-01-16",
    nextAppointment: "2024-03-01",
    insurance: {
      provider: "Blue Cross",
      memberId: "BC987654321",
      group: "HCC-2024",
      status: "Active"
    },
    emergencyContact: {
      name: "James Lee",
      relationship: "Spouse",
      phone: "(555) 321-0987"
    },
    medicalHistory: {
      conditions: ["Hypertension"],
      allergies: ["Shellfish"],
      medications: ["Propranolol"]
    },
    quickStats: {
      totalAppointments: 4,
      pendingDocuments: 0,
      unreadMessages: 0,
      activePrescriptions: 1
    },
    recentActivity: [
      {
        id: 1,
        type: "appointment",
        title: "New Patient Consultation",
        date: "2024-01-16",
        status: "completed",
        description: "Initial consultation with Dr. Asif Ali"
      }
    ],
    billing: {
      lastPayment: {
        amount: 175.00,
        date: "2024-01-16",
        method: "Insurance"
      },
      paymentHistory: [
        {
          id: 1,
          amount: 175.00,
          date: "2024-01-16",
          method: "Insurance",
          description: "New patient consultation"
        }
      ]
    }
  },
  {
    id: "P008",
    name: "Thomas Brown",
    email: "thomas.brown@email.com",
    phone: "(555) 890-1234",
    dob: "1958-08-30",
    address: "258 Spruce Ave, Houston, TX 77008",
    status: "Active",
    assignedDoctor: "Dr. Sajid Ali",
    outstandingBalance: 150.00,
    lastVisit: "2024-01-11",
    nextAppointment: "2024-02-29",
    insurance: {
      provider: "Cigna",
      memberId: "CIG987654321",
      group: "HCC-2024",
      status: "Active"
    },
    emergencyContact: {
      name: "Susan Brown",
      relationship: "Spouse",
      phone: "(555) 210-9876"
    },
    medicalHistory: {
      conditions: ["Heart Failure", "Kidney Disease"],
      allergies: ["ACE Inhibitors"],
      medications: ["Enalapril", "Furosemide"]
    },
    quickStats: {
      totalAppointments: 30,
      pendingDocuments: 1,
      unreadMessages: 1,
      activePrescriptions: 2
    },
    recentActivity: [
      {
        id: 1,
        type: "appointment",
        title: "Heart Failure Management",
        date: "2024-01-11",
        status: "completed",
        description: "Management with Dr. Sajid Ali"
      },
      {
        id: 2,
        type: "message",
        title: "Symptom Update",
        date: "2024-01-12",
        status: "unread",
        description: "Patient reported improved symptoms"
      }
    ],
    billing: {
      lastPayment: {
        amount: 100.00,
        date: "2024-01-11",
        method: "Credit Card"
      },
      paymentHistory: [
        {
          id: 1,
          amount: 100.00,
          date: "2024-01-11",
          method: "Credit Card",
          description: "Heart failure consultation"
        }
      ]
    }
  },
  {
    id: "P009",
    name: "Amanda Davis",
    email: "amanda.davis@email.com",
    phone: "(555) 901-2345",
    dob: "1982-01-14",
    address: "369 Willow Way, Houston, TX 77009",
    status: "Active",
    assignedDoctor: "Dr. Abdul Ali",
    outstandingBalance: 0.00,
    lastVisit: "2024-01-13",
    nextAppointment: "2024-03-02",
    insurance: {
      provider: "UnitedHealth",
      memberId: "UHC987654321",
      group: "HCC-2024",
      status: "Active"
    },
    emergencyContact: {
      name: "Robert Davis",
      relationship: "Spouse",
      phone: "(555) 109-8765"
    },
    medicalHistory: {
      conditions: ["Hypertension", "High Cholesterol"],
      allergies: ["None"],
      medications: ["Candesartan", "Rosuvastatin"]
    },
    quickStats: {
      totalAppointments: 10,
      pendingDocuments: 0,
      unreadMessages: 0,
      activePrescriptions: 2
    },
    recentActivity: [
      {
        id: 1,
        type: "appointment",
        title: "Preventive Care",
        date: "2024-01-13",
        status: "completed",
        description: "Preventive care with Dr. Abdul Ali"
      }
    ],
    billing: {
      lastPayment: {
        amount: 125.00,
        date: "2024-01-13",
        method: "Insurance"
      },
      paymentHistory: [
        {
          id: 1,
          amount: 125.00,
          date: "2024-01-13",
          method: "Insurance",
          description: "Preventive care consultation"
        }
      ]
    }
  },
  {
    id: "P010",
    name: "Christopher Garcia",
    email: "christopher.garcia@email.com",
    phone: "(555) 012-3456",
    dob: "1975-06-25",
    address: "741 Poplar St, Houston, TX 77010",
    status: "Active",
    assignedDoctor: "Dr. Asif Ali",
    outstandingBalance: 75.00,
    lastVisit: "2024-01-09",
    nextAppointment: "2024-03-03",
    insurance: {
      provider: "Humana",
      memberId: "HUM987654321",
      group: "HCC-2024",
      status: "Active"
    },
    emergencyContact: {
      name: "Sofia Garcia",
      relationship: "Spouse",
      phone: "(555) 098-7654"
    },
    medicalHistory: {
      conditions: ["Atrial Fibrillation", "Hypertension"],
      allergies: ["Warfarin"],
      medications: ["Irbesartan", "Metoprolol"]
    },
    quickStats: {
      totalAppointments: 18,
      pendingDocuments: 1,
      unreadMessages: 1,
      activePrescriptions: 2
    },
    recentActivity: [
      {
        id: 1,
        type: "appointment",
        title: "Arrhythmia Management",
        date: "2024-01-09",
        status: "completed",
        description: "Management with Dr. Asif Ali"
      },
      {
        id: 2,
        type: "message",
        title: "Medication Question",
        date: "2024-01-10",
        status: "unread",
        description: "Patient has questions about medication timing"
      }
    ],
    billing: {
      lastPayment: {
        amount: 150.00,
        date: "2024-01-09",
        method: "Credit Card"
      },
      paymentHistory: [
        {
          id: 1,
          amount: 150.00,
          date: "2024-01-09",
          method: "Credit Card",
          description: "Arrhythmia consultation"
        }
      ]
    }
  }
]

const initialAppointments: Appointment[] = [
  {
    id: 1,
    patientId: "P001",
    patientName: "Sarah Johnson",
    doctorId: 1,
    doctorName: "Dr. Asif Ali",
    date: "2024-02-20",
    time: "10:00 AM",
    type: "Follow-up",
    status: "scheduled",
    notes: "Regular checkup for heart condition"
  },
  {
    id: 2,
    patientId: "P002",
    patientName: "Michael Chen",
    doctorId: 2,
    doctorName: "Dr. Sajid Ali",
    date: "2024-02-15",
    time: "10:30 AM",
    type: "Consultation",
    status: "scheduled",
    notes: "New patient consultation"
  },
  {
    id: 3,
    patientId: "P003",
    patientName: "Emily Rodriguez",
    doctorId: 3,
    doctorName: "Dr. Abdul Ali",
    date: "2024-02-18",
    time: "2:00 PM",
    type: "Procedure",
    status: "scheduled",
    notes: "Cardiac catheterization"
  },
  {
    id: 4,
    patientId: "P004",
    patientName: "Robert Wilson",
    doctorId: 1,
    doctorName: "Dr. Asif Ali",
    date: "2024-02-22",
    time: "8:30 AM",
    type: "Follow-up",
    status: "scheduled",
    notes: "Post-surgery follow-up"
  },
  {
    id: 5,
    patientId: "P005",
    patientName: "Lisa Thompson",
    doctorId: 2,
    doctorName: "Dr. Sajid Ali",
    date: "2024-02-25",
    time: "11:00 AM",
    type: "Consultation",
    status: "scheduled",
    notes: "Chest pain evaluation"
  },
  {
    id: 6,
    patientId: "P006",
    patientName: "David Martinez",
    doctorId: 3,
    doctorName: "Dr. Abdul Ali",
    date: "2024-02-28",
    time: "3:30 PM",
    type: "Test",
    status: "scheduled",
    notes: "Stress test"
  },
  {
    id: 7,
    patientId: "P007",
    patientName: "Jennifer Lee",
    doctorId: 1,
    doctorName: "Dr. Asif Ali",
    date: "2024-03-01",
    time: "9:00 AM",
    type: "Follow-up",
    status: "scheduled",
    notes: "Medication review"
  },
  {
    id: 8,
    patientId: "P008",
    patientName: "Thomas Brown",
    doctorId: 2,
    doctorName: "Dr. Sajid Ali",
    date: "2024-02-29",
    time: "1:00 PM",
    type: "Consultation",
    status: "scheduled",
    notes: "Heart murmur evaluation"
  },
  {
    id: 9,
    patientId: "P009",
    patientName: "Amanda Davis",
    doctorId: 3,
    doctorName: "Dr. Abdul Ali",
    date: "2024-03-02",
    time: "10:00 AM",
    type: "Procedure",
    status: "scheduled",
    notes: "Echocardiogram"
  },
  {
    id: 10,
    patientId: "P010",
    patientName: "Christopher Garcia",
    doctorId: 1,
    doctorName: "Dr. Asif Ali",
    date: "2024-03-03",
    time: "2:30 PM",
    type: "Follow-up",
    status: "scheduled",
    notes: "Blood pressure check"
  },
  {
    id: 11,
    patientId: "P001",
    patientName: "Sarah Johnson",
    doctorId: 1,
    doctorName: "Dr. Asif Ali",
    date: "2024-01-15",
    time: "9:00 AM",
    type: "Follow-up",
    status: "completed",
    notes: "Regular checkup completed successfully"
  },
  {
    id: 12,
    patientId: "P003",
    patientName: "Emily Rodriguez",
    doctorId: 3,
    doctorName: "Dr. Abdul Ali",
    date: "2024-01-12",
    time: "2:00 PM",
    type: "Procedure",
    status: "completed",
    notes: "Cardiac catheterization completed"
  },
  {
    id: 13,
    patientId: "P005",
    patientName: "Lisa Thompson",
    doctorId: 2,
    doctorName: "Dr. Sajid Ali",
    date: "2024-01-13",
    time: "11:00 AM",
    type: "Consultation",
    status: "completed",
    notes: "Chest pain evaluation completed"
  },
  {
    id: 14,
    patientId: "P007",
    patientName: "Jennifer Lee",
    doctorId: 1,
    doctorName: "Dr. Asif Ali",
    date: "2024-01-14",
    time: "9:00 AM",
    type: "Follow-up",
    status: "cancelled",
    notes: "Patient requested cancellation"
  },
  {
    id: 15,
    patientId: "P009",
    patientName: "Amanda Davis",
    doctorId: 3,
    doctorName: "Dr. Abdul Ali",
    date: "2024-01-14",
    time: "10:00 AM",
    type: "Procedure",
    status: "cancelled",
    notes: "Insurance authorization pending"
  },
  {
    id: 16,
    patientId: "P002",
    patientName: "Michael Chen",
    doctorId: 2,
    doctorName: "Dr. Sajid Ali",
    date: "2024-02-21",
    time: "8:00 AM",
    type: "Consultation",
    status: "rescheduled",
    notes: "Rescheduled from Feb 15 due to doctor availability"
  },
  {
    id: 17,
    patientId: "P004",
    patientName: "Robert Wilson",
    doctorId: 1,
    doctorName: "Dr. Asif Ali",
    date: "2024-02-22",
    time: "9:30 AM",
    type: "Follow-up",
    status: "rescheduled",
    notes: "Patient requested reschedule"
  },
  {
    id: 18,
    patientId: "P006",
    patientName: "David Martinez",
    doctorId: 3,
    doctorName: "Dr. Abdul Ali",
    date: "2024-01-11",
    time: "10:30 AM",
    type: "Consultation",
    status: "no-show",
    notes: "Patient did not show up"
  },
  {
    id: 19,
    patientId: "P008",
    patientName: "Thomas Brown",
    doctorId: 2,
    doctorName: "Dr. Sajid Ali",
    date: "2024-01-12",
    time: "3:30 PM",
    type: "Test",
    status: "no-show",
    notes: "Patient called to cancel but was too late"
  },
  {
    id: 20,
    patientId: "P010",
    patientName: "Christopher Garcia",
    doctorId: 1,
    doctorName: "Dr. Asif Ali",
    date: "2024-03-25",
    time: "8:30 AM",
    type: "Follow-up",
    status: "scheduled",
    notes: "Post-procedure check"
  },
  {
    id: 21,
    patientId: "P002",
    patientName: "Michael Chen",
    doctorId: 2,
    doctorName: "Dr. Sajid Ali",
    date: "2024-03-26",
    time: "1:00 PM",
    type: "Consultation",
    status: "scheduled",
    notes: "Family history review"
  },
  {
    id: 22,
    patientId: "P004",
    patientName: "Robert Wilson",
    doctorId: 3,
    doctorName: "Dr. Abdul Ali",
    date: "2024-03-27",
    time: "10:00 AM",
    type: "Procedure",
    status: "scheduled",
    notes: "Echocardiogram"
  },
  {
    id: 23,
    patientId: "P006",
    patientName: "David Martinez",
    doctorId: 1,
    doctorName: "Dr. Asif Ali",
    date: "2024-03-28",
    time: "2:30 PM",
    type: "Follow-up",
    status: "scheduled",
    notes: "Blood pressure check"
  },
  {
    id: 24,
    patientId: "P008",
    patientName: "Thomas Brown",
    doctorId: 2,
    doctorName: "Dr. Sajid Ali",
    date: "2024-03-29",
    time: "9:00 AM",
    type: "Consultation",
    status: "scheduled",
    notes: "Family history review"
  }
]

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
    subject: "Appointment Reschedule Request",
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
    subject: "Test Results Question",
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
    subject: "Medication Side Effects",
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
    subject: "Insurance Coverage Question",
    category: "billing",
    priority: "medium",
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
    subject: "Follow-up Appointment Request",
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
    subject: "Allergic Reaction to Medication",
    category: "medication",
    priority: "high",
    status: "urgent",
    assignedTo: "Dr. Asif Ali",
    messages: [
      {
        id: 1,
        from: "patient",
        sender: "Jennifer Lee",
        text: "I think I'm having an allergic reaction to my new medication. My face is swollen and I'm having trouble breathing.",
        timestamp: "2024-01-15T12:00:00Z"
      }
    ],
    lastMessageTime: "2024-01-15T12:00:00Z"
  },
  {
    id: 8,
    patientId: "P008",
    patientName: "Thomas Brown",
    patientEmail: "thomas.brown@email.com",
    subject: "Appointment Cancellation",
    category: "appointment",
    priority: "low",
    status: "completed",
    assignedTo: "Dr. Abdul Ali",
    messages: [
      {
        id: 1,
        from: "patient",
        sender: "Thomas Brown",
        text: "I'd like to cancel my appointment for tomorrow. Something came up and I can't make it.",
        timestamp: "2024-01-14T15:30:00Z"
      },
      {
        id: 2,
        from: "admin",
        sender: "Dr. Abdul Ali",
        text: "No problem, I've cancelled your appointment. Please reschedule when convenient.",
        timestamp: "2024-01-14T15:45:00Z"
      }
    ],
    lastMessageTime: "2024-01-14T15:45:00Z"
  },
  {
    id: 9,
    patientId: "P009",
    patientName: "Amanda Davis",
    patientEmail: "amanda.davis@email.com",
    subject: "Lab Results Timeline",
    category: "test-results",
    priority: "medium",
    status: "in-progress",
    assignedTo: "Dr. Sajid Ali",
    messages: [
      {
        id: 1,
        from: "patient",
        sender: "Amanda Davis",
        text: "When will my lab results be available? I had blood work done last week.",
        timestamp: "2024-01-15T09:00:00Z"
      },
      {
        id: 2,
        from: "admin",
        sender: "Dr. Sajid Ali",
        text: "Your results should be available by tomorrow. I'll review them and contact you if anything needs attention.",
        timestamp: "2024-01-15T09:30:00Z"
      }
    ],
    lastMessageTime: "2024-01-15T09:30:00Z"
  },
  {
    id: 10,
    patientId: "P010",
    patientName: "Christopher Garcia",
    patientEmail: "christopher.garcia@email.com",
    subject: "Billing Error",
    category: "billing",
    priority: "medium",
    status: "unread",
    assignedTo: "Billing Team",
    messages: [
      {
        id: 1,
        from: "patient",
        sender: "Christopher Garcia",
        text: "I received a bill for my recent visit but I think there's an error. Can someone review this?",
        timestamp: "2024-01-15T13:15:00Z"
      }
    ],
    lastMessageTime: "2024-01-15T13:15:00Z"
  },
  {
    id: 11,
    patientId: "P001",
    patientName: "Sarah Johnson",
    patientEmail: "sarah.johnson@email.com",
    subject: "Prescription Confirmation",
    category: "appointment",
    priority: "low",
    status: "completed",
    assignedTo: "Dr. Asif Ali",
    messages: [
      {
        id: 1,
        from: "patient",
        sender: "Sarah Johnson",
        text: "Thank you for the prescription refill. I was able to pick it up from the pharmacy.",
        timestamp: "2024-01-14T16:00:00Z"
      },
      {
        id: 2,
        from: "admin",
        sender: "Dr. Asif Ali",
        text: "Great! Let me know if you have any questions about the medication.",
        timestamp: "2024-01-14T16:15:00Z"
      }
    ],
    lastMessageTime: "2024-01-14T16:15:00Z"
  },
  {
    id: 12,
    patientId: "P002",
    patientName: "Michael Chen",
    patientEmail: "michael.chen@email.com",
    subject: "Medication Instructions",
    category: "medication",
    priority: "medium",
    status: "unread",
    assignedTo: "Dr. Sajid Ali",
    messages: [
      {
        id: 1,
        from: "patient",
        sender: "Michael Chen",
        text: "I forgot to ask during my appointment - can I take my medication with food?",
        timestamp: "2024-01-15T07:45:00Z"
      }
    ],
    lastMessageTime: "2024-01-15T07:45:00Z"
  },
  {
    id: 13,
    patientId: "P003",
    patientName: "Emily Rodriguez",
    patientEmail: "emily.rodriguez@email.com",
    subject: "Chest Pain Emergency",
    category: "appointment",
    priority: "high",
    status: "urgent",
    assignedTo: "Dr. Abdul Ali",
    messages: [
      {
        id: 1,
        from: "patient",
        sender: "Emily Rodriguez",
        text: "I'm experiencing chest pain and shortness of breath. Should I come in immediately?",
        timestamp: "2024-01-15T15:30:00Z"
      }
    ],
    lastMessageTime: "2024-01-15T15:30:00Z"
  },
  {
    id: 14,
    patientId: "P004",
    patientName: "Robert Wilson",
    patientEmail: "robert.wilson@email.com",
    subject: "EKG Results",
    category: "test-results",
    priority: "medium",
    status: "in-progress",
    assignedTo: "Dr. Asif Ali",
    messages: [
      {
        id: 1,
        from: "patient",
        sender: "Robert Wilson",
        text: "I had an EKG done yesterday. When will the results be available?",
        timestamp: "2024-01-15T10:00:00Z"
      },
      {
        id: 2,
        from: "admin",
        sender: "Dr. Asif Ali",
        text: "The EKG results are already in your chart. Everything looks normal. I'll call you to discuss.",
        timestamp: "2024-01-15T10:30:00Z"
      }
    ],
    lastMessageTime: "2024-01-15T10:30:00Z"
  },
  {
    id: 15,
    patientId: "P005",
    patientName: "Lisa Thompson",
    patientEmail: "lisa.thompson@email.com",
    subject: "Appointment Reschedule",
    category: "appointment",
    priority: "low",
    status: "completed",
    assignedTo: "Dr. Sajid Ali",
    messages: [
      {
        id: 1,
        from: "patient",
        sender: "Lisa Thompson",
        text: "I need to reschedule my appointment for next month. What dates are available?",
        timestamp: "2024-01-14T14:20:00Z"
      },
      {
        id: 2,
        from: "admin",
        sender: "Dr. Sajid Ali",
        text: "I have openings on the 15th and 22nd. Which works better for you?",
        timestamp: "2024-01-14T14:45:00Z"
      },
      {
        id: 3,
        from: "patient",
        sender: "Lisa Thompson",
        text: "The 15th would be perfect. Thank you!",
        timestamp: "2024-01-14T15:00:00Z"
      }
    ],
    lastMessageTime: "2024-01-14T15:00:00Z"
  },
  {
    id: 16,
    patientId: "P006",
    patientName: "David Martinez",
    patientEmail: "david.martinez@email.com",
    subject: "Medication Refill Request",
    category: "medication",
    priority: "medium",
    status: "unread",
    assignedTo: "Dr. Sajid Ali",
    messages: [
      {
        id: 1,
        from: "patient",
        sender: "David Martinez",
        text: "I'm running low on my heart medication. Can I get a refill?",
        timestamp: "2024-01-15T11:45:00Z"
      }
    ],
    lastMessageTime: "2024-01-15T11:45:00Z"
  },
  {
    id: 17,
    patientId: "P007",
    patientName: "Jennifer Lee",
    patientEmail: "jennifer.lee@email.com",
    subject: "Payment Confirmation",
    category: "billing",
    priority: "low",
    status: "completed",
    assignedTo: "Billing Team",
    messages: [
      {
        id: 1,
        from: "patient",
        sender: "Jennifer Lee",
        text: "I received a statement but I already paid this bill. Can you check?",
        timestamp: "2024-01-14T12:30:00Z"
      },
      {
        id: 2,
        from: "admin",
        sender: "Billing Team",
        text: "I can see your payment was received. The statement was sent before the payment was processed. You're all set!",
        timestamp: "2024-01-14T13:00:00Z"
      }
    ],
    lastMessageTime: "2024-01-14T13:00:00Z"
  },
  {
    id: 18,
    patientId: "P008",
    patientName: "Thomas Brown",
    patientEmail: "thomas.brown@email.com",
    subject: "Stress Test Results",
    category: "test-results",
    priority: "medium",
    status: "in-progress",
    assignedTo: "Dr. Abdul Ali",
    messages: [
      {
        id: 1,
        from: "patient",
        sender: "Thomas Brown",
        text: "I had a stress test last week. When will I get the results?",
        timestamp: "2024-01-15T08:15:00Z"
      },
      {
        id: 2,
        from: "admin",
        sender: "Dr. Abdul Ali",
        text: "Your stress test results are ready. I'll call you today to discuss them.",
        timestamp: "2024-01-15T08:45:00Z"
      }
    ],
    lastMessageTime: "2024-01-15T08:45:00Z"
  },
  {
    id: 19,
    patientId: "P009",
    patientName: "Amanda Davis",
    patientEmail: "amanda.davis@email.com",
    subject: "Severe Chest Pain",
    category: "appointment",
    priority: "high",
    status: "urgent",
    assignedTo: "Dr. Sajid Ali",
    messages: [
      {
        id: 1,
        from: "patient",
        sender: "Amanda Davis",
        text: "I'm having severe chest pain and my blood pressure is very high. Should I go to the ER?",
        timestamp: "2024-01-15T16:00:00Z"
      }
    ],
    lastMessageTime: "2024-01-15T16:00:00Z"
  },
  {
    id: 20,
    patientId: "P010",
    patientName: "Christopher Garcia",
    patientEmail: "christopher.garcia@email.com",
    subject: "Medication Side Effects",
    category: "medication",
    priority: "medium",
    status: "unread",
    assignedTo: "Dr. Asif Ali",
    messages: [
      {
        id: 1,
        from: "patient",
        sender: "Christopher Garcia",
        text: "I'm having trouble with my blood pressure medication. It's making me very tired. Is this normal?",
        timestamp: "2024-01-15T14:30:00Z"
      }
    ],
    lastMessageTime: "2024-01-15T14:30:00Z"
  }
]

const initialPrescriptions: Prescription[] = [
  {
    id: 1,
    patientId: "P001",
    patientName: "Sarah Johnson",
    medication: "Lisinopril",
    dosage: "10mg",
    instructions: "Take 1 tablet daily in the morning",
    status: "Active",
    prescribedBy: "Dr. Asif Ali",
    refills: 3,
    canRefill: true,
    pharmacy: "CVS Pharmacy",
    lastUpdated: "2024-01-15"
  },
  {
    id: 2,
    patientId: "P001",
    patientName: "Sarah Johnson",
    medication: "Metformin",
    dosage: "500mg",
    instructions: "Take 1 tablet twice daily with meals",
    status: "Active",
    prescribedBy: "Dr. Asif Ali",
    refills: 2,
    canRefill: true,
    pharmacy: "CVS Pharmacy",
    lastUpdated: "2024-01-15"
  },
  {
    id: 3,
    patientId: "P001",
    patientName: "Sarah Johnson",
    medication: "Atorvastatin",
    dosage: "20mg",
    instructions: "Take 1 tablet daily at bedtime",
    status: "Active",
    prescribedBy: "Dr. Asif Ali",
    refills: 1,
    canRefill: false,
    pharmacy: "CVS Pharmacy",
    lastUpdated: "2024-01-15"
  },
  {
    id: 4,
    patientId: "P002",
    patientName: "Michael Chen",
    medication: "Atorvastatin",
    dosage: "10mg",
    instructions: "Take 1 tablet daily at bedtime",
    status: "Active",
    prescribedBy: "Dr. Sajid Ali",
    refills: 4,
    canRefill: true,
    pharmacy: "Walgreens",
    lastUpdated: "2024-01-10"
  },
  {
    id: 5,
    patientId: "P003",
    patientName: "Emily Rodriguez",
    medication: "Carvedilol",
    dosage: "25mg",
    instructions: "Take 1 tablet twice daily",
    status: "Active",
    prescribedBy: "Dr. Abdul Ali",
    refills: 2,
    canRefill: true,
    pharmacy: "Walgreens",
    lastUpdated: "2024-01-12"
  },
  {
    id: 6,
    patientId: "P003",
    patientName: "Emily Rodriguez",
    medication: "Furosemide",
    dosage: "40mg",
    instructions: "Take 1 tablet daily in the morning",
    status: "Active",
    prescribedBy: "Dr. Abdul Ali",
    refills: 3,
    canRefill: true,
    pharmacy: "Walgreens",
    lastUpdated: "2024-01-12"
  },
  {
    id: 7,
    patientId: "P004",
    patientName: "Robert Wilson",
    medication: "Losartan",
    dosage: "50mg",
    instructions: "Take 1 tablet daily",
    status: "Active",
    prescribedBy: "Dr. Asif Ali",
    refills: 2,
    canRefill: true,
    pharmacy: "CVS Pharmacy",
    lastUpdated: "2024-01-08"
  },
  {
    id: 8,
    patientId: "P004",
    patientName: "Robert Wilson",
    medication: "Metoprolol",
    dosage: "50mg",
    instructions: "Take 1 tablet twice daily",
    status: "Active",
    prescribedBy: "Dr. Asif Ali",
    refills: 1,
    canRefill: false,
    pharmacy: "CVS Pharmacy",
    lastUpdated: "2024-01-08"
  },
  {
    id: 9,
    patientId: "P005",
    patientName: "Lisa Thompson",
    medication: "Diltiazem",
    dosage: "120mg",
    instructions: "Take 1 capsule daily",
    status: "Active",
    prescribedBy: "Dr. Sajid Ali",
    refills: 3,
    canRefill: true,
    pharmacy: "Walgreens",
    lastUpdated: "2024-01-14"
  },
  {
    id: 10,
    patientId: "P005",
    patientName: "Lisa Thompson",
    medication: "Alprazolam",
    dosage: "0.5mg",
    instructions: "Take 1 tablet as needed for anxiety",
    status: "Active",
    prescribedBy: "Dr. Sajid Ali",
    refills: 2,
    canRefill: true,
    pharmacy: "Walgreens",
    lastUpdated: "2024-01-14"
  },
  {
    id: 11,
    patientId: "P006",
    patientName: "David Martinez",
    medication: "Valsartan",
    dosage: "160mg",
    instructions: "Take 1 tablet daily",
    status: "Active",
    prescribedBy: "Dr. Abdul Ali",
    refills: 2,
    canRefill: true,
    pharmacy: "CVS Pharmacy",
    lastUpdated: "2024-01-05"
  },
  {
    id: 12,
    patientId: "P006",
    patientName: "David Martinez",
    medication: "Metformin",
    dosage: "1000mg",
    instructions: "Take 1 tablet twice daily with meals",
    status: "Active",
    prescribedBy: "Dr. Abdul Ali",
    refills: 1,
    canRefill: false,
    pharmacy: "CVS Pharmacy",
    lastUpdated: "2024-01-05"
  },
  {
    id: 13,
    patientId: "P007",
    patientName: "Jennifer Lee",
    medication: "Propranolol",
    dosage: "40mg",
    instructions: "Take 1 tablet twice daily",
    status: "Active",
    prescribedBy: "Dr. Asif Ali",
    refills: 4,
    canRefill: true,
    pharmacy: "Walgreens",
    lastUpdated: "2024-01-16"
  },
  {
    id: 14,
    patientId: "P008",
    patientName: "Thomas Brown",
    medication: "Enalapril",
    dosage: "10mg",
    instructions: "Take 1 tablet daily",
    status: "Active",
    prescribedBy: "Dr. Sajid Ali",
    refills: 2,
    canRefill: true,
    pharmacy: "CVS Pharmacy",
    lastUpdated: "2024-01-11"
  },
  {
    id: 15,
    patientId: "P008",
    patientName: "Thomas Brown",
    medication: "Furosemide",
    dosage: "20mg",
    instructions: "Take 1 tablet daily in the morning",
    status: "Active",
    prescribedBy: "Dr. Sajid Ali",
    refills: 3,
    canRefill: true,
    pharmacy: "CVS Pharmacy",
    lastUpdated: "2024-01-11"
  },
  {
    id: 16,
    patientId: "P009",
    patientName: "Amanda Davis",
    medication: "Candesartan",
    dosage: "16mg",
    instructions: "Take 1 tablet daily",
    status: "Active",
    prescribedBy: "Dr. Abdul Ali",
    refills: 2,
    canRefill: true,
    pharmacy: "Walgreens",
    lastUpdated: "2024-01-13"
  },
  {
    id: 17,
    patientId: "P009",
    patientName: "Amanda Davis",
    medication: "Rosuvastatin",
    dosage: "10mg",
    instructions: "Take 1 tablet daily at bedtime",
    status: "Active",
    prescribedBy: "Dr. Abdul Ali",
    refills: 1,
    canRefill: false,
    pharmacy: "Walgreens",
    lastUpdated: "2024-01-13"
  },
  {
    id: 18,
    patientId: "P010",
    patientName: "Christopher Garcia",
    medication: "Irbesartan",
    dosage: "150mg",
    instructions: "Take 1 tablet daily",
    status: "Active",
    prescribedBy: "Dr. Asif Ali",
    refills: 3,
    canRefill: true,
    pharmacy: "CVS Pharmacy",
    lastUpdated: "2024-01-09"
  },
  {
    id: 19,
    patientId: "P010",
    patientName: "Christopher Garcia",
    medication: "Metoprolol",
    dosage: "25mg",
    instructions: "Take 1 tablet twice daily",
    status: "Active",
    prescribedBy: "Dr. Asif Ali",
    refills: 2,
    canRefill: true,
    pharmacy: "CVS Pharmacy",
    lastUpdated: "2024-01-09"
  },
  {
    id: 20,
    patientId: "P002",
    patientName: "Michael Chen",
    medication: "Aspirin",
    dosage: "81mg",
    instructions: "Take 1 tablet daily",
    status: "Active",
    prescribedBy: "Dr. Sajid Ali",
    refills: 5,
    canRefill: true,
    pharmacy: "Walgreens",
    lastUpdated: "2024-01-10"
  },
  {
    id: 21,
    patientId: "P003",
    patientName: "Emily Rodriguez",
    medication: "Spironolactone",
    dosage: "25mg",
    instructions: "Take 1 tablet daily",
    status: "Active",
    prescribedBy: "Dr. Abdul Ali",
    refills: 1,
    canRefill: false,
    pharmacy: "Walgreens",
    lastUpdated: "2024-01-12"
  },
  {
    id: 22,
    patientId: "P004",
    patientName: "Robert Wilson",
    medication: "Warfarin",
    dosage: "5mg",
    instructions: "Take 1 tablet daily",
    status: "Active",
    prescribedBy: "Dr. Asif Ali",
    refills: 2,
    canRefill: true,
    pharmacy: "CVS Pharmacy",
    lastUpdated: "2024-01-08"
  },
  {
    id: 23,
    patientId: "P005",
    patientName: "Lisa Thompson",
    medication: "Nitroglycerin",
    dosage: "0.4mg",
    instructions: "Take 1 tablet under tongue as needed for chest pain",
    status: "Active",
    prescribedBy: "Dr. Sajid Ali",
    refills: 2,
    canRefill: true,
    pharmacy: "Walgreens",
    lastUpdated: "2024-01-14"
  },
  {
    id: 24,
    patientId: "P006",
    patientName: "David Martinez",
    medication: "Glipizide",
    dosage: "5mg",
    instructions: "Take 1 tablet twice daily before meals",
    status: "Active",
    prescribedBy: "Dr. Abdul Ali",
    refills: 3,
    canRefill: true,
    pharmacy: "CVS Pharmacy",
    lastUpdated: "2024-01-05"
  },
  {
    id: 25,
    patientId: "P007",
    patientName: "Jennifer Lee",
    medication: "Amlodipine",
    dosage: "5mg",
    instructions: "Take 1 tablet daily",
    status: "Active",
    prescribedBy: "Dr. Asif Ali",
    refills: 2,
    canRefill: true,
    pharmacy: "Walgreens",
    lastUpdated: "2024-01-16"
  }
]

const initialDocuments: Document[] = [
  {
    id: 1,
    patientId: "P001",
    patientName: "Sarah Johnson",
    name: "Cardiac Stress Test Results",
    type: "Test Result",
    date: "2024-01-15",
    status: "available",
    uploadedBy: "Dr. Asif Ali",
    fileSize: "2.5 MB"
  },
  {
    id: 2,
    patientId: "P001",
    patientName: "Sarah Johnson",
    name: "EKG Report",
    type: "Test Result",
    date: "2024-01-15",
    status: "available",
    uploadedBy: "Dr. Asif Ali",
    fileSize: "1.8 MB"
  },
  {
    id: 3,
    patientId: "P001",
    patientName: "Sarah Johnson",
    name: "Blood Work Results",
    type: "Test Result",
    date: "2024-01-14",
    status: "available",
    uploadedBy: "Lab Technician",
    fileSize: "3.2 MB"
  },
  {
    id: 4,
    patientId: "P002",
    patientName: "Michael Chen",
    name: "Echocardiogram Report",
    type: "Test Result",
    date: "2024-01-10",
    status: "available",
    uploadedBy: "Dr. Sajid Ali",
    fileSize: "4.1 MB"
  },
  {
    id: 5,
    patientId: "P002",
    patientName: "Michael Chen",
    name: "Cholesterol Panel",
    type: "Test Result",
    date: "2024-01-10",
    status: "available",
    uploadedBy: "Lab Technician",
    fileSize: "2.7 MB"
  },
  {
    id: 6,
    patientId: "P003",
    patientName: "Emily Rodriguez",
    name: "Cardiac Catheterization Report",
    type: "Test Result",
    date: "2024-01-12",
    status: "available",
    uploadedBy: "Dr. Abdul Ali",
    fileSize: "5.3 MB"
  },
  {
    id: 7,
    patientId: "P003",
    patientName: "Emily Rodriguez",
    name: "Chest X-Ray",
    type: "Test Result",
    date: "2024-01-12",
    status: "available",
    uploadedBy: "Radiologist",
    fileSize: "2.9 MB"
  },
  {
    id: 8,
    patientId: "P004",
    patientName: "Robert Wilson",
    name: "EKG Results",
    type: "Test Result",
    date: "2024-01-08",
    status: "available",
    uploadedBy: "Dr. Asif Ali",
    fileSize: "1.6 MB"
  },
  {
    id: 9,
    patientId: "P004",
    patientName: "Robert Wilson",
    name: "Blood Pressure Log",
    type: "Patient Document",
    date: "2024-01-08",
    status: "available",
    uploadedBy: "Robert Wilson",
    fileSize: "0.8 MB"
  },
  {
    id: 10,
    patientId: "P005",
    patientName: "Lisa Thompson",
    name: "Chest Pain Evaluation",
    type: "Consultation Note",
    date: "2024-01-14",
    status: "available",
    uploadedBy: "Dr. Sajid Ali",
    fileSize: "1.2 MB"
  },
  {
    id: 11,
    patientId: "P005",
    patientName: "Lisa Thompson",
    name: "Stress Test Results",
    type: "Test Result",
    date: "2024-01-14",
    status: "available",
    uploadedBy: "Dr. Sajid Ali",
    fileSize: "3.4 MB"
  },
  {
    id: 12,
    patientId: "P006",
    patientName: "David Martinez",
    name: "Heart Failure Management Plan",
    type: "Care Plan",
    date: "2024-01-05",
    status: "available",
    uploadedBy: "Dr. Abdul Ali",
    fileSize: "2.1 MB"
  },
  {
    id: 13,
    patientId: "P006",
    patientName: "David Martinez",
    name: "Diabetes Management Guidelines",
    type: "Patient Education",
    date: "2024-01-05",
    status: "available",
    uploadedBy: "Nurse Practitioner",
    fileSize: "1.5 MB"
  },
  {
    id: 14,
    patientId: "P007",
    patientName: "Jennifer Lee",
    name: "New Patient Intake Form",
    type: "Patient Document",
    date: "2024-01-16",
    status: "available",
    uploadedBy: "Jennifer Lee",
    fileSize: "1.8 MB"
  },
  {
    id: 15,
    patientId: "P007",
    patientName: "Jennifer Lee",
    name: "Insurance Card Copy",
    type: "Patient Document",
    date: "2024-01-16",
    status: "available",
    uploadedBy: "Front Desk",
    fileSize: "0.9 MB"
  },
  {
    id: 16,
    patientId: "P008",
    patientName: "Thomas Brown",
    name: "Heart Failure Assessment",
    type: "Consultation Note",
    date: "2024-01-11",
    status: "available",
    uploadedBy: "Dr. Sajid Ali",
    fileSize: "2.3 MB"
  },
  {
    id: 17,
    patientId: "P008",
    patientName: "Thomas Brown",
    name: "Kidney Function Test",
    type: "Test Result",
    date: "2024-01-11",
    status: "available",
    uploadedBy: "Lab Technician",
    fileSize: "2.8 MB"
  },
  {
    id: 18,
    patientId: "P009",
    patientName: "Amanda Davis",
    name: "Preventive Care Plan",
    type: "Care Plan",
    date: "2024-01-13",
    status: "available",
    uploadedBy: "Dr. Abdul Ali",
    fileSize: "1.9 MB"
  },
  {
    id: 19,
    patientId: "P009",
    patientName: "Amanda Davis",
    name: "Lipid Panel Results",
    type: "Test Result",
    date: "2024-01-13",
    status: "available",
    uploadedBy: "Lab Technician",
    fileSize: "2.4 MB"
  },
  {
    id: 20,
    patientId: "P010",
    patientName: "Christopher Garcia",
    name: "Arrhythmia Assessment",
    type: "Consultation Note",
    date: "2024-01-09",
    status: "available",
    uploadedBy: "Dr. Asif Ali",
    fileSize: "2.0 MB"
  },
  {
    id: 21,
    patientId: "P010",
    patientName: "Christopher Garcia",
    name: "Holter Monitor Results",
    type: "Test Result",
    date: "2024-01-09",
    status: "available",
    uploadedBy: "Dr. Asif Ali",
    fileSize: "4.7 MB"
  },
  {
    id: 22,
    patientId: "P001",
    patientName: "Sarah Johnson",
    name: "Medication List",
    type: "Patient Document",
    date: "2024-01-15",
    status: "pending",
    uploadedBy: "Sarah Johnson",
    fileSize: "0.5 MB"
  },
  {
    id: 23,
    patientId: "P003",
    patientName: "Emily Rodriguez",
    name: "Symptom Diary",
    type: "Patient Document",
    date: "2024-01-13",
    status: "pending",
    uploadedBy: "Emily Rodriguez",
    fileSize: "0.7 MB"
  },
  {
    id: 24,
    patientId: "P004",
    patientName: "Robert Wilson",
    name: "Insurance Appeal Letter",
    type: "Patient Document",
    date: "2024-01-08",
    status: "pending",
    uploadedBy: "Robert Wilson",
    fileSize: "1.1 MB"
  },
  {
    id: 25,
    patientId: "P006",
    patientName: "David Martinez",
    name: "Blood Sugar Log",
    type: "Patient Document",
    date: "2024-01-05",
    status: "pending",
    uploadedBy: "David Martinez",
    fileSize: "0.6 MB"
  }
]

const initialCarePlans: CarePlan[] = [
  {
    id: 1,
    patientId: "P001",
    patientName: "Sarah Johnson",
    type: "Preventive Care",
    status: "Active",
    createdDate: "2024-01-15",
    lastUpdated: "2024-01-15",
    summary: "Preventive care plan focused on blood pressure and cholesterol management.",
    goals: [
      "Maintain blood pressure below 130/80 mmHg",
      "Keep LDL cholesterol under 100 mg/dL",
      "Exercise at least 150 minutes per week",
      "Follow a heart-healthy diet",
      "Take medications as prescribed"
    ],
    medications: [
      { name: "Lisinopril", dosage: "10mg", frequency: "1 tablet daily" },
      { name: "Metformin", dosage: "500mg", frequency: "1 tablet twice daily" },
      { name: "Atorvastatin", dosage: "20mg", frequency: "1 tablet daily at bedtime" }
    ],
    appointments: [
      { type: "Follow-up", doctor: "Dr. Asif Ali", date: "2024-07-25", time: "10:00 AM" },
      { type: "Lab work", doctor: "Lab", date: "2024-07-20", time: "9:00 AM" }
    ],
    progress: 75
  },
  {
    id: 2,
    patientId: "P002",
    patientName: "Michael Chen",
    type: "Cholesterol Management",
    status: "Active",
    createdDate: "2024-01-10",
    lastUpdated: "2024-01-10",
    summary: "Comprehensive plan to manage high cholesterol through medication and lifestyle changes.",
    goals: [
      "Reduce LDL cholesterol to below 100 mg/dL",
      "Increase HDL cholesterol above 40 mg/dL",
      "Maintain healthy weight",
      "Exercise regularly",
      "Follow low-fat diet"
    ],
    medications: [
      { name: "Atorvastatin", dosage: "10mg", frequency: "1 tablet daily at bedtime" },
      { name: "Aspirin", dosage: "81mg", frequency: "1 tablet daily" }
    ],
    appointments: [
      { type: "Follow-up", doctor: "Dr. Sajid Ali", date: "2024-07-15", time: "2:00 PM" },
      { type: "Lab work", doctor: "Lab", date: "2024-07-10", time: "8:00 AM" }
    ],
    progress: 60
  },
  {
    id: 3,
    patientId: "P003",
    patientName: "Emily Rodriguez",
    type: "Heart Failure Management",
    status: "Active",
    createdDate: "2024-01-12",
    lastUpdated: "2024-01-12",
    summary: "Comprehensive heart failure management plan with medication optimization and lifestyle modifications.",
    goals: [
      "Maintain stable weight",
      "Monitor daily weight changes",
      "Limit sodium intake to 2g daily",
      "Exercise as tolerated",
      "Take medications exactly as prescribed"
    ],
    medications: [
      { name: "Carvedilol", dosage: "25mg", frequency: "1 tablet twice daily" },
      { name: "Furosemide", dosage: "40mg", frequency: "1 tablet daily in morning" },
      { name: "Spironolactone", dosage: "25mg", frequency: "1 tablet daily" }
    ],
    appointments: [
      { type: "Follow-up", doctor: "Dr. Abdul Ali", date: "2024-07-18", time: "11:00 AM" },
      { type: "Echocardiogram", doctor: "Cardiology", date: "2024-07-15", time: "10:00 AM" }
    ],
    progress: 80
  },
  {
    id: 4,
    patientId: "P004",
    patientName: "Robert Wilson",
    type: "Hypertension & Arrhythmia",
    status: "Active",
    createdDate: "2024-01-08",
    lastUpdated: "2024-01-08",
    summary: "Dual management plan for hypertension and atrial fibrillation with anticoagulation therapy.",
    goals: [
      "Maintain blood pressure below 130/80 mmHg",
      "Prevent stroke with anticoagulation",
      "Monitor INR levels regularly",
      "Avoid alcohol and smoking",
      "Exercise regularly"
    ],
    medications: [
      { name: "Losartan", dosage: "50mg", frequency: "1 tablet daily" },
      { name: "Metoprolol", dosage: "50mg", frequency: "1 tablet twice daily" },
      { name: "Warfarin", dosage: "5mg", frequency: "1 tablet daily" }
    ],
    appointments: [
      { type: "Follow-up", doctor: "Dr. Asif Ali", date: "2024-07-22", time: "9:30 AM" },
      { type: "INR check", doctor: "Lab", date: "2024-07-18", time: "8:00 AM" }
    ],
    progress: 70
  },
  {
    id: 5,
    patientId: "P005",
    patientName: "Lisa Thompson",
    type: "Chest Pain Management",
    status: "Active",
    createdDate: "2024-01-14",
    lastUpdated: "2024-01-14",
    summary: "Comprehensive plan to manage chest pain and anxiety with medication and stress management.",
    goals: [
      "Reduce chest pain episodes",
      "Manage anxiety symptoms",
      "Learn stress management techniques",
      "Exercise regularly",
      "Follow up regularly"
    ],
    medications: [
      { name: "Diltiazem", dosage: "120mg", frequency: "1 capsule daily" },
      { name: "Alprazolam", dosage: "0.5mg", frequency: "1 tablet as needed" },
      { name: "Nitroglycerin", dosage: "0.4mg", frequency: "1 tablet as needed for chest pain" }
    ],
    appointments: [
      { type: "Follow-up", doctor: "Dr. Sajid Ali", date: "2024-07-25", time: "1:00 PM" },
      { type: "Stress test", doctor: "Cardiology", date: "2024-07-20", time: "9:00 AM" }
    ],
    progress: 65
  },
  {
    id: 6,
    patientId: "P006",
    patientName: "David Martinez",
    type: "Heart Disease & Diabetes",
    status: "Active",
    createdDate: "2024-01-05",
    lastUpdated: "2024-01-05",
    summary: "Integrated care plan for heart disease and diabetes management with comprehensive monitoring.",
    goals: [
      "Maintain blood pressure below 130/80 mmHg",
      "Keep blood sugar under control",
      "Monitor kidney function",
      "Exercise regularly",
      "Follow diabetic diet"
    ],
    medications: [
      { name: "Valsartan", dosage: "160mg", frequency: "1 tablet daily" },
      { name: "Metformin", dosage: "1000mg", frequency: "1 tablet twice daily" },
      { name: "Glipizide", dosage: "5mg", frequency: "1 tablet twice daily" }
    ],
    appointments: [
      { type: "Follow-up", doctor: "Dr. Abdul Ali", date: "2024-07-28", time: "10:30 AM" },
      { type: "Lab work", doctor: "Lab", date: "2024-07-25", time: "8:00 AM" }
    ],
    progress: 85
  },
  {
    id: 7,
    patientId: "P007",
    patientName: "Jennifer Lee",
    type: "New Patient Care",
    status: "Active",
    createdDate: "2024-01-16",
    lastUpdated: "2024-01-16",
    summary: "Initial care plan for new patient with hypertension management and lifestyle modifications.",
    goals: [
      "Establish baseline health metrics",
      "Implement lifestyle changes",
      "Monitor blood pressure regularly",
      "Learn about heart health",
      "Establish regular follow-up schedule"
    ],
    medications: [
      { name: "Propranolol", dosage: "40mg", frequency: "1 tablet twice daily" },
      { name: "Amlodipine", dosage: "5mg", frequency: "1 tablet daily" }
    ],
    appointments: [
      { type: "Follow-up", doctor: "Dr. Asif Ali", date: "2024-08-01", time: "11:00 AM" },
      { type: "Lab work", doctor: "Lab", date: "2024-07-30", time: "9:00 AM" }
    ],
    progress: 40
  },
  {
    id: 8,
    patientId: "P008",
    patientName: "Thomas Brown",
    type: "Heart Failure & Kidney Disease",
    status: "Active",
    createdDate: "2024-01-11",
    lastUpdated: "2024-01-11",
    summary: "Complex care plan for heart failure with kidney disease requiring careful medication management.",
    goals: [
      "Maintain stable heart function",
      "Preserve kidney function",
      "Monitor fluid balance",
      "Follow low-sodium diet",
      "Regular monitoring"
    ],
    medications: [
      { name: "Enalapril", dosage: "10mg", frequency: "1 tablet daily" },
      { name: "Furosemide", dosage: "20mg", frequency: "1 tablet daily" }
    ],
    appointments: [
      { type: "Follow-up", doctor: "Dr. Sajid Ali", date: "2024-07-29", time: "2:30 PM" },
      { type: "Kidney function test", doctor: "Lab", date: "2024-07-26", time: "8:00 AM" }
    ],
    progress: 90
  },
  {
    id: 9,
    patientId: "P009",
    patientName: "Amanda Davis",
    type: "Preventive Care",
    status: "Active",
    createdDate: "2024-01-13",
    lastUpdated: "2024-01-13",
    summary: "Preventive care plan focusing on cardiovascular health and cholesterol management.",
    goals: [
      "Maintain optimal cholesterol levels",
      "Prevent cardiovascular disease",
      "Exercise regularly",
      "Follow heart-healthy diet",
      "Regular health screenings"
    ],
    medications: [
      { name: "Candesartan", dosage: "16mg", frequency: "1 tablet daily" },
      { name: "Rosuvastatin", dosage: "10mg", frequency: "1 tablet daily at bedtime" }
    ],
    appointments: [
      { type: "Follow-up", doctor: "Dr. Abdul Ali", date: "2024-08-02", time: "10:00 AM" },
      { type: "Lipid panel", doctor: "Lab", date: "2024-07-30", time: "8:00 AM" }
    ],
    progress: 55
  },
  {
    id: 10,
    patientId: "P010",
    patientName: "Christopher Garcia",
    type: "Arrhythmia Management",
    status: "Active",
    createdDate: "2024-01-09",
    lastUpdated: "2024-01-09",
    summary: "Comprehensive arrhythmia management plan with medication and lifestyle modifications.",
    goals: [
      "Control heart rhythm",
      "Prevent stroke",
      "Monitor symptoms",
      "Exercise as tolerated",
      "Avoid triggers"
    ],
    medications: [
      { name: "Irbesartan", dosage: "150mg", frequency: "1 tablet daily" },
      { name: "Metoprolol", dosage: "25mg", frequency: "1 tablet twice daily" }
    ],
    appointments: [
      { type: "Follow-up", doctor: "Dr. Asif Ali", date: "2024-08-03", time: "1:30 PM" },
      { type: "Holter monitor", doctor: "Cardiology", date: "2024-07-31", time: "9:00 AM" }
    ],
    progress: 70
  }
]

const initialTransactions: Transaction[] = [
  {
    id: 1,
    patientId: "P001",
    patientName: "Sarah Johnson",
    amount: 75.00,
    type: "payment",
    method: "Credit Card",
    status: "completed",
    date: "2024-01-15",
    description: "Cardiology consultation"
  }
]

const initialInsuranceClaims: InsuranceClaim[] = [
  {
    id: 1,
    patientId: "P001",
    patientName: "Sarah Johnson",
    insuranceProvider: "Aetna",
    memberId: "AET123456789",
    amount: 150.00,
    status: "pending",
    serviceDate: "2024-01-15",
    serviceType: "Cardiology Consultation",
    claimNumber: "CLM001234",
    dateSubmitted: "2024-01-16",
    description: "Follow-up cardiology consultation"
  }
]

export function DataSyncProvider({ children }: { children: ReactNode }) {
  const [patients, setPatients] = useState<Patient[]>(initialPatients)
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments)
  const [messageThreads, setMessageThreads] = useState<MessageThread[]>(initialMessageThreads)
  const [prescriptions, setPrescriptions] = useState<Prescription[]>(initialPrescriptions)
  const [documents, setDocuments] = useState<Document[]>(initialDocuments)
  const [carePlans, setCarePlans] = useState<CarePlan[]>(initialCarePlans)
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions)
  const [insuranceClaims, setInsuranceClaims] = useState<InsuranceClaim[]>(initialInsuranceClaims)

  // Patient data synchronization
  const syncPatientData = useCallback((patientId: string | number, updates: Partial<Patient>) => {
    setPatients(prev => prev.map(patient => 
      patient.id === patientId ? { ...patient, ...updates } : patient
    ))
  }, [])

  // Appointment data synchronization
  const syncAppointmentData = useCallback((appointmentId: number, updates: Partial<Appointment>) => {
    setAppointments(prev => prev.map(appointment => 
      appointment.id === appointmentId ? { ...appointment, ...updates } : appointment
    ))
  }, [])

  // Message data synchronization
  const syncMessageData = useCallback((threadId: number, updates: Partial<MessageThread>) => {
    setMessageThreads(prev => prev.map(thread => 
      thread.id === threadId ? { ...thread, ...updates } : thread
    ))
  }, [])

  // Prescription data synchronization
  const syncPrescriptionData = useCallback((prescriptionId: number, updates: Partial<Prescription>) => {
    setPrescriptions(prev => prev.map(prescription => 
      prescription.id === prescriptionId ? { ...prescription, ...updates } : prescription
    ))
  }, [])

  // Document data synchronization
  const syncDocumentData = useCallback((documentId: number, updates: Partial<Document>) => {
    setDocuments(prev => prev.map(document => 
      document.id === documentId ? { ...document, ...updates } : document
    ))
  }, [])

  // Care plan data synchronization
  const syncCarePlanData = useCallback((carePlanId: number, updates: Partial<CarePlan>) => {
    setCarePlans(prev => prev.map(carePlan => 
      carePlan.id === carePlanId ? { ...carePlan, ...updates } : carePlan
    ))
  }, [])

  // Transaction data synchronization
  const syncTransactionData = useCallback((transactionId: number, updates: Partial<Transaction>) => {
    setTransactions(prev => prev.map(transaction => 
      transaction.id === transactionId ? { ...transaction, ...updates } : transaction
    ))
  }, [])

  // Insurance claim data synchronization
  const syncInsuranceClaimData = useCallback((claimId: number, updates: Partial<InsuranceClaim>) => {
    setInsuranceClaims(prev => prev.map(claim => 
      claim.id === claimId ? { ...claim, ...updates } : claim
    ))
  }, [])

  // Add new data functions
  const addPatient = useCallback((patient: Omit<Patient, 'id'>) => {
    const newPatient: Patient = {
      ...patient,
      id: `P${String(patients.length + 1).padStart(3, '0')}`
    }
    setPatients(prev => [...prev, newPatient])
  }, [patients.length])

  const addAppointment = useCallback((appointment: Omit<Appointment, 'id'>) => {
    const newAppointment: Appointment = {
      ...appointment,
      id: Math.max(...appointments.map(a => a.id), 0) + 1
    }
    setAppointments(prev => [...prev, newAppointment])
  }, [appointments])

  const addMessageThread = useCallback((thread: Omit<MessageThread, 'id'>) => {
    const newThread: MessageThread = {
      ...thread,
      id: Math.max(...messageThreads.map(t => t.id), 0) + 1
    }
    setMessageThreads(prev => [...prev, newThread])
  }, [messageThreads])

  const addPrescription = useCallback((prescription: Omit<Prescription, 'id'>) => {
    const newPrescription: Prescription = {
      ...prescription,
      id: Math.max(...prescriptions.map(p => p.id), 0) + 1
    }
    setPrescriptions(prev => [...prev, newPrescription])
  }, [prescriptions])

  const addDocument = useCallback((document: Omit<Document, 'id'>) => {
    const newDocument: Document = {
      ...document,
      id: Math.max(...documents.map(d => d.id), 0) + 1
    }
    setDocuments(prev => [...prev, newDocument])
  }, [documents])

  const addCarePlan = useCallback((carePlan: Omit<CarePlan, 'id'>) => {
    const newCarePlan: CarePlan = {
      ...carePlan,
      id: Math.max(...carePlans.map(c => c.id), 0) + 1
    }
    setCarePlans(prev => [...prev, newCarePlan])
  }, [carePlans])

  const addTransaction = useCallback((transaction: Omit<Transaction, 'id'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: Math.max(...transactions.map(t => t.id), 0) + 1
    }
    setTransactions(prev => [...prev, newTransaction])
  }, [transactions])

  const addInsuranceClaim = useCallback((claim: Omit<InsuranceClaim, 'id'>) => {
    const newClaim: InsuranceClaim = {
      ...claim,
      id: Math.max(...insuranceClaims.map(c => c.id), 0) + 1
    }
    setInsuranceClaims(prev => [...prev, newClaim])
  }, [insuranceClaims])

  // Delete data functions
  const deletePatient = useCallback((patientId: string | number) => {
    setPatients(prev => prev.filter(patient => patient.id !== patientId))
  }, [])

  const deleteAppointment = useCallback((appointmentId: number) => {
    setAppointments(prev => prev.filter(appointment => appointment.id !== appointmentId))
  }, [])

  const deleteMessageThread = useCallback((threadId: number) => {
    setMessageThreads(prev => prev.filter(thread => thread.id !== threadId))
  }, [])

  const deletePrescription = useCallback((prescriptionId: number) => {
    setPrescriptions(prev => prev.filter(prescription => prescription.id !== prescriptionId))
  }, [])

  const deleteDocument = useCallback((documentId: number) => {
    setDocuments(prev => prev.filter(document => document.id !== documentId))
  }, [])

  const deleteCarePlan = useCallback((carePlanId: number) => {
    setCarePlans(prev => prev.filter(carePlan => carePlan.id !== carePlanId))
  }, [])

  const deleteTransaction = useCallback((transactionId: number) => {
    setTransactions(prev => prev.filter(transaction => transaction.id !== transactionId))
  }, [])

  const deleteInsuranceClaim = useCallback((claimId: number) => {
    setInsuranceClaims(prev => prev.filter(claim => claim.id !== claimId))
  }, [])

  // Get data by patient functions
  const getPatientAppointments = useCallback((patientId: string | number) => {
    return appointments.filter(appointment => appointment.patientId === patientId)
  }, [appointments])

  const getPatientMessages = useCallback((patientId: string | number) => {
    return messageThreads.filter(thread => thread.patientId === patientId.toString())
  }, [messageThreads])

  const getPatientPrescriptions = useCallback((patientId: string | number) => {
    return prescriptions.filter(prescription => prescription.patientId === patientId)
  }, [prescriptions])

  const getPatientDocuments = useCallback((patientId: string | number) => {
    return documents.filter(document => document.patientId === patientId)
  }, [documents])

  const getPatientCarePlans = useCallback((patientId: string | number) => {
    return carePlans.filter(carePlan => carePlan.patientId === patientId)
  }, [carePlans])

  const getPatientTransactions = useCallback((patientId: string | number) => {
    return transactions.filter(transaction => transaction.patientId === patientId)
  }, [transactions])

  const getPatientInsuranceClaims = useCallback((patientId: string | number) => {
    return insuranceClaims.filter(claim => claim.patientId === patientId)
  }, [insuranceClaims])

  // Update related data functions
  const updatePatientRelatedData = useCallback((patientId: string | number, updates: Partial<Patient>) => {
    // Update patient data
    syncPatientData(patientId, updates)
    
    // Update related appointments
    const patientAppointments = getPatientAppointments(patientId)
    patientAppointments.forEach(appointment => {
      if (updates.name) {
        syncAppointmentData(appointment.id, { patientName: updates.name })
      }
    })
    
    // Update related prescriptions
    const patientPrescriptions = getPatientPrescriptions(patientId)
    patientPrescriptions.forEach(prescription => {
      if (updates.name) {
        syncPrescriptionData(prescription.id, { patientName: updates.name })
      }
    })
    
    // Update related documents
    const patientDocuments = getPatientDocuments(patientId)
    patientDocuments.forEach(document => {
      if (updates.name) {
        syncDocumentData(document.id, { patientName: updates.name })
      }
    })
    
    // Update related care plans
    const patientCarePlans = getPatientCarePlans(patientId)
    patientCarePlans.forEach(carePlan => {
      if (updates.name) {
        syncCarePlanData(carePlan.id, { patientName: updates.name })
      }
    })
    
    // Update related transactions
    const patientTransactions = getPatientTransactions(patientId)
    patientTransactions.forEach(transaction => {
      if (updates.name) {
        syncTransactionData(transaction.id, { patientName: updates.name })
      }
    })
    
    // Update related insurance claims
    const patientInsuranceClaims = getPatientInsuranceClaims(patientId)
    patientInsuranceClaims.forEach(claim => {
      if (updates.name) {
        syncInsuranceClaimData(claim.id, { patientName: updates.name })
      }
    })
  }, [syncPatientData, syncAppointmentData, syncPrescriptionData, syncDocumentData, syncCarePlanData, syncTransactionData, syncInsuranceClaimData, getPatientAppointments, getPatientPrescriptions, getPatientDocuments, getPatientCarePlans, getPatientTransactions, getPatientInsuranceClaims])

  const updateAppointmentRelatedData = useCallback((appointmentId: number, updates: Partial<Appointment>) => {
    // Update appointment data
    syncAppointmentData(appointmentId, updates)
    
    // Update patient's next appointment if this is a scheduled appointment
    if (updates.status === 'scheduled' && updates.date) {
      const appointment = appointments.find(a => a.id === appointmentId)
      if (appointment) {
        syncPatientData(appointment.patientId, { nextAppointment: updates.date })
      }
    }
  }, [syncAppointmentData, syncPatientData, appointments])

  return (
    <DataSyncContext.Provider value={{
      patients,
      appointments,
      messageThreads,
      prescriptions,
      documents,
      carePlans,
      transactions,
      insuranceClaims,
      syncPatientData,
      syncAppointmentData,
      syncMessageData,
      syncPrescriptionData,
      syncDocumentData,
      syncCarePlanData,
      syncTransactionData,
      syncInsuranceClaimData,
      addPatient,
      addAppointment,
      addMessageThread,
      addPrescription,
      addDocument,
      addCarePlan,
      addTransaction,
      addInsuranceClaim,
      deletePatient,
      deleteAppointment,
      deleteMessageThread,
      deletePrescription,
      deleteDocument,
      deleteCarePlan,
      deleteTransaction,
      deleteInsuranceClaim,
      getPatientAppointments,
      getPatientMessages,
      getPatientPrescriptions,
      getPatientDocuments,
      getPatientCarePlans,
      getPatientTransactions,
      getPatientInsuranceClaims,
      updatePatientRelatedData,
      updateAppointmentRelatedData
    }}>
      {children}
    </DataSyncContext.Provider>
  )
}

export function useDataSync() {
  const context = useContext(DataSyncContext)
  if (context === undefined) {
    throw new Error('useDataSync must be used within a DataSyncProvider')
  }
  return context
} 