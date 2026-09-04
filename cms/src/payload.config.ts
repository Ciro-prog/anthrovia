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
import { Applications } from './collections/Applications'
import { Resources } from './collections/Resources'
import { SiteSettings } from './globals/SiteSettings'
import { ApplicationForm } from './globals/ApplicationForm'
import { ResourcesPage } from './globals/ResourcesPage'
import { migrations } from './migrations'
import { seedPages } from './seed/seedPages'
import { seedCourses } from './seed/seedCourses'
import { seedResources } from './seed/seedResources'
import { defaultPrivacySections, defaultTermsSections } from './seed/legalDefaults'
import {
  defaultApplicationFormFields,
  defaultApplicationFormSubtitle,
  defaultApplicationFormTitle,
} from './seed/applicationFormDefaults'

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
    components: {
      afterNavLinks: [
        '/admin/InboxNavLink#InboxNavLink',
        '/admin/PreviewFieldBridge#PreviewFieldBridge',
      ],
      beforeDashboard: ['/admin/DashboardGuia#DashboardGuia'],
      views: {
        inbox: {
          Component: '/admin/InboxView#InboxView',
          path: '/inbox',
          exact: true,
          meta: {
            title: 'Inbox',
          },
        },
      },
    },
  },
  collections: [Users, Media, Pages, Courses, Leads, EventTypes, Bookings, Applications, Resources],
  globals: [SiteSettings, ApplicationForm, ResourcesPage],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'dev-secret-change-me',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
    // Producción: schema vía prodMigrations (no push / drizzle-kit en runtime).
    push: false,
    prodMigrations: migrations,
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
    try {
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
        const current = await payload.findGlobal({
          slug: 'site-settings',
          overrideAccess: true,
        })
        const privacyEmpty = !Array.isArray(current.privacySections) || current.privacySections.length === 0
        const termsEmpty = !Array.isArray(current.termsSections) || current.termsSections.length === 0
        const slotsEmpty = !Array.isArray(current.dossierSlots) || current.dossierSlots.length === 0
        const daysEmpty = !Array.isArray(current.dossierDays) || current.dossierDays.length === 0
        await payload.updateGlobal({
          slug: 'site-settings',
          data: {
            siteName: current.siteName || 'Anthrovia HR',
            bookingEnabled: current.bookingEnabled ?? true,
            defaultEventTypeSlug: current.defaultEventTypeSlug || 'llamada-15',
            ...(daysEmpty ? { dossierDays: ['lun', 'mar', 'mie', 'jue', 'vie'] } : {}),
            ...(slotsEmpty
              ? {
                  dossierSlots: [
                    { label: 'Mañana', start: '09:00', end: '13:00' },
                    { label: 'Tarde', start: '14:00', end: '18:00' },
                  ],
                }
              : {}),
            ...(privacyEmpty
              ? { privacyTitle: 'Política de Privacidad', privacySections: defaultPrivacySections }
              : {}),
            ...(termsEmpty
              ? { termsTitle: 'Términos y Condiciones', termsSections: defaultTermsSections }
              : {}),
          } as never,
          overrideAccess: true,
        })
      } catch {
        // global puede fallar si el schema aún no está listo; se puede editar en admin
      }

      try {
        const form = await payload.findGlobal({
          slug: 'application-form',
          overrideAccess: true,
        })
        const empty = !Array.isArray(form.fields) || form.fields.length === 0
        if (empty) {
          await payload.updateGlobal({
            slug: 'application-form',
            data: {
              title: form.title || defaultApplicationFormTitle,
              subtitle: form.subtitle || defaultApplicationFormSubtitle,
              fields: defaultApplicationFormFields,
            } as never,
            overrideAccess: true,
          })
          payload.logger.info('Formulario de postulación: campos iniciales cargados')
        }
      } catch {
        // global puede fallar si el schema aún no está listo
      }

      await seedPages(payload)
      await seedCourses(payload)
      await seedResources(payload)
    } catch (err) {
      const extra =
        typeof err === 'object' && err && 'data' in err
          ? ` ${JSON.stringify((err as { data: unknown }).data)}`
          : ''
      payload.logger.error(
        `onInit seed falló (el proceso sigue): ${err instanceof Error ? err.message : String(err)}${extra}`,
      )
    }
  },
})
