"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import CheckboxCircleFillIcon from 'remixicon-react/CheckboxCircleFillIcon'
import DatabaseFillIcon from 'remixicon-react/DatabaseFillIcon'
import GlobalFillIcon from 'remixicon-react/GlobalFillIcon'
import User3FillIcon from 'remixicon-react/User3FillIcon'
import ShieldCheckFillIcon from 'remixicon-react/ShieldCheckFillIcon'
import RefreshFillIcon from 'remixicon-react/RefreshFillIcon'

// Mock data for system status
const MOCK_SYSTEM_STATUS = {
  database: "Operational",
  api: "Operational", 
  patientPortal: "Operational",
  adminPortal: "Operational",
  notifications: "Operational",
  lastBackup: "2024-01-15 02:00 AM",
  uptime: "99.9%",
  activeUsers: 127,
  totalPatients: 1234,
}

interface SystemStatusModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SystemStatusModal({ open, onOpenChange }: SystemStatusModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CheckboxCircleFillIcon className="h-5 w-5 text-green-500" />
            System Status Overview
          </DialogTitle>
          <DialogDescription>
            Real-time status of all system components and services
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          {/* System Status Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <DatabaseFillIcon className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">Database</p>
                    <p className="text-lg font-bold text-green-600">{MOCK_SYSTEM_STATUS.database}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <GlobalFillIcon className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">API</p>
                    <p className="text-lg font-bold text-green-600">{MOCK_SYSTEM_STATUS.api}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <User3FillIcon className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">Patient Portal</p>
                    <p className="text-lg font-bold text-green-600">{MOCK_SYSTEM_STATUS.patientPortal}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <ShieldCheckFillIcon className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">Admin Portal</p>
                    <p className="text-lg font-bold text-green-600">{MOCK_SYSTEM_STATUS.adminPortal}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* System Statistics */}
          <Card>
            <CardHeader>
              <CardTitle>System Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Uptime</p>
                  <p className="text-lg font-bold">{MOCK_SYSTEM_STATUS.uptime}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Active Users</p>
                  <p className="text-lg font-bold">{MOCK_SYSTEM_STATUS.activeUsers}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Patients</p>
                  <p className="text-lg font-bold">{MOCK_SYSTEM_STATUS.totalPatients}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Last Backup</p>
                  <p className="text-sm font-medium">{MOCK_SYSTEM_STATUS.lastBackup}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* System Health Alert */}
          <Alert>
            <CheckboxCircleFillIcon className="h-4 w-4" />
            <AlertDescription>
              All systems are operating normally. No issues detected.
            </AlertDescription>
          </Alert>
        </div>
        <DialogFooter>
          <Button onClick={() => {
            // Simulate refresh
            console.log("Refreshing system status...")
          }}>
            <RefreshFillIcon className="h-4 w-4 mr-2" />
            Refresh Status
          </Button>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 