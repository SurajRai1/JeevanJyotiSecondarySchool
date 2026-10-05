'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Sheet, SheetContent, SheetTitle, SheetDescription } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { LogoutButton } from '@/components/portal/LogoutButton'
import { cn, getInitials } from '@/lib/utils'
import type { Role, Profile } from '@/lib/types'
import type { User } from '@supabase/supabase-js'
import {
  Menu, LayoutDashboard, FileText, Users, GraduationCap,
  Settings, Bell, BookOpen, Layers, FileEdit, User2
} from 'lucide-react'

interface SidebarLink { label: string; href: string; icon: React.ElementType }

const NAV_LINKS: Record<Role, SidebarLink[]> = {
  admin: [
    { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { label: 'Content Manager', href: '/admin/content-manager', icon: FileEdit },
    { label: 'User Management', href: '/admin/users', icon: Users },
    { label: 'Academic Setup', href: '/admin/academics', icon: GraduationCap },
    { label: 'Settings', href: '/admin/settings', icon: Settings },
  ],
  teacher: [
    { label: 'Dashboard', href: '/teacher', icon: LayoutDashboard },
    { label: 'Marksheets', href: '/teacher/marksheets', icon: FileText },
    { label: 'Assignments & Resources', href: '/teacher/assignments', icon: BookOpen },
  ],
  student: [
    { label: 'Dashboard', href: '/student', icon: LayoutDashboard },
    { label: 'My Marks', href: '/student/marks', icon: GraduationCap },
    { label: 'Assignments', href: '/student/assignments', icon: BookOpen },
  ],
  parent: [
    { label: 'Dashboard', href: '/parent', icon: LayoutDashboard },
    { label: 'Child Progress', href: '/parent/progress', icon: GraduationCap },
    { label: 'Notices', href: '/parent/notices', icon: Bell },
  ],
}

const ROLE_LABELS: Record<Role, string> = {
  admin: 'Administrator',
  teacher: 'Faculty',
  student: 'Student',
  parent: 'Parent',
}

interface PortalSidebarProps {
  role: Role
  profile: Partial<Profile> | null
  user: User
}

function NavLinks({ links, pathname, onClose }: { links: SidebarLink[]; pathname: string; onClose?: () => void }) {
  return (
    <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
      {links.map(({ label, href, icon: Icon }) => {
        const isActive = pathname === href
        return (
          <Link
            key={href}
            href={href}
            onClick={onClose}
            className={cn(
              'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
              isActive
                ? 'bg-zinc-900 text-white'
                : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900'
            )}
          >
            <Icon className="w-4 h-4 shrink-0" />
            {label}
          </Link>
        )
      })}
    </nav>
  )
}

function UserFooter({ profile, user }: { profile: Partial<Profile> | null; user: User }) {
  const name = profile?.full_name || user.email || 'User'
  const email = user.email || ''
  const roleLabel = ROLE_LABELS[profile?.role as Role] || 'User'
  return (
    <div className="p-3 border-t border-zinc-200">
      <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-zinc-50 mb-2">
        <div className="w-8 h-8 rounded-full bg-zinc-900 text-white flex items-center justify-center text-xs font-bold shrink-0">
          {getInitials(name)}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-zinc-900 truncate">{name}</p>
          <p className="text-xs text-zinc-500 truncate">{roleLabel}</p>
        </div>
      </div>
      <LogoutButton />
    </div>
  )
}

export function PortalSidebar({ role, profile, user }: PortalSidebarProps) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const links = NAV_LINKS[role] || NAV_LINKS.student

  const SidebarInner = () => (
    <div className="flex flex-col h-full bg-white border-r border-zinc-200">
      <div className="p-4 border-b border-zinc-200 flex items-center justify-between">
        <Link href={`/${role}`} className="block" onClick={() => setOpen(false)}>
          <div className="font-bold text-zinc-900 text-base leading-none">Jeevan Jyoti</div>
          <div className="text-[10px] text-zinc-400 mt-1 tracking-wider uppercase font-medium">{ROLE_LABELS[role]} Portal</div>
        </Link>
        <Link
          href="/"
          className="text-xs text-zinc-500 hover:text-zinc-900 transition-colors flex items-center gap-1 px-2 py-1 rounded hover:bg-zinc-100"
          title="Back to Public Website"
        >
          <span>Website</span>
          <span className="text-[10px]">↗</span>
        </Link>
      </div>
      <NavLinks links={links} pathname={pathname} onClose={() => setOpen(false)} />
      <UserFooter profile={profile} user={user} />
    </div>
  )

  return (
    <>
      {/* Desktop */}
      <aside className="w-60 hidden md:flex flex-col h-screen sticky top-0 shrink-0">
        <SidebarInner />
      </aside>

      {/* Mobile header + drawer */}
      <div className="md:hidden">
        <header className="flex items-center justify-between px-4 py-3 bg-white border-b border-zinc-200">
          <span className="font-bold text-zinc-900 text-base">Jeevan Jyoti</span>
          <Sheet open={open} onOpenChange={setOpen}>
            <Button
              variant="ghost"
              size="icon"
              className="text-zinc-700 hover:bg-zinc-100"
              onClick={() => setOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </Button>
            <SheetContent side="left" className="w-60 p-0 portal-scope">
              <SheetTitle className="sr-only">Navigation</SheetTitle>
              <SheetDescription className="sr-only">Portal navigation menu</SheetDescription>
              <SidebarInner />
            </SheetContent>
          </Sheet>
        </header>
      </div>
    </>
  )
}
