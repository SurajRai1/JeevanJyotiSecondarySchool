'use client'

import { useState } from 'react'
import { login } from '@/actions/auth.actions'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, AlertCircle, GraduationCap } from 'lucide-react'
import type { Role } from '@/lib/types'

const ROLES: { id: Role; label: string; desc: string }[] = [
  { id: 'student', label: 'Student', desc: 'Access marks & assignments' },
  { id: 'teacher', label: 'Teacher', desc: 'Manage classes & grades' },
  { id: 'parent', label: 'Parent', desc: "Monitor child's progress" },
  { id: 'admin', label: 'Admin', desc: 'Full portal control' },
]

export default function LoginPage() {
  const [activeRole, setActiveRole] = useState<Role>('student')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const email = formData.get('email') as string
    const password = formData.get('password') as string

    if (!email || !password) {
      setError('Email and password are required.')
      return
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }

    setLoading(true)
    setError(null)
    const result = await login(formData)
    if (result?.error) {
      setError(result.error)
      setLoading(false)
    }
  }

  return (
    <div className="portal-scope min-h-screen bg-zinc-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl grid lg:grid-cols-2 gap-0 rounded-xl overflow-hidden border border-zinc-200 shadow-lg">

        {/* Left — Branding */}
        <div className="bg-zinc-900 text-white p-8 lg:p-12 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-zinc-900" />
                </div>
                <span className="font-bold text-white text-lg">Jeevan Jyoti</span>
              </div>
              <a
                href="/"
                className="text-xs text-zinc-400 hover:text-white transition-colors flex items-center gap-1.5"
              >
                <span>←</span>
                <span>Website</span>
              </a>
            </div>
            <h1 className="text-3xl font-bold text-white leading-tight mb-3">
              Your digital campus portal
            </h1>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Access grades, assignments, notices, and more. Select your role to continue.
            </p>
          </div>

          {/* Role selector */}
          <div className="mt-8 grid grid-cols-2 gap-3">
            {ROLES.map(r => (
              <button
                key={r.id}
                type="button"
                onClick={() => setActiveRole(r.id)}
                className={`text-left p-3 rounded-lg border transition-all ${
                  activeRole === r.id
                    ? 'bg-white text-zinc-900 border-white'
                    : 'bg-white/5 text-zinc-300 border-white/10 hover:bg-white/10'
                }`}
              >
                <div className="font-semibold text-sm">{r.label}</div>
                <div className={`text-xs mt-0.5 ${activeRole === r.id ? 'text-zinc-500' : 'text-zinc-500'}`}>
                  {r.desc}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right — Form */}
        <div className="bg-white p-8 lg:p-12 flex flex-col justify-center">
          <CardHeader className="p-0 mb-6">
            <CardTitle className="text-2xl text-zinc-900">
              {ROLES.find(r => r.id === activeRole)?.label} Sign In
            </CardTitle>
            <CardDescription className="text-zinc-500">
              Enter your credentials to access your dashboard.
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-zinc-700">Email address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="name@jeevanjyoti.edu.np"
                className="border-zinc-300 focus-visible:ring-zinc-900"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-zinc-700">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                placeholder="••••••••"
                className="border-zinc-300 focus-visible:ring-zinc-900"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-zinc-900 hover:bg-zinc-700 text-white h-11"
            >
              {loading ? (
                <><Loader2 className="w-4 h-4 animate-spin mr-2" />Signing in...</>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>

          <p className="text-xs text-zinc-400 mt-6 text-center">
            Problems logging in? Contact your school administrator.
          </p>
        </div>
      </div>
    </div>
  )
}
