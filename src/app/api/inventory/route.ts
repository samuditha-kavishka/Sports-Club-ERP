import { NextResponse } from 'next/server'

export async function GET() {
  const res = await fetch('http://localhost:5000/api/inventory', { cache: 'no-store' })
  const data = await res.json()
  return NextResponse.json(data)
}

export async function POST(request: Request) {
  try {
    const json = await request.json()
    const res = await fetch('http://localhost:5000/api/inventory', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        itemName: json.itemName,
        quantityInStock: parseInt(json.quantityInStock),
        unitPrice: parseFloat(json.unitPrice)
      })
    })

    if (!res.ok) {
        throw new Error('Failed to add item on C# backend')
    }

    const item = await res.json()
    return NextResponse.json(item, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add item' }, { status: 500 })
  }
}
