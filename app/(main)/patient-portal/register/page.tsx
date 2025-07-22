"use client"

import { useState } from "react"
import { SectionWrapper } from "@/components/section-wrapper"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, CheckCircle } from "lucide-react"
import Link from "next/link"

const steps = ["Verify Identity", "Create Account", "Review & Consent", "Complete"]

export default function RegisterPage() {
  const [step, setStep] = useState(1)

  const handleNext = () => setStep((prev) => prev + 1)
  const handleBack = () => setStep((prev) => prev - 1)

  return (
    <SectionWrapper>
      <div className="flex justify-center">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle className="text-2xl">Create Your Portal Account</CardTitle>
            <CardDescription>Follow the steps below to securely register for portal access.</CardDescription>
            <div className="pt-4">
              <ProgressIndicator currentStep={step} totalSteps={steps.length} />
            </div>
          </CardHeader>
          <CardContent>
            {step === 1 && <Step1IdentityVerification />}
            {step === 2 && <Step2AccountCreation />}
            {step === 3 && <Step3Consent />}
            {step === 4 && <Step4Confirmation />}
          </CardContent>
          <CardFooter className="flex justify-between">
            {step > 1 && step < 4 && (
              <Button variant="outline" onClick={handleBack}>
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Button>
            )}
            {step < 3 && <Button onClick={handleNext}>Continue</Button>}
            {step === 3 && <Button onClick={handleNext}>Finish Registration</Button>}
          </CardFooter>
        </Card>
      </div>
    </SectionWrapper>
  )
}

function ProgressIndicator({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) {
  return (
    <div className="flex items-center gap-2">
      {steps.map((label, index) => (
        <div key={label} className="flex items-center gap-2 flex-1">
          <div
            className={`h-8 w-8 rounded-full flex items-center justify-center font-bold text-sm ${
              index + 1 < currentStep
                ? "bg-primary text-primary-foreground"
                : index + 1 === currentStep
                  ? "bg-primary/80 text-primary-foreground border-2 border-primary"
                  : "bg-muted text-muted-foreground"
            }`}
          >
            {index + 1 < currentStep ? <CheckCircle className="h-5 w-5" /> : index + 1}
          </div>
          <span
            className={`text-xs font-medium hidden sm:inline ${index + 1 === currentStep ? "text-primary" : "text-muted-foreground"}`}
          >
            {label}
          </span>
          {index < totalSteps - 1 && <div className="flex-1 h-1 bg-muted rounded-full" />}
        </div>
      ))}
    </div>
  )
}

function Step1IdentityVerification() {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Step 1: Verify Your Identity</h3>
      <p className="text-sm text-muted-foreground">
        Please enter your information exactly as it appears in our records. This helps us securely connect you to your
        medical chart.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="first-name">First Name</Label>
          <Input id="first-name" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="last-name">Last Name</Label>
          <Input id="last-name" />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="dob">Date of Birth</Label>
        <Input id="dob" type="date" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="mrn">Medical Record Number (MRN)</Label>
        <Input id="mrn" />
        <p className="text-xs text-muted-foreground">
          You can find your MRN on your after-visit summary or a recent bill.
        </p>
      </div>
    </div>
  )
}

function Step2AccountCreation() {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Step 2: Create Your Account</h3>
      <p className="text-sm text-muted-foreground">
        Choose a secure password and set up security questions for account recovery.
      </p>
      <div className="space-y-2">
        <Label htmlFor="email">Email Address (this will be your username)</Label>
        <Input id="email" type="email" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="password">Create Password</Label>
          <Input id="password" type="password" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirm-password">Confirm Password</Label>
          <Input id="confirm-password" type="password" />
        </div>
      </div>
      <p className="text-xs text-muted-foreground">
        Password must be at least 8 characters long and include one uppercase letter, one lowercase letter, one number,
        and one special character.
      </p>
      <div className="space-y-2">
        <Label htmlFor="security-q1">Security Question 1</Label>
        <Select>
          <SelectTrigger id="security-q1">
            <SelectValue placeholder="Select a question" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="mother-maiden">What is your mother's maiden name?</SelectItem>
            <SelectItem value="first-pet">What was the name of your first pet?</SelectItem>
            <SelectItem value="birth-city">In what city were you born?</SelectItem>
          </SelectContent>
        </Select>
        <Input placeholder="Your Answer" />
      </div>
    </div>
  )
}

function Step3Consent() {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Step 3: Review & Consent</h3>
      <p className="text-sm text-muted-foreground">
        Please review the following documents and provide your consent to continue.
      </p>
      <div className="space-y-4">
        <div>
          <h4 className="font-medium">Terms of Use</h4>
          <div className="h-32 overflow-y-auto border rounded-md p-2 mt-2 text-xs text-muted-foreground">
            <p>
              Placeholder for Terms of Use... Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
              ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
              voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
              proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </div>
        <div>
          <h4 className="font-medium">HIPAA Notice of Privacy Practices</h4>
          <div className="h-32 overflow-y-auto border rounded-md p-2 mt-2 text-xs text-muted-foreground">
            <p>
              Placeholder for HIPAA Notice... Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
              ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
              voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
              proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-start space-x-2">
        <Checkbox id="consent-check" />
        <Label htmlFor="consent-check" className="text-sm">
          I have read and agree to the Terms of Use and acknowledge receipt of the HIPAA Notice of Privacy Practices.
        </Label>
      </div>
    </div>
  )
}

function Step4Confirmation() {
  return (
    <div className="text-center py-8">
      <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
      <h3 className="text-2xl font-bold">Registration Complete!</h3>
      <p className="text-muted-foreground mt-2">
        Your account has been successfully created. You can now log in to access your health information.
      </p>
      <Button asChild className="mt-6">
        <Link href="/patient-portal">Go to Login</Link>
      </Button>
    </div>
  )
}
