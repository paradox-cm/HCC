import type { Metadata } from "next"
import { SectionWrapper } from "@/components/section-wrapper"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Patient Portal | Houston Cardiology Consultants",
  description: "Access your medical records, test results, and communicate securely with your care team through the Houston Cardiology Consultants Patient Portal.",
}

export default function PatientPortalPage() {
  return (
    <SectionWrapper>
      <div className="flex justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Patient Portal</CardTitle>
            <CardDescription>
              Access your medical records, test results, and communicate securely with your care team.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="username">Username or Email</Label>
                <Input id="username" placeholder="your-email@example.com" />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" />
              </div>
              <Button className="w-full" asChild>
                <Link href="/patient-portal/dashboard">Login</Link>
              </Button>
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">New to the portal?</span>
                </div>
              </div>
              <Button variant="outline" className="w-full bg-transparent" asChild>
                <Link href="/patient-portal/register">Register for Access</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </SectionWrapper>
  )
}
