import { NextResponse } from 'next/server'

export async function GET() {
  const res = await fetch('http://localhost:5000/api/members', { cache: 'no-store' })
  const data = await res.json()
  return NextResponse.json(data)
}

export async function POST(request: Request) {
  try {
    const json = await request.json()
    const res = await fetch('http://localhost:5000/api/members', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(json)
    })
    
    if (!res.ok) {
        throw new Error('Failed to create member on C# backend')
    }
    
    const member = await res.json()
    return NextResponse.json(member, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create member' }, { status: 500 })
  }
}
