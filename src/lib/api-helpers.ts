import { NextResponse } from 'next/server'
import type { SupabaseClient } from '@supabase/supabase-js'

type Role = 'admin' | 'teacher' | 'student' | 'parent'

/** Verify auth and optionally check role. Returns { userId, supabase } or a NextResponse error. */
export async function requireAuth(supabase: SupabaseClient, allowedRoles?: Role[]) {
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error || !user) return { error: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }), userId: null, supabase: null }

  if (allowedRoles) {
    const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
    if (!profile || !allowedRoles.includes(profile.role as Role)) {
      return { error: NextResponse.json({ error: 'Forbidden' }, { status: 403 }), userId: null, supabase: null }
    }
  }

  return { error: null, userId: user.id, supabase }
}
