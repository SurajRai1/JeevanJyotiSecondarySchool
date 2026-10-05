import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { requireAuth } from '@/lib/api-helpers'

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient()
    const { error: authErr, userId } = await requireAuth(supabase, ['teacher'])
    if (authErr || !userId) return authErr!

    const payload = await req.json()
    if (!Array.isArray(payload) || payload.length === 0) {
      return NextResponse.json({ error: 'Payload must be a non-empty array of marks.' }, { status: 400 })
    }

    // Validate each row
    for (const row of payload) {
      if (!row.student_id || !row.exam_id || !row.subject_id) {
        return NextResponse.json({ error: 'Each mark must include student_id, exam_id, and subject_id.' }, { status: 400 })
      }
      if (row.marks_obtained !== null && (isNaN(row.marks_obtained) || row.marks_obtained < 0)) {
        return NextResponse.json({ error: 'marks_obtained must be a non-negative number.' }, { status: 400 })
      }
    }

    const rows = payload.map((row: any) => ({ ...row, teacher_id: userId }))

    const { error } = await supabase.from('marks').upsert(rows, {
      onConflict: 'student_id,exam_id,subject_id',
      ignoreDuplicates: false,
    })

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ success: true })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
