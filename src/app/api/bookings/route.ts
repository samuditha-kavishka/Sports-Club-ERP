import { NextResponse } from 'next/server'

export async function GET() {
  const res = await fetch('http://localhost:5000/api/bookings', { cache: 'no-store' })
  const data = await res.json()
  return NextResponse.json(data)
}

export async function POST(request: Request) {
  try {
    const json = await request.json()
    const { memberId, facilityId, bookingDate, durationHours } = json

    const res = await fetch('http://localhost:5000/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
          memberId: parseInt(memberId),
          facilityId: parseInt(facilityId),
          bookingDate: new Date(bookingDate).toISOString(),
          durationHours: parseFloat(durationHours)
      })
    })

    if (!res.ok) {
        throw new Error('Failed to create booking on C# backend')
    }

    const booking = await res.json()
    return NextResponse.json(booking, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 })
  }
}
