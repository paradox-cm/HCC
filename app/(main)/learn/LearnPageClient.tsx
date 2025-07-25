"use client"

import { useState } from "react"
import { SectionWrapper } from "@/components/section-wrapper"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import VideoFillIcon from 'remixicon-react/VideoFillIcon';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { videos } from "./videos-data"

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

const languages = ["ENG", "ESP", "HIN", "VIE"]

export default function LearnPageClient() {
  const [activeCategory, setActiveCategory] = useState("All")

  const filteredVideos = activeCategory === "All" ? videos : videos.filter((video) => video.category === activeCategory)

  // Header height: 88px (top-6 + h-16), Subnav height: 56px (py-3 + h-10)
  // Total offset: 144px

  return (
    <>
      {/* Fixed Topic Sub-navigation directly beneath header */}
      <div className="fixed top-[96px] z-40 w-full inset-x-0 px-4 md:px-8 lg:px-8 xl:px-8 2xl:px-8">
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

      {/* Main content with padding to clear header + subnav */}
      <div className="pt-[64px]">
        <SectionWrapper className="bg-muted/20">
          <div className="text-center">
            <h1 className="text-2xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4 fade-in-up">Learn About Your Heart</h1>
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
      </div>
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
    <Link href="/learn/video" className="block focus:outline-none">
      <Card className="overflow-hidden transition-all flex flex-col h-full transform transition duration-200 hover:scale-[1.03] hover:shadow-lg active:scale-95 focus:scale-95 border border-border hover:border-primary">
        <div className="aspect-video bg-muted flex items-center justify-center">
          <VideoFillIcon className="h-12 w-12 text-muted-foreground" />
        </div>
        <CardContent className="p-4 flex-grow flex flex-col">
          <p className="text-xs text-primary font-semibold uppercase">{category}</p>
          <h4 className="font-semibold mt-1 flex-grow">{title}</h4>
          <p className="text-sm text-muted-foreground mt-2">{description}</p>
        </CardContent>
      </Card>
    </Link>
  )
} 