"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { useChat } from "@/components/chat/chat-provider"
import Image from "next/image"
import { MessageCircle } from "lucide-react"

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
  const [waOpen, setWaOpen] = useState(false)
  const [waName, setWaName] = useState("")
  const [waMsg, setWaMsg] = useState("")
  const [waError, setWaError] = useState("")

  const handleChatOpen = () => {
    setChatOpen(true)
    setChatMinimized(false)
  }

  const handleWaSend = (e: React.FormEvent) => {
    e.preventDefault()
    if (!waName.trim() || !waMsg.trim()) {
      setWaError("Please enter your name and message.")
      return
    }
    setWaError("")
    const phone = "17134644140" // WhatsApp number, no + or dashes
    const message = `Name: ${waName}\nMessage: ${waMsg}`
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
    window.open(url, '_blank')
    setWaOpen(false)
    setWaName("")
    setWaMsg("")
  }

  return (
    <footer className="border-t bg-muted relative z-40">
      <div className="px-4 md:px-8 lg:px-8 xl:px-8 2xl:px-8 max-w-7xl mx-auto py-16">
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
        <div className="mt-12 border-t pt-8 flex justify-between items-center gap-4 flex-wrap">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Houston Cardiology Consultants. All Rights Reserved.
          </p>
          <div className="flex gap-2">
            <Button variant="default" onClick={handleChatOpen}>
              Chat with us
            </Button>
            <Dialog open={waOpen} onOpenChange={setWaOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <MessageCircle className="mr-2 h-5 w-5 text-green-600" />
                  Message us on WhatsApp
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Message us on WhatsApp</DialogTitle>
                </DialogHeader>
                <form className="space-y-4" onSubmit={handleWaSend}>
                  <div>
                    <label className="block text-xs font-medium mb-1">Your Name</label>
                    <Input value={waName} onChange={e => setWaName(e.target.value)} required autoFocus />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1">Your Message</label>
                    <Textarea value={waMsg} onChange={e => setWaMsg(e.target.value)} rows={3} required />
                  </div>
                  {waError && <div className="text-xs text-red-600">{waError}</div>}
                  <Button type="submit" className="w-full" variant="default">Send via WhatsApp</Button>
                </form>
                <div className="text-xs text-muted-foreground mt-2">You’ll be redirected to WhatsApp to complete your message.</div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </footer>
  )
}
