const API_URL = process.env.NEXT_PUBLIC_API_URL || ''

function getToken(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('ispani_token')
}

function setToken(token: string) {
  localStorage.setItem('ispani_token', token)
  document.cookie = `ispani_token=${token}; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=Lax`
}

function clearToken() {
  localStorage.removeItem('ispani_token')
  document.cookie = 'ispani_token=; path=/; max-age=0'
}

export function createClient() {
  return {
    auth: {
      signInWithPassword: async ({ email, password }: { email: string; password: string }) => {
        const res = await fetch(`${API_URL}/api/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        })
        const body = await res.json()
        if (!res.ok) return { error: { message: body.error || 'Login failed' }, data: null }
        setToken(body.token)
        return { error: null, data: { user: body.user, session: { access_token: body.token } } }
      },

      signUp: async ({
        email,
        password,
        options,
      }: {
        email: string
        password: string
        options?: { data?: Record<string, unknown>; emailRedirectTo?: string }
      }) => {
        const res = await fetch(`${API_URL}/api/auth/signup`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password, ...(options?.data || {}) }),
        })
        const body = await res.json()
        if (!res.ok) return { error: { message: body.error || 'Signup failed' }, data: null }
        setToken(body.token)
        return { error: null, data: { user: body.user } }
      },

      signOut: async () => {
        clearToken()
        return { error: null }
      },

      getUser: async () => {
        const token = getToken()
        if (!token) return { data: { user: null }, error: null }
        const res = await fetch(`${API_URL}/api/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        if (!res.ok) {
          clearToken()
          return { data: { user: null }, error: null }
        }
        const user = await res.json()
        return { data: { user }, error: null }
      },
    },
  }
}
