"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function AdminRedirect() {
  const router = useRouter()
  useEffect(() => {
    // Check for authentication (localStorage or sessionStorage)
    const isAuthed =
      typeof window !== "undefined" &&
      (localStorage.getItem("hcc_admin_auth") === "true" ||
        sessionStorage.getItem("hcc_admin_auth") === "true")

    if (isAuthed) {
      router.replace("/admin/dashboard")
    } else {
      // For development/testing, allow direct access to billing
      if (typeof window !== "undefined" && window.location.pathname === "/admin/billing") {
        // Don't redirect if directly accessing billing page
        return
      }
      router.replace("/admin-login")
    }
  }, [router])
  return null
} 