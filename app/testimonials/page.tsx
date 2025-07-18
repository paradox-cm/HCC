import { SectionWrapper } from "@/components/section-wrapper"
import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function TestimonialsPage() {
  return (
    <>
      <SectionWrapper className="bg-muted/20">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">Patient Testimonials</h1>
          <p className="mt-4 max-w-3xl mx-auto text-muted-foreground md:text-xl">
            Hear directly from our patients about their experiences at Houston Cardiology Consultants.
          </p>
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <TestimonialCard
            quote="The care I received at HCC was exceptional. The doctors are incredibly knowledgeable and truly compassionate. I felt heard and understood throughout my entire treatment."
            author="Jane D."
            rating={5}
          />
          <TestimonialCard
            quote="From scheduling to follow-up, everything was seamless. The staff is friendly, and Dr. Ali explained my condition in a way I could easily understand. Highly recommend!"
            author="Robert S."
            rating={5}
          />
          <TestimonialCard
            quote="I appreciate the personalized approach. They didn't just treat my symptoms; they helped me understand how to improve my overall heart health for the long term."
            author="Maria P."
            rating={4}
          />
          <TestimonialCard
            quote="The telemedicine option was a lifesaver for my busy schedule. Quality care without having to leave my home. Thank you, HCC!"
            author="David L."
            rating={5}
          />
          <TestimonialCard
            quote="Professional and caring. They took the time to answer all my questions and made me feel comfortable. A truly patient-first practice."
            author="Sarah K."
            rating={5}
          />
          <TestimonialCard
            quote="Excellent diagnostic services. They quickly identified my issue and started me on the right treatment path. Feeling much better now."
            author="Michael B."
            rating={4}
          />
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <div className="text-center bg-muted p-8 rounded-lg">
          <h2 className="text-2xl font-bold">Share Your Experience</h2>
          <p className="mt-2 text-muted-foreground">
            We'd love to hear about your experience with Houston Cardiology Consultants.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <Button asChild>
              <Link href="/contact">Share Your Story</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/patient-portal">Patient Portal</Link>
            </Button>
          </div>
        </div>
      </SectionWrapper>
    </>
  )
}

function TestimonialCard({ quote, author, rating }: { quote: string; author: string; rating: number }) {
  return (
    <Card className="h-full flex flex-col">
      <CardContent className="p-6 flex-grow">
        <div className="flex mb-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className={`h-5 w-5 ${i < rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`} />
          ))}
        </div>
        <p className="text-muted-foreground italic leading-relaxed">"{quote}"</p>
      </CardContent>
      <div className="px-6 pb-6 pt-0">
        <p className="font-semibold text-sm">- {author}</p>
      </div>
    </Card>
  )
}
