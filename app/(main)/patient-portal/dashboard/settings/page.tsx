import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Settings | Patient Portal | Houston Cardiology Consultants",
  description: "Manage your account settings, preferences, and notifications in the Houston Cardiology Consultants Patient Portal.",
}

"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { SectionWrapper } from "@/components/section-wrapper"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import ArrowLeftFillIcon from 'remixicon-react/ArrowLeftFillIcon';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog"
import { useEffect } from "react"

export default function DashboardSettings() {
  const router = useRouter()
  const [account, setAccount] = useState({ name: "Jane Doe", email: "jane@email.com", phone: "555-123-4567", password: "" })
  const [notifications, setNotifications] = useState({ email: true, sms: false })
  const [security, setSecurity] = useState({ twofa: false })
  const [saved, setSaved] = useState({ account: false, notifications: false, security: false })
  const [passwordModalOpen, setPasswordModalOpen] = useState(false)
  const [passwordForm, setPasswordForm] = useState({
    current: "",
    new: "",
    confirm: "",
  })
  const [passwordError, setPasswordError] = useState("")
  const [passwordSuccess, setPasswordSuccess] = useState(false)
  const [twoFAModalOpen, setTwoFAModalOpen] = useState(false)
  const [twoFASecret, setTwoFASecret] = useState("")
  const [twoFACode, setTwoFACode] = useState("")
  const [twoFAError, setTwoFAError] = useState("")
  const [twoFASuccess, setTwoFASuccess] = useState(false)

  // Simulate generating a secret and a TOTP code (in real app, backend would do this)
  function generateFakeSecret() {
    // Simple random string for demo
    return Math.random().toString(36).slice(2, 10).toUpperCase()
  }
  function getFakeTOTP(secret: string) {
    // For demo, just use last 6 digits of secret reversed
    return secret.split("").reverse().join("").slice(0, 6)
  }

  useEffect(() => {
    if (twoFAModalOpen) {
      const secret = generateFakeSecret()
      setTwoFASecret(secret)
      setTwoFACode("")
      setTwoFAError("")
      setTwoFASuccess(false)
    }
  }, [twoFAModalOpen])

  function handleAccountChange(e: React.ChangeEvent<HTMLInputElement>) {
    setAccount({ ...account, [e.target.name]: e.target.value })
  }
  function handleNotificationsChange(e: React.ChangeEvent<HTMLInputElement>) {
    setNotifications({ ...notifications, [e.target.name]: e.target.checked })
  }
  function handleSecurityChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSecurity({ ...security, [e.target.name]: e.target.checked })
  }
  function handleSave(section: keyof typeof saved) {
    setSaved(s => ({ ...s, [section]: true }))
    setTimeout(() => setSaved(s => ({ ...s, [section]: false })), 1500)
  }
  function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value })
  }
  function handlePasswordSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setPasswordError("")
    setPasswordSuccess(false)
    if (!passwordForm.current || !passwordForm.new || !passwordForm.confirm) {
      setPasswordError("All fields are required.")
      return
    }
    if (passwordForm.new !== passwordForm.confirm) {
      setPasswordError("New passwords do not match.")
      return
    }
    if (passwordForm.new.length < 8) {
      setPasswordError("New password must be at least 8 characters.")
      return
    }
    // Simulate success
    setPasswordSuccess(true)
    setTimeout(() => {
      setPasswordModalOpen(false)
      setPasswordForm({ current: "", new: "", confirm: "" })
      setPasswordSuccess(false)
    }, 1200)
  }

  function handleTwoFAToggle(v: boolean) {
    if (v) {
      setTwoFAModalOpen(true)
    } else {
      setSecurity(s => ({ ...s, twofa: false }))
    }
  }

  function handleTwoFAVerify(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setTwoFAError("")
    if (twoFACode !== getFakeTOTP(twoFASecret)) {
      setTwoFAError("Invalid code. Please try again.")
      return
    }
    setTwoFASuccess(true)
    setTimeout(() => {
      setSecurity(s => ({ ...s, twofa: true }))
      setTwoFAModalOpen(false)
    }, 1000)
  }

  function handleTwoFACancel() {
    setTwoFAModalOpen(false)
    setSecurity(s => ({ ...s, twofa: false }))
  }

  return (
    <>
      <div className="px-4 md:px-8 lg:px-8 xl:px-8 2xl:px-8 max-w-7xl mx-auto pt-2">
        <Button variant="outline" onClick={() => router.back()} className="mb-2">
          <ArrowLeftFillIcon className="mr-2 h-4 w-4" />
          Back
        </Button>
      </div>
      <SectionWrapper className="pt-4 md:pt-0 pb-10">
        <div className="max-w-2xl mx-auto space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Account Details</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={e => { e.preventDefault(); handleSave("account") }}>
                <div>
                  <label className="block text-xs font-medium mb-1">Name</label>
                  <Input name="name" value={account.name} onChange={handleAccountChange} required />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1">Email</label>
                  <Input name="email" type="email" value={account.email} onChange={handleAccountChange} required />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1">Phone</label>
                  <Input name="phone" value={account.phone} onChange={handleAccountChange} required />
                </div>
                <div>
                  <Dialog open={passwordModalOpen} onOpenChange={setPasswordModalOpen}>
                    <DialogTrigger asChild>
                      <Button type="button" variant="outline" className="w-full">Change Password</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Change Password</DialogTitle>
                        <DialogDescription>Enter your current password and choose a new password below.</DialogDescription>
                      </DialogHeader>
                      <form className="space-y-4" onSubmit={handlePasswordSubmit}>
                        <div>
                          <label className="block text-xs font-medium mb-1">Current Password</label>
                          <Input name="current" type="password" value={passwordForm.current} onChange={handlePasswordChange} required autoComplete="current-password" />
                        </div>
                        <div>
                          <label className="block text-xs font-medium mb-1">New Password</label>
                          <Input name="new" type="password" value={passwordForm.new} onChange={handlePasswordChange} required autoComplete="new-password" />
                        </div>
                        <div>
                          <label className="block text-xs font-medium mb-1">Confirm New Password</label>
                          <Input name="confirm" type="password" value={passwordForm.confirm} onChange={handlePasswordChange} required autoComplete="new-password" />
                        </div>
                        {passwordError && <div className="text-xs text-red-600">{passwordError}</div>}
                        {passwordSuccess && <div className="text-xs text-green-700">Password changed successfully!</div>}
                        <DialogFooter>
                          <Button type="submit" variant="default" className="w-full">Save</Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
                <Button type="submit" className="w-full mt-2">Save Changes</Button>
                {saved.account && <div className="text-green-700 text-xs mt-2">Account details saved!</div>}
              </form>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Security</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={e => { e.preventDefault(); handleSave("security") }}>
                <div className="flex items-center justify-between">
                  <label className="text-sm">Two-Factor Authentication (2FA)</label>
                  <Switch name="twofa" checked={security.twofa} onCheckedChange={handleTwoFAToggle} />
                </div>
                <Dialog open={twoFAModalOpen} onOpenChange={setTwoFAModalOpen}>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Set up Two-Factor Authentication</DialogTitle>
                      <DialogDescription>
                        Scan the QR code below with your authenticator app (e.g., Google Authenticator, Authy), or enter the secret manually. Then enter the 6-digit code from your app to verify.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col items-center gap-3 my-4">
                      {/* Simulated QR code (just a placeholder box) */}
                      <div className="w-32 h-32 bg-muted flex items-center justify-center rounded mb-2 border text-xs text-muted-foreground">QR CODE</div>
                      <div className="text-xs text-muted-foreground">Secret: <span className="font-mono select-all">{twoFASecret}</span></div>
                    </div>
                    <form className="space-y-4" onSubmit={handleTwoFAVerify}>
                      <div>
                        <label className="block text-xs font-medium mb-1">6-digit code</label>
                        <Input
                          name="code"
                          value={twoFACode}
                          onChange={e => setTwoFACode(e.target.value)}
                          maxLength={6}
                          inputMode="numeric"
                          autoFocus
                          required
                        />
                      </div>
                      {twoFAError && <div className="text-xs text-red-600">{twoFAError}</div>}
                      {twoFASuccess && <div className="text-xs text-green-700">2FA enabled!</div>}
                      <DialogFooter>
                        <Button type="submit" variant="default" className="w-full">Verify</Button>
                        <Button type="button" variant="outline" className="w-full" onClick={handleTwoFACancel}>Cancel</Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
                <Button type="submit" className="w-full mt-2">Save Security Settings</Button>
                {saved.security && <div className="text-green-700 text-xs mt-2">Security settings saved!</div>}
              </form>
            </CardContent>
          </Card>
        </div>
      </SectionWrapper>
    </>
  )
} 