'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useAuth } from '@/lib/auth-context'
import { useRouter } from 'next/navigation'

export default function CRMLogin() {
  const { signIn } = useAuth()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(true)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem('crm-remember-me')
      if (stored) {
        const parsed = JSON.parse(stored) as { email?: string; password?: string }
        if (parsed.email) setEmail(parsed.email)
        if (parsed.password) setPassword(parsed.password)
        setRemember(true)
      }
    } catch {
      // ignore
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await signIn(email, password)

      if (remember) {
        try {
          window.localStorage.setItem(
            'crm-remember-me',
            JSON.stringify({ email, password })
          )
        } catch {
          // ignore storage errors
        }
      } else {
        window.localStorage.removeItem('crm-remember-me')
      }

      router.push('/crm')
    } catch (err) {
      const firebaseError = err as { message?: string } | null
      const message = firebaseError?.message || 'Invalid email or password'
      setError(message)
      console.error('Login error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md p-8 bg-card border border-border rounded">
        <div className="mb-8">
          <div className="relative h-8 w-[140px] mb-3 mx-auto">
            <Image
              src="/brand/logo.png"
              alt="LA PIQÛRE"
              fill
              sizes="140px"
              className="object-contain object-center"
            />
          </div>
          <p className="text-center text-muted-foreground">CRM Staff Portal</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
          <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-border rounded bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Email"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-border rounded bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="••••••••"
              required
            />
          </div>

          <label className="flex items-center justify-between text-xs text-muted-foreground mt-1">
            <span className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="h-4 w-4 rounded border-border"
              />
              <span>Remember me on this device</span>
            </span>
          </label>

          {error && (
            <div className="p-3 bg-destructive/10 text-destructive text-sm rounded">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 disabled:opacity-50 transition-colors font-medium"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

      </div>
    </div>
  )
}
