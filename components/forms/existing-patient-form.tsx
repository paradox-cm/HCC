import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { format } from "date-fns"
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

interface ExistingPatientFormProps {
  triageData?: TriageData
}

export function ExistingPatientForm({ triageData }: ExistingPatientFormProps) {
  const [preferredDate, setPreferredDate] = useState<Date | undefined>()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    selectedDoctor: "",
    reason: "routine",
    description: "",
    notes: "",
    preferredDays: {
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false
    }
  })

  // Pre-fill form with triage data
  useEffect(() => {
    if (triageData) {
      setFormData(prev => ({
        ...prev,
        firstName: triageData.patientInfo?.firstName || "",
        lastName: triageData.patientInfo?.lastName || "",
        email: triageData.patientInfo?.email || "",
        phone: triageData.patientInfo?.phone || "",
        dateOfBirth: triageData.patientInfo?.dateOfBirth || "",
        description: triageData.symptoms || "",
        selectedDoctor: triageData.doctor || ""
      }))
    }
  }, [triageData])

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleDayToggle = (day: string) => {
    setFormData(prev => ({
      ...prev,
      preferredDays: {
        ...prev.preferredDays,
        [day]: !prev.preferredDays[day as keyof typeof prev.preferredDays]
      }
    }))
  }

  const doctors = [
    { value: "dr-asif-ali", label: "Dr. Asif Ali - Interventional Cardiology" },
    { value: "dr-sajid-ali", label: "Dr. Sajid Ali - Cardiovascular Disease" },
    { value: "dr-abdul-ali", label: "Dr. Abdul Ali - Cardiovascular Disease" },
    { value: "any", label: "Any Available Doctor" }
  ]

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="text-lg sm:text-xl md:text-2xl">Existing Patient Follow-Up Form</CardTitle>
        <CardDescription>
          Welcome back! Let's make your follow-up visit easy to schedule. We'll confirm your appointment within 1
          business day.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <fieldset className="space-y-4">
          <legend className="text-base sm:text-lg font-semibold mb-2">Patient Identification</legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="ep-name">Full Name (Required)</Label>
              <Input 
                id="ep-name" 
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
              <Label htmlFor="ep-dob">Date of Birth (Required)</Label>
              <Input 
                id="ep-dob" 
                type="date" 
                value={formData.dateOfBirth}
                onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ep-email">Email Address (Required)</Label>
              <Input 
                id="ep-email" 
                type="email" 
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="your.email@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ep-phone">Phone Number (Required)</Label>
              <Input 
                id="ep-phone" 
                type="tel" 
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="(555) 123-4567"
              />
            </div>
          </div>
        </fieldset>

        <fieldset className="space-y-4">
          <legend className="text-base sm:text-lg font-semibold mb-2">Appointment Details</legend>
          <div className="space-y-2">
            <Label htmlFor="ep-doctor">Preferred Doctor</Label>
            <Select value={formData.selectedDoctor} onValueChange={(value) => handleInputChange("selectedDoctor", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select a doctor (optional)" />
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
          <div className="space-y-2">
            <Label htmlFor="ep-preferred-date">Preferred Appointment Date</Label>
            <Input
              id="ep-preferred-date"
              type="date"
              value={preferredDate ? preferredDate.toISOString().slice(0, 10) : ''}
              onChange={e => setPreferredDate(e.target.value ? new Date(e.target.value) : undefined)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label>Preferred Appointment Days (Select all that apply)</Label>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="ep-day-mon" 
                  checked={formData.preferredDays.monday}
                  onCheckedChange={() => handleDayToggle("monday")}
                />
                <Label htmlFor="ep-day-mon">Monday</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="ep-day-tue" 
                  checked={formData.preferredDays.tuesday}
                  onCheckedChange={() => handleDayToggle("tuesday")}
                />
                <Label htmlFor="ep-day-tue">Tuesday</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="ep-day-wed" 
                  checked={formData.preferredDays.wednesday}
                  onCheckedChange={() => handleDayToggle("wednesday")}
                />
                <Label htmlFor="ep-day-wed">Wednesday</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="ep-day-thu" 
                  checked={formData.preferredDays.thursday}
                  onCheckedChange={() => handleDayToggle("thursday")}
                />
                <Label htmlFor="ep-day-thu">Thursday</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="ep-day-fri" 
                  checked={formData.preferredDays.friday}
                  onCheckedChange={() => handleDayToggle("friday")}
                />
                <Label htmlFor="ep-day-fri">Friday</Label>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Is this appointment related to a recent visit or new symptoms?</Label>
            <RadioGroup 
              value={formData.reason} 
              onValueChange={(value) => handleInputChange("reason", value)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="recent" id="ep-reason-recent" />
                <Label htmlFor="ep-reason-recent">Recent Visit</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="new" id="ep-reason-new" />
                <Label htmlFor="ep-reason-new">New Symptoms</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="routine" id="ep-reason-routine" />
                <Label htmlFor="ep-reason-routine">Routine Follow-Up</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="space-y-2">
            <Label htmlFor="ep-description">Brief Description of Reason for Follow-Up</Label>
            <Input 
              id="ep-description" 
              placeholder="e.g., medication adjustment, test review" 
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="ep-notes">Additional Notes (Optional)</Label>
            <Textarea
              id="ep-notes"
              placeholder="Let us know if there's anything specific you'd like to address."
              value={formData.notes}
              onChange={(e) => handleInputChange("notes", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="ep-upload">Upload Documents (Optional)</Label>
            <Input id="ep-upload" type="file" />
          </div>
        </fieldset>

        <div className="flex items-start space-x-2">
          <Checkbox id="ep-consent" required />
          <Label htmlFor="ep-consent" className="text-sm text-muted-foreground">
            I confirm I am a current patient of Houston Cardiology Consultants and consent to being contacted regarding
            this request.
          </Label>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-4">
        <Button size="lg">
          Submit Request
        </Button>
        <p className="text-xs text-muted-foreground">
          Need help sooner? Use our chatbot or call the office for urgent questions.
        </p>
      </CardFooter>
    </Card>
  )
}
