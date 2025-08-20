"use client"

import { SectionWrapper } from "@/components/section-wrapper"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { DoctorProfileCard } from "@/components/doctor-profile-card"
import { HeaderAnimation } from "@/components/HeaderAnimation"
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

export default function AboutUsPageClient() {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

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
      {/* Header with Carousel */}
      <SectionWrapper className="bg-muted/20 relative overflow-hidden">
        <div className="text-center relative z-10 mb-8">
                                <h1 className="text-3xl font-bold sm:text-5xl lg:text-6xl mb-4 fade-in-up">About Us</h1>
          <p className="mt-4 max-w-3xl mx-auto text-muted-foreground md:text-xl">
            Our commitment to compassionate, state-of-the-art cardiac care.
          </p>
        </div>
        
        {/* Team Image Carousel */}
        <div className="w-full max-w-4xl mx-auto">
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
                <div className="h-64 md:h-80 lg:h-96 rounded-lg overflow-hidden shadow-lg">
                  <img
                    src="/images/HCC-Team.jpg"
                    alt="Houston Cardiology Consultants Team"
                    className="w-full h-full object-cover"
                  />
                </div>
              </CarouselItem>
              <CarouselItem>
                <div className="h-64 md:h-80 lg:h-96 rounded-lg overflow-hidden shadow-lg">
                  <img
                    src="/images/HCC-Team2.jpg"
                    alt="Houston Cardiology Consultants Team"
                    className="w-full h-full object-cover"
                  />
                </div>
              </CarouselItem>
              <CarouselItem>
                <div className="h-64 md:h-80 lg:h-96 rounded-lg overflow-hidden shadow-lg">
                  <img
                    src="/images/HCC-Team3.jpg"
                    alt="Houston Cardiology Consultants Team"
                    className="w-full h-full object-cover"
                  />
                </div>
              </CarouselItem>
              <CarouselItem>
                <div className="h-64 md:h-80 lg:h-96 rounded-lg overflow-hidden shadow-lg">
                  <img
                    src="/images/HCC-Team4.jpg"
                    alt="Houston Cardiology Consultants Team"
                    className="w-full h-full object-cover"
                  />
                </div>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
          
          <AnimatedProgressDots
            totalSlides={count}
            currentSlide={current - 1}
            autoPlayInterval={5000}
            onSlideChange={scrollTo}
          />
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold">Our Story</h2>
            <p className="mt-4 text-muted-foreground">
              Houston Cardiology Consultants is committed to delivering expert cardiovascular and preventive care in a
              supportive, patient-centered environment. Since 1979, we have helped thousands of patients lead longer,
              healthier lives.
            </p>
            <p className="mt-4 text-muted-foreground">
              Founded by Dr. Abdul Ali, HCC began with a simple mission: compassionate, expert heart care. With the
              addition of Dr. Asif Ali and Dr. Sajid Ali, we've embraced advanced technology and academic leadership
              while preserving a personal touch.
            </p>
            <h3 className="text-2xl font-bold mt-8">Our Philosophy</h3>
            <p className="mt-4 text-muted-foreground">
              We combine deep medical knowledge with modern diagnostics and individualized care plans. Our goal is to
              empower each patient with clarity and confidence in their heart health journey.
            </p>
          </div>
          {/* Timeline/Milestones */}
          <div className="flex flex-col gap-6 justify-center">
            <h3 className="text-2xl font-bold mb-2">Our Milestones</h3>
            <ul className="border-l-2 border-primary pl-6 space-y-6">
              <li>
                <div className="text-primary font-semibold">1979</div>
                <div className="text-muted-foreground">Houston Cardiology Consultants founded by Dr. Abdul Ali.</div>
              </li>
              <li>
                <div className="text-primary font-semibold">1990s</div>
                <div className="text-muted-foreground">Expansion to multiple locations and introduction of advanced diagnostics.</div>
              </li>
              <li>
                <div className="text-primary font-semibold">2010</div>
                <div className="text-muted-foreground">Dr. Asif Ali and Dr. Sajid Ali join, bringing academic leadership and new specialties.</div>
              </li>
              <li>
                <div className="text-primary font-semibold">2020</div>
                <div className="text-muted-foreground">Recognized as a regional leader in POTS, dysautonomia, and interventional cardiology.</div>
              </li>
              <li>
                <div className="text-primary font-semibold">Today</div>
                <div className="text-muted-foreground">Serving thousands of patients with a focus on innovation, prevention, and compassionate care.</div>
              </li>
            </ul>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper className="bg-muted/20 relative overflow-hidden">
        <HeaderAnimation 
          type="floating-geometric" 
          intensity="medium" 
          colorScheme="red" 
          responsive={true}
        />
        <h2 className="text-3xl font-bold text-center relative z-10">Meet Our Team</h2>
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 relative z-10">
                      <DoctorProfileCard name="Dr. Abdul" title="Interventional Cardiologist" photo="/dr-abdul-ali.png" />
            <DoctorProfileCard name="Dr. Asif" title="Preventive Cardiologist" photo="/dr-asif-ali.png" />
            <DoctorProfileCard name="Dr. Sajid" title="Interventional Cardiologist" photo="/dr-sajid-ali.png" />
        </div>
      </SectionWrapper>

      {/* Background Image Section */}
      <div className="relative w-full h-64 md:h-80 lg:h-96 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/images/HCC-About.png)'
          }}
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <SectionWrapper>
        {/* Testimonials Section */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-center mb-6">What Our Patients Say</h3>
          <div className="grid gap-6 md:grid-cols-2">
            <blockquote className="border-l-4 border-primary pl-6 italic text-muted-foreground bg-white/80 dark:bg-background/70 py-6 px-4 rounded shadow-sm border border-muted/40">
              "I came to Dr. Asif Ali after being diagnosed with an unusual cardiomyopathy. I had previously met with three other cardiologists and consulted with two others but they were not able to effectively explain nor treat my heart condition. Dr. Ali was the first doctor to truly listen to my symptoms and take the time to understand my condition."
              <div className="mt-2 text-xs text-right text-muted-foreground">— Gabriela Bollich<br /><span className="text-[11px] text-muted-foreground">Google Review</span></div>
            </blockquote>
            <blockquote className="border-l-4 border-primary pl-6 italic text-muted-foreground bg-white/80 dark:bg-background/70 py-6 px-4 rounded shadow-sm border border-muted/40">
              "Dr. Ali is a wonderful physician. I went to him for a second opinion. He listened to all of my concerns and answered all of my questions. I am doing so much better now on his treatment plan."
              <div className="mt-2 text-xs text-right text-muted-foreground">— Amy Hair<br /><span className="text-[11px] text-muted-foreground">Google Review</span></div>
            </blockquote>
            <blockquote className="border-l-4 border-primary pl-6 italic text-muted-foreground bg-white/80 dark:bg-background/70 py-6 px-4 rounded shadow-sm border border-muted/40">
              "Dr Ali is personable, competent. He explains all things thoroughly and goes the extra mile to ensure everything is covered to address and treat the issue. After years of not knowing what my issue was, he found it, explained it, and I'm now under his care. That has been amazing."
              <div className="mt-2 text-xs text-right text-muted-foreground">— Angela Johnson<br /><span className="text-[11px] text-muted-foreground">Healthgrades</span></div>
            </blockquote>
            <blockquote className="border-l-4 border-primary pl-6 italic text-muted-foreground bg-white/80 dark:bg-background/70 py-6 px-4 rounded shadow-sm border border-muted/40">
              "Dr. Sajid Ali saved my father's life. He was attentive, had impeccable bedside manner, and we are forever grateful."
              <div className="mt-2 text-xs text-right text-muted-foreground">— Cynthia Elias<br /><span className="text-[11px] text-muted-foreground">Healthgrades</span></div>
            </blockquote>
            <blockquote className="border-l-4 border-primary pl-6 italic text-muted-foreground bg-white/80 dark:bg-background/70 py-6 px-4 rounded shadow-sm border border-muted/40">
              "This doctor has been a healthy asset to my life – he and his sons are excellent."
              <div className="mt-2 text-xs text-right text-muted-foreground">— Anonymous<br /><span className="text-[11px] text-muted-foreground">Vitals</span></div>
            </blockquote>
          </div>
          
          {/* Call to Action */}
          <div className="text-center mt-12">
            <h2 className="text-3xl font-bold">See What Our Patients Say</h2>
            <div className="mt-6 flex justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/testimonials">View Testimonials</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/testimonials/share">Share your story</Link>
              </Button>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Awards, Certifications, Affiliations Section */}
      <SectionWrapper className="bg-muted/20">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-3xl font-bold mb-4">Awards, Certifications & Affiliations</h3>
          <p className="text-muted-foreground mb-12 max-w-2xl mx-auto">
            Our physicians maintain the highest standards of medical excellence through ongoing education, 
            board certifications, and active participation in leading medical organizations.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col items-center p-6 bg-white/80 dark:bg-background/70 rounded-lg shadow-sm border border-muted/40 hover:shadow-md transition-shadow">
              <div className="w-16 h-16 mb-4 flex items-center justify-center">
                <img src="/images/acc-logo.png" alt="American College of Cardiology" className="h-12 w-auto object-contain" />
              </div>
              <span className="text-sm font-medium text-center leading-relaxed">Fellow, American College of Cardiology</span>
            </div>
            <div className="flex flex-col items-center p-6 bg-white/80 dark:bg-background/70 rounded-lg shadow-sm border border-muted/40 hover:shadow-md transition-shadow">
              <div className="w-16 h-16 mb-4 flex items-center justify-center">
                <img src="/images/abim-logo.png" alt="American Board of Internal Medicine" className="h-12 w-auto object-contain" />
              </div>
              <span className="text-sm font-medium text-center leading-relaxed">Board-Certified in Cardiovascular Disease</span>
            </div>
            <div className="flex flex-col items-center p-6 bg-white/80 dark:bg-background/70 rounded-lg shadow-sm border border-muted/40 hover:shadow-md transition-shadow">
              <div className="w-16 h-16 mb-4 flex items-center justify-center">
                <img src="/images/aha-logo.png" alt="American Heart Association" className="h-12 w-auto object-contain" />
              </div>
              <span className="text-sm font-medium text-center leading-relaxed">Member, American Heart Association</span>
            </div>
            <div className="flex flex-col items-center p-6 bg-white/80 dark:bg-background/70 rounded-lg shadow-sm border border-muted/40 hover:shadow-md transition-shadow">
              <div className="w-16 h-16 mb-4 flex items-center justify-center">
                <img src="/images/uh-logo.png" alt="University of Houston College of Medicine" className="h-12 w-auto object-contain" />
              </div>
              <span className="text-sm font-medium text-center leading-relaxed">Clinical Teaching Physician, University of Houston College of Medicine</span>
            </div>
          </div>
        </div>
      </SectionWrapper>
    </>
  )
} 