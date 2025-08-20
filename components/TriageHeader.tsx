"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ChevronDown, Heart, UserPlus, User, AlertTriangle, MessageCircle, FileText, Calendar, CreditCard, HelpCircle, ArrowLeft, RotateCcw } from "lucide-react"
import Link from "next/link"
import { DoctorCard } from "./DoctorCard"
import { ComprehensiveTriageForm } from "./ComprehensiveTriageForm"
import { WhatsAppModal } from "./WhatsAppModal"

type TriageStep = 
  | "initial"
  | "existing-patient"
  | "new-patient"
  | "emergency"
  | "symptom-triage"

interface TriageHeaderProps {
  onScrollToContent: () => void
}

export function TriageHeader({ onScrollToContent }: TriageHeaderProps) {
  const [currentStep, setCurrentStep] = useState<TriageStep>("initial")
  const [symptomContext, setSymptomContext] = useState<string | null>(null)
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false)
  const [whatsAppContext, setWhatsAppContext] = useState("")
  const [showScrollArrow, setShowScrollArrow] = useState(true)

  // Handle scroll to hide/show arrow
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      setShowScrollArrow(scrollY < 100) // Hide arrow after scrolling 100px
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleStepChange = (step: TriageStep) => {
    setCurrentStep(step)
  }

  const handleBack = () => {
    if (currentStep === "existing-patient" || currentStep === "new-patient") {
      setCurrentStep("initial")
    } else if (currentStep === "symptom-triage") {
      setCurrentStep("new-patient")
    }
  }

  const handleStartOver = () => {
    setCurrentStep("initial")
    setSymptomContext(null)
  }

  const handleWhatsApp = (context: string) => {
    setWhatsAppContext(context)
    setIsWhatsAppOpen(true)
  }

  const handleNavigateToFAQ = (section?: string) => {
    const url = section ? `/faq#${section}` : "/faq"
    window.location.href = url
  }

  return (
    <>
      {/* Main Triage Header */}
      <section className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-blue-950/20 dark:via-background dark:to-green-950/20 relative overflow-hidden -mt-20">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-32 h-32 bg-blue-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-green-500 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-purple-500 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            How can we help you today?
          </h1>
          
          {/* Subheadline */}
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
            Select the option that matches your need—we'll guide you to the right care or information immediately.
          </p>

          {/* Main Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            {/* New Patient */}
            <Button 
              onClick={() => handleStepChange("new-patient")}
              className="w-full sm:w-auto h-14 px-8 text-lg bg-blue-600 hover:bg-blue-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <UserPlus className="mr-3 h-6 w-6" />
              I'm a New Patient
            </Button>

            {/* Existing Patient */}
            <Button 
              onClick={() => handleStepChange("existing-patient")}
              className="w-full sm:w-auto h-14 px-8 text-lg bg-green-600 hover:bg-green-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <User className="mr-3 h-6 w-6" />
              I'm an Existing Patient
            </Button>

            {/* Emergency */}
            <Button 
              onClick={() => handleStepChange("emergency")}
              className="w-full sm:w-auto h-14 px-8 text-lg bg-red-600 hover:bg-red-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <AlertTriangle className="mr-3 h-6 w-6" />
              I have an emergency
            </Button>
          </div>
        </div>

        {/* Fixed Scroll Arrow at Bottom of Viewport */}
        <div className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 z-20 transition-all duration-500 ${
          showScrollArrow ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}>
          <button
            onClick={onScrollToContent}
            className="animate-bounce p-3 rounded-full border-2 border-gray-400 dark:border-gray-500 bg-transparent hover:border-gray-600 dark:hover:border-gray-300 transition-all duration-500"
            style={{ animationDuration: '3s' }}
          >
            <ChevronDown className="h-8 w-8 text-gray-600 dark:text-gray-300" />
          </button>
        </div>
      </section>

      {/* Emergency Modal */}
      <Dialog open={currentStep === "emergency"} onOpenChange={() => setCurrentStep("initial")}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600">
              <AlertTriangle className="h-6 w-6" />
              Emergency Information
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <p className="text-red-800 dark:text-red-200 font-medium mb-2">
                If you're experiencing chest pain, shortness of breath, or any life-threatening symptoms, please call 911 immediately.
              </p>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              For urgent consultation, please call our offices directly:
            </p>
            <div className="space-y-3">
              <Button 
                asChild 
                className="w-full bg-green-600 hover:bg-green-700 h-16 text-xl"
              >
                <a href="tel:713-464-4140">
                  📞 Call Spring Branch: 713-464-4140
                </a>
              </Button>
              <Button 
                asChild 
                className="w-full bg-green-600 hover:bg-green-700 h-16 text-xl"
              >
                <a href="tel:713-464-4242">
                  📞 Call Heights: 713-464-4242
                </a>
              </Button>
            </div>
            <Button 
              variant="outline" 
              onClick={() => handleStepChange("initial")}
              className="w-full h-16 text-xl"
            >
              Back to Options
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Existing Patient Modal */}
      <Dialog open={currentStep === "existing-patient"} onOpenChange={() => setCurrentStep("initial")}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <User className="h-6 w-6 text-green-600" />
              What do you need help with today?
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <Button 
              variant="outline" 
              className="w-full justify-start h-16 text-xl"
              asChild
            >
              <Link href="/prescription-request">
                <FileText className="mr-3 h-6 w-6" />
                Request a Medication Refill
              </Link>
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full justify-start h-16 text-xl"
              asChild
            >
              <Link href="/appointments?form=existing-patient">
                <Calendar className="mr-3 h-6 w-6" />
                Schedule a Follow-up Appointment
              </Link>
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full justify-start h-16 text-xl"
              onClick={() => handleWhatsApp("Billing or insurance questions")}
            >
              <CreditCard className="mr-3 h-6 w-6" />
              Billing or Insurance Questions
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full justify-start h-16 text-xl"
              onClick={() => handleWhatsApp("Request medical records")}
            >
              <FileText className="mr-3 h-6 w-6" />
              Request Medical Records
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full justify-start h-16 text-xl"
              onClick={() => handleWhatsApp("Other assistance needed")}
            >
              <MessageCircle className="mr-3 h-6 w-6" />
              Other Questions
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* New Patient Modal */}
      <Dialog open={currentStep === "new-patient"} onOpenChange={() => setCurrentStep("initial")}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <UserPlus className="h-6 w-6 text-blue-600" />
              Welcome! What brings you to HCC today?
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <Button 
              variant="outline" 
              className="w-full justify-start h-16 text-xl"
              asChild
            >
              <Link href="/appointments">
                <Calendar className="mr-3 h-6 w-6" />
                Schedule My First Visit
              </Link>
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full justify-start h-16 text-xl"
              onClick={() => handleStepChange("symptom-triage")}
            >
              <Heart className="mr-3 h-6 w-6" />
              I have a heart-related concern
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full justify-start h-16 text-xl"
              onClick={() => handleNavigateToFAQ()}
            >
              <HelpCircle className="mr-3 h-6 w-6" />
              See Frequently Asked Questions
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full justify-start h-16 text-xl"
              onClick={() => handleWhatsApp("New patient inquiry")}
            >
              <MessageCircle className="mr-3 h-6 w-6" />
              Text us a Question Now
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Symptom Triage Modal */}
      <Dialog open={currentStep === "symptom-triage"} onOpenChange={() => setCurrentStep("new-patient")}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <DialogTitle className="flex items-center gap-3 text-xl">
                  <Heart className="h-7 w-7 text-red-600" />
                  <span className="leading-tight">Cardiac Care Appointment</span>
                </DialogTitle>
                <div className="flex gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={handleBack}
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={handleStartOver}
                  >
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Start Over
                  </Button>
                </div>
              </div>
              <p className="text-sm text-muted-foreground -mt-2">
                Complete assessment and appointment booking in one streamlined process
              </p>
            </div>
          </DialogHeader>
          <ComprehensiveTriageForm
            onComplete={(formData) => {
              setSymptomContext(JSON.stringify(formData))
              // Show success message and close modal
              alert("Thank you! Your appointment request has been submitted. We will contact you within 1 business day to confirm your appointment.")
              setCurrentStep("initial")
            }}
            onBack={handleBack}
          />
        </DialogContent>
      </Dialog>

      {/* WhatsApp Modal */}
      <WhatsAppModal
        open={isWhatsAppOpen}
        onClose={() => setIsWhatsAppOpen(false)}
        context={whatsAppContext}
      />
    </>
  )
} 