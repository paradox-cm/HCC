"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { useState } from "react"
import Image from "next/image"

const navLinks = [
  { href: "/about-us", label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/learn", label: "Learn" },
  { href: "/chat", label: "Chat" },
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="fixed top-6 z-50 inset-x-0 container">
      <div className="flex h-16 items-center justify-between rounded-2xl border bg-background/90 backdrop-blur-sm px-4">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/images/hcc-logo.png" alt="HCC Logo" width={24} height={24} className="h-6 w-6" />
          <span className="font-bold text-base sm:text-lg md:text-xl lg:text-xl whitespace-nowrap">
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

        <div className="hidden lg:flex items-center gap-2">
          <Button variant="outline" asChild>
            <Link href="/patient-portal">Patient Portal</Link>
          </Button>
          <Button asChild>
            <Link href="/appointments">Appointments</Link>
          </Button>
        </div>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="outline" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Open navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <div className="flex flex-col gap-6 p-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-lg font-medium transition-colors hover:text-primary"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Button variant="outline" asChild>
                <Link href="/patient-portal">Patient Portal</Link>
              </Button>
              <Button asChild>
                <Link href="/appointments">Appointments</Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
