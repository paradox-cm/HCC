# HCC Admin Portal - Technical Implementation Guide

## Overview

This document provides technical details, code examples, and implementation patterns for the HCC Admin Portal architecture.

## Core Architecture Patterns

### 1. State Management Pattern

```typescript
// Local State Management
const [patients, setPatients] = useState<Patient[]>([])
const [search, setSearch] = useState("")
const [filters, setFilters] = useState<Filters>({
  status: "all",
  assignedDoctor: "all", 
  insurance: "all",
  lastVisitFrom: null,
  lastVisitTo: null
})

// Computed State with Memoization
const filtered = useMemo(() => {
  return patients.filter(patient => {
    const matchesSearch = search === "" || 
      patient.name.toLowerCase().includes(search.toLowerCase()) ||
      patient.email.toLowerCase().includes(search.toLowerCase()) ||
      patient.phone.includes(search) ||
      patient.insurance.toLowerCase().includes(search.toLowerCase())
    
    const matchesStatus = filters.status === "all" || patient.status === filters.status
    const matchesDoctor = filters.assignedDoctor === "all" || patient.assignedDoctor === filters.assignedDoctor
    const matchesInsurance = filters.insurance === "all" || patient.insurance === filters.insurance
    
    return matchesSearch && matchesStatus && matchesDoctor && matchesInsurance
  })
}, [patients, search, filters])
```

### 2. Responsive Design Pattern

```typescript
// Mobile-First Responsive Layout
<div className="space-y-6">
  {/* Header - Responsive Button Group */}
  <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
    <Button variant="outline" className="w-full sm:w-auto">
      <DownloadIcon className="h-4 w-4 mr-2" /> Export
    </Button>
    <Button variant="outline" className="w-full sm:w-auto">
      <BarChart3Icon className="h-4 w-4 mr-2" /> Analytics
    </Button>
  </div>

  {/* Content - Responsive Grid */}
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {/* Grid items */}
  </div>

  {/* Mobile vs Desktop Layouts */}
  <div className="md:hidden">
    {/* Mobile Card Layout */}
  </div>
  <div className="hidden md:block">
    {/* Desktop Table Layout */}
  </div>
</div>
```

### 3. Component Composition Pattern

```typescript
// Reusable Card Component
interface CardProps {
  title: string
  children: React.ReactNode
  actions?: React.ReactNode
  className?: string
}

const Card = ({ title, children, actions, className }: CardProps) => (
  <div className={cn("border rounded-lg p-4", className)}>
    <div className="flex items-center justify-between mb-4">
      <h3 className="font-semibold">{title}</h3>
      {actions && <div className="flex gap-2">{actions}</div>}
    </div>
    {children}
  </div>
)

// Usage Example
<Card 
  title="Patient Analytics" 
  actions={<Button size="sm">Export</Button>}
>
  <div className="space-y-2">
    <div className="flex justify-between">
      <span>Total Patients</span>
      <span className="font-semibold">{analytics.totalPatients}</span>
    </div>
  </div>
</Card>
```

## Key Implementation Features

### 1. Advanced Search & Filtering

```typescript
// Search Implementation
const handleSearch = (value: string) => {
  setSearch(value)
  setCurrentPage(1) // Reset to first page
}

// Filter Implementation
const handleFilterChange = (key: keyof Filters, value: any) => {
  setFilters(prev => ({ ...prev, [key]: value }))
  setCurrentPage(1) // Reset to first page
}

// Clear Filters
const clearFilters = () => {
  setFilters({
    status: "all",
    assignedDoctor: "all",
    insurance: "all", 
    lastVisitFrom: null,
    lastVisitTo: null
  })
  setSearch("")
  setCurrentPage(1)
}
```

### 2. Pagination System

```typescript
// Pagination Logic
const itemsPerPage = 10
const totalPages = Math.ceil(filtered.length / itemsPerPage)
const startIndex = (currentPage - 1) * itemsPerPage
const endIndex = startIndex + itemsPerPage
const paginatedPatients = filtered.slice(startIndex, endIndex)

// Pagination Controls
const handlePageChange = (page: number) => {
  setCurrentPage(page)
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
```

### 3. Bulk Operations

```typescript
// Bulk Selection
const handleSelectAll = (checked: boolean) => {
  if (checked) {
    setSelectedPatients(paginatedPatients.map(p => p.id))
    setSelectAll(true)
  } else {
    setSelectedPatients([])
    setSelectAll(false)
  }
}

const handleSelectPatient = (patientId: string, checked: boolean) => {
  if (checked) {
    setSelectedPatients(prev => [...prev, patientId])
  } else {
    setSelectedPatients(prev => prev.filter(id => id !== patientId))
  }
}

// Bulk Delete
const handleBulkDelete = () => {
  setShowBulkDeleteConfirm(true)
}

const confirmBulkDelete = () => {
  setPatients(prev => prev.filter(p => !selectedPatients.includes(p.id)))
  setSelectedPatients([])
  setSelectAll(false)
  setShowBulkDeleteConfirm(false)
}
```

### 4. Analytics Computation

```typescript
// Analytics with Memoization
const analytics = useMemo(() => {
  const totalPatients = filtered.length
  const activePatients = filtered.filter(p => p.status === "Active").length
  const inactivePatients = filtered.filter(p => p.status === "Inactive").length
  
  // Doctor Distribution
  const doctorDistribution = doctors.map(doctor => ({
    doctor,
    count: filtered.filter(p => p.assignedDoctor === doctor).length,
    percentage: Math.round((filtered.filter(p => p.assignedDoctor === doctor).length / totalPatients) * 100)
  }))

  // Insurance Distribution  
  const insuranceDistribution = insuranceProviders.map(insurance => ({
    insurance,
    count: filtered.filter(p => p.insurance === insurance).length,
    percentage: Math.round((filtered.filter(p => p.insurance === insurance).length / totalPatients) * 100)
  }))

  return {
    totalPatients,
    activePatients,
    inactivePatients,
    activePercentage: Math.round((activePatients / totalPatients) * 100),
    doctorDistribution,
    insuranceDistribution
  }
}, [filtered, doctors, insuranceProviders])
```

### 5. Export Functionality

```typescript
// CSV Export
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
```

## Performance Optimization

### 1. Memoization Strategy

```typescript
// Expensive computations with useMemo
const expensiveComputation = useMemo(() => {
  return data.filter(item => {
    // Complex filtering logic
    return complexCondition(item)
  }).map(item => {
    // Complex transformation
    return transformData(item)
  })
}, [data, dependencies])

// Callback memoization with useCallback
const handleAction = useCallback((id: string) => {
  // Action logic
}, [dependencies])
```

### 2. Virtual Scrolling for Large Lists

```typescript
// For very large datasets, consider virtual scrolling
import { FixedSizeList as List } from 'react-window'

const VirtualizedList = ({ items }) => (
  <List
    height={400}
    itemCount={items.length}
    itemSize={50}
    itemData={items}
  >
    {({ index, style, data }) => (
      <div style={style}>
        <PatientCard patient={data[index]} />
      </div>
    )}
  </List>
)
```

### 3. Debounced Search

```typescript
// Debounced search input
const [searchTerm, setSearchTerm] = useState("")
const [debouncedSearch, setDebouncedSearch] = useState("")

useEffect(() => {
  const timer = setTimeout(() => {
    setDebouncedSearch(searchTerm)
  }, 300)

  return () => clearTimeout(timer)
}, [searchTerm])

// Use debouncedSearch for filtering
const filtered = useMemo(() => {
  return patients.filter(patient => 
    patient.name.toLowerCase().includes(debouncedSearch.toLowerCase())
  )
}, [patients, debouncedSearch])
```

## Error Handling

### 1. Error Boundaries

```typescript
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return <div>Something went wrong. Please refresh the page.</div>
    }

    return this.props.children
  }
}
```

### 2. Loading States

```typescript
const [isLoading, setIsLoading] = useState(false)
const [error, setError] = useState<string | null>(null)

const handleAction = async () => {
  setIsLoading(true)
  setError(null)
  
  try {
    await performAction()
  } catch (err) {
    setError(err.message)
  } finally {
    setIsLoading(false)
  }
}

// Usage in JSX
{isLoading && <LoadingSpinner />}
{error && <ErrorMessage message={error} />}
```

## Accessibility Implementation

### 1. ARIA Labels and Roles

```typescript
// Proper ARIA implementation
<div role="main" aria-label="Patient Management">
  <h1 id="page-title">Patients</h1>
  
  <div role="search" aria-labelledby="page-title">
    <input
      type="search"
      aria-label="Search patients"
      placeholder="Search patients..."
    />
  </div>
  
  <table role="grid" aria-label="Patient list">
    <thead role="rowgroup">
      <tr role="row">
        <th role="columnheader" scope="col">Name</th>
        <th role="columnheader" scope="col">Status</th>
      </tr>
    </thead>
  </table>
</div>
```

### 2. Keyboard Navigation

```typescript
// Keyboard navigation support
const handleKeyDown = (event: KeyboardEvent) => {
  switch (event.key) {
    case 'Enter':
      handleSelect()
      break
    case 'Escape':
      handleClose()
      break
    case 'ArrowDown':
      handleNext()
      break
    case 'ArrowUp':
      handlePrevious()
      break
  }
}
```

## Testing Patterns

### 1. Component Testing

```typescript
// Example test structure
describe('PatientList', () => {
  it('should render patient cards', () => {
    render(<PatientList patients={mockPatients} />)
    expect(screen.getByText('John Doe')).toBeInTheDocument()
  })

  it('should filter patients by search', () => {
    render(<PatientList patients={mockPatients} />)
    const searchInput = screen.getByPlaceholderText('Search patients...')
    fireEvent.change(searchInput, { target: { value: 'John' } })
    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.queryByText('Jane Smith')).not.toBeInTheDocument()
  })
})
```

### 2. Integration Testing

```typescript
// Test user workflows
describe('Patient Management Workflow', () => {
  it('should allow adding a new patient', async () => {
    render(<PatientManagement />)
    
    // Click add button
    fireEvent.click(screen.getByText('Add Patient'))
    
    // Fill form
    fireEvent.change(screen.getByLabelText('Name'), {
      target: { value: 'New Patient' }
    })
    
    // Submit form
    fireEvent.click(screen.getByText('Save'))
    
    // Verify patient was added
    await waitFor(() => {
      expect(screen.getByText('New Patient')).toBeInTheDocument()
    })
  })
})
```

## Best Practices

### 1. Code Organization

```typescript
// Separate concerns
// hooks/usePatients.ts
export const usePatients = () => {
  const [patients, setPatients] = useState<Patient[]>([])
  const [loading, setLoading] = useState(false)
  
  const fetchPatients = useCallback(async () => {
    setLoading(true)
    try {
      const data = await api.getPatients()
      setPatients(data)
    } catch (error) {
      console.error('Failed to fetch patients:', error)
    } finally {
      setLoading(false)
    }
  }, [])
  
  return { patients, loading, fetchPatients }
}

// components/PatientList.tsx
export const PatientList = () => {
  const { patients, loading, fetchPatients } = usePatients()
  
  useEffect(() => {
    fetchPatients()
  }, [fetchPatients])
  
  if (loading) return <LoadingSpinner />
  
  return (
    <div>
      {patients.map(patient => (
        <PatientCard key={patient.id} patient={patient} />
      ))}
    </div>
  )
}
```

### 2. Type Safety

```typescript
// Define strict types
interface Patient {
  id: string
  name: string
  email: string
  phone: string
  dob: string
  status: 'Active' | 'Inactive' | 'Pending'
  assignedDoctor: string
  insurance: string
  lastVisit: string
}

interface Filters {
  status: 'all' | 'Active' | 'Inactive' | 'Pending'
  assignedDoctor: 'all' | string
  insurance: 'all' | string
  lastVisitFrom: Date | null
  lastVisitTo: Date | null
}

// Use type guards
const isValidPatient = (data: unknown): data is Patient => {
  return (
    typeof data === 'object' &&
    data !== null &&
    'id' in data &&
    'name' in data &&
    'email' in data
  )
}
```

This technical implementation guide provides the foundation for building scalable, maintainable, and performant healthcare management applications. 