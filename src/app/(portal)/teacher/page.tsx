import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { BookOpen, FileText, Users, TrendingUp, Clock } from 'lucide-react'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'

export const metadata = { title: 'Teacher Dashboard' }

export default async function TeacherDashboard() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const [
    { data: assignments },
    { data: materials },
    { data: teacherSubjects },
    { data: notices },
  ] = await Promise.all([
    supabase.from('assignments').select('id, title, description, due_date, subjects(name, classes(name, section))').eq('teacher_id', user.id).order('created_at', { ascending: false }).limit(5),
    supabase.from('materials').select('id, title, created_at, subjects(name)').eq('teacher_id', user.id).order('created_at', { ascending: false }).limit(3),
    supabase.from('teacher_subjects').select('id, subject_id, subjects(name, code, classes(name, section))').eq('teacher_id', user.id),
    supabase.from('content').select('id, title, type, body, created_at').eq('published', true).order('created_at', { ascending: false }).limit(3),
  ])

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Teacher Dashboard</h1>
          <p className="text-sm text-zinc-500 mt-0.5">Manage your classes, grades, and resources.</p>
        </div>
        <div className="flex gap-2">
          <Button asChild size="sm" className="bg-zinc-900 hover:bg-zinc-700 text-white">
            <Link href="/teacher/marksheets"><FileText className="w-4 h-4 mr-1.5" />Enter Marks</Link>
          </Button>
          <Button asChild variant="outline" size="sm">
            <Link href="/teacher/assignments"><BookOpen className="w-4 h-4 mr-1.5" />New Assignment</Link>
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'My Subjects', value: teacherSubjects?.length ?? 0, sub: 'Assigned to teach', icon: BookOpen },
          { label: 'Assignments', value: assignments?.length ?? 0, sub: 'Posted this term', icon: FileText },
          { label: 'Resources', value: materials?.length ?? 0, sub: 'Materials uploaded', icon: Users },
          { label: 'Pending Marks', value: '—', sub: 'Awaiting entry', icon: TrendingUp },
        ].map(({ label, value, sub, icon: Icon }) => (
          <Card key={label} className="border-zinc-200">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-zinc-500">{label}</CardTitle>
              <div className="h-8 w-8 rounded-md bg-zinc-100 flex items-center justify-center">
                <Icon className="h-4 w-4 text-zinc-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-zinc-900">{value}</div>
              <p className="text-xs text-zinc-400 mt-1">{sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* My Subjects */}
        <Card className="border-zinc-200">
          <CardHeader>
            <CardTitle className="text-zinc-900 text-base">My Classes & Subjects</CardTitle>
            <CardDescription>Subjects assigned to you.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {teacherSubjects && teacherSubjects.length > 0 ? teacherSubjects.map((ts: any) => (
              <div key={ts.id} className="flex items-center justify-between p-3 rounded-lg bg-zinc-50 border border-zinc-200">
                <div>
                  <p className="font-medium text-sm text-zinc-900">{ts.subjects?.name}</p>
                  <p className="text-xs text-zinc-500">{ts.subjects?.classes?.name} — {ts.subjects?.classes?.section}</p>
                </div>
                <Badge variant="secondary" className="text-xs bg-zinc-200 text-zinc-700">{ts.subjects?.code}</Badge>
              </div>
            )) : (
              <p className="text-sm text-zinc-400 text-center py-6">No subjects assigned. Contact Admin.</p>
            )}
          </CardContent>
        </Card>

        {/* Recent Assignments */}
        <Card className="border-zinc-200">
          <CardHeader>
            <CardTitle className="text-zinc-900 text-base">Recent Assignments</CardTitle>
            <CardDescription>Your latest assignments and quizzes.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {assignments && assignments.length > 0 ? assignments.map((a: any) => (
              <div key={a.id} className="flex gap-3 p-3 rounded-lg border border-zinc-200 bg-zinc-50">
                <div className="h-8 w-8 rounded-md bg-zinc-200 flex items-center justify-center shrink-0">
                  <BookOpen className="h-4 w-4 text-zinc-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-zinc-900 truncate">{a.title}</p>
                  <p className="text-xs text-zinc-500">{a.subjects?.name} • {a.subjects?.classes?.name} {a.subjects?.classes?.section}</p>
                  {a.due_date && (
                    <p className="text-xs text-zinc-400 flex items-center gap-1 mt-0.5">
                      <Clock className="w-3 h-3" />Due {formatDate(a.due_date)}
                    </p>
                  )}
                </div>
              </div>
            )) : (
              <div className="text-center py-6">
                <p className="text-sm text-zinc-400">No assignments yet.</p>
                <Link href="/teacher/assignments" className="text-xs text-zinc-900 underline underline-offset-2 mt-1 block">Create your first →</Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* School Notices */}
      <Card className="border-zinc-200">
        <CardHeader>
          <CardTitle className="text-zinc-900 text-base">School Notices</CardTitle>
          <CardDescription>Latest announcements from administration.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-3">
            {notices && notices.length > 0 ? notices.map((n: any) => (
              <div key={n.id} className="p-4 border border-zinc-200 rounded-lg bg-zinc-50">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className="text-xs capitalize border-zinc-300 text-zinc-600">{n.type}</Badge>
                  <span className="text-xs text-zinc-400">{formatDate(n.created_at)}</span>
                </div>
                <p className="font-semibold text-sm text-zinc-900">{n.title}</p>
                <p className="text-xs text-zinc-500 mt-1 line-clamp-2">{n.body}</p>
              </div>
            )) : (
              <p className="text-sm text-zinc-400 col-span-3 text-center py-4">No notices published yet.</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
