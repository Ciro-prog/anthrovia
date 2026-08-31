import 'dotenv/config'
import { readFileSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { getPayload } from 'payload'
import config from '@payload-config'
import { sectionsToBlocks } from '../src/seed/sectionToBlock.ts'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

type Snapshot = {
  home: Record<string, unknown>[]
  learning: Record<string, unknown>[]
}

/**
 * Seed: admin + event-type + settings + páginas home/learning con contenido real.
 * npm run seed
 */
async function seed() {
  const payload = await getPayload({ config })

  const email = process.env.SEED_ADMIN_EMAIL || 'admin@anthroviahr.com'
  const password = process.env.SEED_ADMIN_PASSWORD || 'AnthroviaAdmin2026!'

  const existingUsers = await payload.find({ collection: 'users', limit: 1, overrideAccess: true })
  if (existingUsers.totalDocs === 0) {
    await payload.create({
      collection: 'users',
      data: { email, password, name: 'Admin Anthrovia' },
      overrideAccess: true,
    })
    console.log('Admin creado:', email)
  } else {
    console.log('Admin ya existe')
  }

  const et = await payload.find({
    collection: 'event-types',
    where: { slug: { equals: 'llamada-15' } },
    limit: 1,
    overrideAccess: true,
  })
  if (!et.docs[0]) {
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
    console.log('Event type: llamada-15')
  }

  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      siteName: 'Anthrovia HR',
      bookingEnabled: true,
      defaultEventTypeSlug: 'llamada-15',
    },
    overrideAccess: true,
  })

  const snapshotPath = path.resolve(__dirname, '../src/seed/siteContent.json')
  const snapshot = JSON.parse(readFileSync(snapshotPath, 'utf8')) as Snapshot

  const pages = [
    {
      slug: 'home',
      title: 'Home',
      sections: sectionsToBlocks(snapshot.home as never),
    },
    {
      slug: 'learning',
      title: 'Capacitaciones',
      sections: sectionsToBlocks(snapshot.learning as never),
    },
  ]

  for (const page of pages) {
    const found = await payload.find({
      collection: 'pages',
      where: { slug: { equals: page.slug } },
      limit: 1,
      overrideAccess: true,
      depth: 0,
    })
    const existing = found.docs[0] as { id: string | number; sections?: unknown[] } | undefined
    const empty =
      !existing || !Array.isArray(existing.sections) || existing.sections.length === 0

    if (!existing) {
      await payload.create({
        collection: 'pages',
        data: {
          ...page,
          _status: 'published',
        } as never,
        overrideAccess: true,
      })
      console.log('Page creada:', page.slug, `(${page.sections.length} secciones)`)
    } else if (empty) {
      await payload.update({
        collection: 'pages',
        id: existing.id,
        data: {
          title: page.title,
          sections: page.sections,
          _status: 'published',
        } as never,
        overrideAccess: true,
      })
      console.log('Page actualizada (estaba vacía):', page.slug)
    } else {
      console.log('Page ya tiene contenido, skip:', page.slug)
    }
  }

  console.log('Seed OK. Editá en /admin → Pages → Live Preview → Publish.')
  process.exit(0)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
