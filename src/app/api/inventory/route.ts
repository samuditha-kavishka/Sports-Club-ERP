import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const inventory = await prisma.inventory.findMany()
  return NextResponse.json(inventory)
}

export async function POST(request: Request) {
  try {
    const json = await request.json()
    const item = await prisma.inventory.create({
      data: { 
        itemName: json.itemName,
        quantityInStock: parseInt(json.quantityInStock),
        unitPrice: parseFloat(json.unitPrice)
      }
    })
    return NextResponse.json(item, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add item' }, { status: 500 })
  }
}
