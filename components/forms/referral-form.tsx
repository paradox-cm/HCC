import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState, useEffect } from "react"
import { Upload, FileText, User, Calendar, Phone, Mail, MapPin } from "lucide-react"

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

interface ReferralFormProps {
  triageData?: TriageData
}

export function ReferralForm({ triageData }: ReferralFormProps) {
  const [formData, setFormData] = useState({
    // Patient Information
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    insuranceProvider: "",
    insuranceId: "",
    
    // Referring Provider Information
    referringProviderName: "",
    referringProviderPhone: "",
    referringProviderEmail: "",
    referringProviderNPI: "",
    referringProviderAddress: "",
    referringProviderCity: "",
    referringProviderState: "",
    referringProviderZip: "",
    
    // Referral Details
    referralType: "",
    urgency: "",
    reasonForReferral: "",
    primaryDiagnosis: "",
    secondaryDiagnosis: "",
    symptoms: "",
    currentMedications: "",
    allergies: "",
    relevantHistory: "",
    recentTests: "",
    
    // Additional Information
    preferredAppointmentType: "",
    preferredLocation: "",
    preferredTime: "",
    specialInstructions: "",
    
    // File Uploads
    uploadedFiles: [] as File[]
  })

  // Pre-fill form with triage data
  useEffect(() => {
    if (triageData) {
      setFormData(prev => ({
        ...prev,
        firstName: triageData.patientInfo?.firstName || "",
        lastName: triageData.patientInfo?.lastName || "",
        dateOfBirth: triageData.patientInfo?.dateOfBirth || "",
        phone: triageData.patientInfo?.phone || "",
        email: triageData.patientInfo?.email || "",
        symptoms: triageData.symptoms || "",
        urgency: triageData.urgency || "routine"
      }))
    }
  }, [triageData])

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setFormData(prev => ({
      ...prev,
      uploadedFiles: [...prev.uploadedFiles, ...files]
    }))
  }

  const removeFile = (index: number) => {
    setFormData(prev => ({
      ...prev,
      uploadedFiles: prev.uploadedFiles.filter((_, i) => i !== index)
    }))
  }

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="text-lg sm:text-xl md:text-2xl flex items-center gap-2">
          <FileText className="h-6 w-6" />
          Medical Referral Form
        </CardTitle>
        <CardDescription>
          Complete this comprehensive referral form to request consultation with our cardiology specialists. 
          We will review and respond within 1 business day.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        
        {/* Patient Information */}
        <fieldset className="space-y-4">
          <legend className="text-base sm:text-lg font-semibold mb-4 flex items-center gap-2">
            <User className="h-5 w-5" />
            Patient Information
          </legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="ref-first-name">First Name *</Label>
              <Input 
                id="ref-first-name" 
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                placeholder="Patient's first name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ref-last-name">Last Name *</Label>
              <Input 
                id="ref-last-name" 
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                placeholder="Patient's last name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ref-dob">Date of Birth *</Label>
              <Input 
                id="ref-dob" 
                type="date" 
                value={formData.dateOfBirth}
                onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ref-gender">Gender</Label>
              <Select value={formData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                  <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="ref-phone">Phone Number *</Label>
              <Input 
                id="ref-phone" 
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="(555) 123-4567"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ref-email">Email Address</Label>
              <Input 
                id="ref-email" 
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="patient@email.com"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="ref-address">Address</Label>
            <Input 
              id="ref-address" 
              value={formData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              placeholder="Street address"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="ref-city">City</Label>
              <Input 
                id="ref-city" 
                value={formData.city}
                onChange={(e) => handleInputChange("city", e.target.value)}
                placeholder="City"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ref-state">State</Label>
              <Input 
                id="ref-state" 
                value={formData.state}
                onChange={(e) => handleInputChange("state", e.target.value)}
                placeholder="State"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ref-zip">ZIP Code</Label>
              <Input 
                id="ref-zip" 
                value={formData.zipCode}
                onChange={(e) => handleInputChange("zipCode", e.target.value)}
                placeholder="ZIP code"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="ref-insurance">Insurance Provider</Label>
              <Input 
                id="ref-insurance" 
                value={formData.insuranceProvider}
                onChange={(e) => handleInputChange("insuranceProvider", e.target.value)}
                placeholder="e.g., Blue Cross Blue Shield"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ref-insurance-id">Insurance ID Number</Label>
              <Input 
                id="ref-insurance-id" 
                value={formData.insuranceId}
                onChange={(e) => handleInputChange("insuranceId", e.target.value)}
                placeholder="Member ID"
              />
            </div>
          </div>
        </fieldset>

        {/* Referring Provider Information */}
        <fieldset className="space-y-4">
          <legend className="text-base sm:text-lg font-semibold mb-4 flex items-center gap-2">
            <User className="h-5 w-5" />
            Referring Provider Information
          </legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="ref-provider-name">Provider Name *</Label>
              <Input 
                id="ref-provider-name" 
                value={formData.referringProviderName}
                onChange={(e) => handleInputChange("referringProviderName", e.target.value)}
                placeholder="Dr. Smith or Clinic Name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ref-provider-phone">Provider Phone *</Label>
              <Input 
                id="ref-provider-phone" 
                type="tel"
                value={formData.referringProviderPhone}
                onChange={(e) => handleInputChange("referringProviderPhone", e.target.value)}
                placeholder="(555) 123-4567"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ref-provider-email">Provider Email</Label>
              <Input 
                id="ref-provider-email" 
                type="email"
                value={formData.referringProviderEmail}
                onChange={(e) => handleInputChange("referringProviderEmail", e.target.value)}
                placeholder="provider@clinic.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ref-provider-npi">NPI Number</Label>
              <Input 
                id="ref-provider-npi" 
                value={formData.referringProviderNPI}
                onChange={(e) => handleInputChange("referringProviderNPI", e.target.value)}
                placeholder="10-digit NPI"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="ref-provider-address">Provider Address</Label>
            <Input 
              id="ref-provider-address" 
              value={formData.referringProviderAddress}
              onChange={(e) => handleInputChange("referringProviderAddress", e.target.value)}
              placeholder="Provider's office address"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="ref-provider-city">City</Label>
              <Input 
                id="ref-provider-city" 
                value={formData.referringProviderCity}
                onChange={(e) => handleInputChange("referringProviderCity", e.target.value)}
                placeholder="City"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ref-provider-state">State</Label>
              <Input 
                id="ref-provider-state" 
                value={formData.referringProviderState}
                onChange={(e) => handleInputChange("referringProviderState", e.target.value)}
                placeholder="State"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ref-provider-zip">ZIP Code</Label>
              <Input 
                id="ref-provider-zip" 
                value={formData.referringProviderZip}
                onChange={(e) => handleInputChange("referringProviderZip", e.target.value)}
                placeholder="ZIP code"
              />
            </div>
          </div>
        </fieldset>

        {/* Referral Details */}
        <fieldset className="space-y-4">
          <legend className="text-base sm:text-lg font-semibold mb-4 flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Referral Details
          </legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="ref-type">Type of Referral *</Label>
              <Select value={formData.referralType} onValueChange={(value) => handleInputChange("referralType", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select referral type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="consultation">Initial Consultation</SelectItem>
                  <SelectItem value="follow-up">Follow-up Visit</SelectItem>
                  <SelectItem value="second-opinion">Second Opinion</SelectItem>
                  <SelectItem value="preoperative">Preoperative Evaluation</SelectItem>
                  <SelectItem value="diagnostic">Diagnostic Testing</SelectItem>
                  <SelectItem value="treatment">Treatment Planning</SelectItem>
                  <SelectItem value="emergency">Urgent/Emergency</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="ref-urgency">Urgency Level *</Label>
              <Select value={formData.urgency} onValueChange={(value) => handleInputChange("urgency", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select urgency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="routine">Routine (2-4 weeks)</SelectItem>
                  <SelectItem value="semi-urgent">Semi-urgent (1-2 weeks)</SelectItem>
                  <SelectItem value="urgent">Urgent (3-7 days)</SelectItem>
                  <SelectItem value="emergency">Emergency (24-48 hours)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="ref-reason">Reason for Referral *</Label>
            <Textarea 
              id="ref-reason" 
              value={formData.reasonForReferral}
              onChange={(e) => handleInputChange("reasonForReferral", e.target.value)}
              placeholder="Please describe the primary reason for this referral..."
              rows={3}
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="ref-primary-dx">Primary Diagnosis</Label>
              <Input 
                id="ref-primary-dx" 
                value={formData.primaryDiagnosis}
                onChange={(e) => handleInputChange("primaryDiagnosis", e.target.value)}
                placeholder="Primary diagnosis or suspected condition"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ref-secondary-dx">Secondary Diagnosis</Label>
              <Input 
                id="ref-secondary-dx" 
                value={formData.secondaryDiagnosis}
                onChange={(e) => handleInputChange("secondaryDiagnosis", e.target.value)}
                placeholder="Secondary diagnosis if applicable"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="ref-symptoms">Current Symptoms</Label>
            <Textarea 
              id="ref-symptoms" 
              value={formData.symptoms}
              onChange={(e) => handleInputChange("symptoms", e.target.value)}
              placeholder="Describe current symptoms, duration, severity..."
              rows={3}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="ref-medications">Current Medications</Label>
            <Textarea 
              id="ref-medications" 
              value={formData.currentMedications}
              onChange={(e) => handleInputChange("currentMedications", e.target.value)}
              placeholder="List all current medications with dosages..."
              rows={3}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="ref-allergies">Allergies</Label>
            <Input 
              id="ref-allergies" 
              value={formData.allergies}
              onChange={(e) => handleInputChange("allergies", e.target.value)}
              placeholder="Drug allergies, environmental allergies, etc."
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="ref-history"> Relevant Medical History</Label>
            <Textarea 
              id="ref-history" 
              value={formData.relevantHistory}
              onChange={(e) => handleInputChange("relevantHistory", e.target.value)}
              placeholder="Relevant past medical history, surgeries, procedures..."
              rows={3}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="ref-tests">Recent Tests/Procedures</Label>
            <Textarea 
              id="ref-tests" 
              value={formData.recentTests}
              onChange={(e) => handleInputChange("recentTests", e.target.value)}
              placeholder="Recent lab work, imaging, procedures, etc."
              rows={3}
            />
          </div>
        </fieldset>

        {/* Preferences */}
        <fieldset className="space-y-4">
          <legend className="text-base sm:text-lg font-semibold mb-4 flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Appointment Preferences
          </legend>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="ref-appt-type">Preferred Appointment Type</Label>
              <Select value={formData.preferredAppointmentType} onValueChange={(value) => handleInputChange("preferredAppointmentType", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="in-person">In-Person</SelectItem>
                  <SelectItem value="telehealth">Telehealth</SelectItem>
                  <SelectItem value="either">Either</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="ref-location">Preferred Location</Label>
              <Select value={formData.preferredLocation} onValueChange={(value) => handleInputChange("preferredLocation", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="heights">HCC Heights</SelectItem>
                  <SelectItem value="spring">HCC Spring</SelectItem>
                  <SelectItem value="any">Any Location</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="ref-time">Preferred Time</Label>
              <Select value={formData.preferredTime} onValueChange={(value) => handleInputChange("preferredTime", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="morning">Morning</SelectItem>
                  <SelectItem value="afternoon">Afternoon</SelectItem>
                  <SelectItem value="evening">Evening</SelectItem>
                  <SelectItem value="any">Any Time</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="ref-instructions">Special Instructions</Label>
            <Textarea 
              id="ref-instructions" 
              value={formData.specialInstructions}
              onChange={(e) => handleInputChange("specialInstructions", e.target.value)}
              placeholder="Any special instructions, accessibility needs, or additional information..."
              rows={2}
            />
          </div>
        </fieldset>

        {/* File Upload */}
        <fieldset className="space-y-4">
          <legend className="text-base sm:text-lg font-semibold mb-4 flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Supporting Documents
          </legend>
          <div className="space-y-2">
            <Label htmlFor="ref-file-upload">Upload Supporting Documents</Label>
            <Input 
              id="ref-file-upload" 
              type="file" 
              multiple
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.tiff"
              onChange={handleFileUpload}
              className="cursor-pointer"
            />
            <p className="text-xs text-muted-foreground">
              Accepted formats: PDF, DOC, DOCX, JPG, PNG, TIFF (Max 10MB per file)
            </p>
          </div>
          
          {formData.uploadedFiles.length > 0 && (
            <div className="space-y-2">
              <Label>Uploaded Files:</Label>
              <div className="space-y-2">
                {formData.uploadedFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-muted rounded-md">
                    <span className="text-sm truncate">{file.name}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(index)}
                      className="text-red-600 hover:text-red-700"
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </fieldset>

        {/* Consent */}
        <div className="flex items-start space-x-2">
          <Checkbox id="ref-consent" required />
          <Label htmlFor="ref-consent" className="text-sm text-muted-foreground">
            I authorize the release of medical information between the referring provider and Houston Cardiology Consultants 
            for the purpose of this referral. I understand this information will be kept confidential and used only for 
            medical treatment purposes.
          </Label>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-4">
        <Button size="lg" className="w-full md:w-auto">
          Submit Referral Request
        </Button>
        <p className="text-xs text-muted-foreground">
          We will review your referral request and contact you within 1 business day to schedule your appointment. 
          Urgent referrals will be prioritized.
        </p>
      </CardFooter>
    </Card>
  )
}
