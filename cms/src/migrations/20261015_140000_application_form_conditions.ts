import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "application_form_fields" ADD COLUMN IF NOT EXISTS "multiple" boolean DEFAULT false;
    ALTER TABLE "application_form_fields" ADD COLUMN IF NOT EXISTS "show_when_field" varchar;
    ALTER TABLE "application_form_fields" ADD COLUMN IF NOT EXISTS "show_when_equals" varchar;

    ALTER TABLE "applications" ADD COLUMN IF NOT EXISTS "education_area" varchar;
    ALTER TABLE "applications" ADD COLUMN IF NOT EXISTS "sales_sectors" varchar;
    ALTER TABLE "applications" ADD COLUMN IF NOT EXISTS "motivation" varchar;
    ALTER TABLE "applications" ADD COLUMN IF NOT EXISTS "health_attraction" varchar;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "applications" DROP COLUMN IF EXISTS "health_attraction";
    ALTER TABLE "applications" DROP COLUMN IF EXISTS "motivation";
    ALTER TABLE "applications" DROP COLUMN IF EXISTS "sales_sectors";
    ALTER TABLE "applications" DROP COLUMN IF EXISTS "education_area";
    ALTER TABLE "application_form_fields" DROP COLUMN IF EXISTS "show_when_equals";
    ALTER TABLE "application_form_fields" DROP COLUMN IF EXISTS "show_when_field";
    ALTER TABLE "application_form_fields" DROP COLUMN IF EXISTS "multiple";
  `)
}
