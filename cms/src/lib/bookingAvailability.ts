export const BOOKING_TZ = 'America/Argentina/Buenos_Aires'
export const BOOKING_OFFSET = '-03:00'

export type DayKey = 'lun' | 'mar' | 'mie' | 'jue' | 'vie' | 'sab' | 'dom'

export type BookingWindow = { start?: string | null; end?: string | null }
export type BookingBlock = {
  date?: string | Date | null
  allDay?: boolean | null
  start?: string | null
  end?: string | null
}

export type OccupiedBooking = {
  id?: string | number
  startsAt: string | Date
  endsAt?: string | Date | null
  status?: string | null
}

export type AvailabilityDay = { date: string; slots: string[] }

const WEEKDAY: DayKey[] = ['dom', 'lun', 'mar', 'mie', 'jue', 'vie', 'sab']

export const DEFAULT_BOOKING_DAYS: DayKey[] = ['lun', 'mar', 'mie', 'jue', 'vie']
export const DEFAULT_BOOKING_WINDOWS: BookingWindow[] = [
  { start: '09:00', end: '13:00' },
  { start: '14:00', end: '18:00' },
]

export function dateStr(value: unknown): string {
  if (!value) return ''
  if (typeof value === 'string') return value.slice(0, 10)
  if (value instanceof Date && !Number.isNaN(value.getTime())) return value.toISOString().slice(0, 10)
  return ''
}

export function parseMinutes(hm: string | null | undefined): number | null {
  if (!hm || !/^\d{1,2}:\d{2}$/.test(hm.trim())) return null
  const [h, m] = hm.trim().split(':').map(Number)
  if (h > 23 || m > 59) return null
  return h * 60 + m
}

export function formatMinutes(total: number): string {
  const h = Math.floor(total / 60)
  const m = total % 60
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
}

export function weekdayKey(date: string): DayKey | null {
  const [y, mo, d] = date.split('-').map(Number)
  if (!y || !mo || !d) return null
  const utc = Date.UTC(y, mo - 1, d, 15, 0, 0)
  return WEEKDAY[new Date(utc).getUTCDay()]
}

export function todayInArgentina(): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: BOOKING_TZ,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date())
}

export function nowMinutesInArgentina(): number {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: BOOKING_TZ,
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(new Date())
  const hour = Number(parts.find((p) => p.type === 'hour')?.value || 0)
  const minute = Number(parts.find((p) => p.type === 'minute')?.value || 0)
  return hour * 60 + minute
}

export function addDays(date: string, days: number): string {
  const [y, m, d] = date.split('-').map(Number)
  const next = new Date(Date.UTC(y, m - 1, d + days, 15, 0, 0))
  return next.toISOString().slice(0, 10)
}

export function slotToIso(date: string, time: string): string {
  return `${date}T${time}:00${BOOKING_OFFSET}`
}

export function startsAtToDateAndTime(value: string | Date): { date: string; minutes: number } | null {
  const dt = typeof value === 'string' ? new Date(value) : value
  if (Number.isNaN(dt.getTime())) return null
  const date = new Intl.DateTimeFormat('en-CA', {
    timeZone: BOOKING_TZ,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(dt)
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: BOOKING_TZ,
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(dt)
  const hour = Number(parts.find((p) => p.type === 'hour')?.value || 0)
  const minute = Number(parts.find((p) => p.type === 'minute')?.value || 0)
  return { date, minutes: hour * 60 + minute }
}

function overlaps(aStart: number, aEnd: number, bStart: number, bEnd: number) {
  return aStart < bEnd && aEnd > bStart
}

function candidateSlots(windows: BookingWindow[], duration: number): number[] {
  const out: number[] = []
  for (const win of windows) {
    const start = parseMinutes(win.start)
    const end = parseMinutes(win.end)
    if (start == null || end == null || end <= start) continue
    for (let t = start; t + duration <= end; t += duration) out.push(t)
  }
  return [...new Set(out)].sort((a, b) => a - b)
}

function blockRangesForDate(blocks: BookingBlock[], date: string): { allDay: boolean; ranges: [number, number][] } {
  const ranges: [number, number][] = []
  let allDay = false
  for (const block of blocks) {
    if (dateStr(block.date) !== date) continue
    if (block.allDay) {
      allDay = true
      break
    }
    const start = parseMinutes(block.start)
    const end = parseMinutes(block.end)
    if (start != null && end != null && end > start) ranges.push([start, end])
  }
  return { allDay, ranges }
}

function occupiedRanges(bookings: OccupiedBooking[], date: string, fallbackDuration: number): [number, number][] {
  const ranges: [number, number][] = []
  for (const booking of bookings) {
    if (booking.status === 'cancelled' || booking.status === 'completed') continue
    const parsed = startsAtToDateAndTime(booking.startsAt)
    if (!parsed || parsed.date !== date) continue
    let end = parsed.minutes + fallbackDuration
    if (booking.endsAt) {
      const endParsed = startsAtToDateAndTime(booking.endsAt)
      if (endParsed && endParsed.date === date) end = endParsed.minutes
    }
    ranges.push([parsed.minutes, end])
  }
  return ranges
}

export function slotsForDate(opts: {
  date: string
  days: string[]
  windows: BookingWindow[]
  blocks: BookingBlock[]
  bookings: OccupiedBooking[]
  durationMinutes: number
  skipPast?: boolean
}): string[] {
  const { date, days, windows, blocks, bookings, durationMinutes, skipPast } = opts
  const weekday = weekdayKey(date)
  if (!weekday || !days.includes(weekday)) return []
  const { allDay, ranges: blocked } = blockRangesForDate(blocks, date)
  if (allDay) return []
  const occupied = occupiedRanges(bookings, date, durationMinutes)
  const today = todayInArgentina()
  const now = nowMinutesInArgentina()
  return candidateSlots(windows, durationMinutes)
    .filter((start) => {
      const end = start + durationMinutes
      if (blocked.some(([b, e]) => overlaps(start, end, b, e))) return false
      if (occupied.some(([b, e]) => overlaps(start, end, b, e))) return false
      if (skipPast && date === today && start <= now) return false
      return true
    })
    .map(formatMinutes)
}

export function buildAvailability(opts: {
  from: string
  to: string
  days: string[]
  windows: BookingWindow[]
  blocks: BookingBlock[]
  bookings: OccupiedBooking[]
  durationMinutes: number
}): AvailabilityDay[] {
  const out: AvailabilityDay[] = []
  let cursor = opts.from
  while (cursor <= opts.to) {
    const slots = slotsForDate({ ...opts, date: cursor, skipPast: true })
    if (slots.length) out.push({ date: cursor, slots })
    cursor = addDays(cursor, 1)
  }
  return out
}

export function isSlotFree(opts: {
  date: string
  time: string
  days: string[]
  windows: BookingWindow[]
  blocks: BookingBlock[]
  bookings: OccupiedBooking[]
  durationMinutes: number
}): boolean {
  const slots = slotsForDate({ ...opts, skipPast: true })
  return slots.includes(opts.time)
}

export function normalizeSchedule(raw: {
  bookingDays?: unknown
  bookingWindows?: unknown
  bookingBlocks?: unknown
}) {
  const days = Array.isArray(raw.bookingDays) && raw.bookingDays.length
    ? raw.bookingDays.map(String)
    : DEFAULT_BOOKING_DAYS
  const windows = Array.isArray(raw.bookingWindows) && raw.bookingWindows.length
    ? (raw.bookingWindows as BookingWindow[])
    : DEFAULT_BOOKING_WINDOWS
  const blocks = Array.isArray(raw.bookingBlocks) ? (raw.bookingBlocks as BookingBlock[]) : []
  return { days, windows, blocks }
}
