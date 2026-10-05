'use client'

import { useState, useTransition } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { createContent, deleteContent, toggleContentPublished } from '@/actions/admin.actions'
import { Loader2, Plus, FileText, CheckCircle, Clock, Trash2, Eye, EyeOff, AlertCircle } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import type { Content, ContentType } from '@/lib/types'

const TYPE_BADGE: Record<ContentType, string> = {
  news:   'bg-zinc-900 text-white',
  notice: 'bg-zinc-700 text-white',
  blog:   'bg-zinc-100 text-zinc-700',
}

export function ContentManagerClient({ initialContents }: { initialContents: Content[] }) {
  const [contents, setContents] = useState(initialContents)
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  function handleCreate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    const form = e.currentTarget
    const formData = new FormData(form)

    startTransition(async () => {
      const res = await createContent(formData)
      if (res.error) { setError(res.error); return }
      form.reset()
      // Optimistic: revalidatePath will refresh, but reset form immediately
    })
  }

  function handleToggle(id: string, published: boolean) {
    setContents(prev => prev.map(c => c.id === id ? { ...c, published: !c.published } : c))
    startTransition(async () => {
      const res = await toggleContentPublished(id, published)
      if (res.error) setContents(prev => prev.map(c => c.id === id ? { ...c, published } : c))
    })
  }

  function handleDelete(id: string) {
    setContents(prev => prev.filter(c => c.id !== id))
    startTransition(async () => {
      const res = await deleteContent(id)
      if (res.error) setError(res.error || 'Failed to delete.')
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900">Content Manager</h1>
        <p className="text-sm text-zinc-500 mt-0.5">Create, edit, and publish school updates, news, and blogs.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Create Form */}
        <Card className="border-zinc-200 lg:sticky lg:top-6 self-start">
          <CardHeader className="pb-4">
            <CardTitle className="text-zinc-900 text-base">Create Content</CardTitle>
            <CardDescription>Publish announcements or blog posts.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreate} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-1.5">
                <Label>Type</Label>
                <Select name="type" defaultValue="news">
                  <SelectTrigger className="border-zinc-300"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="news">News</SelectItem>
                    <SelectItem value="notice">Notice</SelectItem>
                    <SelectItem value="blog">Blog</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="title">Title</Label>
                <Input id="title" name="title" required maxLength={200} placeholder="Post title..." className="border-zinc-300" />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="body">Content</Label>
                <Textarea
                  id="body"
                  name="body"
                  required
                  rows={5}
                  maxLength={5000}
                  placeholder="Write your content here..."
                  className="border-zinc-300 resize-none"
                />
              </div>

              <div className="flex items-center gap-2">
                <input type="checkbox" id="published" name="published" value="true"
                  className="w-4 h-4 rounded border-zinc-300 accent-zinc-900" />
                <Label htmlFor="published" className="font-normal text-zinc-600 cursor-pointer">Publish immediately</Label>
              </div>

              <Button type="submit" disabled={isPending} className="w-full bg-zinc-900 hover:bg-zinc-700 text-white">
                {isPending
                  ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Saving...</>
                  : <><Plus className="mr-2 h-4 w-4" />Create</>}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Content List */}
        <div className="lg:col-span-2 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-zinc-900">All Content ({contents.length})</h2>
          </div>
          {contents.length === 0 ? (
            <div className="border border-zinc-200 border-dashed rounded-lg py-16 text-center">
              <FileText className="h-10 w-10 text-zinc-300 mx-auto mb-3" />
              <p className="text-zinc-400 text-sm">No content yet. Create your first post.</p>
            </div>
          ) : contents.map(item => (
            <Card key={item.id} className="border-zinc-200 hover:border-zinc-300 transition-colors">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <Badge className={`capitalize text-xs border-0 ${TYPE_BADGE[item.type]}`} variant="secondary">
                        {item.type}
                      </Badge>
                      <Badge
                        variant="outline"
                        className={`text-xs ${item.published ? 'border-emerald-300 text-emerald-700 bg-emerald-50' : 'border-zinc-300 text-zinc-500'}`}
                      >
                        {item.published
                          ? <><CheckCircle className="w-3 h-3 mr-1" />Published</>
                          : <><Clock className="w-3 h-3 mr-1" />Draft</>}
                      </Badge>
                      <span className="text-xs text-zinc-400">{formatDate(item.created_at)}</span>
                    </div>
                    <h3 className="font-semibold text-zinc-900 text-sm">{item.title}</h3>
                    <p className="text-xs text-zinc-500 mt-1 line-clamp-2">{item.body}</p>
                    <p className="text-xs text-zinc-400 mt-1.5">By {item.profiles?.full_name || 'Unknown'}</p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleToggle(item.id, item.published ?? false)}
                      disabled={isPending}
                      title={item.published ? 'Unpublish' : 'Publish'}
                      className="h-8 w-8 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100"
                    >
                      {item.published ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(item.id)}
                      disabled={isPending}
                      title="Delete"
                      className="h-8 w-8 text-red-400 hover:text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
