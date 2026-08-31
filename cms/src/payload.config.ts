import path from 'path'
import { fileURLToPath } from 'url'
import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Courses } from './collections/Courses'
import { Leads } from './collections/Leads'
import { EventTypes } from './collections/EventTypes'
import { Bookings } from './collections/Bookings'
import { SiteSettings } from './globals/SiteSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const corsOrigins = (process.env.CORS_ORIGINS || 'http://localhost:5173')
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: ' · Anthrovia CMS',
    },
  },
  collections: [Users, Media, Pages, Courses, Leads, EventTypes, Bookings],
  globals: [SiteSettings],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'dev-secret-change-me',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
    // En Docker NODE_ENV=production desactiva el push automático;
    // sin migraciones previas las tablas no existen. Forzamos push
    // para crear/actualizar el schema al arrancar (VPS single-node).
    push: true,
  }),
  sharp,
  cors: corsOrigins,
  csrf: corsOrigins,
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || process.env.NEXT_PUBLIC_SERVER_URL,
  routes: {
    admin: '/admin',
    api: '/api',
  },
  upload: {
    limits: {
      fileSize: 20_000_000,
    },
  },
  onInit: async (payload) => {
    const email = process.env.SEED_ADMIN_EMAIL || 'admin@anthroviahr.com'
    const password = process.env.SEED_ADMIN_PASSWORD || 'AnthroviaAdmin2026!'

    const existing = await payload.find({
      collection: 'users',
      limit: 1,
      overrideAccess: true,
    })

    if (existing.totalDocs === 0) {
      await payload.create({
        collection: 'users',
        data: {
          email,
          password,
          name: 'Admin Anthrovia',
        },
        overrideAccess: true,
      })
      payload.logger.info(`Admin creado: ${email}`)
    }

    const eventTypes = await payload.find({
      collection: 'event-types',
      where: { slug: { equals: 'llamada-15' } },
      limit: 1,
      overrideAccess: true,
    })

    if (eventTypes.totalDocs === 0) {
      await payload.create({
        collection: 'event-types',
        data: {
          title: 'Llamada de 15 minutos',
          slug: 'llamada-15',
          description:
            'Agendá una llamada personalizada para conocer tus objetivos y ver si la formación es para vos.',
          durationMinutes: 15,
          active: true,
        },
        overrideAccess: true,
      })
      payload.logger.info('Event type creado: llamada-15')
    }

    try {
      await payload.updateGlobal({
        slug: 'site-settings',
        data: {
          siteName: 'Anthrovia HR',
          bookingEnabled: true,
          defaultEventTypeSlug: 'llamada-15',
        },
        overrideAccess: true,
      })
    } catch {
      // global puede fallar si el schema aún no está listo; se puede editar en admin
    }
  },
})
