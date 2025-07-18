"use client"

import { useState, useEffect } from "react"
import { SectionWrapper } from "@/components/section-wrapper"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Phone, Mail } from "lucide-react"
import Link from "next/link"

const navItems = [
  { id: "information-collect", label: "Information We Collect" },
  { id: "how-we-use", label: "How We Use Your Information" },
  { id: "protection", label: "How We Protect Your Information" },
  { id: "sharing", label: "Sharing of Information" },
  { id: "your-rights", label: "Your Choices and Rights" },
  { id: "cookies", label: "Cookies and Tracking" },
  { id: "children", label: "Children's Privacy" },
  { id: "policy-changes", label: "Changes to This Policy" },
  { id: "contact", label: "Contact Us" },
]

export default function PrivacyPolicyPage() {
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

  return (
    <>
      <SectionWrapper className="bg-muted/20">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">Privacy Policy</h1>
          <div className="flex justify-center mt-4 mb-4">
            <Badge variant="secondary" className="text-sm">
              Effective Date: August, 2025
            </Badge>
          </div>
          <p className="mt-4 max-w-3xl mx-auto text-muted-foreground md:text-xl">
            Houston Cardiology Consultants is committed to protecting your privacy. This policy explains how we collect,
            use, store, and protect your personal information.
          </p>
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
            <section id="information-collect">
              <h2 className="text-3xl font-bold mb-6">1. Information We Collect</h2>
              <div className="prose prose-gray max-w-none">
                <p>We may collect the following types of information:</p>
                <ul>
                  <li>
                    <strong>Personal Information:</strong> Name, email address, phone number, date of birth, and any
                    information submitted via forms (e.g., appointment requests, patient portal).
                  </li>
                  <li>
                    <strong>Health Information:</strong> Any medical details shared via secure forms or through the
                    patient portal (protected under HIPAA).
                  </li>
                  <li>
                    <strong>Technical Data:</strong> IP address, browser type, device information, and usage data
                    collected via cookies and analytics tools.
                  </li>
                  <li>
                    <strong>Communications:</strong> Records of emails, chat messages, and phone interactions with our
                    staff.
                  </li>
                </ul>
              </div>
            </section>

            <section id="how-we-use">
              <h2 className="text-3xl font-bold mb-6">2. How We Use Your Information</h2>
              <div className="prose prose-gray max-w-none">
                <p>Your information may be used to:</p>
                <ul>
                  <li>Schedule and manage appointments</li>
                  <li>Provide medical care and support</li>
                  <li>Respond to inquiries and requests</li>
                  <li>Process billing and insurance claims</li>
                  <li>Improve our website and user experience</li>
                  <li>Comply with legal and regulatory obligations</li>
                </ul>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
                  <p className="text-green-800 font-semibold mb-0">
                    We do <strong>not</strong> sell or rent your personal or health information to third parties.
                  </p>
                </div>
              </div>
            </section>

            <section id="protection">
              <h2 className="text-3xl font-bold mb-6">3. How We Protect Your Information</h2>
              <div className="prose prose-gray max-w-none">
                <ul>
                  <li>Data is stored securely using encryption and industry-standard safeguards.</li>
                  <li>Access to sensitive data is restricted to authorized personnel only.</li>
                  <li>Our website uses HTTPS to secure online communications.</li>
                  <li>Regular security reviews and compliance audits are conducted.</li>
                </ul>
              </div>
            </section>

            <section id="sharing">
              <h2 className="text-3xl font-bold mb-6">4. Sharing of Information</h2>
              <div className="prose prose-gray max-w-none">
                <p>We may share your information in the following circumstances:</p>
                <ul>
                  <li>With your consent or at your direction</li>
                  <li>With healthcare providers involved in your care</li>
                  <li>With third-party service providers under HIPAA-compliant agreements</li>
                  <li>To comply with legal obligations, court orders, or law enforcement requests</li>
                </ul>
              </div>
            </section>

            <section id="your-rights">
              <h2 className="text-3xl font-bold mb-6">5. Your Choices and Rights</h2>
              <div className="prose prose-gray max-w-none">
                <ul>
                  <li>You may request access to or correction of your data at any time.</li>
                  <li>You may opt out of non-essential communications (e.g., marketing emails).</li>
                  <li>You may request deletion of your personal information, subject to legal requirements.</li>
                </ul>
              </div>
            </section>

            <section id="cookies">
              <h2 className="text-3xl font-bold mb-6">6. Cookies and Tracking Technologies</h2>
              <div className="prose prose-gray max-w-none">
                <p>We use cookies and analytics tools to:</p>
                <ul>
                  <li>Understand website traffic and usage patterns</li>
                  <li>Improve functionality and user experience</li>
                </ul>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-4">
                  <p className="text-amber-800 mb-0">
                    <strong>Note:</strong> You can adjust your browser settings to block cookies, though some features
                    may not function properly.
                  </p>
                </div>
              </div>
            </section>

            <section id="children">
              <h2 className="text-3xl font-bold mb-6">7. Children's Privacy</h2>
              <div className="prose prose-gray max-w-none">
                <p>
                  Our services are not directed to children under 13. We do not knowingly collect information from
                  minors without parental consent.
                </p>
              </div>
            </section>

            <section id="policy-changes">
              <h2 className="text-3xl font-bold mb-6">8. Changes to This Policy</h2>
              <div className="prose prose-gray max-w-none">
                <p>
                  We may update this Privacy Policy from time to time. The most current version will always be posted
                  here with the updated effective date.
                </p>
              </div>
            </section>

            <section id="contact">
              <h2 className="text-3xl font-bold mb-6">9. Contact Us</h2>
              <div className="prose prose-gray max-w-none">
                <p>For privacy-related questions or requests, please contact:</p>
                <div className="bg-muted/30 rounded-lg p-6 not-prose">
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
                </div>
              </div>
            </section>

            {/* Related Links */}
            <section>
              <h2 className="text-3xl font-bold mb-6">Related Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <h4 className="font-semibold mb-2">Patient Rights</h4>
                  <p className="text-sm text-muted-foreground mb-3">Your rights as our patient</p>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/patient-rights">View Rights</Link>
                  </Button>
                </div>
                <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <h4 className="font-semibold mb-2">HIPAA Notice</h4>
                  <p className="text-sm text-muted-foreground mb-3">Learn about our privacy practices</p>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/hipaa">View Notice</Link>
                  </Button>
                </div>
                <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <h4 className="font-semibold mb-2">Terms of Use</h4>
                  <p className="text-sm text-muted-foreground mb-3">Website and portal terms</p>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/terms-of-use">View Terms</Link>
                  </Button>
                </div>
              </div>
            </section>
          </main>
        </div>
      </SectionWrapper>
    </>
  )
}
