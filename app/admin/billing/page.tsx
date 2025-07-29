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
import MoneyDollarCircleFillIcon from 'remixicon-react/MoneyDollarCircleFillIcon'
import BankCardFillIcon from 'remixicon-react/BankCardFillIcon'
import SearchFillIcon from 'remixicon-react/SearchFillIcon'
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
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedPatient, setSelectedPatient] = useState<any>(null)
  const [isPatientDetailOpen, setIsPatientDetailOpen] = useState(false)
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
      setSelectedPatient(prev => prev ? { ...prev, balance: Math.max(0, prev.balance - paymentAmount) } : null)
      
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
    setSelectedPatient(prev => prev ? { ...prev, insurance: { ...insuranceData } } : null)
    
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
          <Button variant="outline" size="sm">
            <DownloadFillIcon className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button variant="outline" size="sm">
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
        </TabsList>

        {/* Patient Accounts Tab */}
        <TabsContent value="patients" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <SearchFillIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
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
                    className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                    onClick={() => handlePatientClick(patient)}
                  >
                    {/* Mobile-optimized layout */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      {/* Patient Info */}
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 flex-shrink-0">
                          <AvatarFallback>{patient.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
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
                        <Button variant="ghost" size="sm">
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
                        <Button variant="ghost" size="sm">
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
                  <AvatarFallback className="text-lg">{selectedPatient.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
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
                <Button variant="outline">
                  <FileTextFillIcon className="h-4 w-4 mr-2" />
                  View History
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
          <form onSubmit={handlePaymentSubmit} className="space-y-4">
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
          <form onSubmit={handleInsuranceSubmit} className="space-y-4">
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
    </div>
  )
} 