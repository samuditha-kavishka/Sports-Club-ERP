import { NextResponse } from 'next/server'

export async function GET() {
  const res = await fetch('http://localhost:5000/api/invoices', { cache: 'no-store' })
  const data = await res.json()
  return NextResponse.json(data)
}

export async function PATCH(request: Request) {
  try {
    const json = await request.json()
    const { id, status } = json
    
    const res = await fetch(`http://localhost:5000/api/invoices/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    })

    if (!res.ok) {
        throw new Error('Failed to update invoice on C# backend')
    }

    return NextResponse.json({ id, status })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update invoice' }, { status: 500 })
  }
}
