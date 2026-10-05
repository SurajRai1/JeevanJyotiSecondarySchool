import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { calculateGrade } from '@/lib/utils'

export const metadata = { title: 'My Marks' }

const GRADE_COLORS: Record<string, string> = {
  'A+': 'bg-zinc-900 text-white',  'A': 'bg-zinc-700 text-white',
  'B+': 'bg-zinc-500 text-white',  'B': 'bg-zinc-300 text-zinc-800',
  'C':  'bg-zinc-200 text-zinc-700', 'F': 'bg-red-100 text-red-700',
}

export default async function StudentMarksPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data: marks } = await supabase
    .from('marks')
    .select('id, marks_obtained, total_marks, remarks, subjects(name, code), exams(name, academic_years(name))')
    .eq('student_id', user.id)
    .order('created_at', { ascending: false })

  // Group by exam
  const byExam: Record<string, typeof marks> = {}
  for (const m of marks || []) {
    const key = (m.exams as any)?.name || 'Unknown Exam'
    if (!byExam[key]) byExam[key] = []
    byExam[key]!.push(m)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900">My Marks</h1>
        <p className="text-sm text-zinc-500 mt-0.5">Your complete academic performance record.</p>
      </div>

      {Object.keys(byExam).length === 0 ? (
        <Card className="border-zinc-200">
          <CardContent className="py-16 text-center text-zinc-400 text-sm">
            No marks recorded yet. Check back after your exams.
          </CardContent>
        </Card>
      ) : Object.entries(byExam).map(([examName, examMarks]) => {
        const obtained = (examMarks || []).reduce((s, m) => s + (m.marks_obtained || 0), 0)
        const max = (examMarks || []).reduce((s, m) => s + (m.total_marks || 100), 0)
        const pct = max > 0 ? ((obtained / max) * 100).toFixed(1) : '0'
        return (
          <Card key={examName} className="border-zinc-200">
            <CardHeader className="pb-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <CardTitle className="text-zinc-900 text-base">{examName}</CardTitle>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-zinc-500">{obtained}/{max}</span>
                  <Badge className={`text-sm px-3 py-1 border-0 ${Number(pct) >= 50 ? 'bg-zinc-900 text-white' : 'bg-red-100 text-red-700'}`}>
                    {pct}%
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                <TableHeader>
                  <TableRow className="bg-zinc-50 hover:bg-zinc-50">
                    {['Subject', 'Code', 'Marks', '%', 'Grade', 'Remarks'].map(h => (
                      <TableHead key={h} className={`text-zinc-500 font-medium ${h === 'Marks' || h === '%' ? 'text-right' : h === 'Grade' ? 'text-center' : ''}`}>
                        {h}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {(examMarks || []).map((m: any) => {
                    const p = m.marks_obtained && m.total_marks ? (m.marks_obtained / m.total_marks) * 100 : 0
                    const grade = p > 0 ? calculateGrade(m.marks_obtained, m.total_marks) : '—'
                    return (
                      <TableRow key={m.id} className="border-zinc-100 hover:bg-zinc-50">
                        <TableCell className="font-medium text-zinc-900">{m.subjects?.name}</TableCell>
                        <TableCell className="text-zinc-500 text-sm">{m.subjects?.code}</TableCell>
                        <TableCell className="text-right font-mono text-sm text-zinc-900">{m.marks_obtained ?? '—'}/{m.total_marks ?? 100}</TableCell>
                        <TableCell className="text-right font-mono text-sm text-zinc-600">{p > 0 ? `${p.toFixed(1)}%` : '—'}</TableCell>
                        <TableCell className="text-center">
                          <Badge className={`text-xs border-0 ${grade !== '—' ? GRADE_COLORS[grade] : 'bg-zinc-100 text-zinc-400'}`}>{grade}</Badge>
                        </TableCell>
                        <TableCell className="text-zinc-400 italic text-xs max-w-48 truncate">{m.remarks || '—'}</TableCell>
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
}
