import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config.ts'

/**
 * Seed mínimo (admin + event-type + settings).
 * Para páginas/cursos: pegá el JSON desde el front o usá el panel admin.
 * Con el CMS arriba: npm run seed
 */
async function seed() {
  const payload = await getPayload({ config })

  const email = process.env.SEED_ADMIN_EMAIL || 'admin@anthroviahr.com'
  const password = process.env.SEED_ADMIN_PASSWORD || 'AnthroviaAdmin2026!'

  const existingUsers = await payload.find({ collection: 'users', limit: 1 })
  if (existingUsers.totalDocs === 0) {
    await payload.create({
      collection: 'users',
      data: { email, password, name: 'Admin Anthrovia' },
    })
    console.log('Admin creado:', email)
  } else {
    console.log('Admin ya existe')
  }

  const et = await payload.find({
    collection: 'event-types',
    where: { slug: { equals: 'llamada-15' } },
    limit: 1,
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
  })

  // Placeholders de páginas si no existen (el front usa fallback local hasta que edites)
  for (const page of [
    { slug: 'home', title: 'Home', sections: [] },
    { slug: 'learning', title: 'Capacitaciones', sections: [] },
  ]) {
    const found = await payload.find({
      collection: 'pages',
      where: { slug: { equals: page.slug } },
      limit: 1,
    })
    if (!found.docs[0]) {
      await payload.create({ collection: 'pages', data: page })
      console.log('Page placeholder:', page.slug)
    }
  }

  console.log('Seed OK. Abrí /admin y cargá sections/blocks o dejá el fallback del front.')
  process.exit(0)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
