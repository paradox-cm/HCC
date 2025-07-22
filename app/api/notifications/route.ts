import { NextRequest, NextResponse } from 'next/server'

// In-memory notifications store (mock)
let notifications = [
  {
    id: 1,
    title: 'New patient registered',
    message: 'John Doe has registered for the patient portal.',
    timestamp: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
    read: false,
  },
  {
    id: 2,
    title: 'Appointment booked',
    message: 'Jane Smith booked an appointment.',
    timestamp: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
    read: false,
  },
  {
    id: 3,
    title: 'Prescription request',
    message: 'A prescription renewal request was submitted.',
    timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
    read: true,
  },
]
let nextId = 4

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const page = parseInt(searchParams.get('page') || '0', 10)
  const pageSize = parseInt(searchParams.get('pageSize') || '20', 10)
  const start = page * pageSize
  const end = start + pageSize
  return NextResponse.json({
    notifications: notifications.slice(start, end),
    hasMore: end < notifications.length,
  })
}

export async function POST(req: NextRequest) {
  const data = await req.json()
  const notif = {
    id: nextId++,
    title: data.title,
    message: data.message,
    timestamp: new Date().toISOString(),
    read: false,
  }
  notifications.unshift(notif)
  return NextResponse.json(notif, { status: 201 })
}

export async function PATCH(req: NextRequest) {
  const data = await req.json()
  if (data.id) {
    notifications = notifications.map(n => n.id === data.id ? { ...n, read: true } : n)
    return NextResponse.json({ success: true })
  }
  if (data.markAllRead) {
    notifications = notifications.map(n => ({ ...n, read: true }))
    return NextResponse.json({ success: true })
  }
  return NextResponse.json({ success: false }, { status: 400 })
} 