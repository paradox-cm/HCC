import "../globals.css";
import type { Metadata } from "next"
import AdminLayoutClient from "./AdminLayoutClient"
import { DataSyncProvider } from "@/contexts/DataSyncContext"
import { MessageProvider } from "@/contexts/MessageContext"
import { AppointmentProvider } from "@/contexts/AppointmentContext"
import { PrescriptionProvider } from "@/contexts/PrescriptionContext"
import { DocumentProvider } from "@/contexts/DocumentContext"
import { CarePlanProvider } from "@/contexts/CarePlanContext"

export const metadata: Metadata = {
  title: "HCC Admin Portal",
  description: "Admin portal for Houston Cardiology Consultants.",
  icons: {
    icon: "/images/hcc-logo.ico",
  },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <DataSyncProvider>
      <MessageProvider>
        <AppointmentProvider>
          <PrescriptionProvider>
            <DocumentProvider>
              <CarePlanProvider>
                <AdminLayoutClient>{children}</AdminLayoutClient>
              </CarePlanProvider>
            </DocumentProvider>
          </PrescriptionProvider>
        </AppointmentProvider>
      </MessageProvider>
    </DataSyncProvider>
  )
} 