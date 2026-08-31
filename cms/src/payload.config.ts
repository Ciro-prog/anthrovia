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
})
