"use client"

import { useRouter } from "next/navigation"
import { SectionWrapper } from "@/components/section-wrapper"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { FileText, ArrowLeft, Download } from "lucide-react"
import Image from "next/image"

// Mock document data (in a real app, fetch by ID)
const MOCK_DOC = {
  name: "Cardiac Stress Test.pdf",
  type: "Test Result",
  date: "2024-06-01",
  url: "/sample.pdf", // Replace with a real PDF URL or static asset
}

export default function DocumentViewPage() {
  const router = useRouter()

  return (
    <>
      <div className="px-4 md:px-8 lg:px-8 xl:px-8 2xl:px-8 max-w-7xl mx-auto pt-2">
        <Button variant="outline" onClick={() => router.back()} className="mb-2">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </div>
      <SectionWrapper className="pt-4 md:pt-0">
        <Card className="max-w-2xl mx-auto">
          <CardHeader className="flex items-center gap-2 pb-2">
            <FileText className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">{MOCK_DOC.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-2 text-xs text-muted-foreground">
              <span className="mr-4">Type: <span className="font-medium text-primary">{MOCK_DOC.type}</span></span>
              <span>Date: {MOCK_DOC.date}</span>
            </div>
            <div className="mb-4 flex gap-2">
              <Button asChild size="sm" variant="outline">
                <a href={MOCK_DOC.url} download>
                  <Download className="h-4 w-4 mr-2" /> Download
                </a>
              </Button>
            </div>
            <div className="w-full aspect-[4/5] md:aspect-video border rounded overflow-hidden bg-muted flex items-center justify-center">
              <Image src="/images/hcc-logo.png" alt="Document placeholder" width={120} height={120} className="opacity-60" />
            </div>
          </CardContent>
        </Card>
      </SectionWrapper>
    </>
  )
}
