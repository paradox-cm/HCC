import { SectionWrapper } from "@/components/section-wrapper"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const faqItems = [
  {
    q: "What should I bring to my first appointment?",
    a: "Please bring your photo ID, insurance card, a list of current medications, and any relevant medical records.",
  },
  {
    q: "How do I prepare for a stress test?",
    a: "You will receive specific instructions, but generally, you should avoid caffeine and wear comfortable clothing and shoes.",
  },
  {
    q: "Can I get my test results online?",
    a: "Yes, most test results are available through our secure Patient Portal within a few business days.",
  },
  {
    q: "What is your cancellation policy?",
    a: "We require at least 24 hours' notice for cancellations to avoid a fee. Please call our office to reschedule.",
  },
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
        <Accordion type="single" collapsible className="w-full max-w-4xl mx-auto">
          {faqItems.map((item, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger className="text-left">{item.q}</AccordionTrigger>
              <AccordionContent>{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </SectionWrapper>

      <SectionWrapper>
        <div className="text-center bg-muted p-8 rounded-lg">
          <h2 className="text-2xl font-bold">Didn't find what you need?</h2>
          <p className="mt-2 text-muted-foreground">Our team is here to help. Get in touch with us directly.</p>
          <div className="mt-6 flex justify-center gap-4">
            <Button asChild>
              <Link href="/contact">Contact Form</Link>
            </Button>
            <Button variant="outline">Use our Chatbot</Button>
          </div>
        </div>
      </SectionWrapper>
    </>
  )
}
