import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { GraduationCap, BookOpen, FileText, TrendingUp, Clock, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'
import { calculateGrade, formatDate } from '@/lib/utils'

export const metadata = { title: 'Student Dashboard' }

const GRADE_COLORS: Record<string, string> = {
  'A+': 'bg-zinc-900 text-white',  'A': 'bg-zinc-700 text-white',
  'B+': 'bg-zinc-500 text-white',  'B': 'bg-zinc-300 text-zinc-800',
  'C':  'bg-zinc-200 text-zinc-700', 'F': 'bg-red-100 text-red-700',
}

export default async function StudentDashboard() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const [
    { data: enrollments },
    { data: marks },
    { data: assignments },
    { data: materials },
    { data: notices },
  ] = await Promise.all([
    supabase.from('student_enrollments').select('classes(name, section, academic_years(name))').eq('student_id', user.id),
    supabase.from('marks').select('id, marks_obtained, total_marks, remarks, subjects(name, code), exams(name)').eq('student_id', user.id).order('created_at', { ascending: false }),
    supabase.from('assignments').select('id, title, due_date, description, subjects(name)').order('due_date', { ascending: true }).limit(5),
    supabase.from('materials').select('id, title, file_url, created_at, subjects(name)').order('created_at', { ascending: false }).limit(3),
    supabase.from('content').select('id, title, type, body, created_at').eq('published', true).in('type', ['news', 'notice']).order('created_at', { ascending: false }).limit(3),
  ])

  const myClass = (enrollments?.[0] as any)?.classes
  const avgPct = marks && marks.length > 0
    ? (marks.reduce((s, m) => s + (m.marks_obtained && m.total_marks ? (m.marks_obtained / m.total_marks) * 100 : 0), 0) / marks.length).toFixed(1)
    : null

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Student Dashboard</h1>
          <p className="text-sm text-zinc-500 mt-0.5">
            {myClass ? `${myClass.name} — Section ${myClass.section}` : 'Welcome to your student portal.'}
          </p>
        </div>
        <Button asChild size="sm" className="bg-zinc-900 hover:bg-zinc-700 text-white">
          <Link href="/student/marks"><GraduationCap className="w-4 h-4 mr-1.5" />View Marks</Link>
        </Button>
      </div>

      {/* KPIs */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Average Score', value: avgPct ? `${avgPct}%` : '—', sub: 'All subjects', icon: TrendingUp },
          { label: 'Exams Taken', value: marks?.length ?? 0, sub: 'Results recorded', icon: FileText },
          { label: 'Assignments', value: assignments?.length ?? 0, sub: 'Active', icon: BookOpen },
          { label: 'Resources', value: materials?.length ?? 0, sub: 'Study materials', icon: GraduationCap },
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
        {/* Recent Marks */}
        <Card className="border-zinc-200">
          <CardHeader>
            <CardTitle className="text-zinc-900 text-base">Recent Marks</CardTitle>
            <CardDescription>Your latest exam results.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {marks && marks.length > 0 ? marks.slice(0, 5).map((m: any) => {
              const grade = m.marks_obtained && m.total_marks ? calculateGrade(m.marks_obtained, m.total_marks) : null
              const pct = m.marks_obtained && m.total_marks ? ((m.marks_obtained / m.total_marks) * 100).toFixed(0) : null
              return (
                <div key={m.id} className="flex items-center justify-between p-3 rounded-lg border border-zinc-200 bg-zinc-50">
                  <div>
                    <p className="font-medium text-sm text-zinc-900">{m.subjects?.name}</p>
                    <p className="text-xs text-zinc-500">{m.exams?.name}</p>
                    {m.remarks && <p className="text-xs text-zinc-400 italic mt-0.5">"{m.remarks}"</p>}
                  </div>
                  <div className="text-right space-y-1">
                    <p className="font-bold text-sm text-zinc-900">{m.marks_obtained}/{m.total_marks}</p>
                    {grade && (
                      <Badge className={`text-xs border-0 ${GRADE_COLORS[grade]}`}>
                        {grade} • {pct}%
                      </Badge>
                    )}
                  </div>
                </div>
              )
            }) : (
              <p className="text-sm text-zinc-400 text-center py-6">No marks recorded yet.</p>
            )}
            {marks && marks.length > 5 && (
              <Link href="/student/marks" className="text-xs text-zinc-900 underline underline-offset-2 block text-center mt-2">
                View all marks →
              </Link>
            )}
          </CardContent>
        </Card>

        {/* Assignments */}
        <Card className="border-zinc-200">
          <CardHeader>
            <CardTitle className="text-zinc-900 text-base">Upcoming Assignments</CardTitle>
            <CardDescription>Deadlines and pending work.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {assignments && assignments.length > 0 ? assignments.map((a: any) => {
              const overdue = a.due_date && new Date(a.due_date) < new Date()
              return (
                <div key={a.id} className="flex gap-3 p-3 rounded-lg border border-zinc-200 bg-zinc-50">
                  <div className={`h-8 w-8 rounded-md flex items-center justify-center shrink-0 ${overdue ? 'bg-red-100' : 'bg-zinc-200'}`}>
                    {overdue ? <Clock className="h-4 w-4 text-red-600" /> : <CheckCircle2 className="h-4 w-4 text-zinc-600" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-zinc-900 truncate">{a.title}</p>
                    <p className="text-xs text-zinc-500">{a.subjects?.name}</p>
                    {a.due_date && (
                      <p className={`text-xs mt-0.5 ${overdue ? 'text-red-600' : 'text-zinc-400'}`}>
                        {overdue ? 'Overdue: ' : 'Due: '}{formatDate(a.due_date)}
                      </p>
                    )}
                  </div>
                </div>
              )
            }) : (
              <p className="text-sm text-zinc-400 text-center py-6">No active assignments.</p>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Notices */}
        <Card className="border-zinc-200">
          <CardHeader><CardTitle className="text-zinc-900 text-base">School Notices</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {notices && notices.length > 0 ? notices.map((n: any) => (
              <div key={n.id} className="p-3 border border-zinc-200 rounded-lg bg-zinc-50">
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="outline" className="text-xs capitalize border-zinc-300 text-zinc-600">{n.type}</Badge>
                  <span className="text-xs text-zinc-400">{formatDate(n.created_at)}</span>
                </div>
                <p className="font-medium text-sm text-zinc-900">{n.title}</p>
                <p className="text-xs text-zinc-500 mt-0.5 line-clamp-2">{n.body}</p>
              </div>
            )) : (
              <p className="text-sm text-zinc-400 text-center py-4">No notices published.</p>
            )}
          </CardContent>
        </Card>

        {/* Resources */}
        <Card className="border-zinc-200">
          <CardHeader>
            <CardTitle className="text-zinc-900 text-base">Study Materials</CardTitle>
            <CardDescription>Latest resources from your teachers.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {materials && materials.length > 0 ? materials.map((m: any) => (
              <a key={m.id} href={m.file_url} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 border border-zinc-200 rounded-lg bg-zinc-50 hover:border-zinc-400 hover:bg-zinc-100 transition-colors group"
              >
                <div className="h-8 w-8 rounded-md bg-zinc-200 flex items-center justify-center shrink-0">
                  <FileText className="h-4 w-4 text-zinc-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-zinc-900 group-hover:underline underline-offset-2 truncate">{m.title}</p>
                  <p className="text-xs text-zinc-500">{m.subjects?.name}</p>
                </div>
                <span className="text-xs text-zinc-400 shrink-0">Open →</span>
              </a>
            )) : (
              <p className="text-sm text-zinc-400 text-center py-4">No resources uploaded yet.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
