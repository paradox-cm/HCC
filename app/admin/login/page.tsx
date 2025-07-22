"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function AdminLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")
    // Placeholder: Replace with real authentication logic
    if (email === "admin@hcc.com" && password === "password123") {
      // Set a simple session (localStorage for demo; use cookies in production)
      localStorage.setItem("hcc_admin_auth", "true")
      router.push("/admin/dashboard")
    } else {
      setError("Invalid email or password.")
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted">
      <form onSubmit={handleLogin} className="bg-background p-8 rounded-lg shadow-md w-full max-w-md flex flex-col gap-4 border">
        <h1 className="text-2xl font-bold mb-2 text-center">Admin Login</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="border rounded px-3 py-2"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="border rounded px-3 py-2"
          required
        />
        {error && <div className="text-red-500 text-sm text-center">{error}</div>}
        <button
          type="submit"
          className="bg-primary text-primary-foreground rounded px-4 py-2 font-semibold hover:bg-primary/90 transition"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  )
} 