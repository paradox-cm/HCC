"use client"

import { useState, useEffect } from "react"
import { SectionWrapper } from "@/components/section-wrapper"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Phone, Mail, AlertTriangle } from "lucide-react"
import Link from "next/link"

const navItems = [
  { id: "website-use", label: "Use of the Website" },
  { id: "medical-disclaimer", label: "Medical Disclaimer" },
  { id: "patient-portal", label: "Patient Portal & Secure Forms" },
  { id: "intellectual-property", label: "Intellectual Property" },
  { id: "third-party-links", label: "Links to Third-Party Sites" },
  { id: "liability-limitations", label: "Limitations of Liability" },
  { id: "modifications", label: "Modifications to Terms" },
  { id: "governing-law", label: "Governing Law" },
  { id: "contact", label: "Contact Us" },
]

export default function TermsOfUsePageClient() {
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
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">Terms of Use</h1>
          <div className="flex justify-center mt-4 mb-4">
            <Badge variant="secondary" className="text-sm">
              Effective Date: August, 2025
            </Badge>
          </div>
          <p className="mt-4 max-w-3xl mx-auto text-muted-foreground md:text-xl">
            By accessing or using this website, you agree to comply with and be bound by the following terms and
            conditions.
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
            {/* Introduction */}
            <section>
              <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
                <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Welcome to HCC</h3>
                <p className="text-blue-800 dark:text-blue-200 text-sm leading-relaxed">
                  Welcome to the website of Houston Cardiology Consultants. By accessing or using this website (
                  <a href="https://www.hccheart.com" className="underline">
                    www.hccheart.com
                  </a>
                  ), you agree to comply with and be bound by these terms and conditions.
                </p>
              </div>
            </section>

            <section id="website-use">
              <h2 className="text-3xl font-bold mb-6">1. Use of the Website</h2>
              <div className="prose prose-gray dark:prose-invert max-w-none">
                <p>
                  This site is intended to provide general information about our medical services, staff, and patient
                  resources. It is not a substitute for professional medical advice, diagnosis, or treatment.
                </p>
                <p>
                  <strong>You agree to:</strong>
                </p>
                <ul>
                  <li>Use this site for lawful, personal, non-commercial purposes</li>
                  <li>Not attempt to disrupt the functionality or security of the site</li>
                  <li>Not use any automated tools to access, monitor, or copy the site</li>
                </ul>
              </div>
            </section>

            <section id="medical-disclaimer">
              <h2 className="text-3xl font-bold mb-6">2. Medical Disclaimer</h2>
              <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg p-6 mb-6">
                <div className="flex items-start gap-4">
                  <AlertTriangle className="h-6 w-6 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-amber-900 dark:text-amber-100 mb-2">Important Medical Notice</h3>
                    <p className="text-amber-800 dark:text-amber-200 text-sm leading-relaxed mb-0">
                      Information provided on this site does not constitute medical advice and should not be used to
                      diagnose or treat any health condition. Always consult your physician or a qualified healthcare
                      provider for medical concerns.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section id="patient-portal">
              <h2 className="text-3xl font-bold mb-6">3. Patient Portal and Secure Forms</h2>
              <div className="prose prose-gray dark:prose-invert max-w-none">
                <p>
                  Some features, including appointment requests and the patient portal, require you to submit personal
                  health information (PHI). By using these features, you consent to the secure transmission and storage
                  of your data in compliance with HIPAA regulations.
                </p>
              </div>
            </section>

            <section id="intellectual-property">
              <h2 className="text-3xl font-bold mb-6">4. Intellectual Property</h2>
              <div className="prose prose-gray dark:prose-invert max-w-none">
                <p>
                  All content on this website—including text, graphics, logos, images, and software—is the property of
                  Houston Cardiology Consultants or its content suppliers and is protected by copyright and trademark
                  laws. You may not reuse or distribute content without written permission.
                </p>
              </div>
            </section>

            <section id="third-party-links">
              <h2 className="text-3xl font-bold mb-6">5. Links to Third-Party Sites</h2>
              <div className="prose prose-gray dark:prose-invert max-w-none">
                <p>
                  Our website may contain links to third-party websites for informational purposes. We are not
                  responsible for the content, privacy practices, or accuracy of any external sites.
                </p>
              </div>
            </section>

            <section id="liability-limitations">
              <h2 className="text-3xl font-bold mb-6">6. Limitations of Liability</h2>
              <div className="prose prose-gray dark:prose-invert max-w-none">
                <p>Houston Cardiology Consultants is not liable for any damages resulting from:</p>
                <ul>
                  <li>Use or inability to use the website</li>
                  <li>Errors, omissions, or delays in website content</li>
                  <li>Unauthorized access to or alteration of your transmissions or data</li>
                </ul>
              </div>
            </section>

            <section id="modifications">
              <h2 className="text-3xl font-bold mb-6">7. Modifications to Terms</h2>
              <div className="prose prose-gray dark:prose-invert max-w-none">
                <p>
                  We reserve the right to modify these Terms of Use at any time. Changes will be posted on this page
                  with the updated effective date. Continued use of the site constitutes acceptance of the updated
                  terms.
                </p>
              </div>
            </section>

            <section id="governing-law">
              <h2 className="text-3xl font-bold mb-6">8. Governing Law</h2>
              <div className="prose prose-gray dark:prose-invert max-w-none">
                <p>
                  These Terms shall be governed by the laws of the State of Texas without regard to conflict of law
                  provisions.
                </p>
              </div>
            </section>

            <section id="contact">
              <h2 className="text-3xl font-bold mb-6">9. Contact Us</h2>
              <div className="prose prose-gray dark:prose-invert max-w-none">
                <p>If you have any questions about these terms, please contact us at:</p>
                <div className="bg-muted/30 rounded-lg p-6 not-prose">
                  <h3 className="font-semibold text-lg mb-4">Houston Cardiology Consultants</h3>
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
                </div>
              </div>
            </section>

            {/* Related Links */}
            <section>
              <h2 className="text-3xl font-bold mb-6">Related Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <h4 className="font-semibold mb-2">Privacy Policy</h4>
                  <p className="text-sm text-muted-foreground mb-3">How we protect your information</p>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/privacy-policy">Read Policy</Link>
                  </Button>
                </div>
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
              </div>
            </section>
          </main>
        </div>
      </SectionWrapper>
    </>
  )
} 