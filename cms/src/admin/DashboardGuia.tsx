'use client'

const groups = [
  {
    title: 'Sitio',
    links: [
      { href: '/admin/collections/pages', label: 'Páginas', hint: 'Inicio y capacitaciones. Ocultá propósito, misión, redes o noticias' },
      { href: '/admin/collections/courses', label: 'Capacitaciones', hint: 'Página «conocer más» de cada curso' },
      { href: '/admin/globals/resources-page', label: 'Página de recursos', hint: 'Textos e imágenes de /recursos' },
      { href: '/admin/collections/resources', label: 'Recursos', hint: 'Cada guía o plantilla' },
      { href: '/admin/collections/media', label: 'Fotos y archivos', hint: 'Imágenes y descargas' },
    ],
  },
  {
    title: 'Mensajes',
    links: [
      { href: '/admin/inbox', label: 'Inbox', hint: 'Consultas y postulaciones juntas' },
      { href: '/admin/collections/leads', label: 'Consultas', hint: 'Contacto y Conversemos' },
      { href: '/admin/collections/applications', label: 'Postulaciones', hint: 'CVs de /postulacion' },
      { href: '/admin/collections/bookings', label: 'Reservas', hint: 'Llamadas de /agendar' },
    ],
  },
  {
    title: 'Agenda',
    links: [
      {
        href: '/admin/globals/site-settings',
        label: 'Ajustes del sitio',
        hint: 'Días, horarios y duración de cada reunión',
      },
    ],
  },
  {
    title: 'Sistema',
    links: [
      { href: '/admin/collections/users', label: 'Usuarios', hint: 'Quién entra al panel' },
      { href: '/admin/globals/application-form', label: 'Formulario de postulación', hint: 'Campos de /postulacion' },
    ],
  },
]

export function DashboardGuia() {
  return (
    <div
      style={{
        margin: '0 0 2rem',
        padding: '1.25rem 1.5rem',
        borderRadius: 8,
        border: '1px solid var(--theme-elevation-150)',
        background: 'var(--theme-elevation-50)',
      }}
    >
      <h2 style={{ margin: '0 0 0.35rem', fontSize: 18 }}>Qué querés editar</h2>
      <p style={{ margin: '0 0 1rem', fontSize: 14, color: 'var(--theme-elevation-600)' }}>
        El menú está en cuatro grupos: Sitio, Mensajes, Agenda y Sistema. En el inicio, lo que no
        quieras mostrar se apaga con «Mostrar…»; no hace falta borrar la sección.
      </p>
      <div style={{ display: 'grid', gap: 16 }}>
        {groups.map((group) => (
          <section key={group.title}>
            <h3 style={{ margin: '0 0 0.4rem', fontSize: 14, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
              {group.title}
            </h3>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gap: 6 }}>
              {group.links.map((item) => (
                <li key={item.href}>
                  <a href={item.href} style={{ fontWeight: 600 }}>
                    {item.label}
                  </a>
                  <span style={{ color: 'var(--theme-elevation-600)', fontSize: 13 }}> — {item.hint}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  )
}
