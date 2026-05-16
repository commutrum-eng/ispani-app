import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const response = NextResponse.redirect(new URL('/', request.url), { status: 302 })
  response.cookies.set('ispani_token', '', { path: '/', maxAge: 0 })
  return response
}
