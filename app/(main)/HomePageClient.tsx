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
import { TriageHeader } from "@/components/TriageHeader"
import { useEffect, useState, useRef, useCallback } from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"

// AnimatedProgressDots component
function AnimatedProgressDots({ 
  totalSlides, 
  currentSlide, 
  autoPlayInterval = 5000,
  onSlideChange 
}: { 
  totalSlides: number
  currentSlide: number
  autoPlayInterval?: number
  onSlideChange: (index: number) => void
}) {
  const [progress, setProgress] = useState(0)
  const animationRef = useRef<number>()

  const animateProgress = useCallback(() => {
    const startTime = Date.now()
    const animate = () => {
      const elapsed = Date.now() - startTime
      const newProgress = Math.min((elapsed / autoPlayInterval) * 100, 100)
      
      setProgress(newProgress)
      
      if (newProgress < 100) {
        animationRef.current = requestAnimationFrame(animate)
      }
    }
    
    animationRef.current = requestAnimationFrame(animate)
  }, [autoPlayInterval])

  useEffect(() => {
    setProgress(0)
    animateProgress()
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [currentSlide, animateProgress])

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  const handleDotClick = (index: number) => {
    onSlideChange(index)
  }

  const handleKeyDown = (event: React.KeyboardEvent, index: number) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      onSlideChange(index)
    }
  }

  return (
    <div className="flex items-center justify-center gap-1 sm:gap-2 mt-4">
      {Array.from({ length: totalSlides }).map((_, index) => (
        <button
          key={index}
          onClick={() => handleDotClick(index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          className="focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-full"
          aria-label={`Go to slide ${index + 1}`}
          role="button"
          tabIndex={0}
        >
          <div className="relative">
            {index === currentSlide ? (
              <div className="w-6 h-2.5 bg-primary/30 rounded-[0.625rem] overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-75 ease-linear"
                  style={{ 
                    width: `${Math.max(10, Math.min(24, progress * 0.24))}px` 
                  }}
                />
              </div>
            ) : (
              <div className="w-2.5 h-2.5 bg-primary/30 rounded-full" />
            )}
          </div>
        </button>
      ))}
    </div>
  )
}

export default function HomePageClient() {
  const contentRef = useRef<HTMLDivElement>(null)
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

  const handleScrollToContent = () => {
    if (contentRef.current) {
      const element = contentRef.current
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - 100 // Account for header height + some padding
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  const scrollTo = useCallback((index: number) => {
    api?.scrollTo(index)
  }, [api])

  // Auto-play functionality
  useEffect(() => {
    if (!api) return

    const interval = setInterval(() => {
      api.scrollNext()
    }, 5000)

    return () => clearInterval(interval)
  }, [api])

  return (
    <>
      <CookieBanner />
      
      {/* New Triage Header */}
      <TriageHeader onScrollToContent={handleScrollToContent} />
      
      {/* Original Hero Section - Now Second Section */}
      <div ref={contentRef}>
        <SectionWrapper className="bg-muted/20 relative overflow-hidden">
          <HeaderAnimation 
            type="pulse-wave" 
            intensity="medium" 
            colorScheme="red" 
            responsive={true}
          />
          <div className="flex flex-col items-center gap-8 text-center relative z-10">
            <div className="space-y-4 text-center flex flex-col justify-center">
              <h1 className="text-3xl font-bold sm:text-5xl lg:text-6xl fade-in-up">Your Journey Starts Here</h1>
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
            <div className="w-full max-w-4xl mx-auto relative z-20">
              <Carousel
                setApi={setApi}
                opts={{
                  align: "start",
                  loop: true,
                }}
                className="w-full"
              >
                <CarouselContent>
                  <CarouselItem>
                    <div className="h-64 lg:h-96 rounded-lg overflow-hidden">
                      <img
                        src="/images/HHC-Home1.png"
                        alt="Houston Cardiology Consultants - Heart Care Excellence"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </CarouselItem>
                  <CarouselItem>
                    <div className="h-64 lg:h-96 rounded-lg overflow-hidden">
                      <img
                        src="/images/HHC-Home2.png"
                        alt="Advanced Cardiac Diagnostics and Treatment"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </CarouselItem>
                  <CarouselItem>
                    <div className="h-64 lg:h-96 rounded-lg overflow-hidden">
                      <img
                        src="/images/HHC-Home3.png"
                        alt="Compassionate Care from Expert Cardiologists"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </CarouselItem>
                  <CarouselItem>
                    <div className="h-64 lg:h-96 rounded-lg overflow-hidden">
                      <img
                        src="/images/HHC-Home4.png"
                        alt="State-of-the-Art Cardiac Facilities"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </CarouselItem>
                  <CarouselItem>
                    <div className="h-64 lg:h-96 rounded-lg overflow-hidden">
                      <img
                        src="/images/HHC-Home5.png"
                        alt="Comprehensive Cardiac Care Services"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </CarouselItem>
                </CarouselContent>
              </Carousel>
              
              <AnimatedProgressDots
                totalSlides={count}
                currentSlide={current - 1}
                autoPlayInterval={5000}
                onSlideChange={scrollTo}
              />
            </div>
          </div>
        </SectionWrapper>
      </div>

      {/* Quick Access Cards */}
      <SectionWrapper>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <QuickAccessCard icon={CalendarFillIcon} title="Schedule Visit" description="Book Appointment" href="/appointments" />
          <QuickAccessCard icon={CapsuleFillIcon} title="Request Prescription" description="Request a Renewal" href="/appointments?form=prescription" />
          <QuickAccessCard icon={VideoFillIcon} title="Watch Videos" description="Learn About Heart Health" href="/learn" />
          <QuickAccessCard
            icon={HandHeartFillIcon}
            title="Questions?"
            description="Visit our FAQ"
            href="/faq"
          />
        </div>
      </SectionWrapper>

      {/* Meet Our Cardiologists */}
      <SectionWrapper className="bg-muted/20">
        <div className="flex flex-col items-center text-center">
                      <h2 className="text-3xl font-bold sm:text-4xl">Meet Our Cardiologists</h2>
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
                      <h2 className="text-3xl font-bold sm:text-4xl">Our Services</h2>
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

      {/* Multilingual Education Teaser - Hidden */}
      {/* <SectionWrapper>
        <div className="bg-primary text-primary-foreground rounded-2xl shadow-lg px-4 md:px-8 py-10 w-full max-w-7xl mx-auto text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">Understand Your Heart.</h2>
            <p className="mt-4 text-lg text-primary-foreground/80">
              Access a wealth of educational resources designed to empower you with knowledge about heart health.
            </p>
            <p className="mt-2 text-lg text-primary-foreground/80">In English, Español, हिंदी, Tiếng Việt</p>
            <Button variant="secondary" size="lg" className="mt-6" asChild>
              <Link href="/learn">Watch Now</Link>
            </Button>
          </div>
        </SectionWrapper> */}

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
  // Determine which image to use based on the location name
  const getLocationImage = (locationName: string) => {
    if (locationName.includes("Long Point") || locationName.includes("Spring Branch")) {
      return "/images/HCC-Spring.png"
    } else if (locationName.includes("Tidwell") || locationName.includes("Heights")) {
      return "/images/HCC-Heights.png"
    }
    return null
  }

  const locationImage = getLocationImage(name)

  return (
    <Card>
      <CardContent className="p-6">
        {locationImage && (
          <div className="h-40 w-full rounded-md overflow-hidden mb-4">
            <img 
              src={locationImage} 
              alt={`${name} location`} 
              className="w-full h-full object-cover"
            />
          </div>
        )}
        {mapPlaceholder && !locationImage && <div className="h-40 w-full rounded-md bg-muted mb-4">{/* Map Thumbnail */}</div>}
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