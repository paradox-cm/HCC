"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import SunFillIcon from 'remixicon-react/SunFillIcon';
import MoonFillIcon from 'remixicon-react/MoonFillIcon';
import ComputerFillIcon from 'remixicon-react/ComputerFillIcon';
import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import { useChat } from "@/components/chat/chat-provider"
import Image from "next/image"
import WhatsappFillIcon from 'remixicon-react/WhatsappFillIcon';
import ArrowUpLineIcon from 'remixicon-react/ArrowUpLineIcon';

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
  const { theme, setTheme, resolvedTheme } = useTheme()
  // Use only neutral grays for all icons and UI elements in dark mode (no blue hues)
  const themeOptions = [
    { value: "light", label: "Light", icon: <SunFillIcon className="h-4 w-4 text-yellow-400" /> },
    { value: "dark", label: "Dark", icon: <MoonFillIcon className="h-4 w-4" style={{ color: '#888' }} /> }, // Neutral gray
    { value: "system", label: "System", icon: <ComputerFillIcon className="h-4 w-4 text-blue-500" /> },
  ]
  // Only render dropdown after mount to avoid hydration mismatch
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const current = themeOptions.find(opt => (theme === opt.value) || (!theme && opt.value === "system")) || themeOptions[2]

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

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="border-t bg-muted dark:bg-[#1A1A1A] relative z-40 overflow-x-hidden w-full">
      <div className="px-4 md:px-8 lg:px-8 xl:px-8 2xl:px-8 w-full lg:max-w-7xl mx-auto py-16 overflow-x-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8 min-w-0 max-w-full">
          <div className="lg:col-span-1 space-y-6 min-w-0 max-w-full">
            <Link href="/" className="flex items-center gap-2 min-w-0 max-w-full overflow-hidden">
              <Image src="/images/hcc-logo.png" alt="HCC Logo" width={18} height={18} className="h-4.5 w-4.5 max-w-full" />
              <span className="font-bold break-words max-w-full overflow-hidden text-ellipsis whitespace-nowrap" style={{ fontSize: '0.84375rem' }}>Houston Cardiology Consultants</span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-xs break-words max-w-full overflow-hidden">
              Providing personalized care and cutting-edge medical expertise for your heart health.
            </p>
            <div className="space-y-4 min-w-0 max-w-full">
              <div>
                <Link href="/locations" className="text-sm font-semibold text-primary hover:underline focus:underline transition-colors max-w-full overflow-hidden">
                  Long Point / Spring
                </Link>
                <p className="text-sm text-muted-foreground break-words max-w-full overflow-hidden">Ph: 713-464-4140</p>
                <p className="text-sm text-muted-foreground break-words max-w-full overflow-hidden">Fx: 713-464-7296</p>
              </div>
              <div>
                <Link href="/locations" className="text-sm font-semibold text-primary hover:underline focus:underline transition-colors max-w-full overflow-hidden">
                  Tidwell / Heights
                </Link>
                <p className="text-sm text-muted-foreground break-words max-w-full overflow-hidden">Ph: 713-464-4242</p>
                <p className="text-sm text-muted-foreground break-words max-w-full overflow-hidden">Fx: 713-697-4006</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:col-span-3 min-w-0 max-w-full">
            {linkCategories.map((category) => (
              <div key={category.title} className="min-w-0 max-w-full">
                <h3 className="font-semibold tracking-wider uppercase text-sm mb-4 break-words max-w-full overflow-hidden">{category.title}</h3>
                <ul className="space-y-3 min-w-0 max-w-full">
                  {category.links.map((link) => (
                    <li key={link.href} className="min-w-0 max-w-full">
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground break-words min-w-0 max-w-full overflow-hidden"
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
        <div className="flex justify-between items-center mb-2 gap-2 min-w-0 max-w-full">
          <div className="flex gap-3 flex-wrap min-w-0 max-w-full overflow-x-auto">
            <a href="https://www.facebook.com/houstoncardiologyconsultants/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="min-w-0 max-w-full">
              <Image src="/FB.png" alt="Facebook" width={20} height={20} className="h-5 w-5 opacity-80 hover:opacity-100 transition-opacity max-w-full min-w-0" />
            </a>
            <a href="https://x.com/hccheart?lang=en" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)" className="min-w-0 max-w-full">
              <Image src="/X.png" alt="X (Twitter)" width={20} height={20} className="h-5 w-5 opacity-80 hover:opacity-100 transition-opacity max-w-full min-w-0" />
            </a>
            <a href="https://www.instagram.com/houstoncardiologyconsultants" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="min-w-0 max-w-full">
              <Image src="/IG.png" alt="Instagram" width={20} height={20} className="h-5 w-5 opacity-80 hover:opacity-100 transition-opacity max-w-full min-w-0" />
            </a>
          </div>
          <Button
            variant="secondary"
            size="icon"
            className="rounded-full border border-[#D6D8DA] dark:border-[#1F1F1F]"
            aria-label="Scroll to top"
            onClick={handleScrollTop}
          >
            <ArrowUpLineIcon className="h-5 w-5" />
          </Button>
        </div>
        <div className="mt-12 border-t border-[#D6D8DA] dark:border-[#1F1F1F] pt-8 w-full">
          {/* Mobile: Chat buttons above, then theme/copyright below. Desktop: side by side. */}
          <div className="flex flex-col-reverse md:flex-row md:items-center md:justify-between w-full gap-6 md:gap-0">
            {/* Left: Theme dropdown */}
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-xs text-muted-foreground font-medium">Theme:</span>
              {mounted && (
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger asChild>
                    <button
                      aria-label="Select theme"
                      className="flex items-center gap-2 rounded-full px-3 py-2 border bg-background hover:bg-muted transition-colors text-sm font-medium"
                      type="button"
                    >
                      {current.icon}
                      <span>{current.label} Mode</span>
                    </button>
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Content sideOffset={8} className="min-w-[140px] rounded-md border bg-background p-1 shadow-lg z-50">
                    {themeOptions.map(opt => (
                      <DropdownMenu.Item
                        key={opt.value}
                        onSelect={() => setTheme(opt.value)}
                        className={`flex items-center gap-2 px-3 py-2 rounded cursor-pointer text-sm transition-colors ${theme === opt.value ? 'bg-muted font-semibold' : 'hover:bg-muted'}`}
                        aria-selected={theme === opt.value}
                      >
                        {opt.icon}
                        <span>{opt.label} Mode</span>
                      </DropdownMenu.Item>
                    ))}
                  </DropdownMenu.Content>
                </DropdownMenu.Root>
              )}
            </div>
            {/* Right: Chat buttons (top on mobile) */}
            <div className="flex flex-col gap-2 w-full md:mt-0 md:flex-row md:gap-2 md:w-auto md:justify-end mb-0 md:mb-0">
              <Button variant="default" onClick={handleChatOpen} className="w-full md:w-auto">
                Chat with us
              </Button>
              <Dialog open={waOpen} onOpenChange={setWaOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full md:w-auto">
                    <WhatsappFillIcon className="mr-2 h-5 w-5 text-green-600" />
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
          
          {/* Copyright text on its own line */}
          <div className="w-full text-left mt-6">
            <p className="text-sm text-muted-foreground break-words min-w-0">
              © {new Date().getFullYear()} Houston Cardiology Consultants. All Rights Reserved.
              <span className="mx-2">&middot;</span>
              <Link href="/admin" className="underline hover:text-primary transition-colors">Admin</Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
