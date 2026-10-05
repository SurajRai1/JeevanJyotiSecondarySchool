'use client'

import { useState, useTransition } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, Plus, Trash2, AlertCircle } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import type { AcademicYear, Class, Subject, Exam } from '@/lib/types'

type Field = { name: string; label: string; placeholder?: string; type?: string }
type SelectOpt = { name: string; label: string; options: { value: string; label: string }[] }

interface AcademicsClientProps {
  academicYears: AcademicYear[]
  classes: Class[]
  subjects: Subject[]
  exams: Exam[]
  teacherOptions: { id: string; full_name: string | null; email: string | null }[]
}

async function apiPost(url: string, body: object) {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  const json = await res.json()
  if (!res.ok) throw new Error(json.error || 'Request failed')
  return json.data
}

async function apiDelete(url: string, id: string) {
  const res = await fetch(`${url}?id=${id}`, { method: 'DELETE' })
  if (!res.ok) { const j = await res.json(); throw new Error(j.error || 'Delete failed') }
}

export function AcademicsClient({ academicYears: initYears, classes: initClasses, subjects: initSubjects, exams: initExams, teacherOptions }: AcademicsClientProps) {
  const [years, setYears] = useState(initYears)
  const [classes, setClasses] = useState(initClasses)
  const [subjects, setSubjects] = useState(initSubjects)
  const [exams, setExams] = useState(initExams)
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  function add<T>(setter: React.Dispatch<React.SetStateAction<T[]>>) {
    return (url: string, body: object) => {
      setError(null)
      startTransition(async () => {
        try {
          const data = await apiPost(url, body)
          setter(prev => [data, ...prev])
        } catch (e: any) { setError(e.message) }
      })
    }
  }

  function remove<T extends { id: string }>(setter: React.Dispatch<React.SetStateAction<T[]>>) {
    return (url: string, id: string) => {
      setError(null)
      setter(prev => prev.filter(i => i.id !== id))
      startTransition(async () => {
        try { await apiDelete(url, id) }
        catch (e: any) { setError(e.message) }
      })
    }
  }

  const addYear    = add(setYears)
  const addClass   = add(setClasses)
  const addSubject = add(setSubjects)
  const addExam    = add(setExams)
  const delYear    = remove(setYears)
  const delClass   = remove(setClasses)
  const delSubject = remove(setSubjects)
  const delExam    = remove(setExams)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900">Academic Setup</h1>
        <p className="text-sm text-zinc-500 mt-0.5">Manage academic years, classes, subjects, and exams.</p>
      </div>
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="years" className="space-y-4">
        <TabsList className="bg-zinc-100 border border-zinc-200">
          <TabsTrigger value="years">Academic Years</TabsTrigger>
          <TabsTrigger value="classes">Classes</TabsTrigger>
          <TabsTrigger value="subjects">Subjects</TabsTrigger>
          <TabsTrigger value="exams">Exams</TabsTrigger>
          <TabsTrigger value="assignments">Teacher Assignments</TabsTrigger>
        </TabsList>

        {/* ACADEMIC YEARS */}
        <TabsContent value="years" className="space-y-4">
          <QuickForm
            title="Add Academic Year"
            fields={[
              { name: 'name', label: 'Year Name', placeholder: '2026-2027' },
              { name: 'start_date', label: 'Start Date', type: 'date' },
              { name: 'end_date', label: 'End Date', type: 'date' },
            ]}
            onSubmit={d => addYear('/api/admin/academic-years', d)}
            isPending={isPending}
          />
          <ItemGrid items={years} onDelete={id => delYear('/api/admin/academic-years', id)}
            renderItem={(y: AcademicYear) => (
              <>
                <p className="font-semibold text-zinc-900">{y.name}</p>
                <p className="text-xs text-zinc-500">{y.start_date} → {y.end_date}</p>
                {y.is_active && <Badge className="mt-1 text-xs bg-emerald-100 text-emerald-700 border-0">Active</Badge>}
              </>
            )}
          />
        </TabsContent>

        {/* CLASSES */}
        <TabsContent value="classes" className="space-y-4">
          <QuickForm
            title="Add Class"
            fields={[
              { name: 'name', label: 'Class Name', placeholder: 'Grade 10' },
              { name: 'section', label: 'Section', placeholder: 'A' },
            ]}
            selects={[{ name: 'academic_year_id', label: 'Academic Year', options: years.map(y => ({ value: y.id, label: y.name })) }]}
            onSubmit={d => addClass('/api/admin/classes', d)}
            isPending={isPending}
          />
          <ItemGrid items={classes} onDelete={id => delClass('/api/admin/classes', id)}
            renderItem={(c: Class) => (
              <>
                <p className="font-semibold text-zinc-900">{c.name} — Section {c.section}</p>
                <p className="text-xs text-zinc-500">{c.academic_years?.name || 'No year'}</p>
              </>
            )}
          />
        </TabsContent>

        {/* SUBJECTS */}
        <TabsContent value="subjects" className="space-y-4">
          <QuickForm
            title="Add Subject"
            fields={[
              { name: 'name', label: 'Subject Name', placeholder: 'Mathematics' },
              { name: 'code', label: 'Code', placeholder: 'MATH-10' },
            ]}
            selects={[{ name: 'class_id', label: 'Assign to Class', options: classes.map(c => ({ value: c.id, label: `${c.name} — ${c.section}` })) }]}
            onSubmit={d => addSubject('/api/admin/subjects', d)}
            isPending={isPending}
          />
          <ItemGrid items={subjects} onDelete={id => delSubject('/api/admin/subjects', id)}
            renderItem={(s: Subject) => (
              <div className="flex items-center justify-between gap-2">
                <div>
                  <p className="font-semibold text-zinc-900">{s.name}</p>
                  <p className="text-xs text-zinc-500">{s.classes?.name} — {s.classes?.section}</p>
                </div>
                <Badge variant="secondary" className="text-xs shrink-0">{s.code}</Badge>
              </div>
            )}
          />
        </TabsContent>

        {/* EXAMS */}
        <TabsContent value="exams" className="space-y-4">
          <QuickForm
            title="Add Exam"
            fields={[{ name: 'name', label: 'Exam Name', placeholder: 'Mid-Term 2026' }]}
            selects={[{ name: 'academic_year_id', label: 'Academic Year', options: years.map(y => ({ value: y.id, label: y.name })) }]}
            onSubmit={d => addExam('/api/admin/exams', d)}
            isPending={isPending}
          />
          <ItemGrid items={exams} onDelete={id => delExam('/api/admin/exams', id)}
            renderItem={(e: Exam) => (
              <>
                <p className="font-semibold text-zinc-900">{e.name}</p>
                <p className="text-xs text-zinc-500">{e.academic_years?.name} • {formatDate(e.created_at)}</p>
              </>
            )}
          />
        </TabsContent>

        {/* TEACHER SUBJECT ASSIGNMENTS */}
        <TabsContent value="assignments" className="space-y-4">
          <QuickForm
            title="Assign Teacher to Subject"
            selects={[
              { name: 'teacher_id', label: 'Teacher', options: teacherOptions.map(t => ({ value: t.id, label: t.full_name || t.email || t.id })) },
              { name: 'subject_id', label: 'Subject', options: subjects.map(s => ({ value: s.id, label: `${s.name} (${s.code})` })) },
            ]}
            onSubmit={d => {
              setError(null)
              startTransition(async () => {
                try { await apiPost('/api/admin/teacher-subjects', d) }
                catch (e: any) { setError(e.message) }
              })
            }}
            isPending={isPending}
          />
          <p className="text-xs text-zinc-400">Assignments saved. Teachers can now see these subjects in their marksheets.</p>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function QuickForm({ title, fields = [], selects = [], onSubmit, isPending }: {
  title: string; fields?: Field[]; selects?: SelectOpt[]; onSubmit: (d: Record<string, string>) => void; isPending: boolean
}) {
  const [values, setValues] = useState<Record<string, string>>({})

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSubmit(values)
    setValues({})
  }

  return (
    <Card className="border-zinc-200">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold text-zinc-900">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-wrap gap-3 items-end">
          {fields.map(f => (
            <div key={f.name} className="space-y-1.5 flex-1 min-w-36">
              <Label className="text-xs text-zinc-600">{f.label}</Label>
              <Input
                required
                type={f.type || 'text'}
                placeholder={f.placeholder}
                value={values[f.name] || ''}
                onChange={e => setValues(v => ({ ...v, [f.name]: e.target.value }))}
                className="border-zinc-300 h-9 text-sm"
              />
            </div>
          ))}
          {selects.map(s => (
            <div key={s.name} className="space-y-1.5 flex-1 min-w-40">
              <Label className="text-xs text-zinc-600">{s.label}</Label>
              <Select value={values[s.name] || ''} onValueChange={(v: string | null) => v && setValues(p => ({ ...p, [s.name]: v }))}>
                <SelectTrigger className="border-zinc-300 h-9 text-sm">
                  <SelectValue placeholder={`Select ${s.label}`} />
                </SelectTrigger>
                <SelectContent>
                  {s.options.map(o => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          ))}
          <Button type="submit" disabled={isPending} size="sm" className="bg-zinc-900 hover:bg-zinc-700 text-white h-9">
            {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
            Add
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

function ItemGrid<T extends { id: string }>({ items, renderItem, onDelete }: {
  items: T[]; renderItem: (item: T) => React.ReactNode; onDelete: (id: string) => void
}) {
  if (items.length === 0) {
    return <p className="text-center text-zinc-400 py-8 text-sm">Nothing added yet.</p>
  }
  return (
    <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
      {items.map(item => (
        <Card key={item.id} className="border-zinc-200 hover:border-zinc-300 transition-colors group">
          <CardContent className="p-4 flex justify-between gap-3">
            <div className="flex-1 min-w-0">{renderItem(item)}</div>
            <Button
              variant="ghost" size="icon"
              onClick={() => onDelete(item.id)}
              className="h-7 w-7 opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-600 hover:bg-red-50 shrink-0"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
