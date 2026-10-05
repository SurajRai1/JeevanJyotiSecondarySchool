import { createClient } from '@/lib/supabase/server'
import { TeacherResourcesClient } from './TeacherResourcesClient'

export default async function AssignmentsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const [{ data: teacherSubjects }, { data: assignments }, { data: materials }] = await Promise.all([
    supabase.from('teacher_subjects').select('*, subjects(id, name, code)').eq('teacher_id', user!.id),
    supabase.from('assignments').select('*, subjects(name, code)').eq('teacher_id', user!.id).order('created_at', { ascending: false }),
    supabase.from('materials').select('*, subjects(name)').eq('teacher_id', user!.id).order('created_at', { ascending: false }),
  ])

  return (
    <TeacherResourcesClient
      teacherSubjects={(teacherSubjects || []).map(ts => ({ subject_id: ts.subject_id!, subjects: ts.subjects as any }))}
      assignments={assignments || []}
      materials={materials as any || []}
    />
  )
}
