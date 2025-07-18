"use client"

import { useState, useEffect } from "react"
import { SectionWrapper } from "@/components/section-wrapper"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  Shield,
  Phone,
  Mail,
  MessageSquare,
  FileText,
  ChevronRight,
  PrinterIcon as Print,
  Download,
} from "lucide-react"
import Link from "next/link"

const patientRights = [
  {
    id: "respect-dignity",
    title: "Respect and Dignity",
    description:
      "You have the right to be treated with courtesy, respect, and without discrimination based on race, religion, gender, sexual orientation, age, disability, or source of payment.",
  },
  {
    id: "quality-care",
    title: "Quality Care",
    description:
      "You are entitled to receive considerate, respectful, and medically appropriate care in a safe, clean environment.",
  },
  {
    id: "privacy-confidentiality",
    title: "Privacy and Confidentiality",
    description:
      "Your medical records and communications with our team are confidential, in accordance with HIPAA and applicable laws. You may request restrictions on how your information is shared.",
  },
  {
    id: "informed-decision",
    title: "Informed Decision-Making",
    description:
      "You have the right to receive clear explanations of your diagnosis, treatment options, risks, benefits, and alternatives in a way you understand—before giving consent.",
  },
  {
    id: "participation-care",
    title: "Participation in Your Care",
    description:
      "You may participate in developing your treatment plan and make informed decisions about your care, including accepting or refusing care to the extent permitted by law.",
  },
  {
    id: "medical-records",
    title: "Access to Medical Records",
    description: "You may review or request copies of your medical records and request corrections if needed.",
  },
  {
    id: "second-opinions",
    title: "Second Opinions and Referrals",
    description:
      "You have the right to seek a second medical opinion or request referrals to specialists, including those outside our practice.",
  },
  {
    id: "financial-transparency",
    title: "Financial Transparency",
    description:
      "You have the right to receive clear, understandable information about your healthcare costs, insurance coverage, and payment responsibilities.",
  },
  {
    id: "complaint-resolution",
    title: "Complaint Resolution",
    description:
      "If you have a concern or complaint about your care, you have the right to speak with our staff or file a formal complaint without fear of retaliation.",
  },
  {
    id: "emergency-care",
    title: "Emergency Care",
    description: "In an emergency, you have the right to receive stabilizing treatment without unnecessary delay.",
  },
]

const navItems = [
  { id: "patient-rights", label: "Your Rights as a Patient" },
  { id: "raise-concerns", label: "How to Raise Concerns" },
  { id: "contact-info", label: "Contact Information" },
]

export default function PatientRightsPage() {
  const [activeSection, setActiveSection] = useState("")

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const yOffset = -120
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: "smooth" })
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => item.id)
      const scrollPosition = window.scrollY + 150

      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i])
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(sections[i])
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handlePrint = () => {
    window.print()
  }

  const handleDownload = () => {
    // Create a text version for download
    const content = `PATIENT RIGHTS - Houston Cardiology Consultants

At Houston Cardiology Consultants, we are committed to providing care with compassion, dignity, and respect. As our patient, you have the following rights:

YOUR RIGHTS AS A PATIENT:

${patientRights
  .map(
    (right, index) => `${index + 1}. ${right.title}
   ${right.description}`,
  )
  .join("\n\n")}

HOW TO RAISE CONCERNS:

If you believe your rights have been violated or if you are unhappy with any aspect of your care, please let us know. You can:

• Speak directly with your care provider
• Contact our patient care team at info@hccheart.com
• Submit feedback through the Patient Portal
• Call us at 713-464-4140

We are here to listen and committed to resolving issues promptly and respectfully.

---
Houston Cardiology Consultants
Generated: ${new Date().toLocaleDateString()}
`

    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "HCC-Patient-Rights.txt"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <>
      <SectionWrapper className="bg-muted/20">
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Shield className="h-10 w-10 text-primary" />
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">Patient Rights</h1>
          </div>
          <p className="mt-4 max-w-3xl mx-auto text-muted-foreground md:text-xl">
            At Houston Cardiology Consultants, we are committed to providing care with compassion, dignity, and respect.
          </p>
          <div className="flex justify-center gap-2 mt-6">
            <Button variant="outline" size="sm" onClick={handlePrint}>
              <Print className="mr-2 h-4 w-4" />
              Print
            </Button>
            <Button variant="outline" size="sm" onClick={handleDownload}>
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Sticky Navigation */}
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
          <main className="lg:col-span-3 space-y-12">
            <section id="patient-rights">
              <h2 className="text-3xl font-bold mb-6">Your Rights as a Patient</h2>
              <div className="space-y-6">
                {patientRights.map((right, index) => (
                  <Card key={right.id} className="transition-all hover:shadow-md">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center font-bold text-sm">
                          {index + 1}
                        </div>
                        <div className="flex-grow">
                          <h3 className="text-xl font-semibold mb-3">{right.title}</h3>
                          <p className="text-muted-foreground leading-relaxed">{right.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            <Separator />

            <section id="raise-concerns">
              <h2 className="text-3xl font-bold mb-6">How to Raise Concerns</h2>
              <Card className="bg-muted/30">
                <CardContent className="p-6">
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    If you believe your rights have been violated or if you are unhappy with any aspect of your care,
                    please let us know. We are here to listen and committed to resolving issues promptly and
                    respectfully.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-4 bg-background rounded-lg">
                      <MessageSquare className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="text-sm">Speak directly with your care provider</span>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-background rounded-lg">
                      <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="text-sm">Email our patient care team</span>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-background rounded-lg">
                      <FileText className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="text-sm">Submit feedback through Patient Portal</span>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-background rounded-lg">
                      <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="text-sm">Call our office directly</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            <section id="contact-info">
              <h2 className="text-3xl font-bold mb-6">Contact Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-4">Patient Care Team</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Mail className="h-5 w-5 text-primary" />
                        <a href="mailto:info@hccheart.com" className="text-primary hover:underline">
                          info@hccheart.com
                        </a>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="h-5 w-5 text-primary" />
                        <a href="tel:713-464-4140" className="text-primary hover:underline">
                          713-464-4140
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-4">Patient Portal</h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      Submit secure messages and feedback through your online account.
                    </p>
                    <Button asChild>
                      <Link href="/patient-portal">
                        Access Portal
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Related Links */}
            <section>
              <h2 className="text-3xl font-bold mb-6">Related Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="transition-all hover:shadow-md">
                  <CardContent className="p-4">
                    <h4 className="font-semibold mb-2">HIPAA Notice</h4>
                    <p className="text-sm text-muted-foreground mb-3">Learn about our privacy practices</p>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/hipaa">View Notice</Link>
                    </Button>
                  </CardContent>
                </Card>
                <Card className="transition-all hover:shadow-md">
                  <CardContent className="p-4">
                    <h4 className="font-semibold mb-2">Privacy Policy</h4>
                    <p className="text-sm text-muted-foreground mb-3">Our commitment to your privacy</p>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/privacy-policy">Read Policy</Link>
                    </Button>
                  </CardContent>
                </Card>
                <Card className="transition-all hover:shadow-md">
                  <CardContent className="p-4">
                    <h4 className="font-semibold mb-2">Terms of Use</h4>
                    <p className="text-sm text-muted-foreground mb-3">Website and portal terms</p>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/terms-of-use">View Terms</Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </section>
          </main>
        </div>
      </SectionWrapper>
    </>
  )
}
