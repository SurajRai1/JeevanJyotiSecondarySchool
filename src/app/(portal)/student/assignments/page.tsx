import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { BookOpen, Clock, CheckCircle2 } from 'lucide-react'
import { formatDate } from '@/lib/utils'

export const metadata = { title: 'Assignments' }

export default async function StudentAssignmentsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  // Get the student's enrolled class IDs
  const { data: enrollments } = await supabase
    .from('student_enrollments').select('class_id').eq('student_id', user.id)
  const classIds = enrollments?.map(e => e.class_id).filter(Boolean) || []

  // Get assignments for those classes via subject-class relation
  const { data: allAssignments } = await supabase
    .from('assignments')
    .select('id, title, description, due_date, created_at, subjects(name, code, class_id)')
    .order('due_date', { ascending: true })

  const assignments = (allAssignments || []).filter((a: any) =>
    classIds.includes((a.subjects as any)?.class_id)
  )

  const now = new Date()
  const upcoming = assignments.filter(a => !a.due_date || new Date(a.due_date) >= now)
  const overdue = assignments.filter(a => a.due_date && new Date(a.due_date) < now)

  function AssignmentCard({ a, isOverdue }: { a: any; isOverdue: boolean }) {
    return (
      <div className="flex gap-3 p-4 border border-zinc-200 rounded-lg bg-white hover:border-zinc-300 transition-colors">
        <div className={`h-10 w-10 rounded-md flex items-center justify-center shrink-0 ${isOverdue ? 'bg-red-100' : 'bg-zinc-100'}`}>
          {isOverdue ? <Clock className="h-5 w-5 text-red-600" /> : <CheckCircle2 className="h-5 w-5 text-zinc-600" />}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <p className="font-semibold text-sm text-zinc-900">{a.title}</p>
            {isOverdue && <Badge className="text-xs bg-red-100 text-red-700 border-0 shrink-0">Overdue</Badge>}
          </div>
          <p className="text-xs text-zinc-500 mt-0.5">{a.subjects?.name} ({a.subjects?.code})</p>
          {a.description && <p className="text-xs text-zinc-400 mt-1 line-clamp-2">{a.description}</p>}
          {a.due_date && (
            <p className={`text-xs mt-1.5 font-medium ${isOverdue ? 'text-red-600' : 'text-zinc-500'}`}>
              {isOverdue ? 'Was due: ' : 'Due: '}{formatDate(a.due_date)}
            </p>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900">Assignments</h1>
        <p className="text-sm text-zinc-500 mt-0.5">All assignments for your class.</p>
      </div>

      {assignments.length === 0 ? (
        <Card className="border-zinc-200">
          <CardContent className="py-16 text-center">
            <BookOpen className="h-10 w-10 text-zinc-300 mx-auto mb-3" />
            <p className="text-zinc-400 text-sm">No assignments yet.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {overdue.length > 0 && (
            <Card className="border-red-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-red-700 text-base flex items-center gap-2">
                  <Clock className="w-4 h-4" />Overdue ({overdue.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {overdue.map(a => <AssignmentCard key={a.id} a={a} isOverdue />)}
              </CardContent>
            </Card>
          )}

          <Card className="border-zinc-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-zinc-900 text-base flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />Upcoming ({upcoming.length})
              </CardTitle>
              <CardDescription>Assignments with upcoming or no due date.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcoming.length > 0
                ? upcoming.map(a => <AssignmentCard key={a.id} a={a} isOverdue={false} />)
                : <p className="text-sm text-zinc-400 text-center py-4">All caught up!</p>}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
