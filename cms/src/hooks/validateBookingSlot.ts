import { APIError, type CollectionBeforeChangeHook } from 'payload'
import {
  addDays,
  isSlotFree,
  normalizeSchedule,
  slotToIso,
  startsAtToDateAndTime,
} from '../lib/bookingAvailability'

export const validateBookingSlot: CollectionBeforeChangeHook = async ({
  data,
  req,
  operation,
  originalDoc,
}) => {
  if (!data) return data

  const status = String(data.status || originalDoc?.status || 'pending')
  if (status === 'cancelled' || status === 'completed') return data

  const startsAt = data.startsAt || originalDoc?.startsAt
  if (!startsAt) return data

  const parsed = startsAtToDateAndTime(startsAt as string | Date)
  if (!parsed) {
    throw new APIError('Elegí un horario válido.', 400)
  }

  const eventTypeRef = data.eventType ?? originalDoc?.eventType
  const eventTypeId =
    typeof eventTypeRef === 'object' && eventTypeRef && 'id' in eventTypeRef
      ? (eventTypeRef as { id: string | number }).id
      : eventTypeRef

  let durationMinutes = 15
  if (eventTypeId) {
    try {
      const eventType = await req.payload.findByID({
        collection: 'event-types',
        id: eventTypeId as string,
        overrideAccess: true,
      })
      if (typeof eventType.durationMinutes === 'number' && eventType.durationMinutes > 0) {
        durationMinutes = eventType.durationMinutes
      }
    } catch {
      // 15
    }
  }

  const time = `${String(Math.floor(parsed.minutes / 60)).padStart(2, '0')}:${String(parsed.minutes % 60).padStart(2, '0')}`
  data.endsAt = new Date(
    new Date(slotToIso(parsed.date, time)).getTime() + durationMinutes * 60_000,
  ).toISOString()

  if (operation !== 'create') return data

  const settings = await req.payload.findGlobal({
    slug: 'site-settings',
    overrideAccess: true,
  })
  const schedule = normalizeSchedule(settings)
  const nextDay = addDays(parsed.date, 1)

  const others = await req.payload.find({
    collection: 'bookings',
    where: {
      and: [
        { startsAt: { greater_than_equal: `${parsed.date}T00:00:00.000Z` } },
        { startsAt: { less_than: `${nextDay}T00:00:00.000Z` } },
        { status: { in: ['pending', 'confirmed'] } },
        ...(originalDoc?.id ? [{ id: { not_equals: originalDoc.id } }] : []),
      ],
    },
    limit: 100,
    depth: 0,
    overrideAccess: true,
  })

  const free = isSlotFree({
    date: parsed.date,
    time,
    days: schedule.days,
    windows: schedule.windows,
    blocks: schedule.blocks,
    bookings: others.docs.map((doc) => ({
      id: doc.id,
      startsAt: doc.startsAt as string,
      endsAt: (doc as { endsAt?: string }).endsAt,
      status: doc.status,
    })),
    durationMinutes,
  })

  if (!free) {
    throw new APIError('Ese horario ya no está disponible. Elegí otro turno.', 409)
  }

  return data
}
