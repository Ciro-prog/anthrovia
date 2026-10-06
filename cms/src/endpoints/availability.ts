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
    const settings = await req.payload.findGlobal({
      slug: 'site-settings',
      overrideAccess: true,
    })

    if (settings.bookingEnabled === false) {
      return Response.json({ days: [] })
    }

    const schedule = normalizeSchedule(settings as Parameters<typeof normalizeSchedule>[0])
    const durationMinutes = schedule.durationMinutes

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

    const days = buildAvailability({
      from,
      to: toParam,
      week: schedule.week,
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
