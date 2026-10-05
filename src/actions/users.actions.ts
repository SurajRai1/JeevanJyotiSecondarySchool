'use server'

import { createClient } from '@/lib/supabase/server'
import { createClient as createAdminClient } from '@supabase/supabase-js'

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

/** Admin-only: provision a new user account */
export async function createUserAction(formData: FormData) {
  // 1. Verify the caller is an admin
  const supabase = await createClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) return { error: 'Unauthorized.' }

  const { data: callerProfile } = await supabase
    .from('profiles').select('role').eq('id', user.id).single()
  if (callerProfile?.role !== 'admin') return { error: 'Only administrators can create users.' }

  // 2. Validate inputs
  const email = (formData.get('email') as string)?.trim().toLowerCase()
  const password = formData.get('password') as string
  const full_name = (formData.get('full_name') as string)?.trim()
  const role = formData.get('role') as string

  if (!email || !password || !full_name || !role) return { error: 'All fields are required.' }
  if (!validateEmail(email)) return { error: 'Invalid email address.' }
  if (password.length < 8) return { error: 'Password must be at least 8 characters.' }
  if (!['student', 'teacher', 'parent', 'admin'].includes(role)) return { error: 'Invalid role.' }
  if (full_name.length > 100) return { error: 'Name is too long.' }

  // 3. Use service role key if available, otherwise fall back to anon key
  const serviceUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

  const adminClient = createAdminClient(serviceUrl, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  })

  const { error } = await adminClient.auth.signUp({
    email,
    password,
    options: { data: { full_name, role } },
  })

  if (error) return { error: error.message }
  return { success: true }
}
