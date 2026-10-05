'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import type { ContentType } from '@/lib/types'

async function requireAdmin() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Unauthorized.' as const, supabase: null, userId: null }

  const { data: profile } = await supabase
    .from('profiles').select('role').eq('id', user.id).single()

  if (profile?.role !== 'admin') return { error: 'Forbidden: admin only.' as const, supabase: null, userId: null }
  return { error: null, supabase, userId: user.id }
}

export async function createContent(formData: FormData) {
  const { error, supabase, userId } = await requireAdmin()
  if (error || !supabase || !userId) return { error: error || 'Unauthorized.' }

  const type = formData.get('type') as ContentType
  const title = (formData.get('title') as string)?.trim()
  const body = (formData.get('body') as string)?.trim()
  const published = formData.get('published') === 'true'

  if (!type || !title || !body) return { error: 'All fields are required.' }
  if (!['news', 'notice', 'blog'].includes(type)) return { error: 'Invalid content type.' }
  if (title.length > 200) return { error: 'Title too long (max 200 chars).' }
  if (body.length > 5000) return { error: 'Content too long (max 5000 chars).' }

  const { error: dbErr } = await supabase
    .from('content')
    .insert([{ type, title, body, published, author_id: userId }])

  if (dbErr) return { error: dbErr.message }
  revalidatePath('/admin/content-manager')
  return { success: true }
}

export async function deleteContent(id: string) {
  const { error, supabase } = await requireAdmin()
  if (error || !supabase) return { error: error || 'Unauthorized.' }

  if (!id) return { error: 'Missing content ID.' }

  const { error: dbErr } = await supabase.from('content').delete().eq('id', id)
  if (dbErr) return { error: dbErr.message }

  revalidatePath('/admin/content-manager')
  return { success: true }
}

export async function toggleContentPublished(id: string, currentState: boolean) {
  const { error, supabase } = await requireAdmin()
  if (error || !supabase) return { error: error || 'Unauthorized.' }

  if (!id) return { error: 'Missing content ID.' }

  const { error: dbErr } = await supabase
    .from('content').update({ published: !currentState }).eq('id', id)
  if (dbErr) return { error: dbErr.message }

  revalidatePath('/admin/content-manager')
  return { success: true }
}
