import "../globals.css";
import type { Metadata } from "next"
import AdminLayoutClient from "./AdminLayoutClient"

export const metadata: Metadata = {
  title: "HCC Admin Portal",
  description: "Admin portal for Houston Cardiology Consultants.",
  icons: {
    icon: "/images/hcc-logo.ico",
  },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminLayoutClient>{children}</AdminLayoutClient>
} 