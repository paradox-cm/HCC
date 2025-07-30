"use client"

import React, { createContext, useContext, useState, ReactNode } from 'react'

export interface Appointment {
  id: number
  patientId: number
  patientName: string
  doctorId: number
  doctorName: string
  date: string
  time: string
  type: string
  status: string
  notes?: string
}

interface AppointmentContextType {
  appointments: Appointment[]
  addAppointment: (appointment: Omit<Appointment, 'id'>) => void
  updateAppointment: (id: number, updates: Partial<Appointment>) => void
  deleteAppointment: (id: number) => void
  getPatientAppointments: (patientId: number) => Appointment[]
}

const AppointmentContext = createContext<AppointmentContextType | undefined>(undefined)

// Initial mock data
const initialAppointments: Appointment[] = [
  {
    id: 1,
    patientId: 1,
    patientName: "Sarah Johnson",
    doctorId: 1,
    doctorName: "Dr. Asif Ali",
    date: "2024-02-20",
    time: "10:00 AM",
    type: "Follow-up",
    status: "scheduled",
    notes: "Regular checkup"
  },
  {
    id: 2,
    patientId: 1,
    patientName: "Sarah Johnson",
    doctorId: 2,
    doctorName: "Dr. Abdul Ali",
    date: "2024-02-25",
    time: "2:00 PM",
    type: "Consultation",
    status: "scheduled",
    notes: "Cardiology consultation"
  },
  {
    id: 3,
    patientId: 2,
    patientName: "Michael Chen",
    doctorId: 3,
    doctorName: "Dr. Sajid Ali",
    date: "2024-02-22",
    time: "11:30 AM",
    type: "Initial Visit",
    status: "completed",
    notes: "First appointment"
  }
]

export function AppointmentProvider({ children }: { children: ReactNode }) {
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments)

  const addAppointment = (appointmentData: Omit<Appointment, 'id'>) => {
    const newAppointment: Appointment = {
      ...appointmentData,
      id: Math.max(...appointments.map(a => a.id), 0) + 1
    }
    setAppointments(prev => [...prev, newAppointment])
  }

  const updateAppointment = (id: number, updates: Partial<Appointment>) => {
    setAppointments(prev => 
      prev.map(appointment => 
        appointment.id === id 
          ? { ...appointment, ...updates }
          : appointment
      )
    )
  }

  const deleteAppointment = (id: number) => {
    setAppointments(prev => prev.filter(appointment => appointment.id !== id))
  }

  const getPatientAppointments = (patientId: number) => {
    return appointments.filter(appointment => appointment.patientId === patientId)
  }

  return (
    <AppointmentContext.Provider value={{
      appointments,
      addAppointment,
      updateAppointment,
      deleteAppointment,
      getPatientAppointments
    }}>
      {children}
    </AppointmentContext.Provider>
  )
}

export function useAppointments() {
  const context = useContext(AppointmentContext)
  if (context === undefined) {
    throw new Error('useAppointments must be used within an AppointmentProvider')
  }
  return context
} 