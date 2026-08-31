/**
 * Genera una migración de Payload sin Docker local
 * (Postgres embebido en puerto temporal).
 *
 * Requiere: npm i -D embedded-postgres (solo en la máquina que genera).
 * Uso: node scripts/gen-initial-migration.mjs [nombre]
 */
import { spawn } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import EmbeddedPostgres from 'embedded-postgres'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const dataDir = path.join(root, '.tmp-pg-migrate')
const port = 54329
const migrationName = process.argv[2] || 'initial'

async function run(cmd, args, env) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, {
      cwd: root,
      env: { ...process.env, ...env },
      stdio: 'inherit',
      shell: true,
    })
    child.on('exit', (code) => {
      if (code === 0) resolve()
      else reject(new Error(`${cmd} ${args.join(' ')} exited ${code}`))
    })
  })
}

async function main() {
  fs.rmSync(dataDir, { recursive: true, force: true })
  fs.mkdirSync(dataDir, { recursive: true })

  const pg = new EmbeddedPostgres({
    databaseDir: dataDir,
    user: 'anthrovia',
    password: 'anthrovia',
    port,
    persistent: false,
    initdbFlags: ['--encoding=UTF8', '--locale=C'],
  })

  console.log('[gen-migration] inicializando Postgres embebido…')
  await pg.initialise()
  await pg.start()
  await pg.createDatabase('anthrovia_cms')

  const DATABASE_URI = `postgresql://anthrovia:anthrovia@127.0.0.1:${port}/anthrovia_cms`
  const env = {
    DATABASE_URI,
    PAYLOAD_SECRET: 'dev-local-secret-anthrovia-change-in-prod-32chars',
    PAYLOAD_PUBLIC_SERVER_URL: 'http://localhost:3000',
    NEXT_PUBLIC_SERVER_URL: 'http://localhost:3000',
    NODE_ENV: 'development',
  }

  try {
    console.log(`[gen-migration] payload migrate:create ${migrationName}…`)
    await run(
      'npx',
      [
        'cross-env',
        'NODE_OPTIONS=--no-deprecation',
        'payload',
        'migrate:create',
        migrationName,
        '--force-accept-warning',
      ],
      env,
    )
  } finally {
    console.log('[gen-migration] deteniendo Postgres…')
    try {
      await pg.stop()
    } catch {
      // ignore
    }
    try {
      fs.rmSync(dataDir, { recursive: true, force: true })
    } catch {
      // Windows puede dejar el dir bloqueado un momento
    }
  }

  const migrationsDir = path.join(root, 'src', 'migrations')
  const files = fs.existsSync(migrationsDir) ? fs.readdirSync(migrationsDir) : []
  console.log('[gen-migration] listo:', files.join(', ') || '(sin archivos)')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
