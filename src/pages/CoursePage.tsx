import { useParams, Navigate, Link } from "react-router-dom"
import { useCMS } from "@/context/CMSContext"
import { CoursePageContent, CoursesSectionContent } from "@/types/cms"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { CourseBlockRenderer } from "@/components/learning/CourseBlockRenderer"

const COHORT_LABEL: Record<string, string> = {
  open: "Inscripciones abiertas",
  upcoming: "Próximamente",
  full: "Cupos agotados",
  closed: "Finalizado",
}

function formatCohortDate(value?: string) {
  if (!value) return ""
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return ""
  return date.toLocaleDateString("es-AR", { day: "numeric", month: "long", year: "numeric" })
}

function CourseCohortBadge({ course }: { course: CoursePageContent }) {
  const status = course.cohortStatus
  const start = formatCohortDate(course.cohortStartDate)
  const spots = typeof course.spots === "number" ? course.spots : undefined
  if (!status && !start && spots == null) return null

  return (
    <div className="mt-6 flex flex-wrap items-center gap-3" data-cms-field="cohortStatus">
      {status && (
        <span className="inline-flex items-center rounded-full bg-primary-fixed/40 text-on-primary-fixed-variant font-label-md text-xs uppercase tracking-widest px-3 py-1">
          {COHORT_LABEL[status] || status}
        </span>
      )}
      {start && (
        <span className="font-body text-body-md text-on-surface-variant" data-cms-field="cohortStartDate">
          Inicio: {start}
        </span>
      )}
      {spots != null && (
        <span className="font-body text-body-md text-on-surface-variant" data-cms-field="spots">
          Cupos: {spots}
        </span>
      )}
    </div>
  )
}

export const CoursePage = () => {
  const { slug } = useParams<{ slug: string }>()
  const { content, isLoading, isPreview } = useCMS()

  const coursesSection = content.sections.find((s) => s.type === "courses") as
    | CoursesSectionContent
    | undefined

  const course = coursesSection?.courses.find((c) => c.slug === slug)

  if (!course) {
    if (isLoading || isPreview) return null
    return <Navigate to="/capacitaciones" replace />
  }

  return (
    <div className="min-h-screen bg-background text-on-surface relative">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.04] md:opacity-[0.06]"
        style={{
          backgroundImage: "url(/ethos/bg-growth.png)",
          backgroundSize: "min(850px, 68vw)",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right -8% top 30%",
        }}
      />
      <div className="relative z-10">
        <Navbar variant="learning" />
        <main>
          <div className="pt-32 md:pt-36 lg:pt-40 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
            <Link
              to="/capacitaciones"
              className="inline-flex items-center gap-2 text-primary font-label-md text-label-md hover:underline underline-offset-4"
            >
              <span className="material-symbols-outlined text-[18px]">arrow_back</span>
              Volver a capacitaciones
            </Link>
            <CourseCohortBadge course={course} />
          </div>
          <CourseBlockRenderer blocks={course.blocks} />
        </main>
        <Footer />
      </div>
    </div>
  )
}
