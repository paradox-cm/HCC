"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Settings2FillIcon from 'remixicon-react/Settings2FillIcon'
import ShieldCheckFillIcon from 'remixicon-react/ShieldCheckFillIcon'
import User3FillIcon from 'remixicon-react/User3FillIcon'
import Notification3FillIcon from 'remixicon-react/Notification3FillIcon'
import DatabaseFillIcon from 'remixicon-react/DatabaseFillIcon'
import GlobalFillIcon from 'remixicon-react/GlobalFillIcon'
import LockFillIcon from 'remixicon-react/LockFillIcon'
import KeyFillIcon from 'remixicon-react/KeyFillIcon'
import EyeFillIcon from 'remixicon-react/EyeFillIcon'
import EyeOffFillIcon from 'remixicon-react/EyeOffFillIcon'
import SaveFillIcon from 'remixicon-react/SaveFillIcon'
import RefreshFillIcon from 'remixicon-react/RefreshFillIcon'
import DeleteBinFillIcon from 'remixicon-react/DeleteBinFillIcon'
import AddCircleFillIcon from 'remixicon-react/AddCircleFillIcon'
import EditFillIcon from 'remixicon-react/EditFillIcon'
import CheckboxCircleFillIcon from 'remixicon-react/CheckboxCircleFillIcon'
import ErrorWarningFillIcon from 'remixicon-react/ErrorWarningFillIcon'
import InformationFillIcon from 'remixicon-react/InformationFillIcon'
import LogoutBoxFillIcon from 'remixicon-react/LogoutBoxFillIcon'
import { SystemStatusModal } from "@/components/SystemStatusModal"

// Mock data for settings
const MOCK_ADMIN_USERS = [
  { id: 1, name: "Dr. Asif Ali", email: "asif.ali@hcc.com", role: "Super Admin", status: "Active", lastLogin: "2024-01-15 10:30 AM" },
  { id: 2, name: "Dr. Sajid Ali", email: "sajid.ali@hcc.com", role: "Admin", status: "Active", lastLogin: "2024-01-15 09:15 AM" },
  { id: 3, name: "Dr. Abdul Ali", email: "abdul.ali@hcc.com", role: "Admin", status: "Active", lastLogin: "2024-01-14 04:20 PM" },
  { id: 4, name: "Nursing Staff", email: "nursing@hcc.com", role: "Staff", status: "Active", lastLogin: "2024-01-15 08:45 AM" },
  { id: 5, name: "Billing Team", email: "billing@hcc.com", role: "Staff", status: "Inactive", lastLogin: "2024-01-10 02:30 PM" },
]

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

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState("users")
  const [showPassword, setShowPassword] = useState(false)
  const [addUserModal, setAddUserModal] = useState(false)
  const [editUserModal, setEditUserModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [deleteUserModal, setDeleteUserModal] = useState(false)
  const [backupModal, setBackupModal] = useState(false)
  const [maintenanceModal, setMaintenanceMode] = useState(false)
  const [systemStatusModal, setSystemStatusModal] = useState(false)

  // System Settings State
  const [systemSettings, setSystemSettings] = useState({
    siteName: "Houston Cardiology Consultants",
    siteDescription: "Leading cardiology care in Houston",
    contactEmail: "info@hcc.com",
    contactPhone: "713-464-4140",
    address: "123 Heart Health Way, Houston, TX 77001",
    timezone: "America/Chicago",
    dateFormat: "MM/DD/YYYY",
    maintenanceMode: false,
    autoBackup: true,
    backupFrequency: "daily",
    sessionTimeout: 30,
    maxLoginAttempts: 5,
    passwordExpiry: 90,
    twoFactorAuth: true,
    emailNotifications: true,
    smsNotifications: false,
    patientPortalEnabled: true,
    chatSupportEnabled: true,
    analyticsEnabled: true,
  })

  // Security Settings State
  const [securitySettings, setSecuritySettings] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    twoFactorEnabled: true,
    ipWhitelist: "",
    sessionTimeout: 30,
    maxLoginAttempts: 5,
    passwordComplexity: "strong",
    auditLogging: true,
    dataEncryption: true,
  })

  // Notification Settings State
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    appointmentReminders: true,
    prescriptionAlerts: true,
    testResultNotifications: true,
    billingAlerts: true,
    systemAlerts: true,
    adminAlerts: true,
    patientAlerts: true,
    marketingEmails: false,
  })

  // Portal Configuration State
  const [portalSettings, setPortalSettings] = useState({
    patientPortalEnabled: true,
    chatSupportEnabled: true,
    analyticsEnabled: true,
    customBranding: true,
    logoUrl: "/images/hcc-logo.png",
    primaryColor: "#2563eb",
    secondaryColor: "#1e40af",
    welcomeMessage: "Welcome to Houston Cardiology Consultants Patient Portal",
    termsOfService: "https://hcc.com/terms",
    privacyPolicy: "https://hcc.com/privacy",
    hipaaNotice: "https://hcc.com/hipaa",
    patientRights: "https://hcc.com/rights",
  })

  const handleSaveSettings = (section: string) => {
    console.log(`Saving ${section} settings...`)
    // In a real app, this would save to the backend
  }

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Adding new user...")
    setAddUserModal(false)
  }

  const handleEditUser = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Editing user...")
    setEditUserModal(false)
    setSelectedUser(null)
  }

  const handleDeleteUser = () => {
    console.log("Deleting user...")
    setDeleteUserModal(false)
    setSelectedUser(null)
  }

  const handleBackup = () => {
    console.log("Creating backup...")
    setBackupModal(false)
  }

  const handleMaintenanceMode = () => {
    console.log("Toggling maintenance mode...")
    setMaintenanceMode(false)
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Settings2FillIcon className="h-6 w-6 text-foreground" />
          <h1 className="text-2xl font-bold">Admin Settings</h1>
        </div>
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/dr-asif-ali.png" alt="Dr. Asif Ali" />
            <AvatarFallback>AA</AvatarFallback>
          </Avatar>
          <div className="text-right">
            <div className="text-xs text-muted-foreground">Logged in as</div>
            <div className="text-sm font-medium text-foreground">Dr. Asif Ali</div>
          </div>
        </div>
      </div>



      {/* Welcome Section */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">Welcome to Admin Settings</h2>
              <p className="text-muted-foreground">
                Manage your healthcare portal configuration, user access, and system preferences. 
                All changes are automatically saved and applied immediately.
              </p>
            </div>
            <div className="text-right ml-20">
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-auto p-0 text-muted-foreground hover:text-foreground"
                onClick={() => setSystemStatusModal(true)}
              >
                <div className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <CheckboxCircleFillIcon className="h-4 w-4 text-green-500" />
                    <span>System Operational</span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Last updated: {new Date().toLocaleDateString()}
                  </div>
                </div>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Settings Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="users" className="flex items-center gap-2">
            <User3FillIcon className="h-4 w-4" />
            Users
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Notification3FillIcon className="h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="system" className="flex items-center gap-2">
            <DatabaseFillIcon className="h-4 w-4" />
            System
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <ShieldCheckFillIcon className="h-4 w-4" />
            Security
          </TabsTrigger>
        </TabsList>



        {/* Security Settings */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Configure security policies and authentication settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <div className="relative">
                      <Input
                        id="currentPassword"
                        type={showPassword ? "text" : "password"}
                        value={securitySettings.currentPassword}
                        onChange={(e) => setSecuritySettings(p => ({ ...p, currentPassword: e.target.value }))}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOffFillIcon className="h-4 w-4" /> : <EyeFillIcon className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input
                      id="newPassword"
                      type="password"
                      value={securitySettings.newPassword}
                      onChange={(e) => setSecuritySettings(p => ({ ...p, newPassword: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={securitySettings.confirmPassword}
                      onChange={(e) => setSecuritySettings(p => ({ ...p, confirmPassword: e.target.value }))}
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Session Timeout</Label>
                      <p className="text-sm text-muted-foreground">Auto-logout after inactivity</p>
                    </div>
                    <Select value={securitySettings.sessionTimeout} onValueChange={(value) => setSecuritySettings(p => ({ ...p, sessionTimeout: value }))}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15 minutes</SelectItem>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="60">1 hour</SelectItem>
                        <SelectItem value="120">2 hours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Failed Login Attempts</Label>
                      <p className="text-sm text-muted-foreground">Lock account after failed attempts</p>
                    </div>
                    <Select value={securitySettings.maxLoginAttempts} onValueChange={(value) => setSecuritySettings(p => ({ ...p, maxLoginAttempts: value }))}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="3">3 attempts</SelectItem>
                        <SelectItem value="5">5 attempts</SelectItem>
                        <SelectItem value="10">10 attempts</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <Button onClick={() => handleSaveSettings("security")}>
                  <SaveFillIcon className="h-4 w-4 mr-2" />
                  Save Security Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* User Management */}
        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>User Management</CardTitle>
                  <CardDescription>Manage admin users and their permissions</CardDescription>
                </div>
                <Button onClick={() => setAddUserModal(true)}>
                  <AddCircleFillIcon className="h-4 w-4 mr-2" />
                  Add User
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Name</th>
                      <th className="text-left py-3 px-4">Email</th>
                      <th className="text-left py-3 px-4">Role</th>
                      <th className="text-left py-3 px-4">Status</th>
                      <th className="text-left py-3 px-4">Last Login</th>
                      <th className="text-left py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {MOCK_ADMIN_USERS.map((user) => (
                      <tr key={user.id} className="border-b hover:bg-muted/50">
                        <td className="py-3 px-4 font-medium">{user.name}</td>
                        <td className="py-3 px-4">{user.email}</td>
                        <td className="py-3 px-4">
                          <Badge variant={user.role === "Super Admin" ? "default" : "secondary"}>
                            {user.role}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <Badge variant={user.status === "Active" ? "default" : "destructive"}>
                            {user.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-muted-foreground">{user.lastLogin}</td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setSelectedUser(user)
                                setEditUserModal(true)
                              }}
                            >
                              <EditFillIcon className="h-4 w-4" />
                            </Button>
                                                         <Button
                               size="sm"
                               variant="destructive"
                               onClick={() => {
                                 setSelectedUser(user)
                                 setDeleteUserModal(true)
                               }}
                             >
                               <DeleteBinFillIcon className="h-4 w-4" />
                             </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure email and SMS notification preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold">Email Notifications</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Enable Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">Send notifications via email</p>
                      </div>
                      <Switch
                        checked={notificationSettings.emailNotifications}
                        onCheckedChange={(checked) => setNotificationSettings(p => ({ ...p, emailNotifications: checked }))}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Appointment Reminders</Label>
                        <p className="text-sm text-muted-foreground">Send appointment reminders</p>
                      </div>
                      <Switch
                        checked={notificationSettings.appointmentReminders}
                        onCheckedChange={(checked) => setNotificationSettings(p => ({ ...p, appointmentReminders: checked }))}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Prescription Alerts</Label>
                        <p className="text-sm text-muted-foreground">Alert for prescription updates</p>
                      </div>
                      <Switch
                        checked={notificationSettings.prescriptionAlerts}
                        onCheckedChange={(checked) => setNotificationSettings(p => ({ ...p, prescriptionAlerts: checked }))}
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="font-semibold">SMS Notifications</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Enable SMS Notifications</Label>
                        <p className="text-sm text-muted-foreground">Send notifications via SMS</p>
                      </div>
                      <Switch
                        checked={notificationSettings.smsNotifications}
                        onCheckedChange={(checked) => setNotificationSettings(p => ({ ...p, smsNotifications: checked }))}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Test Result Notifications</Label>
                        <p className="text-sm text-muted-foreground">Notify when results are available</p>
                      </div>
                      <Switch
                        checked={notificationSettings.testResultNotifications}
                        onCheckedChange={(checked) => setNotificationSettings(p => ({ ...p, testResultNotifications: checked }))}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Billing Alerts</Label>
                        <p className="text-sm text-muted-foreground">Send billing notifications</p>
                      </div>
                      <Switch
                        checked={notificationSettings.billingAlerts}
                        onCheckedChange={(checked) => setNotificationSettings(p => ({ ...p, billingAlerts: checked }))}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="font-semibold">Notification Preferences</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Portal Notifications</Label>
                        <p className="text-sm text-muted-foreground">Show notifications in patient portal</p>
                      </div>
                      <Switch
                        checked={systemSettings.portalNotificationsEnabled}
                        onCheckedChange={(checked) => setSystemSettings(p => ({ ...p, portalNotificationsEnabled: checked }))}
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="notificationTime">Notification Frequency</Label>
                      <Select value={systemSettings.notificationTime} onValueChange={(value) => setSystemSettings(p => ({ ...p, notificationTime: value }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="immediate">Immediate</SelectItem>
                          <SelectItem value="hourly">Hourly</SelectItem>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <Button onClick={() => handleSaveSettings("notifications")}>
                  <SaveFillIcon className="h-4 w-4 mr-2" />
                  Save Notification Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>



        {/* System Settings */}
        <TabsContent value="system" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>System Maintenance</CardTitle>
                <CardDescription>Manage system backups and maintenance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Maintenance Mode</Label>
                    <p className="text-sm text-muted-foreground">Temporarily disable portal access</p>
                  </div>
                  <Switch
                    checked={systemSettings.maintenanceMode}
                    onCheckedChange={(checked) => setSystemSettings(p => ({ ...p, maintenanceMode: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Auto Backup</Label>
                    <p className="text-sm text-muted-foreground">Automatically backup data</p>
                  </div>
                  <Switch
                    checked={systemSettings.autoBackup}
                    onCheckedChange={(checked) => setSystemSettings(p => ({ ...p, autoBackup: checked }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Backup Frequency</Label>
                  <Select value={systemSettings.backupFrequency} onValueChange={(value) => setSystemSettings(p => ({ ...p, backupFrequency: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setBackupModal(true)}>
                    <DatabaseFillIcon className="h-4 w-4 mr-2" />
                    Create Backup
                  </Button>
                  <Button variant="outline" onClick={() => setMaintenanceMode(true)}>
                    <ErrorWarningFillIcon className="h-4 w-4 mr-2" />
                    Maintenance Mode
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Patient Portal Settings</CardTitle>
                <CardDescription>Configure patient portal access and features</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Enable Patient Portal</Label>
                    <p className="text-sm text-muted-foreground">Allow patients to access their portal</p>
                  </div>
                  <Switch
                    checked={systemSettings.patientPortalEnabled}
                    onCheckedChange={(checked) => setSystemSettings(p => ({ ...p, patientPortalEnabled: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Allow Document Upload</Label>
                    <p className="text-sm text-muted-foreground">Patients can upload documents</p>
                  </div>
                  <Switch
                    checked={systemSettings.documentUploadEnabled}
                    onCheckedChange={(checked) => setSystemSettings(p => ({ ...p, documentUploadEnabled: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Enable Care Plans</Label>
                    <p className="text-sm text-muted-foreground">Allow patients to view and create care plans</p>
                  </div>
                  <Switch
                    checked={systemSettings.carePlansEnabled}
                    onCheckedChange={(checked) => setSystemSettings(p => ({ ...p, carePlansEnabled: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Enable Messaging</Label>
                    <p className="text-sm text-muted-foreground">Patients can message healthcare providers</p>
                  </div>
                  <Switch
                    checked={systemSettings.patientMessagingEnabled}
                    onCheckedChange={(checked) => setSystemSettings(p => ({ ...p, patientMessagingEnabled: checked }))}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>System Information</CardTitle>
              <CardDescription>Current system status and statistics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Last Backup</span>
                  <span className="text-sm font-medium">{MOCK_SYSTEM_STATUS.lastBackup}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Uptime</span>
                  <span className="text-sm font-medium">{MOCK_SYSTEM_STATUS.uptime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Active Users</span>
                  <span className="text-sm font-medium">{MOCK_SYSTEM_STATUS.activeUsers}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Total Patients</span>
                  <span className="text-sm font-medium">{MOCK_SYSTEM_STATUS.totalPatients}</span>
                </div>
              </div>
              <Separator />
              <Alert>
                <InformationFillIcon className="h-4 w-4" />
                <AlertDescription>
                  System is running optimally. All services are operational.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add User Modal */}
      <Dialog open={addUserModal} onOpenChange={setAddUserModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
            <DialogDescription>Create a new admin user account</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddUser} className="space-y-4">
            <div>
              <Label htmlFor="newUserName">Name</Label>
              <Input id="newUserName" required />
            </div>
            <div>
              <Label htmlFor="newUserEmail">Email</Label>
              <Input id="newUserEmail" type="email" required />
            </div>
            <div>
              <Label htmlFor="newUserRole">Role</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="staff">Staff</SelectItem>
                  <SelectItem value="super-admin">Super Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <DialogFooter>
              <Button type="submit">Add User</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit User Modal */}
      <Dialog open={editUserModal} onOpenChange={setEditUserModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>Update user information and permissions</DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <form onSubmit={handleEditUser} className="space-y-4">
              <div>
                <Label htmlFor="editUserName">Name</Label>
                <Input id="editUserName" defaultValue={selectedUser.name} required />
              </div>
              <div>
                <Label htmlFor="editUserEmail">Email</Label>
                <Input id="editUserEmail" type="email" defaultValue={selectedUser.email} required />
              </div>
              <div>
                <Label htmlFor="editUserRole">Role</Label>
                <Select defaultValue={selectedUser.role}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="staff">Staff</SelectItem>
                    <SelectItem value="super-admin">Super Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <DialogFooter>
                <Button type="submit">Update User</Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete User Modal */}
      <Dialog open={deleteUserModal} onOpenChange={setDeleteUserModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete User</DialogTitle>
            <DialogDescription>Are you sure you want to delete this user? This action cannot be undone.</DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4">
              <p>You are about to delete <strong>{selectedUser.name}</strong> ({selectedUser.email})</p>
              <DialogFooter>
                <Button variant="destructive" onClick={handleDeleteUser}>Delete User</Button>
                <Button variant="outline" onClick={() => setDeleteUserModal(false)}>Cancel</Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Backup Modal */}
      <Dialog open={backupModal} onOpenChange={setBackupModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create System Backup</DialogTitle>
            <DialogDescription>Create a manual backup of the system data</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <p>This will create a complete backup of all system data including:</p>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Patient records and data</li>
              <li>Admin user accounts</li>
              <li>System settings and configurations</li>
              <li>Message history and documents</li>
            </ul>
            <DialogFooter>
              <Button onClick={handleBackup}>Create Backup</Button>
              <Button variant="outline" onClick={() => setBackupModal(false)}>Cancel</Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>

      {/* Maintenance Mode Modal */}
      <Dialog open={maintenanceModal} onOpenChange={setMaintenanceMode}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Maintenance Mode</DialogTitle>
            <DialogDescription>Enable maintenance mode to temporarily disable portal access</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Alert>
              <ErrorWarningFillIcon className="h-4 w-4" />
              <AlertDescription>
                When maintenance mode is enabled, patients will see a maintenance page and cannot access the portal.
              </AlertDescription>
            </Alert>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Enable Maintenance Mode</Label>
                <p className="text-sm text-muted-foreground">Temporarily disable portal access</p>
              </div>
              <Switch
                checked={systemSettings.maintenanceMode}
                onCheckedChange={(checked) => setSystemSettings(p => ({ ...p, maintenanceMode: checked }))}
              />
            </div>
            <DialogFooter>
              <Button onClick={handleMaintenanceMode}>Save Changes</Button>
              <Button variant="outline" onClick={() => setMaintenanceMode(false)}>Cancel</Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>

      {/* System Status Modal */}
      <SystemStatusModal 
        open={systemStatusModal} 
        onOpenChange={setSystemStatusModal} 
      />
    </div>
  )
} 