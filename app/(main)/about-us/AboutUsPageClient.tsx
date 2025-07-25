"use client"

import { SectionWrapper } from "@/components/section-wrapper"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { DoctorProfileCard } from "@/components/doctor-profile-card"

export default function AboutUsPageClient() {
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