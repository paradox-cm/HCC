"use client"

import type React from "react"
import { useState, useEffect } from "react"

import { SectionWrapper } from "@/components/section-wrapper"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, HelpCircle, Mail, Phone, Shield, Wallet } from "lucide-react"
import Link from "next/link"

const navItems = [
  { id: "how-it-works", label: "How Billing Works" },
  { id: "understanding-bill", label: "Understanding Your Bill" },
  { id: "payment-options", label: "Payment Options" },
  { id: "faq", label: "Billing FAQs" },
  { id: "glossary", label: "Glossary" },
  { id: "uninsured", label: "Financing & Uninsured" },
  { id: "contact", label: "Contact Billing" },
]

const faqItems = [
  {
    q: "Why did my bill change after insurance?",
    a: "Your insurance may apply part of the cost to your deductible, copay, or coinsurance, meaning you’re responsible for a portion of the bill. In some cases, the insurance company may also determine that part of the service is not covered or only partially covered. Additionally, contractual adjustments (also called provider write-offs) can make your total look different from what was initially quoted. If anything seems unclear, we’re happy to review your Explanation of Benefits (EOB) with you.",
  },
  {
    q: "What if my insurance denies a claim?",
    a: "If your claim is denied, we’ll reach out to help you understand the reason. Common causes include lack of referral, expired insurance, non-covered services, or administrative coding errors. We can help you file an appeal, submit corrected documentation, or explore self-pay options if needed. Timely communication helps avoid delays in care.",
  },
  {
    q: "Can I get a cost estimate in advance?",
    a: "Absolutely. We encourage all patients to request a Good Faith Estimate before undergoing non-emergency services. This includes common diagnostics (like echocardiograms or EKGs) and therapies (like EECP or vein ablations). Estimates are based on the services planned, your insurance coverage, and current fee schedules.",
  },
  {
    q: "What should I do if I can’t afford to pay my bill in full?",
    a: "We offer payment plans to eligible patients and self-pay discounts in certain cases. Contact our billing office as early as possible to avoid collections and to set up a manageable payment solution.",
  },
  {
    q: "Why did I receive multiple bills for one visit?",
    a: "Some services may generate separate bills—for example, one from the physician and another from the imaging center or lab. We can help you understand what’s from our office and what’s from an affiliated provider.",
  },
]

const glossaryItems = [
  {
    term: "Deductible",
    def: "The amount you must pay out-of-pocket each year before your insurance begins to cover services. For example, if your deductible is $1,000, you must pay that amount before insurance shares costs.",
  },
  {
    term: "Copay",
    def: "A fixed fee you pay at the time of your visit (e.g., $25 per office visit). This is set by your insurance plan and is not related to your deductible or coinsurance.",
  },
  {
    term: "Coinsurance",
    def: "The percentage of costs you’re responsible for after you’ve met your deductible. For example, with 20% coinsurance, you’d pay $20 of a $100 service after your deductible is met.",
  },
  {
    term: "Allowed Amount",
    def: "The maximum amount your insurance plan will pay for a covered service. If your provider charges more than this, you might be responsible for the difference only if the provider is out-of-network.",
  },
  {
    term: "EOB (Explanation of Benefits)",
    def: "A document from your insurer that details what was billed, what was paid, and what you may owe. It’s not a bill—but it’s important for understanding your charges.",
  },
  {
    term: "Write-Off",
    def: "The portion of a charge your provider agrees to forgo based on insurance contracts. This reduces your bill and reflects the provider’s in-network status.",
  },
  {
    term: "In-Network vs. Out-of-Network",
    def: "In-network providers have agreed-upon rates with your insurance. Out-of-network services may result in higher out-of-pocket costs.",
  },
  {
    term: "Prior Authorization",
    def: "A requirement by some insurers to approve certain tests or treatments before they are performed. Lack of prior authorization may result in denial of coverage.",
  },
]

export default function BillingPage() {
  const [activeSection, setActiveSection] = useState("")
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const yOffset = -120 // Offset for the fixed header
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: "smooth" })
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => item.id)
      const scrollPosition = window.scrollY + 150 // Offset for header

      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i])
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(sections[i])
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Set initial active section

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <SectionWrapper className="bg-muted/20">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">Billing & Insurance</h1>
          <p className="mt-4 max-w-3xl mx-auto text-muted-foreground md:text-xl">Your Care, Clearly Covered</p>
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Sticky Nav */}
          <aside className="lg:col-span-1 lg:sticky lg:top-28 h-fit">
            <h3 className="font-semibold text-lg mb-4">On This Page</h3>
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className={`text-left transition-colors relative pl-4 ${
                      activeSection === item.id
                        ? "text-primary font-medium border-l-2 border-primary -ml-0.5"
                        : "text-muted-foreground hover:text-primary"
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3 space-y-16">
            <section>
              <h2 className="text-3xl font-bold flex items-center gap-3">
                <Shield className="h-8 w-8 text-primary" />
                Insurance We Accept
              </h2>
              <p className="mt-4 text-muted-foreground">
                We participate with most major carriers, including Medicare, Medicaid, and leading private insurers. As
                an in-network provider, we help minimize your out-of-pocket costs.
              </p>
              <Card className="mt-4 bg-muted/50">
                <CardContent className="p-4">
                  <p className="text-sm">
                    <span className="font-semibold text-primary">Tip:</span> Review your plan’s deductible, copay, and
                    coinsurance information before your visit.
                  </p>
                </CardContent>
              </Card>
            </section>

            <section id="how-it-works">
              <h2 className="text-3xl font-bold">How Billing Works</h2>
              <div className="mt-6 space-y-6 border-l-2 border-primary/20 pl-6">
                <Step number={1} title="Insurance Verification">
                  When you schedule or arrive for an appointment, we verify your coverage. This helps determine what you
                  may owe.
                </Step>
                <Step number={2} title="Services Rendered & Coding">
                  Each visit, test, or procedure is documented and coded using standard CPT/ICD systems.
                </Step>
                <Step number={3} title="Claim Submission">
                  We submit claims electronically to your insurance carrier.
                </Step>
                <Step number={4} title="Insurance Payment & EOB">
                  You’ll receive an Explanation of Benefits (EOB) from your insurer outlining payments, adjustments, and
                  any amount you owe.
                </Step>
                <Step number={5} title="Patient Billing">
                  If your insurer does not fully cover our charges, we will bill you for the balance—this may include
                  deductibles, copays, or non-covered services.
                </Step>
              </div>
            </section>

            <section id="understanding-bill">
              <h2 className="text-3xl font-bold flex items-center gap-3">
                <FileText className="h-8 w-8 text-primary" />
                Understanding Your EOB & Bill
              </h2>
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoItem title="Allowed Amount" text="The maximum amount your insurer permits for each service." />
                <InfoItem title="Copay/Deductible" text="Out-of-pocket amounts typically due at the time of service." />
                <InfoItem
                  title="Coinsurance"
                  text="A percentage of the remaining balance you’re responsible for after your deductible is met."
                />
                <InfoItem
                  title="Provider Write-Offs"
                  text="Amounts your doctor’s office doesn’t charge you if they exceed your insurance’s approved rate."
                />
              </div>
              <Card className="mt-4 bg-muted/50">
                <CardContent className="p-4">
                  <p className="text-sm">
                    <span className="font-semibold text-primary">Tip:</span> You may see both the insurer’s payment and
                    the write-off separately on your EOB—this is normal and not a double payment.
                  </p>
                </CardContent>
              </Card>
            </section>

            <section id="payment-options">
              <h2 className="text-3xl font-bold flex items-center gap-3">
                <Wallet className="h-8 w-8 text-primary" />
                Payment Options
              </h2>
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Secure Online Payment</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Pay via the Patient Portal.</p>
                    <Button size="sm" className="mt-4" asChild>
                      <Link href="/patient-portal">Go to Portal</Link>
                    </Button>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">In-Person or by Phone</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Settle your balance during appointments.</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Payment Plans</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Available on a case-by-case basis. Email for details.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section id="faq">
              <h2 className="text-3xl font-bold flex items-center gap-3">
                <HelpCircle className="h-8 w-8 text-primary" />
                Billing FAQs
              </h2>
              <Accordion type="single" collapsible className="w-full mt-6">
                {faqItems.map((item, i) => (
                  <AccordionItem key={i} value={`item-${i}`}>
                    <AccordionTrigger>{item.q}</AccordionTrigger>
                    <AccordionContent>{item.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>

            <section id="glossary">
              <h2 className="text-3xl font-bold">Glossary of Common Billing Terms</h2>
              <Accordion type="single" collapsible className="w-full mt-6">
                {glossaryItems.map((item, i) => (
                  <AccordionItem key={i} value={`item-${i}`}>
                    <AccordionTrigger>{item.term}</AccordionTrigger>
                    <AccordionContent>{item.def}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>

            <section id="uninsured">
              <h2 className="text-3xl font-bold">Financing & Uninsured Patients</h2>
              <p className="mt-4 text-muted-foreground">
                We offer self-pay pricing and flexible payment plans. Contact us to discuss financial assistance
                options.
              </p>
            </section>

            <section id="contact">
              <h2 className="text-3xl font-bold">Contact Billing</h2>
              <Card className="mt-6">
                <CardContent className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex items-center gap-3">
                    <Mail className="h-6 w-6 text-primary" />
                    <div>
                      <p className="font-semibold">Email</p>
                      <a href="mailto:billing@hccheart.com" className="text-sm text-muted-foreground">
                        billing@hccheart.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-6 w-6 text-primary" />
                    <div>
                      <p className="font-semibold">Call</p>
                      <p className="text-sm text-muted-foreground">713-464-4140 (option 2)</p>
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold">Hours</p>
                    <p className="text-sm text-muted-foreground">Mon–Fri, 8 AM–5 PM CST</p>
                  </div>
                </CardContent>
              </Card>
            </section>

            <section>
              <h2 className="text-3xl font-bold">Insurance & Legal</h2>
              <p className="mt-4 text-muted-foreground">
                All billing practices comply with HIPAA and state/federal regulations. For questions about your rights
                and protections, see our{" "}
                <Link href="/privacy-policy" className="text-primary underline">
                  Privacy Policy
                </Link>{" "}
                or{" "}
                <Link href="/patient-rights" className="text-primary underline">
                  Patient Rights
                </Link>{" "}
                page.
              </p>
            </section>
          </main>
        </div>
      </SectionWrapper>
    </>
  )
}

function Step({ number, title, children }: { number: number; title: string; children: React.ReactNode }) {
  return (
    <div className="relative">
      <div className="absolute -left-[34px] top-1 h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
        {number}
      </div>
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="mt-1 text-muted-foreground">{children}</p>
    </div>
  )
}

function InfoItem({ title, text }: { title: string; text: string }) {
  return (
    <div className="p-4 bg-muted/30 rounded-lg">
      <h4 className="font-semibold">{title}</h4>
      <p className="text-sm text-muted-foreground mt-1">{text}</p>
    </div>
  )
}
