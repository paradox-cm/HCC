"use client"

import React, { createContext, useContext, useState, ReactNode } from 'react'

export interface Prescription {
  id: number
  patientId: number
  patientName: string
  medication: string
  dosage: string
  frequency: string
  duration: string
  status: string
  prescribedBy: string
  prescribedDate: string
  refills: number
  notes?: string
}

interface PrescriptionContextType {
  prescriptions: Prescription[]
  addPrescription: (prescription: Omit<Prescription, 'id'>) => void
  updatePrescription: (id: number, updates: Partial<Prescription>) => void
  deletePrescription: (id: number) => void
  getPatientPrescriptions: (patientId: number) => Prescription[]
}

const PrescriptionContext = createContext<PrescriptionContextType | undefined>(undefined)

// Initial mock data
const initialPrescriptions: Prescription[] = [
  {
    id: 1,
    patientId: 1,
    patientName: "Sarah Johnson",
    medication: "Metoprolol",
    dosage: "50mg",
    frequency: "1 tablet daily",
    duration: "30 days",
    status: "active",
    prescribedBy: "Dr. Asif Ali",
    prescribedDate: "2024-01-15",
    refills: 3,
    notes: "For blood pressure management"
  },
  {
    id: 2,
    patientId: 1,
    patientName: "Sarah Johnson",
    medication: "Lisinopril",
    dosage: "10mg",
    frequency: "1 tablet daily",
    duration: "30 days",
    status: "active",
    prescribedBy: "Dr. Asif Ali",
    prescribedDate: "2024-01-15",
    refills: 2,
    notes: "ACE inhibitor for hypertension"
  },
  {
    id: 3,
    patientId: 2,
    patientName: "Michael Chen",
    medication: "Amlodipine",
    dosage: "5mg",
    frequency: "1 tablet daily",
    duration: "30 days",
    status: "active",
    prescribedBy: "Dr. Sajid Ali",
    prescribedDate: "2024-01-20",
    refills: 1,
    notes: "Calcium channel blocker"
  }
]

export function PrescriptionProvider({ children }: { children: ReactNode }) {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>(initialPrescriptions)

  const addPrescription = (prescriptionData: Omit<Prescription, 'id'>) => {
    const newPrescription: Prescription = {
      ...prescriptionData,
      id: Math.max(...prescriptions.map(p => p.id), 0) + 1
    }
    setPrescriptions(prev => [...prev, newPrescription])
  }

  const updatePrescription = (id: number, updates: Partial<Prescription>) => {
    setPrescriptions(prev => 
      prev.map(prescription => 
        prescription.id === id 
          ? { ...prescription, ...updates }
          : prescription
      )
    )
  }

  const deletePrescription = (id: number) => {
    setPrescriptions(prev => prev.filter(prescription => prescription.id !== id))
  }

  const getPatientPrescriptions = (patientId: number) => {
    return prescriptions.filter(prescription => prescription.patientId === patientId)
  }

  return (
    <PrescriptionContext.Provider value={{
      prescriptions,
      addPrescription,
      updatePrescription,
      deletePrescription,
      getPatientPrescriptions
    }}>
      {children}
    </PrescriptionContext.Provider>
  )
}

export function usePrescriptions() {
  const context = useContext(PrescriptionContext)
  if (context === undefined) {
    throw new Error('usePrescriptions must be used within a PrescriptionProvider')
  }
  return context
} 