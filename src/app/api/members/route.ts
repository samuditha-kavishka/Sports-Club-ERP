import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const members = await prisma.member.findMany({ orderBy: { joinDate: 'desc' } })
  return NextResponse.json(members)
}

export async function POST(request: Request) {
  try {
    const json = await request.json()
    const member = await prisma.member.create({
      data: {
        name: json.name,
        email: json.email,
        phone: json.phone,
      }
    })
    return NextResponse.json(member, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create member' }, { status: 500 })
  }
}
