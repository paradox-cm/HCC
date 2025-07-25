"use client"

import React, { useState, useRef, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { SectionWrapper } from "@/components/section-wrapper"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import FileTextFillIcon from 'remixicon-react/FileTextFillIcon';
import DownloadFillIcon from 'remixicon-react/DownloadFillIcon';
import UploadFillIcon from 'remixicon-react/UploadFillIcon';
import ArrowLeftFillIcon from 'remixicon-react/ArrowLeftFillIcon';
import QuestionFillIcon from 'remixicon-react/QuestionFillIcon';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import Link from "next/link"

const MOCK_DOCUMENTS = [
  {
    id: 1,
    name: "Cardiac Stress Test",
    type: "Test Result",
    date: "2024-06-01",
    status: "Available",
  },
  {
    id: 2,
    name: "Lab Results",
    type: "Lab Result",
    date: "2024-05-20",
    status: "Available",
  },
  {
    id: 3,
    name: "Echocardiogram Report",
    type: "Imaging",
    date: "2024-04-15",
    status: "Available",
  },
]

const DOC_TYPES = [
  { value: "test", label: "Test Result" },
  { value: "lab", label: "Lab Result" },
  { value: "imaging", label: "Imaging" },
  { value: "other", label: "Other" },
]

type Document = typeof MOCK_DOCUMENTS[number]

function DocumentsContent() {
  const [documents, setDocuments] = useState<Document[]>(MOCK_DOCUMENTS)
  const [showUpload, setShowUpload] = useState(false)
  const [upload, setUpload] = useState({ file: null as File | null, type: "test", notes: "" })
  const [uploadError, setUploadError] = useState("")
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const searchParams = useSearchParams()

  useEffect(() => {
    if (searchParams?.get("upload") === "1") {
      setShowUpload(true)
    }
  }, [searchParams])

  function handleUpload(e: React.FormEvent) {
    e.preventDefault()
    if (!upload.file) {
      setUploadError("Please select a file.")
      return
    }
    setDocuments(prev => [
      {
        id: prev.length + 1,
        name: upload.file ? upload.file.name : "Document",
        type: DOC_TYPES.find(t => t.value === upload.type)?.label || "Other",
        date: new Date().toISOString().slice(0, 10),
        status: "Uploaded",
      },
      ...prev,
    ])
    setShowUpload(false)
    setUpload({ file: null, type: "test", notes: "" })
    setUploadError("")
    setUploadSuccess(true)
    if (fileInputRef.current) fileInputRef.current.value = ""
    setTimeout(() => setUploadSuccess(false), 2000)
  }

  return (
    <>
      <div className="px-4 md:px-8 lg:px-8 xl:px-8 2xl:px-8 max-w-7xl mx-auto pt-2">
        <Button variant="outline" onClick={() => router.back()} className="mb-2">
          <ArrowLeftFillIcon className="mr-2 h-4 w-4" />
          Back
        </Button>
      </div>
      <SectionWrapper className="pt-4 md:pt-0">
        <Card className="max-w-2xl mx-auto">
          <CardHeader className="flex items-center gap-2 pb-2">
            <FileTextFillIcon className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Documents & Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <span className="font-semibold text-base flex items-center gap-1">
                Your Documents
                <TooltipProvider delayDuration={0}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <QuestionFillIcon className="h-4 w-4 text-muted-foreground cursor-pointer" />
                    </TooltipTrigger>
                    <TooltipContent side="top" className="max-w-xs text-xs">
                      View, download, or upload your medical documents and test results. Use the upload button to add new files for your provider.
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </span>
              <Button size="sm" variant="default" className="bg-red-600 hover:bg-red-700 text-white" onClick={() => setShowUpload(v => !v)}>
                <UploadFillIcon className="mr-2 h-4 w-4" /> Upload Document
              </Button>
            </div>
            {showUpload && (
              <div className="mb-6 border rounded-lg bg-white/90 dark:bg-[hsl(0,0%,14%)] dark:border-[hsl(0,0%,20%)] shadow-sm p-4">
                <form className="space-y-3" onSubmit={handleUpload}>
                  <div>
                    <label className="block text-xs font-medium mb-1">File <span className="text-red-600">*</span></label>
                    <div className="flex items-center gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => fileInputRef.current?.click()}
                        className="min-w-[120px]"
                      >
                        Choose File
                      </Button>
                      <span className="text-xs text-muted-foreground truncate max-w-[120px]">
                        {upload.file ? upload.file.name : "No file selected"}
                      </span>
                    </div>
                    <Input
                      type="file"
                      accept="application/pdf,image/*"
                      ref={fileInputRef}
                      onChange={e => setUpload(u => ({ ...u, file: e.target.files?.[0] || null }))}
                      className="hidden"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1">Document Type</label>
                    <select
                      className="w-full border rounded px-2 py-1 text-sm"
                      value={upload.type}
                      onChange={e => setUpload(u => ({ ...u, type: e.target.value }))}
                    >
                      {DOC_TYPES.map(t => (
                        <option key={t.value} value={t.value}>{t.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1">Notes (optional)</label>
                    <Textarea
                      placeholder="Notes for your provider"
                      value={upload.notes}
                      onChange={e => setUpload(u => ({ ...u, notes: e.target.value }))}
                      rows={2}
                      className="text-xs"
                    />
                  </div>
                  {uploadError && <div className="text-xs text-red-600">{uploadError}</div>}
                  <div className="flex gap-2 pt-1">
                    <Button type="submit" size="sm" className="w-full bg-red-600 hover:bg-red-700 text-white">Submit</Button>
                    <Button type="button" size="sm" variant="ghost" onClick={() => { setShowUpload(false); setUploadError("") }}>Cancel</Button>
                  </div>
                </form>
              </div>
            )}
            {uploadSuccess && (
              <div className="mb-4 text-green-700 bg-green-50 border border-green-200 rounded px-3 py-2 text-sm text-center">Document uploaded successfully!</div>
            )}
            <div className="space-y-4">
              {documents.length === 0 && (
                <div className="py-8 text-center text-muted-foreground">
                  <div className="mb-4">No documents found.</div>
                  <Button size="sm" variant="default" className="bg-red-600 hover:bg-red-700 text-white" onClick={() => setShowUpload(true)}>
                    <UploadFillIcon className="mr-2 h-4 w-4" /> Upload Document
                  </Button>
                </div>
              )}
              {documents.map(doc => (
                <div key={doc.id} className="border rounded-lg p-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 bg-muted/40">
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-base truncate">{doc.name} <span className="text-xs font-normal text-muted-foreground">({doc.type})</span></div>
                    <div className="text-xs text-muted-foreground mt-1">Date: {doc.date}</div>
                    <div className="text-xs text-muted-foreground">Status: <span className="font-medium text-primary">{doc.status}</span></div>
                  </div>
                  <div className="flex flex-col gap-2 min-w-[160px]">
                    <Button asChild size="sm" variant="outline" className="w-full flex items-center justify-center gap-2">
                      <Link href={`/patient-portal/dashboard/documents/${doc.id}`}>
                        <FileTextFillIcon className="h-4 w-4" /> View
                      </Link>
                    </Button>
                    <Button size="sm" variant="outline" className="w-full flex items-center justify-center gap-2">
                      <DownloadFillIcon className="h-4 w-4" /> Download
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </SectionWrapper>
    </>
  )
}

export default function DocumentsPageClient() {
  return (
    <Suspense>
      <DocumentsContent />
    </Suspense>
  )
} 