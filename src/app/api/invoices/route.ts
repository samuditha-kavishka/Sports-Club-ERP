import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const invoices = await prisma.invoice.findMany({
    include: { 
      member: true,
      booking: {
        include: { facility: true }
      }
    },
    orderBy: { id: 'desc' }
  })
  return NextResponse.json(invoices)
}

export async function PATCH(request: Request) {
  try {
    const json = await request.json()
    const { id, status } = json
    const invoice = await prisma.invoice.update({
      where: { id: parseInt(id) },
      data: { status }
    })
    return NextResponse.json(invoice)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update invoice' }, { status: 500 })
  }
}
