import { SectionWrapper } from "@/components/section-wrapper"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Phone, Mail, Printer } from "lucide-react"

export default function ContactPage() {
  return (
    <>
      <SectionWrapper className="bg-muted/20">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">Contact Us</h1>
          <p className="mt-4 max-w-3xl mx-auto text-muted-foreground md:text-xl">
            We're here to help. Reach out to us with any questions or concerns.
          </p>
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <div className="grid gap-10 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Send us a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div>
                  <Label htmlFor="contact-name">Full Name</Label>
                  <Input id="contact-name" placeholder="Jane Doe" />
                </div>
                <div>
                  <Label htmlFor="contact-email">Email</Label>
                  <Input id="contact-email" type="email" placeholder="jane.doe@example.com" />
                </div>
                <div>
                  <Label htmlFor="contact-phone">Phone Number (Optional)</Label>
                  <Input id="contact-phone" type="tel" />
                </div>
                <div>
                  <Label htmlFor="contact-message">Message</Label>
                  <Textarea id="contact-message" placeholder="Your message..." rows={5} />
                </div>
                <Button className="w-full">Submit</Button>
                <p className="text-xs text-muted-foreground text-center pt-2">
                  // TODO: Implement form submission logic and validation.
                </p>
              </form>
            </CardContent>
          </Card>
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Clinic Information</h2>
            <div className="space-y-4">
              <p className="flex items-start gap-3">
                <Phone className="h-5 w-5 mt-1 text-primary" />
                <span>
                  <span className="font-semibold block">Main Phone:</span>
                  (713) 123-4567
                </span>
              </p>
              <p className="flex items-start gap-3">
                <Printer className="h-5 w-5 mt-1 text-primary" />
                <span>
                  <span className="font-semibold block">Fax:</span>
                  (713) 123-4568
                </span>
              </p>
              <p className="flex items-start gap-3">
                <Mail className="h-5 w-5 mt-1 text-primary" />
                <span>
                  <span className="font-semibold block">General Inquiries:</span>
                  info@hccheart.com
                </span>
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold">Office Hours</h3>
              <p className="text-muted-foreground">Monday - Friday: 8:00 AM - 5:00 PM</p>
              <p className="text-muted-foreground">Saturday - Sunday: Closed</p>
            </div>
          </div>
        </div>
      </SectionWrapper>
    </>
  )
}
