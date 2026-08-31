import fs from 'fs'

const path = new URL('../src/migrations/20260831_041819_initial.ts', import.meta.url)
let s = fs.readFileSync(path, 'utf8')

s = s.replace(
  /CREATE TYPE ("[^"]+"\."[^\"]+") AS ENUM\(([^)]+)\);/g,
  (_m, name, vals) =>
    `DO $$ BEGIN
  CREATE TYPE ${name} AS ENUM(${vals});
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;`,
)

s = s.replace(/CREATE TABLE (?!IF NOT EXISTS )/g, 'CREATE TABLE IF NOT EXISTS ')
s = s.replace(/CREATE UNIQUE INDEX (?!IF NOT EXISTS )/g, 'CREATE UNIQUE INDEX IF NOT EXISTS ')
s = s.replace(/CREATE INDEX (?!IF NOT EXISTS )/g, 'CREATE INDEX IF NOT EXISTS ')

s = s.replace(
  /ALTER TABLE ("[^"]+") ADD CONSTRAINT ("[^"]+") ([^;]+);/g,
  (_m, table, constraint, rest) =>
    `DO $$ BEGIN
  ALTER TABLE ${table} ADD CONSTRAINT ${constraint} ${rest};
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;`,
)

fs.writeFileSync(path, s)
const dup = (s.match(/WHEN duplicate_object THEN null/g) || []).length
const tables = (s.match(/CREATE TABLE IF NOT EXISTS/g) || []).length
console.log({ dup, tables, ok: true })
