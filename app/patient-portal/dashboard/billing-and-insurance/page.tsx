"use client"

import { useState } from "react"
import { SectionWrapper } from "@/components/section-wrapper"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CreditCard, DollarSign } from "lucide-react"
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
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { useSearchParams } from "next/navigation"
import React from "react"

const MOCK_BILLING = {
  balance: 0.0,
  history: [
    { id: 1, date: "2024-05-01", amount: 120.0, status: "Paid" },
    { id: 2, date: "2024-03-15", amount: 80.0, status: "Paid" },
  ],
  insurance: {
    provider: "Aetna",
    status: "Active",
    memberId: "AET123456789",
    group: "HCC-2024",
  },
}

export default function DashboardBillingAndInsurance() {
  const router = useRouter()
  const searchParams = useSearchParams();
  const [amount, setAmount] = useState("")
  const [paying, setPaying] = useState(false)
  const [success, setSuccess] = useState(false)
  const [insurance, setInsurance] = useState(MOCK_BILLING.insurance)
  const [modalOpen, setModalOpen] = useState(false)
  React.useEffect(() => {
    if (searchParams?.get("update-insurance") === "1") {
      setModalOpen(true);
    }
  }, [searchParams])
  const [form, setForm] = useState({
    provider: insurance.provider,
    memberId: insurance.memberId,
    group: insurance.group,
    status: insurance.status,
  })
  const [formError, setFormError] = useState("")
  const [payAmount, setPayAmount] = useState("")
  const [payOption, setPayOption] = useState("full")
  const [payMethod, setPayMethod] = useState("card1")
  const [payNote, setPayNote] = useState("")
  const [payModalOpen, setPayModalOpen] = useState(false)
  const [paySuccess, setPaySuccess] = useState(false)
  const fullBalance = insurance && MOCK_BILLING.balance
  // Payment methods state (mocked)
  const [methods, setMethods] = useState([
    { id: "card1", label: "Visa **** 1234", type: "card", last4: "1234", exp: "12/26", default: true },
    { id: "card2", label: "Mastercard **** 5678", type: "card", last4: "5678", exp: "09/25", default: false },
  ])
  const [manageModalOpen, setManageModalOpen] = useState(false)
  const [addModalOpen, setAddModalOpen] = useState(false)
  const [editMethod, setEditMethod] = useState<any>(null)
  const [removeMethod, setRemoveMethod] = useState<any>(null)
  const [newMethod, setNewMethod] = useState({ type: "card", label: "", last4: "", exp: "", default: false })
  const [methodError, setMethodError] = useState("")
  function handlePayOptionChange(val: string) {
    setPayOption(val)
    if (val === "full") setPayAmount(String(fullBalance))
    else setPayAmount("")
  }
  function handlePaySubmit(e: React.FormEvent) {
    e.preventDefault()
    setPayModalOpen(true)
  }
  function handlePayConfirm() {
    setPaySuccess(true)
    setTimeout(() => {
      setPayModalOpen(false)
      setPaySuccess(false)
      setPayAmount("")
      setPayOption("full")
      setPayNote("")
    }, 1500)
  }

  function handleInsuranceChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }
  function handleInsuranceSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!form.provider.trim() || !form.memberId.trim() || !form.group.trim() || !form.status.trim()) {
      setFormError("All fields are required.")
      return
    }
    setInsurance({ ...form })
    setModalOpen(false)
    setFormError("")
  }

  function handleSetDefault(id: string) {
    setMethods(methods => methods.map(m => ({ ...m, default: m.id === id })))
  }
  function handleRemoveMethod(id: string) {
    setMethods(methods => methods.filter(m => m.id !== id))
    setRemoveMethod(null)
  }
  function handleAddMethod(e: React.FormEvent) {
    e.preventDefault()
    if (!newMethod.label || !newMethod.last4 || !newMethod.exp) {
      setMethodError("All fields are required.")
      return
    }
    setMethods(methods => [
      ...methods.map(m => ({ ...m, default: false })),
      { ...newMethod, id: `card${Date.now()}`, default: true },
    ])
    setAddModalOpen(false)
    setNewMethod({ type: "card", label: "", last4: "", exp: "", default: false })
    setMethodError("")
  }
  function handleEditMethod(e: React.FormEvent) {
    e.preventDefault()
    if (!editMethod.label || !editMethod.last4 || !editMethod.exp) {
      setMethodError("All fields are required.")
      return
    }
    setMethods(methods => methods.map(m => m.id === editMethod.id ? { ...editMethod } : m))
    setEditMethod(null)
    setMethodError("")
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
        <div className="max-w-2xl mx-auto">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <DollarSign className="h-5 w-5 text-primary" /> Billing & Insurance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Outstanding Balance</span>
                  <span className="text-lg font-bold text-green-600">${MOCK_BILLING.balance.toFixed(2)}</span>
                </div>
                <Button variant="default" size="sm" className="w-full mb-2" disabled={MOCK_BILLING.balance === 0}>
                  Pay Now
                </Button>
                <div className="text-xs text-muted-foreground">All accounts current</div>
              </div>
              <div className="mb-6">
                <div className="font-medium mb-2">Payment History</div>
                <div className="space-y-2">
                  {MOCK_BILLING.history.map((h) => (
                    <div key={h.id} className="flex items-center justify-between text-xs bg-muted/40 rounded p-2">
                      <span>{h.date}</span>
                      <span>${h.amount.toFixed(2)}</span>
                      <span className="text-green-700 font-medium">{h.status}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mb-6">
                <div className="font-medium mb-2 flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-primary" /> Insurance Information
                </div>
                <div className="text-sm mb-1">Provider: <span className="font-semibold">{insurance.provider}</span></div>
                <div className="text-sm mb-1">Status: <span className="font-semibold text-green-700">{insurance.status}</span></div>
                <div className="text-xs text-muted-foreground mb-1">Member ID: {insurance.memberId}</div>
                <div className="text-xs text-muted-foreground mb-2">Group: {insurance.group}</div>
                <Dialog open={modalOpen} onOpenChange={setModalOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">Update Insurance</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Update Insurance</DialogTitle>
                      <DialogDescription>Update your insurance details below.</DialogDescription>
                    </DialogHeader>
                    <form className="space-y-4" onSubmit={handleInsuranceSubmit}>
                      <div>
                        <label className="block text-xs font-medium mb-1">Provider</label>
                        <Input name="provider" value={form.provider} onChange={handleInsuranceChange} required />
                      </div>
                      <div>
                        <label className="block text-xs font-medium mb-1">Member ID</label>
                        <Input name="memberId" value={form.memberId} onChange={handleInsuranceChange} required />
                      </div>
                      <div>
                        <label className="block text-xs font-medium mb-1">Group</label>
                        <Input name="group" value={form.group} onChange={handleInsuranceChange} required />
                      </div>
                      <div>
                        <label className="block text-xs font-medium mb-1">Status</label>
                        <Input name="status" value={form.status} onChange={handleInsuranceChange} required />
                      </div>
                      {formError && <div className="text-xs text-red-600">{formError}</div>}
                      <DialogFooter>
                        <Button type="submit" variant="default" className="w-full">Save</Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>

          {/* Make a Payment Card */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Make a Payment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-2">
                <div className="text-xs mb-2">Outstanding Balance: <span className="font-semibold">${fullBalance.toFixed(2)}</span></div>
                <form className="space-y-4" onSubmit={handlePaySubmit}>
                  <div>
                    <div className="text-xs font-medium mb-1">Select Amount</div>
                    <div className="flex gap-2 mb-2">
                      <Button type="button" variant={payOption === "full" ? "default" : "outline"} size="sm" onClick={() => handlePayOptionChange("full")}>Pay Full Balance (${fullBalance.toFixed(2)})</Button>
                      <Button type="button" variant={payOption === "other" ? "default" : "outline"} size="sm" onClick={() => handlePayOptionChange("other")}>Other Amount</Button>
                    </div>
                    {payOption === "other" && (
                      <Input
                        type="number"
                        min="1"
                        step="0.01"
                        placeholder="Amount (USD)"
                        value={payAmount}
                        onChange={e => setPayAmount(e.target.value)}
                        className="w-40"
                        required
                      />
                    )}
                  </div>
                  <div>
                    <div className="text-xs font-medium mb-1 flex items-center gap-2">Payment Method
                      <Button type="button" size="sm" variant="ghost" className="px-2 py-0 h-6 text-xs underline" onClick={() => setManageModalOpen(true)}>
                        Manage
                      </Button>
                    </div>
                    <div className="flex flex-col gap-2">
                      {methods.map(method => (
                        <label key={method.id} className="flex items-center gap-2 text-sm">
                          <input
                            type="radio"
                            name="payMethod"
                            value={method.id}
                            checked={payMethod === method.id}
                            onChange={() => setPayMethod(method.id)}
                            className="accent-primary"
                          />
                          {method.label} <span className="text-xs text-muted-foreground">(exp {method.exp})</span>
                          {method.default && <span className="ml-1 text-xs text-green-700 font-semibold">Default</span>}
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-medium mb-1">Note (optional)</div>
                    <Input
                      type="text"
                      placeholder="Add a note for your provider or billing team"
                      value={payNote}
                      onChange={e => setPayNote(e.target.value)}
                    />
                  </div>
                  <Button type="submit" variant="default" disabled={payOption === "other" && (!payAmount || Number(payAmount) <= 0)}>
                    Pay Now
                  </Button>
                </form>
                <Dialog open={payModalOpen} onOpenChange={setPayModalOpen}>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Confirm Payment</DialogTitle>
                      <DialogDescription>
                        You are about to pay <b>${payOption === "full" ? fullBalance.toFixed(2) : payAmount}</b> with <b>{methods.find(m => m.id === payMethod)?.label}</b>.
                      </DialogDescription>
                    </DialogHeader>
                    {paySuccess ? (
                      <div className="text-green-700 text-center py-8">Payment successful! A receipt has been sent to your email.</div>
                    ) : (
                      <DialogFooter>
                        <Button type="button" variant="default" className="w-full" onClick={handlePayConfirm}>Confirm Payment</Button>
                        <Button type="button" variant="ghost" className="w-full" onClick={() => setPayModalOpen(false)}>Cancel</Button>
                      </DialogFooter>
                    )}
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>

          {/* Manage Payment Methods Modal */}
          <Dialog open={manageModalOpen} onOpenChange={setManageModalOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Manage Payment Methods</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                {methods.length === 0 && <div className="text-muted-foreground text-sm">No payment methods saved.</div>}
                {methods.map(method => (
                  <div key={method.id} className="flex items-center justify-between border rounded p-2">
                    <div>
                      <div className="font-medium text-sm">{method.label}</div>
                      <div className="text-xs text-muted-foreground">exp {method.exp}</div>
                    </div>
                    <div className="flex gap-2">
                      {!method.default && <Button size="sm" variant="outline" onClick={() => handleSetDefault(method.id)}>Set Default</Button>}
                      <Button size="sm" variant="outline" onClick={() => setEditMethod({ ...method })}>Edit</Button>
                      <Button size="sm" variant="destructive" onClick={() => setRemoveMethod(method)}>Remove</Button>
                    </div>
                  </div>
                ))}
                <Button size="sm" variant="default" className="w-full" onClick={() => setAddModalOpen(true)}>Add New Payment Method</Button>
              </div>
            </DialogContent>
          </Dialog>

          {/* Add Payment Method Modal */}
          <Dialog open={addModalOpen} onOpenChange={setAddModalOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Payment Method</DialogTitle>
              </DialogHeader>
              <form className="space-y-3" onSubmit={handleAddMethod}>
                <Input
                  placeholder="Card Label (e.g., Visa **** 1234)"
                  value={newMethod.label}
                  onChange={e => setNewMethod(m => ({ ...m, label: e.target.value }))}
                  required
                />
                <Input
                  placeholder="Last 4 Digits"
                  value={newMethod.last4}
                  onChange={e => setNewMethod(m => ({ ...m, last4: e.target.value }))}
                  maxLength={4}
                  required
                />
                <Input
                  placeholder="Expiration (MM/YY)"
                  value={newMethod.exp}
                  onChange={e => setNewMethod(m => ({ ...m, exp: e.target.value }))}
                  required
                />
                {methodError && <div className="text-xs text-red-600">{methodError}</div>}
                <DialogFooter>
                  <Button type="submit" className="w-full">Add</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>

          {/* Edit Payment Method Modal */}
          <Dialog open={!!editMethod} onOpenChange={v => { if (!v) setEditMethod(null) }}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Payment Method</DialogTitle>
              </DialogHeader>
              {editMethod && (
                <form className="space-y-3" onSubmit={handleEditMethod}>
                  <Input
                    placeholder="Card Label"
                    value={editMethod.label}
                    onChange={e => setEditMethod((m: any) => ({ ...m, label: e.target.value }))}
                    required
                  />
                  <Input
                    placeholder="Last 4 Digits"
                    value={editMethod.last4}
                    onChange={e => setEditMethod((m: any) => ({ ...m, last4: e.target.value }))}
                    maxLength={4}
                    required
                  />
                  <Input
                    placeholder="Expiration (MM/YY)"
                    value={editMethod.exp}
                    onChange={e => setEditMethod((m: any) => ({ ...m, exp: e.target.value }))}
                    required
                  />
                  {methodError && <div className="text-xs text-red-600">{methodError}</div>}
                  <DialogFooter>
                    <Button type="submit" className="w-full">Save</Button>
                  </DialogFooter>
                </form>
              )}
            </DialogContent>
          </Dialog>

          {/* Remove Payment Method Confirmation */}
          <Dialog open={!!removeMethod} onOpenChange={v => { if (!v) setRemoveMethod(null) }}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Remove Payment Method</DialogTitle>
              </DialogHeader>
              {removeMethod && (
                <div className="space-y-4">
                  <div>Are you sure you want to remove <b>{removeMethod.label}</b>?</div>
                  <DialogFooter>
                    <Button type="button" variant="destructive" className="w-full" onClick={() => handleRemoveMethod(removeMethod.id)}>Remove</Button>
                    <Button type="button" variant="ghost" className="w-full" onClick={() => setRemoveMethod(null)}>Cancel</Button>
                  </DialogFooter>
                </div>
              )}
            </DialogContent>
          </Dialog>
          <Card className="bg-blue-50 border-blue-200 dark:bg-[hsl(0,0%,14%)] dark:border-[hsl(0,0%,20%)] mt-4">
            <CardContent className="py-6 flex flex-col items-center text-center">
              <div className="text-lg font-semibold mb-2 dark:text-foreground">Want to learn more about billing, insurance, and payment options?</div>
              <div className="text-sm text-muted-foreground mb-4 dark:text-muted-foreground">Visit our comprehensive Billing & Insurance information page for FAQs, payment options, and more.</div>
              <Button asChild variant="default">
                <a href="/billing-and-insurance">Learn More</a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </SectionWrapper>
    </>
  )
} 