"use client"

import { useState, useEffect } from "react"
import { SectionWrapper } from "@/components/section-wrapper"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Shield, Phone, Mail, FileText, PrinterIcon as Print, Download, Lock, Eye, AlertTriangle } from "lucide-react"
import Link from "next/link"

const healthInfoUses = [
  {
    id: "treatment",
    title: "Treatment",
    description:
      "Sharing necessary information with other healthcare providers involved in your care (e.g., specialists, labs, imaging centers).",
    icon: <FileText className="h-5 w-5 text-primary" />,
  },
  {
    id: "payment",
    title: "Payment",
    description:
      "Submitting claims to your insurance company, verifying benefits, and billing you or a third-party payer.",
    icon: <FileText className="h-5 w-5 text-primary" />,
  },
  {
    id: "operations",
    title: "Healthcare Operations",
    description: "For internal management such as quality assessment, training, and improving services.",
    icon: <FileText className="h-5 w-5 text-primary" />,
  },
]

const permittedDisclosures = [
  {
    id: "required-by-law",
    title: "When Required by Law",
    description: "Including public health reporting, abuse reporting, or law enforcement.",
  },
  {
    id: "prevent-threats",
    title: "To Prevent Serious Threats",
    description: "We may disclose your PHI to prevent serious harm to you or others.",
  },
  {
    id: "business-associates",
    title: "Business Associates",
    description:
      "With contracted partners who perform services for us (e.g., billing or IT providers), under strict confidentiality agreements.",
  },
  {
    id: "deidentified-data",
    title: "De-identified Data Use",
    description:
      "In some cases, information stripped of identifying data may be used for research or operational improvements.",
  },
]

const hipaaRights = [
  {
    id: "inspect-copies",
    title: "Inspect and Receive Copies of Your Health Record",
    description: "Usually within 30 days of your request.",
    icon: <Eye className="h-5 w-5 text-primary" />,
  },
  {
    id: "request-corrections",
    title: "Request Corrections",
    description: "If you believe your records are incorrect or incomplete.",
    icon: <FileText className="h-5 w-5 text-primary" />,
  },
  {
    id: "accounting-disclosures",
    title: "Receive an Accounting of Disclosures",
    description: "Detailing non-routine uses of your PHI.",
    icon: <FileText className="h-5 w-5 text-primary" />,
  },
  {
    id: "confidential-communications",
    title: "Request Confidential Communications",
    description: "Specify a preferred contact method (e.g., phone, email).",
    icon: <Lock className="h-5 w-5 text-primary" />,
  },
  {
    id: "request-restrictions",
    title: "Request Restrictions",
    description: "On the use or disclosure of certain information.",
    icon: <Shield className="h-5 w-5 text-primary" />,
  },
  {
    id: "file-complaint",
    title: "File a Complaint",
    description:
      "Without fear of retaliation, to us or directly to the U.S. Department of Health & Human Services (HHS).",
    icon: <AlertTriangle className="h-5 w-5 text-primary" />,
  },
]

const responsibilities = [
  {
    title: "Maintain Privacy and Security",
    description: "We maintain the privacy and security of your PHI.",
  },
  {
    title: "Provide Notice and Follow Terms",
    description: "We provide you with this notice and follow the terms described within.",
  },
  {
    title: "Breach Notification",
    description: "We notify you if a breach occurs that may compromise the privacy or security of your information.",
  },
]

const navItems = [
  { id: "health-info-uses", label: "How We Use Your Information" },
  { id: "permitted-disclosures", label: "Other Permitted Disclosures" },
  { id: "your-rights", label: "Your HIPAA Rights" },
  { id: "our-responsibilities", label: "Our Responsibilities" },
  { id: "contact-privacy", label: "Contact Privacy Officer" },
]

export default function HipaaPage() {
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
    const content = `HIPAA PRIVACY PRACTICES - Houston Cardiology Consultants

Houston Cardiology Consultants is fully committed to protecting your health information in accordance with the Health Insurance Portability and Accountability Act (HIPAA). This notice outlines how your medical information may be used and disclosed, and how you can access this information.

HOW WE MAY USE YOUR HEALTH INFORMATION:

${healthInfoUses
  .map(
    (use, index) => `${index + 1}. ${use.title}
   ${use.description}`,
  )
  .join("\n\n")}

OTHER PERMITTED DISCLOSURES:

${permittedDisclosures
  .map(
    (disclosure, index) => `${index + 1}. ${disclosure.title}
   ${disclosure.description}`,
  )
  .join("\n\n")}

YOUR HIPAA RIGHTS:

${hipaaRights
  .map(
    (right, index) => `${index + 1}. ${right.title}
   ${right.description}`,
  )
  .join("\n\n")}

OUR RESPONSIBILITIES:

${responsibilities
  .map(
    (responsibility, index) => `${index + 1}. ${responsibility.title}
   ${responsibility.description}`,
  )
  .join("\n\n")}

CONTACT US ABOUT YOUR PRIVACY:

Privacy Officer
Houston Cardiology Consultants
Email: info@hccheart.com
Phone: 713-464-4140

---
Houston Cardiology Consultants
Generated: ${new Date().toLocaleDateString()}
`

    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "HCC-HIPAA-Notice.txt"
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
            <Lock className="h-10 w-10 text-primary" />
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">HIPAA Privacy Practices</h1>
          </div>
          <p className="mt-4 max-w-3xl mx-auto text-muted-foreground md:text-xl">
            Houston Cardiology Consultants is fully committed to protecting your health information in accordance with
            the Health Insurance Portability and Accountability Act (HIPAA).
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
            <section id="health-info-uses">
              <h2 className="text-3xl font-bold mb-6">How We May Use Your Health Information</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                We may use or disclose your protected health information (PHI) for the following purposes:
              </p>
              <div className="space-y-4">
                {healthInfoUses.map((use) => (
                  <Card key={use.id} className="transition-all hover:shadow-md">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">{use.icon}</div>
                        <div className="flex-grow">
                          <h3 className="text-xl font-semibold mb-3">{use.title}</h3>
                          <p className="text-muted-foreground leading-relaxed">{use.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            <Separator />

            <section id="permitted-disclosures">
              <h2 className="text-3xl font-bold mb-6">Other Permitted Disclosures</h2>
              <div className="space-y-6">
                {permittedDisclosures.map((disclosure, index) => (
                  <Card key={disclosure.id} className="transition-all hover:shadow-md">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center font-bold text-sm">
                          {index + 1}
                        </div>
                        <div className="flex-grow">
                          <h3 className="text-xl font-semibold mb-3">{disclosure.title}</h3>
                          <p className="text-muted-foreground leading-relaxed">{disclosure.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            <Separator />

            <section id="your-rights">
              <h2 className="text-3xl font-bold mb-6">Your HIPAA Rights</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">You have the right to:</p>
              <div className="space-y-4">
                {hipaaRights.map((right) => (
                  <Card key={right.id} className="transition-all hover:shadow-md">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">{right.icon}</div>
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

            <section id="our-responsibilities">
              <h2 className="text-3xl font-bold mb-6">Our Responsibilities</h2>
              <Card className="bg-muted/30">
                <CardContent className="p-6">
                  <p className="text-muted-foreground mb-6 leading-relaxed">We are required by law to:</p>
                  <div className="space-y-4">
                    {responsibilities.map((responsibility, index) => (
                      <div key={index} className="flex items-start gap-3 p-4 bg-background rounded-lg">
                        <div className="flex-shrink-0 w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center font-bold text-xs">
                          {index + 1}
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">{responsibility.title}</h4>
                          <p className="text-sm text-muted-foreground">{responsibility.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </section>

            <section id="contact-privacy">
              <h2 className="text-3xl font-bold mb-6">Contact Us About Your Privacy</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                If you have questions or concerns about our HIPAA practices or your rights, please contact:
              </p>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-4">Privacy Officer</h3>
                  <div className="space-y-3">
                    <p className="font-medium">Houston Cardiology Consultants</p>
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
            </section>

            {/* Related Links */}
            <section>
              <h2 className="text-3xl font-bold mb-6">Related Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="transition-all hover:shadow-md">
                  <CardContent className="p-4">
                    <h4 className="font-semibold mb-2">Patient Rights</h4>
                    <p className="text-sm text-muted-foreground mb-3">Your rights as our patient</p>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/patient-rights">View Rights</Link>
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
