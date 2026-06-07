import { Users, CalendarDays, Receipt, Box, TrendingUp, Activity, ChevronRight } from 'lucide-react'
export default async function Dashboard() {
  const membersRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/members`, { cache: 'no-store' }).catch(() => null);
  const members = membersRes?.ok ? await membersRes.json() : [];
  const memberCount = members.length;

  const bookingsRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings`, { cache: 'no-store' }).catch(() => null);
  const bookings = bookingsRes?.ok ? await bookingsRes.json() : [];
  const bookingCount = bookings.length;

  const inventoryRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/inventory`, { cache: 'no-store' }).catch(() => null);
  const inventory = inventoryRes?.ok ? await inventoryRes.json() : [];
  const inventoryCount = inventory.length;

  const invoicesRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/invoices`, { cache: 'no-store' }).catch(() => null);
  const invoices = invoicesRes?.ok ? await invoicesRes.json() : [];
  const pendingInvoices = invoices.filter((i: any) => i.status === 'Pending').length;

  const stats = [
    { name: 'Total Members', stat: memberCount.toString(), icon: Users, color: 'text-[#007AFF]', bg: 'bg-[#007AFF]/10' },
    { name: 'Total Bookings', stat: bookingCount.toString(), icon: CalendarDays, color: 'text-[#AF52DE]', bg: 'bg-[#AF52DE]/10' },
    { name: 'Pending Invoices', stat: pendingInvoices.toString(), icon: Receipt, color: 'text-[#FF3B30]', bg: 'bg-[#FF3B30]/10' },
    { name: 'Inventory Items', stat: inventoryCount.toString(), icon: Box, color: 'text-[#34C759]', bg: 'bg-[#34C759]/10' },
  ]

  return (
    <div className="p-8 relative min-h-screen">
      <div className="flex items-center justify-between mb-8 relative z-10">
        <div>
          <h1 className="text-3xl font-bold text-[#1D1D1F] tracking-tight">Overview</h1>
          <p className="text-[#86868B] mt-1 text-sm font-medium">Welcome back to ZOOKIE Sports Club.</p>
        </div>
        <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full mac-glass border-none shadow-sm">
          <Activity className="w-4 h-4 text-[#34C759] animate-pulse" />
          <span className="text-xs font-semibold text-[#1D1D1F]">System Online</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 relative z-10">
        {stats.map((item) => (
          <div
            key={item.name}
            className="mac-glass mac-glass-hover rounded-3xl p-6 relative overflow-hidden group cursor-default"
          >
            <div className="flex items-center justify-between">
              <div className={`rounded-2xl p-3 ${item.bg}`}>
                <item.icon className={`h-6 w-6 ${item.color}`} aria-hidden="true" />
              </div>
              <ChevronRight className="w-5 h-5 text-[#86868B] opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 duration-300" />
            </div>
            <div className="mt-6">
              <p className="text-sm font-semibold text-[#86868B]">{item.name}</p>
              <p className="text-3xl font-bold text-[#1D1D1F] tracking-tight mt-1">{item.stat}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2 relative z-10">
        <div className="mac-glass rounded-3xl p-6 shadow-sm">
           <div className="flex items-center justify-between mb-6">
             <h2 className="text-lg font-bold text-[#1D1D1F] flex items-center gap-2">
               <CalendarDays className="w-5 h-5 text-[#007AFF]" />
               Recent Bookings
             </h2>
             <button className="text-sm font-semibold text-[#007AFF] hover:opacity-80 transition-opacity">View All</button>
           </div>
           <div className="h-48 flex items-center justify-center rounded-2xl bg-black/5 border border-black/5 border-dashed">
             <p className="text-sm font-medium text-[#86868B]">Booking charts will appear here.</p>
           </div>
        </div>
        
        <div className="mac-glass rounded-3xl p-6 shadow-sm">
           <div className="flex items-center justify-between mb-6">
             <h2 className="text-lg font-bold text-[#1D1D1F] flex items-center gap-2">
               <TrendingUp className="w-5 h-5 text-[#AF52DE]" />
               Revenue Overview
             </h2>
             <button className="text-sm font-semibold text-[#007AFF] hover:opacity-80 transition-opacity">View Report</button>
           </div>
           <div className="h-48 flex items-center justify-center rounded-2xl bg-black/5 border border-black/5 border-dashed">
             <p className="text-sm font-medium text-[#86868B]">Revenue analytics will appear here.</p>
           </div>
        </div>
      </div>
    </div>
  )
}
