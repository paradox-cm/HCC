import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { format } from "date-fns"
import { useState, useEffect } from "react"
import { Calendar as CalendarIcon } from "lucide-react"

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

interface NewPatientFormProps {
  triageData?: TriageData
}

export function NewPatientForm({ triageData }: NewPatientFormProps) {
  const [preferredDate, setPreferredDate] = useState<Date | undefined>()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    preferredContact: "either",
    address: "",
    preferredLocation: "spring-branch",
    reason: "",
    hasReferral: "no",
    pcp: "",
    medications: "",
    hasInsurance: "yes",
    insuranceProvider: "",
    selectedDoctor: "",
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
        preferredContact: triageData.patientInfo?.preferredContact || "either",
        preferredLocation: triageData.patientInfo?.preferredLocation || "spring-branch",
        reason: triageData.symptoms || "",
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
        <CardTitle className="text-lg sm:text-xl md:text-2xl">New Patient Appointment Form</CardTitle>
        <CardDescription>
          Welcome! To schedule your first visit, please complete the form below. Our team will contact you within 1
          business day.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <fieldset className="space-y-4">
          <legend className="text-base sm:text-lg font-semibold mb-2">Patient Information</legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="np-name">Full Name (Required)</Label>
              <Input 
                id="np-name" 
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
              <Label htmlFor="np-dob">Date of Birth (Required)</Label>
              <Input 
                id="np-dob" 
                type="date" 
                value={formData.dateOfBirth}
                onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="np-email">Email Address (Required)</Label>
              <Input 
                id="np-email" 
                type="email" 
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="your.email@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="np-phone">Phone Number (Required)</Label>
              <Input 
                id="np-phone" 
                type="tel" 
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="(555) 123-4567"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Preferred Contact Method</Label>
            <RadioGroup 
              value={formData.preferredContact} 
              onValueChange={(value) => handleInputChange("preferredContact", value)}
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="phone" id="np-contact-phone" />
                <Label htmlFor="np-contact-phone">Phone</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="email" id="np-contact-email" />
                <Label htmlFor="np-contact-email">Email</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="either" id="np-contact-either" />
                <Label htmlFor="np-contact-either">Either</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="space-y-2">
            <Label htmlFor="np-address">Address (Street, City, State, ZIP)</Label>
            <Input 
              id="np-address" 
              value={formData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              placeholder="123 Main St, Houston, TX 77001"
            />
          </div>
        </fieldset>

        <fieldset className="space-y-4">
          <legend className="text-base sm:text-lg font-semibold mb-2">Appointment Details</legend>
          <div className="space-y-2">
            <Label htmlFor="np-doctor">Preferred Doctor</Label>
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
            <Label>Preferred Location</Label>
            <RadioGroup 
              value={formData.preferredLocation} 
              onValueChange={(value) => handleInputChange("preferredLocation", value)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="spring-branch" id="np-loc-sb" />
                <Label htmlFor="np-loc-sb">Spring Branch - 8830 Long Point Rd</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="heights" id="np-loc-h" />
                <Label htmlFor="np-loc-h">Heights - 509 W Tidwell Rd</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="space-y-2">
            <Label htmlFor="np-preferred-date">Preferred Appointment Date</Label>
            <Input
              id="np-preferred-date"
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
                  id="np-day-mon" 
                  checked={formData.preferredDays.monday}
                  onCheckedChange={() => handleDayToggle("monday")}
                />
                <Label htmlFor="np-day-mon">Monday</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="np-day-tue" 
                  checked={formData.preferredDays.tuesday}
                  onCheckedChange={() => handleDayToggle("tuesday")}
                />
                <Label htmlFor="np-day-tue">Tuesday</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="np-day-wed" 
                  checked={formData.preferredDays.wednesday}
                  onCheckedChange={() => handleDayToggle("wednesday")}
                />
                <Label htmlFor="np-day-wed">Wednesday</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="np-day-thu" 
                  checked={formData.preferredDays.thursday}
                  onCheckedChange={() => handleDayToggle("thursday")}
                />
                <Label htmlFor="np-day-thu">Thursday</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="np-day-fri" 
                  checked={formData.preferredDays.friday}
                  onCheckedChange={() => handleDayToggle("friday")}
                />
                <Label htmlFor="np-day-fri">Friday</Label>
              </div>
            </div>
          </div>
        </fieldset>

        <fieldset className="space-y-4">
          <legend className="text-lg font-semibold mb-2">Health Information</legend>
          <div className="space-y-2">
            <Label htmlFor="np-reason">Reason for Visit</Label>
            <Input 
              id="np-reason" 
              placeholder="e.g., chest pain, second opinion" 
              value={formData.reason}
              onChange={(e) => handleInputChange("reason", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Do you have a referral from a doctor?</Label>
            <RadioGroup 
              value={formData.hasReferral} 
              onValueChange={(value) => handleInputChange("hasReferral", value)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="np-ref-yes" />
                <Label htmlFor="np-ref-yes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="np-ref-no" />
                <Label htmlFor="np-ref-no">No</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="space-y-2">
            <Label htmlFor="np-pcp">Primary Care Physician Name (if applicable)</Label>
            <Input 
              id="np-pcp" 
              value={formData.pcp}
              onChange={(e) => handleInputChange("pcp", e.target.value)}
              placeholder="Dr. Smith"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="np-meds">Current Medications (Optional)</Label>
            <Textarea 
              id="np-meds" 
              value={formData.medications}
              onChange={(e) => handleInputChange("medications", e.target.value)}
              placeholder="List any current medications..."
            />
          </div>
        </fieldset>

        <fieldset className="space-y-4">
          <legend className="text-lg font-semibold mb-2">Insurance & Documents</legend>
          <div className="space-y-2">
            <Label>Do you have health insurance?</Label>
            <RadioGroup 
              value={formData.hasInsurance} 
              onValueChange={(value) => handleInputChange("hasInsurance", value)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="np-ins-yes" />
                <Label htmlFor="np-ins-yes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="np-ins-no" />
                <Label htmlFor="np-ins-no">No</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="space-y-2">
            <Label htmlFor="np-provider">Insurance Provider (if applicable)</Label>
            <Input 
              id="np-provider" 
              value={formData.insuranceProvider}
              onChange={(e) => handleInputChange("insuranceProvider", e.target.value)}
              placeholder="e.g., Blue Cross Blue Shield"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="np-upload">Upload Documents (Optional)</Label>
            <Input id="np-upload" type="file" />
          </div>
        </fieldset>

        <div className="flex items-start space-x-2">
          <Checkbox id="np-consent" required />
          <Label htmlFor="np-consent" className="text-sm text-muted-foreground">
            I consent to being contacted by Houston Cardiology Consultants regarding my appointment request.
          </Label>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-4">
        <Button size="lg">
          Submit Request
        </Button>
        <p className="text-xs text-muted-foreground">
          After submission, you'll receive a confirmation email or call. If you have any questions, feel free to use the
          chatbot or call us directly.
        </p>
      </CardFooter>
    </Card>
  )
}
