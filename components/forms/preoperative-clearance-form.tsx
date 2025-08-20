import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
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

interface PreoperativeClearanceFormProps {
  triageData?: TriageData
}

export function PreoperativeClearanceForm({ triageData }: PreoperativeClearanceFormProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    surgeryType: "",
    surgeonName: "",
    surgeryDate: "",
    isHCCPatient: "no",
    heartHistory: "",
    medications: ""
  })

  // Pre-fill form with triage data
  useEffect(() => {
    if (triageData) {
      setFormData(prev => ({
        ...prev,
        firstName: triageData.patientInfo?.firstName || "",
        lastName: triageData.patientInfo?.lastName || "",
        dateOfBirth: triageData.patientInfo?.dateOfBirth || "",
        medications: triageData.symptoms || ""
      }))
    }
  }, [triageData])

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="text-lg sm:text-xl md:text-2xl">Preoperative Clearance Request</CardTitle>
        <CardDescription>
          Need a cardiac clearance for surgery? Complete the form below and we will follow up within 1 business day.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <fieldset className="space-y-4">
          <legend className="text-base sm:text-lg font-semibold mb-2">Patient Information</legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="pc-name">Full Name (Required)</Label>
              <Input 
                id="pc-name" 
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
              <Label htmlFor="pc-dob">Date of Birth (Required)</Label>
              <Input 
                id="pc-dob" 
                type="date" 
                value={formData.dateOfBirth}
                onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
              />
            </div>
          </div>
        </fieldset>

        <fieldset className="space-y-4">
          <legend className="text-base sm:text-lg font-semibold mb-2">Surgical Information</legend>
          <div className="space-y-2">
            <Label htmlFor="pc-surgery-type">Type of Surgery You Are Scheduled For</Label>
            <Input 
              id="pc-surgery-type" 
              placeholder="e.g., orthopedic, general surgery" 
              value={formData.surgeryType}
              onChange={(e) => handleInputChange("surgeryType", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pc-surgeon-name">Name of Referring Surgeon / Clinic</Label>
            <Input 
              id="pc-surgeon-name" 
              value={formData.surgeonName}
              onChange={(e) => handleInputChange("surgeonName", e.target.value)}
              placeholder="e.g., Dr. Smith, Memorial Hermann"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pc-surgery-date">Date of Scheduled Surgery (Required)</Label>
            <Input 
              id="pc-surgery-date" 
              type="date" 
              value={formData.surgeryDate}
              onChange={(e) => handleInputChange("surgeryDate", e.target.value)}
            />
          </div>
        </fieldset>

        <fieldset className="space-y-4">
          <legend className="text-base sm:text-lg font-semibold mb-2">Medical History</legend>
          <div className="space-y-2">
            <Label>Do you currently see a cardiologist at HCC?</Label>
            <RadioGroup 
              value={formData.isHCCPatient} 
              onValueChange={(value) => handleInputChange("isHCCPatient", value)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="pc-hcc-yes" />
                <Label htmlFor="pc-hcc-yes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="pc-hcc-no" />
                <Label htmlFor="pc-hcc-no">No</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="space-y-2">
            <Label htmlFor="pc-history">Do you have any history of heart conditions?</Label>
            <Input 
              id="pc-history" 
              placeholder="e.g., stents, pacemaker, prior heart attack" 
              value={formData.heartHistory}
              onChange={(e) => handleInputChange("heartHistory", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pc-meds">List of Current Medications</Label>
            <Textarea 
              id="pc-meds" 
              value={formData.medications}
              onChange={(e) => handleInputChange("medications", e.target.value)}
              placeholder="List all current medications..."
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pc-upload">Upload Documents (Optional)</Label>
            <Input id="pc-upload" type="file" />
          </div>
        </fieldset>

        <div className="flex items-start space-x-2">
          <Checkbox id="pc-consent" required />
          <Label htmlFor="pc-consent" className="text-sm text-muted-foreground">
            I authorize Houston Cardiology Consultants to contact my surgical team and provide the necessary cardiac
            clearance documentation.
          </Label>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-4">
        <Button size="lg">
          Submit Request
        </Button>
        <p className="text-xs text-muted-foreground">
          We aim to complete all clearance evaluations within 24-48 business hours. Urgent cases will be prioritized.
        </p>
      </CardFooter>
    </Card>
  )
}
