"use client"

import { SectionWrapper } from "@/components/section-wrapper"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import HeartPulseFillIcon from 'remixicon-react/HeartPulseFillIcon';
import CalendarFillIcon from 'remixicon-react/CalendarFillIcon';
import CapsuleFillIcon from 'remixicon-react/CapsuleFillIcon';
import MailFillIcon from 'remixicon-react/MailFillIcon';
import PhoneFillIcon from 'remixicon-react/PhoneFillIcon';
import ArrowLeftFillIcon from 'remixicon-react/ArrowLeftFillIcon';
import DownloadFillIcon from 'remixicon-react/DownloadFillIcon';
import PrinterFillIcon from 'remixicon-react/PrinterFillIcon';
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function CarePlanPage() {
  const router = useRouter();
  const handlePrint = () => {
    window.print();
  };
  const handleDownload = () => {
    // For demo: download as plain text. In production, generate PDF or formatted doc.
    const text = `Care Plan\n\nSummary: You are currently on a preventive care plan focused on blood pressure and cholesterol management.\nGoals: ...\nMedications: ...\nAppointments: ...\nCare Team: ...`;
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Care-Plan.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  return (
    <>
      <div className="px-4 md:px-8 lg:px-8 xl:px-8 2xl:px-8 max-w-7xl mx-auto pt-2 mb-8">
        <Button variant="outline" onClick={() => router.back()}>
          <ArrowLeftFillIcon className="mr-2 h-4 w-4" />
          Back
        </Button>
      </div>
      <SectionWrapper className="pt-4 md:pt-0">
        <Card className="max-w-2xl mx-auto">
          <CardHeader className="flex items-center gap-2 pb-2">
            <HeartPulseFillIcon className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Your Care Plan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-2">Summary</h2>
              <p className="text-muted-foreground mb-4">
                You are currently on a preventive care plan focused on blood pressure and cholesterol management. Continue your medications and follow up as scheduled. Your care team is here to support you every step of the way.
              </p>
            </div>
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">Goals</h2>
              <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                <li>Maintain blood pressure below 130/80 mmHg</li>
                <li>Keep LDL cholesterol under 100 mg/dL</li>
                <li>Exercise at least 150 minutes per week</li>
                <li>Follow a heart-healthy diet</li>
                <li>Take medications as prescribed</li>
              </ul>
            </div>
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">Medications</h2>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <CapsuleFillIcon className="h-4 w-4 text-primary" />
                  <span className="font-medium">Metoprolol</span> 50mg – 1 tablet daily
                </li>
                <li className="flex items-center gap-2">
                  <CapsuleFillIcon className="h-4 w-4 text-primary" />
                  <span className="font-medium">Atorvastatin</span> 20mg – 1 tablet daily
                </li>
                <li className="flex items-center gap-2">
                  <CapsuleFillIcon className="h-4 w-4 text-primary" />
                  <span className="font-medium">Lisinopril</span> 10mg – 1 tablet daily
                </li>
              </ul>
            </div>
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">Upcoming Appointments</h2>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <CalendarFillIcon className="h-4 w-4 text-primary" />
                  <span>Follow-up with Dr. Asif Ali – July 25, 2025 at 10:00 AM</span>
                </li>
                <li className="flex items-center gap-2">
                  <CalendarFillIcon className="h-4 w-4 text-primary" />
                  <span>Lab work – July 20, 2025</span>
                </li>
              </ul>
            </div>
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">Your Care Team</h2>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <MailFillIcon className="h-4 w-4 text-primary" />
                  <a href="mailto:info@hcc.com" className="hover:underline">info@hcc.com</a>
                </li>
                <li className="flex items-center gap-2">
                  <PhoneFillIcon className="h-4 w-4 text-primary" />
                  <a href="tel:713-464-4140" className="hover:underline">713-464-4140</a>
                </li>
              </ul>
            </div>
            <div className="flex flex-col gap-3 mt-8 print:hidden">
              <Button variant="outline" onClick={handlePrint} className="w-full">
                <PrinterFillIcon className="h-4 w-4 mr-2" /> Print
              </Button>
              <Button variant="outline" onClick={handleDownload} className="w-full">
                <DownloadFillIcon className="h-4 w-4 mr-2" /> Download
              </Button>
            </div>
          </CardContent>
        </Card>
      </SectionWrapper>
    </>
  )
} 