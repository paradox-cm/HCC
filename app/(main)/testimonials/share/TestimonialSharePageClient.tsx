"use client"

import { useState } from "react"
import { SectionWrapper } from "@/components/section-wrapper"
import { HeaderAnimation } from "@/components/HeaderAnimation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Heart, Star, User, MessageCircle, Shield, CheckCircle, AlertTriangle } from "lucide-react"
import Link from "next/link"

export default function TestimonialSharePageClient() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    age: "",
    doctor: "",
    service: "",
    rating: "",
    testimonial: "",
    consent: false,
    publicConsent: false,
    contactConsent: false
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const doctors = [
    { value: "dr-asif-ali", label: "Dr. Asif Ali" },
    { value: "dr-sajid-ali", label: "Dr. Sajid Ali" },
    { value: "dr-abdul-ali", label: "Dr. Abdul Ali" },
    { value: "any", label: "Any Doctor" },
    { value: "multiple", label: "Multiple Doctors" }
  ]

  const services = [
    { value: "consultation", label: "Initial Consultation" },
    { value: "follow-up", label: "Follow-up Care" },
    { value: "diagnostic", label: "Diagnostic Testing" },
    { value: "procedure", label: "Cardiac Procedure" },
    { value: "preventive", label: "Preventive Care" },
    { value: "emergency", label: "Emergency Care" },
    { value: "other", label: "Other" }
  ]

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required"
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.doctor) {
      newErrors.doctor = "Please select a doctor"
    }

    if (!formData.service) {
      newErrors.service = "Please select a service"
    }

    if (!formData.rating) {
      newErrors.rating = "Please provide a rating"
    }

    if (!formData.testimonial.trim()) {
      newErrors.testimonial = "Please share your experience"
    } else if (formData.testimonial.trim().length < 50) {
      newErrors.testimonial = "Please provide more details about your experience (at least 50 characters)"
    }

    if (!formData.consent) {
      newErrors.consent = "You must agree to the terms and conditions"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // In a real implementation, you would send the data to your backend
      console.log("Testimonial submitted:", formData)
      
      setIsSubmitted(true)
    } catch (error) {
      console.error("Error submitting testimonial:", error)
      setErrors({ submit: "There was an error submitting your testimonial. Please try again." })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }))
    }
  }

  if (isSubmitted) {
    return (
      <>
        <SectionWrapper className="bg-muted/20 pt-12 pb-12 relative overflow-hidden">
          <HeaderAnimation 
            type="gradient-flow" 
            intensity="medium" 
            colorScheme="green" 
            responsive={true}
            randomStart={true}
            speedMultiplier={1.1}
          />
          <div className="text-center relative z-10">
            <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold sm:text-5xl lg:text-6xl mb-4">Thank You!</h1>
            <p className="mt-4 max-w-3xl mx-auto text-muted-foreground md:text-xl">
              Your testimonial has been submitted successfully. We appreciate you taking the time to share your experience with us.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/">Return to Home</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/testimonials">View All Testimonials</Link>
              </Button>
            </div>
          </div>
        </SectionWrapper>
      </>
    )
  }

  return (
    <>
      <SectionWrapper className="bg-muted/20 pt-12 pb-12 relative overflow-hidden">
        <HeaderAnimation 
          type="gradient-flow" 
          intensity="medium" 
          colorScheme="green" 
          responsive={true}
          randomStart={true}
          speedMultiplier={1.1}
        />
        <div className="text-center relative z-10">
          <Heart className="h-16 w-16 text-red-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold sm:text-5xl lg:text-6xl mb-4">Share Your Story</h1>
          <p className="mt-4 max-w-3xl mx-auto text-muted-foreground md:text-xl">
            Your experience matters to us and helps other patients. Share your journey with Houston Cardiology Consultants.
          </p>
        </div>
      </SectionWrapper>

      <SectionWrapper className="pt-0">
        <div className="w-full max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <MessageCircle className="h-6 w-6 text-blue-600" />
                Patient Testimonial Form
              </CardTitle>
              <CardDescription>
                Please share your experience with our cardiology team. Your feedback helps us improve and assists other patients in their healthcare decisions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <User className="h-5 w-5 text-blue-600" />
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        placeholder="Your first name"
                        className={errors.firstName ? "border-red-500" : ""}
                      />
                      {errors.firstName && (
                        <p className="text-sm text-red-600 mt-1">{errors.firstName}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        placeholder="Your last name"
                        className={errors.lastName ? "border-red-500" : ""}
                      />
                      {errors.lastName && (
                        <p className="text-sm text-red-600 mt-1">{errors.lastName}</p>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="your.email@example.com"
                        className={errors.email ? "border-red-500" : ""}
                      />
                      {errors.email && (
                        <p className="text-sm text-red-600 mt-1">{errors.email}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number (Optional)</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        placeholder="(555) 123-4567"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="age">Age Range (Optional)</Label>
                    <Select value={formData.age} onValueChange={(value) => handleInputChange("age", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select age range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="18-30">18-30</SelectItem>
                        <SelectItem value="31-45">31-45</SelectItem>
                        <SelectItem value="46-60">46-60</SelectItem>
                        <SelectItem value="61-75">61-75</SelectItem>
                        <SelectItem value="76+">76+</SelectItem>
                        <SelectItem value="prefer-not">Prefer not to say</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Care Experience */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Heart className="h-5 w-5 text-red-600" />
                    Your Care Experience
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="doctor">Doctor *</Label>
                      <Select value={formData.doctor} onValueChange={(value) => handleInputChange("doctor", value)}>
                        <SelectTrigger className={errors.doctor ? "border-red-500" : ""}>
                          <SelectValue placeholder="Select your doctor" />
                        </SelectTrigger>
                        <SelectContent>
                          {doctors.map((doctor) => (
                            <SelectItem key={doctor.value} value={doctor.value}>
                              {doctor.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.doctor && (
                        <p className="text-sm text-red-600 mt-1">{errors.doctor}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="service">Service Received *</Label>
                      <Select value={formData.service} onValueChange={(value) => handleInputChange("service", value)}>
                        <SelectTrigger className={errors.service ? "border-red-500" : ""}>
                          <SelectValue placeholder="Select service" />
                        </SelectTrigger>
                        <SelectContent>
                          {services.map((service) => (
                            <SelectItem key={service.value} value={service.value}>
                              {service.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.service && (
                        <p className="text-sm text-red-600 mt-1">{errors.service}</p>
                      )}
                    </div>
                  </div>
                  <div>
                    <Label>Overall Rating *</Label>
                    <RadioGroup value={formData.rating} onValueChange={(value) => handleInputChange("rating", value)} className="flex gap-4 mt-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <div key={star} className="flex items-center space-x-2">
                          <RadioGroupItem value={star.toString()} id={`rating-${star}`} />
                          <Label htmlFor={`rating-${star}`} className="flex items-center gap-1 cursor-pointer">
                            <span>{star}</span>
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                    {errors.rating && (
                      <p className="text-sm text-red-600 mt-1">{errors.rating}</p>
                    )}
                  </div>
                </div>

                {/* Testimonial */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <MessageCircle className="h-5 w-5 text-green-600" />
                    Your Story
                  </h3>
                  <div>
                    <Label htmlFor="testimonial">Share Your Experience *</Label>
                    <Textarea
                      id="testimonial"
                      value={formData.testimonial}
                      onChange={(e) => handleInputChange("testimonial", e.target.value)}
                      placeholder="Please share your experience with our cardiology team. What brought you to us? How was your care experience? What would you like others to know about your treatment journey?"
                      rows={6}
                      className={errors.testimonial ? "border-red-500" : ""}
                    />
                    <p className="text-sm text-muted-foreground mt-1">
                      Minimum 50 characters. Please be specific about your experience while respecting patient privacy.
                    </p>
                    {errors.testimonial && (
                      <p className="text-sm text-red-600 mt-1">{errors.testimonial}</p>
                    )}
                  </div>
                </div>

                {/* Privacy & Consent */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Shield className="h-5 w-5 text-purple-600" />
                    Privacy & Consent
                  </h3>
                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      Your privacy is important to us. We will never share your personal information without your explicit consent.
                    </AlertDescription>
                  </Alert>
                  
                  <div className="space-y-3">
                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="consent"
                        checked={formData.consent}
                        onCheckedChange={(checked) => handleInputChange("consent", !!checked)}
                        className="mt-1"
                      />
                      <Label htmlFor="consent" className="text-sm leading-relaxed">
                        I agree to the <Link href="/terms-of-use" className="text-blue-600 hover:underline">Terms of Use</Link> and <Link href="/privacy-policy" className="text-blue-600 hover:underline">Privacy Policy</Link> *
                      </Label>
                    </div>
                    {errors.consent && (
                      <p className="text-sm text-red-600">{errors.consent}</p>
                    )}

                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="publicConsent"
                        checked={formData.publicConsent}
                        onCheckedChange={(checked) => handleInputChange("publicConsent", !!checked)}
                        className="mt-1"
                      />
                      <Label htmlFor="publicConsent" className="text-sm leading-relaxed">
                        I consent to have my testimonial published on the website (your name will be displayed as provided)
                      </Label>
                    </div>

                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="contactConsent"
                        checked={formData.contactConsent}
                        onCheckedChange={(checked) => handleInputChange("contactConsent", !!checked)}
                        className="mt-1"
                      />
                      <Label htmlFor="contactConsent" className="text-sm leading-relaxed">
                        I consent to be contacted for follow-up questions about my testimonial (optional)
                      </Label>
                    </div>
                  </div>
                </div>

                {errors.submit && (
                  <Alert className="border-red-500 bg-red-50 dark:bg-red-950/20">
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                    <AlertDescription className="text-red-700 dark:text-red-300">
                      {errors.submit}
                    </AlertDescription>
                  </Alert>
                )}

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="flex-1"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Testimonial"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    asChild
                  >
                    <Link href="/testimonials">View All Testimonials</Link>
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </SectionWrapper>
    </>
  )
}
