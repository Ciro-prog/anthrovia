import { Link } from 'react-router-dom'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

type NavVariant = 'home' | 'learning'

export function HoldingPage({
  eyebrow,
  title,
  message,
  ctaLabel = 'Volver al inicio',
  ctaTo = '/',
  navVariant = 'home',
}: {
  eyebrow?: string
  title: string
  message: string
  ctaLabel?: string
  ctaTo?: string
  navVariant?: NavVariant
}) {
  return (
    <div className="min-h-screen bg-surface text-on-surface flex flex-col">
      <Navbar variant={navVariant} />
      <main className="flex-1 flex flex-col items-center justify-center px-6 pt-32 pb-20 text-center">
        {eyebrow && (
          <p className="font-label-md uppercase tracking-widest text-primary mb-4">{eyebrow}</p>
        )}
        <h1 className="font-heading text-headline-lg text-on-surface mb-4">{title}</h1>
        <p className="font-body text-body-lg text-on-surface-variant max-w-md mb-8">{message}</p>
        <Link
          to={ctaTo}
          className="bg-primary text-on-primary px-8 py-3 rounded-full font-label-md uppercase tracking-widest hover:bg-primary-container transition-colors"
        >
          {ctaLabel}
        </Link>
      </main>
      <Footer />
    </div>
  )
}
