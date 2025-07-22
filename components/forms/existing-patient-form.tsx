import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { format } from "date-fns"
import { useState } from "react"

export function ExistingPatientForm() {
  const [preferredDate, setPreferredDate] = useState<Date | undefined>()
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Existing Patient Follow-Up Form</CardTitle>
        <CardDescription>
          Welcome back! Let's make your follow-up visit easy to schedule. We'll confirm your appointment within 1
          business day.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <fieldset className="space-y-4">
          <legend className="text-lg font-semibold mb-2">Patient Identification</legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="ep-name">Full Name (Required)</Label>
              <Input id="ep-name" disabled />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ep-dob">Date of Birth (Required)</Label>
              <Input id="ep-dob" type="date" disabled />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ep-email">Email Address (Required)</Label>
              <Input id="ep-email" type="email" disabled />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ep-phone">Phone Number (Required)</Label>
              <Input id="ep-phone" type="tel" disabled />
            </div>
          </div>
        </fieldset>

        <fieldset className="space-y-4">
          <legend className="text-lg font-semibold mb-2">Appointment Details</legend>
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
                <Checkbox id="ep-day-mon" />
                <Label htmlFor="ep-day-mon">Monday</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="ep-day-tue" />
                <Label htmlFor="ep-day-tue">Tuesday</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="ep-day-wed" />
                <Label htmlFor="ep-day-wed">Wednesday</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="ep-day-thu" />
                <Label htmlFor="ep-day-thu">Thursday</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="ep-day-fri" />
                <Label htmlFor="ep-day-fri">Friday</Label>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Is this appointment related to a recent visit or new symptoms?</Label>
            <RadioGroup defaultValue="routine" disabled>
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
            <Input id="ep-description" placeholder="e.g., medication adjustment, test review" disabled />
          </div>
          <div className="space-y-2">
            <Label htmlFor="ep-notes">Additional Notes (Optional)</Label>
            <Textarea
              id="ep-notes"
              placeholder="Let us know if there's anything specific you'd like to address."
              disabled
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="ep-upload">Upload Documents (Optional)</Label>
            <Input id="ep-upload" type="file" disabled />
          </div>
        </fieldset>

        <div className="flex items-start space-x-2">
          <Checkbox id="ep-consent" disabled />
          <Label htmlFor="ep-consent" className="text-sm text-muted-foreground">
            I confirm I am a current patient of Houston Cardiology Consultants and consent to being contacted regarding
            this request.
          </Label>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-4">
        <Button size="lg" disabled>
          Submit Request
        </Button>
        <p className="text-xs text-muted-foreground">
          Need help sooner? Use our chatbot or call the office for urgent questions.
        </p>
      </CardFooter>
    </Card>
  )
}
