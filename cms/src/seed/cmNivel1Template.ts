import coursesSnapshot from './coursesContent.json'

type CourseSnap = {
  slug: string
  blocks: (Record<string, unknown> & { type: string })[]
}

export function getCmNivel1TemplateBlocks(): (Record<string, unknown> & { type: string })[] {
  const course = (coursesSnapshot as CourseSnap[]).find(
    (c) => c.slug === 'community-manager-nivel-1',
  )
  return course?.blocks ? structuredClone(course.blocks) : []
}
