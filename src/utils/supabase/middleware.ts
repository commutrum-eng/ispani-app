import { NextResponse, type NextRequest } from 'next/server'
import { jwtDecode } from 'jwt-decode'

interface JwtPayload {
  id: string
  email: string
  role: string
  full_name: string
  exp?: number
}

function getTokenFromRequest(request: NextRequest): JwtPayload | null {
  const token = request.cookies.get('ispani_token')?.value
  if (!token) return null
  try {
    const payload = jwtDecode<JwtPayload>(token)
    if (payload.exp && payload.exp * 1000 < Date.now()) return null
    return payload
  } catch {
    return null
  }
}

export async function updateSession(request: NextRequest) {
  const user = getTokenFromRequest(request)

  if (
    !user &&
    !request.nextUrl.pathname.startsWith('/login') &&
    !request.nextUrl.pathname.startsWith('/auth') &&
    request.nextUrl.pathname !== '/'
  ) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  return NextResponse.next({ request })
}
