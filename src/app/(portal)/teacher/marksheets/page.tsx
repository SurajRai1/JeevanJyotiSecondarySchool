import { createClient } from '@/lib/supabase/server'
import { MarksheetsClient } from './MarksheetsClient'

export default async function MarksheetsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const [
    { data: exams },
    { data: teacherSubjects },
    { data: existingMarks },
  ] = await Promise.all([
    supabase.from('exams').select('*').order('created_at', { ascending: false }),
    supabase.from('teacher_subjects').select('*, subjects(id, name, code, classes(id, name, section))').eq('teacher_id', user!.id),
    supabase.from('marks').select('*').eq('teacher_id', user!.id),
  ])

  // Get all students enrolled in the teacher's classes
  const classIds = [...new Set(teacherSubjects?.flatMap(ts => (ts.subjects as any)?.class_id ? [(ts.subjects as any).class_id] : []) || [])]
  const { data: enrollments } = classIds.length > 0 
    ? await supabase.from('student_enrollments').select('*, profiles(id, full_name, email)').in('class_id', classIds)
    : { data: [] }

  const students = [...new Map(
    (enrollments || []).map(e => [e.profiles?.id, e.profiles])
  ).values()].filter(Boolean)

  return (
    <MarksheetsClient
      exams={exams || []}
      teacherSubjects={(teacherSubjects || []).map(ts => ({ subject_id: ts.subject_id!, subjects: ts.subjects as any }))}
      students={students as any}
      existingMarks={existingMarks || []}
    />
  )
}
