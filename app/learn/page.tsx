"use client"

import { useState } from "react"
import { SectionWrapper } from "@/components/section-wrapper"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Video } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

const categories = [
  {
    name: "Heart Basics",
    description: "Foundational knowledge for understanding how your heart works.",
  },
  {
    name: "Prevention & Risk Factors",
    description: "Learn how to lower your risk of heart disease with lifestyle and screening.",
  },
  {
    name: "Lifestyle & Nutrition",
    description: "Evidence-based advice for building heart-healthy habits.",
  },
  {
    name: "Tests & Diagnostics",
    description: "Demystifying common cardiac tests so you know what to expect.",
  },
  {
    name: "Treatment & Recovery",
    description: "What happens after diagnosis—from medications to rehab.",
  },
  {
    name: "Special Conditions & Syndromes",
    description: "Focused explainers on conditions we treat, including complex cases.",
  },
  {
    name: "Navigating Care",
    description: "Guidance for patients managing chronic cardiac conditions.",
  },
]

const videos = [
  // Heart Basics
  {
    title: "Understanding High Blood Pressure",
    description: "What it means, how it's diagnosed, and how it impacts your heart.",
    category: "Heart Basics",
  },
  {
    title: "What is Coronary Artery Disease?",
    description: "How plaque builds in arteries and why it matters.",
    category: "Heart Basics",
  },
  {
    title: "The Anatomy of the Heart",
    description: "A visual guide to your heart's structure and function.",
    category: "Heart Basics",
  },
  {
    title: "Heart Rate vs. Blood Pressure: What's the Difference?",
    description: "Clarifying two of the most important health metrics.",
    category: "Heart Basics",
  },
  // Prevention & Risk Factors
  {
    title: "Preventing a Heart Attack",
    description: "Recognizing early warning signs and prevention strategies.",
    category: "Prevention & Risk Factors",
  },
  {
    title: "Family History and Heart Disease",
    description: "What you should know if heart disease runs in your family.",
    category: "Prevention & Risk Factors",
  },
  {
    title: "Cholesterol 101",
    description: "Understanding LDL, HDL, and triglycerides.",
    category: "Prevention & Risk Factors",
  },
  {
    title: "How Stress Affects Your Heart",
    description: "The connection between emotional health and cardiac risk.",
    category: "Prevention & Risk Factors",
  },
  {
    title: "Screenings You Shouldn’t Skip",
    description: "Key tests for early detection and peace of mind.",
    category: "Prevention & Risk Factors",
  },
  // Lifestyle & Nutrition
  {
    title: "Diet and Heart Health",
    description: "What to eat more of—and what to eat less of.",
    category: "Lifestyle & Nutrition",
  },
  {
    title: "Sodium and Your Blood Pressure",
    description: "The role of salt in hypertension.",
    category: "Lifestyle & Nutrition",
  },
  {
    title: "Exercise for a Healthy Heart",
    description: "How much is enough, and what type is best?",
    category: "Lifestyle & Nutrition",
  },
  {
    title: "Weight and Cardiovascular Health",
    description: "How obesity and metabolic syndrome impact your heart.",
    category: "Lifestyle & Nutrition",
  },
  // Tests & Diagnostics
  {
    title: "Understanding Stress Tests",
    description: "Why they’re done and what they reveal.",
    category: "Tests & Diagnostics",
  },
  {
    title: "What to Expect During an Echocardiogram",
    description: "Step-by-step overview of the test.",
    category: "Tests & Diagnostics",
  },
  {
    title: "The Purpose of an EKG",
    description: "How this quick test helps detect heart problems.",
    category: "Tests & Diagnostics",
  },
  {
    title: "Cardiac CT and PET Scans Explained",
    description: "A look at advanced cardiac imaging technologies.",
    category: "Tests & Diagnostics",
  },
  {
    title: "Nuclear Imaging: Is it Safe?",
    description: "Addressing common concerns about nuclear medicine.",
    category: "Tests & Diagnostics",
  },
  // Treatment & Recovery
  {
    title: "What Happens After a Heart Attack?",
    description: "Your recovery roadmap.",
    category: "Treatment & Recovery",
  },
  {
    title: "Medications You Might Be Prescribed",
    description: "Blood thinners, statins, beta-blockers, and more.",
    category: "Treatment & Recovery",
  },
  {
    title: "Understanding EECP Therapy",
    description: "A non-invasive option for improving circulation.",
    category: "Treatment & Recovery",
  },
  {
    title: "Pacemakers: What You Need to Know",
    description: "How they work and what to expect.",
    category: "Treatment & Recovery",
  },
  {
    title: "Cardiac Rehab: Why It Matters",
    description: "The role of rehabilitation in your recovery.",
    category: "Treatment & Recovery",
  },
  // Special Conditions & Syndromes
  {
    title: "What is POTS (Postural Orthostatic Tachycardia Syndrome)?",
    description: "Symptoms, diagnosis, and treatment options.",
    category: "Special Conditions & Syndromes",
  },
  {
    title: "Dysautonomia Overview",
    description: "When the autonomic nervous system doesn’t cooperate.",
    category: "Special Conditions & Syndromes",
  },
  {
    title: "Arrhythmias: Atrial Fibrillation & Others",
    description: "What they are, and when they’re serious.",
    category: "Special Conditions & Syndromes",
  },
  {
    title: "Vein Disease and Venous Insufficiency",
    description: "Understanding the causes and treatments for leg vein issues.",
    category: "Special Conditions & Syndromes",
  },
  {
    title: "Heart Failure: Symptoms and Monitoring",
    description: "How to manage heart failure for a better quality of life.",
    category: "Special Conditions & Syndromes",
  },
  // Navigating Care
  {
    title: "When to See a Cardiologist",
    description: "Early signs you shouldn’t ignore.",
    category: "Navigating Care",
  },
  {
    title: "How to Prepare for Your Appointment",
    description: "Questions to ask, what to bring, and how to get the most from your visit.",
    category: "Navigating Care",
  },
  {
    title: "Understanding Your Medical Records",
    description: "A guide to interpreting your health information.",
    category: "Navigating Care",
  },
  {
    title: "How the Patient Portal Works",
    description: "Making the most of our digital tools for your health.",
    category: "Navigating Care",
  },
]

const languages = ["ENG", "ESP", "HIN", "VIE"]

export default function LearnPage() {
  const [activeCategory, setActiveCategory] = useState("All")

  const filteredVideos = activeCategory === "All" ? videos : videos.filter((video) => video.category === activeCategory)

  return (
    <>
      {/* Sticky Sub-navigation */}
      <div className="sticky top-[96px] z-30 inset-x-0 px-4 md:px-8 lg:px-8 xl:px-8 2xl:px-8">
        <div className="flex h-auto md:h-16 items-center justify-between rounded-2xl border bg-background/90 backdrop-blur-sm px-4 flex-row gap-2 py-3 md:py-0 max-w-7xl mx-auto">
          <div className="flex items-center gap-2 flex-1">
            <Label className="text-xs font-medium hidden sm:block">Topic:</Label>
            <Select value={activeCategory} onValueChange={setActiveCategory}>
              <SelectTrigger className="w-full text-xs h-8 md:h-10 md:w-[240px]">
                <SelectValue placeholder="Select a topic" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Topics</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.name} value={category.name}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-1">
            <Label className="text-xs font-medium hidden md:block">Language:</Label>
            {languages.map((lang) => (
              <Button key={lang} variant="outline" size="sm" className="h-8 px-2 text-xs">
                {lang}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <SectionWrapper className="bg-muted/20 pt-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">Learn About Your Heart</h1>
          <p className="mt-4 max-w-3xl mx-auto text-muted-foreground md:text-xl">
            Educational videos to help you understand and manage your cardiac health.
          </p>
        </div>
      </SectionWrapper>

      <SectionWrapper>
        {/* Video Gallery */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredVideos.map((video) => (
            <VideoThumbnailCard
              key={video.title}
              title={video.title}
              category={video.category}
              description={video.description}
            />
          ))}
        </div>
        <p className="text-xs text-muted-foreground text-center pt-8">
          // TODO: Clicking a video will open a new page with embedded video, transcription, and summary.
        </p>
      </SectionWrapper>
    </>
  )
}

function VideoThumbnailCard({
  title,
  category,
  description,
}: {
  title: string
  category: string
  description: string
}) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md flex flex-col h-full">
      <div className="aspect-video bg-muted flex items-center justify-center">
        <Video className="h-12 w-12 text-muted-foreground" />
      </div>
      <CardContent className="p-4 flex-grow flex flex-col">
        <p className="text-xs text-primary font-semibold uppercase">{category}</p>
        <h4 className="font-semibold mt-1 flex-grow">{title}</h4>
        <p className="text-sm text-muted-foreground mt-2">{description}</p>
      </CardContent>
    </Card>
  )
}
