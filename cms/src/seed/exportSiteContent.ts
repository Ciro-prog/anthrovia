import { writeFileSync, mkdirSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import { initialContent } from '../../../src/data/initialContent'

const __dirname = dirname(fileURLToPath(import.meta.url))
const out = join(__dirname, 'siteContent.json')

const home = initialContent.sections.filter(
  (s) => !s.id.startsWith('learning-') && s.type !== 'courses',
)
const learning = initialContent.sections.filter(
  (s) => s.id.startsWith('learning-') || s.id === 'contact',
)

mkdirSync(dirname(out), { recursive: true })
writeFileSync(out, JSON.stringify({ home, learning }, null, 2))
console.log('wrote', out, home.length, learning.length)
