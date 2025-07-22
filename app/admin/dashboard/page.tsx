"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart2, UserPlus, Users as UsersIcon, Calendar as CalendarIcon, FileText as FileTextIcon, MessageSquare as MessageSquareIcon, Pill as PillIcon } from "lucide-react"
import { useState } from "react"

const quickLinks = [
  { href: "/admin/patients", label: "Manage Patients", icon: UsersIcon },
  { href: "/admin/appointments", label: "Appointments", icon: CalendarIcon },
  { href: "/admin/prescriptions", label: "Prescriptions", icon: PillIcon },
  { href: "/admin/messages", label: "Messages", icon: MessageSquareIcon },
  { href: "/admin/documents", label: "Documents", icon: FileTextIcon },
  { href: "/admin/billing", label: "Billing & Insurance", icon: BarChart2 },
  { href: "/admin/care-plans", label: "Care Plans", icon: PillIcon },
]

export default function AdminDashboardPage() {
  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 pt-16 sm:pt-0">Welcome, Admin</h1>
      <p className="text-muted-foreground mb-8">Manage all aspects of the patient portal from this dashboard.</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 mb-10">
        {quickLinks.map(({ href, label, icon: Icon }) => (
          <Link key={href} href={href}>
            <Card className="h-full border border-muted hover:shadow-lg transition-all cursor-pointer hover:border-primary/30">
              <CardContent className="flex flex-col items-center justify-center p-4 sm:p-6 text-center gap-2 sm:gap-3">
                <Icon className="h-7 w-7 sm:h-8 sm:w-8 text-primary mb-1 sm:mb-2" />
                <span className="text-sm font-medium sm:text-lg sm:font-semibold">{label}</span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
      {/* 1st Row: Stats (Mobile-first) */}
      <div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <div className="flex flex-col items-center bg-card rounded-lg shadow p-4 border">
          <UsersIcon className="h-6 w-6 text-primary mb-1" />
          <span className="text-2xl font-bold">1,234</span>
          <span className="text-muted-foreground text-xs">Total Patients</span>
        </div>
        <div className="flex flex-col items-center bg-card rounded-lg shadow p-4 border">
          <UserPlus className="h-6 w-6 text-primary mb-1" />
          <span className="text-2xl font-bold">27</span>
          <span className="text-muted-foreground text-xs">New Signups This Week</span>
        </div>
        <div className="flex flex-col items-center bg-card rounded-lg shadow p-4 border">
          <BarChart2 className="h-6 w-6 text-primary mb-1" />
          <span className="text-2xl font-bold">89</span>
          <span className="text-muted-foreground text-xs">Active Patients Today</span>
        </div>
        <div className="flex flex-col items-center bg-card rounded-lg shadow p-4 border">
          <CalendarIcon className="h-6 w-6 text-primary mb-1" />
          <span className="text-2xl font-bold">42</span>
          <span className="text-muted-foreground text-xs">Appointments Booked</span>
        </div>
        <div className="flex flex-col items-center bg-card rounded-lg shadow p-4 border">
          <PillIcon className="h-6 w-6 text-primary mb-1" />
          <span className="text-2xl font-bold">15</span>
          <span className="text-muted-foreground text-xs">Prescriptions Requested</span>
        </div>
        <div className="flex flex-col items-center bg-card rounded-lg shadow p-4 border">
          <MessageSquareIcon className="h-6 w-6 text-primary mb-1" />
          <span className="text-2xl font-bold">58</span>
          <span className="text-muted-foreground text-xs">Messages Sent</span>
        </div>
      </div>
      {/* 2nd Row: Quick Links as Buttons */}
      <div className="flex flex-col gap-3 mb-8 w-full max-w-xs mx-auto sm:flex-row sm:flex-wrap sm:justify-center sm:max-w-none">
        <Link href="/admin/patients">
          <Button className="w-full sm:min-w-[160px] shadow font-semibold flex items-center gap-2">
            <UsersIcon className="h-5 w-5" /> Add New Patient
          </Button>
        </Link>
        <Link href="/admin/appointments">
          <Button className="w-full sm:min-w-[160px] shadow font-semibold flex items-center gap-2">
            <CalendarIcon className="h-5 w-5" /> Schedule Appointment
          </Button>
        </Link>
        <Link href="/admin/prescriptions">
          <Button className="w-full sm:min-w-[160px] shadow font-semibold flex items-center gap-2">
            <PillIcon className="h-5 w-5" /> Review Prescriptions
          </Button>
        </Link>
        <Link href="/admin/messages">
          <Button className="w-full sm:min-w-[160px] shadow font-semibold flex items-center gap-2">
            <MessageSquareIcon className="h-5 w-5" /> Send Message
          </Button>
        </Link>
        <Link href="/admin/documents">
          <Button className="w-full sm:min-w-[160px] shadow font-semibold flex items-center gap-2">
            <FileTextIcon className="h-5 w-5" /> Upload Document
          </Button>
        </Link>
      </div>
      {/* 3rd Row: Recent Activity Table/List */}
      <div className="bg-card rounded-lg shadow p-6 border">
        <h2 className="text-lg font-bold mb-4">Recent Activity</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-muted-foreground border-b">
                <th className="py-2 px-2">Time</th>
                <th className="py-2 px-2">Event</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b hover:bg-muted/50 transition">
                <td className="py-2 px-2 whitespace-nowrap font-mono text-xs">10:15 AM</td>
                <td className="py-2 px-2">John Doe registered for the portal</td>
              </tr>
              <tr className="border-b hover:bg-muted/50 transition">
                <td className="py-2 px-2 whitespace-nowrap font-mono text-xs">10:30 AM</td>
                <td className="py-2 px-2">Jane Smith booked an appointment</td>
              </tr>
              <tr className="border-b hover:bg-muted/50 transition">
                <td className="py-2 px-2 whitespace-nowrap font-mono text-xs">11:00 AM</td>
                <td className="py-2 px-2">Prescription request received from Alex Lee</td>
              </tr>
              <tr className="border-b hover:bg-muted/50 transition">
                <td className="py-2 px-2 whitespace-nowrap font-mono text-xs">11:15 AM</td>
                <td className="py-2 px-2">New message from Dr. Patel</td>
              </tr>
              <tr className="hover:bg-muted/50 transition">
                <td className="py-2 px-2 whitespace-nowrap font-mono text-xs">11:45 AM</td>
                <td className="py-2 px-2">Document uploaded by Maria Garcia</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
} 