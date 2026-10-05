import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { requireAuth } from '@/lib/api-helpers'

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient()
    const { error: authErr, userId } = await requireAuth(supabase, ['teacher'])
    if (authErr || !userId) return authErr!

    const { title, file_url, subject_id } = await req.json()
    if (!title || !file_url || !subject_id) {
      return NextResponse.json({ error: 'title, file_url, and subject_id are required' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('materials')
      .insert([{ title: title.trim(), file_url: file_url.trim(), subject_id, teacher_id: userId }])
      .select().single()

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ success: true, data })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
