'use client'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { Bar, BarChart, XAxis, YAxis } from 'recharts'
import { Users, GraduationCap, FileText, Download, Activity, TrendingUp, UserPlus } from 'lucide-react'
import Link from 'next/link'
import { getInitials, formatDate } from '@/lib/utils'
import type { Profile } from '@/lib/types'

interface DashboardClientProps {
  stats: { students: number; teachers: number; content: number }
  recentUsers: Partial<Profile>[]
}

const activityData = [
  { day: 'Mon', logins: 150, active: 120 },
  { day: 'Tue', logins: 280, active: 230 },
  { day: 'Wed', logins: 360, active: 340 },
  { day: 'Thu', logins: 310, active: 290 },
  { day: 'Fri', logins: 420, active: 380 },
  { day: 'Sat', logins: 180, active: 150 },
  { day: 'Sun', logins: 210, active: 190 },
]

const ROLE_BADGE: Record<string, string> = {
  admin: 'bg-zinc-900 text-white',
  teacher: 'bg-zinc-700 text-white',
  student: 'bg-zinc-200 text-zinc-800',
  parent: 'bg-zinc-100 text-zinc-700',
}

const STAT_CARDS = [
  { label: 'Total Students', key: 'students' as const, icon: GraduationCap, trend: '+12% from last month' },
  { label: 'Faculty Members', key: 'teachers' as const, icon: Users, trend: '+2 new this week' },
  { label: 'Published Content', key: 'content' as const, icon: FileText, trend: 'News, Notices & Blogs' },
  { label: 'Active Sessions', key: null, icon: Activity, value: 142, trend: 'Currently online' },
]

export function DashboardClient({ stats, recentUsers }: DashboardClientProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Dashboard</h1>
          <p className="text-sm text-zinc-500 mt-0.5">Overview of portal activity and school metrics.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href="/admin/users"><UserPlus className="w-4 h-4 mr-1.5" />Add User</Link>
          </Button>
          <Button size="sm" className="bg-zinc-900 hover:bg-zinc-700 text-white">
            <Download className="w-4 h-4 mr-1.5" />Export
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-zinc-100 border border-zinc-200">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Stat cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {STAT_CARDS.map(({ label, key, icon: Icon, value, trend }) => (
              <Card key={label} className="border-zinc-200 hover:border-zinc-300 transition-colors">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-zinc-500">{label}</CardTitle>
                  <div className="h-8 w-8 rounded-md bg-zinc-100 flex items-center justify-center">
                    <Icon className="h-4 w-4 text-zinc-700" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-zinc-900">
                    {key ? stats[key] : value}
                  </div>
                  <p className="text-xs text-zinc-400 mt-1 flex items-center gap-1">
                    {key === 'students' || key === 'teachers' ? <TrendingUp className="w-3 h-3 text-emerald-500" /> : null}
                    {trend}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Chart + Recent Users */}
          <div className="grid gap-6 lg:grid-cols-7">
            <Card className="col-span-4 border-zinc-200">
              <CardHeader>
                <CardTitle className="text-zinc-900">Weekly Activity</CardTitle>
                <CardDescription>Portal logins vs. active sessions.</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    logins: { label: 'Logins', color: '#d4d4d8' },
                    active: { label: 'Active', color: '#09090b' },
                  }}
                  className="h-[260px] w-full"
                >
                  <BarChart data={activityData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                    <XAxis dataKey="day" stroke="#a1a1aa" fontSize={11} tickLine={false} axisLine={false} />
                    <YAxis stroke="#a1a1aa" fontSize={11} tickLine={false} axisLine={false} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="logins" fill="var(--color-logins)" radius={[3, 3, 0, 0]} />
                    <Bar dataKey="active" fill="var(--color-active)" radius={[3, 3, 0, 0]} />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card className="col-span-3 border-zinc-200">
              <CardHeader>
                <CardTitle className="text-zinc-900">Recent Registrations</CardTitle>
                <CardDescription>Latest users added to the portal.</CardDescription>
              </CardHeader>
              <CardContent>
                {recentUsers.length === 0 ? (
                  <p className="text-sm text-zinc-400 text-center py-6">No users yet.</p>
                ) : (
                  <div className="space-y-4">
                    {recentUsers.map((u, i) => (
                      <div key={u.id || i} className="flex items-center gap-3">
                        <Avatar className="h-9 w-9 border border-zinc-200">
                          <AvatarFallback className="bg-zinc-900 text-white text-xs font-bold">
                            {getInitials(u.full_name)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-zinc-900 truncate">{u.full_name || 'Unknown'}</p>
                          <p className="text-xs text-zinc-400 truncate">{u.email}</p>
                        </div>
                        <Badge className={`capitalize text-xs ${ROLE_BADGE[u.role || 'student']}`} variant="secondary">
                          {u.role}
                        </Badge>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics">
          <Card className="border-zinc-200">
            <CardHeader>
              <CardTitle>Detailed Analytics</CardTitle>
              <CardDescription>Deeper module usage and content performance metrics.</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] flex items-center justify-center">
              <p className="text-zinc-400 text-sm">Analytics dashboard — coming soon.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
