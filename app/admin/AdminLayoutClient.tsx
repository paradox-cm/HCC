"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import CalendarFillIcon from 'remixicon-react/CalendarFillIcon';
import User3FillIcon from 'remixicon-react/User3FillIcon';
import FileTextFillIcon from 'remixicon-react/FileTextFillIcon';
import Message2FillIcon from 'remixicon-react/Message2FillIcon';
import CapsuleFillIcon from 'remixicon-react/CapsuleFillIcon';
import MoneyDollarCircleFillIcon from 'remixicon-react/MoneyDollarCircleFillIcon';
import HeartPulseFillIcon from 'remixicon-react/HeartPulseFillIcon';
import Settings2FillIcon from 'remixicon-react/Settings2FillIcon';
import Home2FillIcon from 'remixicon-react/Home2FillIcon';
import SunFillIcon from 'remixicon-react/SunFillIcon';
import MoonFillIcon from 'remixicon-react/MoonFillIcon';
import Notification3FillIcon from 'remixicon-react/Notification3FillIcon';
import CheckboxCircleFillIcon from 'remixicon-react/CheckboxCircleFillIcon';
import MenuFillIcon from 'remixicon-react/MenuFillIcon';
import CloseFillIcon from 'remixicon-react/CloseFillIcon';
import BookOpenFillIcon from 'remixicon-react/BookOpenFillIcon';
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import Image from "next/image"
import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogClose, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useRef } from "react"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { Drawer, DrawerTrigger, DrawerContent, DrawerClose, DrawerTitle } from "@/components/ui/drawer"
import { SystemStatusModal } from "@/components/SystemStatusModal"
import { MessageProvider } from "@/contexts/MessageContext"

// Primary navigation - Patient-centric workflow
const primaryNavItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: Home2FillIcon },
  { href: "/admin/patients", label: "Patients", icon: User3FillIcon },
  { href: "/admin/appointments", label: "Appointments", icon: CalendarFillIcon },
  { href: "/admin/messages", label: "Messages", icon: Message2FillIcon },
  { href: "/admin/billing", label: "Billing & Insurance", icon: MoneyDollarCircleFillIcon },
]

// Secondary navigation - Admin tools and global lists
const secondaryNavItems = [
  { href: "/admin/prescriptions", label: "Prescriptions", icon: CapsuleFillIcon },
  { href: "/admin/care-plans", label: "Care Plans", icon: HeartPulseFillIcon },
  { href: "/admin/documents", label: "Documents", icon: FileTextFillIcon },
  { href: "/admin/documentation", label: "Documentation", icon: BookOpenFillIcon },
  { href: "/admin/settings", label: "Settings", icon: Settings2FillIcon },
]

export default function AdminLayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const router = useRouter()
  const [authChecked, setAuthChecked] = useState(false)
  const [dateTime, setDateTime] = useState("")
  const [supportOpen, setSupportOpen] = useState(false)
  const [supportMsg, setSupportMsg] = useState("")
  const [supportEmail, setSupportEmail] = useState("")
  const [supportSent, setSupportSent] = useState(false)
  const [supportLoading, setSupportLoading] = useState(false)
  // Notifications state
  const [notifOpen, setNotifOpen] = useState(false)
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New patient registered",
      message: "John Doe has registered for the patient portal.",
      timestamp: "2 min ago",
      read: false,
    },
    {
      id: 2,
      title: "Prescription renewal",
      message: "A prescription renewal request was submitted.",
      timestamp: "10 min ago",
      read: false,
    },
    {
      id: 3,
      title: "System update",
      message: "The system was updated successfully.",
      timestamp: "1 hour ago",
      read: true,
    },
  ])
  const notifBellRef = useRef<HTMLButtonElement>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [systemStatusModal, setSystemStatusModal] = useState(false)

  function handleSupportSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSupportLoading(true)
    setTimeout(() => {
      setSupportSent(true)
      setSupportLoading(false)
      setSupportMsg("")
      setSupportEmail("")
    }, 1200)
  }

  function markAsRead(id: number) {
    setNotifications(n => n.map(notif => notif.id === id ? { ...notif, read: true } : notif))
  }
  function markAllAsRead() {
    setNotifications(n => n.map(notif => ({ ...notif, read: true })))
  }
  function unreadCount() {
    return notifications.filter(n => !n.read).length
  }
  // Close dialog on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (notifOpen && notifBellRef.current && !notifBellRef.current.contains(e.target as Node)) {
        setNotifOpen(false)
      }
    }
    function handleEsc(e: KeyboardEvent) {
      if (notifOpen && e.key === "Escape") setNotifOpen(false)
    }
    document.addEventListener("mousedown", handleClick)
    document.addEventListener("keydown", handleEsc)
    return () => {
      document.removeEventListener("mousedown", handleClick)
      document.removeEventListener("keydown", handleEsc)
    }
  }, [notifOpen])

  useEffect(() => {
    // Allow /admin-login to be public
    if (pathname === "/admin-login") {
      setAuthChecked(true)
      return
    }
    // Check for simple auth (localStorage or sessionStorage)
    if (typeof window !== "undefined") {
      const isAuthed =
        localStorage.getItem("hcc_admin_auth") === "true" ||
        sessionStorage.getItem("hcc_admin_auth") === "true"
      if (!isAuthed) {
        router.replace("/admin-login")
      } else {
        setAuthChecked(true)
      }
    }
  }, [pathname, router])

  useEffect(() => {
    function updateTime() {
      const now = new Date()
      setDateTime(
        now.toLocaleString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
          year: "numeric",
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })
      )
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  // Prevent rendering dashboard/sidebar until auth is checked
  if (!authChecked && pathname !== "/admin-login") {
    return null
  }

  return (
    <div className="min-h-screen flex flex-col bg-muted instant-theme-switch">
      {/* Admin Top Nav */}
      <header className="fixed top-0 left-0 right-0 z-50 w-full bg-background border-b flex items-center justify-between px-4 sm:px-6 h-16 instant-theme-switch">
        <div className="flex items-center gap-3">
          {/* Hamburger menu for mobile/tablet (below 1240px) */}
          <button
            className="max-[1240px]:block hidden p-2 rounded-md hover:bg-accent focus:outline-none focus:ring-2 focus:ring-primary"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
            type="button"
          >
            <MenuFillIcon className="h-6 w-6" />
          </button>
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/images/hcc-logo.png" alt="HCC Logo" width={28} height={28} className="h-7 w-7" />
              <span className="font-bold text-lg tracking-tight">HCC</span>
            </Link>
            <Link href="/admin/dashboard" className="font-bold text-lg tracking-tight ml-2 hover:underline">
              Admin Portal
            </Link>
          </div>
          <span className="ml-2 sm:ml-6 text-sm text-muted-foreground font-medium min-w-max hidden xs:inline">{dateTime}</span>
        </div>
        <div className="flex items-center gap-4 instant-theme-switch">
          {/* System Status (desktop only - above 1240px) */}
          <button 
            className="hidden min-[1240px]:flex items-center gap-1 group relative hover:bg-accent rounded px-2 py-1 transition-colors" 
            onClick={() => setSystemStatusModal(true)}
          >
            <CheckboxCircleFillIcon className="h-3 w-3 text-green-500" />
            <span className="text-xs text-green-600 font-medium">All systems operational</span>
          </button>
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle theme"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? <SunFillIcon className="h-5 w-5" /> : <MoonFillIcon className="h-5 w-5" />}
          </Button>
          {/* Notifications Bell */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="p-2 rounded-full hover:bg-accent focus:outline-none focus:ring-2 focus:ring-primary relative"
                aria-label="Notifications"
                type="button"
              >
                <Notification3FillIcon className="h-5 w-5 text-muted-foreground" />
                {unreadCount() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 font-bold border border-background">{unreadCount()}</span>
                )}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 max-w-xs p-0">
              <div className="flex items-center justify-between px-4 py-2 border-b">
                <span className="font-semibold text-base">Notifications</span>
                <button
                  className="text-xs text-primary hover:underline focus:outline-none"
                  onClick={markAllAsRead}
                  disabled={unreadCount() === 0}
                >
                  Mark all as read
                </button>
              </div>
              <ul className="max-h-72 overflow-y-auto divide-y">
                {notifications.length === 0 && (
                  <li className="p-4 text-center text-muted-foreground">No notifications</li>
                )}
                {notifications.map(notif => (
                  <li
                    key={notif.id}
                    className={`flex flex-col gap-1 px-4 py-3 cursor-pointer transition bg-${notif.read ? 'background' : 'muted'} ${notif.read ? '' : 'font-semibold'}`}
                    style={{ background: notif.read ? undefined : 'hsl(var(--muted))' }}
                    tabIndex={0}
                    aria-label={notif.title}
                    onClick={() => markAsRead(notif.id)}
                  >
                    <span className="text-sm">{notif.title}</span>
                    <span className="text-xs text-muted-foreground">{notif.message}</span>
                    <span className="text-xs text-muted-foreground mt-1">{notif.timestamp}</span>
                    {!notif.read && <span className="inline-block mt-1 text-xs text-primary">Mark as read</span>}
                  </li>
                ))}
              </ul>
              <DropdownMenuItem
                className="justify-center text-primary font-semibold text-sm border-t bg-muted cursor-pointer"
                onSelect={() => router.push("/admin/notifications")}
              >
                View all notifications
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {/* Logout Button for desktop only (above 1240px) */}
          <Button
            variant="outline"
            size="sm"
            className="hidden min-[1240px]:inline-flex text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20"
            onClick={() => {
              if (typeof window !== "undefined") {
                localStorage.removeItem("hcc_admin_auth");
                sessionStorage.removeItem("hcc_admin_auth");
              }
              router.replace("/admin-login");
            }}
          >
            Logout
          </Button>
        </div>
      </header>
      {/* Sidebar as Drawer for mobile/tablet (below 1240px) */}
      <Drawer open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <DrawerContent className="max-[1240px]:block hidden w-full max-w-none">
          <DrawerTitle className="sr-only">Admin Navigation</DrawerTitle>
          <aside className="w-full bg-background border-r flex flex-col justify-between py-6 px-4 h-[calc(100vh-6rem)] max-h-[calc(100vh-6rem)] overflow-hidden instant-theme-switch safe-area-inset-bottom">
            {/* Drawer Logo */}
            <div className="flex items-center justify-between mb-6 w-full">
              <div className="flex items-center gap-2">
                <Link href="/" className="flex items-center gap-2">
                  <Image src="/images/hcc-logo.png" alt="HCC Logo" width={28} height={28} className="h-7 w-7" />
                  <span className="font-bold text-lg tracking-tight">HCC</span>
                </Link>
                <Link href="/admin/dashboard" className="font-bold text-lg tracking-tight ml-2 hover:underline">
                  Admin Portal
                </Link>
              </div>
              <button
                className="p-2 rounded-full hover:bg-accent focus:outline-none focus:ring-2 focus:ring-primary ml-2"
                onClick={() => setSidebarOpen(false)}
                aria-label="Close menu"
                type="button"
              >
                <CloseFillIcon className="h-6 w-6" />
              </button>
            </div>
            {/* Drawer Top Utilities */}
            <div className="flex flex-col gap-4 mb-6">
              {/* Quick Admin Tools Access */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Settings2FillIcon className="h-4 w-4 mr-2" />
                    Admin Tools
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56">
                  {secondaryNavItems.map(({ href, label, icon: Icon }) => (
                    <DropdownMenuItem key={href} asChild>
                      <Link href={href} className="flex items-center gap-2" onClick={() => setSidebarOpen(false)}>
                        <Icon className="h-4 w-4" />
                        {label}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <div className="flex items-center gap-2 justify-between">
                <span className="text-sm text-muted-foreground font-medium min-w-max">{dateTime}</span>
                {/* System Status */}
                <button 
                  className="flex items-center gap-1 group relative hover:bg-accent rounded px-2 py-1 transition-colors" 
                  onClick={() => setSystemStatusModal(true)}
                >
                  <CheckboxCircleFillIcon className="h-3 w-3 text-green-500" />
                  <span className="text-xs text-green-600 font-medium">Online</span>
                </button>
              </div>
              <div className="flex items-center gap-4 justify-between">
                {/* Theme Toggle */}
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Toggle theme"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                >
                  {theme === "dark" ? <SunFillIcon className="h-5 w-5" /> : <MoonFillIcon className="h-5 w-5" />}
                </Button>
                {/* Notifications Bell */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      className="p-2 rounded-full hover:bg-accent focus:outline-none focus:ring-2 focus:ring-primary relative"
                      aria-label="Notifications"
                      type="button"
                    >
                      <Notification3FillIcon className="h-5 w-5 text-muted-foreground" />
                      {unreadCount() > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 font-bold border border-background">{unreadCount()}</span>
                      )}
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-80 max-w-xs p-0">
                    <div className="flex items-center justify-between px-4 py-2 border-b">
                      <span className="font-semibold text-base">Notifications</span>
                      <button
                        className="text-xs text-primary hover:underline focus:outline-none"
                        onClick={markAllAsRead}
                        disabled={unreadCount() === 0}
                      >
                        Mark all as read
                      </button>
                    </div>
                    <ul className="max-h-72 overflow-y-auto divide-y">
                      {notifications.length === 0 && (
                        <li className="p-4 text-center text-muted-foreground">No notifications</li>
                      )}
                      {notifications.map(notif => (
                        <li
                          key={notif.id}
                          className={`flex flex-col gap-1 px-4 py-3 cursor-pointer transition bg-${notif.read ? 'background' : 'muted'} ${notif.read ? '' : 'font-semibold'}`}
                          style={{ background: notif.read ? undefined : 'hsl(var(--muted))' }}
                          tabIndex={0}
                          aria-label={notif.title}
                          onClick={() => markAsRead(notif.id)}
                        >
                          <span className="text-sm">{notif.title}</span>
                          <span className="text-xs text-muted-foreground">{notif.message}</span>
                          <span className="text-xs text-muted-foreground mt-1">{notif.timestamp}</span>
                          {!notif.read && <span className="inline-block mt-1 text-xs text-primary">Mark as read</span>}
                        </li>
                      ))}
                    </ul>
                    <DropdownMenuItem
                      className="justify-center text-primary font-semibold text-sm border-t bg-muted cursor-pointer"
                      onSelect={() => router.push("/admin/notifications")}
                    >
                      View all notifications
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            {/* Primary Navigation */}
            <div className="flex-1 overflow-y-auto">
              <nav className="flex flex-col gap-2">
                <div className="px-4 py-2">
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Main</h3>
                </div>
                {primaryNavItems.map(({ href, label, icon: Icon }) => (
                  <Link
                    key={href}
                    href={href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors text-sm min-h-[44px] ${pathname.startsWith(href) ? "bg-primary text-primary-foreground" : "hover:bg-accent text-foreground"}`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <Icon className="h-5 w-5 flex-shrink-0" />
                    {label}
                  </Link>
                ))}
                
                <div className="px-4 py-2 mt-4">
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Admin Tools</h3>
                </div>
                {secondaryNavItems.map(({ href, label, icon: Icon }) => (
                  <Link
                    key={href}
                    href={href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors text-sm min-h-[44px] ${pathname.startsWith(href) ? "bg-primary text-primary-foreground" : "hover:bg-accent text-foreground"}`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <Icon className="h-5 w-5 flex-shrink-0" />
                    {label}
                  </Link>
                ))}
              </nav>
            </div>
            {/* Support/Version Info */}
            <div className="mt-8 border-t pt-4 flex flex-col gap-2">
              <div className="text-xs text-muted-foreground">Logged in as Admin</div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground mt-2">
                <span>v1.0</span>
                <button
                  className="text-primary underline hover:no-underline focus:outline-none ml-2"
                  onClick={() => { setSupportOpen(true); setSupportSent(false); }}
                  type="button"
                >
                  Support
                </button>
                <button
                  className="text-primary underline hover:no-underline focus:outline-none ml-2"
                  onClick={() => router.push("/admin/documentation")}
                  type="button"
                >
                  View Documentation
                </button>
              </div>
              {/* Mobile Logout Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  if (typeof window !== "undefined") {
                    localStorage.removeItem("hcc_admin_auth");
                    sessionStorage.removeItem("hcc_admin_auth");
                  }
                  router.replace("/admin-login");
                }}
                className="mt-2"
              >
                Logout
              </Button>
            </div>
          </aside>
        </DrawerContent>
      </Drawer>

      {/* Support Modal */}
      <Dialog open={supportOpen} onOpenChange={setSupportOpen}>
        <DialogContent>
          <DialogTitle className="text-lg font-bold mb-2">Send a message to support</DialogTitle>
          {supportSent ? (
            <div className="text-green-600 text-sm">Your message has been sent! Support will contact you soon.</div>
          ) : (
            <form onSubmit={handleSupportSubmit} className="flex flex-col gap-3">
              <Input
                type="email"
                placeholder="Your email"
                value={supportEmail}
                onChange={e => setSupportEmail(e.target.value)}
                required
              />
              <Textarea
                placeholder="Describe your issue or question..."
                value={supportMsg}
                onChange={e => setSupportMsg(e.target.value)}
                required
                rows={4}
              />
              <div className="flex gap-2 justify-end">
                <DialogClose asChild>
                  <button
                    type="button"
                    className="px-3 py-1 rounded bg-muted text-xs hover:bg-accent border"
                    disabled={supportLoading}
                  >
                    Cancel
                  </button>
                </DialogClose>
                <button
                  type="submit"
                  className="px-3 py-1 rounded bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition disabled:opacity-60"
                  disabled={supportLoading}
                >
                  {supportLoading ? "Sending..." : "Send"}
                </button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
      {/* Desktop Sidebar + Main Content */}
      <div className="flex flex-1 min-h-0 pt-16 instant-theme-switch">
        {/* Sidebar for desktop only (above 1240px) */}
        <div className="hidden min-[1240px]:flex fixed left-0 top-16 w-64 h-[calc(100vh-4rem)] bg-background border-r flex-col justify-between py-6 px-4 overflow-y-auto z-40 instant-theme-switch">
          <div>
            <nav className="flex flex-col gap-1">
              <div className="px-3 py-2">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Main</h3>
              </div>
              {primaryNavItems.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-md font-medium transition-colors text-sm ${pathname.startsWith(href) ? "bg-primary text-primary-foreground" : "hover:bg-accent text-foreground"}`}
                >
                  <Icon className="h-5 w-5" />
                  {label}
                </Link>
              ))}
              
              <div className="px-3 py-2 mt-4">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Admin Tools</h3>
              </div>
              {secondaryNavItems.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-md font-medium transition-colors text-sm ${pathname.startsWith(href) ? "bg-primary text-primary-foreground" : "hover:bg-accent text-foreground"}`}
                >
                  <Icon className="h-5 w-5" />
                  {label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="mt-8 border-t pt-4 flex flex-col gap-2">
            <div className="text-xs text-muted-foreground">Logged in as Admin</div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground mt-2">
              <span>v1.0</span>
              <button
                className="text-primary underline hover:no-underline focus:outline-none ml-2"
                onClick={() => { setSupportOpen(true); setSupportSent(false); }}
                type="button"
              >
                Support
              </button>
            </div>
          </div>
        </div>
        <main className="flex-1 bg-background p-2 sm:p-8 overflow-x-auto min-[1240px]:ml-64 instant-theme-switch">
          <MessageProvider>
            {children}
          </MessageProvider>
        </main>
      </div>

      {/* System Status Modal */}
      <SystemStatusModal 
        open={systemStatusModal} 
        onOpenChange={setSystemStatusModal}
        onSupportClick={() => { setSupportOpen(true); setSupportSent(false); }}
      />
    </div>
  )
} 