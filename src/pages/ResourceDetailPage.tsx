import { FormEvent, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { ArrowLeft, Download, FileText } from 'lucide-react'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { HoldingPage } from '@/components/HoldingPage'
import { useCMS } from '@/context/CMSContext'
import { defaultResourcesPage, RESOURCE_CATEGORY_LABEL } from '@/data/resourcesDefaults'
import { siteLoadingMessage } from '@/lib/siteCopy'
import { isCmsConfigured, submitLead } from '@/lib/cmsApi'
import type { ContactSectionContent, ResourceFile, ResourceItem } from '@/types/cms'

const BADGE: Record<ResourceItem['category'], string> = {
  reclutamiento: 'bg-secondary-container text-on-secondary-container',
  empleabilidad: 'bg-surface-container-high text-on-surface-variant',
  formacion: 'bg-[#ffdad6]/50 text-[#93000a]',
  tecnologia: 'bg-primary-fixed text-on-primary-fixed-variant',
}

function ResourceMessage({ children }: { children: string }) {
  return (
    <div className="min-h-screen bg-surface text-on-surface">
      <Navbar variant="home" />
      <main className="pt-40 px-margin-mobile lg:px-margin-desktop max-w-3xl mx-auto pb-24">
        <p className="font-body text-body-lg text-on-surface-variant">{children}</p>
        <Link to="/recursos" className="inline-flex mt-6 font-label-md text-primary hover:underline">
          Volver a recursos
        </Link>
      </main>
    </div>
  )
}

function ResourceFiles({ files }: { files: ResourceFile[] }) {
  if (files.length === 1) {
    return (
      <a
        href={files[0].url}
        download={files[0].filename}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-3 bg-primary hover:bg-on-primary-fixed-variant text-on-primary font-label-md py-4 px-8 rounded-sm transition-colors"
      >
        <Download className="w-5 h-5" />
        Descargar {files[0].label || 'archivo'}
      </a>
    )
  }

  return (
    <div className="space-y-3">
      <p className="font-label-md text-primary uppercase tracking-wider mb-4">Archivos</p>
      {files.map((file, i) => (
        <a
          key={`${file.url}-${i}`}
          href={file.url}
          download={file.filename}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-between gap-4 p-4 rounded-lg border border-outline-variant/40 bg-surface-container-lowest hover:border-primary/40 transition-colors"
        >
          <span className="inline-flex items-center gap-3 font-body text-body-md">
            <FileText className="w-5 h-5 text-primary shrink-0" />
            {file.label || file.filename || `Archivo ${i + 1}`}
          </span>
          <Download className="w-4 h-4 text-primary shrink-0" />
        </a>
      ))}
    </div>
  )
}

export function ResourceDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const { resources, resourcesPage, isLoading, isPreview, cmsError, siteSettings, content } = useCMS()
  const page = { ...defaultResourcesPage, ...resourcesPage }
  const contact = content.sections.find((s) => s.id === 'contact') as ContactSectionContent | undefined

  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '' })
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [submitState, setSubmitState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [submitError, setSubmitError] = useState('')
  const [unlocked, setUnlocked] = useState(false)

  const resource = resources.find((r) => r.slug === slug)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!resource) return

    const nextErrors: Record<string, string> = {}
    if (!form.firstName.trim()) nextErrors.firstName = 'Completá tu nombre'
    if (!form.lastName.trim()) nextErrors.lastName = 'Completá tu apellido'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) nextErrors.email = 'Email inválido'
    if (form.phone.replace(/\D/g, '').length < 8) nextErrors.phone = 'Ingresá un teléfono válido'
    setFieldErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setSubmitState('loading')
    setSubmitError('')

    const fullName = `${form.firstName.trim()} ${form.lastName.trim()}`.replace(/\s+/g, ' ')
    const result = isCmsConfigured()
      ? await submitLead({
          name: fullName,
          email: form.email.trim(),
          phone: form.phone.trim(),
          service: resource.title,
          message: `Descargó: ${resource.title}`,
          source: 'resource-download',
        })
      : { ok: false, error: 'No se pudo enviar. Probá de nuevo.' }

    if (result.ok) {
      setSubmitState('success')
      setUnlocked(true)
      return
    }

    setSubmitError(result.error || 'No se pudo enviar. Probá de nuevo.')
    setSubmitState('error')

    const wa = (contact?.whatsappNumber || siteSettings.whatsappNumber || '').replace(/\D/g, '')
    const text = `Hola, soy ${fullName}. Email: ${form.email}. Teléfono: ${form.phone}. Quiero descargar el recurso ${resource.title}.`
    if (wa) {
      window.open(`https://wa.me/${wa}?text=${encodeURIComponent(text)}`, '_blank')
    }
  }

  if (page.sectionVisible === false && !isPreview) {
    return (
      <HoldingPage
        eyebrow="Recursos"
        title={page.comingSoonTitle || 'Próximamente'}
        message={page.comingSoonText || 'Estamos preparando recursos nuevos. Volvé en unos días.'}
        ctaLabel="Volver al inicio"
      />
    )
  }

  if (!resource) {
    if (isLoading || isPreview) {
      return <ResourceMessage>{siteLoadingMessage(siteSettings, 'Cargando el recurso…')}</ResourceMessage>
    }
    if (cmsError) {
      return <ResourceMessage>No pudimos cargar este recurso. Probá de nuevo en unos minutos.</ResourceMessage>
    }
    return <Navigate to="/recursos" replace />
  }

  const text = resource.body || resource.excerpt
  const files = resource.files || []

  return (
    <div className="min-h-screen bg-surface text-on-surface">
      <Navbar variant="home" />
      <main className="pt-32 md:pt-36 lg:pt-40 pb-20">
        {cmsError && (
          <p className="max-w-3xl mx-auto px-margin-mobile lg:px-margin-desktop mb-6 font-body text-body-md text-on-surface-variant">
            No pudimos actualizar el contenido desde el CMS. Estás viendo la versión guardada en el sitio.
          </p>
        )}
        <div className="max-w-3xl mx-auto px-margin-mobile lg:px-margin-desktop">
          <Link
            to="/recursos"
            className="inline-flex items-center gap-2 font-label-md text-primary mb-8 hover:text-on-primary-fixed-variant"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver a recursos
          </Link>

          <span
            className={`${BADGE[resource.category]} font-label-md text-xs py-1 px-3 rounded-full uppercase tracking-wider`}
          >
            {RESOURCE_CATEGORY_LABEL[resource.category]}
          </span>
          {resource.image && (
            <div className="mb-8 rounded-2xl overflow-hidden max-h-80">
              <img src={resource.image} alt="" className="w-full h-full object-cover" />
            </div>
          )}
          <h1 data-cms-field="title" className="font-heading text-headline-lg-mobile md:text-headline-lg text-primary-container mt-4 mb-6">
            {resource.title}
          </h1>
          <p data-cms-field="body" className="font-body text-body-lg text-on-surface-variant mb-10 whitespace-pre-wrap">
            {text}
          </p>

          {files.length === 0 && (
            <p className="font-body text-body-md text-on-surface-variant border border-outline-variant/40 rounded-lg p-6 bg-surface-container-low">
              El archivo de este recurso se va a cargar pronto.
            </p>
          )}

          {files.length > 0 && unlocked && (
            <div className="space-y-6">
              <p className="font-body text-body-md text-on-surface-variant">
                Listo, podés descargar el recurso.
              </p>
              <ResourceFiles files={files} />
            </div>
          )}

          {files.length > 0 && !unlocked && (
            <form
              className="flex flex-col gap-6 p-6 md:p-8 rounded-2xl border border-outline-variant/40 bg-surface-container-low"
              onSubmit={handleSubmit}
              noValidate
            >
              <div>
                <h2 className="font-heading text-headline-md text-on-surface mb-3">Dejanos tus datos para descargar</h2>
                <p className="font-body text-body-md text-on-surface-variant">
                  Completá nombre, apellido, correo y teléfono. Después te habilitamos el archivo.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="resource-first-name" className="font-label-md text-xs text-on-surface-variant uppercase tracking-wider">
                    Nombre
                  </label>
                  <input
                    id="resource-first-name"
                    name="firstName"
                    value={form.firstName}
                    onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                    className="w-full bg-transparent border-b border-outline-variant py-3 focus:outline-none focus:border-primary text-on-surface font-body"
                    placeholder="Ej. Ana"
                  />
                  {fieldErrors.firstName && <p className="font-body text-sm text-error">{fieldErrors.firstName}</p>}
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="resource-last-name" className="font-label-md text-xs text-on-surface-variant uppercase tracking-wider">
                    Apellido
                  </label>
                  <input
                    id="resource-last-name"
                    name="lastName"
                    value={form.lastName}
                    onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                    className="w-full bg-transparent border-b border-outline-variant py-3 focus:outline-none focus:border-primary text-on-surface font-body"
                    placeholder="Ej. García"
                  />
                  {fieldErrors.lastName && <p className="font-body text-sm text-error">{fieldErrors.lastName}</p>}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="resource-email" className="font-label-md text-xs text-on-surface-variant uppercase tracking-wider">
                  Correo electrónico
                </label>
                <input
                  id="resource-email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-transparent border-b border-outline-variant py-3 focus:outline-none focus:border-primary text-on-surface font-body"
                  placeholder="ana@empresa.com"
                />
                {fieldErrors.email && <p className="font-body text-sm text-error">{fieldErrors.email}</p>}
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="resource-phone" className="font-label-md text-xs text-on-surface-variant uppercase tracking-wider">
                  Número de teléfono
                </label>
                <input
                  id="resource-phone"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full bg-transparent border-b border-outline-variant py-3 focus:outline-none focus:border-primary text-on-surface font-body"
                  placeholder="+54 9 11..."
                />
                {fieldErrors.phone && <p className="font-body text-sm text-error">{fieldErrors.phone}</p>}
              </div>
              {submitState === 'error' && (
                <p className="font-body text-sm text-error">
                  {submitError || 'No pudimos registrar tus datos. Probá de nuevo o escribinos por WhatsApp.'}
                </p>
              )}
              <button
                type="submit"
                disabled={submitState === 'loading'}
                className="inline-flex items-center justify-center gap-3 bg-primary hover:bg-on-primary-fixed-variant text-on-primary font-label-md py-4 px-8 rounded-sm transition-colors disabled:opacity-60"
              >
                {submitState === 'loading' ? 'Enviando…' : 'Enviar y descargar'}
              </button>
            </form>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
