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

      <SectionWrapper className="bg-muted/20">
        <h2 className="text-3xl font-bold text-center">Meet Our Team</h2>
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <DoctorProfileCard name="Dr. Abdul" title="Cardiologist" photo="/dr-abdul-ali.png" />
          <DoctorProfileCard name="Dr. Asif" title="Cardiologist" photo="/dr-asif-ali.png" />
          <DoctorProfileCard name="Dr. Sajid" title="Interventional Cardiologist" photo="/dr-sajid-ali.png" />
        </div>
        {/* Testimonials Section */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-center mb-6">What Our Patients Say</h3>
          <div className="grid gap-6 md:grid-cols-2">
            <blockquote className="border-l-4 border-primary pl-6 italic text-muted-foreground bg-white/80 dark:bg-background/70 py-6 px-4 rounded shadow-sm border border-muted/40">
              "The care I received at HCC was exceptional. The doctors are incredibly knowledgeable and truly compassionate. I felt heard and understood throughout my entire treatment."
              <div className="mt-2 text-xs text-right text-muted-foreground">— Jane D.<br /><span className="text-[11px] text-muted-foreground">Houston, TX</span></div>
            </blockquote>
            <blockquote className="border-l-4 border-primary pl-6 italic text-muted-foreground bg-white/80 dark:bg-background/70 py-6 px-4 rounded shadow-sm border border-muted/40">
              "From scheduling to follow-up, everything was seamless. The staff is friendly, and Dr. Ali explained my condition in a way I could easily understand. Highly recommend!"
              <div className="mt-2 text-xs text-right text-muted-foreground">— Robert S.<br /><span className="text-[11px] text-muted-foreground">Spring Branch, TX</span></div>
            </blockquote>
            <blockquote className="border-l-4 border-primary pl-6 italic text-muted-foreground bg-white/80 dark:bg-background/70 py-6 px-4 rounded shadow-sm border border-muted/40">
              "I appreciate the personalized approach. They didn't just treat my symptoms; they helped me understand how to improve my overall heart health for the long term."
              <div className="mt-2 text-xs text-right text-muted-foreground">— Maria P.<br /><span className="text-[11px] text-muted-foreground">Heights, TX</span></div>
            </blockquote>
            <blockquote className="border-l-4 border-primary pl-6 italic text-muted-foreground bg-white/80 dark:bg-background/70 py-6 px-4 rounded shadow-sm border border-muted/40">
              "The telemedicine option was a lifesaver for my busy schedule. Quality care without having to leave my home. Thank you, HCC!"
              <div className="mt-2 text-xs text-right text-muted-foreground">— David L.<br /><span className="text-[11px] text-muted-foreground">Katy, TX</span></div>
            </blockquote>
            <blockquote className="border-l-4 border-primary pl-6 italic text-muted-foreground bg-white/80 dark:bg-background/70 py-6 px-4 rounded shadow-sm border border-muted/40">
              "Professional and caring. They took the time to answer all my questions and made me feel comfortable. A truly patient-first practice."
              <div className="mt-2 text-xs text-right text-muted-foreground">— Sarah K.<br /><span className="text-[11px] text-muted-foreground">Memorial, TX</span></div>
            </blockquote>
          </div>
        </div>
      </SectionWrapper>

      {/* Awards, Certifications, Affiliations Section */}
      <SectionWrapper>
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-6">Awards, Certifications & Affiliations</h3>
          <div className="flex flex-wrap justify-center gap-6">
            <div className="flex flex-col items-center">
              <img src="/images/hcc-logo.png" alt="ACC" className="h-12 w-12 mb-2" />
              <span className="text-sm font-medium">Fellow, American College of Cardiology</span>
            </div>
            <div className="flex flex-col items-center">
              <img src="/images/hcc-logo.png" alt="Board Certified" className="h-12 w-12 mb-2" />
              <span className="text-sm font-medium">Board-Certified in Cardiovascular Disease</span>
            </div>
            <div className="flex flex-col items-center">
              <img src="/images/hcc-logo.png" alt="AHA" className="h-12 w-12 mb-2" />
              <span className="text-sm font-medium">Member, American Heart Association</span>
            </div>
            <div className="flex flex-col items-center">
              <img src="/images/hcc-logo.png" alt="UH College of Medicine" className="h-12 w-12 mb-2" />
              <span className="text-sm font-medium">Clinical Teaching Physician, University of Houston College of Medicine</span>
            </div>
          </div>
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
