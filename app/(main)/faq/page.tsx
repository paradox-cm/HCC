import type { Metadata } from "next"
import { SectionWrapper } from "@/components/section-wrapper"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Houston Cardiology Consultants",
  description: "Find answers to common questions about appointments, services, insurance, and patient care at Houston Cardiology Consultants. Get the information you need about our cardiology practice.",
  keywords: "FAQ, frequently asked questions, cardiology questions, appointment questions, insurance questions, patient care",
  openGraph: {
    title: "Frequently Asked Questions | Houston Cardiology Consultants",
    description: "Find answers to common questions about appointments, services, insurance, and patient care at Houston Cardiology Consultants.",
  },
}

const faqCategories = [
  {
    title: "Appointments & Scheduling",
    items: [
      {
        q: "Do I need a referral to make an appointment?",
        a: "A referral is not required for most visits, but some insurance plans may require one. We recommend checking with your provider or calling our office for guidance.",
        link: { text: "Book an appointment", href: "/appointments" }
      },
      {
        q: "How do I schedule or reschedule an appointment?",
        a: "You can call us directly or use the contact form on our website to request an appointment or change your existing one. If you are enrolled in our Patient Portal, you can reschedule or cancel directly from your dashboard.",
        link: { text: "Contact us", href: "/appointments" }
      },
      {
        q: "How soon can I get an appointment?",
        a: "We strive to offer timely appointments, often within a few days, especially for urgent needs.",
        link: { text: "Book an appointment", href: "/appointments" }
      },
      {
        q: "Do you offer virtual appointments or telemedicine?",
        a: "Yes. HCC provides virtual visits for follow-ups, consultations, and selected services.",
        link: { text: "Book an appointment", href: "/appointments" }
      },
      {
        q: "What should I bring to my first appointment?",
        a: "Please bring your ID, insurance card, a list of medications, prior test results (if available), and any referral paperwork if required."
      },
      {
        q: "What is your cancellation policy?",
        a: "We understand that sometimes you need to reschedule. We kindly ask for at least 24 hours' notice for cancellations to avoid any fees. If you need to change your appointment, please call our office or use our chat service for assistance. If you are enrolled in our Patient Portal, you can reschedule or cancel directly from your dashboard.",
        link: { text: "Contact us", href: "/chat" }
      }
    ]
  },
  {
    title: "Services & Treatment",
    items: [
      {
        q: "What conditions do Houston Cardiology Consultants treat?",
        a: "We treat a wide range of cardiovascular conditions including hypertension, arrhythmias, coronary artery disease, heart failure, and peripheral vascular disease.",
        link: { text: "View all our services", href: "/services" }
      },
      {
        q: "What types of cardiac testing are offered at HCC?",
        a: "We offer a wide range of in-house diagnostic tests, including EKG, echocardiogram, stress testing, PET/CT scans, Doppler ultrasounds, and more.",
        link: { text: "View our services", href: "/services" }
      },
      {
        q: "Do you offer preventive cardiology services?",
        a: "Absolutely. We specialize in early detection, risk assessment, and lifestyle-based prevention strategies tailored to each patient.",
        link: { text: "View all our services", href: "/services" }
      },
      {
        q: "Can I get preoperative cardiac clearance at HCC?",
        a: "Yes, we provide preoperative cardiac evaluations for patients scheduled for surgery who need cardiology clearance.",
        link: { text: "Learn more about Specialized Services", href: "/services" }
      },
      {
        q: "What is the difference between invasive and non-invasive cardiology?",
        a: "Non-invasive cardiology involves diagnostic tests that do not enter the body, while invasive cardiology includes procedures like heart catheterizations. We offer both at HCC.",
        link: { text: "View our complete service list", href: "/services" }
      },
      {
        q: "Do you provide care for patients with pacemakers or defibrillators?",
        a: "Yes. We perform pacemaker and ICD checks, monitoring, and follow-up care.",
        link: { text: "Explore our Services", href: "/services" }
      },
      {
        q: "Do you treat vein conditions or perform vein ablations?",
        a: "Yes. We offer evaluation and treatment for venous insufficiency, including ablation therapy.",
        link: { text: "Explore our Services", href: "/services" }
      }
    ]
  },
  {
    title: "Patient Care & Support",
    items: [
      {
        q: "How do I access my test results?",
        a: "Your test results will be reviewed with you during your follow-up. We also offer access through our patient portal for convenience.",
        link: { text: "Enroll in the patient portal", href: "/patient-portal" }
      },
      {
        q: "What if I have an urgent question or concern after hours?",
        a: "Call our main number. An on-call physician is always available for urgent medical issues outside of regular hours.",
        link: { text: "Visit our Contact Page", href: "/contact" }
      },
      {
        q: "How can I communicate with my care team outside of appointments?",
        a: "You can call our office during business hours or use our secure patient portal for non-urgent messages."
      },
      {
        q: "Do you offer language assistance or translation services?",
        a: "Yes. We provide support for patients who prefer to communicate in Spanish and can arrange interpretation for other languages as needed."
      },
      {
        q: "What steps do you take to ensure patient safety and privacy?",
        a: "We follow all HIPAA guidelines and maintain strict protocols for infection control, medical record security, and patient confidentiality.",
        link: { text: "View our HIPAA Notice", href: "/hipaa" }
      },
      {
        q: "Can a family member or caregiver attend my appointment with me?",
        a: "Absolutely. We encourage family involvement and welcome a support person to accompany you during your visit."
      },
      {
        q: "How do I request a copy of my medical records?",
        a: "You can submit a request through our front desk or via the patient portal. We'll guide you through the HIPAA-compliant release process."
      },
      {
        q: "Do you help coordinate care with my primary care physician or other specialists?",
        a: "Yes. We collaborate closely with your healthcare team and share relevant findings and recommendations to ensure seamless care."
      },
      {
        q: "What accommodations are available for patients with mobility challenges?",
        a: "Both our locations are wheelchair accessible, and our staff is available to assist with check-in, transportation within the clinic, or any special needs."
      },
      {
        q: "Can I request reminders for my appointments or medication refills?",
        a: "Yes. We offer phone, email, or text reminders for appointments and can coordinate refills through our patient portal or pharmacy coordination."
      },
      {
        q: "How does HCC support ongoing wellness beyond treatment?",
        a: "We emphasize preventive care and long-term heart health through nutrition guidance, exercise recommendations, and ongoing cardiac wellness programs."
      }
    ]
  }
]

export default function FaqPage() {
  return (
    <>
      <SectionWrapper className="bg-muted/20">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl fade-in-up">Frequently Asked Questions</h1>
          <p className="mt-4 max-w-3xl mx-auto text-muted-foreground md:text-xl">
            Answers to common questions from our patients.
          </p>
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <div className="space-y-8 w-full max-w-4xl mx-auto">
          {faqCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="space-y-4">
              <h2 className="text-2xl font-semibold text-center">{category.title}</h2>
              <Accordion type="single" collapsible className="w-full">
                {category.items.map((item, itemIndex) => (
                  <AccordionItem key={itemIndex} value={`item-${categoryIndex}-${itemIndex}`}>
                    <AccordionTrigger className="text-left">{item.q}</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3">
                        <p>{item.a}</p>
                        {item.link && (
                          <Link 
                            href={item.link.href} 
                            className="text-primary hover:underline text-sm inline-flex items-center gap-1"
                          >
                            {item.link.text} →
                          </Link>
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="text-center border border-border p-8 rounded-lg">
            <h2 className="text-2xl font-bold">Billing & Insurance questions?</h2>
            <p className="mt-2 text-muted-foreground">Visit our Billing & Insurance page to learn more</p>
            <div className="mt-6 flex justify-center">
              <Button asChild>
                <Link href="/billing-and-insurance">Billing & Insurance</Link>
              </Button>
            </div>
          </div>

          <div className="text-center bg-muted p-8 rounded-lg">
            <h2 className="text-2xl font-bold">Didn't find what you need?</h2>
            <p className="mt-2 text-muted-foreground">Our team is here to help. Get in touch with us directly.</p>
            <div className="mt-6 flex justify-center gap-4">
              <Button asChild>
                <Link href="/contact">Contact Form</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/chat">Use our Chatbot</Link>
              </Button>
            </div>
          </div>
        </div>
      </SectionWrapper>
    </>
  )
}
