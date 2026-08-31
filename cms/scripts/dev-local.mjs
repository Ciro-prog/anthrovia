/**
 * Dev local sin Docker: Postgres embebido + next dev.
 * Requiere: npm i -D embedded-postgres (ya puede estar en node_modules)
 *
 * Uso: node scripts/dev-local.mjs
 */
import { spawn } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import EmbeddedPostgres from 'embedded-postgres'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const dataDir = path.join(root, '.tmp-pg-dev')
const port = 54329

const DATABASE_URI = `postgresql://anthrovia:anthrovia@127.0.0.1:${port}/anthrovia_cms`
const env = {
  ...process.env,
  DATABASE_URI,
  PAYLOAD_SECRET: process.env.PAYLOAD_SECRET || 'dev-local-secret-anthrovia-change-in-prod-32chars',
  PAYLOAD_PUBLIC_SERVER_URL: 'http://localhost:3000',
  NEXT_PUBLIC_SERVER_URL: 'http://localhost:3000',
  CORS_ORIGINS: 'http://localhost:5173,http://localhost:4173,http://127.0.0.1:5173',
  NODE_ENV: 'development',
}

function run(cmd, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, { cwd: root, env, stdio: 'inherit', shell: true })
    child.on('exit', (code) => (code === 0 ? resolve() : reject(new Error(`${cmd} exit ${code}`))))
  })
}

const pg = new EmbeddedPostgres({
  databaseDir: dataDir,
  user: 'anthrovia',
  password: 'anthrovia',
  port,
  persistent: true,
  initdbFlags: ['--encoding=UTF8', '--locale=C'],
})

async function main() {
  if (!fs.existsSync(path.join(dataDir, 'PG_VERSION'))) {
    fs.mkdirSync(dataDir, { recursive: true })
    console.log('[dev-local] init Postgres embebido…')
    await pg.initialise()
  }

  console.log('[dev-local] start Postgres :' + port)
  await pg.start()
  try {
    await pg.createDatabase('anthrovia_cms')
  } catch {
    // ya existe
  }

  console.log('[dev-local] migraciones…')
  await run('npx', ['cross-env', 'NODE_OPTIONS=--no-deprecation', 'payload', 'migrate'])

  console.log('[dev-local] next dev → http://localhost:3000/admin')
  const next = spawn(
    'npx',
    ['cross-env', 'NODE_OPTIONS=--no-deprecation', 'next', 'dev', '-p', '3000'],
    { cwd: root, env, stdio: 'inherit', shell: true },
  )

  const shutdown = async () => {
    next.kill('SIGTERM')
    try {
      await pg.stop()
    } catch {
      // ignore
    }
    process.exit(0)
  }
  process.on('SIGINT', shutdown)
  process.on('SIGTERM', shutdown)

  next.on('exit', async (code) => {
    try {
      await pg.stop()
    } catch {
      // ignore
    }
    process.exit(code ?? 0)
  })
}

main().catch(async (err) => {
  console.error(err)
  try {
    await pg.stop()
  } catch {
    // ignore
  }
  process.exit(1)
})
