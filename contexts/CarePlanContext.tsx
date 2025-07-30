"use client"

import React, { createContext, useContext, useState, ReactNode } from 'react'

export interface CarePlan {
  id: number
  patientId: number
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

interface CarePlanContextType {
  carePlans: CarePlan[]
  addCarePlan: (carePlan: Omit<CarePlan, 'id'>) => void
  updateCarePlan: (id: number, updates: Partial<CarePlan>) => void
  deleteCarePlan: (id: number) => void
  getPatientCarePlans: (patientId: number) => CarePlan[]
}

const CarePlanContext = createContext<CarePlanContextType | undefined>(undefined)

// Initial mock data
const initialCarePlans: CarePlan[] = [
  {
    id: 1,
    patientId: 1,
    patientName: "Sarah Johnson",
    type: "Preventive Care",
    status: "Active",
    createdDate: "2024-01-15",
    lastUpdated: "2024-06-01",
    summary: "Preventive care plan focused on blood pressure and cholesterol management.",
    goals: [
      "Maintain blood pressure below 130/80 mmHg",
      "Keep LDL cholesterol under 100 mg/dL",
      "Exercise at least 150 minutes per week",
      "Follow a heart-healthy diet",
      "Take medications as prescribed"
    ],
    medications: [
      { name: "Metoprolol", dosage: "50mg", frequency: "1 tablet daily" },
      { name: "Atorvastatin", dosage: "20mg", frequency: "1 tablet daily" },
      { name: "Lisinopril", dosage: "10mg", frequency: "1 tablet daily" }
    ],
    appointments: [
      { type: "Follow-up", doctor: "Dr. Asif Ali", date: "2024-07-25", time: "10:00 AM" },
      { type: "Lab work", doctor: "Lab", date: "2024-07-20", time: "9:00 AM" }
    ],
    progress: 75
  },
  {
    id: 2,
    patientId: 2,
    patientName: "Michael Chen",
    type: "Post-Procedure",
    status: "Active",
    createdDate: "2024-03-20",
    lastUpdated: "2024-05-28",
    summary: "Post-cardiac procedure recovery and monitoring plan.",
    goals: [
      "Complete cardiac rehabilitation program",
      "Monitor incision site for signs of infection",
      "Gradually increase physical activity",
      "Attend all follow-up appointments",
      "Report any chest pain or shortness of breath"
    ],
    medications: [
      { name: "Aspirin", dosage: "81mg", frequency: "1 tablet daily" },
      { name: "Clopidogrel", dosage: "75mg", frequency: "1 tablet daily" },
      { name: "Metoprolol", dosage: "25mg", frequency: "2 tablets daily" }
    ],
    appointments: [
      { type: "Cardiac Rehab", doctor: "Rehab Team", date: "2024-06-15", time: "2:00 PM" },
      { type: "Follow-up", doctor: "Dr. Sajid Ali", date: "2024-06-20", time: "11:00 AM" }
    ],
    progress: 60
  }
]

export function CarePlanProvider({ children }: { children: ReactNode }) {
  const [carePlans, setCarePlans] = useState<CarePlan[]>(initialCarePlans)

  const addCarePlan = (carePlanData: Omit<CarePlan, 'id'>) => {
    const newCarePlan: CarePlan = {
      ...carePlanData,
      id: Math.max(...carePlans.map(c => c.id), 0) + 1
    }
    setCarePlans(prev => [...prev, newCarePlan])
  }

  const updateCarePlan = (id: number, updates: Partial<CarePlan>) => {
    setCarePlans(prev => 
      prev.map(carePlan => 
        carePlan.id === id 
          ? { ...carePlan, ...updates }
          : carePlan
      )
    )
  }

  const deleteCarePlan = (id: number) => {
    setCarePlans(prev => prev.filter(carePlan => carePlan.id !== id))
  }

  const getPatientCarePlans = (patientId: number) => {
    return carePlans.filter(carePlan => carePlan.patientId === patientId)
  }

  return (
    <CarePlanContext.Provider value={{
      carePlans,
      addCarePlan,
      updateCarePlan,
      deleteCarePlan,
      getPatientCarePlans
    }}>
      {children}
    </CarePlanContext.Provider>
  )
}

export function useCarePlans() {
  const context = useContext(CarePlanContext)
  if (context === undefined) {
    throw new Error('useCarePlans must be used within a CarePlanProvider')
  }
  return context
} 