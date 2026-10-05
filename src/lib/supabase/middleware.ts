import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const isAuthRoute = request.nextUrl.pathname.startsWith('/auth')
  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin')
  const isTeacherRoute = request.nextUrl.pathname.startsWith('/teacher')
  const isStudentRoute = request.nextUrl.pathname.startsWith('/student')
  const isParentRoute = request.nextUrl.pathname.startsWith('/parent')
  
  const isProtectedRoute = isAdminRoute || isTeacherRoute || isStudentRoute || isParentRoute

  // 1. If user is NOT authenticated and tries to access a protected route, redirect to login
  if (!user && isProtectedRoute) {
    const url = request.nextUrl.clone()
    url.pathname = '/auth/login'
    url.searchParams.set('redirect_to', request.nextUrl.pathname)
    return NextResponse.redirect(url)
  }

  // 2. If user IS authenticated
  if (user) {
    // 2a. If they try to access login/auth pages, redirect them to their dashboard
    if (isAuthRoute) {
      // In a real scenario, fetch their role from `profiles` table to redirect correctly
      // For now, redirect to a generic loading or role-checker route, or fetch role here if fast enough
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()
        
      const role = profile?.role || 'student'
      const url = request.nextUrl.clone()
      url.pathname = `/${role}`
      return NextResponse.redirect(url)
    }

    // 2b. Role-based route protection
    if (isProtectedRoute) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()
        
      const role = profile?.role
      
      if (isAdminRoute && role !== 'admin') {
        const url = request.nextUrl.clone()
        url.pathname = role ? `/${role}` : '/'
        return NextResponse.redirect(url)
      }
      if (isTeacherRoute && role !== 'teacher') {
        const url = request.nextUrl.clone()
        url.pathname = role ? `/${role}` : '/'
        return NextResponse.redirect(url)
      }
      if (isStudentRoute && role !== 'student') {
        const url = request.nextUrl.clone()
        url.pathname = role ? `/${role}` : '/'
        return NextResponse.redirect(url)
      }
      if (isParentRoute && role !== 'parent') {
        const url = request.nextUrl.clone()
        url.pathname = role ? `/${role}` : '/'
        return NextResponse.redirect(url)
      }
    }
  }

  return supabaseResponse
}
