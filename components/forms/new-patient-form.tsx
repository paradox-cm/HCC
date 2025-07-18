import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"

export function NewPatientForm() {
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>New Patient Appointment Form</CardTitle>
        <CardDescription>
          Welcome! To schedule your first visit, please complete the form below. Our team will contact you within 1
          business day.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <fieldset className="space-y-4">
          <legend className="text-lg font-semibold mb-2">Patient Information</legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="np-name">Full Name (Required)</Label>
              <Input id="np-name" disabled />
            </div>
            <div className="space-y-2">
              <Label htmlFor="np-dob">Date of Birth (Required)</Label>
              <Input id="np-dob" type="date" disabled />
            </div>
            <div className="space-y-2">
              <Label htmlFor="np-email">Email Address (Required)</Label>
              <Input id="np-email" type="email" disabled />
            </div>
            <div className="space-y-2">
              <Label htmlFor="np-phone">Phone Number (Required)</Label>
              <Input id="np-phone" type="tel" disabled />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Preferred Contact Method</Label>
            <RadioGroup defaultValue="either" className="flex gap-4" disabled>
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
            <Input id="np-address" disabled />
          </div>
        </fieldset>

        <fieldset className="space-y-4">
          <legend className="text-lg font-semibold mb-2">Appointment Details</legend>
          <div className="space-y-2">
            <Label>Preferred Location</Label>
            <RadioGroup defaultValue="spring-branch" disabled>
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
            <Label>Preferred Appointment Days (Select all that apply)</Label>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox id="np-day-mon" disabled />
                <Label htmlFor="np-day-mon">Monday</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="np-day-tue" disabled />
                <Label htmlFor="np-day-tue">Tuesday</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="np-day-wed" disabled />
                <Label htmlFor="np-day-wed">Wednesday</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="np-day-thu" disabled />
                <Label htmlFor="np-day-thu">Thursday</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="np-day-fri" disabled />
                <Label htmlFor="np-day-fri">Friday</Label>
              </div>
            </div>
          </div>
        </fieldset>

        <fieldset className="space-y-4">
          <legend className="text-lg font-semibold mb-2">Health Information</legend>
          <div className="space-y-2">
            <Label htmlFor="np-reason">Reason for Visit</Label>
            <Input id="np-reason" placeholder="e.g., chest pain, second opinion" disabled />
          </div>
          <div className="space-y-2">
            <Label>Do you have a referral from a doctor?</Label>
            <RadioGroup defaultValue="no" disabled>
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
            <Input id="np-pcp" disabled />
          </div>
          <div className="space-y-2">
            <Label htmlFor="np-meds">Current Medications (Optional)</Label>
            <Textarea id="np-meds" disabled />
          </div>
        </fieldset>

        <fieldset className="space-y-4">
          <legend className="text-lg font-semibold mb-2">Insurance & Documents</legend>
          <div className="space-y-2">
            <Label>Do you have health insurance?</Label>
            <RadioGroup defaultValue="yes" disabled>
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
            <Input id="np-provider" disabled />
          </div>
          <div className="space-y-2">
            <Label htmlFor="np-upload">Upload Documents (Optional)</Label>
            <Input id="np-upload" type="file" disabled />
          </div>
        </fieldset>

        <div className="flex items-start space-x-2">
          <Checkbox id="np-consent" disabled />
          <Label htmlFor="np-consent" className="text-sm text-muted-foreground">
            I consent to being contacted by Houston Cardiology Consultants regarding my appointment request.
          </Label>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-4">
        <Button size="lg" disabled>
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
