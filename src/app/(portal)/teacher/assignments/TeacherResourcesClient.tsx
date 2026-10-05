'use client'

import { useState, useTransition } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, Plus, Upload, FileText, Link as LinkIcon, AlertCircle, CheckCircle2 } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import type { Assignment, Material } from '@/lib/types'

interface Subject { id: string; name: string; code: string }
interface TeacherResourcesClientProps {
  teacherSubjects: { subject_id: string; subjects: Subject }[]
  assignments: Assignment[]
  materials: Material[]
}

export function TeacherResourcesClient({ teacherSubjects, assignments: initAssignments, materials: initMaterials }: TeacherResourcesClientProps) {
  const [assignmentList, setAssignmentList] = useState(initAssignments)
  const [materials, setMaterials] = useState(initMaterials)
  const [subject, setSubject] = useState(teacherSubjects[0]?.subject_id || '')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [fileUrl, setFileUrl] = useState('')
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const [saved, setSaved] = useState(false)

  function resetForm() { setTitle(''); setDescription(''); setDueDate(''); setFileUrl('') }

  async function post<T>(url: string, body: object, setter: (data: T) => void) {
    const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
    const json = await res.json()
    if (!res.ok) throw new Error(json.error || 'Request failed')
    setter(json.data)
  }

  function handleAssignment(e: React.FormEvent) {
    e.preventDefault(); setError(null)
    startTransition(async () => {
      try {
        await post<Assignment>('/api/assignments', { title, description, subject_id: subject, due_date: dueDate || null },
          (data) => setAssignmentList(prev => [data, ...prev]))
        resetForm(); setSaved(true); setTimeout(() => setSaved(false), 2500)
      } catch (err: any) { setError(err.message) }
    })
  }

  function handleResource(e: React.FormEvent) {
    e.preventDefault(); setError(null)
    startTransition(async () => {
      try {
        await post<Material>('/api/materials', { title, file_url: fileUrl, subject_id: subject },
          (data) => setMaterials(prev => [data, ...prev]))
        resetForm(); setSaved(true); setTimeout(() => setSaved(false), 2500)
      } catch (err: any) { setError(err.message) }
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900">Assignments & Resources</h1>
        <p className="text-sm text-zinc-500 mt-0.5">Post homework, quizzes, and study materials for your students.</p>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {saved && (
        <Alert className="border-emerald-200 bg-emerald-50 text-emerald-800">
          <CheckCircle2 className="h-4 w-4" />
          <AlertDescription>Saved successfully!</AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="assignments" className="space-y-6">
        <TabsList className="bg-zinc-100 border border-zinc-200">
          <TabsTrigger value="assignments">Assignments ({assignmentList.length})</TabsTrigger>
          <TabsTrigger value="resources">Resources ({materials.length})</TabsTrigger>
        </TabsList>

        {/* Assignments Tab */}
        <TabsContent value="assignments">
          <div className="grid gap-6 lg:grid-cols-5">
            <Card className="lg:col-span-2 border-zinc-200">
              <CardHeader>
                <CardTitle className="text-zinc-900 text-base">New Assignment</CardTitle>
                <CardDescription>Post homework or quizzes for your class.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAssignment} className="space-y-4">
                  <div className="space-y-1.5">
                    <Label>Subject</Label>
                    <Select value={subject} onValueChange={v => v && setSubject(v)}>
                      <SelectTrigger className="border-zinc-300"><SelectValue placeholder="Select subject" /></SelectTrigger>
                      <SelectContent>
                        {teacherSubjects.map(ts => <SelectItem key={ts.subject_id} value={ts.subject_id}>{ts.subjects.name}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="a-title">Title</Label>
                    <Input id="a-title" required value={title} onChange={e => setTitle(e.target.value)} placeholder="Assignment title..." className="border-zinc-300" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="a-desc">Instructions</Label>
                    <Textarea id="a-desc" value={description} onChange={e => setDescription(e.target.value)} rows={4} placeholder="Describe the assignment..." className="border-zinc-300 resize-none" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="a-due">Due Date (optional)</Label>
                    <Input id="a-due" type="datetime-local" value={dueDate} onChange={e => setDueDate(e.target.value)} className="border-zinc-300" />
                  </div>
                  <Button type="submit" disabled={isPending} className="w-full bg-zinc-900 hover:bg-zinc-700 text-white">
                    {isPending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Plus className="w-4 h-4 mr-2" />}
                    Post Assignment
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="lg:col-span-3 space-y-3">
              <h2 className="font-semibold text-zinc-900">Posted ({assignmentList.length})</h2>
              {assignmentList.length === 0 ? (
                <Card className="border-zinc-200 border-dashed">
                  <CardContent className="py-12 text-center text-zinc-400 text-sm">No assignments yet.</CardContent>
                </Card>
              ) : assignmentList.map((a: any) => (
                <Card key={a.id} className="border-zinc-200 hover:border-zinc-300 transition-colors">
                  <CardContent className="p-4 flex gap-3 items-start">
                    <div className="h-9 w-9 rounded-lg bg-zinc-100 flex items-center justify-center shrink-0">
                      <FileText className="h-4 w-4 text-zinc-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-zinc-900">{a.title}</p>
                      <p className="text-xs text-zinc-500 line-clamp-2 mt-0.5">{a.description || 'No instructions provided.'}</p>
                      {a.due_date && (
                        <Badge variant="outline" className="mt-1.5 text-xs border-zinc-300 text-zinc-600">
                          Due {formatDate(a.due_date)}
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Resources Tab */}
        <TabsContent value="resources">
          <div className="grid gap-6 lg:grid-cols-5">
            <Card className="lg:col-span-2 border-zinc-200">
              <CardHeader>
                <CardTitle className="text-zinc-900 text-base">Add Resource</CardTitle>
                <CardDescription>Share notes, PDFs, or links with your class.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleResource} className="space-y-4">
                  <div className="space-y-1.5">
                    <Label>Subject</Label>
                    <Select value={subject} onValueChange={v => v && setSubject(v)}>
                      <SelectTrigger className="border-zinc-300"><SelectValue placeholder="Select subject" /></SelectTrigger>
                      <SelectContent>
                        {teacherSubjects.map(ts => <SelectItem key={ts.subject_id} value={ts.subject_id}>{ts.subjects.name}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="r-title">Title</Label>
                    <Input id="r-title" required value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Chapter 5 Notes" className="border-zinc-300" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="r-url">File URL / Drive Link</Label>
                    <Input id="r-url" required value={fileUrl} onChange={e => setFileUrl(e.target.value)} placeholder="https://drive.google.com/..." className="border-zinc-300" />
                  </div>
                  <Button type="submit" disabled={isPending} className="w-full bg-zinc-900 hover:bg-zinc-700 text-white">
                    {isPending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Upload className="w-4 h-4 mr-2" />}
                    Add Resource
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="lg:col-span-3 space-y-3">
              <h2 className="font-semibold text-zinc-900">Uploaded ({materials.length})</h2>
              {materials.length === 0 ? (
                <Card className="border-zinc-200 border-dashed">
                  <CardContent className="py-12 text-center text-zinc-400 text-sm">No resources uploaded yet.</CardContent>
                </Card>
              ) : materials.map((m: any) => (
                <Card key={m.id} className="border-zinc-200 hover:border-zinc-300 transition-colors">
                  <CardContent className="p-4 flex gap-3 items-center">
                    <div className="h-9 w-9 rounded-lg bg-zinc-100 flex items-center justify-center shrink-0">
                      <LinkIcon className="h-4 w-4 text-zinc-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-zinc-900">{m.title}</p>
                      <p className="text-xs text-zinc-500">{m.subjects?.name} • {formatDate(m.created_at)}</p>
                    </div>
                    <a href={m.file_url} target="_blank" rel="noopener noreferrer"
                      className="text-xs text-zinc-900 hover:underline underline-offset-2 px-3 py-1.5 border border-zinc-300 rounded-md shrink-0 hover:bg-zinc-50"
                    >
                      Open →
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
