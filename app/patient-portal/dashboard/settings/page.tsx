"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { SectionWrapper } from "@/components/section-wrapper"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft } from "lucide-react"

export default function DashboardSettings() {
  const router = useRouter()
  const [account, setAccount] = useState({ name: "Jane Doe", email: "jane@email.com", phone: "555-123-4567", password: "" })
  const [notifications, setNotifications] = useState({ email: true, sms: false })
  const [security, setSecurity] = useState({ twofa: false })
  const [saved, setSaved] = useState({ account: false, notifications: false, security: false })

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

  return (
    <>
      <div className="px-4 md:px-8 lg:px-8 xl:px-8 2xl:px-8 max-w-7xl mx-auto pt-2">
        <Button variant="outline" onClick={() => router.back()} className="mb-2">
          <ArrowLeft className="mr-2 h-4 w-4" />
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
                  <label className="block text-xs font-medium mb-1">Password</label>
                  <Input name="password" type="password" value={account.password} onChange={handleAccountChange} placeholder="Leave blank to keep current password" autoComplete="new-password" />
                </div>
                <Button type="submit" className="w-full mt-2">Save Changes</Button>
                {saved.account && <div className="text-green-700 text-xs mt-2">Account details saved!</div>}
              </form>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={e => { e.preventDefault(); handleSave("notifications") }}>
                <div className="flex items-center justify-between">
                  <label className="text-sm">Email Notifications</label>
                  <Switch name="email" checked={notifications.email} onCheckedChange={v => setNotifications(n => ({ ...n, email: v }))} />
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm">SMS Notifications</label>
                  <Switch name="sms" checked={notifications.sms} onCheckedChange={v => setNotifications(n => ({ ...n, sms: v }))} />
                </div>
                <Button type="submit" className="w-full mt-2">Save Preferences</Button>
                {saved.notifications && <div className="text-green-700 text-xs mt-2">Preferences saved!</div>}
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
                  <Switch name="twofa" checked={security.twofa} onCheckedChange={v => setSecurity(s => ({ ...s, twofa: v }))} />
                </div>
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