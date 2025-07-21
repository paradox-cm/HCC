"use client"

import { SectionWrapper } from "@/components/section-wrapper"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { DoctorProfileCard } from "@/components/doctor-profile-card"

export default function AboutUsPage() {
  return (
    <>
      <SectionWrapper className="bg-muted/20">
        <div className="text-center">
          <h1 className="text-2xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4 fade-in-up">About Us</h1>
          <p className="mt-4 max-w-3xl mx-auto text-muted-foreground md:text-xl">
            Our commitment to compassionate, state-of-the-art cardiac care.
          </p>
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
          {/* Removed "Our Growth" section */}
        </div>
      </SectionWrapper>

      <SectionWrapper className="bg-muted/20">
        <h2 className="text-3xl font-bold text-center">Meet Our Team</h2>
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <DoctorProfileCard name="Dr. Abdul" title="Cardiologist" />
          <DoctorProfileCard name="Dr. Asif" title="Cardiologist" />
          <DoctorProfileCard name="Dr. Sajid" title="Interventional Cardiologist" />
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <div className="text-center">
          <h2 className="text-3xl font-bold">See What Our Patients Say</h2>
          <div className="mt-6 flex justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/testimonials">View Testimonials</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/learn">Visit Learn Page</Link>
            </Button>
          </div>
        </div>
      </SectionWrapper>
    </>
  )
}
