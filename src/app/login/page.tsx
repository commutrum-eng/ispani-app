'use client'

import { useState, Suspense } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'

function IspaniLogo({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M50 8C26.8 8 8 26.8 8 50s18.8 42 42 42c10.6 0 20.3-3.9 27.7-10.3V52H48v12h17.2c-3.2 6.3-9.8 10.6-17.2 10.6C33.6 74.6 22 63 22 50S33.6 25.4 48 25.4c7.8 0 14.8 3.4 19.7 8.8l9.5-9.5C70.1 17.5 59.6 8 50 8z" fill="#00C201"/>
      <circle cx="74" cy="26" r="7" fill="#00C201"/>
      <path d="M26 86 Q50 96 74 86" stroke="#00C201" strokeWidth="6" strokeLinecap="round" fill="none"/>
    </svg>
  )
}

type Role = 'worker' | 'employer'

function LoginContent() {
  const params = useSearchParams()
  const defaultRole = (params.get('role') as Role) || 'worker'

  const [role, setRole] = useState<Role>(defaultRole)
  const [mode, setMode] = useState<'login' | 'signup'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(null)

    if (mode === 'login') {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) { setError(error.message); setLoading(false) }
      else router.push('/dashboard')
    } else {
      const { error } = await supabase.auth.signUp({
        email, password,
        options: {
          data: { full_name: name, role },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })
      if (error) { setError(error.message); setLoading(false) }
      else { setSuccess('Check your email to confirm your account!'); setLoading(false) }
    }
  }

  const roleConfig = {
    worker: {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
        </svg>
      ),
      label: 'Worker',
      sub: 'Find urgent gigs matching your skills',
    },
    employer: {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
        </svg>
      ),
      label: 'Employer',
      sub: 'Post jobs and hire instantly',
    },
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--ispani-gray)', display: 'flex', flexDirection: 'column' }}>

      {/* Header */}
      <header style={{ padding: '20px 32px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <IspaniLogo size={32} />
          <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: '20px', color: 'var(--ispani-dark)' }}>
            i<span style={{ color: 'var(--ispani-green)' }}>Spani</span>
          </span>
        </Link>
      </header>

      {/* Form card */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
        <div className="card" style={{ width: '100%', maxWidth: '460px', padding: '40px' }}>

          {/* Title */}
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: '28px', letterSpacing: '-0.5px', marginBottom: '8px' }}>
              {mode === 'login' ? 'Welcome back' : 'Create account'}
            </h1>
            <p style={{ color: 'var(--ispani-text-muted)', fontSize: '14px' }}>
              {mode === 'login' ? 'Sign in to your iSpani account' : 'Start matching with the right opportunities'}
            </p>
          </div>

          {/* Role selector */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '28px' }}>
            {(['worker', 'employer'] as Role[]).map(r => {
              const cfg = roleConfig[r]
              const selected = role === r
              return (
                <button key={r} type="button" onClick={() => setRole(r)}
                  style={{
                    padding: '14px 12px', borderRadius: '12px', border: `2px solid ${selected ? 'var(--ispani-green)' : 'var(--ispani-gray-border)'}`,
                    background: selected ? 'var(--ispani-green-light)' : 'var(--ispani-white)',
                    cursor: 'pointer', transition: 'all 0.18s', textAlign: 'left',
                    display: 'flex', flexDirection: 'column', gap: '6px',
                  }}
                >
                  <span style={{ color: selected ? 'var(--ispani-green)' : 'var(--ispani-text-muted)', display: 'flex' }}>
                    {cfg.icon}
                  </span>
                  <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '14px', color: 'var(--ispani-dark)' }}>
                    {cfg.label}
                  </span>
                  <span style={{ fontSize: '11px', color: 'var(--ispani-text-muted)', lineHeight: '1.4' }}>{cfg.sub}</span>
                </button>
              )
            })}
          </div>

          {/* Error / Success */}
          {error && (
            <div style={{ padding: '12px 16px', background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '10px', color: '#EF4444', fontSize: '13px', marginBottom: '20px' }}>
              {error}
            </div>
          )}
          {success && (
            <div style={{ padding: '12px 16px', background: 'var(--ispani-green-light)', border: '1px solid var(--ispani-green)', borderRadius: '10px', color: 'var(--ispani-green-dark)', fontSize: '13px', marginBottom: '20px' }}>
              {success}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {mode === 'signup' && (
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--ispani-dark)', marginBottom: '6px' }}>Full Name</label>
                <input className="input-field" type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Sipho Ndlovu" required />
              </div>
            )}
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--ispani-dark)', marginBottom: '6px' }}>Email</label>
              <input className="input-field" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--ispani-dark)', marginBottom: '6px' }}>Password</label>
              <input className="input-field" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required minLength={6} />
            </div>
            <button type="submit" disabled={loading} className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '4px', opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}>
              {loading ? 'Processing...' : mode === 'login' ? 'Sign In' : `Create ${roleConfig[role].label} Account`}
            </button>
          </form>

          {/* Toggle */}
          <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '14px', color: 'var(--ispani-text-muted)' }}>
            {mode === 'login' ? (
              <>Don&apos;t have an account?{' '}
                <button onClick={() => setMode('signup')} style={{ color: 'var(--ispani-green)', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px' }}>Sign up</button>
              </>
            ) : (
              <>Already have an account?{' '}
                <button onClick={() => setMode('login')} style={{ color: 'var(--ispani-green)', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px' }}>Sign in</button>
              </>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--ispani-gray)' }}>Loading...</div>}>
      <LoginContent />
    </Suspense>
  )
}
