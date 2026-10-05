import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { PortalSidebar } from '@/components/portal/PortalSidebar'
import type { Role } from '@/lib/types'

export default async function PortalLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()

  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    redirect('/auth/login')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('id, role, full_name, email, created_at')
    .eq('id', user.id)
    .single()

  const role = (profile?.role as Role) || 'student'

  return (
    <div className="portal-scope min-h-screen flex flex-col md:flex-row">
      <PortalSidebar role={role} profile={profile} user={user} />
      <main className="flex-1 flex flex-col min-h-screen md:overflow-hidden">
        <div className="flex-1 md:overflow-y-auto p-4 md:p-8 bg-[#f4f4f5]">
          {children}
        </div>
      </main>
    </div>
  )
}
