import type { Metadata } from "next"
import { SectionWrapper } from "@/components/section-wrapper"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Phone, Printer } from "lucide-react"

export const metadata: Metadata = {
  title: "Our Locations | Houston Cardiology Consultants",
  description: "Find Houston Cardiology Consultants locations in Houston, Texas. Visit our Spring Branch and Heights clinics for comprehensive cardiology care and diagnostics.",
  keywords: "cardiology locations, Houston cardiologist, Spring Branch, Heights, clinic locations, cardiology offices",
  openGraph: {
    title: "Our Locations | Houston Cardiology Consultants",
    description: "Find Houston Cardiology Consultants locations in Houston, Texas. Visit our Spring Branch and Heights clinics for comprehensive cardiology care and diagnostics.",
  },
}

export default function LocationsPage() {
  return (
    <>
      <SectionWrapper className="bg-muted/20">
        <div className="text-center">
          <h1 className="text-3xl font-bold sm:text-5xl lg:text-6xl fade-in-up">Our Locations</h1>
          <p className="mt-4 max-w-3xl mx-auto text-muted-foreground md:text-xl">
            Find the Houston Cardiology Consultants clinic nearest to you.
          </p>
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <div className="grid gap-8 md:grid-cols-2">
          <LocationCard
            name="HCC Long Point / Spring Branch"
            address={"8830 Long Point, Suite 507\nHouston, Texas 77055"}
            phone="713-123-4567"
            fax="713-123-4568"
            hours="Mon - Fri: 8:00 AM - 5:00 PM"
            parking="Free patient parking available in adjacent garage."
            mapEmbed={
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5986.508423557573!2d-95.51047508723434!3d29.804312174941284!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8640c44fb5faaabb%3A0x424e26f293f7ede!2s8830%20Long%20Point%20Rd%20%23507%2C%20Houston%2C%20TX%2077055%2C%20USA!5e1!3m2!1sen!2smx!4v1753111881445!5m2!1sen!2smx" width="100%" height="100%" style={{border:0}} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            }
            directionsUrl="https://maps.app.goo.gl/BzFeTPWZ3THN3o5J9"
          />
          <LocationCard
            name="HCC Tidwell / Heights"
            address={"509 W Tidwell Rd, Suite 130\nHouston, TX 77091"}
            phone="832-987-6543"
            fax="832-987-6542"
            hours="Mon - Fri: 9:00 AM - 6:00 PM"
            parking="Validated parking available in the building."
            mapEmbed={
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5983.984233842916!2d-95.41055728723349!3d29.846460974919847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8640c7ee9c31a5d9%3A0xc1e44f9d425adf26!2s509%20W%20Tidwell%20Rd%20Suite%20130%2C%20Houston%2C%20TX%2077091%2C%20USA!5e1!3m2!1sen!2smx!4v1753111902730!5m2!1sen!2smx" width="100%" height="100%" style={{border:0}} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            }
            directionsUrl="https://maps.app.goo.gl/UYAsbqxg2Fwsnw8Q6"
          />
        </div>
      </SectionWrapper>
    </>
  )
}

function LocationCard({
  name,
  address,
  phone,
  fax,
  hours,
  parking,
  mapEmbed,
  directionsUrl,
}: { name: string; address: string; phone: string; fax: string; hours: string; parking: string; mapEmbed?: React.ReactNode; directionsUrl?: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64 w-full bg-muted rounded-md mb-6 overflow-hidden">
          {mapEmbed ? (
            mapEmbed
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">Map of {name}</div>
          )}
        </div>
        <div className="space-y-3">
          <p className="font-semibold">{address}</p>
          <p className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-muted-foreground" /> {phone}
          </p>
          <p className="flex items-center gap-2">
            <Printer className="h-4 w-4 text-muted-foreground" /> {fax}
          </p>
          <p>
            <span className="font-semibold">Hours:</span> {hours}
          </p>
          <p>
            <span className="font-semibold">Parking:</span> {parking}
          </p>
          {directionsUrl ? (
            <Button className="w-full mt-4" asChild>
              <a href={directionsUrl} target="_blank" rel="noopener noreferrer">Get Directions</a>
            </Button>
          ) : (
            <Button className="w-full mt-4">Get Directions</Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
