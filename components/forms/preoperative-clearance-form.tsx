import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"

export function PreoperativeClearanceForm() {
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
              <Input id="pc-name" disabled />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pc-dob">Date of Birth (Required)</Label>
              <Input id="pc-dob" type="date" disabled />
            </div>
          </div>
        </fieldset>

        <fieldset className="space-y-4">
          <legend className="text-base sm:text-lg font-semibold mb-2">Surgical Information</legend>
          <div className="space-y-2">
            <Label htmlFor="pc-surgery-type">Type of Surgery You Are Scheduled For</Label>
            <Input id="pc-surgery-type" placeholder="e.g., orthopedic, general surgery" disabled />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pc-surgeon-name">Name of Referring Surgeon / Clinic</Label>
            <Input id="pc-surgeon-name" disabled />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pc-surgery-date">Date of Scheduled Surgery (Required)</Label>
            <Input id="pc-surgery-date" type="date" disabled />
          </div>
        </fieldset>

        <fieldset className="space-y-4">
          <legend className="text-base sm:text-lg font-semibold mb-2">Medical History</legend>
          <div className="space-y-2">
            <Label>Do you currently see a cardiologist at HCC?</Label>
            <RadioGroup defaultValue="no" disabled>
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
            <Input id="pc-history" placeholder="e.g., stents, pacemaker, prior heart attack" disabled />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pc-meds">List of Current Medications</Label>
            <Textarea id="pc-meds" disabled />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pc-upload">Upload Documents (Optional)</Label>
            <Input id="pc-upload" type="file" disabled />
          </div>
        </fieldset>

        <div className="flex items-start space-x-2">
          <Checkbox id="pc-consent" disabled />
          <Label htmlFor="pc-consent" className="text-sm text-muted-foreground">
            I authorize Houston Cardiology Consultants to contact my surgical team and provide the necessary cardiac
            clearance documentation.
          </Label>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-4">
        <Button size="lg" disabled>
          Submit Request
        </Button>
        <p className="text-xs text-muted-foreground">
          We aim to complete all clearance evaluations within 24-48 business hours. Urgent cases will be prioritized.
        </p>
      </CardFooter>
    </Card>
  )
}
