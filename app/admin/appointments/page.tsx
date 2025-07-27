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
import { Edit, Eye, Plus, CheckCircle, XCircle, RefreshCw, Trash2, ChevronLeft, ChevronRight, FileDown, Printer, Clock } from "lucide-react"
import CalendarFillIcon from 'remixicon-react/CalendarFillIcon'
import User3FillIcon from 'remixicon-react/User3FillIcon'
import UserAddFillIcon from 'remixicon-react/UserAddFillIcon'
import CloseCircleFillIcon from 'remixicon-react/CloseCircleFillIcon'
import { format, isWithinInterval, parseISO, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, isSameMonth, isSameDay, addDays, format as formatDate, getYear, getMonth } from 'date-fns';
import { Card, CardContent } from "@/components/ui/card"
import { DialogHeader } from "@/components/ui/dialog"
import Link from "next/link"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
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
    date: new Date(2025, 6, 22, 10, 0),
    status: "scheduled",
    notes: "First visit."
  },
  {
    id: 2,
    patientId: 2,
    doctorId: 2,
    date: new Date(2025, 6, 23, 14, 30),
    status: "completed",
    notes: "Follow-up."
  },
  {
    id: 3,
    patientId: 3,
    doctorId: 3,
    date: new Date(2025, 6, 24, 9, 0),
    status: "cancelled",
    notes: "Patient cancelled."
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

function CustomCalendar({ appointments, onDayClick, selectedDate, setSelectedDate, statusColors, mockPatients }) {
  const [viewDate, setViewDate] = useState(new Date());
  const year = getYear(viewDate);
  const month = getMonth(viewDate);

  // Only allow navigation within the current year
  const canPrev = month > 0;
  const canNext = month < 11;

  const monthStart = startOfMonth(viewDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 0 });
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 0 });

  const rows = [];
  let days = [];
  let day = startDate;
  let formattedDate = '';
  let weekIndex = 0;
  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      formattedDate = formatDate(day, 'd');
      const dayAppointments = appointments.filter(a => isSameDay(a.date, day));
      days.push(
        <div
          key={day.toISOString()}
          className={
            'border border-muted-foreground/10 flex flex-col items-start justify-start p-1 min-h-[80px] h-full w-full flex-1' +
            (isSameMonth(day, monthStart) ? '' : ' opacity-40') +
            (isSameDay(day, new Date()) ? ' bg-accent/30' : '')
          }
          onClick={() => onDayClick && onDayClick(day)}
        >
          <span className="text-xs font-semibold mb-1 text-left w-full">{formattedDate}</span>
          <div className="flex flex-col gap-1 w-full items-start">
            {dayAppointments.map((a, i) => (
              <span
                key={a.id + '-' + i}
                className={`truncate text-xs px-1.5 py-0.5 rounded-full bg-opacity-90 text-white mb-0.5 ${statusColors[a.status] || 'bg-gray-400'}`}
                title={`${mockPatients.find(p => p.id === a.patientId)?.name} @ ${formatDate(a.date, 'HH:mm')}`}
              >
                {formatDate(a.date, 'HH:mm')} {mockPatients.find(p => p.id === a.patientId)?.name}
              </span>
            ))}
          </div>
        </div>
      );
      day = addDays(day, 1);
    }
    rows.push(
      <div key={`week-${weekIndex++}`} className="grid grid-cols-7 w-full flex-1 min-h-0">
        {days}
      </div>
    );
    days = [];
  }

  const monthName = formatDate(viewDate, 'MMMM');

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex items-center justify-between mb-2 px-4 pt-4">
        <button
          onClick={() => canPrev && setViewDate(subMonths(viewDate, 1))}
          disabled={!canPrev}
          aria-label="Previous Month"
          className={buttonVariants({ variant: 'outline', size: 'icon' }) + " mr-2"}
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <span className="font-semibold text-lg">{monthName} {year}</span>
        <button
          onClick={() => canNext && setViewDate(addMonths(viewDate, 1))}
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
  const [calendarDate, setCalendarDate] = useState(new Date())
  const [calendarDayAppts, setCalendarDayAppts] = useState<Appointment[] | null>(null)
  const calendarRef = useRef<any>(null)

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
    // Mock: just clear selection and show a toast in real app
    setSelectedIds([])
    alert("Reminders sent!")
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

  function handleSendReminder(id: number) {
    // Mock: show a toast
    toast({ title: "Reminder sent!", description: `Reminder sent for appointment #${id}` })
  }

  function handleCalendarDayClick(date: Date) {
    const appts = filtered.filter(a => format(a.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd'))
    setCalendarDayAppts(appts.length > 0 ? appts : null)
  }
  function handleCalendarToday() {
    setCalendarDate(new Date())
    if (calendarRef.current) calendarRef.current.activeStartDate = new Date()
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
          <Tabs value={view} onValueChange={setView} className="">
            <TabsList className="justify-start">
              <TabsTrigger value="table">Table</TabsTrigger>
              <TabsTrigger value="calendar">Calendar</TabsTrigger>
            </TabsList>
          </Tabs>
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
                        <th className="py-2 px-3 text-left font-semibold rounded-tl-lg">
                          <input type="checkbox" checked={allSelected} onChange={toggleSelectAll} />
                        </th>
                        <th className="py-2 px-3 text-left font-semibold">Patient</th>
                        <th className="py-2 px-3 text-left font-semibold">Doctor</th>
                        <th className="py-2 px-3 text-left font-semibold">Date/Time</th>
                        <th className="py-2 px-3 text-left font-semibold">Status</th>
                        <th className="py-2 px-3 text-left font-semibold rounded-tr-lg">Actions</th>
                      </tr>
                    </thead>
                  <tbody>
                    {filtered.length === 0 && (
                      <tr><td colSpan={7} className="text-center py-8 text-muted-foreground">No appointments found.</td></tr>
                    )}
                    {filtered.map(appt => (
                      <tr key={appt.id} className="border-b hover:bg-accent/50 transition-colors">
                        <td className="py-2 px-3">
                          <input type="checkbox" checked={selectedIds.includes(appt.id)} onChange={() => toggleSelect(appt.id)} />
                        </td>
                        <td className="py-2 px-3 font-medium">{mockPatients.find(p => p.id === appt.patientId)?.name}</td>
                        <td className="py-2 px-3">{mockDoctors.find(d => d.id === appt.doctorId)?.name}</td>
                        <td className="py-2 px-3">{format(appt.date, "yyyy-MM-dd HH:mm")}</td>
                        <td className="py-2 px-3">
                          <Select value={appt.status} onValueChange={v => handleStatusChange(appt.id, v)}>
                            <SelectTrigger className="w-32"><SelectValue /></SelectTrigger>
                            <SelectContent>
                              {statusOptions.map(opt => (
                                <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </td>
                        <td className="py-2 px-3 flex gap-2 flex-wrap">
                          <Button size="sm" variant="outline" onClick={() => handleOpenDetails(appt)}><Eye className="h-4 w-4 mr-1" /> View</Button>
                          <Button size="sm" variant="outline" onClick={() => handleOpenForm(appt)}><Edit className="h-4 w-4" /></Button>
                          <Button size="sm" variant="outline" onClick={() => handleOpenReschedule(appt)}><RefreshCw className="h-4 w-4 mr-1" /> Reschedule</Button>
                          <Button size="sm" variant="destructive" onClick={() => setRemoveAppt(appt)}><Trash2 className="h-4 w-4" /></Button>
                          <Button size="sm" variant="outline" onClick={() => handleSendReminder(appt.id)}><UserAddFillIcon className="h-4 w-4 mr-1" /> Send Reminder</Button>
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
                <div className="hidden sm:flex items-center gap-4 mb-2 px-4 pt-4">
                  <span className="font-semibold">Legend:</span>
                  <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-blue-500 inline-block" /> Scheduled</span>
                  <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-green-500 inline-block" /> Completed</span>
                  <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-red-500 inline-block" /> Cancelled</span>
                  <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-yellow-500 inline-block" /> No-show</span>
                  <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-purple-500 inline-block" /> Rescheduled</span>
                </div>
                <div className="calendar-viewport flex-1 w-full h-full min-h-0">
                  <CustomCalendar
                    appointments={appointments}
                    onDayClick={handleCalendarDayClick}
                    selectedDate={calendarDate}
                    setSelectedDate={setCalendarDate}
                    statusColors={statusColors}
                    mockPatients={mockPatients}
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
                {filtered.map(appt => (
                  <div key={appt.id} className="rounded-lg border bg-card p-4 shadow-sm">
                    {/* Header with patient and status */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <User3FillIcon className="h-5 w-5 text-primary" />
                        <div>
                          <span className="font-semibold text-base">{mockPatients.find(p => p.id === appt.patientId)?.name}</span>
                          <div className="text-sm text-muted-foreground">{mockDoctors.find(d => d.id === appt.doctorId)?.name}</div>
                        </div>
                      </div>
                      <Select value={appt.status} onValueChange={v => handleStatusChange(appt.id, v)}>
                        <SelectTrigger className="w-24 h-8 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {statusOptions.map(opt => (
                            <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {/* Appointment details */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2">
                        <CalendarFillIcon className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{format(appt.date, "MMM dd, yyyy")}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{format(appt.date, "h:mm a")}</span>
                      </div>
                      {appt.notes && (
                        <div className="text-sm text-muted-foreground bg-muted/50 p-2 rounded">
                          <span className="font-medium">Notes:</span> {appt.notes}
                        </div>
                      )}
                    </div>
                    
                    {/* Action buttons - optimized for mobile */}
                    <div className="grid grid-cols-2 gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleOpenDetails(appt)} className="w-full">
                        <Eye className="h-4 w-4 mr-1" /> View
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleOpenForm(appt)} className="w-full">
                        <Edit className="h-4 w-4 mr-1" /> Edit
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleOpenReschedule(appt)} className="w-full">
                        <RefreshCw className="h-4 w-4 mr-1" /> Reschedule
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleSendReminder(appt.id)} className="w-full">
                        <UserAddFillIcon className="h-4 w-4 mr-1" /> Remind
                      </Button>
                    </div>
                    
                    {/* Delete button - separate row for safety */}
                    <Button 
                      size="sm" 
                      variant="destructive" 
                      onClick={() => setRemoveAppt(appt)}
                      className="w-full mt-2"
                    >
                      <Trash2 className="h-4 w-4 mr-1" /> Delete
                    </Button>
                  </div>
                ))}
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
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Appointments for {calendarDayAppts && calendarDayAppts[0] ? format(calendarDayAppts[0].date, 'yyyy-MM-dd') : ''}</DialogTitle>
          </DialogHeader>
          {calendarDayAppts && calendarDayAppts.length > 0 ? (
            <div className="space-y-4">
              {calendarDayAppts.map(appt => (
                <div key={appt.id} className="rounded border p-3 flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className={`w-3 h-3 rounded-full ${statusColors[appt.status] || 'bg-gray-400'}`} />
                    <span className="font-semibold">{mockPatients.find(p => p.id === appt.patientId)?.name}</span>
                    <span className="text-xs text-muted-foreground">{mockDoctors.find(d => d.id === appt.doctorId)?.name}</span>
                  </div>
                  <div className="text-xs">{format(appt.date, 'HH:mm')}</div>
                  <div className="text-xs">Status: {appt.status}</div>
                  <div className="flex gap-2 mt-1">
                    <Button size="sm" variant="outline" onClick={() => { setShowDetails(true); setSelected(appt); setCalendarDayAppts(null); }}><Eye className="h-4 w-4 mr-1" /> View</Button>
                    <Button size="sm" variant="outline" onClick={() => { handleOpenForm(appt); setCalendarDayAppts(null); }}><Edit className="h-4 w-4" /></Button>
                    <Button size="sm" variant="outline" onClick={() => { handleOpenReschedule(appt); setCalendarDayAppts(null); }}><RefreshCw className="h-4 w-4 mr-1" /> Reschedule</Button>
                    <Button size="sm" variant="destructive" onClick={() => { setRemoveAppt(appt); setCalendarDayAppts(null); }}><Trash2 className="h-4 w-4" /></Button>
                    <Button size="sm" variant="outline" onClick={() => { handleSendReminder(appt.id); setCalendarDayAppts(null); }}><UserAddFillIcon className="h-4 w-4 mr-1" /> Send Reminder</Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div>No appointments for this day.</div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
} 