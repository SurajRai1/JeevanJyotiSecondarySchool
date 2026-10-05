'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { createUserAction } from '@/actions/users.actions'
import { UserPlus, Loader2, CheckCircle2, Search, AlertCircle } from 'lucide-react'
import { cn, formatDate, getInitials } from '@/lib/utils'
import type { Profile } from '@/lib/types'

const ROLE_STYLES: Record<string, string> = {
  admin:   'bg-zinc-900 text-white hover:bg-zinc-800',
  teacher: 'bg-zinc-700 text-white hover:bg-zinc-600',
  student: 'bg-zinc-100 text-zinc-800 hover:bg-zinc-200',
  parent:  'bg-zinc-50 text-zinc-600 hover:bg-zinc-100',
}

export function UserManagementClient({ initialUsers }: { initialUsers: Partial<Profile>[] }) {
  const [users, setUsers] = useState(initialUsers)
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [search, setSearch] = useState('')

  const filtered = users.filter(u =>
    u.full_name?.toLowerCase().includes(search.toLowerCase()) ||
    u.email?.toLowerCase().includes(search.toLowerCase())
  )

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(false)

    const formData = new FormData(e.currentTarget)
    const result = await createUserAction(formData)

    if (result.error) {
      setError(result.error)
      setLoading(false)
    } else {
      setSuccess(true)
      const newUser: Partial<Profile> = {
        id: crypto.randomUUID(),
        email: formData.get('email') as string,
        full_name: formData.get('full_name') as string,
        role: formData.get('role') as Profile['role'],
        created_at: new Date().toISOString(),
      }
      setUsers(prev => [newUser, ...prev])
      setTimeout(() => { setOpen(false); setLoading(false); setSuccess(false) }, 1500)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">User Management</h1>
          <p className="text-sm text-zinc-500 mt-0.5">Manage portal access for students, teachers, and parents.</p>
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger
            render={
              <Button className="bg-zinc-900 hover:bg-zinc-700 text-white">
                <UserPlus className="mr-2 h-4 w-4" />Create User
              </Button>
            }
          />
          <DialogContent className="sm:max-w-[420px]">
            <DialogHeader>
              <DialogTitle>Create New User</DialogTitle>
              <DialogDescription>
                Provision a new account. The user will receive an invitation email.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4 pt-2">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-1.5">
                <Label htmlFor="full_name">Full Name</Label>
                <Input id="full_name" name="full_name" required placeholder="e.g. Ram Sharma" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" name="email" type="email" required placeholder="ram@jeevanjyoti.edu.np" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="role">Role</Label>
                <Select name="role" defaultValue="student" required>
                  <SelectTrigger id="role"><SelectValue placeholder="Select role" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student">Student</SelectItem>
                    <SelectItem value="teacher">Teacher / Faculty</SelectItem>
                    <SelectItem value="parent">Parent</SelectItem>
                    <SelectItem value="admin">Administrator</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="password">Temporary Password</Label>
                <Input id="password" name="password" type="password" required minLength={8} placeholder="Min. 8 characters" />
              </div>

              <DialogFooter>
                <Button type="submit" disabled={loading || success} className="w-full bg-zinc-900 hover:bg-zinc-700 text-white">
                  {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Creating...</>
                    : success ? <><CheckCircle2 className="mr-2 h-4 w-4" />Created!</>
                    : 'Create Account'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="border-zinc-200">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <CardTitle className="text-zinc-900">User Directory</CardTitle>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-400" />
            <Input
              placeholder="Search users..."
              className="pl-8 w-56 h-9 border-zinc-300"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
            <TableHeader>
              <TableRow className="bg-zinc-50 hover:bg-zinc-50">
                <TableHead className="text-zinc-500 font-medium pl-6">Name</TableHead>
                <TableHead className="text-zinc-500 font-medium">Email</TableHead>
                <TableHead className="text-zinc-500 font-medium">Role</TableHead>
                <TableHead className="text-zinc-500 font-medium">Joined</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-10 text-zinc-400">
                    {search ? 'No users match your search.' : 'No users found.'}
                  </TableCell>
                </TableRow>
              ) : filtered.map(u => (
                <TableRow key={u.id} className="border-zinc-100 hover:bg-zinc-50">
                  <TableCell className="pl-6">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-zinc-200 flex items-center justify-center text-xs font-bold text-zinc-700">
                        {getInitials(u.full_name)}
                      </div>
                      <span className="font-medium text-zinc-900">{u.full_name || '—'}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-zinc-500 text-sm">{u.email}</TableCell>
                  <TableCell>
                    <Badge className={cn('capitalize text-xs border-0', ROLE_STYLES[u.role || 'student'])} variant="secondary">
                      {u.role}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-zinc-400 text-sm">{formatDate(u.created_at)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
