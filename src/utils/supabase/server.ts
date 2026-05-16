import { cookies } from 'next/headers'
import { jwtDecode } from 'jwt-decode'

interface JwtPayload {
  id: string
  email: string
  role: string
  full_name: string
  exp?: number
}

export async function createClient() {
  const cookieStore = await cookies()

  return {
    auth: {
      getUser: async () => {
        const token = cookieStore.get('ispani_token')?.value
        if (!token) return { data: { user: null }, error: null }

        try {
          const payload = jwtDecode<JwtPayload>(token)
          if (payload.exp && payload.exp * 1000 < Date.now()) {
            return { data: { user: null }, error: null }
          }
          return {
            data: {
              user: {
                id: payload.id,
                email: payload.email,
                user_metadata: { role: payload.role, full_name: payload.full_name },
              },
            },
            error: null,
          }
        } catch {
          return { data: { user: null }, error: null }
        }
      },
    },
  }
}
