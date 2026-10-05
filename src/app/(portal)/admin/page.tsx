import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { DashboardClient } from './DashboardClient'

export default async function AdminDashboard() {
  const supabase = await createClient()

  // Fetch stats for the dashboard
  const [
    { count: studentCount },
    { count: teacherCount },
    { count: contentCount },
    { data: recentUsers }
  ] = await Promise.all([
    supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('role', 'student'),
    supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('role', 'teacher'),
    supabase.from('content').select('*', { count: 'exact', head: true }),
    supabase.from('profiles').select('*').order('created_at', { ascending: false }).limit(5)
  ])

  const stats = {
    students: studentCount || 0,
    teachers: teacherCount || 0,
    content: contentCount || 0,
  }

  return <DashboardClient stats={stats} recentUsers={recentUsers || []} />
}
