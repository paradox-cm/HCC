"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ChevronDown, Heart, UserPlus, User, AlertTriangle, MessageCircle, FileText, Calendar, CreditCard, HelpCircle, ArrowLeft, RotateCcw, Stethoscope } from "lucide-react"
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
  const [show911Confirmation, setShow911Confirmation] = useState(false)

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
      <section className="min-h-screen flex flex-col justify-center items-center bg-white dark:bg-background relative overflow-hidden -mt-20">

        {/* Animated Grid Border */}
        <div className="absolute inset-0 opacity-10">
          <div 
            className="absolute inset-0 animate-grid-move"
            style={{
              backgroundImage: `
                linear-gradient(90deg, transparent 45px, rgba(59, 130, 246, 0.3) 46px, rgba(59, 130, 246, 0.3) 51px, transparent 52px),
                linear-gradient(0deg, transparent 45px, rgba(59, 130, 246, 0.3) 46px, rgba(59, 130, 246, 0.3) 51px, transparent 52px)
              `,
              backgroundSize: '48px 48px'
            }}
          />
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Animated EKG Line */}
          <div className="flex justify-center mb-8 opacity-30">
            <svg viewBox="0 0 330 112" width="100%" style={{ maxWidth: "600px" }} height="80px">
              <defs>
                <linearGradient id="linearGradiantStroke" x1="0%" y1="0%" x2="10%" y2="0%">
                  <stop offset="0%" stopColor="rgba(239, 68, 68, 0.25)" />
                  <stop offset="75%" stopColor="#ef4444" />

                  <animate
                    attributeName="x1"
                    begin="0.25s"
                    calcMode="spline"
                    dur="2.50s"
                    from="0%"
                    keySplines="
                      0.63 0.10 0.18 0.47;
                      0.63 0.10 0.18 0.47;
                      0.63 0.10 0.18 0.47;
                      0.63 0.10 0.18 0.47;
                      0.63 0.10 0.18 0.47;
                      0.63 0.10 0.18 0.47"
                    keyTimes="
                      0.00;
                      0.22;
                      0.33;
                      0.55;
                      0.66;
                      0.88;
                      1.00"
                    repeatCount="indefinite"
                    to="100%"
                  />
                  <animate
                    attributeName="x2"
                    begin="0.00s"
                    calcMode="spline"
                    dur="2.50s"
                    from="25%"
                    keySplines="
                      0.63 0.10 0.18 0.47;
                      0.63 0.10 0.18 0.47;
                      0.63 0.10 0.18 0.47;
                      0.63 0.10 0.18 0.47;
                      0.63 0.10 0.18 0.47;
                      0.63 0.10 0.18 0.47"
                    keyTimes="
                      0.00;
                      0.22;
                      0.33;
                      0.55;
                      0.66;
                      0.88;
                      1.00"
                    repeatCount="indefinite"
                    to="100%"
                  />
                </linearGradient>
              </defs>

              <g transform="translate(0, 78)">
                <path
                  d="
                    M 0,0
                    L 100,0
                    C 108,-15 112,-15 120,0
                    L 135,0 L 140,20 L 145,-75 L 150,30 L 155,0 L 170,-2
                    C 175,-5 180,-20 185,-20
                    L 200,-20
                    C 200,-20 205,-20, 215,0
                    L220,0
                    C 225,-5, 230,-10 235,0
                    L330,0"
                  fill="none"
                  stroke="url(#linearGradiantStroke)"
                  strokeDasharray="200,600"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="4px"
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    calcMode="spline"
                    dur="2.50s"
                    from="1000"
                    keySplines="
                      0.63 0.10 0.18 0.47;
                      0.63 0.10 0.18 0.47;
                      0.63 0.10 0.18 0.47;
                      0.63 0.10 0.18 0.47;
                      0.63 0.10 0.18 0.47;
                      0.63 0.10 0.18 0.47"
                    keyTimes="
                      0.00;
                      0.22;
                      0.33;
                      0.55;
                      0.66;
                      0.88;
                      1.00"
                    repeatCount="indefinite"
                    to="200"
                  />
                </path>
                <circle cx="0" cy="0" r="3" fill="transparent">
                  <animate
                    attributeName="cx"
                    calcMode="spline"
                    dur="2.50s"
                    from="0"
                    keySplines="
                      0.63 0.10 0.18 0.47;
                      0.63 0.10 0.18 0.47;
                      0.63 0.10 0.18 0.47;
                      0.63 0.10 0.18 0.47;
                      0.63 0.10 0.18 0.47;
                      0.63 0.10 0.18 0.47"
                    keyTimes="
                      0.00;
                      0.22;
                      0.33;
                      0.55;
                      0.66;
                      0.88;
                      1.00"
                    repeatCount="indefinite"
                    to="330"
                  />
                </circle>
              </g>
            </svg>
          </div>

          {/* Main Headline */}
          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            How can we help you today?
          </h1>
          
          {/* Subheadline */}
          <p className="text-muted-foreground md:text-xl/relaxed mb-12 max-w-3xl mx-auto">
            Select the option that matches your need—we'll guide you to the right care or information immediately.
          </p>

          {/* Main Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            {/* New Patient */}
            <Button 
              size="lg"
              variant="outline"
              onClick={() => handleStepChange("new-patient")}
              className="w-full sm:w-auto bg-white dark:bg-black hover:bg-blue-600 hover:text-white hover:border-blue-600 dark:hover:bg-blue-600 dark:hover:border-blue-600 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <UserPlus className="mr-3 h-6 w-6" />
              I'm a New Patient
            </Button>

            {/* Existing Patient */}
            <Button 
              size="lg"
              variant="outline"
              onClick={() => handleStepChange("existing-patient")}
              className="w-full sm:w-auto bg-white dark:bg-black hover:bg-green-600 hover:text-white hover:border-green-600 dark:hover:bg-green-600 dark:hover:border-green-600 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <User className="mr-3 h-6 w-6" />
              I'm an Existing Patient
            </Button>

            {/* Emergency */}
            <Button 
              size="lg"
              variant="outline"
              onClick={() => handleStepChange("emergency")}
              className="w-full sm:w-auto bg-white dark:bg-black hover:bg-red-600 hover:text-white hover:border-red-600 dark:hover:bg-red-600 dark:hover:border-red-600 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <AlertTriangle className="mr-3 h-6 w-6" />
              I have an emergency
            </Button>
          </div>
        </div>

        {/* Fixed Scroll Arrow at Bottom of Viewport */}
        <div className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 z-20 transition-all duration-500 hidden sm:block ${
          showScrollArrow ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}>
          <button
            onClick={onScrollToContent}
            className="animate-bounce p-1.5 sm:p-3 rounded-full border-2 border-gray-400 dark:border-gray-500 bg-transparent hover:border-gray-600 dark:hover:border-gray-300 transition-all duration-500"
            style={{ animationDuration: '3s' }}
          >
            <ChevronDown className="h-4 w-4 sm:h-8 sm:w-8 text-gray-600 dark:text-gray-300" />
          </button>
        </div>
      </section>

      {/* Emergency Modal */}
      <Dialog open={currentStep === "emergency"} onOpenChange={() => setCurrentStep("initial")}>
        <DialogContent className="w-[calc(100vw-2rem)] max-w-md mx-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600 text-lg sm:text-xl pr-8">
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
                className="w-full bg-green-600 hover:bg-green-700 h-14 text-sm sm:text-base"
              >
                <a href="tel:713-464-4140">
                  📞 Call Spring Branch: 713-464-4140
                </a>
              </Button>
              <Button 
                asChild 
                className="w-full bg-green-600 hover:bg-green-700 h-14 text-sm sm:text-base"
              >
                <a href="tel:713-464-4242">
                  📞 Call Heights: 713-464-4242
                </a>
              </Button>
              <Button 
                onClick={() => setShow911Confirmation(true)}
                className="w-full bg-red-600 hover:bg-red-700 h-14 text-sm sm:text-base"
              >
                🚨 Call 911
              </Button>
            </div>
            <Button 
              variant="ghost" 
              onClick={() => handleStepChange("initial")}
              className="w-full text-sm text-muted-foreground hover:text-foreground"
            >
              Back to Options
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* 911 Confirmation Dialog */}
      <Dialog open={show911Confirmation} onOpenChange={setShow911Confirmation}>
        <DialogContent className="w-[calc(100vw-2rem)] max-w-sm mx-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600 text-lg sm:text-xl pr-8">
              <AlertTriangle className="h-6 w-6" />
              Call 911?
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-gray-600 dark:text-gray-300">
              Are you sure you want to call 911? This will dial emergency services immediately.
            </p>
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                onClick={() => setShow911Confirmation(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button 
                asChild
                className="flex-1 bg-red-600 hover:bg-red-700"
              >
                <a href="tel:911">
                  Call 911
                </a>
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Existing Patient Modal */}
      <Dialog open={currentStep === "existing-patient"} onOpenChange={() => setCurrentStep("initial")}>
        <DialogContent className="w-[calc(100vw-2rem)] max-w-lg mx-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-lg sm:text-xl pr-8">
              <User className="h-6 w-6 text-green-600" />
              What do you need help with today?
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <Button 
              variant="outline" 
              className="w-full justify-start h-14 text-sm sm:text-base"
              asChild
            >
              <Link href="/prescription-request">
                <FileText className="mr-3 h-5 w-5" />
                Request a Medication Refill
              </Link>
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full justify-start h-14 text-sm sm:text-base"
              asChild
            >
              <Link href="/appointments?form=existing-patient">
                <Calendar className="mr-3 h-5 w-5" />
                Schedule a Follow-up Appointment
              </Link>
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full justify-start h-14 text-sm sm:text-base"
              onClick={() => handleWhatsApp("Billing or insurance questions")}
            >
              <CreditCard className="mr-3 h-5 w-5" />
              Billing or Insurance Questions
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full justify-start h-14 text-sm sm:text-base"
              onClick={() => handleWhatsApp("Request medical records")}
            >
              <FileText className="mr-3 h-5 w-5" />
              Request Medical Records
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full justify-start h-14 text-sm sm:text-base"
              onClick={() => handleWhatsApp("Other assistance needed")}
            >
              <MessageCircle className="mr-3 h-5 w-5" />
              Other Questions
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* New Patient Modal */}
      <Dialog open={currentStep === "new-patient"} onOpenChange={() => setCurrentStep("initial")}>
        <DialogContent className="w-[calc(100vw-2rem)] max-w-lg mx-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-lg sm:text-xl pr-8">
              <UserPlus className="h-6 w-6 text-blue-600" />
              Welcome! What brings you to HCC today?
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <Button 
              variant="outline" 
              className="w-full justify-start h-14 text-sm sm:text-base"
              asChild
            >
              <Link href="/appointments">
                <Calendar className="mr-3 h-5 w-5" />
                Schedule My First Visit
              </Link>
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full justify-start h-14 text-sm sm:text-base"
              onClick={() => handleStepChange("symptom-triage")}
            >
              <Heart className="mr-3 h-5 w-5" />
              Schedule Cardiac Consultation
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full justify-start h-14 text-sm sm:text-base"
              onClick={() => handleNavigateToFAQ()}
            >
              <HelpCircle className="mr-3 h-5 w-5" />
              See Frequently Asked Questions
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full justify-start h-14 text-sm sm:text-base"
              onClick={() => handleWhatsApp("New patient inquiry")}
            >
              <MessageCircle className="mr-3 h-5 w-5" />
              Text us a Question Now
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Symptom Triage Modal */}
      <Dialog open={currentStep === "symptom-triage"} onOpenChange={() => setCurrentStep("new-patient")}>
        <DialogContent className="w-[calc(100vw-2rem)] max-w-2xl mx-auto max-h-[calc(100vh-2rem)] sm:max-h-[85vh] flex flex-col sm:translate-y-[-50%] sm:top-[50%] top-4 translate-y-0 pt-4 pb-4">
          <DialogHeader className="flex-shrink-0">
            <div className="flex flex-col gap-4">
              <DialogTitle className="flex items-center gap-3 text-lg sm:text-xl pr-8">
                <Stethoscope className="h-7 w-7 text-red-600" />
                <span className="leading-tight">Cardiac Care Appointment</span>
              </DialogTitle>
              <p className="text-sm text-muted-foreground">
                Complete assessment and appointment booking in one streamlined process
              </p>
            </div>
          </DialogHeader>
          <div className="flex-1 overflow-y-auto min-h-0">
            <ComprehensiveTriageForm
              onComplete={(formData) => {
                setSymptomContext(JSON.stringify(formData))
                // Show success message and close modal
                alert("Thank you! Your appointment request has been submitted. We will contact you within 1 business day to confirm your appointment.")
                setCurrentStep("initial")
              }}
              onBack={handleBack}
            />
          </div>
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