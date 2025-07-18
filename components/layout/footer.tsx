"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useChat } from "@/components/chat/chat-provider"
import Image from "next/image"

const linkCategories = [
  {
    title: "Patient Info",
    links: [
      { href: "/services", label: "Services" },
      { href: "/learn", label: "Learn" },
      { href: "/billing-and-insurance", label: "Billing & Insurance" },
      { href: "/patient-portal", label: "Patient Portal" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about-us", label: "About Us" },
      { href: "/testimonials", label: "Testimonials" },
      { href: "/locations", label: "Locations" },
      { href: "/contact", label: "Contact" },
      { href: "/faq", label: "FAQ" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/patient-rights", label: "Patient Rights" },
      { href: "/hipaa", label: "HIPAA Notice" },
      { href: "/privacy-policy", label: "Privacy Policy" },
      { href: "/terms-of-use", label: "Terms of Use" },
      { href: "/accessibility", label: "Accessibility" },
    ],
  },
]

export function Footer() {
  const { setChatOpen, setChatMinimized } = useChat()

  const handleChatOpen = () => {
    setChatOpen(true)
    setChatMinimized(false)
  }

  return (
    <footer className="border-t bg-muted relative z-40">
      <div className="container py-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          <div className="lg:col-span-1 space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/images/hcc-logo.png" alt="HCC Logo" width={18} height={18} className="h-4.5 w-4.5" />
              <span className="font-bold" style={{ fontSize: '0.84375rem' }}>Houston Cardiology Consultants</span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-xs">
              Providing personalized care and cutting-edge medical expertise for your heart health.
            </p>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-semibold">Long Point / Spring</p>
                <p className="text-sm text-muted-foreground">Ph: 713-464-4140</p>
                <p className="text-sm text-muted-foreground">Fx: 713-464-7296</p>
              </div>
              <div>
                <p className="text-sm font-semibold">Tidwell / Heights</p>
                <p className="text-sm text-muted-foreground">Ph: 713-464-4242</p>
                <p className="text-sm text-muted-foreground">Fx: 713-697-4006</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-3">
            {linkCategories.map((category) => (
              <div key={category.title}>
                <h3 className="font-semibold tracking-wider uppercase text-sm mb-4">{category.title}</h3>
                <ul className="space-y-3">
                  {category.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-12 border-t pt-8 flex justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Houston Cardiology Consultants. All Rights Reserved.
          </p>
          <Button variant="default" onClick={handleChatOpen}>
            Chat with us
          </Button>
        </div>
      </div>
    </footer>
  )
}
