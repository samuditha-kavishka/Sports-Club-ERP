'use client'
import { useState, useEffect } from 'react'
import { Users, Plus } from 'lucide-react'

export default function MembersPage() {
  const [members, setMembers] = useState<any[]>([])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  useEffect(() => {
    fetchMembers()
  }, [])

  const fetchMembers = async () => {
    const res = await fetch('/api/members')
    const data = await res.json()
    setMembers(data)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await fetch('/api/members', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, phone })
    })
    setName('')
    setEmail('')
    setPhone('')
    fetchMembers()
  }

  return (
    <div className="p-8 relative min-h-screen">
      <div className="flex justify-between items-center mb-8 relative z-10">
        <h1 className="text-3xl font-bold text-[#1D1D1F] tracking-tight flex items-center">
          <Users className="w-8 h-8 mr-3 text-[#007AFF]" />
          Member Management
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
        <div className="lg:col-span-1">
          <div className="mac-glass p-6 rounded-3xl shadow-sm border border-black/5">
            <h2 className="text-xl font-bold mb-6 text-[#1D1D1F]">Add New Member</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-[#1D1D1F] ml-1">Name</label>
                <input required type="text" value={name} onChange={e => setName(e.target.value)} className="mt-2 block w-full px-4 py-3 bg-white border border-black/5 rounded-xl text-[#1D1D1F] placeholder-[#86868B] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#007AFF] focus:border-transparent transition-all" placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#1D1D1F] ml-1">Email</label>
                <input required type="email" value={email} onChange={e => setEmail(e.target.value)} className="mt-2 block w-full px-4 py-3 bg-white border border-black/5 rounded-xl text-[#1D1D1F] placeholder-[#86868B] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#007AFF] focus:border-transparent transition-all" placeholder="john@example.com" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#1D1D1F] ml-1">Phone</label>
                <input type="text" value={phone} onChange={e => setPhone(e.target.value)} className="mt-2 block w-full px-4 py-3 bg-white border border-black/5 rounded-xl text-[#1D1D1F] placeholder-[#86868B] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#007AFF] focus:border-transparent transition-all" placeholder="+1 (555) 000-0000" />
              </div>
              <button type="submit" className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-[#007AFF] hover:bg-[#0056b3] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-[#007AFF] transition-all duration-200 active:scale-[0.98] mt-4">
                <Plus className="w-5 h-5 mr-2" /> Add Member
              </button>
            </form>
          </div>
        </div>
        <div className="lg:col-span-2">
          <div className="mac-glass rounded-3xl overflow-hidden shadow-sm border border-black/5">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-black/5">
                <thead className="bg-black/5">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-[#86868B] uppercase tracking-wider">Name</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-[#86868B] uppercase tracking-wider">Contact</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-[#86868B] uppercase tracking-wider">Join Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5 bg-white/50">
                  {members.map(member => (
                    <tr key={member.id} className="hover:bg-black/5 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-semibold text-[#1D1D1F]">{member.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-[#1D1D1F]">{member.email}</div>
                        <div className="text-sm text-[#86868B]">{member.phone}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#86868B]">
                        {new Date(member.joinDate).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                  {members.length === 0 && (
                    <tr>
                      <td colSpan={3} className="px-6 py-12 text-center text-sm font-medium text-[#86868B]">No members found. Add one to get started!</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
