import { NextResponse } from 'next/server'

export async function middleware(request) {
  const { pathname } = request.nextUrl

  // Public routes that don't need auth
  const publicRoutes = ['/', '/auth', '/interview']
  const isPublicRoute = publicRoutes.some(route => pathname === route) || pathname.startsWith('/interview/')

  if (isPublicRoute) {
    return NextResponse.next()
  }

  // Check for auth — either Supabase session or guest cookie
  const authCookies = request.cookies.getAll()
  const hasAuthCookie = authCookies.some(cookie => 
    cookie.name.includes('auth-token') || 
    cookie.name.includes('sb-')
  )
  const hasGuestCookie = request.cookies.get('guest_session')?.value === 'true'

  if (!hasAuthCookie && !hasGuestCookie) {
    const url = request.nextUrl.clone()
    url.pathname = '/auth'
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/all-interview/:path*',
    '/schedule-interview/:path*',
    '/billing/:path*',
    '/settings/:path*',
  ],
}
