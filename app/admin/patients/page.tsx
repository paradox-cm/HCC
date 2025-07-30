"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { CalendarIcon, FilterIcon, SearchIcon, XIcon, DownloadIcon, MoreHorizontalIcon, BarChart3Icon, TrendingUpIcon, UsersIcon, ActivityIcon } from "lucide-react"
import { format } from "date-fns"
import Link from "next/link"
import { Trash2, Edit, ArrowRight } from "lucide-react"
import GroupFillIcon from 'remixicon-react/GroupFillIcon'
import AddCircleFillIcon from 'remixicon-react/AddCircleFillIcon'

const MOCK_PATIENTS = [
  { id: 1, name: "Jane Doe", dob: "1985-04-12", email: "jane@email.com", phone: "555-123-4567", lastVisit: "2024-06-01", status: "Active", assignedDoctor: "Dr. Asif Ali", insurance: "Aetna" },
  { id: 2, name: "John Smith", dob: "1978-09-23", email: "john@email.com", phone: "555-987-6543", lastVisit: "2024-05-20", status: "Active", assignedDoctor: "Dr. Abdul Ali", insurance: "Blue Cross" },
  { id: 3, name: "Maria Garcia", dob: "1990-02-15", email: "maria@email.com", phone: "555-555-5555", lastVisit: "2024-04-10", status: "Inactive", assignedDoctor: "Dr. Sajid Ali", insurance: "Cigna" },
  { id: 4, name: "Robert Johnson", dob: "1965-11-08", email: "robert@email.com", phone: "555-111-2222", lastVisit: "2024-06-15", status: "Active", assignedDoctor: "Dr. Asif Ali", insurance: "Aetna" },
  { id: 5, name: "Sarah Wilson", dob: "1982-07-14", email: "sarah@email.com", phone: "555-333-4444", lastVisit: "2024-05-28", status: "Active", assignedDoctor: "Dr. Abdul Ali", insurance: "Humana" },
  { id: 6, name: "Michael Brown", dob: "1975-03-22", email: "michael@email.com", phone: "555-666-7777", lastVisit: "2024-03-15", status: "Inactive", assignedDoctor: "Dr. Sajid Ali", insurance: "UnitedHealth" },
]

export default function AdminPatientsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [patients, setPatients] = useState(MOCK_PATIENTS)
  const [search, setSearch] = useState("")
  const [addOpen, setAddOpen] = useState(false)
  const [removePatient, setRemovePatient] = useState<any>(null)
  const [newPatient, setNewPatient] = useState({ 
    name: "", 
    dob: "", 
    email: "", 
    phone: "", 
    address: "",
    assignedDoctor: "",
    insurance: "",
    status: "Active"
  })
  const [addError, setAddError] = useState("")
  
  // Enhanced filtering state
  const [filters, setFilters] = useState({
    status: "all",
    assignedDoctor: "all",
    insurance: "all",
    lastVisitFrom: null as Date | null,
    lastVisitTo: null as Date | null,
  })
  const [showFilters, setShowFilters] = useState(false)
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  
  // Bulk actions state
  const [selectedPatients, setSelectedPatients] = useState<number[]>([])
  const [selectAll, setSelectAll] = useState(false)
  const [showBulkDeleteConfirm, setShowBulkDeleteConfirm] = useState(false)
  const [showAnalytics, setShowAnalytics] = useState(false)
  const [showSavedFilters, setShowSavedFilters] = useState(false)
  const [savedFilters, setSavedFilters] = useState<Array<{
    id: string
    name: string
    filters: typeof filters
    search: string
  }>>([
    {
      id: "1",
      name: "Active Patients",
      filters: {
        status: "Active",
        assignedDoctor: "all",
        insurance: "all",
        lastVisitFrom: null,
        lastVisitTo: null,
      },
      search: ""
    },
    {
      id: "2", 
      name: "Dr. Asif Ali Patients",
      filters: {
        status: "all",
        assignedDoctor: "Dr. Asif Ali",
        insurance: "all",
        lastVisitFrom: null,
        lastVisitTo: null,
      },
      search: ""
    },
    {
      id: "3",
      name: "Aetna Insurance",
      filters: {
        status: "all",
        assignedDoctor: "all",
        insurance: "Aetna",
        lastVisitFrom: null,
        lastVisitTo: null,
      },
      search: ""
    }
  ])
  const [saveFilterName, setSaveFilterName] = useState("")
  const [showSaveFilterDialog, setShowSaveFilterDialog] = useState(false)

  // Open modal if ?add=1 is present
  useEffect(() => {
    if (searchParams?.get("add") === "1") {
      setAddOpen(true);
    }
  }, [searchParams]);

  // When modal closes, remove ?add=1 from URL
  function handleAddOpenChange(open: boolean) {
    setAddOpen(open);
    if (!open && searchParams?.get("add") === "1") {
      const params = new URLSearchParams(Array.from(searchParams.entries()));
      params.delete("add");
      router.replace(`/admin/patients${params.size ? "?" + params.toString() : ""}`);
    }
  }

  // Enhanced filtering logic
  const filtered = patients.filter(p => {
    // Search filter
    const searchMatch = !search || 
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.email.toLowerCase().includes(search.toLowerCase()) ||
    p.phone.includes(search) ||
      p.dob.includes(search) ||
      p.assignedDoctor.toLowerCase().includes(search.toLowerCase()) ||
      p.insurance.toLowerCase().includes(search.toLowerCase())

    // Status filter
    const statusMatch = filters.status === "all" || p.status === filters.status

    // Doctor filter
    const doctorMatch = filters.assignedDoctor === "all" || p.assignedDoctor === filters.assignedDoctor

    // Insurance filter
    const insuranceMatch = filters.insurance === "all" || p.insurance === filters.insurance

    // Date range filter
    let dateMatch = true
    if (filters.lastVisitFrom || filters.lastVisitTo) {
      const lastVisitDate = new Date(p.lastVisit)
      if (filters.lastVisitFrom && lastVisitDate < filters.lastVisitFrom) {
        dateMatch = false
      }
      if (filters.lastVisitTo && lastVisitDate > filters.lastVisitTo) {
        dateMatch = false
      }
    }

    return searchMatch && statusMatch && doctorMatch && insuranceMatch && dateMatch
  })

  // Get unique values for filter options
  const doctors = [...new Set(patients.map(p => p.assignedDoctor))]
  const insuranceProviders = [...new Set(patients.map(p => p.insurance))]

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      status: "all",
      assignedDoctor: "all",
      insurance: "all",
      lastVisitFrom: null,
      lastVisitTo: null,
    })
  }

  // Check if any filters are active
  const hasActiveFilters = filters.status !== "all" || 
    filters.assignedDoctor !== "all" || 
    filters.insurance !== "all" || 
    filters.lastVisitFrom || 
    filters.lastVisitTo

  // Pagination logic
  const totalPages = Math.ceil(filtered.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedPatients = filtered.slice(startIndex, endIndex)

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [filters, search])

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate occasional new patient registration
      if (Math.random() < 0.1) { // 10% chance every 30 seconds
        const newPatient = {
          id: Date.now(),
          name: `New Patient ${Math.floor(Math.random() * 1000)}`,
          dob: "1990-01-01",
          email: `patient${Math.floor(Math.random() * 1000)}@email.com`,
          phone: `555-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
          lastVisit: format(new Date(), 'yyyy-MM-dd'),
          status: "Active" as const,
          assignedDoctor: doctors[Math.floor(Math.random() * doctors.length)],
          insurance: insuranceProviders[Math.floor(Math.random() * insuranceProviders.length)]
        }
        setPatients(prev => [newPatient, ...prev])
      }
    }, 30000) // Check every 30 seconds

    return () => clearInterval(interval)
  }, [doctors, insuranceProviders])

  // Export functions
  const exportToCSV = () => {
    const headers = ['Name', 'DOB', 'Email', 'Phone', 'Last Visit', 'Doctor', 'Insurance', 'Status']
    const csvContent = [
      headers.join(','),
      ...filtered.map(patient => [
        patient.name,
        patient.dob,
        patient.email,
        patient.phone,
        patient.lastVisit,
        patient.assignedDoctor,
        patient.insurance,
        patient.status
      ].join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `patients_${format(new Date(), 'yyyy-MM-dd')}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }

  const exportToPDF = () => {
    // Create a simple PDF-like report
    const reportContent = `
      Patient Report - ${format(new Date(), 'MMMM dd, yyyy')}
      
      Summary:
      - Total Patients: ${analytics.totalPatients}
      - Active Patients: ${analytics.activePatients}
      - Recent Activity: ${analytics.recentActivity}
      
      Patient List:
      ${filtered.map(patient => `
        ${patient.name}
        DOB: ${patient.dob} | Email: ${patient.email}
        Doctor: ${patient.assignedDoctor} | Insurance: ${patient.insurance}
        Status: ${patient.status}
      `).join('\n')}
    `

    const blob = new Blob([reportContent], { type: 'text/plain' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `patient_report_${format(new Date(), 'yyyy-MM-dd')}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }

  // Bulk action functions
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedPatients([])
      setSelectAll(false)
    } else {
      setSelectedPatients(paginatedPatients.map(p => p.id))
      setSelectAll(true)
    }
  }

  const handleSelectPatient = (patientId: number) => {
    setSelectedPatients(prev => 
      prev.includes(patientId) 
        ? prev.filter(id => id !== patientId)
        : [...prev, patientId]
    )
  }

  const handleBulkDelete = () => {
    setShowBulkDeleteConfirm(true)
  }

  const confirmBulkDelete = () => {
    setPatients(prev => prev.filter(p => !selectedPatients.includes(p.id)))
    setSelectedPatients([])
    setSelectAll(false)
    setShowBulkDeleteConfirm(false)
  }

  // Saved filters functions
  const saveCurrentFilter = () => {
    if (!saveFilterName.trim()) return
    
    const newFilter = {
      id: Date.now().toString(),
      name: saveFilterName.trim(),
      filters: { ...filters },
      search: search
    }
    
    setSavedFilters(prev => [...prev, newFilter])
    setSaveFilterName("")
    setShowSaveFilterDialog(false)
  }

  const loadSavedFilter = (savedFilter: typeof savedFilters[0]) => {
    setFilters(savedFilter.filters)
    setSearch(savedFilter.search)
    setShowSavedFilters(false)
  }

  const deleteSavedFilter = (filterId: string) => {
    setSavedFilters(prev => prev.filter(f => f.id !== filterId))
  }

  // Analytics and insights computation
  const analytics = {
    // Basic statistics
    totalPatients: patients.length,
    activePatients: patients.filter(p => p.status === "Active").length,
    inactivePatients: patients.filter(p => p.status === "Inactive").length,
    activePercentage: patients.length > 0 ? Math.round((patients.filter(p => p.status === "Active").length / patients.length) * 100) : 0,

    // Doctor distribution
    doctorDistribution: doctors.reduce((acc, doctor) => {
      acc[doctor] = patients.filter(p => p.assignedDoctor === doctor).length
      return acc
    }, {} as Record<string, number>),

    // Insurance distribution
    insuranceDistribution: insuranceProviders.reduce((acc, provider) => {
      acc[provider] = patients.filter(p => p.insurance === provider).length
      return acc
    }, {} as Record<string, number>),

    // Recent activity (last 30 days)
    recentActivity: patients.filter(p => {
      if (p.lastVisit === "-" || !p.lastVisit) return false
      try {
        const lastVisit = new Date(p.lastVisit)
        const thirtyDaysAgo = new Date()
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
        return lastVisit >= thirtyDaysAgo
      } catch (error) {
        return false
      }
    }).length,

    // Age distribution
    ageDistribution: patients.reduce((acc, patient) => {
      try {
        const age = new Date().getFullYear() - new Date(patient.dob).getFullYear()
        if (age < 30) acc.under30++
        else if (age < 50) acc.age30to50++
        else if (age < 70) acc.age50to70++
        else acc.over70++
      } catch (error) {
        // If date parsing fails, skip this patient
      }
      return acc
    }, { under30: 0, age30to50: 0, age50to70: 0, over70: 0 }),

    // Monthly trends (last 6 months)
    monthlyTrends: Array.from({ length: 6 }, (_, i) => {
      const date = new Date()
      date.setMonth(date.getMonth() - i)
      const monthYear = format(date, 'MMM yyyy')
      const visitsInMonth = patients.filter(p => {
        if (p.lastVisit === "-" || !p.lastVisit) return false
        try {
          const visitDate = new Date(p.lastVisit)
          return visitDate.getMonth() === date.getMonth() && visitDate.getFullYear() === date.getFullYear()
        } catch (error) {
          return false
        }
      }).length
      return { month: monthYear, visits: visitsInMonth }
    }).reverse()
  }

  function handleAdd(e: React.FormEvent) {
    e.preventDefault()
    if (!newPatient.name || !newPatient.dob || !newPatient.email || !newPatient.phone || !newPatient.assignedDoctor || !newPatient.insurance) {
      setAddError("Name, DOB, Email, Phone, Assigned Doctor, and Insurance are required.")
      return
    }
    setPatients(p => [
      { 
        id: Date.now(), 
        ...newPatient, 
        lastVisit: "-", 
        status: newPatient.status || "Active" 
      },
      ...p,
    ])
    setAddOpen(false)
    setNewPatient({ 
      name: "", 
      dob: "", 
      email: "", 
      phone: "", 
      address: "",
      assignedDoctor: "",
      insurance: "",
      status: "Active"
    })
    setAddError("")
  }

  function handleRemove(id: number) {
    setPatients(p => p.filter(pt => pt.id !== id))
    setRemovePatient(null)
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2"><GroupFillIcon className="h-6 w-6" /> Patients</h1>
        <div className="flex flex-col sm:flex-row gap-2">
          {selectedPatients.length > 0 && (
            <Button variant="destructive" onClick={handleBulkDelete} className="w-full sm:w-auto">
              <Trash2 className="h-4 w-4 mr-2" /> Delete Selected ({selectedPatients.length})
            </Button>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full sm:w-auto">
                <DownloadIcon className="h-4 w-4 mr-2" /> Export
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={exportToCSV}>
                Export to CSV
              </DropdownMenuItem>
              <DropdownMenuItem onClick={exportToPDF}>
                Export to Report
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="outline" onClick={() => setShowAnalytics(!showAnalytics)} className="w-full sm:w-auto">
            <BarChart3Icon className="h-4 w-4 mr-2" /> Analytics
          </Button>
          <Button variant="outline" onClick={() => setShowSavedFilters(!showSavedFilters)} className="w-full sm:w-auto">
            <FilterIcon className="h-4 w-4 mr-2" /> Saved Filters
          </Button>
        <Button variant="default" onClick={() => router.push("/admin/patients?add=1") } className="w-full sm:w-auto">
          <AddCircleFillIcon className="h-4 w-4 mr-2" /> Add Patient
        </Button>
      </div>
      </div>
      {/* Enhanced Search and Filters */}
      <div className="mb-6 space-y-4">
        {/* Search Bar */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1 max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
              placeholder="Search patients by name, email, phone, DOB, doctor, or insurance..."
          value={search}
          onChange={e => setSearch(e.target.value)}
              className="pl-10 h-10 sm:h-11 md:h-12 text-sm sm:text-base"
            />
          </div>
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 h-10 sm:h-11 md:h-12"
          >
            <FilterIcon className="h-4 w-4" />
            Filters
            {hasActiveFilters && (
              <Badge variant="secondary" className="ml-1">
                {Object.values(filters).filter(v => v !== "all" && v !== null).length}
              </Badge>
            )}
          </Button>
          {hasActiveFilters && (
            <Button variant="ghost" onClick={clearFilters} className="flex items-center gap-2 h-10 sm:h-11 md:h-12">
              <XIcon className="h-4 w-4" />
              Clear
            </Button>
          )}
          {hasActiveFilters && (
            <Button variant="outline" onClick={() => setShowSaveFilterDialog(true)} className="flex items-center gap-2 h-10 sm:h-11 md:h-12">
              <FilterIcon className="h-4 w-4" />
              Save Filter
            </Button>
          )}
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <Card className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Status Filter */}
              <div>
                <label className="text-sm font-medium mb-2 block">Status</label>
                <Select value={filters.status} onValueChange={(value) => setFilters(prev => ({ ...prev, status: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Statuses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Doctor Filter */}
              <div>
                <label className="text-sm font-medium mb-2 block">Assigned Doctor</label>
                <Select value={filters.assignedDoctor} onValueChange={(value) => setFilters(prev => ({ ...prev, assignedDoctor: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Doctors" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Doctors</SelectItem>
                    {doctors.map(doctor => (
                      <SelectItem key={doctor} value={doctor}>{doctor}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Insurance Filter */}
              <div>
                <label className="text-sm font-medium mb-2 block">Insurance</label>
                <Select value={filters.insurance} onValueChange={(value) => setFilters(prev => ({ ...prev, insurance: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Insurance" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Insurance</SelectItem>
                    {insuranceProviders.map(provider => (
                      <SelectItem key={provider} value={provider}>{provider}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Date Range Filter */}
              <div>
                <label className="text-sm font-medium mb-2 block">Last Visit Range</label>
                <div className="flex gap-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="flex-1 justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {filters.lastVisitFrom ? format(filters.lastVisitFrom, "MMM dd") : "From"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={filters.lastVisitFrom}
                        onSelect={(date) => setFilters(prev => ({ ...prev, lastVisitFrom: date }))}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="flex-1 justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {filters.lastVisitTo ? format(filters.lastVisitTo, "MMM dd") : "To"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={filters.lastVisitTo}
                        onSelect={(date) => setFilters(prev => ({ ...prev, lastVisitTo: date }))}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Results Summary and Pagination Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-4">
            <span>Showing {startIndex + 1}-{Math.min(endIndex, filtered.length)} of {filtered.length} patients</span>
            {hasActiveFilters && (
              <div className="flex items-center gap-2">
                <span>Active filters:</span>
                {filters.status !== "all" && <Badge variant="outline">{filters.status}</Badge>}
                {filters.assignedDoctor !== "all" && <Badge variant="outline">{filters.assignedDoctor}</Badge>}
                {filters.insurance !== "all" && <Badge variant="outline">{filters.insurance}</Badge>}
                {(filters.lastVisitFrom || filters.lastVisitTo) && <Badge variant="outline">Date Range</Badge>}
              </div>
            )}
          </div>
          
          {/* Pagination Controls */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span>Items per page:</span>
              <Select value={itemsPerPage.toString()} onValueChange={(value) => setItemsPerPage(Number(value))}>
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="25">25</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {totalPages > 1 && (
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <span className="px-2">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Analytics Dashboard */}
      {showAnalytics && (
        <div className="mb-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3Icon className="h-5 w-5" />
                Patient Analytics & Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <UsersIcon className="h-5 w-5 text-blue-600" />
                    <span className="text-sm font-medium text-blue-600">Total Patients</span>
                  </div>
                  <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">{analytics.totalPatients}</div>
                </div>
                
                <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <ActivityIcon className="h-5 w-5 text-green-600" />
                    <span className="text-sm font-medium text-green-600">Active Patients</span>
                  </div>
                  <div className="text-2xl font-bold text-green-700 dark:text-green-300">{analytics.activePatients}</div>
                  <div className="text-sm text-green-600">{analytics.activePercentage}% of total</div>
                </div>
                
                <div className="p-4 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUpIcon className="h-5 w-5 text-orange-600" />
                    <span className="text-sm font-medium text-orange-600">Recent Activity</span>
                  </div>
                  <div className="text-2xl font-bold text-orange-700 dark:text-orange-300">{analytics.recentActivity}</div>
                  <div className="text-sm text-orange-600">Last 30 days</div>
                </div>
                
                <div className="p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <BarChart3Icon className="h-5 w-5 text-purple-600" />
                    <span className="text-sm font-medium text-purple-600">Inactive Patients</span>
                  </div>
                  <div className="text-2xl font-bold text-purple-700 dark:text-purple-300">{analytics.inactivePatients}</div>
                  <div className="text-sm text-purple-600">{analytics.totalPatients > 0 ? Math.round((analytics.inactivePatients / analytics.totalPatients) * 100) : 0}% of total</div>
                </div>
              </div>

              {/* Distribution Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {/* Doctor Distribution */}
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-4">Patient Distribution by Doctor</h3>
                  <div className="space-y-3">
                    {Object.entries(analytics.doctorDistribution).map(([doctor, count]) => (
                      <div key={doctor} className="flex items-center justify-between">
                        <span className="text-sm">{doctor}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{ width: `${analytics.totalPatients > 0 ? (count / analytics.totalPatients) * 100 : 0}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium w-8 text-right">{count}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Insurance Distribution */}
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-4">Patient Distribution by Insurance</h3>
                  <div className="space-y-3">
                    {Object.entries(analytics.insuranceDistribution).map(([provider, count]) => (
                      <div key={provider} className="flex items-center justify-between">
                        <span className="text-sm">{provider}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-green-600 h-2 rounded-full" 
                              style={{ width: `${analytics.totalPatients > 0 ? (count / analytics.totalPatients) * 100 : 0}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium w-8 text-right">{count}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Age Distribution and Monthly Trends */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Age Distribution */}
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-4">Age Distribution</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Under 30</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-purple-600 h-2 rounded-full" 
                            style={{ width: `${analytics.totalPatients > 0 ? (analytics.ageDistribution.under30 / analytics.totalPatients) * 100 : 0}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium w-8 text-right">{analytics.ageDistribution.under30}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">30-50</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${analytics.totalPatients > 0 ? (analytics.ageDistribution.age30to50 / analytics.totalPatients) * 100 : 0}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium w-8 text-right">{analytics.ageDistribution.age30to50}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">50-70</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-600 h-2 rounded-full" 
                            style={{ width: `${analytics.totalPatients > 0 ? (analytics.ageDistribution.age50to70 / analytics.totalPatients) * 100 : 0}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium w-8 text-right">{analytics.ageDistribution.age50to70}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Over 70</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-orange-600 h-2 rounded-full" 
                            style={{ width: `${analytics.totalPatients > 0 ? (analytics.ageDistribution.over70 / analytics.totalPatients) * 100 : 0}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium w-8 text-right">{analytics.ageDistribution.over70}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Monthly Trends */}
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-4">Monthly Visit Trends (Last 6 Months)</h3>
                  <div className="space-y-3">
                    {analytics.monthlyTrends.map((trend) => (
                      <div key={trend.month} className="flex items-center justify-between">
                        <span className="text-sm">{trend.month}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-red-600 h-2 rounded-full" 
                              style={{ width: `${Math.min((trend.visits / Math.max(...analytics.monthlyTrends.map(t => t.visits), 1)) * 100, 100)}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium w-8 text-right">{trend.visits}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Insights */}
              <div className="mt-6 p-4 bg-muted/30 rounded-lg">
                <h3 className="font-semibold mb-3">Key Insights</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">
                      <strong>Most Active Doctor:</strong> {Object.entries(analytics.doctorDistribution).length > 0 ? Object.entries(analytics.doctorDistribution).reduce((a, b) => a[1] > b[1] ? a : b)[0] : "None"} 
                      with {Object.values(analytics.doctorDistribution).length > 0 ? Math.max(...Object.values(analytics.doctorDistribution)) : 0} patients
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">
                      <strong>Primary Insurance:</strong> {Object.entries(analytics.insuranceDistribution).length > 0 ? Object.entries(analytics.insuranceDistribution).reduce((a, b) => a[1] > b[1] ? a : b)[0] : "None"} 
                      covers {Object.values(analytics.insuranceDistribution).length > 0 ? Math.max(...Object.values(analytics.insuranceDistribution)) : 0} patients
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">
                      <strong>Patient Retention:</strong> {analytics.activePercentage}% of patients are currently active
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">
                      <strong>Recent Engagement:</strong> {analytics.recentActivity} patients visited in the last 30 days
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Saved Filters */}
      {showSavedFilters && (
        <div className="mb-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FilterIcon className="h-5 w-5" />
                Saved Filters
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  <strong>💡 Tip:</strong> Save your frequently used filter combinations for quick access. 
                  Click "Save Filter" in the filters section to create new saved filters.
                </p>
              </div>
              
              {savedFilters.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <FilterIcon className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>No saved filters yet. Create filters and save them for quick access.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {savedFilters.map((savedFilter) => (
                    <div key={savedFilter.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium">{savedFilter.name}</h4>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteSavedFilter(savedFilter.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <XIcon className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="space-y-2 mb-3">
                        {savedFilter.search && (
                          <Badge variant="outline" className="text-xs">
                            Search: "{savedFilter.search}"
                          </Badge>
                        )}
                        {savedFilter.filters.status !== "all" && (
                          <Badge variant="outline" className="text-xs">
                            Status: {savedFilter.filters.status}
                          </Badge>
                        )}
                        {savedFilter.filters.assignedDoctor !== "all" && (
                          <Badge variant="outline" className="text-xs">
                            Doctor: {savedFilter.filters.assignedDoctor}
                          </Badge>
                        )}
                        {savedFilter.filters.insurance !== "all" && (
                          <Badge variant="outline" className="text-xs">
                            Insurance: {savedFilter.filters.insurance}
                          </Badge>
                        )}
                        {(savedFilter.filters.lastVisitFrom || savedFilter.filters.lastVisitTo) && (
                          <Badge variant="outline" className="text-xs">
                            Date Range: {savedFilter.filters.lastVisitFrom ? format(savedFilter.filters.lastVisitFrom, "MMM dd") : "Any"} - {savedFilter.filters.lastVisitTo ? format(savedFilter.filters.lastVisitTo, "MMM dd") : "Any"}
                          </Badge>
                        )}
                        {!savedFilter.search && 
                         savedFilter.filters.status === "all" && 
                         savedFilter.filters.assignedDoctor === "all" && 
                         savedFilter.filters.insurance === "all" && 
                         !savedFilter.filters.lastVisitFrom && 
                         !savedFilter.filters.lastVisitTo && (
                          <Badge variant="outline" className="text-xs">
                            All Patients
                          </Badge>
                        )}
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => loadSavedFilter(savedFilter)}
                        className="w-full"
                      >
                        Load Filter
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
      
      {/* Mobile: Card Layout */}
      <div className="md:hidden space-y-3">
        {paginatedPatients.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">No patients found.</div>
        )}
        {paginatedPatients.map(pt => (
          <Card key={pt.id} className="p-4">
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={selectedPatients.includes(pt.id)}
                    onChange={() => handleSelectPatient(pt.id)}
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                <div>
                  <h3 className="font-semibold text-base">{pt.name}</h3>
                  <p className="text-sm text-muted-foreground">{pt.email}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                    pt.status === 'Active' 
                      ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400' 
                      : 'bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400'
                  }`}>
                    {pt.status}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-muted-foreground">DOB:</span>
                  <span className="ml-1">{pt.dob}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Phone:</span>
                  <span className="ml-1">{pt.phone}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-muted-foreground">Last Visit:</span>
                  <span className="ml-1">{pt.lastVisit}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-muted-foreground">Doctor:</span>
                  <span className="ml-1">{pt.assignedDoctor}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-muted-foreground">Insurance:</span>
                  <span className="ml-1">{pt.insurance}</span>
                </div>
              </div>
              <div className="flex gap-2 pt-2">
                <Button asChild size="sm" variant="outline" className="flex-1">
                  <Link href={`/admin/patients/${pt.id}`}>
                    <ArrowRight className="h-4 w-4 mr-1" /> Manage
                  </Link>
                </Button>
                <Button size="sm" variant="outline" onClick={() => {}} disabled className="flex-1">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="destructive" onClick={() => setRemovePatient(pt)} className="flex-1">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Desktop: Table Layout */}
      <Card className="hidden md:block">
        <CardContent className="p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b bg-muted text-muted-foreground">
                  <th className="py-2 px-3 text-left font-semibold rounded-tl-lg">
                    <input
                      type="checkbox"
                      checked={selectAll}
                      onChange={handleSelectAll}
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                  </th>
                  <th className="py-2 px-3 text-left font-semibold">Name</th>
                  <th className="py-2 px-3 text-left font-semibold">DOB</th>
                  <th className="py-2 px-3 text-left font-semibold">Email</th>
                  <th className="py-2 px-3 text-left font-semibold">Phone</th>
                  <th className="py-2 px-3 text-left font-semibold">Last Visit</th>
                  <th className="py-2 px-3 text-left font-semibold">Doctor</th>
                  <th className="py-2 px-3 text-left font-semibold">Insurance</th>
                  <th className="py-2 px-3 text-left font-semibold">Status</th>
                  <th className="py-2 px-3 text-left font-semibold rounded-tr-lg">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedPatients.length === 0 && (
                  <tr><td colSpan={10} className="text-center py-8 text-muted-foreground">No patients found.</td></tr>
                )}
                {paginatedPatients.map(pt => (
                  <tr key={pt.id} className="border-b hover:bg-accent/50 transition-colors">
                    <td className="py-2 px-3">
                      <input
                        type="checkbox"
                        checked={selectedPatients.includes(pt.id)}
                        onChange={() => handleSelectPatient(pt.id)}
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      />
                    </td>
                    <td className="py-2 px-3 font-medium">{pt.name}</td>
                    <td className="py-2 px-3">{pt.dob}</td>
                    <td className="py-2 px-3">{pt.email}</td>
                    <td className="py-2 px-3">{pt.phone}</td>
                    <td className="py-2 px-3">{pt.lastVisit}</td>
                    <td className="py-2 px-3">{pt.assignedDoctor}</td>
                    <td className="py-2 px-3">{pt.insurance}</td>
                    <td className="py-2 px-3">
                      <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                        pt.status === 'Active' 
                          ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400' 
                          : 'bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400'
                      }`}>
                        {pt.status}
                      </span>
                    </td>
                    <td className="py-2 px-3 flex gap-2">
                      <Button asChild size="sm" variant="outline">
                        <Link href={`/admin/patients/${pt.id}`}><ArrowRight className="h-4 w-4 mr-1" /> Manage</Link>
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => {}} disabled><Edit className="h-4 w-4" /></Button>
                      <Button size="sm" variant="destructive" onClick={() => setRemovePatient(pt)}><Trash2 className="h-4 w-4" /></Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      {/* Add Patient Modal */}
      <Dialog open={addOpen} onOpenChange={handleAddOpenChange}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Patient</DialogTitle>
            <DialogDescription>
              Enter the patient's information below. Required fields are marked with an asterisk (*).
            </DialogDescription>
          </DialogHeader>
          <form className="space-y-6" onSubmit={handleAdd}>
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-muted-foreground">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name *</label>
                  <Input 
                    value={newPatient.name} 
                    onChange={e => setNewPatient(p => ({ ...p, name: e.target.value }))} 
                    placeholder="Enter full name"
                    required 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Date of Birth *</label>
                  <Input 
                    type="date" 
                    value={newPatient.dob} 
                    onChange={e => setNewPatient(p => ({ ...p, dob: e.target.value }))} 
                    required 
                  />
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-muted-foreground">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Email Address *</label>
                  <Input 
                    type="email" 
                    value={newPatient.email} 
                    onChange={e => setNewPatient(p => ({ ...p, email: e.target.value }))} 
                    placeholder="patient@email.com"
                    required 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Phone Number *</label>
                  <Input 
                    value={newPatient.phone} 
                    onChange={e => setNewPatient(p => ({ ...p, phone: e.target.value }))} 
                    placeholder="(555) 123-4567"
                    required 
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Address</label>
                <Textarea 
                  value={newPatient.address} 
                  onChange={e => setNewPatient(p => ({ ...p, address: e.target.value }))} 
                  placeholder="Street address, city, state, ZIP"
                  rows={2}
                />
              </div>
            </div>

            {/* Medical Information */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-muted-foreground">Medical Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Assigned Doctor *</label>
                  <Select value={newPatient.assignedDoctor} onValueChange={(value) => setNewPatient(p => ({ ...p, assignedDoctor: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a doctor" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Dr. Asif Ali">Dr. Asif Ali</SelectItem>
                      <SelectItem value="Dr. Abdul Ali">Dr. Abdul Ali</SelectItem>
                      <SelectItem value="Dr. Sajid Ali">Dr. Sajid Ali</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Insurance Provider *</label>
                  <Select value={newPatient.insurance} onValueChange={(value) => setNewPatient(p => ({ ...p, insurance: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select insurance" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Aetna">Aetna</SelectItem>
                      <SelectItem value="Blue Cross">Blue Cross</SelectItem>
                      <SelectItem value="Cigna">Cigna</SelectItem>
                      <SelectItem value="Humana">Humana</SelectItem>
                      <SelectItem value="UnitedHealth">UnitedHealth</SelectItem>
                      <SelectItem value="Medicare">Medicare</SelectItem>
                      <SelectItem value="Medicaid">Medicaid</SelectItem>
                      <SelectItem value="Tricare">Tricare</SelectItem>
                      <SelectItem value="Self Pay">Self Pay</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Patient Status</label>
                <Select value={newPatient.status} onValueChange={(value) => setNewPatient(p => ({ ...p, status: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {addError && <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">{addError}</div>}
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setAddOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Add Patient</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      {/* Remove Patient Confirmation */}
      <Dialog open={!!removePatient} onOpenChange={v => { if (!v) setRemovePatient(null) }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Remove Patient</DialogTitle>
          </DialogHeader>
          {removePatient && (
            <div className="space-y-4">
              <div>Are you sure you want to remove <b>{removePatient.name}</b>?</div>
              <DialogFooter>
                <Button type="button" variant="destructive" className="w-full" onClick={() => handleRemove(removePatient.id)}>Remove</Button>
                <Button type="button" variant="ghost" className="w-full" onClick={() => setRemovePatient(null)}>Cancel</Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Bulk Delete Confirmation Dialog */}
      <Dialog open={showBulkDeleteConfirm} onOpenChange={setShowBulkDeleteConfirm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Bulk Delete</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>Are you sure you want to delete {selectedPatients.length} selected patient{selectedPatients.length !== 1 ? 's' : ''}?</p>
            <p className="text-sm text-muted-foreground mt-2">This action cannot be undone.</p>
          </div>
          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={() => setShowBulkDeleteConfirm(false)} className="w-full sm:w-auto">
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmBulkDelete} className="w-full sm:w-auto">
              Delete {selectedPatients.length} Patient{selectedPatients.length !== 1 ? 's' : ''}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Save Filter Dialog */}
      <Dialog open={showSaveFilterDialog} onOpenChange={setShowSaveFilterDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Save Current Filter</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div>
              <Label htmlFor="filter-name">Filter Name</Label>
              <Input
                id="filter-name"
                placeholder="Enter a name for this filter..."
                value={saveFilterName}
                onChange={(e) => setSaveFilterName(e.target.value)}
                className="mt-1"
              />
            </div>
            <div className="mt-4 p-3 bg-muted/30 rounded-lg">
              <p className="text-sm font-medium mb-2">Current Filter Settings:</p>
              <div className="space-y-1 text-sm text-muted-foreground">
                {search && <p>Search: "{search}"</p>}
                {filters.status !== "all" && <p>Status: {filters.status}</p>}
                {filters.assignedDoctor !== "all" && <p>Doctor: {filters.assignedDoctor}</p>}
                {filters.insurance !== "all" && <p>Insurance: {filters.insurance}</p>}
                {(filters.lastVisitFrom || filters.lastVisitTo) && <p>Date Range: {filters.lastVisitFrom ? format(filters.lastVisitFrom, 'MMM dd') : 'Any'} - {filters.lastVisitTo ? format(filters.lastVisitTo, 'MMM dd') : 'Any'}</p>}
              </div>
            </div>
          </div>
          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={() => setShowSaveFilterDialog(false)} className="w-full sm:w-auto">
              Cancel
            </Button>
            <Button onClick={saveCurrentFilter} disabled={!saveFilterName.trim()} className="w-full sm:w-auto">
              Save Filter
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
} 