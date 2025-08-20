"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { SectionWrapper } from "@/components/section-wrapper"
import { HeaderAnimation } from "@/components/HeaderAnimation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { NewPatientForm } from "@/components/forms/new-patient-form"
import { ExistingPatientForm } from "@/components/forms/existing-patient-form"
import { PrescriptionRenewalForm } from "@/components/forms/prescription-renewal-form"
import { PreoperativeClearanceForm } from "@/components/forms/preoperative-clearance-form"

interface TriageData {
  doctor?: string
  symptoms?: string
  urgency?: string
  patientInfo?: {
    firstName?: string
    lastName?: string
    email?: string
    phone?: string
    dateOfBirth?: string
    preferredContact?: string
    preferredTime?: string
    preferredLocation?: string
  }
}

function AppointmentsPageContent() {
  const [selectedForm, setSelectedForm] = useState("new-patient")
  const [triageData, setTriageData] = useState<TriageData>({})
  const searchParams = useSearchParams()

  // Parse URL parameters from triage flow
  useEffect(() => {
    const doctor = searchParams.get("doctor")
    const symptoms = searchParams.get("symptoms")
    const form = searchParams.get("form")
    
    if (doctor || symptoms) {
      const data: TriageData = {}
      
      if (doctor) {
        data.doctor = doctor
      }
      
      if (symptoms) {
        try {
          const parsedSymptoms = JSON.parse(symptoms)
          data.symptoms = parsedSymptoms.symptoms?.join(", ")
          data.urgency = parsedSymptoms.urgency
          data.patientInfo = parsedSymptoms.patientInfo
        } catch (e) {
          // If parsing fails, treat as plain text
          data.symptoms = symptoms
        }
      }
      
      setTriageData(data)
      
      // Auto-select new patient form if coming from triage
      if (doctor || symptoms) {
        setSelectedForm("new-patient")
      }
    }
    
    // Handle form parameter for direct form selection
    if (form && ["new-patient", "existing-patient", "prescription", "clearance"].includes(form)) {
      setSelectedForm(form)
    }
  }, [searchParams])

  const formOptions = [
    { value: "new-patient", label: "New Patient" },
    { value: "existing-patient", label: "Existing Patient" },
    { value: "prescription", label: "Prescription Renewal" },
    { value: "clearance", label: "Pre-Op Clearance" },
  ]

  const renderForm = () => {
    switch (selectedForm) {
      case "new-patient":
        return <NewPatientForm triageData={triageData} />
      case "existing-patient":
        return <ExistingPatientForm triageData={triageData} />
      case "prescription":
        return <PrescriptionRenewalForm triageData={triageData} />
      case "clearance":
        return <PreoperativeClearanceForm triageData={triageData} />
      default:
        return <NewPatientForm triageData={triageData} />
    }
  }

  return (
    <>
      <SectionWrapper className="bg-muted/20 pt-12 pb-12 relative overflow-hidden">
        <HeaderAnimation 
          type="gradient-flow" 
          intensity="medium" 
          colorScheme="blue" 
          responsive={true}
          randomStart={true}
          speedMultiplier={1.1}
        />
        <div className="text-center relative z-10">
          <h1 className="text-3xl font-bold sm:text-5xl lg:text-6xl mb-4">Appointments & Requests</h1>
          <p className="mt-4 max-w-3xl mx-auto text-muted-foreground md:text-xl">
            Select the appropriate form for your needs. Our team will respond within 1 business day.
          </p>
          {/* Show triage info if available */}
          {(triageData.doctor || triageData.symptoms) && (
            <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <p className="text-sm font-medium text-blue-800 dark:text-blue-200">
                  Pre-filled from Triage Assessment
                </p>
              </div>
              {triageData.doctor && (
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  <strong>Doctor:</strong> {triageData.doctor === "dr-asif-ali" ? "Dr. Asif Ali" : 
                                           triageData.doctor === "dr-sajid-ali" ? "Dr. Sajid Ali" : 
                                           triageData.doctor === "dr-abdul-ali" ? "Dr. Abdul Ali" : triageData.doctor}
                </p>
              )}
              {triageData.symptoms && (
                <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                  <strong>Symptoms:</strong> {triageData.symptoms}
                </p>
              )}
              {triageData.urgency && (
                <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                  <strong>Urgency:</strong> {triageData.urgency}
                </p>
              )}
            </div>
          )}
        </div>
      </SectionWrapper>

      <SectionWrapper className="pt-0">
        <div className="w-full max-w-4xl mx-auto">
          {/* Mobile Dropdown */}
          <div className="md:hidden mb-6 pt-6">
            <Select value={selectedForm} onValueChange={setSelectedForm}>
              <SelectTrigger className="w-full bg-red-600 text-white border-red-600 hover:bg-red-700 hover:border-red-700 focus:ring-red-600 [&>svg]:text-white [&>svg]:h-6 [&>svg]:w-6">
                <SelectValue placeholder="Select form type" />
              </SelectTrigger>
              <SelectContent>
                {formOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Desktop/Tablet Tabs */}
          <div className="hidden md:block">
            <Tabs value={selectedForm} onValueChange={setSelectedForm} className="w-full">
              <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 h-auto">
                <TabsTrigger value="new-patient" className="py-2">
                  New Patient
                </TabsTrigger>
                <TabsTrigger value="existing-patient" className="py-2">
                  Existing Patient
                </TabsTrigger>
                <TabsTrigger value="prescription" className="py-2">
                  Prescription Renewal
                </TabsTrigger>
                <TabsTrigger value="clearance" className="py-2">
                  Pre-Op Clearance
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Form Content */}
          <div className="mt-6">
            {renderForm()}
          </div>
        </div>
      </SectionWrapper>
    </>
  )
}

export default function AppointmentsPageClient() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading appointment forms...</p>
        </div>
      </div>
    }>
      <AppointmentsPageContent />
    </Suspense>
  )
} 