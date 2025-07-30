"use client"

import React, { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import MoneyDollarCircleFillIcon from 'remixicon-react/MoneyDollarCircleFillIcon'
import BankCardFillIcon from 'remixicon-react/BankCardFillIcon'

import FilterFillIcon from 'remixicon-react/FilterFillIcon'
import User3FillIcon from 'remixicon-react/User3FillIcon'
import CalendarFillIcon from 'remixicon-react/CalendarFillIcon'
import PhoneFillIcon from 'remixicon-react/PhoneFillIcon'
import MailFillIcon from 'remixicon-react/MailFillIcon'
import FileTextFillIcon from 'remixicon-react/FileTextFillIcon'
import DownloadFillIcon from 'remixicon-react/DownloadFillIcon'
import UploadFillIcon from 'remixicon-react/UploadFillIcon'
import EyeFillIcon from 'remixicon-react/EyeFillIcon'
import EditFillIcon from 'remixicon-react/EditFillIcon'
import CheckboxCircleFillIcon from 'remixicon-react/CheckboxCircleFillIcon'
import AlertFillIcon from 'remixicon-react/AlertFillIcon'
import TimeFillIcon from 'remixicon-react/TimeFillIcon'
import BarChart2FillIcon from 'remixicon-react/BarChart2FillIcon'
import Settings3LineIcon from 'remixicon-react/Settings3LineIcon'
import RefreshLineIcon from 'remixicon-react/RefreshLineIcon'
import ShieldCheckFillIcon from 'remixicon-react/ShieldCheckFillIcon'
import { Search, X, CheckCircle, AlertCircle, CreditCard, Calendar, Zap, Shield } from "lucide-react"
import { getStatusColor, getPriorityColor } from "@/lib/admin-badge-utils"

// Mock data for admin billing
const mockPatients = [
  {
    id: "P001",
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "(555) 123-4567",
    balance: 0.00,
    status: "current",
    insurance: {
      provider: "Aetna",
      status: "Active",
      memberId: "AET123456789",
      group: "HCC-2024"
    },
    lastPayment: "2024-01-15",
    nextAppointment: "2024-02-20"
  },
  {
    id: "P002",
    name: "Michael Chen",
    email: "michael.chen@email.com",
    phone: "(555) 234-5678",
    balance: 150.00,
    status: "overdue",
    insurance: {
      provider: "Blue Cross",
      status: "Active",
      memberId: "BC123456789",
      group: "HCC-2024"
    },
    lastPayment: "2024-01-10",
    nextAppointment: "2024-02-15"
  },
  {
    id: "P003",
    name: "Emily Rodriguez",
    email: "emily.rodriguez@email.com",
    phone: "(555) 345-6789",
    balance: 75.50,
    status: "pending",
    insurance: {
      provider: "Cigna",
      status: "Active",
      memberId: "CIG123456789",
      group: "HCC-2024"
    },
    lastPayment: "2024-01-12",
    nextAppointment: "2024-02-18"
  },
  {
    id: "P004",
    name: "Robert Wilson",
    email: "robert.wilson@email.com",
    phone: "(555) 456-7890",
    balance: 0.00,
    status: "current",
    insurance: {
      provider: "UnitedHealth",
      status: "Active",
      memberId: "UHC123456789",
      group: "HCC-2024"
    },
    lastPayment: "2024-01-14",
    nextAppointment: "2024-02-22"
  },
  {
    id: "P005",
    name: "Lisa Thompson",
    email: "lisa.thompson@email.com",
    phone: "(555) 567-8901",
    balance: 300.00,
    status: "overdue",
    insurance: {
      provider: "Humana",
      status: "Active",
      memberId: "HUM123456789",
      group: "HCC-2024"
    },
    lastPayment: "2024-01-08",
    nextAppointment: "2024-02-25"
  }
]

const mockTransactions = [
  {
    id: "T001",
    patientId: "P002",
    patientName: "Michael Chen",
    date: "2024-01-15",
    amount: 150.00,
    type: "payment",
    method: "credit_card",
    status: "completed",
    description: "Cardiology consultation"
  },
  {
    id: "T002",
    patientId: "P003",
    patientName: "Emily Rodriguez",
    date: "2024-01-14",
    amount: 75.50,
    type: "charge",
    method: "insurance",
    status: "pending",
    description: "Echocardiogram"
  },
  {
    id: "T003",
    patientId: "P005",
    patientName: "Lisa Thompson",
    date: "2024-01-13",
    amount: 300.00,
    type: "charge",
    method: "insurance",
    status: "pending",
    description: "Stress test and consultation"
  },
  {
    id: "T004",
    patientId: "P001",
    patientName: "Sarah Johnson",
    date: "2024-01-12",
    amount: 120.00,
    type: "payment",
    method: "check",
    status: "completed",
    description: "Follow-up appointment"
  }
]

const mockInsuranceClaims = [
  {
    id: "C001",
    patientId: "P002",
    patientName: "Michael Chen",
    claimNumber: "CLM2024001",
    dateSubmitted: "2024-01-15",
    amount: 450.00,
    status: "approved",
    insuranceProvider: "Blue Cross",
    description: "Cardiology consultation and tests"
  },
  {
    id: "C002",
    patientId: "P003",
    patientName: "Emily Rodriguez",
    claimNumber: "CLM2024002",
    dateSubmitted: "2024-01-14",
    amount: 275.50,
    status: "pending",
    insuranceProvider: "Cigna",
    description: "Echocardiogram and consultation"
  },
  {
    id: "C003",
    patientId: "P005",
    patientName: "Lisa Thompson",
    claimNumber: "CLM2024003",
    dateSubmitted: "2024-01-13",
    amount: 600.00,
    status: "denied",
    insuranceProvider: "Humana",
    description: "Stress test and consultation"
  }
]

export default function AdminBillingPage() {
  // Import/Export state management
  const [importStep, setImportStep] = useState<'upload' | 'map' | 'review' | 'complete'>('upload')
  const [importProgress, setImportProgress] = useState(0)
  const [importErrors, setImportErrors] = useState<string[]>([])
  const [importSuccess, setImportSuccess] = useState(0)
  const [importData, setImportData] = useState<any[]>([])
  const [fieldMapping, setFieldMapping] = useState<Record<string, string>>({})
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false)
  const [isExportDialogOpen, setIsExportDialogOpen] = useState(false)
  const [exportType, setExportType] = useState<'patients' | 'transactions' | 'claims' | 'financial'>('patients')
  const [exportFormat, setExportFormat] = useState<'csv' | 'pdf'>('csv')
  const [exportDateRange, setExportDateRange] = useState({ from: '', to: '' })
  
  // Phase 2: API Integration & Payment Processing
  const [isInsuranceVerificationOpen, setIsInsuranceVerificationOpen] = useState(false)
  const [isPaymentProcessingOpen, setIsPaymentProcessingOpen] = useState(false)
  const [isAutomatedBillingOpen, setIsAutomatedBillingOpen] = useState(false)
  const [isClaimsAutomationOpen, setIsClaimsAutomationOpen] = useState(false)
  
  // New modals for missing functionality
  const [isTransactionDetailOpen, setIsTransactionDetailOpen] = useState(false)
  const [isClaimDetailOpen, setIsClaimDetailOpen] = useState(false)
  const [isViewHistoryOpen, setIsViewHistoryOpen] = useState(false)
  const [isPatientDetailOpen, setIsPatientDetailOpen] = useState(false)
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null)
  const [selectedClaim, setSelectedClaim] = useState<any>(null)
  const [selectedPatientForHistory, setSelectedPatientForHistory] = useState<any>(null)
  
  const [insuranceVerificationData, setInsuranceVerificationData] = useState({
    provider: '',
    memberId: '',
    group: '',
    dateOfBirth: ''
  })
  const [paymentProcessingData, setPaymentProcessingData] = useState({
    amount: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    patientId: ''
  })
  const [automatedBillingSettings, setAutomatedBillingSettings] = useState({
    enabled: false,
    frequency: 'monthly',
    reminderDays: 7,
    autoCharge: false,
    paymentMethod: 'credit_card'
  })
  const [claimsAutomationSettings, setClaimsAutomationSettings] = useState({
    enabled: false,
    autoSubmit: false,
    followUpDays: 30,
    denialRetry: true,
    maxRetries: 3
  })
  const [apiStatus, setApiStatus] = useState({
    insurance: 'connected',
    payment: 'connected',
    claims: 'connected'
  })
  const [verificationResult, setVerificationResult] = useState<any>(null)
  const [paymentResult, setPaymentResult] = useState<any>(null)
  const [automatedBillingStatus, setAutomatedBillingStatus] = useState({
    active: false,
    nextRun: '2024-02-01',
    lastRun: '2024-01-01',
    processedCount: 0
  })
  const [claimsAutomationStatus, setClaimsAutomationStatus] = useState({
    active: false,
    pendingClaims: 5,
    submittedToday: 2,
    approvedToday: 1,
    deniedToday: 0
  })
  
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedPatient, setSelectedPatient] = useState<any>(null)
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)
  const [isInsuranceModalOpen, setIsInsuranceModalOpen] = useState(false)
  const [paymentData, setPaymentData] = useState({
    amount: "",
    method: "credit_card",
    note: ""
  })
  const [isProcessingPayment, setIsProcessingPayment] = useState(false)
  const [insuranceData, setInsuranceData] = useState({
    provider: "",
    memberId: "",
    group: "",
    status: "Active"
  })

  const openPaymentModal = (patient: any) => {
    setSelectedPatient(patient)
    setIsPaymentModalOpen(true)
  }

  const openInsuranceModal = (patient: any) => {
    setInsuranceData({
      provider: patient.insurance.provider,
      memberId: patient.insurance.memberId,
      group: patient.insurance.group,
      status: patient.insurance.status
    })
    setIsInsuranceModalOpen(true)
  }

  const filteredPatients = mockPatients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || patient.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const totalOutstanding = mockPatients.reduce((sum, patient) => sum + patient.balance, 0)
  const overdueCount = mockPatients.filter(p => p.status === "overdue").length
  const currentCount = mockPatients.filter(p => p.status === "current").length

  const handlePatientClick = (patient: any) => {
    setSelectedPatient(patient)
    setIsPatientDetailOpen(true)
  }

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!selectedPatient || !paymentData.amount || parseFloat(paymentData.amount) <= 0) {
      return
    }

    setIsProcessingPayment(true)

    // Simulate processing delay
    setTimeout(() => {
      // Update patient balance
      const paymentAmount = parseFloat(paymentData.amount)
      const updatedPatients = mockPatients.map(patient => 
        patient.id === selectedPatient.id 
          ? { ...patient, balance: Math.max(0, patient.balance - paymentAmount) }
          : patient
      )
      
      // Update selected patient
      setSelectedPatient((prev: any) => prev ? { ...prev, balance: Math.max(0, prev.balance - paymentAmount) } : null)
      
      // Close modals and reset form
      setIsPaymentModalOpen(false)
      setIsPatientDetailOpen(false)
      setPaymentData({ amount: "", method: "credit_card", note: "" })
      setIsProcessingPayment(false)
    }, 1000)
  }

  const handleInsuranceSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!selectedPatient || !insuranceData.provider || !insuranceData.memberId || !insuranceData.group) {
      return
    }

    // Update patient insurance
    const updatedPatients = mockPatients.map(patient => 
      patient.id === selectedPatient.id 
        ? { ...patient, insurance: { ...insuranceData } }
        : patient
    )
    
    // Update selected patient
      setSelectedPatient((prev: any) => prev ? { ...prev, insurance: { ...insuranceData } } : null)
    
    // Close modals and reset form
    setIsInsuranceModalOpen(false)
    setIsPatientDetailOpen(false)
    setInsuranceData({ provider: "", memberId: "", group: "", status: "Active" })
  }

  // Import/Export Functions
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      const text = e.target?.result as string
      const lines = text.split('\n')
      const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''))
      const data = lines.slice(1).filter(line => line.trim()).map(line => {
        const values = line.split(',').map(v => v.trim().replace(/"/g, ''))
        const row: any = {}
        headers.forEach((header, index) => {
          row[header] = values[index] || ''
        })
        return row
      })

      setImportData(data)
      setFieldMapping(getDefaultMapping(headers))
      setImportStep('map')
    }
    reader.readAsText(file)
  }

  const getDefaultMapping = (headers: string[]) => {
    const mapping: Record<string, string> = {}
    headers.forEach(header => {
      const lowerHeader = header.toLowerCase()
      if (lowerHeader.includes('name')) mapping[header] = 'name'
      else if (lowerHeader.includes('email')) mapping[header] = 'email'
      else if (lowerHeader.includes('phone')) mapping[header] = 'phone'
      else if (lowerHeader.includes('balance')) mapping[header] = 'balance'
      else if (lowerHeader.includes('status')) mapping[header] = 'status'
      else if (lowerHeader.includes('provider')) mapping[header] = 'insurance.provider'
      else if (lowerHeader.includes('member')) mapping[header] = 'insurance.memberId'
      else if (lowerHeader.includes('group')) mapping[header] = 'insurance.group'
      else mapping[header] = ''
    })
    return mapping
  }

  const validateImportData = (data: any[]) => {
    const errors: string[] = []
    data.forEach((row, index) => {
      if (!row.name && fieldMapping.name) {
        errors.push(`Row ${index + 1}: Missing patient name`)
      }
      if (!row.email && fieldMapping.email) {
        errors.push(`Row ${index + 1}: Missing email address`)
      }
      if (row.balance && isNaN(parseFloat(row.balance))) {
        errors.push(`Row ${index + 1}: Invalid balance amount`)
      }
    })
    return errors
  }

  const processImport = () => {
    const errors = validateImportData(importData)
    if (errors.length > 0) {
      setImportErrors(errors)
      setImportStep('review')
      return
    }

    setImportStep('complete')
    setImportProgress(0)
    
    // Simulate import process
    const totalRows = importData.length
    let processed = 0
    
    const interval = setInterval(() => {
      processed += 1
      setImportProgress((processed / totalRows) * 100)
      
      if (processed >= totalRows) {
        clearInterval(interval)
        setImportSuccess(processed)
        setTimeout(() => {
          setIsImportDialogOpen(false)
          setImportStep('upload')
          setImportData([])
          setFieldMapping({})
          setImportErrors([])
          setImportSuccess(0)
        }, 2000)
      }
    }, 100)
  }

  const resetImport = () => {
    setImportStep('upload')
    setImportData([])
    setFieldMapping({})
    setImportErrors([])
    setImportSuccess(0)
    setImportProgress(0)
  }

  const exportData = () => {
    let data: any[] = []
    let filename = ''
    
    switch (exportType) {
      case 'patients':
        data = mockPatients.map(p => ({
          'Patient ID': p.id,
          'Name': p.name,
          'Email': p.email,
          'Phone': p.phone,
          'Balance': p.balance,
          'Status': p.status,
          'Insurance Provider': p.insurance.provider,
          'Insurance Status': p.insurance.status,
          'Member ID': p.insurance.memberId,
          'Group': p.insurance.group,
          'Last Payment': p.lastPayment,
          'Next Appointment': p.nextAppointment
        }))
        filename = 'patient_billing_data.csv'
        break
      case 'transactions':
        data = mockTransactions.map(t => ({
          'Transaction ID': t.id,
          'Patient': t.patientName,
          'Date': t.date,
          'Amount': t.amount,
          'Type': t.type,
          'Method': t.method,
          'Status': t.status,
          'Description': t.description
        }))
        filename = 'transaction_history.csv'
        break
      case 'claims':
        data = mockInsuranceClaims.map(c => ({
          'Claim ID': c.id,
          'Patient': c.patientName,
          'Claim Number': c.claimNumber,
          'Date Submitted': c.dateSubmitted,
          'Amount': c.amount,
          'Provider': c.insuranceProvider,
          'Status': c.status,
          'Description': c.description
        }))
        filename = 'insurance_claims.csv'
        break
      case 'financial':
        data = [
          {
            'Report Type': 'Financial Summary',
            'Total Outstanding': totalOutstanding,
            'Overdue Accounts': overdueCount,
            'Current Accounts': currentCount,
            'Total Patients': mockPatients.length,
            'Generated Date': new Date().toISOString().split('T')[0]
          }
        ]
        filename = 'financial_report.csv'
        break
    }

    if (exportFormat === 'csv') {
      const csvContent = [
        Object.keys(data[0]).join(','),
        ...data.map(row => Object.values(row).map(v => `"${v}"`).join(','))
      ].join('\n')
      
      const blob = new Blob([csvContent], { type: 'text/csv' })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = filename
      a.click()
      window.URL.revokeObjectURL(url)
    }
    
    setIsExportDialogOpen(false)
  }

  // Phase 2: API Integration Functions
  const verifyInsurance = async () => {
    if (!insuranceVerificationData.provider || !insuranceVerificationData.memberId) {
      return
    }

    // Simulate API call to insurance provider
    setVerificationResult({ status: 'verifying', message: 'Verifying insurance coverage...' })
    
    setTimeout(() => {
      const mockResult = {
        status: 'verified',
        coverage: {
          active: true,
          effectiveDate: '2024-01-01',
          expirationDate: '2024-12-31',
          deductible: 500,
          copay: 25,
          coverageType: 'PPO',
          benefits: ['Cardiology', 'Preventive Care', 'Lab Tests']
        },
        patient: {
          name: 'John Doe',
          memberId: insuranceVerificationData.memberId,
          group: insuranceVerificationData.group || 'HCC-2024'
        }
      }
      setVerificationResult(mockResult)
    }, 2000)
  }

  const processPayment = async () => {
    if (!paymentProcessingData.amount || !paymentProcessingData.cardNumber) {
      return
    }

    // Simulate Stripe payment processing
    setPaymentResult({ status: 'processing', message: 'Processing payment...' })
    
    setTimeout(() => {
      const mockResult = {
        status: 'success',
        transactionId: 'txn_' + Math.random().toString(36).substr(2, 9),
        amount: parseFloat(paymentProcessingData.amount),
        method: 'credit_card',
        timestamp: new Date().toISOString(),
        patientId: paymentProcessingData.patientId
      }
      setPaymentResult(mockResult)
      
      // Update patient balance
      const patient = mockPatients.find(p => p.id === paymentProcessingData.patientId)
      if (patient) {
        setSelectedPatient((prev: any) => prev ? { ...prev, balance: Math.max(0, prev.balance - mockResult.amount) } : null)
      }
    }, 1500)
  }

  const toggleAutomatedBilling = () => {
    setAutomatedBillingSettings(prev => ({ ...prev, enabled: !prev.enabled }))
    setAutomatedBillingStatus(prev => ({ ...prev, active: !prev.active }))
  }

  const toggleClaimsAutomation = () => {
    setClaimsAutomationSettings(prev => ({ ...prev, enabled: !prev.enabled }))
    setClaimsAutomationStatus(prev => ({ ...prev, active: !prev.active }))
  }

  const submitClaimAutomatically = async (claim: any) => {
    // Simulate automatic claim submission
    console.log('Submitting claim automatically:', claim)
    
    // Update claim status
    const updatedClaims = mockInsuranceClaims.map(c => 
      c.id === claim.id ? { ...c, status: 'submitted' } : c
    )
    
    // Update status
    setClaimsAutomationStatus(prev => ({
      ...prev,
      submittedToday: prev.submittedToday + 1,
      pendingClaims: prev.pendingClaims - 1
    }))
  }

  const checkApiConnections = () => {
    // Simulate API connection checks
    setApiStatus({
      insurance: 'connected',
      payment: 'connected', 
      claims: 'connected'
    })
  }

  // Function to sync data between patient detail and billing pages
  const syncPatientData = (patientId: string, updates: any) => {
    // Update the patient in the billing page data
    const updatedPatients = mockPatients.map(patient => 
      patient.id === patientId ? { ...patient, ...updates } : patient
    )
    
    // Update selected patient if it's the same patient
    if (selectedPatient && selectedPatient.id === patientId) {
      setSelectedPatient(prev => prev ? { ...prev, ...updates } : null)
    }
    
    // Update selected patient for history if it's the same patient
    if (selectedPatientForHistory && selectedPatientForHistory.id === patientId) {
      setSelectedPatientForHistory(prev => prev ? { ...prev, ...updates } : null)
    }
    
    // In a real application, this would also update the patient detail page
    // through a shared state management system or API call
    console.log('Syncing patient data:', patientId, updates)
  }

  // Enhanced payment submission with data sync
  const handlePaymentSubmitWithSync = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!selectedPatient || !paymentData.amount || parseFloat(paymentData.amount) <= 0) {
      return
    }

    setIsProcessingPayment(true)

    // Simulate processing delay
    setTimeout(() => {
      // Update patient balance
      const paymentAmount = parseFloat(paymentData.amount)
      const newBalance = Math.max(0, selectedPatient.balance - paymentAmount)
      
      // Sync the updated balance
      syncPatientData(selectedPatient.id, { balance: newBalance })
      
      // Close modals and reset form
      setIsPaymentModalOpen(false)
      setIsPatientDetailOpen(false)
      setPaymentData({ amount: "", method: "credit_card", note: "" })
      setIsProcessingPayment(false)
    }, 1000)
  }

  // Enhanced insurance submission with data sync
  const handleInsuranceSubmitWithSync = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!selectedPatient || !insuranceData.provider || !insuranceData.memberId || !insuranceData.group) {
      return
    }

    // Sync the updated insurance information
    syncPatientData(selectedPatient.id, { insurance: { ...insuranceData } })
    
    // Close modals and reset form
    setIsInsuranceModalOpen(false)
    setIsPatientDetailOpen(false)
    setInsuranceData({ provider: "", memberId: "", group: "", status: "Active" })
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <MoneyDollarCircleFillIcon className="h-6 w-6 text-foreground" />
          <h1 className="text-2xl font-bold">Billing & Insurance</h1>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={() => setIsExportDialogOpen(true)}>
            <DownloadFillIcon className="h-4 w-4 mr-2" />
            Export Data
          </Button>
          <Button variant="outline" size="sm" onClick={() => setIsImportDialogOpen(true)}>
            <UploadFillIcon className="h-4 w-4 mr-2" />
            Import Data
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Outstanding</p>
                <p className="text-2xl font-bold text-red-600">${totalOutstanding.toFixed(2)}</p>
              </div>
              <MoneyDollarCircleFillIcon className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Overdue Accounts</p>
                <p className="text-2xl font-bold text-orange-600">{overdueCount}</p>
              </div>
              <AlertFillIcon className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Current Accounts</p>
                <p className="text-2xl font-bold text-green-600">{currentCount}</p>
              </div>
                             <CheckboxCircleFillIcon className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Patients</p>
                <p className="text-2xl font-bold text-blue-600">{mockPatients.length}</p>
              </div>
              <User3FillIcon className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="patients" className="space-y-4">
        <TabsList>
          <TabsTrigger value="patients">Patient Accounts</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="claims">Insurance Claims</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>

        {/* Patient Accounts Tab */}
        <TabsContent value="patients" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search patients by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="current">Current</SelectItem>
                    <SelectItem value="overdue">Overdue</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Patient List */}
          <Card>
            <CardHeader>
              <CardTitle>Patient Accounts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredPatients.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <User3FillIcon className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-lg font-medium">No patients found</p>
                    <p className="text-sm">Try adjusting your search or filter criteria</p>
                  </div>
                ) : (
                  filteredPatients.map((patient) => (
                  <div
                    key={patient.id}
                    className="p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    {/* Mobile-optimized layout */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      {/* Patient Info */}
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 flex-shrink-0">
                          <AvatarFallback>{patient.name.split(" ").map((n: string) => n[0]).join("")}</AvatarFallback>
                        </Avatar>
                        <div className="min-w-0 flex-1">
                          <div className="font-medium truncate">{patient.name}</div>
                          <div className="text-sm text-muted-foreground truncate">{patient.email}</div>
                          <div className="text-xs text-muted-foreground">Patient ID: {patient.id}</div>
                        </div>
                      </div>
                      
                      {/* Billing and Insurance Info */}
                      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                        <div className="text-right sm:text-left">
                          <div className="font-medium text-lg sm:text-base">${patient.balance.toFixed(2)}</div>
                          <div className="text-sm text-muted-foreground">Balance</div>
                        </div>
                        <Badge className={`w-fit ${getStatusColor(patient.status)}`}>
                          {patient.status}
                        </Badge>
                        <div className="text-right sm:text-left">
                          <div className="text-sm font-medium truncate">{patient.insurance.provider}</div>
                          <div className="text-xs text-muted-foreground">Insurance</div>
                        </div>
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="flex gap-2 justify-end">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={(e) => { e.stopPropagation(); setSelectedPatientForHistory(patient); setIsViewHistoryOpen(true); }}
                        >
                          <EyeFillIcon className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={(e) => { e.stopPropagation(); handlePatientClick(patient); }}
                        >
                          <EditFillIcon className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={(e) => { e.stopPropagation(); openPaymentModal(patient); }}
                        >
                          <MoneyDollarCircleFillIcon className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={(e) => { e.stopPropagation(); openInsuranceModal(patient); }}
                        >
                          <ShieldCheckFillIcon className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Transactions Tab */}
        <TabsContent value="transactions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockTransactions.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                        <FileTextFillIcon className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="font-medium">No transactions found</p>
                        <p className="text-sm">Transactions will appear here as they are processed</p>
                      </TableCell>
                    </TableRow>
                  ) : (
                    mockTransactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell className="font-medium">{transaction.patientName}</TableCell>
                      <TableCell>{transaction.date}</TableCell>
                      <TableCell>${transaction.amount.toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge className={transaction.type === "payment" ? "!bg-green-100 !text-green-800 !border-green-200 hover:!bg-green-200 hover:!border-green-300 dark:!bg-green-900/20 dark:!text-green-400 dark:!border-green-800 dark:hover:!bg-green-900/40 dark:hover:!border-green-700" : "!bg-gray-100 !text-gray-800 !border-gray-200 hover:!bg-gray-200 hover:!border-gray-300 dark:!bg-gray-800 dark:!text-gray-300 dark:!border-gray-700 dark:hover:!bg-gray-700 dark:hover:!border-gray-600"}>
                          {transaction.type}
                        </Badge>
                      </TableCell>
                      <TableCell>{transaction.method}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(transaction.status)}>
                          {transaction.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" onClick={() => { setSelectedTransaction(transaction); setIsTransactionDetailOpen(true); }}>
                          <EyeFillIcon className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Insurance Claims Tab */}
        <TabsContent value="claims" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Insurance Claims</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient</TableHead>
                    <TableHead>Claim #</TableHead>
                    <TableHead>Date Submitted</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Provider</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockInsuranceClaims.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                        <BankCardFillIcon className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="font-medium">No insurance claims found</p>
                        <p className="text-sm">Claims will appear here as they are submitted</p>
                      </TableCell>
                    </TableRow>
                  ) : (
                    mockInsuranceClaims.map((claim) => (
                    <TableRow key={claim.id}>
                      <TableCell className="font-medium">{claim.patientName}</TableCell>
                      <TableCell>{claim.claimNumber}</TableCell>
                      <TableCell>{claim.dateSubmitted}</TableCell>
                      <TableCell>${claim.amount.toFixed(2)}</TableCell>
                      <TableCell>{claim.insuranceProvider}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(claim.status)}>
                          {claim.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" onClick={() => { setSelectedClaim(claim); setIsClaimDetailOpen(true); }}>
                          <EyeFillIcon className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Reports Tab */}
        <TabsContent value="reports" className="space-y-4">
          {/* Report Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart2FillIcon className="h-5 w-5" />
                Generate Reports
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Button variant="outline" onClick={() => exportData()}>
                  <DownloadFillIcon className="h-4 w-4 mr-2" />
                  Revenue Report
                </Button>
                <Button variant="outline" onClick={() => exportData()}>
                  <DownloadFillIcon className="h-4 w-4 mr-2" />
                  Patient Billing
                </Button>
                <Button variant="outline" onClick={() => exportData()}>
                  <DownloadFillIcon className="h-4 w-4 mr-2" />
                  Insurance Claims
                </Button>
                <Button variant="outline" onClick={() => exportData()}>
                  <DownloadFillIcon className="h-4 w-4 mr-2" />
                  Outstanding Balances
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart2FillIcon className="h-5 w-5" />
                  Revenue Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>This Month</span>
                    <span className="font-medium">$12,450.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Last Month</span>
                    <span className="font-medium">$11,200.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Outstanding</span>
                    <span className="font-medium text-red-600">$2,150.00</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BankCardFillIcon className="h-5 w-5" />
                  Insurance Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Active Claims</span>
                    <span className="font-medium">15</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Approved This Month</span>
                    <span className="font-medium text-green-600">$8,750.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pending Approval</span>
                    <span className="font-medium text-orange-600">$3,200.00</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Integrations Tab */}
        <TabsContent value="integrations" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* API Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  API Connections
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BankCardFillIcon className="h-4 w-4" />
                    <span>Insurance Providers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={apiStatus.insurance === 'connected' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                      {apiStatus.insurance === 'connected' ? 'Connected' : 'Disconnected'}
                    </Badge>
                    <Button variant="ghost" size="sm" onClick={checkApiConnections}>
                      <RefreshLineIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4" />
                    <span>Payment Processing</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={apiStatus.payment === 'connected' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                      {apiStatus.payment === 'connected' ? 'Connected' : 'Disconnected'}
                    </Badge>
                    <Button variant="ghost" size="sm" onClick={checkApiConnections}>
                      <RefreshLineIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileTextFillIcon className="h-4 w-4" />
                    <span>Claims Submission</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={apiStatus.claims === 'connected' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                      {apiStatus.claims === 'connected' ? 'Connected' : 'Disconnected'}
                    </Badge>
                    <Button variant="ghost" size="sm" onClick={checkApiConnections}>
                      <RefreshLineIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                  <Button variant="outline" size="sm" onClick={() => setIsInsuranceVerificationOpen(true)}>
                    <ShieldCheckFillIcon className="h-4 w-4 mr-2" />
                    Verify Insurance
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setIsPaymentProcessingOpen(true)}>
                    <CreditCard className="h-4 w-4 mr-2" />
                    Process Payment
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Automated Billing */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Automated Billing
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Enable Automated Billing</p>
                    <p className="text-sm text-muted-foreground">Automatically send billing reminders and process payments</p>
                  </div>
                  <Switch 
                    checked={automatedBillingSettings.enabled} 
                    onCheckedChange={toggleAutomatedBilling}
                  />
                </div>

                {automatedBillingSettings.enabled && (
                  <div className="space-y-3">
                    <div>
                      <Label>Billing Frequency</Label>
                      <Select value={automatedBillingSettings.frequency} onValueChange={(value) => setAutomatedBillingSettings(prev => ({ ...prev, frequency: value }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                          <SelectItem value="quarterly">Quarterly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Reminder Days Before Due</Label>
                      <Input 
                        type="number" 
                        value={automatedBillingSettings.reminderDays}
                        onChange={(e) => setAutomatedBillingSettings(prev => ({ ...prev, reminderDays: parseInt(e.target.value) || 7 }))}
                        min="1"
                        max="30"
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch 
                        checked={automatedBillingSettings.autoCharge} 
                        onCheckedChange={(checked) => setAutomatedBillingSettings(prev => ({ ...prev, autoCharge: checked }))}
                      />
                      <Label>Auto-charge saved payment methods</Label>
                    </div>
                  </div>
                )}

                <div className="pt-4 border-t">
                  <div className="flex justify-between text-sm">
                    <span>Status:</span>
                    <Badge className={automatedBillingStatus.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                      {automatedBillingStatus.active ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span>Next Run:</span>
                    <span>{automatedBillingStatus.nextRun}</span>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span>Last Processed:</span>
                    <span>{automatedBillingStatus.processedCount} accounts</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Claims Automation */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Claims Automation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Enable Claims Automation</p>
                    <p className="text-sm text-muted-foreground">Automatically submit and track insurance claims</p>
                  </div>
                  <Switch 
                    checked={claimsAutomationSettings.enabled} 
                    onCheckedChange={toggleClaimsAutomation}
                  />
                </div>

                {claimsAutomationSettings.enabled && (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Switch 
                        checked={claimsAutomationSettings.autoSubmit} 
                        onCheckedChange={(checked) => setClaimsAutomationSettings(prev => ({ ...prev, autoSubmit: checked }))}
                      />
                      <Label>Auto-submit new claims</Label>
                    </div>

                    <div>
                      <Label>Follow-up Days</Label>
                      <Input 
                        type="number" 
                        value={claimsAutomationSettings.followUpDays}
                        onChange={(e) => setClaimsAutomationSettings(prev => ({ ...prev, followUpDays: parseInt(e.target.value) || 30 }))}
                        min="7"
                        max="90"
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch 
                        checked={claimsAutomationSettings.denialRetry} 
                        onCheckedChange={(checked) => setClaimsAutomationSettings(prev => ({ ...prev, denialRetry: checked }))}
                      />
                      <Label>Auto-retry denied claims</Label>
                    </div>
                  </div>
                )}

                <div className="pt-4 border-t">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Pending Claims:</span>
                      <div className="font-medium">{claimsAutomationStatus.pendingClaims}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Submitted Today:</span>
                      <div className="font-medium">{claimsAutomationStatus.submittedToday}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Approved Today:</span>
                      <div className="font-medium text-green-600">{claimsAutomationStatus.approvedToday}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Denied Today:</span>
                      <div className="font-medium text-red-600">{claimsAutomationStatus.deniedToday}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Integration Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings3LineIcon className="h-5 w-5" />
                  Integration Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Stripe API Key</Label>
                  <Input 
                    type="password" 
                    placeholder="sk_test_..." 
                    className="font-mono text-sm"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Used for payment processing</p>
                </div>

                <div>
                  <Label>Insurance Provider API</Label>
                  <Input 
                    placeholder="https://api.insurance-provider.com" 
                    className="font-mono text-sm"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Base URL for insurance verification</p>
                </div>

                <div>
                  <Label>Claims Submission Endpoint</Label>
                  <Input 
                    placeholder="https://claims.insurance-provider.com/submit" 
                    className="font-mono text-sm"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Endpoint for automated claim submission</p>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <RefreshLineIcon className="h-4 w-4 mr-2" />
                    Test Connections
                  </Button>
                  <Button variant="outline" size="sm">
                    <DownloadFillIcon className="h-4 w-4 mr-2" />
                    Export Logs
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Patient Detail Modal */}
      <Dialog open={isPatientDetailOpen} onOpenChange={setIsPatientDetailOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Patient Billing Details</DialogTitle>
          </DialogHeader>
          {selectedPatient && (
            <div className="space-y-6">
              {/* Patient Info */}
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="text-lg">{selectedPatient.name.split(" ").map((n: string) => n[0]).join("")}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-semibold">{selectedPatient.name}</h3>
                  <p className="text-muted-foreground">{selectedPatient.email}</p>
                  <p className="text-sm text-muted-foreground">{selectedPatient.phone}</p>
                </div>
              </div>

              {/* Billing Summary */}
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="text-sm text-muted-foreground">Current Balance</div>
                    <div className="text-2xl font-bold text-red-600">${selectedPatient.balance.toFixed(2)}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-sm text-muted-foreground">Account Status</div>
                    <Badge className={getStatusColor(selectedPatient.status)}>
                      {selectedPatient.status}
                    </Badge>
                  </CardContent>
                </Card>
              </div>

              {/* Insurance Info */}
              <div>
                <h4 className="font-medium mb-2">Insurance Information</h4>
                <div className="space-y-2 text-sm">
                  <div><span className="font-medium">Provider:</span> {selectedPatient.insurance.provider}</div>
                  <div><span className="font-medium">Status:</span> {selectedPatient.insurance.status}</div>
                  <div><span className="font-medium">Member ID:</span> {selectedPatient.insurance.memberId}</div>
                  <div><span className="font-medium">Group:</span> {selectedPatient.insurance.group}</div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button onClick={() => setIsPaymentModalOpen(true)}>
                  Record Payment
                </Button>
                <Button variant="outline" onClick={() => openInsuranceModal(selectedPatient)}>
                  Update Insurance
                </Button>
                <Button variant="outline" onClick={() => { setSelectedPatientForHistory(selectedPatient); setIsViewHistoryOpen(true); }}>
                  <FileTextFillIcon className="h-4 w-4 mr-2" />
                  View History
                </Button>
              </div>
              
              {/* Close Button */}
              <div className="flex justify-end pt-4 border-t">
                <Button variant="outline" onClick={() => setIsPatientDetailOpen(false)}>
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Payment Modal */}
      <Dialog open={isPaymentModalOpen} onOpenChange={setIsPaymentModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Record Payment</DialogTitle>
          </DialogHeader>
          <form onSubmit={handlePaymentSubmitWithSync} className="space-y-4">
            <div>
              <label className="text-sm font-medium">Amount</label>
              <Input
                type="number"
                step="0.01"
                min="0.01"
                max={selectedPatient?.balance || 999999}
                value={paymentData.amount}
                onChange={(e) => setPaymentData(prev => ({ ...prev, amount: e.target.value }))}
                placeholder="0.00"
                required
              />
              {selectedPatient && (
                <p className="text-xs text-muted-foreground mt-1">
                  Maximum payment: ${selectedPatient.balance.toFixed(2)}
                </p>
              )}
            </div>
            <div>
              <label className="text-sm font-medium">Payment Method</label>
              <Select value={paymentData.method} onValueChange={(value) => setPaymentData(prev => ({ ...prev, method: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="credit_card">Credit Card</SelectItem>
                  <SelectItem value="check">Check</SelectItem>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="insurance">Insurance</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">Note (Optional)</label>
              <Textarea
                value={paymentData.note}
                onChange={(e) => setPaymentData(prev => ({ ...prev, note: e.target.value }))}
                placeholder="Payment notes..."
              />
            </div>
            <DialogFooter>
              <Button type="submit" disabled={isProcessingPayment}>
                {isProcessingPayment ? "Processing..." : "Record Payment"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Insurance Modal */}
      <Dialog open={isInsuranceModalOpen} onOpenChange={setIsInsuranceModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Insurance</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleInsuranceSubmitWithSync} className="space-y-4">
            <div>
              <label className="text-sm font-medium">Provider</label>
              <Input
                value={insuranceData.provider}
                onChange={(e) => setInsuranceData(prev => ({ ...prev, provider: e.target.value }))}
                placeholder="Insurance provider"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium">Member ID</label>
              <Input
                value={insuranceData.memberId}
                onChange={(e) => setInsuranceData(prev => ({ ...prev, memberId: e.target.value }))}
                placeholder="Member ID"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium">Group</label>
              <Input
                value={insuranceData.group}
                onChange={(e) => setInsuranceData(prev => ({ ...prev, group: e.target.value }))}
                placeholder="Group number"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium">Status</label>
              <Select value={insuranceData.status} onValueChange={(value) => setInsuranceData(prev => ({ ...prev, status: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <DialogFooter>
              <Button type="submit">Update Insurance</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Import Data Modal */}
      <Dialog open={isImportDialogOpen} onOpenChange={setIsImportDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <UploadFillIcon className="h-5 w-5" />
              Import Billing Data
            </DialogTitle>
          </DialogHeader>

          {importStep === 'upload' && (
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                <h3 className="font-medium mb-2">Import Instructions</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Upload a CSV file with patient billing data</li>
                  <li>• Supported fields: Name, Email, Phone, Balance, Status, Insurance Provider, Member ID, Group</li>
                  <li>• First row should contain column headers</li>
                  <li>• Maximum file size: 10MB</li>
                </ul>
              </div>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="billing-import-file"
                />
                <label htmlFor="billing-import-file" className="cursor-pointer">
                  <UploadFillIcon className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-lg font-medium">Click to upload CSV file</p>
                  <p className="text-sm text-muted-foreground">or drag and drop</p>
                </label>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-900/20 rounded-lg">
                <h4 className="font-medium mb-2">CSV Template</h4>
                <div className="text-xs font-mono bg-white dark:bg-gray-800 p-2 rounded border overflow-x-auto">
                  Name,Email,Phone,Balance,Status,Insurance Provider,Member ID,Group<br/>
                  John Doe,john@email.com,(555) 123-4567,150.00,overdue,Aetna,AET123456789,HCC-2024<br/>
                  Jane Smith,jane@email.com,(555) 987-6543,0.00,current,Blue Cross,BC123456789,HCC-2024
                </div>
              </div>
            </div>
          )}

          {importStep === 'map' && (
            <div className="space-y-4">
              <div className="p-4 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg">
                <h3 className="font-medium mb-2">Map CSV Fields</h3>
                <p className="text-sm text-muted-foreground">
                  Map your CSV columns to the correct billing fields. Required fields are marked with an asterisk (*).
                </p>
              </div>

              <div className="space-y-3">
                {Object.keys(importData[0] || {}).map((header) => (
                  <div key={header} className="flex items-center gap-3">
                    <div className="w-1/3 text-sm font-medium">{header}</div>
                    <div className="flex-1">
                      <Select
                        value={fieldMapping[header] || ''}
                        onValueChange={(value) => setFieldMapping(prev => ({ ...prev, [header]: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select field..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">Skip this column</SelectItem>
                          <SelectItem value="name">Patient Name *</SelectItem>
                          <SelectItem value="email">Email Address *</SelectItem>
                          <SelectItem value="phone">Phone Number</SelectItem>
                          <SelectItem value="balance">Balance</SelectItem>
                          <SelectItem value="status">Account Status</SelectItem>
                          <SelectItem value="insurance.provider">Insurance Provider</SelectItem>
                          <SelectItem value="insurance.memberId">Member ID</SelectItem>
                          <SelectItem value="insurance.group">Group Number</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={resetImport}>
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
                <Button onClick={processImport}>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Process Import
                </Button>
              </div>
            </div>
          )}

          {importStep === 'review' && (
            <div className="space-y-4">
              <div className="p-4 bg-red-50 dark:bg-red-950/20 rounded-lg">
                <h3 className="font-medium mb-2 text-red-800 dark:text-red-200">Import Errors Found</h3>
                <p className="text-sm text-red-700 dark:text-red-300 mb-3">
                  Please fix the following errors before proceeding:
                </p>
                <div className="space-y-1 max-h-40 overflow-y-auto">
                  {importErrors.map((error, index) => (
                    <div key={index} className="text-sm text-red-700 dark:text-red-300 flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 flex-shrink-0" />
                      {error}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setImportStep('map')}>
                  <EditFillIcon className="h-4 w-4 mr-2" />
                  Fix Mapping
                </Button>
                <Button variant="outline" onClick={resetImport}>
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              </div>
            </div>
          )}

          {importStep === 'complete' && (
            <div className="space-y-4 text-center">
              <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
                <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-600" />
                <h3 className="font-medium mb-2">Import Completed Successfully!</h3>
                <p className="text-sm text-muted-foreground">
                  {importSuccess} records were imported successfully.
                </p>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-600 h-2 rounded-full transition-all duration-300" 
                  style={{ width: `${importProgress}%` }}
                />
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Export Data Modal */}
      <Dialog open={isExportDialogOpen} onOpenChange={setIsExportDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <DownloadFillIcon className="h-5 w-5" />
              Export Billing Data
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Export Type</label>
              <Select value={exportType} onValueChange={(value: any) => setExportType(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="patients">Patient Billing Data</SelectItem>
                  <SelectItem value="transactions">Transaction History</SelectItem>
                  <SelectItem value="claims">Insurance Claims</SelectItem>
                  <SelectItem value="financial">Financial Report</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Export Format</label>
              <Select value={exportFormat} onValueChange={(value: any) => setExportFormat(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="csv">CSV File</SelectItem>
                  <SelectItem value="pdf">PDF Report</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium mb-2 block">From Date</label>
                <Input
                  type="date"
                  value={exportDateRange.from}
                  onChange={(e) => setExportDateRange(prev => ({ ...prev, from: e.target.value }))}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">To Date</label>
                <Input
                  type="date"
                  value={exportDateRange.to}
                  onChange={(e) => setExportDateRange(prev => ({ ...prev, to: e.target.value }))}
                />
              </div>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setIsExportDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={exportData}>
                <DownloadFillIcon className="h-4 w-4 mr-2" />
                Export Data
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Insurance Verification Modal */}
      <Dialog open={isInsuranceVerificationOpen} onOpenChange={setIsInsuranceVerificationOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ShieldCheckFillIcon className="h-5 w-5" />
              Insurance Verification
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Insurance Provider</Label>
                <Select value={insuranceVerificationData.provider} onValueChange={(value) => setInsuranceVerificationData(prev => ({ ...prev, provider: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select provider" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Aetna">Aetna</SelectItem>
                    <SelectItem value="Blue Cross">Blue Cross</SelectItem>
                    <SelectItem value="Cigna">Cigna</SelectItem>
                    <SelectItem value="UnitedHealth">UnitedHealth</SelectItem>
                    <SelectItem value="Humana">Humana</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Member ID</Label>
                <Input
                  value={insuranceVerificationData.memberId}
                  onChange={(e) => setInsuranceVerificationData(prev => ({ ...prev, memberId: e.target.value }))}
                  placeholder="Enter member ID"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Group Number</Label>
                <Input
                  value={insuranceVerificationData.group}
                  onChange={(e) => setInsuranceVerificationData(prev => ({ ...prev, group: e.target.value }))}
                  placeholder="Enter group number"
                />
              </div>
              <div>
                <Label>Date of Birth</Label>
                <Input
                  type="date"
                  value={insuranceVerificationData.dateOfBirth}
                  onChange={(e) => setInsuranceVerificationData(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                />
              </div>
            </div>

            {verificationResult && (
              <div className="p-4 border rounded-lg">
                {verificationResult.status === 'verifying' && (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                    <span>{verificationResult.message}</span>
                  </div>
                )}
                
                {verificationResult.status === 'verified' && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-green-600">
                      <CheckCircle className="h-5 w-5" />
                      <span className="font-medium">Insurance Verified</span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Patient:</span> {verificationResult.patient.name}
                      </div>
                      <div>
                        <span className="font-medium">Member ID:</span> {verificationResult.patient.memberId}
                      </div>
                      <div>
                        <span className="font-medium">Coverage Type:</span> {verificationResult.coverage.coverageType}
                      </div>
                      <div>
                        <span className="font-medium">Deductible:</span> ${verificationResult.coverage.deductible}
                      </div>
                      <div>
                        <span className="font-medium">Copay:</span> ${verificationResult.coverage.copay}
                      </div>
                      <div>
                        <span className="font-medium">Effective Date:</span> {verificationResult.coverage.effectiveDate}
                      </div>
                    </div>

                    <div>
                      <span className="font-medium text-sm">Covered Benefits:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {verificationResult.coverage.benefits.map((benefit: string, index: number) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {benefit}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsInsuranceVerificationOpen(false)}>
                Close
              </Button>
              <Button onClick={verifyInsurance} disabled={!insuranceVerificationData.provider || !insuranceVerificationData.memberId}>
                <ShieldCheckFillIcon className="h-4 w-4 mr-2" />
                Verify Insurance
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>

      {/* Payment Processing Modal */}
      <Dialog open={isPaymentProcessingOpen} onOpenChange={setIsPaymentProcessingOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Process Payment
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label>Patient</Label>
              <Select value={paymentProcessingData.patientId} onValueChange={(value) => setPaymentProcessingData(prev => ({ ...prev, patientId: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select patient" />
                </SelectTrigger>
                <SelectContent>
                  {mockPatients.map(patient => (
                    <SelectItem key={patient.id} value={patient.id}>
                      {patient.name} - ${patient.balance.toFixed(2)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Amount</Label>
              <Input
                type="number"
                step="0.01"
                min="0.01"
                value={paymentProcessingData.amount}
                onChange={(e) => setPaymentProcessingData(prev => ({ ...prev, amount: e.target.value }))}
                placeholder="0.00"
              />
            </div>

            <div>
              <Label>Card Number</Label>
              <Input
                value={paymentProcessingData.cardNumber}
                onChange={(e) => setPaymentProcessingData(prev => ({ ...prev, cardNumber: e.target.value }))}
                placeholder="1234 5678 9012 3456"
                maxLength="19"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Expiry Date</Label>
                <Input
                  value={paymentProcessingData.expiryDate}
                  onChange={(e) => setPaymentProcessingData(prev => ({ ...prev, expiryDate: e.target.value }))}
                  placeholder="MM/YY"
                  maxLength="5"
                />
              </div>
              <div>
                <Label>CVV</Label>
                <Input
                  value={paymentProcessingData.cvv}
                  onChange={(e) => setPaymentProcessingData(prev => ({ ...prev, cvv: e.target.value }))}
                  placeholder="123"
                  maxLength="4"
                />
              </div>
            </div>

            {paymentResult && (
              <div className="p-4 border rounded-lg">
                {paymentResult.status === 'processing' && (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                    <span>{paymentResult.message}</span>
                  </div>
                )}
                
                {paymentResult.status === 'success' && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-green-600">
                      <CheckCircle className="h-5 w-5" />
                      <span className="font-medium">Payment Successful</span>
                    </div>
                    <div className="text-sm space-y-1">
                      <div><span className="font-medium">Transaction ID:</span> {paymentResult.transactionId}</div>
                      <div><span className="font-medium">Amount:</span> ${paymentResult.amount.toFixed(2)}</div>
                      <div><span className="font-medium">Method:</span> {paymentResult.method}</div>
                      <div><span className="font-medium">Timestamp:</span> {new Date(paymentResult.timestamp).toLocaleString()}</div>
                    </div>
                  </div>
                )}
              </div>
            )}

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsPaymentProcessingOpen(false)}>
                Cancel
              </Button>
              <Button onClick={processPayment} disabled={!paymentProcessingData.amount || !paymentProcessingData.cardNumber}>
                <CreditCard className="h-4 w-4 mr-2" />
                Process Payment
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>

      {/* Transaction Detail Modal */}
      <Dialog open={isTransactionDetailOpen} onOpenChange={setIsTransactionDetailOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Transaction Details</DialogTitle>
          </DialogHeader>
          {selectedTransaction && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Transaction ID</Label>
                  <div className="font-mono text-sm bg-gray-100 dark:bg-gray-800 p-2 rounded border">{selectedTransaction.id}</div>
                </div>
                <div>
                  <Label>Patient</Label>
                  <div>{selectedTransaction.patientName}</div>
                </div>
                <div>
                  <Label>Date</Label>
                  <div>{selectedTransaction.date}</div>
                </div>
                <div>
                  <Label>Amount</Label>
                  <div>${selectedTransaction.amount.toFixed(2)}</div>
                </div>
                <div>
                  <Label>Type</Label>
                  <Badge className={selectedTransaction.type === "payment" ? "!bg-green-100 !text-green-800 !border-green-200 hover:!bg-green-200 hover:!border-green-300 dark:!bg-green-900/20 dark:!text-green-400 dark:!border-green-800 dark:hover:!bg-green-900/40 dark:hover:!border-green-700" : "!bg-gray-100 !text-gray-800 !border-gray-200 hover:!bg-gray-200 hover:!border-gray-300 dark:!bg-gray-800 dark:!text-gray-300 dark:!border-gray-700 dark:hover:!bg-gray-700 dark:hover:!border-gray-600"}>
                    {selectedTransaction.type}
                  </Badge>
                </div>
                <div>
                  <Label>Method</Label>
                  <div>{selectedTransaction.method}</div>
                </div>
                <div>
                  <Label>Status</Label>
                  <Badge className={getStatusColor(selectedTransaction.status)}>
                    {selectedTransaction.status}
                  </Badge>
                </div>
                <div>
                  <Label>Description</Label>
                  <div>{selectedTransaction.description}</div>
                </div>
              </div>
              <DialogFooter>
                <Button onClick={() => setIsTransactionDetailOpen(false)}>Close</Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Claim Detail Modal */}
      <Dialog open={isClaimDetailOpen} onOpenChange={setIsClaimDetailOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Claim Details</DialogTitle>
          </DialogHeader>
          {selectedClaim && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Claim ID</Label>
                  <div className="font-mono text-sm bg-gray-100 dark:bg-gray-800 p-2 rounded border">{selectedClaim.id}</div>
                </div>
                <div>
                  <Label>Patient</Label>
                  <div>{selectedClaim.patientName}</div>
                </div>
                <div>
                  <Label>Claim Number</Label>
                  <div>{selectedClaim.claimNumber}</div>
                </div>
                <div>
                  <Label>Date Submitted</Label>
                  <div>{selectedClaim.dateSubmitted}</div>
                </div>
                <div>
                  <Label>Amount</Label>
                  <div>${selectedClaim.amount.toFixed(2)}</div>
                </div>
                <div>
                  <Label>Provider</Label>
                  <div>{selectedClaim.insuranceProvider}</div>
                </div>
                <div>
                  <Label>Status</Label>
                  <Badge className={getStatusColor(selectedClaim.status)}>
                    {selectedClaim.status}
                  </Badge>
                </div>
                <div>
                  <Label>Description</Label>
                  <div>{selectedClaim.description}</div>
                </div>
              </div>
              <DialogFooter>
                <Button onClick={() => setIsClaimDetailOpen(false)}>Close</Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* View History Modal */}
      <Dialog open={isViewHistoryOpen} onOpenChange={setIsViewHistoryOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Patient History</DialogTitle>
          </DialogHeader>
          {selectedPatientForHistory && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Patient ID</Label>
                  <div className="font-mono text-sm bg-gray-100 dark:bg-gray-800 p-2 rounded border">{selectedPatientForHistory.id}</div>
                </div>
                <div>
                  <Label>Name</Label>
                  <div>{selectedPatientForHistory.name}</div>
                </div>
                <div>
                  <Label>Email</Label>
                  <div>{selectedPatientForHistory.email}</div>
                </div>
                <div>
                  <Label>Phone</Label>
                  <div>{selectedPatientForHistory.phone}</div>
                </div>
                <div>
                  <Label>Current Balance</Label>
                  <div>${selectedPatientForHistory.balance.toFixed(2)}</div>
                </div>
                <div>
                  <Label>Account Status</Label>
                  <Badge className={getStatusColor(selectedPatientForHistory.status)}>
                    {selectedPatientForHistory.status}
                  </Badge>
                </div>
                <div>
                  <Label>Last Payment</Label>
                  <div>{selectedPatientForHistory.lastPayment}</div>
                </div>
                <div>
                  <Label>Next Appointment</Label>
                  <div>{selectedPatientForHistory.nextAppointment}</div>
                </div>
              </div>
              <DialogFooter>
                <Button onClick={() => setIsViewHistoryOpen(false)}>Close</Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
} 