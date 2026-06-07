'use client'
import { useState, useEffect } from 'react'
import { Receipt, CheckCircle, Clock } from 'lucide-react'

export default function BillingPage() {
  const [invoices, setInvoices] = useState<any[]>([])

  useEffect(() => {
    fetchInvoices()
  }, [])

  const fetchInvoices = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/invoices`)
    const data = await res.json()
    setInvoices(data)
  }

  const handleMarkPaid = async (id: number) => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/invoices/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status: 'Paid' })
    })
    fetchInvoices()
  }

  return (
    <div className="p-8 relative min-h-screen">
      <div className="flex justify-between items-center mb-8 relative z-10">
        <h1 className="text-3xl font-bold text-[#1D1D1F] tracking-tight flex items-center">
          <Receipt className="w-8 h-8 mr-3 text-[#FF3B30]" />
          Billing & Payments
        </h1>
      </div>

      <div className="mac-glass rounded-3xl overflow-hidden border border-black/5 shadow-sm relative z-10">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-black/5">
            <thead className="bg-black/5">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-[#86868B] uppercase tracking-wider">Invoice ID</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-[#86868B] uppercase tracking-wider">Member</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-[#86868B] uppercase tracking-wider">Facility / Booking Date</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-[#86868B] uppercase tracking-wider">Amount</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-[#86868B] uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-[#86868B] uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5 bg-white/50">
              {invoices.map(invoice => (
                <tr key={invoice.id} className="hover:bg-black/5 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-[#1D1D1F]">#INV-{invoice.id.toString().padStart(4, '0')}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#1D1D1F]">{invoice.member?.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-semibold text-[#007AFF]">{invoice.booking?.facility?.name}</div>
                    <div className="text-xs font-medium text-[#86868B]">{new Date(invoice.booking?.bookingDate).toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-[#1D1D1F]">${invoice.totalAmount.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
                      invoice.status === 'Paid' ? 'bg-[#34C759]/20 text-[#34C759]' : 'bg-[#FF9500]/20 text-[#FF9500]'
                    }`}>
                      {invoice.status === 'Paid' ? <CheckCircle className="w-3.5 h-3.5 mr-1.5" /> : <Clock className="w-3.5 h-3.5 mr-1.5" />}
                      {invoice.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {invoice.status === 'Pending' && (
                      <button
                        onClick={() => handleMarkPaid(invoice.id)}
                        className="text-white font-bold bg-[#007AFF] hover:bg-[#0056b3] px-4 py-2 rounded-xl transition-all shadow-sm active:scale-[0.98]"
                      >
                        Mark as Paid
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {invoices.length === 0 && (
                <tr><td colSpan={6} className="px-6 py-12 text-center text-sm font-medium text-[#86868B]">No invoices generated yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
