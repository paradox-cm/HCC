"use client"

import { useState } from "react"
import { SectionWrapper } from "@/components/section-wrapper"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CreditCard, DollarSign } from "lucide-react"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

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
  const [amount, setAmount] = useState("")
  const [paying, setPaying] = useState(false)
  const [success, setSuccess] = useState(false)

  function handlePay(e: React.FormEvent) {
    e.preventDefault()
    setPaying(true)
    setTimeout(() => {
      setPaying(false)
      setSuccess(true)
      setAmount("")
      setTimeout(() => setSuccess(false), 2000)
    }, 1200)
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
                <div className="text-sm mb-1">Provider: <span className="font-semibold">{MOCK_BILLING.insurance.provider}</span></div>
                <div className="text-sm mb-1">Status: <span className="font-semibold text-green-700">{MOCK_BILLING.insurance.status}</span></div>
                <div className="text-xs text-muted-foreground mb-1">Member ID: {MOCK_BILLING.insurance.memberId}</div>
                <div className="text-xs text-muted-foreground mb-2">Group: {MOCK_BILLING.insurance.group}</div>
                <Button variant="outline" size="sm">Update Insurance</Button>
              </div>
              <div className="mb-2">
                <div className="font-medium mb-2">Make a Payment</div>
                <form className="flex gap-2 items-end" onSubmit={handlePay}>
                  <Input
                    type="number"
                    min="1"
                    step="0.01"
                    placeholder="Amount (USD)"
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                    className="max-w-[140px]"
                    required
                    disabled={paying}
                  />
                  <Button type="submit" size="sm" disabled={paying || !amount || Number(amount) <= 0}>
                    {paying ? "Processing..." : "Pay"}
                  </Button>
                </form>
                {success && <div className="text-green-700 text-xs mt-2">Payment successful!</div>}
              </div>
            </CardContent>
          </Card>
          <Card className="bg-blue-50 border-blue-200 mt-4">
            <CardContent className="py-6 flex flex-col items-center text-center">
              <div className="text-lg font-semibold mb-2">Want to learn more about billing, insurance, and payment options?</div>
              <div className="text-sm text-muted-foreground mb-4">Visit our comprehensive Billing & Insurance information page for FAQs, payment options, and more.</div>
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