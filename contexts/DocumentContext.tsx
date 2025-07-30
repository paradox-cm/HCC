"use client"

import React, { createContext, useContext, useState, ReactNode } from 'react'

export interface Document {
  id: number
  patientId: number
  patientName: string
  name: string
  type: string
  date: string
  status: string
  uploadedBy: string
  notes?: string
}

interface DocumentContextType {
  documents: Document[]
  addDocument: (document: Omit<Document, 'id'>) => void
  updateDocument: (id: number, updates: Partial<Document>) => void
  deleteDocument: (id: number) => void
  getPatientDocuments: (patientId: number) => Document[]
}

const DocumentContext = createContext<DocumentContextType | undefined>(undefined)

// Initial mock data
const initialDocuments: Document[] = [
  {
    id: 1,
    patientId: 1,
    patientName: "Sarah Johnson",
    name: "Cardiac Stress Test Results",
    type: "Test Result",
    date: "2024-01-15",
    status: "available",
    uploadedBy: "Dr. Asif Ali",
    notes: "Stress test shows normal cardiac function"
  },
  {
    id: 2,
    patientId: 1,
    patientName: "Sarah Johnson",
    name: "Echocardiogram Report",
    type: "Imaging",
    date: "2024-01-10",
    status: "available",
    uploadedBy: "Dr. Asif Ali",
    notes: "Echo shows normal ejection fraction"
  },
  {
    id: 3,
    patientId: 1,
    patientName: "Sarah Johnson",
    name: "Lab Results - CBC Panel",
    type: "Lab Result",
    date: "2024-01-08",
    status: "available",
    uploadedBy: "Lab Tech",
    notes: "All values within normal range"
  },
  {
    id: 4,
    patientId: 2,
    patientName: "Michael Chen",
    name: "Echocardiogram Report",
    type: "Imaging",
    date: "2024-01-14",
    status: "pending",
    uploadedBy: "Dr. Sajid Ali",
    notes: "Pending review"
  },
  {
    id: 5,
    patientId: 2,
    patientName: "Michael Chen",
    name: "Chest X-Ray Images",
    type: "Imaging",
    date: "2024-01-12",
    status: "reviewed",
    uploadedBy: "Dr. Sajid Ali",
    notes: "No significant findings"
  }
]

export function DocumentProvider({ children }: { children: ReactNode }) {
  const [documents, setDocuments] = useState<Document[]>(initialDocuments)

  const addDocument = (documentData: Omit<Document, 'id'>) => {
    const newDocument: Document = {
      ...documentData,
      id: Math.max(...documents.map(d => d.id), 0) + 1
    }
    setDocuments(prev => [...prev, newDocument])
  }

  const updateDocument = (id: number, updates: Partial<Document>) => {
    setDocuments(prev => 
      prev.map(document => 
        document.id === id 
          ? { ...document, ...updates }
          : document
      )
    )
  }

  const deleteDocument = (id: number) => {
    setDocuments(prev => prev.filter(document => document.id !== id))
  }

  const getPatientDocuments = (patientId: number) => {
    return documents.filter(document => document.patientId === patientId)
  }

  return (
    <DocumentContext.Provider value={{
      documents,
      addDocument,
      updateDocument,
      deleteDocument,
      getPatientDocuments
    }}>
      {children}
    </DocumentContext.Provider>
  )
}

export function useDocuments() {
  const context = useContext(DocumentContext)
  if (context === undefined) {
    throw new Error('useDocuments must be used within a DocumentProvider')
  }
  return context
} 