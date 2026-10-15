import { Link } from "react-router-dom"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"

export function NotFoundPage() {
  return (
    <div className="min-h-screen bg-surface text-on-surface flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center px-6 pt-32 pb-20 text-center">
        <p className="font-label-md uppercase tracking-widest text-primary mb-4">404</p>
        <h1 className="font-heading text-headline-lg text-on-surface mb-4">Esta página no existe</h1>
        <p className="font-body text-body-lg text-on-surface-variant max-w-md mb-8">
          El enlace puede estar viejo o la dirección mal escrita.
        </p>
        <Link
          to="/"
          className="bg-primary text-on-primary px-8 py-3 rounded-full font-label-md uppercase tracking-widest hover:bg-primary-container transition-colors"
        >
          Volver al inicio
        </Link>
      </main>
      <Footer />
    </div>
  )
}
