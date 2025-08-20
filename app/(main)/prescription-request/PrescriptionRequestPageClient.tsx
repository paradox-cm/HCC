"use client"

import { SectionWrapper } from "@/components/section-wrapper"
import { HeaderAnimation } from "@/components/HeaderAnimation"
import { PrescriptionRenewalForm } from "@/components/forms/prescription-renewal-form"

export default function PrescriptionRequestPageClient() {
  return (
    <>
      <SectionWrapper className="bg-muted/20 pt-12 pb-12 relative overflow-hidden">
        <HeaderAnimation 
          type="gradient-flow" 
          intensity="medium" 
          colorScheme="green" 
          responsive={true}
          randomStart={true}
          speedMultiplier={1.1}
        />
        <div className="text-center relative z-10">
          <h1 className="text-3xl font-bold sm:text-5xl lg:text-6xl mb-4">Prescription Renewal Request</h1>
          <p className="mt-4 max-w-3xl mx-auto text-muted-foreground md:text-xl">
            Need a medication refill? Complete the form below and we'll process your request within 1 business day.
          </p>
        </div>
      </SectionWrapper>

      <SectionWrapper className="pt-0">
        <div className="w-full max-w-4xl mx-auto">
          <PrescriptionRenewalForm />
        </div>
      </SectionWrapper>
    </>
  )
}
