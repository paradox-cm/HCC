import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function PrescriptionRenewalForm() {
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Prescription Renewal Request</CardTitle>
        <CardDescription>
          Need a refill? Use this form to request a renewal for an existing prescription. We will respond within 1
          business day.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <fieldset className="space-y-4">
          <legend className="text-lg font-semibold mb-2">Patient Information</legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="pr-name">Full Name (Required)</Label>
              <Input id="pr-name" disabled />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pr-dob">Date of Birth (Required)</Label>
              <Input id="pr-dob" type="date" disabled />
            </div>
          </div>
        </fieldset>

        <fieldset className="space-y-4">
          <legend className="text-lg font-semibold mb-2">Medication Details</legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="pr-med-name">Medication Name (Required)</Label>
              <Input id="pr-med-name" disabled />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pr-dosage">Dosage (Required)</Label>
              <Input id="pr-dosage" disabled />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="pr-frequency">How often do you take it?</Label>
            <Input id="pr-frequency" disabled />
          </div>
        </fieldset>

        <fieldset className="space-y-4">
          <legend className="text-lg font-semibold mb-2">Pharmacy Details</legend>
          <div className="space-y-2">
            <Label htmlFor="pr-pharm-name">Pharmacy Name (Required)</Label>
            <Input id="pr-pharm-name" disabled />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pr-pharm-loc">Pharmacy Phone Number or Address (Required)</Label>
            <Input id="pr-pharm-loc" disabled />
          </div>
        </fieldset>

        <div className="flex items-start space-x-2">
          <Checkbox id="pr-consent" disabled />
          <Label htmlFor="pr-consent" className="text-sm text-muted-foreground">
            I confirm I am an existing patient and authorize Houston Cardiology Consultants to send my prescription to
            the listed pharmacy.
          </Label>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-4">
        <Button size="lg" disabled>
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
