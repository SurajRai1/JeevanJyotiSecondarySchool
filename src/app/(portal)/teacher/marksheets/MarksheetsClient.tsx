'use client'

import { useState, useTransition } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, Save, Printer, CheckCircle2, AlertCircle } from 'lucide-react'
import { calculateGrade, cn } from '@/lib/utils'
import type { Exam, Mark } from '@/lib/types'

interface Subject { id: string; name: string; code: string }
interface Student { id: string; full_name: string | null; email: string | null }

interface MarksheetsClientProps {
  exams: Exam[]
  teacherSubjects: { subject_id: string; subjects: Subject }[]
  students: Student[]
  existingMarks: Mark[]
}

const GRADE_COLORS: Record<string, string> = {
  'A+': 'bg-zinc-900 text-white',
  'A':  'bg-zinc-700 text-white',
  'B+': 'bg-zinc-500 text-white',
  'B':  'bg-zinc-300 text-zinc-800',
  'C':  'bg-zinc-200 text-zinc-700',
  'F':  'bg-red-100 text-red-700',
}

export function MarksheetsClient({ exams, teacherSubjects, students, existingMarks }: MarksheetsClientProps) {
  const [selectedExam, setSelectedExam] = useState(exams[0]?.id || '')
  const [selectedSubject, setSelectedSubject] = useState(teacherSubjects[0]?.subject_id || '')
  const [edits, setEdits] = useState<Record<string, { marks: string; total: string; remarks: string }>>({})
  const [isPending, startTransition] = useTransition()
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const selectedSubjectData = teacherSubjects.find(ts => ts.subject_id === selectedSubject)?.subjects

  function getField(studentId: string, field: 'marks' | 'total' | 'remarks'): string {
    if (edits[studentId]?.[field] !== undefined) return edits[studentId][field]
    const existing = existingMarks.find(m => m.student_id === studentId && m.exam_id === selectedExam && m.subject_id === selectedSubject)
    if (!existing) return ''
    if (field === 'marks') return existing.marks_obtained?.toString() ?? ''
    if (field === 'total') return existing.total_marks?.toString() ?? ''
    return existing.remarks ?? ''
  }

  function setField(studentId: string, field: 'marks' | 'total' | 'remarks', value: string) {
    setEdits(prev => ({ ...prev, [studentId]: { ...prev[studentId], [field]: value } }))
  }

  function handleSave() {
    setError(null)
    startTransition(async () => {
      try {
        const payload = students
          .map(s => ({
            student_id: s.id,
            exam_id: selectedExam,
            subject_id: selectedSubject,
            marks_obtained: parseFloat(getField(s.id, 'marks')) || null,
            total_marks: parseFloat(getField(s.id, 'total')) || 100,
            remarks: getField(s.id, 'remarks') || null,
          }))
          .filter(p => p.marks_obtained !== null)

        const res = await fetch('/api/marks', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        if (!res.ok) throw new Error((await res.json()).error || 'Failed to save')
        setSaved(true)
        setTimeout(() => setSaved(false), 3000)
      } catch (err: any) {
        setError(err.message)
      }
    })
  }

  if (exams.length === 0) {
    return (
      <Card className="border-zinc-200">
        <CardContent className="py-16 text-center">
          <p className="text-zinc-400 text-sm">No exams found. Ask Admin to create exam records first.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Marksheets</h1>
          <p className="text-sm text-zinc-500 mt-0.5">Enter and manage student grades by exam and subject.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => window.print()}>
            <Printer className="w-4 h-4 mr-1.5" />Print
          </Button>
          <Button size="sm" onClick={handleSave} disabled={isPending}
            className={cn('min-w-28', saved ? 'bg-emerald-700 hover:bg-emerald-800' : 'bg-zinc-900 hover:bg-zinc-700')}
          >
            {isPending ? <Loader2 className="w-4 h-4 animate-spin mr-1.5" />
              : saved ? <CheckCircle2 className="w-4 h-4 mr-1.5" />
              : <Save className="w-4 h-4 mr-1.5" />}
            {saved ? 'Saved!' : 'Save Marks'}
          </Button>
        </div>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label className="text-zinc-700">Exam</Label>
          <Select value={selectedExam} onValueChange={v => { v && setSelectedExam(v); setEdits({}) }}>
            <SelectTrigger className="border-zinc-300"><SelectValue placeholder="Choose exam..." /></SelectTrigger>
            <SelectContent>
              {exams.map(e => <SelectItem key={e.id} value={e.id}>{e.name}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <Label className="text-zinc-700">Subject</Label>
          <Select value={selectedSubject} onValueChange={v => { v && setSelectedSubject(v); setEdits({}) }}>
            <SelectTrigger className="border-zinc-300"><SelectValue placeholder="Choose subject..." /></SelectTrigger>
            <SelectContent>
              {teacherSubjects.map(ts => (
                <SelectItem key={ts.subject_id} value={ts.subject_id}>
                  {ts.subjects.name} ({ts.subjects.code})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card className="border-zinc-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-zinc-900 text-base">
            {selectedSubjectData?.name || 'Subject'} — {exams.find(e => e.id === selectedExam)?.name || 'Exam'}
          </CardTitle>
          <CardDescription>Enter marks per student. Leave blank to skip.</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {students.length === 0 ? (
            <p className="text-center text-zinc-400 py-10 text-sm">No students enrolled in this class.</p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-zinc-50 hover:bg-zinc-50">
                    <TableHead className="text-zinc-500 font-medium pl-6">Student</TableHead>
                    <TableHead className="text-zinc-500 font-medium w-28">Marks</TableHead>
                    <TableHead className="text-zinc-500 font-medium w-28">Out of</TableHead>
                    <TableHead className="text-zinc-500 font-medium w-20">%</TableHead>
                    <TableHead className="text-zinc-500 font-medium w-16">Grade</TableHead>
                    <TableHead className="text-zinc-500 font-medium">Remarks</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {students.map(s => {
                    const marks = parseFloat(getField(s.id, 'marks'))
                    const total = parseFloat(getField(s.id, 'total')) || 100
                    const pct = marks ? ((marks / total) * 100).toFixed(1) : null
                    const grade = marks ? calculateGrade(marks, total) : null
                    return (
                      <TableRow key={s.id} className="border-zinc-100 hover:bg-zinc-50">
                        <TableCell className="pl-6">
                          <p className="font-medium text-sm text-zinc-900">{s.full_name}</p>
                          <p className="text-xs text-zinc-400">{s.email}</p>
                        </TableCell>
                        <TableCell>
                          <Input type="number" min="0" placeholder="0" value={getField(s.id, 'marks')}
                            onChange={e => setField(s.id, 'marks', e.target.value)}
                            className="h-8 w-20 border-zinc-300 text-sm" />
                        </TableCell>
                        <TableCell>
                          <Input type="number" min="1" placeholder="100" value={getField(s.id, 'total')}
                            onChange={e => setField(s.id, 'total', e.target.value)}
                            className="h-8 w-20 border-zinc-300 text-sm" />
                        </TableCell>
                        <TableCell className="text-sm text-zinc-600 font-mono">{pct ? `${pct}%` : '—'}</TableCell>
                        <TableCell>
                          {grade && grade !== '—' ? (
                            <Badge className={cn('text-xs border-0', GRADE_COLORS[grade])}>{grade}</Badge>
                          ) : <span className="text-zinc-300">—</span>}
                        </TableCell>
                        <TableCell>
                          <Input placeholder="Optional..." value={getField(s.id, 'remarks')}
                            onChange={e => setField(s.id, 'remarks', e.target.value)}
                            className="h-8 min-w-40 border-zinc-300 text-sm" />
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
