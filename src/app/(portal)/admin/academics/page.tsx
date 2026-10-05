import { createClient } from '@/lib/supabase/server'
import { AcademicsClient } from './AcademicsClient'

export default async function AcademicsPage() {
  const supabase = await createClient()

  const [
    { data: years },
    { data: classes },
    { data: subjects },
    { data: exams },
    { data: teachers },
  ] = await Promise.all([
    supabase.from('academic_years').select('*').order('created_at', { ascending: false }),
    supabase.from('classes').select('*, academic_years(name)').order('created_at', { ascending: false }),
    supabase.from('subjects').select('*, classes(name, section)').order('created_at', { ascending: false }),
    supabase.from('exams').select('*, academic_years(name)').order('created_at', { ascending: false }),
    supabase.from('profiles').select('id, full_name, email').eq('role', 'teacher').order('full_name'),
  ])

  return (
    <AcademicsClient
      academicYears={years || []}
      classes={classes || []}
      subjects={subjects || []}
      exams={exams || []}
      teacherOptions={teachers || []}
    />
  )
}
