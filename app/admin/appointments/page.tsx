// IMPORTANT: To make the calendar grid truly responsive and fill the width of the container, add the following to your global CSS (e.g., app/globals.css):
//
// /* Force calendar table to use flexbox for full width */
// .calendar-full-width .rdp-table {
//   display: flex !important;
//   flex-direction: column !important;
//   width: 100% !important;
// }
//
// .calendar-full-width .rdp-row,
// .calendar-full-width .rdp-head_row {
//   display: flex !important;
//   width: 100% !important;
// }
//
// .calendar-full-width .rdp-cell,
// .calendar-full-width .rdp-head_cell {
//   display: flex !important;
//   flex: 1 1 0% !important;
//   min-width: 0 !important;
//   max-width: 100% !important;
//   height: auto !important;
//   aspect-ratio: unset !important;
//   justify-content: center;
//   align-items: center;
//   padding: 0 !important;
// }
//
// This is necessary to make the calendar grid truly responsive and fill the width of the container.
"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Edit, Eye, Plus, CheckCircle, XCircle, RefreshCw, Trash2, ChevronLeft, ChevronRight, FileDown, Printer, Clock, MoreHorizontal } from "lucide-react"
import CalendarFillIcon from 'remixicon-react/CalendarFillIcon'
import User3FillIcon from 'remixicon-react/User3FillIcon'
import UserAddFillIcon from 'remixicon-react/UserAddFillIcon'
import CloseCircleFillIcon from 'remixicon-react/CloseCircleFillIcon'
import { format, isWithinInterval, parseISO, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, isSameMonth, isSameDay, addDays, format as formatDate, getYear, getMonth } from 'date-fns';
import { Card, CardContent } from "@/components/ui/card"
import { DialogHeader } from "@/components/ui/dialog"
import Link from "next/link"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { Calendar as ModernCalendar } from "@/components/ui/calendar"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { useToast } from "@/hooks/use-toast"
import { useRef } from "react"
import { buttonVariants } from "@/components/ui/button";

// CSS override for calendar width
const calendarStyles = `
  .calendar-full-width .rdp {
    width: 100% !important;
    max-width: none !important;
  }
  .calendar-full-width .rdp-table {
    width: 100% !important;
  }
  .calendar-full-width .rdp-head_cell,
  .calendar-full-width .rdp-cell {
    flex: 1 !important;
    min-width: auto !important;
  }
`

// Mock data
const mockPatients = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Smith" },
  { id: 3, name: "Alex Lee" },
  { id: 4, name: "Maria Garcia" },
  { id: 5, name: "Robert Wilson" },
  { id: 6, name: "Sarah Johnson" },
  { id: 7, name: "Michael Brown" },
  { id: 8, name: "Emily Davis" },
  { id: 9, name: "David Miller" },
  { id: 10, name: "Lisa Anderson" },
  { id: 11, name: "James Taylor" },
  { id: 12, name: "Jennifer White" },
  { id: 13, name: "Christopher Martinez" },
  { id: 14, name: "Amanda Thompson" },
]
const mockDoctors = [
  { id: 1, name: "Dr. Abdul Ali" },
  { id: 2, name: "Dr. Asif Ali" },
  { id: 3, name: "Dr. Sajid Ali" },
]
const statusOptions = [
  { value: "scheduled", label: "Scheduled", icon: <CalendarFillIcon className="h-4 w-4 mr-1" /> },
  { value: "completed", label: "Completed", icon: <CheckCircle className="h-4 w-4 mr-1 text-green-600" /> },
  { value: "cancelled", label: "Cancelled", icon: <XCircle className="h-4 w-4 mr-1 text-red-600" /> },
  { value: "no-show", label: "No-show", icon: <CloseCircleFillIcon className="h-4 w-4 mr-1 text-yellow-600" /> },
  { value: "rescheduled", label: "Rescheduled", icon: <RefreshCw className="h-4 w-4 mr-1 text-blue-600" /> },
]
const initialAppointments = [
  {
    id: 1,
    patientId: 1,
    doctorId: 1,
    date: new Date(2025, 6, 22, 9, 0),
    status: "scheduled",
    notes: "First visit."
  },
  {
    id: 2,
    patientId: 2,
    doctorId: 2,
    date: new Date(2025, 6, 22, 11, 30),
    status: "scheduled",
    notes: "Follow-up."
  },
  {
    id: 3,
    patientId: 3,
    doctorId: 3,
    date: new Date(2025, 6, 22, 14, 0),
    status: "completed",
    notes: "Routine checkup."
  },
  {
    id: 4,
    patientId: 4,
    doctorId: 1,
    date: new Date(2025, 6, 22, 16, 0),
    status: "scheduled",
    notes: "Consultation."
  },
  {
    id: 5,
    patientId: 5,
    doctorId: 2,
    date: new Date(2025, 6, 22, 17, 30),
    status: "cancelled",
    notes: "Patient cancelled."
  },
  {
    id: 6,
    patientId: 6,
    doctorId: 3,
    date: new Date(2025, 6, 23, 10, 0),
    status: "scheduled",
    notes: "New patient."
  },
  {
    id: 7,
    patientId: 7,
    doctorId: 1,
    date: new Date(2025, 6, 24, 14, 0),
    status: "scheduled",
    notes: "Follow-up."
  },
  {
    id: 8,
    patientId: 8,
    doctorId: 2,
    date: new Date(2025, 6, 25, 9, 30),
    status: "completed",
    notes: "Routine checkup."
  },
  {
    id: 9,
    patientId: 9,
    doctorId: 3,
    date: new Date(2025, 6, 26, 11, 0),
    status: "scheduled",
    notes: "Consultation."
  },
  {
    id: 10,
    patientId: 10,
    doctorId: 1,
    date: new Date(2025, 6, 27, 15, 0),
    status: "scheduled",
    notes: "New patient."
  },
  {
    id: 11,
    patientId: 11,
    doctorId: 2,
    date: new Date(2025, 6, 28, 10, 30),
    status: "no-show",
    notes: "Patient didn't show up."
  },
  {
    id: 12,
    patientId: 12,
    doctorId: 3,
    date: new Date(2025, 6, 29, 13, 0),
    status: "scheduled",
    notes: "Follow-up."
  },
  {
    id: 13,
    patientId: 13,
    doctorId: 1,
    date: new Date(2025, 6, 30, 16, 30),
    status: "cancelled",
    notes: "Patient cancelled."
  },
  {
    id: 14,
    patientId: 14,
    doctorId: 2,
    date: new Date(2025, 7, 1, 9, 0),
    status: "scheduled",
    notes: "Routine checkup."
  },
]

type Appointment = {
  id: number;
  patientId: number;
  doctorId: number;
  date: Date;
  status: string;
  notes?: string;
};
type AppointmentForm = {
  id: number | null;
  patientId: number;
  doctorId: number;
  date: string;
  status: string;
  notes: string;
};

function CustomCalendar({ appointments, onDayClick, selectedDate, setSelectedDate, statusColors, mockPatients, mockDoctors }) {
  // Use selectedDate as the source of truth for viewDate
  const [viewDate, setViewDate] = useState(selectedDate || new Date(2025, 6, 1));
  
  // Sync viewDate with selectedDate prop whenever it changes
  useEffect(() => {
    setViewDate(selectedDate);
  }, [selectedDate]);
  
  const year = getYear(viewDate);
  const month = getMonth(viewDate);

  // Only allow navigation within the current year
  const canPrev = month > 0;
  const canNext = month < 11;

  const monthStart = startOfMonth(viewDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 0 });
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 0 });

  // Generate all days for the calendar grid
  const allDays = [];
  let currentDay = startDate;
  while (currentDay <= endDate) {
    allDays.push(currentDay);
    currentDay = addDays(currentDay, 1);
  }

  // Group days into weeks
  const weeks = [];
  for (let i = 0; i < allDays.length; i += 7) {
    weeks.push(allDays.slice(i, i + 7));
  }

  const rows = weeks.map((weekDays, weekIndex) => (
    <div key={`week-${weekIndex}`} className="grid grid-cols-7 w-full flex-1 min-h-0">
      {weekDays.map((day) => {
        const formattedDate = formatDate(day, 'd');
        const dayAppointments = appointments.filter(a => isSameDay(a.date, day));
        
        // Sort appointments by time
        const sortedAppointments = dayAppointments.sort((a, b) => a.date.getTime() - b.date.getTime());
        
        // Limit visible appointments to prevent overflow
        const maxVisibleAppointments = 3;
        const visibleAppointments = sortedAppointments.slice(0, maxVisibleAppointments);
        const hiddenCount = sortedAppointments.length - maxVisibleAppointments;
        
        return (
          <button
            key={day.toISOString()}
            className={
              'border border-muted-foreground/10 flex flex-col items-start justify-start p-1 min-h-[100px] h-full w-full flex-1 cursor-pointer hover:bg-gray-300 hover:border-gray-400 dark:hover:bg-accent/20 dark:hover:border-accent/30 transition-colors relative text-left' +
              (isSameMonth(day, monthStart) ? '' : ' opacity-40') +
              (isSameDay(day, new Date()) ? ' bg-accent/30' : '')
            }
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (onDayClick) {
                onDayClick(day);
              }
            }}
          >
            <div className="flex items-center justify-between w-full mb-1 relative z-20">
              <span className="text-xs font-semibold">{formattedDate}</span>
              {sortedAppointments.length > 0 && (
                <span className="text-xs bg-primary/10 text-primary px-1.5 py-0.5 rounded-full font-medium">
                  {sortedAppointments.length}
                </span>
              )}
            </div>
            
            <div className="flex flex-col gap-0.5 w-full items-start relative z-20">
              {visibleAppointments.map((a, i) => {
                const patient = mockPatients.find(p => p.id === a.patientId);
                const doctor = mockDoctors.find(d => d.id === a.doctorId);
                const timeStr = formatDate(a.date, 'HH:mm');
                const patientInitial = patient?.name?.charAt(0) || '?';
                const doctorInitial = doctor?.name?.split(' ').pop()?.charAt(0) || '?';
                
                return (
                  <div
                    key={a.id + '-' + i}
                    className={`w-full flex items-center gap-1 px-1 py-0.5 rounded text-xs ${statusColors[a.status] || 'bg-gray-400'} text-white`}
                    title={`${patient?.name} with ${doctor?.name} @ ${timeStr} - ${a.status}`}
                  >
                    <span className="font-medium text-[10px] min-w-[20px]">{timeStr}</span>
                    <span className="truncate flex-1">{patientInitial}.{doctorInitial}</span>
                    <div className={`w-1.5 h-1.5 rounded-full ${a.status === 'completed' ? 'bg-green-300' : a.status === 'cancelled' ? 'bg-red-300' : a.status === 'no-show' ? 'bg-yellow-300' : 'bg-white/70'}`} />
                  </div>
                );
              })}
              
              {hiddenCount > 0 && (
                <div className="w-full text-center text-xs text-muted-foreground bg-muted/50 px-1 py-0.5 rounded">
                  +{hiddenCount} more
                </div>
              )}
            </div>
          </button>
        );
      })}
    </div>
  ));

  const monthName = formatDate(viewDate, 'MMMM');

  return (
    <div className="flex flex-col h-full w-full" key={`calendar-${formatDate(viewDate, 'yyyy-MM')}`}>
      <div className="flex items-center justify-between mb-2 px-4 pt-4">
        <button
          onClick={() => canPrev && setSelectedDate(subMonths(viewDate, 1))}
          disabled={!canPrev}
          aria-label="Previous Month"
          className={buttonVariants({ variant: 'outline', size: 'icon' }) + " mr-2"}
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <span className="font-semibold text-lg">{monthName} {year}</span>
        <button
          onClick={() => canNext && setSelectedDate(addMonths(viewDate, 1))}
          disabled={!canNext}
          aria-label="Next Month"
          className={buttonVariants({ variant: 'outline', size: 'icon' }) + " ml-2"}
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
      
      <div className="grid grid-cols-7 w-full text-center text-xs font-bold mb-2">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => <div key={d}>{d}</div>)}
      </div>
      <div className="flex-1 flex flex-col gap-0 w-full h-full min-h-0">
        {rows}
      </div>
    </div>
  );
}

export default function AdminAppointmentsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments)
  const [selected, setSelected] = useState<Appointment | null>(null)
  const [showDetails, setShowDetails] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState<AppointmentForm>({
    id: null,
    patientId: mockPatients[0].id,
    doctorId: mockDoctors[0].id,
    date: "",
    status: "scheduled",
    notes: ""
  })
  const [filter, setFilter] = useState("")
  const [removeAppt, setRemoveAppt] = useState<Appointment | null>(null)
  const [selectedIds, setSelectedIds] = useState<number[]>([])
  const [rescheduleAppt, setRescheduleAppt] = useState<Appointment | null>(null)
  const [rescheduleDate, setRescheduleDate] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [doctorFilter, setDoctorFilter] = useState("all")
  const [dateRange, setDateRange] = useState<{ from: string; to: string }>({ from: "", to: "" })
  const [view, setView] = useState<'table' | 'calendar'>('table')
  const { toast } = useToast()
  const [calendarDate, setCalendarDate] = useState(new Date(2025, 6, 1)) // July 2025
  const [calendarDayAppts, setCalendarDayAppts] = useState<Appointment[] | null>(null)
  const calendarRef = useRef<any>(null)
  
  // Reminder functionality
  const [reminderAppt, setReminderAppt] = useState<Appointment | null>(null)
  const [reminderForm, setReminderForm] = useState({
    method: "email",
    message: "",
    sendNow: true,
    scheduledTime: ""
  })

  // Open modal if ?add=1 is present
  useEffect(() => {
    if (searchParams?.get("add") === "1") {
      setShowForm(true);
    }
  }, [searchParams]);

  // When modal closes, remove ?add=1 from URL
  function handleShowFormChange(open: boolean) {
    setShowForm(open);
    if (!open && searchParams?.get("add") === "1") {
      const params = new URLSearchParams(Array.from(searchParams.entries()));
      params.delete("add");
      router.replace(`/admin/appointments${params.size ? "?" + params.toString() : ""}`);
    }
  }

  // Filtered appointments
  const filtered = appointments.filter(a => {
    const patient = mockPatients.find(p => p.id === a.patientId)?.name.toLowerCase() || ""
    const doctor = mockDoctors.find(d => d.id === a.doctorId)?.name.toLowerCase() || ""
    const matchesSearch =
      patient.includes(filter.toLowerCase()) ||
      doctor.includes(filter.toLowerCase()) ||
      format(a.date, "yyyy-MM-dd HH:mm").includes(filter)
    const matchesStatus = statusFilter === 'all' || a.status === statusFilter
    const matchesDoctor = doctorFilter === 'all' || String(a.doctorId) === doctorFilter
    const matchesDate =
      (!dateRange.from || a.date >= parseISO(dateRange.from)) &&
      (!dateRange.to || a.date <= parseISO(dateRange.to))
    return matchesSearch && matchesStatus && matchesDoctor && matchesDate
  })
  const allSelected = filtered.length > 0 && filtered.every(a => selectedIds.includes(a.id))

  function handleExportCSV() {
    const rows = [
      ["Patient", "Doctor", "Date/Time", "Status", "Notes"],
      ...filtered.map(appt => [
        mockPatients.find(p => p.id === appt.patientId)?.name,
        mockDoctors.find(d => d.id === appt.doctorId)?.name,
        format(appt.date, "yyyy-MM-dd HH:mm"),
        appt.status,
        appt.notes || ""
      ])
    ]
    const csv = rows.map(r => r.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(",")).join("\n")
    const blob = new Blob([csv], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `appointments-${Date.now()}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }
  function handlePrint() {
    window.print()
  }
  function handleOpenDetails(appt: Appointment) {
    setSelected(appt)
    setShowDetails(true)
  }
  function handleOpenForm(appt: Appointment | null = null) {
    if (appt) {
      setForm({
        id: appt.id,
        patientId: appt.patientId,
        doctorId: appt.doctorId,
        date: format(appt.date, "yyyy-MM-dd'T'HH:mm"),
        status: appt.status,
        notes: appt.notes || ""
      })
    } else {
      setForm({
        id: null,
        patientId: mockPatients[0].id,
        doctorId: mockDoctors[0].id,
        date: "",
        status: "scheduled",
        notes: ""
      })
    }
    setShowForm(true)
  }
  function handleSaveForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const newAppt = {
      ...form,
      id: form.id || Math.max(...appointments.map(a => a.id)) + 1,
      date: new Date(form.date)
    }
    setAppointments(prev => {
      if (form.id) {
        return prev.map(a => a.id === form.id ? newAppt : a)
      } else {
        return [...prev, newAppt]
      }
    })
    setShowForm(false)
  }
  function handleStatusChange(id: number, status: string) {
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status } : a))
  }
  function handleDelete(id: number) {
    setAppointments(prev => prev.filter(a => a.id !== id))
    setRemoveAppt(null)
  }
  function toggleSelect(id: number) {
    setSelectedIds(ids => ids.includes(id) ? ids.filter(i => i !== id) : [...ids, id])
  }
  function toggleSelectAll() {
    if (allSelected) setSelectedIds([])
    else setSelectedIds(filtered.map(a => a.id))
  }
  function handleBulkDelete() {
    setAppointments(prev => prev.filter(a => !selectedIds.includes(a.id)))
    setSelectedIds([])
  }
  function handleBulkStatus(status: string) {
    setAppointments(prev => prev.map(a => selectedIds.includes(a.id) ? { ...a, status } : a))
    setSelectedIds([])
  }
  function handleBulkReminder() {
    // For bulk reminders, we'll send to all selected appointments
    const selectedAppointments = appointments.filter(appt => selectedIds.includes(appt.id))
    if (selectedAppointments.length === 0) {
      toast({ title: "No appointments selected", description: "Please select appointments to send reminders to" })
      return
    }
    
    // Mock: send bulk reminders
    toast({ 
      title: "Bulk reminders sent!", 
      description: `Reminders sent to ${selectedAppointments.length} patients` 
    })
    
    // Clear selection after sending
    setSelectedIds([])
  }
  function handleBulkExport() {
    // Mock: just clear selection and show a toast in real app
    setSelectedIds([])
    alert("Exported!")
  }
  function handleOpenReschedule(appt: Appointment) {
    setRescheduleAppt(appt)
    setRescheduleDate(format(appt.date, "yyyy-MM-dd'T'HH:mm"))
  }
  function handleReschedule(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!rescheduleAppt) return
    setAppointments(prev => prev.map(a =>
      a.id === rescheduleAppt.id
        ? { ...a, date: new Date(rescheduleDate), status: "rescheduled", notes: (a.notes ? a.notes + "\n" : "") + `Rescheduled to ${format(new Date(rescheduleDate), "yyyy-MM-dd HH:mm")}` }
        : a
    ))
    setRescheduleAppt(null)
    setRescheduleDate("")
  }

  function handleSendReminder(appt: Appointment) {
    setReminderAppt(appt)
    // Set default message based on appointment
    const patientName = mockPatients.find(p => p.id === appt.patientId)?.name
    const doctorName = mockDoctors.find(d => d.id === appt.doctorId)?.name
    const appointmentDate = format(appt.date, "EEEE, MMMM do, yyyy 'at' h:mm a")
    
    setReminderForm({
      method: "email",
      message: `Dear ${patientName},\n\nThis is a friendly reminder of your upcoming appointment with ${doctorName} on ${appointmentDate}.\n\nPlease arrive 15 minutes before your scheduled time to complete any necessary paperwork.\n\nIf you need to reschedule or cancel, please contact us at least 24 hours in advance.\n\nWe look forward to seeing you!\n\nBest regards,\nHouston Cardiology Consultants`,
      sendNow: true,
      scheduledTime: ""
    })
  }

  function handleCalendarDayClick(date: Date) {
    const appts = appointments.filter(a => format(a.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd'));
    setCalendarDayAppts(appts);
  }
  function handleCalendarToday() {
    setCalendarDate(new Date())
    if (calendarRef.current) calendarRef.current.activeStartDate = new Date()
  }

  function handleToday() {
    const today = new Date();
    const todayStr = format(today, 'yyyy-MM-dd');
    
    // For calendar view: navigate to today's date
    if (view === 'calendar') {
      setCalendarDate(today);
    }
    
    // For table view: filter to show only today's appointments
    if (view === 'table') {
      setDateRange({ from: todayStr, to: todayStr });
    }
  }

  const statusColors: Record<string, string> = {
    scheduled: "bg-blue-500",
    completed: "bg-green-500",
    cancelled: "bg-red-500",
    "no-show": "bg-yellow-500",
    rescheduled: "bg-purple-500",
  }

  return (
    <div className="h-full min-h-screen flex flex-col">
      <style>{calendarStyles}</style>
      <div className="mb-2">
        <h1 className="text-2xl font-bold flex items-center gap-2 mb-2"><CalendarFillIcon className="h-6 w-6" /> Appointments</h1>
        <div className="flex flex-row items-center justify-between w-full mb-4">
          <div className="flex items-center gap-2">
            <Tabs value={view} onValueChange={setView} className="">
              <TabsList className="justify-start">
                <TabsTrigger value="table">Table</TabsTrigger>
                <TabsTrigger value="calendar">Calendar</TabsTrigger>
              </TabsList>
            </Tabs>
            {/* Today Button - positioned immediately to the right of the toggle */}
            <Button variant="outline" onClick={handleToday} className="sm:hidden" size="icon" aria-label="Today">
              <Clock className="h-5 w-5" />
            </Button>
            <Button variant="outline" onClick={handleToday} className="hidden sm:inline-flex">
              Today
            </Button>
          </div>
          <div className="flex flex-row gap-2 items-center ml-auto">
            {/* Export to CSV: icon on mobile, text on sm+ */}
            <Button variant="outline" onClick={handleExportCSV} className="sm:hidden" size="icon" aria-label="Export to CSV">
              <FileDown className="h-5 w-5" />
            </Button>
            <Button variant="outline" onClick={handleExportCSV} className="hidden sm:inline-flex">
              Export to CSV
            </Button>
            {/* Print: icon on mobile, text on sm+ */}
            <Button variant="outline" onClick={handlePrint} className="sm:hidden" size="icon" aria-label="Print">
              <Printer className="h-5 w-5" />
            </Button>
            <Button variant="outline" onClick={handlePrint} className="hidden sm:inline-flex">
              Print
            </Button>
            {selectedIds.length > 0 && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">Bulk Actions</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={handleBulkDelete}>Delete</DropdownMenuItem>
                  <DropdownMenuItem onClick={handleBulkReminder}>Send Reminder</DropdownMenuItem>
                  <DropdownMenuItem onClick={handleBulkExport}>Export</DropdownMenuItem>
                  <DropdownMenuItem>
                    <div className="flex flex-col gap-1">
                      {statusOptions.map(opt => (
                        <Button key={opt.value} variant="ghost" className="w-full justify-start" onClick={() => handleBulkStatus(opt.value)}>{opt.label}</Button>
                      ))}
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            {/* New Appointment: icon on mobile, text on sm+ */}
            <Button variant="default" onClick={() => router.push("/admin/appointments?add=1")} className="sm:hidden" size="icon" aria-label="New Appointment">
              <Plus className="h-5 w-5" />
            </Button>
            <Button variant="default" onClick={() => router.push("/admin/appointments?add=1")} className="hidden sm:inline-flex">
              <Plus className="h-4 w-4 mr-2" /> New Appointment
            </Button>
          </div>
        </div>
      </div>
      <div className="mb-4 flex flex-col sm:flex-row gap-2 sm:gap-2 w-full">
        <Input
          placeholder="Search by patient, doctor, or date"
          value={filter}
          onChange={e => setFilter(e.target.value)}
          className="w-full sm:max-w-xs"
        />
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-36"><SelectValue placeholder="Status" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            {statusOptions.map(opt => (
              <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={doctorFilter} onValueChange={setDoctorFilter}>
          <SelectTrigger className="w-full sm:w-36"><SelectValue placeholder="Doctor" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Doctors</SelectItem>
            {mockDoctors.map(d => (
              <SelectItem key={d.id} value={String(d.id)}>{d.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <div className="flex items-center gap-1 w-full sm:w-auto">
            <label className="text-xs text-muted-foreground whitespace-nowrap">From</label>
            <Input type="date" value={dateRange.from} onChange={e => setDateRange(r => ({ ...r, from: e.target.value }))} className="w-full sm:w-36" />
          </div>
          <div className="flex items-center gap-1 w-full sm:w-auto">
            <label className="text-xs text-muted-foreground whitespace-nowrap">To</label>
            <Input type="date" value={dateRange.to} onChange={e => setDateRange(r => ({ ...r, to: e.target.value }))} className="w-full sm:w-36" />
          </div>
        </div>
      </div>
      <main className="flex-1 h-full min-h-0 flex flex-col">
        <Card>
          <CardContent className="p-0 overflow-hidden">
            {view === 'table' && (
              <div className="overflow-x-auto hidden sm:block">
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead>
                      <tr className="border-b bg-muted text-muted-foreground">
                        <th className="py-2 px-3 text-left font-semibold rounded-tl-lg w-12">
                          <input type="checkbox" checked={allSelected} onChange={toggleSelectAll} />
                        </th>
                        <th className="py-2 px-3 text-left font-semibold w-1/4">Patient</th>
                        <th className="py-2 px-3 text-left font-semibold w-1/4">Doctor</th>
                        <th className="py-2 px-3 text-left font-semibold w-1/3">Date/Time</th>
                        <th className="py-2 px-3 text-left font-semibold w-32">Status</th>
                        <th className="py-2 px-3 text-left font-semibold rounded-tr-lg w-16">Actions</th>
                      </tr>
                    </thead>
                  <tbody>
                    {filtered.length === 0 && (
                      <tr><td colSpan={6} className="text-center py-8 text-muted-foreground">No appointments found.</td></tr>
                    )}
                    {filtered.map(appt => (
                      <tr 
                        key={appt.id} 
                        className={`border-b hover:bg-gray-300 transition-colors cursor-pointer ${
                          selectedIds.includes(appt.id) ? 'bg-blue-50 border-blue-200' : ''
                        }`}
                        onClick={() => toggleSelect(appt.id)}
                      >
                        <td className="py-2 px-3" onClick={(e) => e.stopPropagation()}>
                          <input 
                            type="checkbox" 
                            checked={selectedIds.includes(appt.id)} 
                            onChange={() => toggleSelect(appt.id)} 
                          />
                        </td>
                        <td className="py-2 px-3 font-medium">{mockPatients.find(p => p.id === appt.patientId)?.name}</td>
                        <td className="py-2 px-3">{mockDoctors.find(d => d.id === appt.doctorId)?.name}</td>
                        <td className="py-2 px-3">{format(appt.date, "MMM dd, yyyy 'at' h:mm a")}</td>
                        <td className="py-2 px-3">
                          <Select value={appt.status} onValueChange={v => handleStatusChange(appt.id, v)}>
                            <SelectTrigger className="w-32" onClick={(e) => e.stopPropagation()}>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {statusOptions.map(opt => (
                                <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </td>
                        <td className="py-2 px-3">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleOpenDetails(appt)}>
                                <Eye className="h-4 w-4 mr-2" /> View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleOpenForm(appt)}>
                                <Edit className="h-4 w-4 mr-2" /> Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleOpenReschedule(appt)}>
                                <RefreshCw className="h-4 w-4 mr-2" /> Reschedule
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleSendReminder(appt)}>
                                <UserAddFillIcon className="h-4 w-4 mr-2" /> Send Reminder
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem 
                                onClick={() => setRemoveAppt(appt)}
                                className="text-red-600 focus:text-red-600"
                              >
                                <Trash2 className="h-4 w-4 mr-2" /> Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                </div>
              </div>
            )}
            {view === 'calendar' && (
              <div className="flex flex-col flex-1 min-h-0 p-0 sm:p-4 h-full">
                {/* Desktop Legend */}
                <div className="hidden sm:flex items-center gap-4 mb-2 px-4 pt-4">
                  <span className="font-semibold text-xs">Legend:</span>
                  <span className="flex items-center gap-1 text-xs"><span className="w-3 h-3 rounded-full bg-blue-500 inline-block" /> Scheduled</span>
                  <span className="flex items-center gap-1 text-xs"><span className="w-3 h-3 rounded-full bg-green-500 inline-block" /> Completed</span>
                  <span className="flex items-center gap-1 text-xs"><span className="w-3 h-3 rounded-full bg-red-500 inline-block" /> Cancelled</span>
                  <span className="flex items-center gap-1 text-xs"><span className="w-3 h-3 rounded-full bg-yellow-500 inline-block" /> No-show</span>
                  <span className="flex items-center gap-1 text-xs"><span className="w-3 h-3 rounded-full bg-purple-500 inline-block" /> Rescheduled</span>
                </div>
                {/* Mobile Legend */}
                <div className="sm:hidden px-4 pt-2 pb-1">
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="font-semibold text-xs">Legend:</span>
                    <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block" /> Scheduled</span>
                    <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-green-500 inline-block" /> Completed</span>
                    <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" /> Cancelled</span>
                    <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-yellow-500 inline-block" /> No-show</span>
                    <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-purple-500 inline-block" /> Rescheduled</span>
                  </div>
                </div>
                <div className="calendar-viewport flex-1 w-full h-full min-h-0">
                  <CustomCalendar
                    key={`calendar-${formatDate(calendarDate, 'yyyy-MM')}`}
                    appointments={appointments}
                    onDayClick={handleCalendarDayClick}
                    selectedDate={calendarDate}
                    setSelectedDate={setCalendarDate}
                    statusColors={statusColors}
                    mockPatients={mockPatients}
                    mockDoctors={mockDoctors}
                  />
                </div>
              </div>
            )}
            {/* Mobile Card List (only in table view) */}
            {view === 'table' && (
              <div className="sm:hidden flex flex-col gap-3 p-4">
                {filtered.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">No appointments found.</div>
                )}
                {filtered.map(appt => {
                  const patient = mockPatients.find(p => p.id === appt.patientId);
                  const doctor = mockDoctors.find(d => d.id === appt.doctorId);
                  
                  return (
                    <div key={appt.id} className="rounded-lg border p-4 hover:bg-gray-300 transition-all duration-200 cursor-pointer dark:hover:bg-yellow-900/40">
                      {/* Header with patient name and status */}
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className={`w-3 h-3 rounded-full ${statusColors[appt.status] || 'bg-gray-400'}`} />
                          <div>
                            <div className="font-semibold text-base">{patient?.name}</div>
                            <div className="text-sm text-muted-foreground">{format(appt.date, 'MMM dd, yyyy')}</div>
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleOpenDetails(appt)}>
                              <Eye className="h-4 w-4 mr-2" /> View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleOpenForm(appt)}>
                              <Edit className="h-4 w-4 mr-2" /> Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleOpenReschedule(appt)}>
                              <RefreshCw className="h-4 w-4 mr-2" /> Reschedule
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleSendReminder(appt)}>
                              <UserAddFillIcon className="h-4 w-4 mr-2" /> Send Reminder
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              onClick={() => setRemoveAppt(appt)}
                              className="text-red-600 focus:text-red-600"
                            >
                              <Trash2 className="h-4 w-4 mr-2" /> Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      
                      {/* Details */}
                      <div className="space-y-2 mb-3">
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{format(appt.date, 'h:mm a')}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <User3FillIcon className="h-4 w-4 text-muted-foreground" />
                          <span>Dr. {doctor?.name}</span>
                        </div>
                        {appt.notes && (
                          <div className="text-sm text-muted-foreground bg-muted/50 p-2 rounded">
                            <span className="font-medium">Notes:</span> {appt.notes}
                          </div>
                        )}
                      </div>
                      
                      {/* Status */}
                      <div className="flex items-center justify-between">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          appt.status === 'scheduled' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400' :
                          appt.status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' :
                          appt.status === 'cancelled' ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400' :
                          appt.status === 'no-show' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' :
                          'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
                        }`}>
                          {appt.status.charAt(0).toUpperCase() + appt.status.slice(1)}
                        </span>
                        <input 
                          type="checkbox" 
                          checked={selectedIds.includes(appt.id)} 
                          onChange={() => toggleSelect(appt.id)}
                          className="h-4 w-4"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
      {/* Add/Edit Appointment Modal */}
      <Dialog open={showForm} onOpenChange={handleShowFormChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{form.id ? "Edit Appointment" : "New Appointment"}</DialogTitle>
          </DialogHeader>
          <form className="space-y-4" onSubmit={handleSaveForm}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium mb-1">Patient</label>
                <Select value={String(form.patientId)} onValueChange={v => setForm(f => ({ ...f, patientId: Number(v) }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {mockPatients.map(p => (
                      <SelectItem key={p.id} value={String(p.id)}>{p.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">Doctor</label>
                <Select value={String(form.doctorId)} onValueChange={v => setForm(f => ({ ...f, doctorId: Number(v) }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {mockDoctors.map(d => (
                      <SelectItem key={d.id} value={String(d.id)}>{d.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-medium mb-1">Date & Time</label>
                <Input
                  type="datetime-local"
                  value={form.date}
                  onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">Status</label>
                <Select value={form.status} onValueChange={v => setForm(f => ({ ...f, status: v }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {statusOptions.map(opt => (
                      <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-medium mb-1">Notes</label>
                <Textarea
                  value={form.notes}
                  onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                  rows={2}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" className="w-full">{form.id ? "Save Changes" : "Create Appointment"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      {/* Remove Appointment Confirmation */}
      <Dialog open={!!removeAppt} onOpenChange={v => { if (!v) setRemoveAppt(null) }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Remove Appointment</DialogTitle>
          </DialogHeader>
          {removeAppt && (
            <div className="space-y-4">
              <div>Are you sure you want to remove this appointment for <b>{mockPatients.find(p => p.id === removeAppt.patientId)?.name}</b>?</div>
              <DialogFooter>
                <Button type="button" variant="destructive" className="w-full" onClick={() => handleDelete(removeAppt.id)}>Remove</Button>
                <Button type="button" variant="ghost" className="w-full" onClick={() => setRemoveAppt(null)}>Cancel</Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
      {/* Details Modal */}
      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Appointment Details</DialogTitle>
          </DialogHeader>
          {selected && (
            <div className="space-y-2">
              <div><span className="font-medium">Patient:</span> {mockPatients.find(p => p.id === selected.patientId)?.name}</div>
              <div><span className="font-medium">Doctor:</span> {mockDoctors.find(d => d.id === selected.doctorId)?.name}</div>
              <div><span className="font-medium">Date/Time:</span> {format(selected.date, "yyyy-MM-dd HH:mm")}</div>
              <div><span className="font-medium">Status:</span> {statusOptions.find(opt => opt.value === selected.status)?.label}</div>
              <div><span className="font-medium">Notes:</span> {selected.notes || "-"}</div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" className="w-full" onClick={() => setShowDetails(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* Reschedule Modal */}
      <Dialog open={!!rescheduleAppt} onOpenChange={v => { if (!v) setRescheduleAppt(null) }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reschedule Appointment</DialogTitle>
          </DialogHeader>
          {rescheduleAppt && (
            <form className="space-y-4" onSubmit={handleReschedule}>
              <div>
                <label className="block text-xs font-medium mb-1">New Date & Time</label>
                <Input
                  type="datetime-local"
                  value={rescheduleDate}
                  onChange={e => setRescheduleDate(e.target.value)}
                  required
                />
              </div>
              <DialogFooter>
                <Button type="submit" className="w-full">Reschedule</Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
      {/* Calendar Day Appointments Modal */}
      <Dialog open={!!calendarDayAppts} onOpenChange={v => { if (!v) setCalendarDayAppts(null) }}>
        <DialogContent className="max-w-4xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle>
              Appointments for {calendarDayAppts && calendarDayAppts[0] ? format(calendarDayAppts[0].date, 'EEEE, MMMM do, yyyy') : ''}
              {calendarDayAppts && calendarDayAppts.length > 0 && (
                <span className="text-sm font-normal text-muted-foreground ml-2">
                  ({calendarDayAppts.length} appointment{calendarDayAppts.length !== 1 ? 's' : ''})
                </span>
              )}
            </DialogTitle>
          </DialogHeader>
          {calendarDayAppts && calendarDayAppts.length > 0 ? (
            <div className="space-y-4 max-h-[60vh] overflow-y-auto">
              {/* Summary Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-3 bg-muted/30 rounded-lg">
                <div className="text-center">
                  <div className="text-lg font-bold text-blue-600">
                    {calendarDayAppts.filter(a => a.status === 'scheduled').length}
                  </div>
                  <div className="text-xs text-muted-foreground">Scheduled</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-green-600">
                    {calendarDayAppts.filter(a => a.status === 'completed').length}
                  </div>
                  <div className="text-xs text-muted-foreground">Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-red-600">
                    {calendarDayAppts.filter(a => a.status === 'cancelled').length}
                  </div>
                  <div className="text-xs text-muted-foreground">Cancelled</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-yellow-600">
                    {calendarDayAppts.filter(a => a.status === 'no-show').length}
                  </div>
                  <div className="text-xs text-muted-foreground">No Show</div>
                </div>
              </div>
              
              {/* Appointments List - Sorted by Time */}
              <div className="space-y-2">
                {calendarDayAppts
                  .sort((a, b) => a.date.getTime() - b.date.getTime())
                  .map(appt => {
                    const patient = mockPatients.find(p => p.id === appt.patientId);
                    const doctor = mockDoctors.find(d => d.id === appt.doctorId);
                    
                    return (
                      <div key={appt.id} className="rounded border p-3 hover:bg-gray-300 transition-all duration-200 cursor-pointer dark:hover:bg-yellow-900/40">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            {/* Main info row: Patient name, time, and status */}
                            <div className="flex items-center gap-2 mb-0.5">
                              <span className={`w-3 h-3 rounded-full ${statusColors[appt.status] || 'bg-gray-400'}`} />
                              <span className="font-semibold text-sm whitespace-nowrap">{patient?.name}</span>
                              <span className="text-xs text-muted-foreground whitespace-nowrap">• {format(appt.date, 'h:mm a')}</span>
                              <span className={`px-1.5 py-0.5 rounded text-xs font-medium ${
                                appt.status === 'scheduled' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400' :
                                appt.status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' :
                                appt.status === 'cancelled' ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400' :
                                appt.status === 'no-show' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' :
                                'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
                              }`}>
                                {appt.status.charAt(0).toUpperCase() + appt.status.slice(1)}
                              </span>
                            </div>
                            
                            {/* Doctor and notes row - more compact */}
                            <div className="ml-5">
                              <span className="text-sm text-muted-foreground">with {doctor?.name}</span>
                              {appt.notes && (
                                <span className="text-sm text-foreground/80 ml-2">
                                  • {appt.notes}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        {/* Action buttons row - optimized for mobile */}
                        <div className="flex gap-1.5 mt-2">
                          <Button size="sm" variant="outline" onClick={() => { handleOpenForm(appt); setCalendarDayAppts(null); }} className="flex-1 h-9 text-xs">
                            <Edit className="h-3.5 w-3.5 mr-1" /> Edit
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => { handleOpenReschedule(appt); setCalendarDayAppts(null); }} className="flex-1 h-9 text-xs">
                            <RefreshCw className="h-3.5 w-3.5 mr-1" /> Reschedule
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => { handleSendReminder(appt); setCalendarDayAppts(null); }} className="flex-1 h-9 text-xs">
                            <UserAddFillIcon className="h-3.5 w-3.5 mr-1" /> Remind
                          </Button>
                          <Button size="sm" variant="destructive" onClick={() => { setRemoveAppt(appt); setCalendarDayAppts(null); }} className="flex-1 h-9 text-xs">
                            <Trash2 className="h-3.5 w-3.5 mr-1" /> Delete
                          </Button>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <CalendarFillIcon className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>No appointments scheduled for this day.</p>
              <Button 
                variant="outline" 
                className="mt-2"
                onClick={() => { 
                  setCalendarDayAppts(null); 
                  router.push("/admin/appointments?add=1"); 
                }}
              >
                <Plus className="h-4 w-4 mr-1" /> Add Appointment
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
      {/* Send Reminder Modal */}
      <Dialog open={!!reminderAppt} onOpenChange={v => { if (!v) setReminderAppt(null) }}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Send Appointment Reminder</DialogTitle>
          </DialogHeader>
          {reminderAppt && (
            <div className="space-y-6">
              {/* Appointment Info */}
              <div className="bg-muted/30 rounded-lg p-4">
                <h3 className="font-semibold mb-2">Appointment Details</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div><span className="font-medium">Patient:</span> {mockPatients.find(p => p.id === reminderAppt.patientId)?.name}</div>
                  <div><span className="font-medium">Doctor:</span> {mockDoctors.find(d => d.id === reminderAppt.doctorId)?.name}</div>
                  <div><span className="font-medium">Date:</span> {format(reminderAppt.date, "EEEE, MMMM do, yyyy")}</div>
                  <div><span className="font-medium">Time:</span> {format(reminderAppt.date, "h:mm a")}</div>
                </div>
              </div>
              
              {/* Reminder Settings */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Delivery Method</label>
                  <Select value={reminderForm.method} onValueChange={v => setReminderForm(f => ({ ...f, method: v }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="sms">SMS</SelectItem>
                      <SelectItem value="both">Email & SMS</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Send Timing</label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="sendNow"
                        checked={reminderForm.sendNow}
                        onChange={() => setReminderForm(f => ({ ...f, sendNow: true }))}
                      />
                      <label htmlFor="sendNow" className="text-sm">Send now</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="schedule"
                        checked={!reminderForm.sendNow}
                        onChange={() => setReminderForm(f => ({ ...f, sendNow: false }))}
                      />
                      <label htmlFor="schedule" className="text-sm">Schedule for later</label>
                    </div>
                    {!reminderForm.sendNow && (
                      <div className="ml-6">
                        <Input
                          type="datetime-local"
                          value={reminderForm.scheduledTime}
                          onChange={e => setReminderForm(f => ({ ...f, scheduledTime: e.target.value }))}
                          min={format(new Date(), "yyyy-MM-dd'T'HH:mm")}
                        />
                      </div>
                    )}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <Textarea
                    value={reminderForm.message}
                    onChange={e => setReminderForm(f => ({ ...f, message: e.target.value }))}
                    rows={8}
                    placeholder="Enter your reminder message..."
                  />
                  <div className="text-xs text-muted-foreground mt-1">
                    Available variables: {reminderAppt ? mockPatients.find(p => p.id === reminderAppt.patientId)?.name : 'patientName'}, {reminderAppt ? mockDoctors.find(d => d.id === reminderAppt.doctorId)?.name : 'doctorName'}, {reminderAppt ? format(reminderAppt.date, "EEEE, MMMM do, yyyy") : 'appointmentDate'}, {reminderAppt ? format(reminderAppt.date, "h:mm a") : 'appointmentTime'}
                  </div>
                </div>
              </div>
              
              <DialogFooter>
                <Button 
                  variant="outline" 
                  onClick={() => setReminderAppt(null)}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={() => {
                    // Mock: send reminder
                    const method = reminderForm.method === 'both' ? 'Email & SMS' : reminderForm.method === 'email' ? 'Email' : 'SMS'
                    const timing = reminderForm.sendNow ? 'now' : `scheduled for ${reminderForm.scheduledTime}`
                    toast({ 
                      title: "Reminder sent!", 
                      description: `${method} reminder sent ${timing} for ${mockPatients.find(p => p.id === reminderAppt.patientId)?.name}` 
                    })
                    setReminderAppt(null)
                  }}
                >
                  Send Reminder
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
} 