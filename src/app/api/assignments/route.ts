import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { requireAuth } from '@/lib/api-helpers'

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient()
    const { error: authErr, userId } = await requireAuth(supabase, ['teacher'])
    if (authErr || !userId) return authErr!

    const { title, description, subject_id, due_date } = await req.json()
    if (!title || !subject_id) return NextResponse.json({ error: 'title and subject_id are required' }, { status: 400 })

    const { data, error } = await supabase
      .from('assignments')
      .insert([{ title, description: description?.trim() || null, subject_id, due_date: due_date || null, teacher_id: userId }])
      .select().single()

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ success: true, data })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
