"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Calendar, Globe } from "lucide-react"
import { useState } from "react"
import Image from "next/image"
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"

// Declare window.google for Google Translate integration
declare global {
  interface Window {
    google: any;
  }
}

const navLinks = [
  { href: "/about-us", label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/learn", label: "Learn" },
  { href: "/chat", label: "Chat" },
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  // Responsive font size for HCC text below 1100px
  if (typeof window !== 'undefined') {
    const style = document.createElement('style');
    style.innerHTML = `
      @media (max-width: 1100px) {
        .responsive-hcc-text {
          font-size: 1rem !important;
        }
      }
    `;
    document.head.appendChild(style);
  }

  return (
    <header className="fixed top-6 z-50 inset-x-0 container">
      <div className="flex h-16 items-center justify-between rounded-2xl border bg-background/90 backdrop-blur-sm px-4">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/images/hcc-logo.png" alt="HCC Logo" width={24} height={24} className="h-6 w-6" />
          <span className="font-bold text-base sm:text-lg md:text-lg lg:text-lg whitespace-nowrap responsive-hcc-text">
            Houston Cardiology Consultants
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-6 text-sm">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="transition-colors hover:text-primary font-medium">
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop language toggle and nav buttons (now lg and up) */}
        <div className="hidden lg:flex items-center gap-2">
          <Globe className="h-5 w-5 text-muted-foreground" />
          <Select defaultValue="en" onValueChange={value => {
            if (typeof window !== 'undefined' && window.google && window.google.translate) {
              window.google.translate.translatePage('en', value);
            }
          }}>
            <SelectTrigger className="w-auto min-w-0 h-10 text-sm px-3">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">EN</SelectItem>
              <SelectItem value="es">ES</SelectItem>
              <SelectItem value="hi">HI</SelectItem>
              <SelectItem value="vi">VI</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" asChild>
            <Link href="/patient-portal">Patient Portal</Link>
          </Button>
          <Button asChild>
            <Link href="/appointments">
              <Calendar className="h-5 w-5 mr-2" />
              Appointments
            </Link>
          </Button>
        </div>

        {/* Mobile/tablet language toggle and menu button grouped at end (now below lg) */}
        <div className="flex lg:hidden items-center gap-2 ml-auto">
          <Globe className="h-5 w-5 text-muted-foreground" />
          <Select defaultValue="en" onValueChange={value => {
            if (typeof window !== 'undefined' && window.google && window.google.translate) {
              window.google.translate.translatePage('en', value);
            }
          }}>
            <SelectTrigger className="w-auto min-w-0 h-10 text-sm px-3">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">EN</SelectItem>
              <SelectItem value="es">ES</SelectItem>
              <SelectItem value="hi">HI</SelectItem>
              <SelectItem value="vi">VI</SelectItem>
            </SelectContent>
          </Select>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="outline" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-4 p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Image src="/images/hcc-logo.png" alt="HCC Logo" width={24} height={24} className="h-6 w-6" />
                  <span className="font-bold text-base whitespace-nowrap">Houston Cardiology Consultants</span>
                </div>
                <div className="flex flex-col gap-2">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-lg font-medium transition-colors hover:text-primary py-2 px-2 rounded-md hover:bg-accent"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/patient-portal">Patient Portal</Link>
                </Button>
                <Button asChild className="w-full">
                  <Link href="/appointments">
                    <Calendar className="h-5 w-5 mr-2" />
                    Appointments
                  </Link>
                </Button>
                <div className="border-t my-4" />
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold uppercase text-xs mb-2 tracking-wider text-muted-foreground">Patient Info</h3>
                    <ul className="flex flex-col gap-2">
                      <li><Link href="/services" className="text-sm text-muted-foreground transition-colors hover:text-primary">Services</Link></li>
                      <li><Link href="/learn" className="text-sm text-muted-foreground transition-colors hover:text-primary">Learn</Link></li>
                      <li><Link href="/billing-and-insurance" className="text-sm text-muted-foreground transition-colors hover:text-primary">Billing & Insurance</Link></li>
                      <li><Link href="/patient-portal" className="text-sm text-muted-foreground transition-colors hover:text-primary">Patient Portal</Link></li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold uppercase text-xs mb-2 tracking-wider text-muted-foreground">Company</h3>
                    <ul className="flex flex-col gap-2">
                      <li><Link href="/about-us" className="text-sm text-muted-foreground transition-colors hover:text-primary">About Us</Link></li>
                      <li><Link href="/testimonials" className="text-sm text-muted-foreground transition-colors hover:text-primary">Testimonials</Link></li>
                      <li><Link href="/locations" className="text-sm text-muted-foreground transition-colors hover:text-primary">Locations</Link></li>
                      <li><Link href="/contact" className="text-sm text-muted-foreground transition-colors hover:text-primary">Contact</Link></li>
                      <li><Link href="/faq" className="text-sm text-muted-foreground transition-colors hover:text-primary">FAQ</Link></li>
                    </ul>
                  </div>
                  <div className="col-span-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="w-full text-left font-semibold uppercase text-xs mb-2 tracking-wider text-muted-foreground bg-muted rounded-md py-2 px-3 flex items-center justify-between">
                          Legal
                          <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start" className="w-full">
                        <DropdownMenuItem asChild>
                          <Link href="/patient-rights">Patient Rights</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href="/hipaa">HIPAA Notice</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href="/privacy-policy">Privacy Policy</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href="/terms-of-use">Terms of Use</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href="/accessibility">Accessibility</Link>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
