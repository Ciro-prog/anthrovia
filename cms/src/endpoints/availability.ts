import type { Endpoint, PayloadRequest } from 'payload'
import {
  addDays,
  buildAvailability,
  normalizeSchedule,
  todayInArgentina,
} from '../lib/bookingAvailability'

function queryParam(req: PayloadRequest, key: string): string | null {
  try {
    if (req.url) {
      const parsed = req.url.startsWith('http') ? new URL(req.url) : new URL(req.url, 'http://localhost')
      const value = parsed.searchParams.get(key)
      if (value) return value
    }
  } catch {
    // ignore
  }
  const raw = (req as { query?: Record<string, unknown> }).query?.[key]
  if (typeof raw === 'string') return raw
  if (Array.isArray(raw) && typeof raw[0] === 'string') return raw[0]
  return null
}

const HORIZON_DAYS = 21

export const availabilityEndpoint: Endpoint = {
  path: '/availability',
  method: 'get',
  handler: async (req) => {
    const fromParam = queryParam(req, 'from') || todayInArgentina()
    const toParam = queryParam(req, 'to') || addDays(fromParam, HORIZON_DAYS)
    const eventTypeId = queryParam(req, 'eventType')

    const settings = await req.payload.findGlobal({
      slug: 'site-settings',
      overrideAccess: true,
    })

    if (settings.bookingEnabled === false) {
      return Response.json({ days: [] })
    }

    let durationMinutes = 15
    if (eventTypeId) {
      try {
        const eventType = await req.payload.findByID({
          collection: 'event-types',
          id: eventTypeId,
          overrideAccess: true,
        })
        if (typeof eventType.durationMinutes === 'number' && eventType.durationMinutes > 0) {
          durationMinutes = eventType.durationMinutes
        }
      } catch {
        // usa 15
      }
    } else if (settings.defaultEventTypeSlug) {
      const found = await req.payload.find({
        collection: 'event-types',
        where: { slug: { equals: settings.defaultEventTypeSlug } },
        limit: 1,
        overrideAccess: true,
      })
      const minutes = found.docs[0]?.durationMinutes
      if (typeof minutes === 'number' && minutes > 0) durationMinutes = minutes
    }

    const from = fromParam < todayInArgentina() ? todayInArgentina() : fromParam
    const rangeEnd = addDays(toParam, 1)

    const bookings = await req.payload.find({
      collection: 'bookings',
      where: {
        and: [
          { startsAt: { greater_than_equal: `${from}T00:00:00.000Z` } },
          { startsAt: { less_than: `${rangeEnd}T00:00:00.000Z` } },
          { status: { in: ['pending', 'confirmed'] } },
        ],
      },
      limit: 200,
      depth: 0,
      overrideAccess: true,
    })

    const schedule = normalizeSchedule(settings)
    const days = buildAvailability({
      from,
      to: toParam,
      days: schedule.days,
      windows: schedule.windows,
      blocks: schedule.blocks,
      bookings: bookings.docs.map((doc) => ({
        id: doc.id,
        startsAt: doc.startsAt as string,
        endsAt: (doc as { endsAt?: string }).endsAt,
        status: doc.status,
      })),
      durationMinutes,
    })

    return Response.json({ days, durationMinutes })
  },
}
