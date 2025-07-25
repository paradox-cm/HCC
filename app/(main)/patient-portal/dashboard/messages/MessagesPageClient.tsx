"use client"

import React, { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { SectionWrapper } from "@/components/section-wrapper"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import MailFillIcon from 'remixicon-react/MailFillIcon';
import AddCircleFillIcon from 'remixicon-react/AddCircleFillIcon';
import ArrowLeftFillIcon from 'remixicon-react/ArrowLeftFillIcon';
import ArrowDownSFillIcon from 'remixicon-react/ArrowDownSFillIcon';
import ArrowUpSFillIcon from 'remixicon-react/ArrowUpSFillIcon';
import Image from "next/image"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog"

type Message = {
  from: string;
  text: string;
  time: string;
};

type Thread = {
  id: number;
  subject: string;
  participants: string[];
  messages: Message[];
  unread: boolean;
};

const MOCK_THREADS: Thread[] = [
  {
    id: 1,
    subject: "Test Results Available",
    participants: ["Dr. Asif Ali"],
    messages: [
      { from: "Dr. Asif Ali", text: "Your test results are in. Please review them and let me know if you have questions.", time: "2024-06-01 10:00" },
      { from: "You", text: "Thank you, I will review and follow up if needed.", time: "2024-06-01 10:15" },
    ],
    unread: true,
  },
  {
    id: 2,
    subject: "Upcoming Appointment Reminder",
    participants: ["Front Desk"],
    messages: [
      { from: "Front Desk", text: "Reminder: Your appointment is scheduled for July 25, 2025 at 10:00 AM.", time: "2024-05-30 09:00" },
      { from: "You", text: "Thank you for the reminder!", time: "2024-05-30 09:10" },
    ],
    unread: false,
  },
]

function getLatestMessage(thread: Thread) {
  return thread.messages[thread.messages.length - 1]
}

function MessagesContent() {
  const [threads, setThreads] = useState<Thread[]>(MOCK_THREADS)
  const [expanded, setExpanded] = useState<number | null>(null)
  const [showNew, setShowNew] = useState(false)
  const [newMsg, setNewMsg] = useState({ subject: "", message: "" })
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (searchParams?.get("new") === "1") {
      setShowNew(true)
    }
  }, [searchParams])

  function handleExpand(id: number) {
    setExpanded(expanded === id ? null : id)
    // Mark as read in UI state
    setThreads(threads => threads.map(t => t.id === id ? { ...t, unread: false } : t))
  }

  function handleNewMessage(e: React.FormEvent) {
    e.preventDefault()
    setShowNew(false)
    setNewMsg({ subject: "", message: "" })
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
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <MailFillIcon className="h-5 w-5" /> Messages
            </CardTitle>
            <Dialog open={showNew} onOpenChange={setShowNew}>
              <DialogTrigger asChild>
                <Button size="sm" variant="default" className="bg-red-600 hover:bg-red-700 text-white">
                  <AddCircleFillIcon className="mr-2 h-4 w-4" /> New Message
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>New Message</DialogTitle>
                  <DialogDescription>Send a new message to your care team.</DialogDescription>
                </DialogHeader>
                <form className="space-y-4" onSubmit={handleNewMessage}>
                  <div>
                    <label className="block text-xs font-medium mb-1">Subject</label>
                    <Input
                      placeholder="Subject"
                      value={newMsg.subject}
                      onChange={e => setNewMsg(msg => ({ ...msg, subject: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1">Message</label>
                    <Textarea
                      placeholder="Type your message..."
                      value={newMsg.message}
                      onChange={e => setNewMsg(msg => ({ ...msg, message: e.target.value }))}
                      rows={4}
                      required
                    />
                  </div>
                  <DialogFooter>
                    <Button type="submit" size="sm">Send Message</Button>
                    <Button type="button" size="sm" variant="ghost" onClick={() => setShowNew(false)}>Cancel</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            <div className="divide-y">
              {threads.map((thread: Thread) => {
                const latest = getLatestMessage(thread)
                return (
                  <div key={thread.id} className="py-3">
                    <button
                      className={`w-full flex items-center justify-between gap-2 hover:bg-muted/50 rounded px-2 py-2 transition-colors ${thread.unread ? "font-semibold" : ""}`}
                      onClick={() => handleExpand(thread.id)}
                      aria-expanded={expanded === thread.id}
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        {thread.unread && <span className="inline-block w-2.5 h-2.5 rounded-full bg-red-600" aria-label="unread" />}
                        <div className="flex-1 min-w-0">
                          <div className="truncate text-base text-left">{thread.subject}</div>
                          <div className="truncate text-xs text-muted-foreground text-left max-w-xs">
                            {latest.from}: {latest.text}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1 min-w-[70px]">
                        <span className="text-xs text-muted-foreground whitespace-nowrap">{latest.time}</span>
                        {thread.unread && <span className="ml-2 inline-block bg-red-600 text-white text-[10px] px-2 py-0.5 rounded-full">New</span>}
                        {expanded === thread.id ? <ArrowUpSFillIcon className="h-4 w-4 text-muted-foreground" /> : <ArrowDownSFillIcon className="h-4 w-4 text-muted-foreground" />}
                      </div>
                    </button>
                    {expanded === thread.id && (
                      <div className="mt-3 bg-muted/40 rounded p-3 space-y-3">
                        {thread.messages.map((msg, i) => (
                          <div key={i} className={`flex items-end gap-2 ${msg.from === "You" ? "justify-end" : "justify-start"}`}>
                            {msg.from !== "You" && (
                              <div className="flex-shrink-0">
                                <Image src="/images/hcc-logo.png" alt="HCC Logo" width={28} height={28} className="rounded-full bg-white border" />
                              </div>
                            )}
                            <div className={`max-w-[80%] px-3 py-2 rounded-lg text-sm
                              ${msg.from === "You"
                                ? "border-2 border-red-600 bg-white text-black dark:bg-[hsl(0,0%,14%)] dark:text-foreground dark:border-[hsl(0,0%,20%)]"
                                : "bg-white border dark:bg-[hsl(0,0%,7%)] dark:text-foreground dark:border-[hsl(0,0%,20%)]"}
                            `}>
                              <div className="font-medium mb-0.5">{msg.from}</div>
                              <div>{msg.text}</div>
                              <div className="text-xs text-muted-foreground mt-1 text-right">{msg.time}</div>
                            </div>
                            {msg.from === "You" && (
                              <div className="flex-shrink-0">
                                <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center font-bold text-xs text-black border">
                                  JD
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                        <form className="mt-2 flex gap-2">
                          <Input className="flex-1" placeholder="Type a reply..." disabled />
                          <Button size="sm" disabled>Send</Button>
                        </form>
                      </div>
                    )}
                  </div>
                )
              })}
              {threads.length === 0 && <div className="py-8 text-center text-muted-foreground">No messages yet.</div>}
            </div>
          </CardContent>
        </Card>
      </SectionWrapper>
    </>
  )
}

export default function MessagesPageClient() {
  return (
    <Suspense>
      <MessagesContent />
    </Suspense>
  )
} 