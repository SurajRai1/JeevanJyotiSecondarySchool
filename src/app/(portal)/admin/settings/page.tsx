import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Settings, Shield, Database, Info } from 'lucide-react'

export const metadata = { title: 'Settings' }

export default async function AdminSettingsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { data: profile } = await supabase.from('profiles').select('full_name, email, role, created_at').eq('id', user!.id).single()
  const { data: yearData } = await supabase.from('academic_years').select('name, is_active').eq('is_active', true).single()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900">Settings</h1>
        <p className="text-sm text-zinc-500 mt-0.5">Portal configuration and account information.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Account Info */}
        <Card className="border-zinc-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-zinc-900 text-base">
              <Settings className="w-4 h-4" />Account
            </CardTitle>
            <CardDescription>Your administrator account details.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { label: 'Full Name', value: profile?.full_name || '—' },
              { label: 'Email', value: profile?.email || '—' },
              { label: 'Role', value: profile?.role || '—' },
              { label: 'Member Since', value: profile?.created_at ? new Date(profile.created_at).toLocaleDateString() : '—' },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between items-center py-2 border-b border-zinc-100 last:border-0">
                <span className="text-sm text-zinc-500">{label}</span>
                <span className="text-sm font-medium text-zinc-900 capitalize">{value}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Academic Year */}
        <Card className="border-zinc-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-zinc-900 text-base">
              <Database className="w-4 h-4" />Active Academic Year
            </CardTitle>
            <CardDescription>Current academic period for the school.</CardDescription>
          </CardHeader>
          <CardContent>
            {yearData ? (
              <div className="flex items-center gap-3 p-4 bg-zinc-50 rounded-lg border border-zinc-200">
                <div className="flex-1">
                  <p className="font-semibold text-zinc-900">{yearData.name}</p>
                  <p className="text-xs text-zinc-500 mt-0.5">Active year</p>
                </div>
                <Badge className="bg-emerald-100 text-emerald-700 border-0 text-xs">Active</Badge>
              </div>
            ) : (
              <p className="text-sm text-zinc-400 text-center py-4">No active academic year. Set one in Academic Setup.</p>
            )}
          </CardContent>
        </Card>

        {/* Security */}
        <Card className="border-zinc-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-zinc-900 text-base">
              <Shield className="w-4 h-4" />Security
            </CardTitle>
            <CardDescription>Portal security configuration status.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { label: 'Row Level Security', status: 'Enabled', ok: true },
              { label: 'Role-based Access', status: 'Enforced', ok: true },
              { label: 'Session Management', status: 'Via Supabase Auth', ok: true },
              { label: 'Data Encryption', status: 'At rest & in transit', ok: true },
            ].map(({ label, status, ok }) => (
              <div key={label} className="flex justify-between items-center py-2 border-b border-zinc-100 last:border-0">
                <span className="text-sm text-zinc-600">{label}</span>
                <Badge variant="outline" className={`text-xs ${ok ? 'border-emerald-200 text-emerald-700 bg-emerald-50' : 'border-red-200 text-red-700'}`}>
                  {status}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* About */}
        <Card className="border-zinc-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-zinc-900 text-base">
              <Info className="w-4 h-4" />About Portal
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { label: 'School', value: 'Jeevan Jyoti Higher Secondary School' },
              { label: 'Portal Version', value: '1.0.0' },
              { label: 'Framework', value: 'Next.js 16' },
              { label: 'Database', value: 'Supabase (PostgreSQL)' },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between items-center py-2 border-b border-zinc-100 last:border-0">
                <span className="text-sm text-zinc-500">{label}</span>
                <span className="text-sm font-medium text-zinc-900">{value}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
