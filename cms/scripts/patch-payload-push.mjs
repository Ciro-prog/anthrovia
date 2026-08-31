/**
 * Payload 3.49 ignore `push: true` when NODE_ENV=production
 * (@payloadcms/db-postgres/dist/connect.js). This patch allows
 * explicit push: true to run in production (VPS Docker).
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const target = path.join(root, 'node_modules', '@payloadcms', 'db-postgres', 'dist', 'connect.js')

const before =
  "process.env.NODE_ENV !== 'production' && process.env.PAYLOAD_MIGRATING !== 'true' && this.push !== false"
const after =
  "(process.env.NODE_ENV !== 'production' || this.push === true) && process.env.PAYLOAD_MIGRATING !== 'true' && this.push !== false"

if (!fs.existsSync(target)) {
  console.error('[patch-payload-push] file not found:', target)
  process.exit(1)
}

let src = fs.readFileSync(target, 'utf8')
if (src.includes(after)) {
  console.log('[patch-payload-push] already patched')
  process.exit(0)
}
if (!src.includes(before)) {
  console.error('[patch-payload-push] target string not found in', target)
  process.exit(1)
}
src = src.replace(before, after)
fs.writeFileSync(target, src)
console.log('[patch-payload-push] patched', target)
