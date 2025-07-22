"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import "../globals.css";
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Admin Login - HCC Portal",
  description: "Admin login for Houston Cardiology Consultants.",
  icons: {
    icon: "/images/hcc-logo.ico",
  },
}

export default function AdminLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")
    // Mock login: skip credential check, just set session and redirect
    if (rememberMe) {
      localStorage.setItem("hcc_admin_auth", "true")
    } else {
      sessionStorage.setItem("hcc_admin_auth", "true")
    }
    router.push("/admin/dashboard")
    setLoading(false)
  }

  function handleForgotPassword(e: React.MouseEvent) {
    e.preventDefault()
    alert("Please contact your system administrator to reset your password.")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted">
      <form onSubmit={handleLogin} className="bg-background p-8 rounded-lg shadow-md w-full max-w-md flex flex-col gap-4 border" aria-label="Admin Login Form">
        <div className="flex flex-col items-center mb-2">
          <img src="/images/hcc-logo.png" alt="HCC Logo" className="h-16 w-16 mb-2" />
        </div>
        <h1 className="text-2xl font-bold mb-2 text-center">Admin Login</h1>
        <label htmlFor="email" className="font-medium">Email</label>
        <input
          id="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          required
          autoComplete="username"
          disabled
        />
        <label htmlFor="password" className="font-medium">Password</label>
        <div className="relative flex items-center">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-primary pr-10"
            required
            autoComplete="current-password"
            aria-describedby="forgot-password-link"
            disabled
          />
          <button
            type="button"
            onClick={() => setShowPassword(v => !v)}
            className="absolute right-2 text-xs text-muted-foreground hover:text-primary focus:outline-none"
            tabIndex={-1}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        <div className="flex items-center justify-between mt-1">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={e => setRememberMe(e.target.checked)}
              className="accent-primary"
            />
            Remember me
          </label>
          <a
            href="#"
            id="forgot-password-link"
            className="text-sm text-primary hover:underline focus:outline-none"
            onClick={handleForgotPassword}
          >
            Forgot password?
          </a>
        </div>
        {error && <div className="text-red-500 text-sm text-center" role="alert">{error}</div>}
        <button
          type="submit"
          className="bg-primary text-primary-foreground rounded px-4 py-2 font-semibold hover:bg-primary/90 transition flex items-center justify-center gap-2 disabled:opacity-60"
          disabled={loading}
          aria-busy={loading}
        >
          {loading && <span className="loader border-2 border-t-2 border-primary-foreground rounded-full w-4 h-4 animate-spin mr-2"></span>}
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      <style jsx>{`
        .loader {
          border-top-color: transparent;
          border-right-color: transparent;
        }
      `}</style>
    </div>
  )
} 