import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { SectionWrapper } from "@/components/section-wrapper"
import { ArrowRight, Calendar, HeartHandshake, Pill, Video } from "lucide-react"
import Link from "next/link"
import { DoctorProfileCard } from "@/components/doctor-profile-card"

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <SectionWrapper className="bg-muted/20">
        <div className="flex flex-col items-center gap-8 text-center">
          <div className="space-y-4 text-center flex flex-col justify-center">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">Your Journey Starts Here</h1>
            <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed mx-auto">
              At Houston Cardiology Consultants, we provide personalized care and cutting-edge medical expertise to
              guide you on a transformative journey toward optimal heart health.
            </p>
            <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center pt-4">
              <Button asChild size="lg">
                <Link href="/appointments">Book Appointment</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/about-us">Learn More</Link>
              </Button>
            </div>
          </div>
          <div className="h-64 w-full rounded-lg bg-muted lg:h-96">
            {/* Placeholder for an engaging image or video */}
          </div>
        </div>
      </SectionWrapper>

      {/* Quick Access Cards */}
      <SectionWrapper>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <QuickAccessCard icon={Calendar} title="Schedule Visit" description="New Patient" href="/appointments" />
          <QuickAccessCard
            icon={HeartHandshake}
            title="Manage Your Care"
            description="Existing Patient"
            href="/patient-portal"
          />
          <QuickAccessCard icon={Pill} title="Request Prescription" description="Quick Renewal" href="/appointments" />
          <QuickAccessCard icon={Video} title="Watch Videos" description="Learn About Heart Health" href="/learn" />
        </div>
      </SectionWrapper>

      {/* Meet Our Cardiologists */}
      <SectionWrapper className="bg-muted/20">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Meet Our Cardiologists</h2>
          <p className="mt-4 max-w-2xl text-muted-foreground md:text-lg">
            Compassionate experts dedicated to your heart health.
          </p>
        </div>
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <DoctorProfileCard name="Dr. Abdul" title="Cardiologist" />
          <DoctorProfileCard name="Dr. Asif" title="Interventional Cardiologist" />
          <DoctorProfileCard name="Dr. Sajid" title="Electrophysiologist" />
        </div>
        <div className="mt-8 text-center">
          <Button variant="link" asChild>
            <Link href="/about-us">
              Meet Our Doctors <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </SectionWrapper>

      {/* Our Services Snapshot */}
      <SectionWrapper>
        <div className="flex flex-col items-center text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Our Services</h2>
          <p className="mt-4 max-w-2xl text-muted-foreground md:text-lg">
            A comprehensive range of cardiac services under one roof.
          </p>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <ServiceCard
            title="Diagnostics"
            description="Utilizing advanced technology to accurately assess your heart's condition."
          />
          <ServiceCard
            title="Treatments & Therapies"
            description="Offering personalized and innovative treatments to manage and improve your cardiac health."
          />
          <ServiceCard
            title="Cardiac Wellness"
            description="Focusing on preventive care and lifestyle management for long-term heart health."
          />
          <ServiceCard
            title="Concierge & Telemedicine"
            description="Providing convenient, accessible care options tailored to your busy lifestyle."
          />
        </div>
        <div className="mt-8 text-center">
          <Button asChild>
            <Link href="/services">Explore All Services</Link>
          </Button>
        </div>
      </SectionWrapper>

      {/* Multilingual Education Teaser */}
      <SectionWrapper className="bg-primary text-primary-foreground">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Understand Your Heart.</h2>
          <p className="mt-4 text-lg text-primary-foreground/80">
            Access a wealth of educational resources designed to empower you with knowledge about heart health.
          </p>
          <p className="mt-2 text-lg text-primary-foreground/80">In English, Español, हिंदी, Tiếng Việt</p>
          <Button variant="secondary" size="lg" className="mt-6" asChild>
            <Link href="/learn">Watch Now</Link>
          </Button>
        </div>
      </SectionWrapper>

      {/* Location Preview */}
      <SectionWrapper>
        <div className="grid gap-10 md:grid-cols-2">
          <LocationPreview address="123 Heart Health Way, Houston, TX" mapPlaceholder />
          <LocationPreview address="456 Wellness Blvd, Houston, TX" mapPlaceholder />
        </div>
      </SectionWrapper>
    </>
  )
}

// Helper components for the homepage
function QuickAccessCard({
  icon: Icon,
  title,
  description,
  href,
}: {
  icon: React.ElementType
  title: string
  description: string
  href: string
}) {
  return (
    <Link href={href}>
      <Card className="h-full transition-all hover:shadow-md hover:-translate-y-1">
        <CardContent className="flex flex-col items-center justify-center p-6 text-center">
          <Icon className="h-10 w-10 text-primary mb-4" />
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </CardContent>
      </Card>
    </Link>
  )
}

function ServiceCard({ title, description }: { title: string; description: string }) {
  return (
    <Card className="text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-full">
      <CardContent className="p-6">
        <div className="mx-auto mb-4 h-32 w-full rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
          {/* Placeholder for service image */}
          Image
        </div>
        <h3 className="font-semibold text-lg">{title}</h3>
        <p className="text-sm text-muted-foreground mt-2">{description}</p>
      </CardContent>
    </Card>
  )
}

function LocationPreview({ address, mapPlaceholder }: { address: string; mapPlaceholder?: boolean }) {
  return (
    <Card>
      <CardContent className="p-6">
        {mapPlaceholder && <div className="h-40 w-full rounded-md bg-muted mb-4">{/* Map Thumbnail */}</div>}
        <h3 className="font-semibold">Our Location</h3>
        <p className="text-muted-foreground">{address}</p>
        <Button variant="link" className="p-0 h-auto mt-2" asChild>
          <Link href="/locations">
            View Details & Directions <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}
