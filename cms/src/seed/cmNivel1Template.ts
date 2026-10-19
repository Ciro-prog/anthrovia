import { normalizeFormacionTemplate, TEMPLATE_COURSE_SLUGS } from '../lib/formacionTemplates'
import coursesSnapshot from './coursesContent.json'

type CourseSnap = {
  slug: string
  blocks: (Record<string, unknown> & { type: string })[]
}

export function getCmNivel1TemplateBlocks(): (Record<string, unknown> & { type: string })[] {
  return getFormacionTemplateBlocks('cm-nivel-1')
}

export function getFormacionTemplateBlocks(
  template: unknown,
): (Record<string, unknown> & { type: string })[] {
  const slug = TEMPLATE_COURSE_SLUGS[normalizeFormacionTemplate(template)]
  if (!slug) return []
  const course = (coursesSnapshot as CourseSnap[]).find((c) => c.slug === slug)
  return course?.blocks ? structuredClone(course.blocks) : []
}
