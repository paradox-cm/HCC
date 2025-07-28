"use client"

import { useState } from "react"
import { SectionWrapper } from "@/components/section-wrapper"
import { HeaderAnimation } from "@/components/HeaderAnimation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { NewPatientForm } from "@/components/forms/new-patient-form"
import { ExistingPatientForm } from "@/components/forms/existing-patient-form"
import { PrescriptionRenewalForm } from "@/components/forms/prescription-renewal-form"
import { PreoperativeClearanceForm } from "@/components/forms/preoperative-clearance-form"

export default function AppointmentsPageClient() {
  const [selectedForm, setSelectedForm] = useState("new-patient")

  const formOptions = [
    { value: "new-patient", label: "New Patient" },
    { value: "existing-patient", label: "Existing Patient" },
    { value: "prescription", label: "Prescription Renewal" },
    { value: "clearance", label: "Pre-Op Clearance" },
  ]

  const renderForm = () => {
    switch (selectedForm) {
      case "new-patient":
        return <NewPatientForm />
      case "existing-patient":
        return <ExistingPatientForm />
      case "prescription":
        return <PrescriptionRenewalForm />
      case "clearance":
        return <PreoperativeClearanceForm />
      default:
        return <NewPatientForm />
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
        />
        <div className="text-center relative z-10">
          <h1 className="text-2xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">Appointments & Requests</h1>
          <p className="mt-4 max-w-3xl mx-auto text-muted-foreground md:text-xl">
            Select the appropriate form for your needs. Our team will respond within 1 business day.
          </p>
        </div>
      </SectionWrapper>

      <SectionWrapper className="pt-0">
        <div className="w-full max-w-4xl mx-auto">
          {/* Mobile Dropdown */}
          <div className="md:hidden mb-6">
            <Select value={selectedForm} onValueChange={setSelectedForm}>
              <SelectTrigger className="w-full bg-red-600 text-white border-red-600 hover:bg-red-700 hover:border-red-700 focus:ring-red-600 [&>svg]:text-white">
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