import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { requireAuth } from '@/lib/api-helpers'

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient()
    const { error: authErr } = await requireAuth(supabase, ['admin'])
    if (authErr) return authErr

    const { name, section, academic_year_id } = await req.json()
    if (!name || !section) return NextResponse.json({ error: 'name and section are required' }, { status: 400 })

    const { data, error } = await supabase
      .from('classes').insert([{ name: name.trim(), section: section.trim(), academic_year_id: academic_year_id || null }])
      .select('*, academic_years(name)').single()
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ data })
  } catch (err: any) { return NextResponse.json({ error: err.message }, { status: 500 }) }
}

export async function DELETE(req: NextRequest) {
  try {
    const supabase = await createClient()
    const { error: authErr } = await requireAuth(supabase, ['admin'])
    if (authErr) return authErr

    const id = req.nextUrl.searchParams.get('id')
    if (!id) return NextResponse.json({ error: 'id is required' }, { status: 400 })

    const { error } = await supabase.from('classes').delete().eq('id', id)
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ success: true })
  } catch (err: any) { return NextResponse.json({ error: err.message }, { status: 500 }) }
}
