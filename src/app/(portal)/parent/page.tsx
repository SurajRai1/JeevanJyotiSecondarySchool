import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { GraduationCap, User2 } from 'lucide-react'
import Link from 'next/link'
import { calculateGrade, formatDate, getInitials } from '@/lib/utils'

export const metadata = { title: 'Parent Dashboard' }

const GRADE_COLORS: Record<string, string> = {
  'A+': 'bg-zinc-900 text-white', 'A': 'bg-zinc-700 text-white',
  'B+': 'bg-zinc-500 text-white', 'B': 'bg-zinc-300 text-zinc-800',
  'C': 'bg-zinc-200 text-zinc-700', 'F': 'bg-red-100 text-red-700',
}

export default async function ParentDashboard() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data: links } = await supabase
    .from('parent_students')
    .select('profiles!parent_students_student_id_fkey(id, full_name, email)')
    .eq('parent_id', user.id)

  const children = (links?.map(l => l.profiles).filter(Boolean) || []) as any[]

  if (children.length === 0) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Parent Dashboard</h1>
          <p className="text-sm text-zinc-500 mt-0.5">Track your child's academic progress.</p>
        </div>
        <Card className="border-zinc-200">
          <CardContent className="py-20 text-center">
            <User2 className="h-12 w-12 text-zinc-300 mx-auto mb-4" />
            <h3 className="font-semibold text-zinc-900 mb-2">No Children Linked</h3>
            <p className="text-zinc-500 text-sm max-w-sm mx-auto">
              Your account hasn't been linked to a student yet. Please contact the school administrator.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const childIds = children.map(c => c.id)
  const [{ data: allMarks }, { data: notices }] = await Promise.all([
    supabase.from('marks')
      .select('id, student_id, marks_obtained, total_marks, remarks, subjects(name, code), exams(name), profiles!marks_student_id_fkey(full_name)')
      .in('student_id', childIds)
      .order('created_at', { ascending: false }),
    supabase.from('content').select('id, title, type, body, created_at').eq('published', true).order('created_at', { ascending: false }).limit(4),
  ])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900">Parent Dashboard</h1>
        <p className="text-sm text-zinc-500 mt-0.5">
          Academic overview for {children.length > 1 ? 'your children' : 'your child'}.
        </p>
      </div>

      {/* Children cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {children.map(child => {
          const childMarks = allMarks?.filter(m => m.student_id === child.id) || []
          const avgPct = childMarks.length > 0
            ? (childMarks.reduce((s, m) => s + (m.marks_obtained && m.total_marks ? (m.marks_obtained / m.total_marks) * 100 : 0), 0) / childMarks.length).toFixed(1)
            : null

          return (
            <Card key={child.id} className="border-zinc-200 hover:border-zinc-300 transition-colors">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="h-11 w-11 rounded-full bg-zinc-900 text-white flex items-center justify-center font-bold text-base shrink-0">
                    {getInitials(child.full_name)}
                  </div>
                  <div>
                    <CardTitle className="text-base text-zinc-900">{child.full_name}</CardTitle>
                    <p className="text-xs text-zinc-500">{child.email}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                {[
                  { label: 'Overall Average', value: avgPct ? `${avgPct}%` : '—' },
                  { label: 'Exams Recorded', value: childMarks.length },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between items-center p-2.5 rounded-lg bg-zinc-50 border border-zinc-200">
                    <span className="text-sm text-zinc-500">{label}</span>
                    <span className="font-bold text-zinc-900">{value}</span>
                  </div>
                ))}
                <Button asChild variant="outline" size="sm" className="w-full mt-1">
                  <Link href={`/parent/progress?child=${child.id}`}>
                    <GraduationCap className="w-4 h-4 mr-1.5" />View Full Report
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Recent results */}
      <Card className="border-zinc-200">
        <CardHeader>
          <CardTitle className="text-zinc-900 text-base">Recent Results</CardTitle>
          <CardDescription>Latest exam marks across all your children.</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {allMarks && allMarks.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
              <TableHeader>
                <TableRow className="bg-zinc-50 hover:bg-zinc-50">
                  {['Student', 'Subject', 'Exam', 'Score', 'Grade', 'Remarks'].map(h => (
                    <TableHead key={h} className={`text-zinc-500 font-medium ${h === 'Score' ? 'text-right' : h === 'Grade' ? 'text-center' : ''}`}>{h}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {allMarks.slice(0, 10).map((m: any) => {
                  const grade = m.marks_obtained && m.total_marks ? calculateGrade(m.marks_obtained, m.total_marks) : '—'
                  return (
                    <TableRow key={m.id} className="border-zinc-100 hover:bg-zinc-50">
                      <TableCell className="font-medium text-zinc-900">{m.profiles?.full_name}</TableCell>
                      <TableCell className="text-zinc-700 text-sm">{m.subjects?.name}</TableCell>
                      <TableCell className="text-zinc-500 text-sm">{m.exams?.name}</TableCell>
                      <TableCell className="text-right font-mono text-sm">{m.marks_obtained}/{m.total_marks}</TableCell>
                      <TableCell className="text-center">
                        <Badge className={`text-xs border-0 ${grade !== '—' ? GRADE_COLORS[grade] : 'bg-zinc-100 text-zinc-400'}`}>{grade}</Badge>
                      </TableCell>
                      <TableCell className="text-zinc-400 italic text-xs">{m.remarks || '—'}</TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
            </div>
          ) : (
            <p className="text-center text-zinc-400 py-10 text-sm">No results recorded yet.</p>
          )}
        </CardContent>
      </Card>

      {/* Notices */}
      <Card className="border-zinc-200">
        <CardHeader><CardTitle className="text-zinc-900 text-base">School Announcements</CardTitle></CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-2">
          {notices && notices.length > 0 ? notices.map(n => (
            <div key={n.id} className="p-4 border border-zinc-200 rounded-lg bg-zinc-50">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="text-xs capitalize border-zinc-300 text-zinc-600">{n.type}</Badge>
                <span className="text-xs text-zinc-400">{formatDate(n.created_at)}</span>
              </div>
              <p className="font-semibold text-sm text-zinc-900">{n.title}</p>
              <p className="text-xs text-zinc-500 mt-1 line-clamp-2">{n.body}</p>
            </div>
          )) : (
            <p className="text-zinc-400 text-sm col-span-2 text-center py-4">No announcements yet.</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
