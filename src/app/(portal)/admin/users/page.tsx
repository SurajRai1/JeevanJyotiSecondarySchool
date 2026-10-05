import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { UserManagementClient } from './UserManagementClient'

export default async function UsersPage() {
  const supabase = await createClient()

  // Ensure user is admin
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'admin') {
    redirect('/')
  }

  // Fetch all users (from public.profiles)
  const { data: users, error } = await supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false })

  return <UserManagementClient initialUsers={users || []} />
}
