'use client'
import { useState, useEffect } from 'react'
import { CalendarDays, Plus } from 'lucide-react'

export default function FacilitiesPage() {
  const [facilities, setFacilities] = useState<any[]>([])
  const [members, setMembers] = useState<any[]>([])
  const [bookings, setBookings] = useState<any[]>([])
  
  const [facilityName, setFacilityName] = useState('')
  const [hourlyRate, setHourlyRate] = useState('')

  const [memberId, setMemberId] = useState('')
  const [facilityId, setFacilityId] = useState('')
  const [bookingDate, setBookingDate] = useState('')
  const [durationHours, setDurationHours] = useState('')

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const [facRes, memRes, bookRes] = await Promise.all([
      fetch('/api/facilities'),
      fetch('/api/members'),
      fetch('/api/bookings')
    ])
    setFacilities(await facRes.json())
    setMembers(await memRes.json())
    setBookings(await bookRes.json())
  }

  const handleAddFacility = async (e: React.FormEvent) => {
    e.preventDefault()
    await fetch('/api/facilities', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: facilityName, hourlyRate })
    })
    setFacilityName('')
    setHourlyRate('')
    fetchData()
  }

  const handleAddBooking = async (e: React.FormEvent) => {
    e.preventDefault()
    await fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ memberId, facilityId, bookingDate, durationHours })
    })
    setMemberId('')
    setFacilityId('')
    setBookingDate('')
    setDurationHours('')
    fetchData()
  }

  return (
    <div className="p-8 relative min-h-screen">
      <h1 className="text-3xl font-bold text-[#1D1D1F] tracking-tight flex items-center mb-8 relative z-10">
        <CalendarDays className="w-8 h-8 mr-3 text-[#AF52DE]" />
        Facility Booking
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 relative z-10">
        {/* Add Facility Form */}
        <div className="mac-glass p-6 rounded-3xl border border-black/5 shadow-sm">
          <h2 className="text-xl font-bold mb-6 text-[#1D1D1F]">Manage Facilities</h2>
          <form onSubmit={handleAddFacility} className="space-y-4 mb-6">
            <div className="flex gap-4">
              <div className="flex-1">
                <input placeholder="Facility Name" required type="text" value={facilityName} onChange={e => setFacilityName(e.target.value)} className="w-full px-4 py-3 bg-white border border-black/5 rounded-xl text-[#1D1D1F] placeholder-[#86868B] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#007AFF] focus:border-transparent transition-all" />
              </div>
              <div className="w-32">
                <input placeholder="Rate /hr" required type="number" step="0.01" value={hourlyRate} onChange={e => setHourlyRate(e.target.value)} className="w-full px-4 py-3 bg-white border border-black/5 rounded-xl text-[#1D1D1F] placeholder-[#86868B] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#007AFF] focus:border-transparent transition-all" />
              </div>
              <button type="submit" className="px-6 flex items-center justify-center font-bold text-white bg-[#007AFF] hover:bg-[#0056b3] rounded-xl shadow-sm transition-all duration-200 active:scale-[0.98]">
                Add
              </button>
            </div>
          </form>
          <div className="space-y-2">
            {facilities.map(f => (
              <div key={f.id} className="flex justify-between items-center p-4 bg-white/50 border border-black/5 rounded-xl hover:bg-white transition-colors">
                <span className="font-semibold text-[#1D1D1F]">{f.name}</span>
                <span className="text-[#AF52DE] font-bold">${f.hourlyRate}/hr</span>
              </div>
            ))}
          </div>
        </div>

        {/* Add Booking Form */}
        <div className="mac-glass p-6 rounded-3xl border border-black/5 shadow-sm">
          <h2 className="text-xl font-bold mb-6 text-[#1D1D1F]">New Booking</h2>
          <form onSubmit={handleAddBooking} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-[#1D1D1F] ml-1">Member</label>
              <select required value={memberId} onChange={e => setMemberId(e.target.value)} className="mt-2 block w-full px-4 py-3 bg-white border border-black/5 rounded-xl text-[#1D1D1F] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#007AFF] focus:border-transparent transition-all appearance-none">
                <option value="">Select Member</option>
                {members.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#1D1D1F] ml-1">Facility</label>
              <select required value={facilityId} onChange={e => setFacilityId(e.target.value)} className="mt-2 block w-full px-4 py-3 bg-white border border-black/5 rounded-xl text-[#1D1D1F] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#007AFF] focus:border-transparent transition-all appearance-none">
                <option value="">Select Facility</option>
                {facilities.map(f => <option key={f.id} value={f.id}>{f.name} (${f.hourlyRate}/hr)</option>)}
              </select>
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-semibold text-[#1D1D1F] ml-1">Date & Time</label>
                <input required type="datetime-local" value={bookingDate} onChange={e => setBookingDate(e.target.value)} className="mt-2 block w-full px-4 py-3 bg-white border border-black/5 rounded-xl text-[#1D1D1F] placeholder-[#86868B] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#007AFF] focus:border-transparent transition-all" />
              </div>
              <div className="w-32">
                <label className="block text-sm font-semibold text-[#1D1D1F] ml-1">Duration (hrs)</label>
                <input required type="number" step="0.5" value={durationHours} onChange={e => setDurationHours(e.target.value)} className="mt-2 block w-full px-4 py-3 bg-white border border-black/5 rounded-xl text-[#1D1D1F] placeholder-[#86868B] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#007AFF] focus:border-transparent transition-all" />
              </div>
            </div>
            <button type="submit" className="w-full flex justify-center py-3.5 px-4 mt-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-[#007AFF] hover:bg-[#0056b3] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-[#007AFF] transition-all duration-200 active:scale-[0.98]">
              <Plus className="w-5 h-5 mr-2" /> Book Facility
            </button>
          </form>
        </div>
      </div>

      <div className="mac-glass rounded-3xl overflow-hidden border border-black/5 shadow-sm relative z-10">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-black/5">
            <thead className="bg-black/5">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-[#86868B] uppercase tracking-wider">Date & Time</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-[#86868B] uppercase tracking-wider">Member</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-[#86868B] uppercase tracking-wider">Facility</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-[#86868B] uppercase tracking-wider">Duration</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5 bg-white/50">
              {bookings.map(b => (
                <tr key={b.id} className="hover:bg-black/5 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#1D1D1F] font-semibold">{new Date(b.bookingDate).toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#1D1D1F] font-medium">{b.member?.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#AF52DE] font-semibold">{b.facility?.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#86868B] font-medium">{b.durationHours} hrs</td>
                </tr>
              ))}
              {bookings.length === 0 && (
                <tr><td colSpan={4} className="px-6 py-12 text-center text-sm font-medium text-[#86868B]">No bookings found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
