import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { requireAuth } from '@/lib/api-helpers'

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient()
    const { error: authErr } = await requireAuth(supabase, ['admin'])
    if (authErr) return authErr

    const { name, code, class_id } = await req.json()
    if (!name || !code) return NextResponse.json({ error: 'name and code are required' }, { status: 400 })

    const { data, error } = await supabase
      .from('subjects').insert([{ name: name.trim(), code: code.trim().toUpperCase(), class_id: class_id || null }])
      .select('*, classes(name, section)').single()
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

    const { error } = await supabase.from('subjects').delete().eq('id', id)
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ success: true })
  } catch (err: any) { return NextResponse.json({ error: err.message }, { status: 500 }) }
}
