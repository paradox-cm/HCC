import type React from "react"
import { SectionWrapper } from "@/components/section-wrapper"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Calendar,
  Mail,
  FileText,
  Pill,
  HeartPulse,
  DollarSign,
  MessageSquare,
  ClipboardList,
  Download,
  Upload,
  LogOut,
  HelpCircle,
  MessageCircle,
} from "lucide-react"
import Link from "next/link"

export default function PatientPortalDashboard() {
  const patientName = "Jane" // Placeholder for patient name

  return (
    <>
      <SectionWrapper className="bg-muted/20 pt-8 pb-8 sm:pt-10 sm:pb-10 md:pt-12 md:pb-12">
        <div className="px-2 sm:px-4 md:px-8 max-w-7xl mx-auto">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tighter">Welcome, {patientName}</h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-1 sm:mt-2">
            Last Login: {new Date().toLocaleString()} | Your health information is securely stored and accessible 24/7.
          </p>
        </div>
      </SectionWrapper>

      <SectionWrapper className="pt-0">
        <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {/* Upcoming Appointments */}
          <DashboardCard
            title="Upcoming Appointments"
            icon={<Calendar className="h-6 w-6 text-primary" />}
            description="Your next scheduled visit."
          >
            <div className="space-y-2">
              <p className="font-semibold">Next Visit:</p>
              <p>July 25, 2025, 10:00 AM</p>
              <p>Heart Health Way Clinic</p>
              <p>Dr. Asif Ali</p>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Tip: Arrive 15 minutes early and bring your medication list.
            </p>
            <CardFooter className="p-0 pt-4 flex gap-2">
              <Button size="sm" variant="outline">
                Reschedule
              </Button>
              <Button size="sm" variant="ghost">
                Cancel
              </Button>
            </CardFooter>
          </DashboardCard>

          {/* Messages & Alerts */}
          <DashboardCard
            title="Messages & Alerts"
            icon={<Mail className="h-6 w-6 text-primary" />}
            description="Recent communications from your care team."
          >
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Mail className="h-4 w-4 mt-1 flex-shrink-0" />
                <span>New message from Dr. Asif Ali – “Your test results are available.”</span>
              </li>
              <li className="flex items-start gap-2">
                <Pill className="h-4 w-4 mt-1 flex-shrink-0" />
                <span>Upcoming refill due in 5 days.</span>
              </li>
            </ul>
            <CardFooter className="p-0 pt-4">
              <Button size="sm" variant="default" className="w-full">
                View All Messages
              </Button>
            </CardFooter>
          </DashboardCard>

          {/* Documents & Test Results */}
          <DashboardCard
            title="Documents & Results"
            icon={<FileText className="h-6 w-6 text-primary" />}
            description="Access your medical files."
          >
            <ul className="space-y-3">
              <li className="flex justify-between items-center">
                <span>Cardiac Stress Test</span>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <FileText className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </li>
              <li className="flex justify-between items-center">
                <span>Lab Results</span>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <FileText className="h-4 w-4" />
                  </Button>
                </div>
              </li>
            </ul>
            <CardFooter className="p-0 pt-4 flex gap-2">
              <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                <Upload className="mr-2 h-4 w-4" /> Upload File
              </Button>
            </CardFooter>
          </DashboardCard>

          {/* Prescription Management */}
          <DashboardCard
            title="Prescriptions"
            icon={<Pill className="h-6 w-6 text-primary" />}
            description="Manage your active medications."
          >
            <ul className="space-y-3">
              <li className="flex justify-between items-center">
                <span>Metoprolol 50mg</span>
                <Button size="sm" variant="secondary">
                  Request Refill
                </Button>
              </li>
              <li className="flex justify-between items-center">
                <span>Atorvastatin 20mg</span>
                <span className="text-sm text-muted-foreground">Ongoing</span>
              </li>
            </ul>
            <CardFooter className="p-0 pt-4">
              <Button size="sm" variant="outline" className="w-full bg-transparent">
                View Pharmacy Info
              </Button>
            </CardFooter>
          </DashboardCard>

          {/* Care Summary & Visits */}
          <DashboardCard
            title="Care Summary"
            icon={<HeartPulse className="h-6 w-6 text-primary" />}
            description="Your health overview and visit history."
          >
            <Button variant="link" className="p-0 h-auto">
              View Care Plan Overview
            </Button>
            <p className="font-semibold mt-2">Visit History:</p>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
              <li>June 20, 2025 – Echocardiogram Follow-Up</li>
              <li>May 14, 2025 – Preventive Heart Evaluation</li>
            </ul>
            <CardFooter className="p-0 pt-4">
              <Button size="sm" variant="outline" className="w-full bg-transparent">
                <Download className="mr-2 h-4 w-4" /> Download Full Visit Summary
              </Button>
            </CardFooter>
          </DashboardCard>

          {/* Billing & Insurance */}
          <DashboardCard
            title="Billing & Insurance"
            icon={<DollarSign className="h-6 w-6 text-primary" />}
            description="Manage payments and insurance."
          >
            <div className="flex justify-between items-center">
              <span className="font-semibold">Outstanding Balance:</span>
              <span>$0.00</span>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="font-semibold">Insurance on File:</span>
              <span className="text-sm">Aetna</span>
            </div>
            <CardFooter className="p-0 pt-4 flex gap-2">
              <Button size="sm" variant="default" className="flex-1">
                Pay Now
              </Button>
              <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                Update Insurance
              </Button>
            </CardFooter>
          </DashboardCard>

          {/* Secure Messaging */}
          <DashboardCard
            title="Secure Messaging"
            icon={<MessageSquare className="h-6 w-6 text-primary" />}
            description="Start a conversation with our team."
          >
            <div className="space-y-2">
              <Button variant="secondary" className="w-full justify-start">
                With Your Cardiologist
              </Button>
              <Button variant="secondary" className="w-full justify-start">
                With Billing Department
              </Button>
              <Button variant="secondary" className="w-full justify-start">
                With Care Team Coordinator
              </Button>
            </div>
            <CardFooter className="p-0 pt-4">
              <Button size="sm" variant="default" className="w-full">
                Compose Message
              </Button>
            </CardFooter>
          </DashboardCard>

          {/* Forms & Requests */}
          <DashboardCard
            title="Forms & Requests"
            icon={<ClipboardList className="h-6 w-6 text-primary" />}
            description="Quick access to common forms."
          >
            <div className="space-y-2">
              <Button variant="link" className="p-0 h-auto w-full justify-start">
                Appointment Request
              </Button>
              <Button variant="link" className="p-0 h-auto w-full justify-start">
                Prescription Renewal
              </Button>
              <Button variant="link" className="p-0 h-auto w-full justify-start">
                Preoperative Clearance
              </Button>
              <Button variant="link" className="p-0 h-auto w-full justify-start">
                Upload Medical Records
              </Button>
            </div>
          </DashboardCard>

          {/* Help & Logout */}
          <Card className="md:col-span-2 lg:col-span-3 bg-muted/50">
            <CardContent className="p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button variant="outline" size="sm">
                  <MessageCircle className="mr-2 h-4 w-4" /> Live Chat Support
                </Button>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/faq">
                    <HelpCircle className="mr-2 h-4 w-4" /> FAQs
                  </Link>
                </Button>
              </div>
              <Button variant="destructive" size="sm" asChild>
                <Link href="/patient-portal">
                  <LogOut className="mr-2 h-4 w-4" /> Log Out
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </SectionWrapper>
    </>
  )
}

// Reusable Dashboard Card Component
function DashboardCard({
  title,
  icon,
  description,
  children,
}: {
  title: string
  icon: React.ReactNode
  description: string
  children: React.ReactNode
}) {
  return (
    <Card className="flex flex-col">
      <CardHeader className="p-4 sm:p-6">
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Responsive icon size */}
          <span className="text-xl sm:text-2xl">{icon}</span>
          <CardTitle className="text-lg sm:text-xl md:text-2xl">{title}</CardTitle>
        </div>
        <CardDescription className="text-xs sm:text-sm">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow p-4 pt-0 sm:p-6 sm:pt-0">{children}</CardContent>
    </Card>
  )
}
