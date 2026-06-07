import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const facilities = await prisma.facility.findMany()
  return NextResponse.json(facilities)
}

export async function POST(request: Request) {
  try {
    const json = await request.json()
    const facility = await prisma.facility.create({
      data: { name: json.name, hourlyRate: parseFloat(json.hourlyRate) }
    })
    return NextResponse.json(facility, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create facility' }, { status: 500 })
  }
}
