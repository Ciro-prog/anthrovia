import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "loading_title" varchar DEFAULT 'Cargando';
    ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "loading_message" varchar DEFAULT 'Estamos cargando el contenido…';
    ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "not_found_title" varchar DEFAULT 'En mantenimiento';
    ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "not_found_message" varchar;
    ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "not_found_cta_label" varchar DEFAULT 'Volver al inicio';
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "site_settings" DROP COLUMN IF EXISTS "not_found_cta_label";
    ALTER TABLE "site_settings" DROP COLUMN IF EXISTS "not_found_message";
    ALTER TABLE "site_settings" DROP COLUMN IF EXISTS "not_found_title";
    ALTER TABLE "site_settings" DROP COLUMN IF EXISTS "loading_message";
    ALTER TABLE "site_settings" DROP COLUMN IF EXISTS "loading_title";
  `)
}
