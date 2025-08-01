"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { SectionWrapper } from "@/components/section-wrapper"
import ArrowRightSFillIcon from 'remixicon-react/ArrowRightSFillIcon';
import CalendarFillIcon from 'remixicon-react/CalendarFillIcon';
import HandHeartFillIcon from 'remixicon-react/HandHeartFillIcon';
import CapsuleFillIcon from 'remixicon-react/CapsuleFillIcon';
import VideoFillIcon from 'remixicon-react/VideoFillIcon';
import Link from "next/link"
import { DoctorProfileCard } from "@/components/doctor-profile-card"
import { HeaderAnimation } from "@/components/HeaderAnimation"
import { useEffect, useState } from "react"

export default function HomePageClient() {
  return (
    <>
      <CookieBanner />
      {/* Hero Section */}
      <SectionWrapper className="bg-muted/20 relative overflow-hidden">
        <HeaderAnimation 
          type="pulse-wave" 
          intensity="medium" 
          colorScheme="red" 
          responsive={true}
        />
        <div className="flex flex-col items-center gap-8 text-center relative z-10">
          <div className="space-y-4 text-center flex flex-col justify-center">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl fade-in-up">Your Journey Starts Here</h1>
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
          <div className="h-64 w-full rounded-lg bg-muted lg:h-96 relative z-20">
            {/* Placeholder for an engaging image or video */}
          </div>
        </div>
      </SectionWrapper>

      {/* Quick Access Cards */}
      <SectionWrapper>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <QuickAccessCard icon={CalendarFillIcon} title="Schedule Visit" description="Book Appointment" href="/appointments" />
          <QuickAccessCard
            icon={HandHeartFillIcon}
            title="Manage Your Care"
            description="Patient Portal"
            href="/patient-portal"
          />
          <QuickAccessCard icon={CapsuleFillIcon} title="Request Prescription" description="Manage Prescriptions" href="/patient-portal/dashboard/prescriptions?new=1" />
          <QuickAccessCard icon={VideoFillIcon} title="Watch Videos" description="Learn About Heart Health" href="/learn" />
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
                      <DoctorProfileCard name="Dr. Abdul" title="Interventional Cardiologist" photo="/dr-abdul-ali.png" />
            <DoctorProfileCard name="Dr. Asif" title="Preventive Cardiologist" photo="/dr-asif-ali.png" />
            <DoctorProfileCard name="Dr. Sajid" title="Interventional Cardiologist" photo="/dr-sajid-ali.png" />
        </div>
        <div className="mt-8 text-center">
          <Button variant="link" asChild>
            <Link href="/about-us">
              Learn More About Us <ArrowRightSFillIcon className="ml-2 h-4 w-4" />
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
            image="/images/Diagnostics.png"
            href="/services#diagnostics"
          />
          <ServiceCard
            title="Treatments & Therapies"
            description="Offering personalized and innovative treatments to manage and improve your cardiac health."
            image="/images/Treatments.png"
            href="/services#treatments-&-therapies"
          />
          <ServiceCard
            title="Cardiac Wellness"
            description="Focusing on preventive care and lifestyle management for long-term heart health."
            image="/images/Wellness.png"
            href="/services#cardiac-wellness"
          />
          <ServiceCard
            title="Concierge & Telemedicine"
            description="Providing convenient, accessible care options tailored to your busy lifestyle."
            image="/images/Concierge.png"
            href="/services#special-services"
          />
        </div>
        <div className="mt-8 text-center">
          <Button asChild>
            <Link href="/services">Explore All Services</Link>
          </Button>
        </div>
      </SectionWrapper>

      {/* Multilingual Education Teaser */}
      <SectionWrapper>
        <div className="bg-primary text-primary-foreground rounded-2xl shadow-lg px-4 md:px-8 py-10 w-full max-w-7xl mx-auto text-center">
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
          <LocationPreview name="HCC Long Point / Spring Branch" address="8830 Long Point, Suite 507\nHouston, Texas 77055" mapPlaceholder />
          <LocationPreview name="HCC Tidwell / Heights" address="509 W Tidwell Rd, Suite 130\nHouston, TX 77091" mapPlaceholder />
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

function ServiceCard({ title, description, image, href }: { title: string; description: string; image: string; href?: string }) {
  const cardContent = (
    <Card className="text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-full cursor-pointer">
      <CardContent className="p-6">
        <div className="mx-auto mb-4 h-32 w-full rounded-lg bg-muted flex items-center justify-center overflow-hidden">
          <img src={image} alt={title + ' image'} className="object-contain h-full w-full" />
        </div>
        <h3 className="font-semibold text-lg">{title}</h3>
        <p className="text-sm text-muted-foreground mt-2">{description}</p>
      </CardContent>
    </Card>
  );
  return href ? (
    <Link href={href} scroll={true} passHref legacyBehavior>
      <a>{cardContent}</a>
    </Link>
  ) : cardContent;
}

function LocationPreview({ name, address, mapPlaceholder }: { name: string; address: string; mapPlaceholder?: boolean }) {
  return (
    <Card>
      <CardContent className="p-6">
        {mapPlaceholder && <div className="h-40 w-full rounded-md bg-muted mb-4">{/* Map Thumbnail */}</div>}
        <h3 className="font-semibold">{name}</h3>
        <p className="text-muted-foreground">{address}</p>
        <Button variant="link" className="p-0 h-auto mt-2" asChild>
          <Link href="/locations">
            View Details & Directions <ArrowRightSFillIcon className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}

function CookieBanner() {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const consent = localStorage.getItem("cookie-consent")
      if (!consent) setVisible(true)
    }
  }, [])
  const handleConsent = (accepted: boolean) => {
    localStorage.setItem("cookie-consent", accepted ? "accepted" : "declined")
    setVisible(false)
  }
  if (!visible) return null
  return (
    <div className="fixed bottom-0 left-0 w-full z-50 flex justify-center px-2 pb-2 pointer-events-none">
      <Card className="w-full max-w-7xl mx-auto shadow-lg border bg-background pointer-events-auto">
        <CardContent className="flex flex-col sm:flex-row items-center gap-4 p-4">
          <div className="flex-1 text-sm text-muted-foreground text-left">
            We use cookies to enhance your experience, analyze site usage, and assist in our marketing efforts. By clicking "Accept", you consent to the use of cookies.
          </div>
          <div className="flex gap-2 mt-2 sm:mt-0">
            <Button size="sm" variant="outline" onClick={() => handleConsent(false)} className="px-4">Decline</Button>
            <Button size="sm" onClick={() => handleConsent(true)} className="px-4">Accept</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 