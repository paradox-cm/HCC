"use client"

import { SectionWrapper } from "@/components/section-wrapper"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import HeartPulseFillIcon from 'remixicon-react/HeartPulseFillIcon';
import CalendarFillIcon from 'remixicon-react/CalendarFillIcon';
import CapsuleFillIcon from 'remixicon-react/CapsuleFillIcon';
import MailFillIcon from 'remixicon-react/MailFillIcon';
import PhoneFillIcon from 'remixicon-react/PhoneFillIcon';
import ArrowLeftFillIcon from 'remixicon-react/ArrowLeftFillIcon';
import DownloadFillIcon from 'remixicon-react/DownloadFillIcon';
import PrinterFillIcon from 'remixicon-react/PrinterFillIcon';
import PlusFillIcon from 'remixicon-react/PlusFillIcon';
import Trash2FillIcon from 'remixicon-react/Trash2FillIcon';
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"

export default function CarePlanPageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [newCarePlan, setNewCarePlan] = useState({
    summary: "",
    goals: [""],
    medications: [{ name: "", dosage: "", frequency: "" }],
    appointments: [{ type: "", doctor: "", date: "", time: "" }]
  });

  // Check for URL parameter to open create modal
  useEffect(() => {
    if (searchParams?.get("create") === "1") {
      setCreateModalOpen(true);
    }
  }, [searchParams]);

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

  const handleCreateCarePlan = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would submit to the backend
    console.log("Creating care plan:", newCarePlan);
    setCreateModalOpen(false);
    setNewCarePlan({
      summary: "",
      goals: [""],
      medications: [{ name: "", dosage: "", frequency: "" }],
      appointments: [{ type: "", doctor: "", date: "", time: "" }]
    });
  };

  const addGoal = () => {
    setNewCarePlan(p => ({ ...p, goals: [...p.goals, ""] }));
  };

  const removeGoal = (index: number) => {
    setNewCarePlan(p => ({ ...p, goals: p.goals.filter((_, i) => i !== index) }));
  };

  const updateGoal = (index: number, value: string) => {
    setNewCarePlan(p => ({ ...p, goals: p.goals.map((g, i) => i === index ? value : g) }));
  };

  const addMedication = () => {
    setNewCarePlan(p => ({ ...p, medications: [...p.medications, { name: "", dosage: "", frequency: "" }] }));
  };

  const removeMedication = (index: number) => {
    setNewCarePlan(p => ({ ...p, medications: p.medications.filter((_, i) => i !== index) }));
  };

  const updateMedication = (index: number, field: string, value: string) => {
    setNewCarePlan(p => ({
      ...p,
      medications: p.medications.map((m, i) => i === index ? { ...m, [field]: value } : m)
    }));
  };

  const addAppointment = () => {
    setNewCarePlan(p => ({ ...p, appointments: [...p.appointments, { type: "", doctor: "", date: "", time: "" }] }));
  };

  const removeAppointment = (index: number) => {
    setNewCarePlan(p => ({ ...p, appointments: p.appointments.filter((_, i) => i !== index) }));
  };

  const updateAppointment = (index: number, field: string, value: string) => {
    setNewCarePlan(p => ({
      ...p,
      appointments: p.appointments.map((a, i) => i === index ? { ...a, [field]: value } : a)
    }));
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
              <Button variant="default" onClick={() => setCreateModalOpen(true)} className="w-full">
                <PlusFillIcon className="h-4 w-4 mr-2" /> Create New Care Plan
              </Button>
            </div>
          </CardContent>
        </Card>
      </SectionWrapper>

      {/* Create Care Plan Modal */}
      <Dialog open={createModalOpen} onOpenChange={setCreateModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Care Plan</DialogTitle>
          </DialogHeader>
          <form className="space-y-6" onSubmit={handleCreateCarePlan}>
            <div>
              <label className="block text-sm font-medium mb-2">Summary</label>
              <Textarea 
                value={newCarePlan.summary} 
                onChange={e => setNewCarePlan(p => ({ ...p, summary: e.target.value }))} 
                placeholder="Brief description of your care plan..."
                rows={3}
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium">Goals</label>
                <Button type="button" variant="outline" size="sm" onClick={addGoal}>
                  <PlusFillIcon className="h-4 w-4 mr-1" /> Add Goal
                </Button>
              </div>
              <div className="space-y-2">
                {newCarePlan.goals.map((goal, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={goal}
                      onChange={e => updateGoal(index, e.target.value)}
                      placeholder="Enter care goal..."
                    />
                    {newCarePlan.goals.length > 1 && (
                      <Button type="button" variant="outline" size="sm" onClick={() => removeGoal(index)}>
                        <Trash2FillIcon className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium">Medications</label>
                <Button type="button" variant="outline" size="sm" onClick={addMedication}>
                  <PlusFillIcon className="h-4 w-4 mr-1" /> Add Medication
                </Button>
              </div>
              <div className="space-y-2">
                {newCarePlan.medications.map((med, index) => (
                  <div key={index} className="grid grid-cols-3 gap-2">
                    <Input
                      value={med.name}
                      onChange={e => updateMedication(index, "name", e.target.value)}
                      placeholder="Medication name"
                    />
                    <Input
                      value={med.dosage}
                      onChange={e => updateMedication(index, "dosage", e.target.value)}
                      placeholder="Dosage"
                    />
                    <div className="flex gap-2">
                      <Input
                        value={med.frequency}
                        onChange={e => updateMedication(index, "frequency", e.target.value)}
                        placeholder="Frequency"
                      />
                      <Button type="button" variant="outline" size="sm" onClick={() => removeMedication(index)}>
                        <Trash2FillIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium">Appointments</label>
                <Button type="button" variant="outline" size="sm" onClick={addAppointment}>
                  <PlusFillIcon className="h-4 w-4 mr-1" /> Add Appointment
                </Button>
              </div>
              <div className="space-y-2">
                {newCarePlan.appointments.map((apt, index) => (
                  <div key={index} className="grid grid-cols-4 gap-2">
                    <Input
                      value={apt.type}
                      onChange={e => updateAppointment(index, "type", e.target.value)}
                      placeholder="Appointment type"
                    />
                    <Input
                      value={apt.doctor}
                      onChange={e => updateAppointment(index, "doctor", e.target.value)}
                      placeholder="Doctor"
                    />
                    <Input
                      type="date"
                      value={apt.date}
                      onChange={e => updateAppointment(index, "date", e.target.value)}
                    />
                    <div className="flex gap-2">
                      <Input
                        type="time"
                        value={apt.time}
                        onChange={e => updateAppointment(index, "time", e.target.value)}
                      />
                      <Button type="button" variant="outline" size="sm" onClick={() => removeAppointment(index)}>
                        <Trash2FillIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <DialogFooter>
              <Button type="submit" className="w-full">Create Care Plan</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
} 