import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState, useEffect } from "react"

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

interface PrescriptionRenewalFormProps {
  triageData?: TriageData
}

export function PrescriptionRenewalForm({ triageData }: PrescriptionRenewalFormProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    medicationName: "",
    dosage: "",
    frequency: "",
    pharmacyName: "",
    pharmacyLocation: ""
  })

  // Pre-fill form with triage data
  useEffect(() => {
    if (triageData) {
      setFormData(prev => ({
        ...prev,
        firstName: triageData.patientInfo?.firstName || "",
        lastName: triageData.patientInfo?.lastName || "",
        dateOfBirth: triageData.patientInfo?.dateOfBirth || ""
      }))
    }
  }, [triageData])

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="text-lg sm:text-xl md:text-2xl">Prescription Renewal Request</CardTitle>
        <CardDescription>
          Need a refill? Use this form to request a renewal for an existing prescription. We will respond within 1
          business day.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <fieldset className="space-y-4">
          <legend className="text-base sm:text-lg font-semibold mb-2">Patient Information</legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="pr-name">Full Name (Required)</Label>
              <Input 
                id="pr-name" 
                value={`${formData.firstName} ${formData.lastName}`.trim()}
                onChange={(e) => {
                  const names = e.target.value.split(" ")
                  handleInputChange("firstName", names[0] || "")
                  handleInputChange("lastName", names.slice(1).join(" ") || "")
                }}
                placeholder="First and Last Name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pr-dob">Date of Birth (Required)</Label>
              <Input 
                id="pr-dob" 
                type="date" 
                value={formData.dateOfBirth}
                onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
              />
            </div>
          </div>
        </fieldset>

        <fieldset className="space-y-4">
          <legend className="text-base sm:text-lg font-semibold mb-2">Medication Details</legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="pr-med-name">Medication Name (Required)</Label>
              <Input 
                id="pr-med-name" 
                value={formData.medicationName}
                onChange={(e) => handleInputChange("medicationName", e.target.value)}
                placeholder="e.g., Metoprolol, Lisinopril"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pr-dosage">Dosage (Required)</Label>
              <Input 
                id="pr-dosage" 
                value={formData.dosage}
                onChange={(e) => handleInputChange("dosage", e.target.value)}
                placeholder="e.g., 25mg, 10mg"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="pr-frequency">How often do you take it?</Label>
            <Input 
              id="pr-frequency" 
              value={formData.frequency}
              onChange={(e) => handleInputChange("frequency", e.target.value)}
              placeholder="e.g., Once daily, Twice daily"
            />
          </div>
        </fieldset>

        <fieldset className="space-y-4">
          <legend className="text-base sm:text-lg font-semibold mb-2">Pharmacy Details</legend>
          <div className="space-y-2">
            <Label htmlFor="pr-pharm-name">Pharmacy Name (Required)</Label>
            <Input 
              id="pr-pharm-name" 
              value={formData.pharmacyName}
              onChange={(e) => handleInputChange("pharmacyName", e.target.value)}
              placeholder="e.g., CVS, Walgreens, HEB"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pr-pharm-loc">Pharmacy Phone Number or Address (Required)</Label>
            <Input 
              id="pr-pharm-loc" 
              value={formData.pharmacyLocation}
              onChange={(e) => handleInputChange("pharmacyLocation", e.target.value)}
              placeholder="e.g., (555) 123-4567 or 123 Main St, Houston, TX"
            />
          </div>
        </fieldset>

        <div className="flex items-start space-x-2">
          <Checkbox id="pr-consent" required />
          <Label htmlFor="pr-consent" className="text-sm text-muted-foreground">
            I confirm I am an existing patient and authorize Houston Cardiology Consultants to send my prescription to
            the listed pharmacy.
          </Label>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-4">
        <Button size="lg">
          Submit Request
        </Button>
        <p className="text-xs text-muted-foreground">
          Please allow up to 1 business day for processing. For urgent medication needs, call your pharmacy directly or
          contact our office.
        </p>
      </CardFooter>
    </Card>
  )
}
