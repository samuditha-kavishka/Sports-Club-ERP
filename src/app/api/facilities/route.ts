import { NextResponse } from 'next/server'

export async function GET() {
  const res = await fetch('http://localhost:5000/api/facilities', { cache: 'no-store' })
  const data = await res.json()
  return NextResponse.json(data)
}

export async function POST(request: Request) {
  try {
    const json = await request.json()
    const res = await fetch('http://localhost:5000/api/facilities', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: json.name, hourlyRate: parseFloat(json.hourlyRate) })
    })
    
    if (!res.ok) {
        throw new Error('Failed to create facility on C# backend')
    }
    
    const facility = await res.json()
    return NextResponse.json(facility, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create facility' }, { status: 500 })
  }
}
