"use client"

import type React from "react"
import { SectionWrapper } from "@/components/section-wrapper"
import { HeaderAnimation } from "@/components/HeaderAnimation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import CalendarFillIcon from 'remixicon-react/CalendarFillIcon';
import MailFillIcon from 'remixicon-react/MailFillIcon';
import FileTextFillIcon from 'remixicon-react/FileTextFillIcon';
import CapsuleFillIcon from 'remixicon-react/CapsuleFillIcon';
import HeartPulseFillIcon from 'remixicon-react/HeartPulseFillIcon';
import MoneyDollarCircleFillIcon from 'remixicon-react/MoneyDollarCircleFillIcon';
import Message2FillIcon from 'remixicon-react/Message2FillIcon';
import ClipboardFillIcon from 'remixicon-react/ClipboardFillIcon';
import DownloadFillIcon from 'remixicon-react/DownloadFillIcon';
import UploadFillIcon from 'remixicon-react/UploadFillIcon';
import LogoutBoxLineIcon from 'remixicon-react/LogoutBoxLineIcon';
import QuestionFillIcon from 'remixicon-react/QuestionFillIcon';
import Message3FillIcon from 'remixicon-react/Message3FillIcon';
import ArrowRightSFillIcon from 'remixicon-react/ArrowRightSFillIcon';
import TimeFillIcon from 'remixicon-react/TimeFillIcon';
import User3FillIcon from 'remixicon-react/User3FillIcon';
import BankCardFillIcon from 'remixicon-react/BankCardFillIcon';
import ShieldCheckFillIcon from 'remixicon-react/ShieldCheckFillIcon';
import Settings3LineIcon from 'remixicon-react/Settings3LineIcon';
import Link from "next/link"
import { MailIcon } from "lucide-react"
import { FileText as FileTextIcon } from "lucide-react"
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import { useChat } from "@/components/chat/chat-provider"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog"
import { useState } from "react"

const MOCK_THREADS = [
  {
    id: 1,
    subject: "Test Results Available",
    participants: ["Dr. Asif Ali"],
    messages: [
      { from: "Dr. Asif Ali", text: "Your test results are in. Please review them and let me know if you have questions.", time: "2024-06-01 10:00" },
      { from: "You", text: "Thank you, I will review and follow up if needed.", time: "2024-06-01 10:15" },
    ],
    unread: true,
  },
  {
    id: 2,
    subject: "Upcoming Appointment Reminder",
    participants: ["Front Desk"],
    messages: [
      { from: "Front Desk", text: "Reminder: Your appointment is scheduled for July 25, 2025 at 10:00 AM.", time: "2024-05-30 09:00" },
      { from: "You", text: "Thank you for the reminder!", time: "2024-05-30 09:10" },
    ],
    unread: false,
  },
]

const MOCK_DOCUMENTS = [
  {
    id: 1,
    name: "Cardiac Stress Test",
    type: "Test Result",
    date: "2024-06-01",
    status: "Available",
  },
  {
    id: 2,
    name: "Lab Results",
    type: "Lab Result",
    date: "2024-05-20",
    status: "Available",
  },
  {
    id: 3,
    name: "Echocardiogram Report",
    type: "Imaging",
    date: "2024-04-15",
    status: "Available",
  },
]

function QuickActions() {
  return (
    <section aria-label="Quick Actions" className="mb-6">
      <h2 className="text-lg font-semibold mb-3">Quick Actions</h2>
      {/* Mobile: 2x2 Grid */}
      <div className="grid grid-cols-2 gap-3 md:hidden">
        <Button asChild variant="default" className="h-16 flex-col gap-2 p-3">
          <Link href="/patient-portal/dashboard/appointment">
            <CalendarFillIcon className="h-5 w-5" />
            <span className="text-sm font-medium">Book Appointment</span>
          </Link>
        </Button>
        <Button asChild variant="outline" className="h-16 flex-col gap-2 p-3">
          <Link href="/patient-portal/dashboard/messages">
            <Message2FillIcon className="h-5 w-5" />
            <span className="text-sm font-medium">Message</span>
          </Link>
        </Button>
        <Button asChild variant="outline" className="h-16 flex-col gap-2 p-3">
          <Link href="/patient-portal/dashboard/prescriptions">
            <CapsuleFillIcon className="h-5 w-5" />
            <span className="text-sm font-medium">Refill Rx</span>
          </Link>
        </Button>
        <Button asChild variant="outline" className="h-16 flex-col gap-2 p-3">
          <Link href="/patient-portal/dashboard/documents">
            <FileTextFillIcon className="h-5 w-5" />
            <span className="text-sm font-medium">View Results</span>
          </Link>
        </Button>
      </div>
      {/* Desktop/Tablet: Horizontal Scroll */}
      <div className="hidden md:flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        <Button asChild size="sm" variant="default" className="flex-shrink-0 px-4 py-2">
          <Link href="/patient-portal/dashboard/appointment">
            <CalendarFillIcon className="mr-2 h-4 w-4" />
            Book Appointment
          </Link>
        </Button>
        <Button asChild size="sm" variant="outline" className="flex-shrink-0 px-4 py-2">
          <Link href="/patient-portal/dashboard/messages">
            <Message2FillIcon className="mr-2 h-4 w-4" />
            Message
          </Link>
        </Button>
        <Button asChild size="sm" variant="outline" className="flex-shrink-0 px-4 py-2">
          <Link href="/patient-portal/dashboard/prescriptions">
            <CapsuleFillIcon className="mr-2 h-4 w-4" />
            Refill Rx
          </Link>
        </Button>
        <Button asChild size="sm" variant="outline" className="flex-shrink-0 px-4 py-2">
          <Link href="/patient-portal/dashboard/documents">
            <FileTextFillIcon className="mr-2 h-4 w-4" />
            View Results
          </Link>
        </Button>
      </div>
    </section>
  )
}

// Add mock care summary data
const MOCK_CARE_PLAN = {
  summary: "You are currently on a preventive care plan focused on blood pressure and cholesterol management. Continue your medications and follow up as scheduled.",
  recentVisits: [
    { date: "2024-06-01", type: "Echocardiogram Follow-Up", provider: "Dr. Asif Ali" },
    { date: "2024-05-14", type: "Preventive Heart Evaluation", provider: "Dr. Abdul" },
  ],
}

// Add mock prescriptions and pharmacy data from prescriptions page
const MOCK_PRESCRIPTIONS = [
  {
    id: 1,
    name: "Metoprolol",
    dosage: "50mg",
    instructions: "Take 1 tablet daily",
    status: "Active",
    canRefill: true,
  },
  {
    id: 2,
    name: "Atorvastatin",
    dosage: "20mg",
    instructions: "Take 1 tablet daily",
    status: "Ongoing",
    canRefill: false,
  },
  {
    id: 3,
    name: "Lisinopril",
    dosage: "10mg",
    instructions: "Take 1 tablet daily",
    status: "Active",
    canRefill: true,
  },
]
const MOCK_PHARMACY = {
  name: "CVS Pharmacy",
  address: "123 Main St, Houston, TX 77001",
  phone: "(555) 987-6543",
}

export default function PatientPortalDashboardClient() {
  const { setChatOpen } = useChat();
  const patientName = "Jane" // Placeholder for patient name
  const [insuranceModalOpen, setInsuranceModalOpen] = useState(false)
  // Optionally, you could lift insurance state here if you want to sync with the billing page

  return (
    <>
      {/* Mobile-optimized header */}
      <SectionWrapper className="bg-muted/20 pt-6 pb-4 relative overflow-hidden">
        <HeaderAnimation 
          type="vanishing-point" 
          intensity="medium" 
          colorScheme="gray" 
          responsive={true}
        />
        <div className="flex items-start justify-between mb-1 gap-3 flex-wrap relative z-10">
          {/* Left: Avatar, name/date */}
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mt-1">
            <User3FillIcon className="h-6 w-6 text-white" />
          </div>
            <div className="flex flex-col min-w-0">
              <h1 className="text-xl font-bold tracking-tight whitespace-nowrap">Welcome back, {patientName}</h1>
              <p className="text-sm text-muted-foreground whitespace-nowrap">Last login: {new Date().toLocaleDateString()}</p>
            </div>
          </div>
          {/* Right: Settings, Log Out */}
          <TooltipProvider delayDuration={0}>
            <div className="flex items-center gap-2 ml-auto flex-wrap mt-1">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button asChild size="icon" variant="outline">
                    <Link href="/patient-portal/dashboard/settings"><Settings3LineIcon className="h-5 w-5" /></Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Settings</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button asChild size="icon" variant="outline" className="border-gray-300 text-gray-600 bg-white hover:bg-gray-100 dark:bg-[hsl(0,0%,14%)] dark:text-[hsl(0,0%,80%)] dark:border-[hsl(0,0%,20%)] dark:hover:bg-[hsl(0,0%,20%)]">
                    <Link href="/patient-portal"><LogoutBoxLineIcon className="h-5 w-5" /></Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Log Out</TooltipContent>
              </Tooltip>
            </div>
          </TooltipProvider>
        </div>
        {/* Info tools row, left-justified to container, below avatar/name/login row */}
        <div className="relative z-10">
          <TooltipProvider delayDuration={0}>
          <div className="flex items-center gap-2 mt-4 mb-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button asChild size="icon" variant="ghost">
                  <a href="/hipaa" target="_blank" rel="noopener noreferrer"><ShieldCheckFillIcon className="h-5 w-5" /></a>
                </Button>
              </TooltipTrigger>
              <TooltipContent>HIPAA Notice</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button asChild size="icon" variant="ghost">
                  <a href="/patient-rights" target="_blank" rel="noopener noreferrer"><FileTextFillIcon className="h-5 w-5" /></a>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Patient Rights</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button asChild size="icon" variant="ghost">
                  <a href="/faq" target="_blank" rel="noopener noreferrer"><QuestionFillIcon className="h-5 w-5" /></a>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Help / FAQ</TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
        </div>
      </SectionWrapper>

      <SectionWrapper className="pt-0">
        <QuickActions />

        {/* Cards Grid - Mobile: single column, Tablet: 2 columns, Desktop: 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">

          {/* Next Appointment - Prominent placement */}
          <MobileCard
            title="Next Appointment"
            icon={<CalendarFillIcon className="h-5 w-5 text-primary" />}
            className="bg-primary/5 border-primary/20"
          >
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <TimeFillIcon className="h-4 w-4 mt-1 text-muted-foreground" />
                <div className="flex-1">
                  <p className="font-semibold text-base">July 25, 2025 • 10:00 AM</p>
                  <p className="text-sm text-muted-foreground">Dr. Asif Ali • Heart Health Way Clinic</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button asChild size="sm" variant="outline" className="flex-1 border-red-600 text-red-600">
                  <Link href="/patient-portal/dashboard/appointments/1/reschedule">
                    Reschedule
                  </Link>
                </Button>
                <Button asChild size="sm" variant="outline" className="flex-1">
                  <Link href="/patient-portal/dashboard/appointments/1/reschedule?cancel=1">
                    Cancel
                  </Link>
                </Button>
              </div>
            </div>
          </MobileCard>

          {/* Messages & Alerts */}
          <MobileCard
            title="Messages & Alerts"
            icon={<MailFillIcon className="h-5 w-5 text-primary" />}
            badge={MOCK_THREADS.filter(t => t.unread).length > 0 ? `${MOCK_THREADS.filter(t => t.unread).length} new` : undefined}
            href="/patient-portal/dashboard/messages"
          >
            <div className="space-y-2">
              {MOCK_THREADS.slice(0, 2).map(thread => (
                <Link
                  key={thread.id}
                  href="/patient-portal/dashboard/messages"
                  className="block p-2 rounded hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    {thread.unread && <span className="inline-block w-2.5 h-2.5 rounded-full bg-red-600" aria-label="unread" />}
                    <span className="font-medium text-sm truncate flex-1">{thread.subject}</span>
                  </div>
                  <div className="text-xs text-muted-foreground truncate">
                    {thread.messages[thread.messages.length - 1].from}: {thread.messages[thread.messages.length - 1].text}
                  </div>
                </Link>
              ))}
              <div className="flex flex-1 justify-end mt-2">
                <Button asChild variant="link" className="p-0 h-auto text-sm">
                <Link href="/patient-portal/dashboard/messages">View All Messages →</Link>
                </Button>
              </div>
              <Button asChild size="sm" variant="outline" className="w-full mt-3">
                <Link href="/patient-portal/dashboard/messages?new=1">New Message</Link>
              </Button>
            </div>
          </MobileCard>

          {/* Documents & Results */}
          <MobileCard
            title="Documents & Results"
            icon={<FileTextFillIcon className="h-5 w-5 text-primary" />}
            href="/patient-portal/dashboard/documents"
          >
            <div className="space-y-2">
              {MOCK_DOCUMENTS.slice(0, 2).map(doc => (
                <div key={doc.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">{doc.name}</p>
                    <p className="text-xs text-muted-foreground">
                      ({doc.type}) • Date: {doc.date} • Status: <span className="font-medium text-primary">{doc.status}</span>
                    </p>
                  </div>
                  <div className="flex gap-1 items-center">
                    <Button asChild size="icon" variant="outline" aria-label="View Document" className="h-8 w-8 p-0 rounded-md">
                      <Link href={`/patient-portal/dashboard/documents/${doc.id}`}><FileTextFillIcon className="h-4 w-4" /></Link>
                    </Button>
                    <Button asChild size="icon" variant="outline" aria-label="Download Document" className="h-8 w-8 p-0 rounded-md">
                      <a href="/sample.pdf" download><DownloadFillIcon className="h-4 w-4" /></a>
                    </Button>
                  </div>
                </div>
              ))}
              <div className="flex flex-1 justify-end mt-2">
                <Button asChild variant="link" className="p-0 h-auto text-sm">
                  <Link href="/patient-portal/dashboard/documents">View All Documents →</Link>
                </Button>
              </div>
              <Button asChild size="sm" variant="outline" className="w-full mt-3">
                <Link href="/patient-portal/dashboard/care-plan?create=1"> <HeartPulseFillIcon className="mr-2 h-4 w-4" /> Create Care Plan</Link>
              </Button>
            </div>
          </MobileCard>

          {/* Prescriptions */}
          <MobileCard
            title="Active Prescriptions"
            icon={<CapsuleFillIcon className="h-5 w-5 text-primary" />}
            href="/patient-portal/dashboard/prescriptions"
          >
            <div className="space-y-3">
              {MOCK_PRESCRIPTIONS.slice(0, 2).map(rx => (
                <div key={rx.id} className="border rounded-lg p-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 bg-muted/40">
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-base truncate">{rx.name} <span className="text-xs font-normal text-muted-foreground">{rx.dosage}</span></div>
                    <div className="text-xs text-muted-foreground truncate">{rx.instructions}</div>
                    <div className="text-xs text-muted-foreground mt-1">Status: <span className="font-medium text-primary">{rx.status}</span></div>
                </div>
                  <div className="flex flex-col gap-2 min-w-[100px] items-end">
                    {rx.canRefill ? (
                      <Button asChild size="sm" variant="outline" className="border-red-600 text-red-600">
                        <Link href={`/patient-portal/dashboard/prescriptions?refill=${rx.id}`}>Request Refill</Link>
                      </Button>
                    ) : (
                      <span className="inline-block bg-gray-100 text-gray-500 text-xs px-3 py-1 rounded-full text-center dark:bg-[hsl(0,0%,20%)] dark:text-[hsl(0,0%,60%)]">Not Eligible</span>
                    )}
                </div>
                  </div>
                ))}
                </div>
              <div className="flex flex-1 justify-end mt-2">
                <Button asChild variant="link" className="p-0 h-auto text-sm">
                  <Link href="/patient-portal/dashboard/prescriptions">View All Prescriptions →</Link>
                </Button>
              </div>
              <Button asChild variant="outline" size="sm" className="w-full mt-3">
                <Link href="/patient-portal/dashboard/prescriptions">View Pharmacy Info</Link>
              </Button>
            </MobileCard>

          {/* Billing & Insurance */}
          <MobileCard
            title="Billing & Insurance"
            icon={<MoneyDollarCircleFillIcon className="h-5 w-5 text-primary" />}
            href="/patient-portal/dashboard/billing-and-insurance"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900 dark:text-green-200 rounded-lg">
                <div>
                  <p className="font-medium text-sm">Outstanding Balance</p>
                  <p className="text-xs text-muted-foreground">All accounts current</p>
                </div>
                <span className="text-lg font-bold text-green-600 dark:text-green-300">$0.00</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div>
                  <p className="font-medium text-sm">Insurance</p>
                  <p className="text-xs text-muted-foreground">Aetna • Active</p>
                </div>
                <BankCardFillIcon className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
            <div className="flex gap-2 mt-3">
              <Button asChild size="sm" variant="default" className="flex-1">
                <Link href="/patient-portal/dashboard/billing-and-insurance">Pay Now</Link>
              </Button>
              <Button asChild size="sm" variant="outline" className="flex-1">
                <Link href="/patient-portal/dashboard/billing-and-insurance?update-insurance=1">Update Insurance</Link>
              </Button>
            </div>
          </MobileCard>

          {/* Care Summary */}
          <MobileCard
            title="Care Summary"
            icon={<HeartPulseFillIcon className="h-5 w-5 text-primary" />}
            href="/patient-portal/dashboard/care-plan"
          >
            <div className="space-y-3">
              <div className="text-sm text-muted-foreground mb-2">{MOCK_CARE_PLAN.summary}</div>
              <div className="space-y-2">
                <p className="font-medium text-sm mb-1">Recent Visits</p>
                <div className="space-y-2">
                  {MOCK_CARE_PLAN.recentVisits.map((visit, i) => (
                    <div key={i} className="p-3 bg-muted/30 rounded-lg flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <div className="font-medium text-sm">{visit.date}</div>
                        <div className="text-xs text-muted-foreground">{visit.type}</div>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1 sm:mt-0">{visit.provider}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-1 justify-end mt-2">
                <Button asChild variant="link" className="p-0 h-auto text-sm">
                  <Link href="/patient-portal/dashboard/care-plan">View Care Plan <span aria-hidden="true">→</span></Link>
                </Button>
              </div>
              <Button variant="outline" size="sm" className="w-full mt-3">
                <DownloadFillIcon className="mr-2 h-4 w-4" />
                Download Visit Summary
              </Button>
            </div>
          </MobileCard>

          {/* Help & Support */}
          <MobileCard
            title="Help & Support"
            icon={<QuestionFillIcon className="h-5 w-5 text-primary" />}
          >
            <div className="space-y-3">
              <Button
                variant="secondary"
                className="w-full justify-start h-auto py-3"
                onClick={() => setChatOpen(true)}
              >
                <Message3FillIcon className="mr-3 h-4 w-4" />
                <span className="text-sm">Chat Support</span>
              </Button>
              <Button
                asChild
                variant="secondary"
                className="w-full justify-start h-auto py-3"
              >
                <Link href="/patient-portal/dashboard/billing-and-insurance">
                  <BankCardFillIcon className="mr-3 h-4 w-4" />
                  <span className="text-sm">Billing & Insurance</span>
                </Link>
              </Button>
              <Button
                asChild
                variant="secondary"
                className="w-full justify-start h-auto py-3"
              >
                <Link href="/faq">
                  <QuestionFillIcon className="mr-3 h-4 w-4" />
                  <span className="text-sm">Frequently Asked Questions</span>
                </Link>
              </Button>
            </div>
          </MobileCard>
        </div>

        {/* Logout - Full width outside grid */}
        <div className="mt-6">
          <Card className="bg-muted/30">
            <CardContent className="p-4">
              <Button variant="destructive" size="sm" className="w-full" asChild>
                <Link href="/patient-portal">
                  <LogoutBoxLineIcon className="mr-2 h-4 w-4" />
                  Log Out
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </SectionWrapper>
    </>
  )
}

// Mobile-optimized card component
function MobileCard({
  title,
  icon,
  children,
  className = "",
  badge,
  href,
}: {
  title: string
  icon: React.ReactNode
  children: React.ReactNode
  className?: string
  badge?: string
  href?: string
}) {
  return (
    <Card className={`transition-all duration-200 hover:-translate-y-1 hover:shadow-lg focus-visible:-translate-y-1 focus-visible:shadow-lg ${className}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {icon}
            {href ? (
              <Link href={href} className="text-base font-semibold hover:underline focus:underline transition-colors">
                <CardTitle className="text-base cursor-pointer">{title}</CardTitle>
              </Link>
            ) : (
              <CardTitle className="text-base">{title}</CardTitle>
            )}
          </div>
          {badge && (
            <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
              {badge}
            </span>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-0">{children}</CardContent>
    </Card>
  )
} 