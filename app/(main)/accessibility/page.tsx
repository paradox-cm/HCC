"use client"

import { useState, useEffect } from "react"
import { SectionWrapper } from "@/components/section-wrapper"
import { Button } from "@/components/ui/button"
import { Phone, Mail, Eye, Keyboard, Volume2, MousePointer } from "lucide-react"
import Link from "next/link"

const navItems = [
  { id: "our-commitment", label: "Our Commitment" },
  { id: "assistance", label: "Assistance and Alternative Access" },
  { id: "ongoing-improvements", label: "Ongoing Improvements" },
  { id: "feedback", label: "Feedback" },
]

const accessibilityFeatures = [
  {
    icon: <Eye className="h-6 w-6 text-primary" />,
    title: "Visual Accessibility",
    description: "Alt-text for images, appropriate color contrast, and screen reader support",
  },
  {
    icon: <Keyboard className="h-6 w-6 text-primary" />,
    title: "Keyboard Navigation",
    description: "Full keyboard-only navigation support for all interactive elements",
  },
  {
    icon: <Volume2 className="h-6 w-6 text-primary" />,
    title: "Screen Reader Support",
    description: "Properly labeled form fields and semantic HTML structure",
  },
  {
    icon: <MousePointer className="h-6 w-6 text-primary" />,
    title: "Clear Navigation",
    description: "Consistent and intuitive navigation throughout the website",
  },
]

export default function AccessibilityPage() {
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
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">Accessibility Statement</h1>
          <p className="mt-4 max-w-3xl mx-auto text-muted-foreground md:text-xl">
            Houston Cardiology Consultants is committed to ensuring digital accessibility for all patients, including
            those with disabilities.
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
            <section id="our-commitment">
              <h2 className="text-3xl font-bold mb-6">Our Commitment</h2>
              <div className="prose prose-gray dark:prose-invert max-w-none mb-8">
                <p>
                  We are actively working to improve the usability of our website and digital tools, and to make our
                  online presence accessible to the widest possible audience.
                </p>
                <p>
                  We strive to meet the <strong>Web Content Accessibility Guidelines (WCAG) 2.1, Level AA</strong>{" "}
                  standards, which help make content accessible to individuals with vision, hearing, cognitive, and
                  mobility impairments.
                </p>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Our accessibility efforts include:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {accessibilityFeatures.map((feature, index) => (
                    <div key={index} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">{feature.icon}</div>
                        <div>
                          <h4 className="font-semibold mb-2">{feature.title}</h4>
                          <p className="text-sm text-muted-foreground">{feature.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
                <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">WCAG 2.1 Level AA Compliance</h3>
                <p className="text-blue-800 dark:text-blue-200 text-sm leading-relaxed">
                  We follow established web accessibility standards to ensure our digital content is perceivable,
                  operable, understandable, and robust for all users.
                </p>
              </div>
            </section>

            <section id="assistance">
              <h2 className="text-3xl font-bold mb-6">Assistance and Alternative Access</h2>
              <div className="prose prose-gray dark:prose-invert max-w-none mb-6">
                <p>
                  If you encounter any accessibility barriers on our website or need assistance accessing any part of
                  it, we are here to help.
                </p>
                <p>
                  We will do our best to provide the information or services you need through alternative methods if
                  necessary.
                </p>
              </div>

              <div className="bg-muted/30 rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-4">You may contact us via:</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-primary" />
                    <div>
                      <span className="font-medium">Phone:</span>
                      <a href="tel:713-464-4140" className="text-primary hover:underline ml-2">
                        713-464-4140
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-primary" />
                    <div>
                      <span className="font-medium">Email:</span>
                      <a href="mailto:info@hccheart.com" className="text-primary hover:underline ml-2">
                        info@hccheart.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-5 w-5 bg-primary/10 rounded-full flex items-center justify-center mt-0.5">
                      <div className="h-2 w-2 bg-primary rounded-full"></div>
                    </div>
                    <div>
                      <span className="font-medium">Office Visits:</span>
                      <span className="ml-2">Accessible facilities available at both locations</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section id="ongoing-improvements">
              <h2 className="text-3xl font-bold mb-6">Ongoing Improvements</h2>
              <div className="prose prose-gray dark:prose-invert max-w-none">
                <p>
                  We regularly evaluate our digital tools and content for accessibility improvements. We welcome
                  feedback and suggestions to make our services more accessible to all.
                </p>
              </div>
              <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg p-6 mt-6">
                <h3 className="font-semibold text-green-900 dark:text-green-100 mb-2">Continuous Enhancement</h3>
                <p className="text-green-800 dark:text-green-200 text-sm leading-relaxed">
                  Our commitment to accessibility is ongoing. We continuously work to identify and address potential
                  barriers to ensure equal access to our digital services.
                </p>
              </div>
            </section>

            <section id="feedback">
              <h2 className="text-3xl font-bold mb-6">Feedback</h2>
              <div className="prose prose-gray dark:prose-invert max-w-none mb-6">
                <p>
                  If you have feedback or suggestions regarding the accessibility of this website, please contact us at:
                </p>
              </div>

              <div className="bg-muted/30 rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-4">Houston Cardiology Consultants</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-primary" />
                    <div>
                      <span className="font-medium">Email:</span>
                      <a href="mailto:info@hccheart.com" className="text-primary hover:underline ml-2">
                        info@hccheart.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-primary" />
                    <div>
                      <span className="font-medium">Phone:</span>
                      <a href="tel:713-464-4140" className="text-primary hover:underline ml-2">
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
                  <h4 className="font-semibold mb-2">Privacy Policy</h4>
                  <p className="text-sm text-muted-foreground mb-3">How we protect your information</p>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/privacy-policy">Read Policy</Link>
                  </Button>
                </div>
                <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <h4 className="font-semibold mb-2">Contact Us</h4>
                  <p className="text-sm text-muted-foreground mb-3">Get in touch with our team</p>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/contact">Contact Form</Link>
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
