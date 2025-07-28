"use client"

import { useEffect, useRef, useState } from "react"
import { LoadingAnimation } from "@/components/LoadingAnimation"

interface Notification {
  id: number
  title: string
  message: string
  timestamp: string
  read: boolean
}

// Mock function to simulate fetching notifications from backend
function fetchNotifications(page: number, pageSize: number): Promise<Notification[]> {
  return new Promise(resolve => {
    setTimeout(() => {
      const start = page * pageSize
      const notifications = Array.from({ length: pageSize }, (_, i) => ({
        id: start + i + 1,
        title: [
          "New patient registered",
          "Appointment booked",
          "Prescription request",
          "Message received",
          "Document uploaded",
          "Billing event",
          "Care plan updated",
          "System alert"
        ][(start + i) % 8],
        message: `This is a mock notification #${start + i + 1}`,
        timestamp: `${Math.floor(Math.random() * 59) + 1} min ago`,
        read: Math.random() > 0.5,
      }))
      resolve(notifications)
    }, 600)
  })
}

export default function AdminNotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [page, setPage] = useState(0)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const loader = useRef<HTMLDivElement>(null)
  const pageSize = 20

  useEffect(() => {
    loadMore()
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (!loader.current) return
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && !loading && hasMore) {
          loadMore()
        }
      },
      { threshold: 1 }
    )
    observer.observe(loader.current)
    return () => observer.disconnect()
    // eslint-disable-next-line
  }, [loader.current, loading, hasMore])

  async function loadMore() {
    setLoading(true)
    const newNotifs = await fetchNotifications(page, pageSize)
    setNotifications(prev => [...prev, ...newNotifs])
    setPage(p => p + 1)
    if (newNotifs.length < pageSize) setHasMore(false)
    setLoading(false)
  }

  function markAsRead(id: number) {
    setNotifications(n => n.map(notif => notif.id === id ? { ...notif, read: true } : notif))
  }

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Notifications</h1>
      <ul className="divide-y border rounded bg-background">
        {notifications.map(notif => (
          <li
            key={notif.id}
            className={`flex flex-col gap-1 px-4 py-3 transition ${notif.read ? '' : 'bg-muted font-semibold'}`}
            style={{ background: notif.read ? undefined : 'hsl(var(--muted))' }}
          >
            <div className="flex items-center justify-between">
              <span className="text-base">{notif.title}</span>
              {!notif.read && (
                <button
                  className="text-xs text-primary underline ml-2"
                  onClick={() => markAsRead(notif.id)}
                >
                  Mark as read
                </button>
              )}
            </div>
            <span className="text-sm text-muted-foreground">{notif.message}</span>
            <span className="text-xs text-muted-foreground mt-1">{notif.timestamp}</span>
          </li>
        ))}
        {loading && (
          <li className="p-4 text-center">
            <LoadingAnimation size="sm" color="secondary" />
          </li>
        )}
        <div ref={loader} />
        {!hasMore && !loading && notifications.length === 0 && (
          <li className="p-4 text-center text-muted-foreground">No notifications</li>
        )}
      </ul>
    </div>
  )
} 