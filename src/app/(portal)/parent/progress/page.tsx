import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { calculateGrade, formatDate, getInitials } from '@/lib/utils'

export const metadata = { title: 'Child Progress' }

const GRADE_COLORS: Record<string, string> = {
  'A+': 'bg-zinc-900 text-white', 'A': 'bg-zinc-700 text-white',
  'B+': 'bg-zinc-500 text-white', 'B': 'bg-zinc-300 text-zinc-800',
  'C': 'bg-zinc-200 text-zinc-700', 'F': 'bg-red-100 text-red-700',
}

export default async function ParentProgressPage({ searchParams }: { searchParams: Promise<{ child?: string }> }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const params = await searchParams
  const focusChildId = params.child

  const { data: links } = await supabase
    .from('parent_students')
    .select('profiles!parent_students_student_id_fkey(id, full_name, email)')
    .eq('parent_id', user.id)

  const children = (links?.map(l => l.profiles).filter(Boolean) || []) as any[]
  const childIds = children.map(c => c.id)

  const { data: allMarks } = childIds.length > 0
    ? await supabase.from('marks')
      .select('id, student_id, marks_obtained, total_marks, remarks, subjects(name, code), exams(name)')
      .in('student_id', childIds)
      .order('created_at', { ascending: false })
    : { data: [] }

  const displayChildren = focusChildId
    ? children.filter(c => c.id === focusChildId)
    : children

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900">Child Progress</h1>
        <p className="text-sm text-zinc-500 mt-0.5">Detailed academic performance per child.</p>
      </div>

      {displayChildren.map(child => {
        const childMarks = (allMarks || []).filter(m => m.student_id === child.id)
        const byExam: Record<string, typeof childMarks> = {}
        for (const m of childMarks) {
          const key = (m.exams as any)?.name || 'Unknown Exam'
          if (!byExam[key]) byExam[key] = []
          byExam[key].push(m)
        }

        const avgPct = childMarks.length > 0
          ? (childMarks.reduce((s, m) => s + (m.marks_obtained && m.total_marks ? (m.marks_obtained / m.total_marks) * 100 : 0), 0) / childMarks.length).toFixed(1)
          : null

        return (
          <div key={child.id} className="space-y-4">
            {/* Child Header */}
            <div className="flex items-center gap-3 p-4 bg-white border border-zinc-200 rounded-lg">
              <div className="h-12 w-12 rounded-full bg-zinc-900 text-white flex items-center justify-center font-bold text-lg">
                {getInitials(child.full_name)}
              </div>
              <div>
                <h2 className="font-bold text-zinc-900">{child.full_name}</h2>
                <p className="text-sm text-zinc-500">{child.email}</p>
              </div>
              {avgPct && (
                <div className="ml-auto text-right">
                  <div className="text-2xl font-bold text-zinc-900">{avgPct}%</div>
                  <div className="text-xs text-zinc-500">Overall average</div>
                </div>
              )}
            </div>

            {/* Marks by Exam */}
            {Object.keys(byExam).length === 0 ? (
              <Card className="border-zinc-200">
                <CardContent className="py-10 text-center text-zinc-400 text-sm">No marks recorded yet.</CardContent>
              </Card>
            ) : Object.entries(byExam).map(([examName, examMarks]) => {
              const obtained = (examMarks || []).reduce((s, m) => s + (m.marks_obtained || 0), 0)
              const max = (examMarks || []).reduce((s, m) => s + (m.total_marks || 100), 0)
              const pct = max > 0 ? ((obtained / max) * 100).toFixed(1) : '0'
              return (
                <Card key={examName} className="border-zinc-200">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-zinc-900 text-sm font-semibold">{examName}</CardTitle>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-zinc-500">{obtained}/{max}</span>
                        <Badge className={`border-0 text-xs ${Number(pct) >= 50 ? 'bg-zinc-900 text-white' : 'bg-red-100 text-red-700'}`}>{pct}%</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <Table>
                      <TableHeader>
                        <TableRow className="bg-zinc-50 hover:bg-zinc-50">
                          {['Subject', 'Marks', '%', 'Grade', 'Remarks'].map(h => (
                            <TableHead key={h} className="text-zinc-500 font-medium text-xs">{h}</TableHead>
                          ))}
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {(examMarks || []).map((m: any) => {
                          const p = m.marks_obtained && m.total_marks ? (m.marks_obtained / m.total_marks) * 100 : 0
                          const grade = p > 0 ? calculateGrade(m.marks_obtained, m.total_marks) : '—'
                          return (
                            <TableRow key={m.id} className="border-zinc-100 hover:bg-zinc-50">
                              <TableCell className="text-sm font-medium text-zinc-900">{m.subjects?.name}</TableCell>
                              <TableCell className="font-mono text-sm">{m.marks_obtained ?? '—'}/{m.total_marks ?? 100}</TableCell>
                              <TableCell className="font-mono text-sm text-zinc-600">{p > 0 ? `${p.toFixed(1)}%` : '—'}</TableCell>
                              <TableCell>
                                <Badge className={`text-xs border-0 ${grade !== '—' ? GRADE_COLORS[grade] : 'bg-zinc-100 text-zinc-400'}`}>{grade}</Badge>
                              </TableCell>
                              <TableCell className="text-zinc-400 italic text-xs">{m.remarks || '—'}</TableCell>
                            </TableRow>
                          )
                        })}
                      </TableBody>
                    </Table>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}
