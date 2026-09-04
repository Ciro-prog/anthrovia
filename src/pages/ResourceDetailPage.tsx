import { Link, Navigate, useParams } from 'react-router-dom'
import { ArrowLeft, Download, FileText } from 'lucide-react'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { useCMS } from '@/context/CMSContext'
import { RESOURCE_CATEGORY_LABEL } from '@/data/resourcesDefaults'
import type { ResourceItem } from '@/types/cms'

const BADGE: Record<ResourceItem['category'], string> = {
  reclutamiento: 'bg-secondary-container text-on-secondary-container',
  empleabilidad: 'bg-surface-container-high text-on-surface-variant',
  formacion: 'bg-[#ffdad6]/50 text-[#93000a]',
  tecnologia: 'bg-primary-fixed text-on-primary-fixed-variant',
}

export function ResourceDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const { resources, isLoading, isPreview } = useCMS()
  const resource = resources.find((r) => r.slug === slug)

  if (!resource) {
    if (isLoading || isPreview) return null
    return <Navigate to="/recursos" replace />
  }

  const text = resource.body || resource.excerpt
  const files = resource.files || []

  return (
    <div className="min-h-screen bg-surface text-on-surface">
      <Navbar variant="home" />
      <main className="pt-32 md:pt-36 lg:pt-40 pb-20">
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

          {files.length === 1 && (
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
          )}

          {files.length > 1 && (
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
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
