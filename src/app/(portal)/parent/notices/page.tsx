import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Bell, Newspaper, BookOpen } from 'lucide-react'
import { formatDate } from '@/lib/utils'

export const metadata = { title: 'School Notices' }

const TYPE_ICONS = { news: Newspaper, notice: Bell, blog: BookOpen }
const TYPE_BADGE: Record<string, string> = {
  news: 'border-zinc-900 text-zinc-900 bg-zinc-100',
  notice: 'border-zinc-700 text-zinc-700 bg-zinc-50',
  blog: 'border-zinc-400 text-zinc-600 bg-zinc-50',
}

export default async function ParentNoticesPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const [{ data: notices }, { data: assignments }] = await Promise.all([
    supabase.from('content').select('id, type, title, body, created_at')
      .eq('published', true).order('created_at', { ascending: false }),
    supabase.from('assignments').select('id, title, description, due_date, subjects(name)')
      .order('due_date', { ascending: true }).limit(10),
  ])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900">Notices & Announcements</h1>
        <p className="text-sm text-zinc-500 mt-0.5">School updates, news, and upcoming assignments.</p>
      </div>

      {/* Notices */}
      <Card className="border-zinc-200">
        <CardHeader>
          <CardTitle className="text-zinc-900 text-base flex items-center gap-2">
            <Bell className="w-4 h-4" />School Announcements ({notices?.length || 0})
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {notices && notices.length > 0 ? notices.map((n: any) => {
            const Icon = TYPE_ICONS[n.type as keyof typeof TYPE_ICONS] || Bell
            return (
              <div key={n.id} className="p-4 border border-zinc-200 rounded-lg bg-zinc-50 hover:border-zinc-300 transition-colors">
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-md bg-zinc-200 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon className="h-4 w-4 text-zinc-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <Badge variant="outline" className={`text-xs capitalize ${TYPE_BADGE[n.type]}`}>{n.type}</Badge>
                      <span className="text-xs text-zinc-400">{formatDate(n.created_at)}</span>
                    </div>
                    <h3 className="font-semibold text-zinc-900 text-sm">{n.title}</h3>
                    <p className="text-xs text-zinc-500 mt-1 leading-relaxed">{n.body}</p>
                  </div>
                </div>
              </div>
            )
          }) : (
            <div className="text-center py-10">
              <Bell className="h-10 w-10 text-zinc-300 mx-auto mb-3" />
              <p className="text-sm text-zinc-400">No notices published yet.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Upcoming Assignments */}
      <Card className="border-zinc-200">
        <CardHeader>
          <CardTitle className="text-zinc-900 text-base flex items-center gap-2">
            <BookOpen className="w-4 h-4" />Upcoming Assignments
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {assignments && assignments.length > 0 ? assignments.map((a: any) => {
            const isOverdue = a.due_date && new Date(a.due_date) < new Date()
            return (
              <div key={a.id} className="flex items-center justify-between p-3 border border-zinc-200 rounded-lg bg-zinc-50">
                <div>
                  <p className="font-medium text-sm text-zinc-900">{a.title}</p>
                  <p className="text-xs text-zinc-500">{a.subjects?.name}</p>
                </div>
                {a.due_date && (
                  <span className={`text-xs font-medium whitespace-nowrap ml-4 ${isOverdue ? 'text-red-600' : 'text-zinc-500'}`}>
                    {isOverdue ? 'Overdue: ' : 'Due: '}{formatDate(a.due_date)}
                  </span>
                )}
              </div>
            )
          }) : (
            <p className="text-sm text-zinc-400 text-center py-4">No assignments yet.</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
