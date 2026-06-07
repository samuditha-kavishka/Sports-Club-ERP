import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const bookings = await prisma.booking.findMany({
    include: { member: true, facility: true },
    orderBy: { bookingDate: 'desc' }
  })
  return NextResponse.json(bookings)
}

export async function POST(request: Request) {
  try {
    const json = await request.json()
    const { memberId, facilityId, bookingDate, durationHours } = json

    const facility = await prisma.facility.findUnique({ where: { id: parseInt(facilityId) } })
    if (!facility) throw new Error('Facility not found')

    const cost = facility.hourlyRate * parseFloat(durationHours)

    const booking = await prisma.$transaction(async (tx : any) => {
      const newBooking = await tx.booking.create({
        data: {
          memberId: parseInt(memberId),
          facilityId: parseInt(facilityId),
          bookingDate: new Date(bookingDate),
          durationHours: parseFloat(durationHours)
        }
      })

      // Auto-create pending invoice
      await tx.invoice.create({
        data: {
          memberId: parseInt(memberId),
          bookingId: newBooking.id,
          totalAmount: cost,
          status: 'Pending'
        }
      })

      return newBooking
    })

    return NextResponse.json(booking, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 })
  }
}
