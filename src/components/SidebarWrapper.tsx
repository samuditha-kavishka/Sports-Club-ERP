'use client'
import { usePathname } from 'next/navigation'
import { Sidebar } from './Sidebar'

export function SidebarWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isLoginPage = pathname === '/login'

  if (isLoginPage) {
    return <main className="flex-1 overflow-y-auto">{children}</main>
  }

  return (
    <>
      <Sidebar />
      <main className="flex-1 overflow-y-auto bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 py-8">
          {children}
        </div>
      </main>
    </>
  )
}
