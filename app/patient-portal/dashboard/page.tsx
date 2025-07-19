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
  ChevronRight,
  Clock,
  User,
  CreditCard,
} from "lucide-react"
import Link from "next/link"

export default function PatientPortalDashboard() {
  const patientName = "Jane" // Placeholder for patient name

  return (
    <>
      {/* Mobile-optimized header */}
      <SectionWrapper className="bg-muted/20 pt-6 pb-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
            <User className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">Welcome back, {patientName}</h1>
            <p className="text-sm text-muted-foreground">Last login: {new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper className="pt-0">
        
        {/* Quick Actions - Mobile: 2x2 grid, Desktop: horizontal scroll */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Quick Actions</h2>
          
          {/* Mobile: 2x2 Grid */}
          <div className="grid grid-cols-2 gap-3 md:hidden">
            <Button variant="default" className="h-16 flex-col gap-2 p-3">
              <Calendar className="h-5 w-5" />
              <span className="text-sm font-medium">Book Appointment</span>
            </Button>
            <Button variant="outline" className="h-16 flex-col gap-2 p-3">
              <MessageSquare className="h-5 w-5" />
              <span className="text-sm font-medium">Message</span>
            </Button>
            <Button variant="outline" className="h-16 flex-col gap-2 p-3">
              <Pill className="h-5 w-5" />
              <span className="text-sm font-medium">Refill Rx</span>
            </Button>
            <Button variant="outline" className="h-16 flex-col gap-2 p-3">
              <FileText className="h-5 w-5" />
              <span className="text-sm font-medium">View Results</span>
            </Button>
          </div>

          {/* Desktop/Tablet: Horizontal Scroll */}
          <div className="hidden md:flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            <Button size="sm" variant="default" className="flex-shrink-0 px-4 py-2">
              <Calendar className="mr-2 h-4 w-4" />
              Book Appointment
            </Button>
            <Button size="sm" variant="outline" className="flex-shrink-0 px-4 py-2">
              <MessageSquare className="mr-2 h-4 w-4" />
              Message
            </Button>
            <Button size="sm" variant="outline" className="flex-shrink-0 px-4 py-2">
              <Pill className="mr-2 h-4 w-4" />
              Refill Rx
            </Button>
            <Button size="sm" variant="outline" className="flex-shrink-0 px-4 py-2">
              <FileText className="mr-2 h-4 w-4" />
              View Results
            </Button>
          </div>
        </div>

        {/* Cards Grid - Mobile: single column, Tablet: 2 columns, Desktop: 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">

          {/* Next Appointment - Prominent placement */}
          <MobileCard
            title="Next Appointment"
            icon={<Calendar className="h-5 w-5 text-primary" />}
            className="bg-primary/5 border-primary/20"
          >
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Clock className="h-4 w-4 mt-1 text-muted-foreground" />
                <div className="flex-1">
                  <p className="font-semibold text-base">July 25, 2025 • 10:00 AM</p>
                  <p className="text-sm text-muted-foreground">Dr. Asif Ali • Heart Health Way Clinic</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="default" className="flex-1">
                  Reschedule
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  Cancel
                </Button>
              </div>
            </div>
          </MobileCard>

          {/* Messages & Alerts */}
          <MobileCard
            title="Messages & Alerts"
            icon={<Mail className="h-5 w-5 text-primary" />}
            badge="2 new"
          >
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                <Mail className="h-4 w-4 mt-1 text-primary" />
                <div className="flex-1">
                  <p className="font-medium text-sm">New message from Dr. Asif Ali</p>
                  <p className="text-xs text-muted-foreground">Your test results are available</p>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                <Pill className="h-4 w-4 mt-1 text-primary" />
                <div className="flex-1">
                  <p className="font-medium text-sm">Prescription refill due</p>
                  <p className="text-xs text-muted-foreground">Metoprolol refill in 5 days</p>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
            <Button variant="link" className="p-0 h-auto text-sm mt-3">
              View all messages →
            </Button>
          </MobileCard>

          {/* Documents & Results */}
          <MobileCard
            title="Documents & Results"
            icon={<FileText className="h-5 w-5 text-primary" />}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div>
                  <p className="font-medium text-sm">Cardiac Stress Test</p>
                  <p className="text-xs text-muted-foreground">Available • July 20, 2025</p>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <FileText className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div>
                  <p className="font-medium text-sm">Lab Results</p>
                  <p className="text-xs text-muted-foreground">Available • July 18, 2025</p>
                </div>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <FileText className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <Button variant="outline" size="sm" className="w-full mt-3">
              <Upload className="mr-2 h-4 w-4" />
              Upload File
            </Button>
          </MobileCard>

          {/* Prescriptions */}
          <MobileCard
            title="Active Prescriptions"
            icon={<Pill className="h-5 w-5 text-primary" />}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div>
                  <p className="font-medium text-sm">Metoprolol 50mg</p>
                  <p className="text-xs text-muted-foreground">Take 1 tablet daily</p>
                </div>
                <Button size="sm" variant="secondary">
                  Refill
                </Button>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div>
                  <p className="font-medium text-sm">Atorvastatin 20mg</p>
                  <p className="text-xs text-muted-foreground">Take 1 tablet daily</p>
                </div>
                <span className="text-xs text-muted-foreground">Ongoing</span>
              </div>
            </div>
            <Button variant="outline" size="sm" className="w-full mt-3">
              View Pharmacy Info
            </Button>
          </MobileCard>

          {/* Billing & Insurance */}
          <MobileCard
            title="Billing & Insurance"
            icon={<DollarSign className="h-5 w-5 text-primary" />}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div>
                  <p className="font-medium text-sm">Outstanding Balance</p>
                  <p className="text-xs text-muted-foreground">All accounts current</p>
                </div>
                <span className="text-lg font-bold text-green-600">$0.00</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div>
                  <p className="font-medium text-sm">Insurance</p>
                  <p className="text-xs text-muted-foreground">Aetna • Active</p>
                </div>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
            <div className="flex gap-2 mt-3">
              <Button size="sm" variant="default" className="flex-1">
                Pay Now
              </Button>
              <Button size="sm" variant="outline" className="flex-1">
                Update Insurance
              </Button>
            </div>
          </MobileCard>

          {/* Care Summary */}
          <MobileCard
            title="Care Summary"
            icon={<HeartPulse className="h-5 w-5 text-primary" />}
          >
            <div className="space-y-3">
              <Button variant="link" className="p-0 h-auto text-sm">
                View Care Plan Overview →
              </Button>
              <div className="space-y-2">
                <p className="font-medium text-sm">Recent Visits</p>
                <div className="space-y-2">
                  <div className="p-3 bg-muted/30 rounded-lg">
                    <p className="font-medium text-sm">June 20, 2025</p>
                    <p className="text-xs text-muted-foreground">Echocardiogram Follow-Up</p>
                  </div>
                  <div className="p-3 bg-muted/30 rounded-lg">
                    <p className="font-medium text-sm">May 14, 2025</p>
                    <p className="text-xs text-muted-foreground">Preventive Heart Evaluation</p>
                  </div>
                </div>
              </div>
            </div>
            <Button variant="outline" size="sm" className="w-full mt-3">
              <Download className="mr-2 h-4 w-4" />
              Download Visit Summary
            </Button>
          </MobileCard>

          {/* Quick Forms */}
          <MobileCard
            title="Quick Forms"
            icon={<ClipboardList className="h-5 w-5 text-primary" />}
          >
            <div className="space-y-2">
              <Button variant="ghost" className="w-full justify-start h-auto py-3">
                <div className="flex items-center justify-between w-full">
                  <span className="text-sm">Appointment Request</span>
                  <ChevronRight className="h-4 w-4" />
                </div>
              </Button>
              <Button variant="ghost" className="w-full justify-start h-auto py-3">
                <div className="flex items-center justify-between w-full">
                  <span className="text-sm">Prescription Renewal</span>
                  <ChevronRight className="h-4 w-4" />
                </div>
              </Button>
              <Button variant="ghost" className="w-full justify-start h-auto py-3">
                <div className="flex items-center justify-between w-full">
                  <span className="text-sm">Preoperative Clearance</span>
                  <ChevronRight className="h-4 w-4" />
                </div>
              </Button>
              <Button variant="ghost" className="w-full justify-start h-auto py-3">
                <div className="flex items-center justify-between w-full">
                  <span className="text-sm">Upload Medical Records</span>
                  <ChevronRight className="h-4 w-4" />
                </div>
              </Button>
            </div>
          </MobileCard>

          {/* Help & Support */}
          <MobileCard
            title="Help & Support"
            icon={<HelpCircle className="h-5 w-5 text-primary" />}
          >
            <div className="space-y-3">
              <Button variant="secondary" className="w-full justify-start h-auto py-3">
                <MessageCircle className="mr-3 h-4 w-4" />
                <span className="text-sm">Live Chat Support</span>
              </Button>
              <Button variant="ghost" className="w-full justify-start h-auto py-3" asChild>
                <Link href="/faq">
                  <HelpCircle className="mr-3 h-4 w-4" />
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
                  <LogOut className="mr-2 h-4 w-4" />
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
}: {
  title: string
  icon: React.ReactNode
  children: React.ReactNode
  className?: string
  badge?: string
}) {
  return (
    <Card className={`${className}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {icon}
            <CardTitle className="text-base">{title}</CardTitle>
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
