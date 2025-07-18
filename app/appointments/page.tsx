"use client"

import { SectionWrapper } from "@/components/section-wrapper"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { NewPatientForm } from "@/components/forms/new-patient-form"
import { ExistingPatientForm } from "@/components/forms/existing-patient-form"
import { PrescriptionRenewalForm } from "@/components/forms/prescription-renewal-form"
import { PreoperativeClearanceForm } from "@/components/forms/preoperative-clearance-form"

export default function AppointmentsPage() {
  return (
    <>
      <SectionWrapper className="bg-muted/20 pt-12 pb-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">Appointments & Requests</h1>
          <p className="mt-4 max-w-3xl mx-auto text-muted-foreground md:text-xl">
            Select the appropriate form for your needs. Our team will respond within 1 business day.
          </p>
        </div>
      </SectionWrapper>

      <SectionWrapper className="pt-0">
        <Tabs defaultValue="new-patient" className="w-full max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto">
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
          <TabsContent value="new-patient">
            <NewPatientForm />
          </TabsContent>
          <TabsContent value="existing-patient">
            <ExistingPatientForm />
          </TabsContent>
          <TabsContent value="prescription">
            <PrescriptionRenewalForm />
          </TabsContent>
          <TabsContent value="clearance">
            <PreoperativeClearanceForm />
          </TabsContent>
        </Tabs>
      </SectionWrapper>
    </>
  )
}
