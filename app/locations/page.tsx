import { SectionWrapper } from "@/components/section-wrapper"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Phone, Printer } from "lucide-react"

export default function LocationsPage() {
  return (
    <>
      <SectionWrapper className="bg-muted/20">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">Our Locations</h1>
          <p className="mt-4 max-w-3xl mx-auto text-muted-foreground md:text-xl">
            Find the Houston Cardiology Consultants clinic nearest to you.
          </p>
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <div className="grid gap-8 md:grid-cols-2">
          <LocationCard
            name="Heart Health Way Clinic"
            address="123 Heart Health Way, Houston, TX 77002"
            phone="713-123-4567"
            fax="713-123-4568"
            hours="Mon - Fri: 8:00 AM - 5:00 PM"
            parking="Free patient parking available in adjacent garage."
          />
          <LocationCard
            name="Wellness Boulevard Clinic"
            address="456 Wellness Blvd, Houston, TX 77030"
            phone="832-987-6543"
            fax="832-987-6542"
            hours="Mon - Fri: 9:00 AM - 6:00 PM"
            parking="Validated parking available in the building."
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
}: { name: string; address: string; phone: string; fax: string; hours: string; parking: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64 w-full bg-muted rounded-md mb-6">
          {/* Google Maps embed placeholder */}
          <div className="flex items-center justify-center h-full text-muted-foreground">Map of {name}</div>
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
          <Button className="w-full mt-4">Get Directions</Button>
        </div>
      </CardContent>
    </Card>
  )
}
