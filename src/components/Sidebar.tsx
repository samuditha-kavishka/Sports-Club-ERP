'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Users, CalendarDays, Receipt, Box, LogOut } from 'lucide-react'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Members', href: '/members', icon: Users },
  { name: 'Facilities', href: '/facilities', icon: CalendarDays },
  { name: 'Billing', href: '/billing', icon: Receipt },
  { name: 'Inventory', href: '/inventory', icon: Box },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-screen w-64 flex-col bg-white/60 backdrop-blur-3xl border-r border-black/5 relative shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
      <div className="flex h-20 shrink-0 items-center px-6 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#007AFF] to-[#5AC8FA] flex items-center justify-center shadow-sm">
            <span className="text-white font-bold text-lg tracking-tight">Z</span>
          </div>
          <span className="text-lg font-bold text-[#1D1D1F] tracking-tight">
            ZOOKIE <span className="text-[#86868B] block text-[10px] font-semibold tracking-wider mt-0.5">SPORTS CLUB</span>
          </span>
        </div>
      </div>
      <div className="flex flex-1 flex-col overflow-y-auto relative z-10 custom-scrollbar">
        <nav className="flex-1 space-y-1 px-3 py-4">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  isActive
                    ? 'bg-[#007AFF] text-white shadow-sm'
                    : 'text-[#1D1D1F] hover:bg-black/5 border border-transparent',
                  'group flex items-center rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200'
                )}
              >
                <item.icon
                  className={cn(
                    isActive ? 'text-white' : 'text-[#86868B] group-hover:text-[#1D1D1F]',
                    'mr-3 h-5 w-5 shrink-0 transition-colors duration-200'
                  )}
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            )
          })}
        </nav>
      </div>
      <div className="flex shrink-0 p-4 relative z-10">
        <Link
          href="/login"
          className="group flex w-full items-center rounded-xl px-3 py-2.5 text-sm font-medium text-[#1D1D1F] hover:bg-red-50 hover:text-red-600 transition-all duration-200"
        >
          <LogOut className="mr-3 h-5 w-5 text-[#86868B] group-hover:text-red-500 transition-colors duration-200" aria-hidden="true" />
          Sign Out
        </Link>
      </div>
    </div>
  )
}
