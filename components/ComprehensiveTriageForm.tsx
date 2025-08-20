"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertTriangle, Heart, Clock, Info, User, Phone, Mail, Calendar, ArrowLeft, ArrowRight, MapPin, FileText, CreditCard } from "lucide-react"

interface ComprehensiveTriageFormProps {
  onComplete: (formData: any) => void
  onBack: () => void
}

const commonSymptoms = [
  { id: "chest-pain", label: "Chest pain or discomfort", urgent: true },
  { id: "shortness-breath", label: "Shortness of breath", urgent: true },
  { id: "palpitations", label: "Heart palpitations or irregular heartbeat", urgent: false },
  { id: "dizziness", label: "Dizziness or lightheadedness", urgent: false },
  { id: "fatigue", label: "Unusual fatigue", urgent: false },
  { id: "swelling", label: "Swelling in legs, ankles, or feet", urgent: false },
  { id: "cough", label: "Persistent cough", urgent: false },
  { id: "nausea", label: "Nausea or loss of appetite", urgent: false },
  { id: "sweating", label: "Cold sweats", urgent: false },
  { id: "pain-radiation", label: "Pain radiating to arm, neck, or jaw", urgent: true },
]

const urgencyLevels = [
  { value: "immediate", label: "Immediate - within hours", description: "Severe symptoms requiring urgent care" },
  { value: "24-hours", label: "Within 24 hours", description: "Moderate symptoms that need prompt attention" },
  { value: "week", label: "Within a week", description: "Mild symptoms for routine evaluation" },
  { value: "routine", label: "Routine check-up", description: "General consultation or preventive care" },
]

const doctors = [
  { value: "dr-asif-ali", label: "Dr. Asif Ali - Interventional Cardiology" },
  { value: "dr-sajid-ali", label: "Dr. Sajid Ali - Cardiovascular Disease" },
  { value: "dr-abdul-ali", label: "Dr. Abdul Ali - Cardiovascular Disease" },
  { value: "any", label: "Any Available Doctor" }
]

type FormStep = "symptoms" | "urgency" | "patient-info" | "appointment-details" | "health-info" | "insurance" | "review"

export function ComprehensiveTriageForm({ onComplete, onBack }: ComprehensiveTriageFormProps) {
  const [currentStep, setCurrentStep] = useState<FormStep>("symptoms")
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([])
  const [urgencyLevel, setUrgencyLevel] = useState<string>("")
  const [additionalNotes, setAdditionalNotes] = useState("")
  const [hasUrgentSymptoms, setHasUrgentSymptoms] = useState(false)
  
  // Patient information
  const [patientInfo, setPatientInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    preferredContact: "either",
    address: ""
  })

  // Appointment details
  const [appointmentDetails, setAppointmentDetails] = useState({
    selectedDoctor: "",
    preferredLocation: "spring-branch",
    preferredDate: "",
    preferredDays: {
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false
    }
  })

  // Health information
  const [healthInfo, setHealthInfo] = useState({
    hasReferral: "no",
    pcp: "",
    medications: ""
  })

  // Insurance information
  const [insuranceInfo, setInsuranceInfo] = useState({
    hasInsurance: "yes",
    insuranceProvider: ""
  })

  const handleSymptomToggle = (symptomId: string) => {
    setSelectedSymptoms(prev => {
      const newSelection = prev.includes(symptomId)
        ? prev.filter(id => id !== symptomId)
        : [...prev, symptomId]
      
      const urgentSelected = newSelection.some(id => 
        commonSymptoms.find(s => s.id === id)?.urgent
      )
      setHasUrgentSymptoms(urgentSelected)
      
      return newSelection
    })
  }

  const handleNext = () => {
    if (currentStep === "symptoms" && selectedSymptoms.length > 0) {
      setCurrentStep("urgency")
    } else if (currentStep === "urgency" && urgencyLevel) {
      setCurrentStep("patient-info")
    } else if (currentStep === "patient-info" && canProceed()) {
      setCurrentStep("appointment-details")
    } else if (currentStep === "appointment-details" && canProceed()) {
      setCurrentStep("health-info")
    } else if (currentStep === "health-info") {
      setCurrentStep("insurance")
    } else if (currentStep === "insurance") {
      setCurrentStep("review")
    }
  }

  const handleBack = () => {
    if (currentStep === "urgency") {
      setCurrentStep("symptoms")
    } else if (currentStep === "patient-info") {
      setCurrentStep("urgency")
    } else if (currentStep === "appointment-details") {
      setCurrentStep("patient-info")
    } else if (currentStep === "health-info") {
      setCurrentStep("appointment-details")
    } else if (currentStep === "insurance") {
      setCurrentStep("health-info")
    } else if (currentStep === "review") {
      setCurrentStep("insurance")
    }
  }

  const handleSubmit = () => {
    const formData = {
      symptoms: selectedSymptoms.map(id => commonSymptoms.find(s => s.id === id)?.label).filter(Boolean),
      urgency: urgencyLevels.find(u => u.value === urgencyLevel)?.label,
      notes: additionalNotes,
      patientInfo,
      appointmentDetails,
      healthInfo,
      insuranceInfo,
      hasUrgentSymptoms
    }
    onComplete(formData)
  }

  const canProceed = () => {
    switch (currentStep) {
      case "symptoms":
        return selectedSymptoms.length > 0
      case "urgency":
        return urgencyLevel !== ""
      case "patient-info":
        return patientInfo.firstName && patientInfo.lastName && patientInfo.phone
      case "appointment-details":
        return appointmentDetails.selectedDoctor && appointmentDetails.preferredDate
      case "health-info":
        return true
      case "insurance":
        return true
      case "review":
        return true
      default:
        return false
    }
  }

  const renderStepIndicator = () => {
    const steps = ["symptoms", "urgency", "patient-info", "appointment-details", "health-info", "insurance", "review"]
    const currentIndex = steps.indexOf(currentStep)
    
    return (
      <div className="flex items-center justify-center mb-6">
        <div className="flex items-center space-x-2">
          {steps.map((step, index) => (
            <div key={step} className="flex items-center">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                index <= currentIndex 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
              }`}>
                {index + 1}
              </div>
              {index < steps.length - 1 && (
                <div className={`w-8 h-1 mx-1 ${
                  index < currentIndex ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>
    )
  }

  const renderSymptomsStep = () => (
    <div className="space-y-6">
      {hasUrgentSymptoms && (
        <Card className="border-red-200 bg-red-50 dark:bg-red-950/20 dark:border-red-800 p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-red-800 dark:text-red-200 mb-1">
                Urgent Symptoms Detected
              </h4>
              <p className="text-sm text-red-700 dark:text-red-300">
                You've indicated symptoms that may require immediate attention. 
                If symptoms are severe, please call 911 or go to the nearest emergency room.
              </p>
            </div>
          </div>
        </Card>
      )}

      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <Heart className="h-5 w-5 text-red-600" />
          <h3 className="text-lg font-semibold">Select your symptoms</h3>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
          Check all that apply to help us understand your needs.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {commonSymptoms.map((symptom) => (
            <div key={symptom.id} className="flex items-start space-x-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
              <Checkbox
                id={symptom.id}
                checked={selectedSymptoms.includes(symptom.id)}
                onCheckedChange={() => handleSymptomToggle(symptom.id)}
                className="mt-1"
              />
              <div className="flex-1">
                <Label 
                  htmlFor={symptom.id} 
                  className={`text-sm cursor-pointer ${
                    symptom.urgent ? 'font-medium text-red-700 dark:text-red-300' : ''
                  }`}
                >
                  {symptom.label}
                  {symptom.urgent && (
                    <span className="ml-2 text-xs bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 px-2 py-0.5 rounded">
                      Urgent
                    </span>
                  )}
                </Label>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderUrgencyStep = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <Clock className="h-5 w-5 text-blue-600" />
          <h3 className="text-lg font-semibold">How soon do you need to be seen?</h3>
        </div>
        
        <RadioGroup value={urgencyLevel} onValueChange={setUrgencyLevel}>
          <div className="space-y-3">
            {urgencyLevels.map((level) => (
              <div key={level.value} className="flex items-start space-x-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                <RadioGroupItem value={level.value} id={level.value} className="mt-1" />
                <div className="flex-1">
                  <Label htmlFor={level.value} className="text-sm font-medium cursor-pointer">
                    {level.label}
                  </Label>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {level.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Info className="h-5 w-5 text-gray-600" />
          <h3 className="text-lg font-semibold">Additional Information (Optional)</h3>
        </div>
        <Textarea
          placeholder="Tell us more about your symptoms, medical history, or any other relevant information..."
          value={additionalNotes}
          onChange={(e) => setAdditionalNotes(e.target.value)}
          rows={3}
          className="resize-none"
        />
      </div>
    </div>
  )

  const renderPatientInfoStep = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <User className="h-5 w-5 text-blue-600" />
        <h3 className="text-lg font-semibold">Patient Information</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName">First Name *</Label>
          <Input
            id="firstName"
            value={patientInfo.firstName}
            onChange={(e) => setPatientInfo(prev => ({ ...prev, firstName: e.target.value }))}
            required
          />
        </div>
        <div>
          <Label htmlFor="lastName">Last Name *</Label>
          <Input
            id="lastName"
            value={patientInfo.lastName}
            onChange={(e) => setPatientInfo(prev => ({ ...prev, lastName: e.target.value }))}
            required
          />
        </div>
        <div>
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            value={patientInfo.email}
            onChange={(e) => setPatientInfo(prev => ({ ...prev, email: e.target.value }))}
          />
        </div>
        <div>
          <Label htmlFor="phone">Phone Number *</Label>
          <Input
            id="phone"
            type="tel"
            value={patientInfo.phone}
            onChange={(e) => setPatientInfo(prev => ({ ...prev, phone: e.target.value }))}
            required
          />
        </div>
        <div>
          <Label htmlFor="dateOfBirth">Date of Birth</Label>
          <Input
            id="dateOfBirth"
            type="date"
            value={patientInfo.dateOfBirth}
            onChange={(e) => setPatientInfo(prev => ({ ...prev, dateOfBirth: e.target.value }))}
          />
        </div>
        <div>
          <Label htmlFor="preferredContact">Preferred Contact Method</Label>
          <Select value={patientInfo.preferredContact} onValueChange={(value) => setPatientInfo(prev => ({ ...prev, preferredContact: value }))}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="phone">Phone</SelectItem>
              <SelectItem value="email">Email</SelectItem>
              <SelectItem value="either">Either</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div>
        <Label htmlFor="address">Address (Street, City, State, ZIP)</Label>
        <Input
          id="address"
          value={patientInfo.address}
          onChange={(e) => setPatientInfo(prev => ({ ...prev, address: e.target.value }))}
          placeholder="123 Main St, Houston, TX 77001"
        />
      </div>
    </div>
  )

  const renderAppointmentDetailsStep = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Calendar className="h-5 w-5 text-purple-600" />
        <h3 className="text-lg font-semibold">Appointment Details</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="selectedDoctor">Preferred Doctor *</Label>
          <Select onValueChange={(value) => setAppointmentDetails(prev => ({ ...prev, selectedDoctor: value }))} value={appointmentDetails.selectedDoctor} required>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a doctor" />
            </SelectTrigger>
            <SelectContent>
              {doctors.map((doctor) => (
                <SelectItem key={doctor.value} value={doctor.value}>
                  {doctor.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="preferredLocation">Preferred Location *</Label>
          <Select onValueChange={(value) => setAppointmentDetails(prev => ({ ...prev, preferredLocation: value }))} value={appointmentDetails.preferredLocation} required>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="spring-branch">Spring Branch</SelectItem>
              <SelectItem value="north-avenue">North Avenue</SelectItem>
              <SelectItem value="downtown">Downtown</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="preferredDate">Preferred Date *</Label>
          <Input
            id="preferredDate"
            type="date"
            value={appointmentDetails.preferredDate}
            onChange={(e) => setAppointmentDetails(prev => ({ ...prev, preferredDate: e.target.value }))}
            required
          />
        </div>
        <div>
          <Label htmlFor="preferredDays">Preferred Days (Optional)</Label>
          <div className="grid grid-cols-2 gap-2">
                         <Checkbox
               id="monday"
               checked={appointmentDetails.preferredDays.monday}
               onCheckedChange={(checked) => setAppointmentDetails(prev => ({ ...prev, preferredDays: { ...prev.preferredDays, monday: !!checked } }))}
             />
             <Label htmlFor="monday">Monday</Label>
             <Checkbox
               id="tuesday"
               checked={appointmentDetails.preferredDays.tuesday}
               onCheckedChange={(checked) => setAppointmentDetails(prev => ({ ...prev, preferredDays: { ...prev.preferredDays, tuesday: !!checked } }))}
             />
             <Label htmlFor="tuesday">Tuesday</Label>
             <Checkbox
               id="wednesday"
               checked={appointmentDetails.preferredDays.wednesday}
               onCheckedChange={(checked) => setAppointmentDetails(prev => ({ ...prev, preferredDays: { ...prev.preferredDays, wednesday: !!checked } }))}
             />
             <Label htmlFor="wednesday">Wednesday</Label>
             <Checkbox
               id="thursday"
               checked={appointmentDetails.preferredDays.thursday}
               onCheckedChange={(checked) => setAppointmentDetails(prev => ({ ...prev, preferredDays: { ...prev.preferredDays, thursday: !!checked } }))}
             />
             <Label htmlFor="thursday">Thursday</Label>
             <Checkbox
               id="friday"
               checked={appointmentDetails.preferredDays.friday}
               onCheckedChange={(checked) => setAppointmentDetails(prev => ({ ...prev, preferredDays: { ...prev.preferredDays, friday: !!checked } }))}
             />
             <Label htmlFor="friday">Friday</Label>
          </div>
        </div>
      </div>
    </div>
  )

  const renderHealthInfoStep = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <FileText className="h-5 w-5 text-green-600" />
        <h3 className="text-lg font-semibold">Health Information</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="hasReferral">Do you have a referral?</Label>
          <Select onValueChange={(value) => setHealthInfo(prev => ({ ...prev, hasReferral: value }))} value={healthInfo.hasReferral} required>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="yes">Yes</SelectItem>
              <SelectItem value="no">No</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {healthInfo.hasReferral === "yes" && (
          <div>
            <Label htmlFor="pcp">Primary Care Physician (PCP)</Label>
            <Input
              id="pcp"
              value={healthInfo.pcp}
              onChange={(e) => setHealthInfo(prev => ({ ...prev, pcp: e.target.value }))}
            />
          </div>
        )}
        <div>
          <Label htmlFor="medications">Current Medications (Optional)</Label>
          <Textarea
            id="medications"
            value={healthInfo.medications}
            onChange={(e) => setHealthInfo(prev => ({ ...prev, medications: e.target.value }))}
            rows={3}
            className="resize-none"
          />
        </div>
      </div>
    </div>
  )

  const renderInsuranceInfoStep = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <CreditCard className="h-5 w-5 text-orange-600" />
        <h3 className="text-lg font-semibold">Insurance Information</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="hasInsurance">Do you have insurance?</Label>
          <Select onValueChange={(value) => setInsuranceInfo(prev => ({ ...prev, hasInsurance: value }))} value={insuranceInfo.hasInsurance} required>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="yes">Yes</SelectItem>
              <SelectItem value="no">No</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {insuranceInfo.hasInsurance === "yes" && (
          <div>
            <Label htmlFor="insuranceProvider">Insurance Provider</Label>
            <Input
              id="insuranceProvider"
              value={insuranceInfo.insuranceProvider}
              onChange={(e) => setInsuranceInfo(prev => ({ ...prev, insuranceProvider: e.target.value }))}
            />
          </div>
        )}
      </div>
    </div>
  )

  const renderReviewStep = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Info className="h-5 w-5 text-blue-600" />
        <h3 className="text-lg font-semibold">Review Your Information</h3>
      </div>

      <div className="space-y-4">
        <Card className="p-4">
          <h4 className="font-semibold mb-2">Symptoms</h4>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {selectedSymptoms.map(id => commonSymptoms.find(s => s.id === id)?.label).join(", ")}
          </p>
        </Card>

        <Card className="p-4">
          <h4 className="font-semibold mb-2">Urgency Level</h4>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {urgencyLevels.find(u => u.value === urgencyLevel)?.label}
          </p>
        </Card>

        <Card className="p-4">
          <h4 className="font-semibold mb-2">Patient Information</h4>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {patientInfo.firstName} {patientInfo.lastName}<br />
            Phone: {patientInfo.phone}<br />
            {patientInfo.email && `Email: ${patientInfo.email}`}<br />
            {patientInfo.dateOfBirth && `Date of Birth: ${patientInfo.dateOfBirth}`}<br />
            Preferred Contact: {patientInfo.preferredContact}<br />
            {patientInfo.address && `Address: ${patientInfo.address}`}
          </p>
        </Card>

        {additionalNotes && (
          <Card className="p-4">
            <h4 className="font-semibold mb-2">Additional Notes</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">{additionalNotes}</p>
          </Card>
        )}

        <Card className="p-4">
          <h4 className="font-semibold mb-2">Appointment Details</h4>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Doctor: {appointmentDetails.selectedDoctor ? doctors.find(d => d.value === appointmentDetails.selectedDoctor)?.label : "N/A"}<br />
            Location: {appointmentDetails.preferredLocation}<br />
            Date: {appointmentDetails.preferredDate}<br />
            Preferred Days: {Object.entries(appointmentDetails.preferredDays)
              .filter(([_, checked]) => checked)
              .map(([day]) => day.charAt(0).toUpperCase() + day.slice(1))
              .join(", ")}
          </p>
        </Card>

        <Card className="p-4">
          <h4 className="font-semibold mb-2">Health Information</h4>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Referral: {healthInfo.hasReferral === "yes" ? "Yes" : "No"}<br />
            {healthInfo.hasReferral === "yes" && `PCP: ${healthInfo.pcp}`}<br />
            Medications: {healthInfo.medications || "None"}
          </p>
        </Card>

        <Card className="p-4">
          <h4 className="font-semibold mb-2">Insurance Information</h4>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Insurance: {insuranceInfo.hasInsurance === "yes" ? "Yes" : "No"}<br />
            {insuranceInfo.hasInsurance === "yes" && `Provider: ${insuranceInfo.insuranceProvider}`}
          </p>
        </Card>
      </div>
    </div>
  )

  const renderCurrentStep = () => {
    switch (currentStep) {
      case "symptoms":
        return renderSymptomsStep()
      case "urgency":
        return renderUrgencyStep()
      case "patient-info":
        return renderPatientInfoStep()
      case "appointment-details":
        return renderAppointmentDetailsStep()
      case "health-info":
        return renderHealthInfoStep()
      case "insurance":
        return renderInsuranceInfoStep()
      case "review":
        return renderReviewStep()
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      {renderStepIndicator()}
      {renderCurrentStep()}

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-6 border-t">
        <Button
          variant="outline"
          onClick={currentStep === "symptoms" ? onBack : handleBack}
          disabled={currentStep === "symptoms"}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {currentStep === "symptoms" ? "Back to Options" : "Previous"}
        </Button>

        {currentStep === "review" ? (
          <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700">
            Submit Appointment Request
          </Button>
        ) : (
          <Button
            onClick={handleNext}
            disabled={!canProceed()}
            className="ml-auto"
          >
            Continue
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Disclaimer */}
      <div className="text-xs text-gray-500 dark:text-gray-400 text-center pt-4 border-t">
        This information helps us provide appropriate care. For medical emergencies, call 911 immediately.
      </div>
    </div>
  )
} 