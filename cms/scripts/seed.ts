import 'dotenv/config'
import { getPayload } from 'payload'
import config from '@payload-config'
import { seedPages } from '../src/seed/seedPages.ts'
import { seedCourses } from '../src/seed/seedCourses.ts'

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

  await seedPages(payload, console.log, console.error)
  await seedCourses(payload, console.log, console.error)

  console.log('Seed OK. Páginas + Capacitaciones. «Conocer más» se edita en Capacitaciones.')
  process.exit(0)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
