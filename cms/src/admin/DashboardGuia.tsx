'use client'

export function DashboardGuia() {
  const links = [
    { href: '/admin/inbox', label: 'Inbox', hint: 'Consultas y postulaciones, con color por origen' },
    { href: '/admin/globals/application-form', label: 'Formulario postulación', hint: 'Campos de /postulacion. Live Preview a la derecha' },
    { href: '/admin/collections/pages', label: 'Páginas', hint: 'Home y Capacitaciones (cards, textos)' },
    { href: '/admin/collections/courses', label: 'Capacitaciones', hint: 'Página «conocer más» de cada curso' },
    { href: '/admin/globals/resources-page', label: 'Página recursos', hint: 'Textos e imágenes de /recursos. Live Preview a la derecha' },
    { href: '/admin/collections/resources', label: 'Recursos', hint: 'Cada guía/plantilla: card, página y archivos para descargar' },
    {
      href: '/admin/collections/leads',
      label: 'Consultas',
      hint: 'Contacto de la web y Conversemos de /dossier (día + franja). Cambiá el Estado',
    },
    { href: '/admin/collections/bookings', label: 'Reservas', hint: 'Llamadas de /agendar. Cambiá el Estado' },
    { href: '/admin/collections/applications', label: 'Postulaciones', hint: 'CVs que llegan desde /postulacion' },
    { href: '/admin/collections/event-types', label: 'Tipos de llamada', hint: 'Sin un tipo activo, /agendar no deja reservar' },
    {
      href: '/admin/globals/site-settings',
      label: 'Ajustes del sitio',
      hint: 'WhatsApp, prender/apagar agenda, días y franjas del dossier, legales',
    },
    { href: '/admin/collections/media', label: 'Fotos y archivos', hint: 'Imágenes para las cards' },
  ]

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
        Abrí Live Preview (ojo a la derecha) y hacé click en un texto: la web baja hasta esa parte.
        Cuando esté bien, Publish. El Inbox junta consultas y postulaciones. Las reservas siguen
        aparte. Cambiá el Estado a medida que atiendas.
      </p>
      <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gap: 8 }}>
        {links.map((item) => (
          <li key={item.href}>
            <a href={item.href} style={{ fontWeight: 600 }}>
              {item.label}
            </a>
            <span style={{ color: 'var(--theme-elevation-600)', fontSize: 13 }}> — {item.hint}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
