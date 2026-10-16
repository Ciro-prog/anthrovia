import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "resources_page" ADD COLUMN IF NOT EXISTS "section_visible" boolean DEFAULT true;
    ALTER TABLE "resources_page" ADD COLUMN IF NOT EXISTS "coming_soon_title" varchar DEFAULT 'Próximamente';
    ALTER TABLE "resources_page" ADD COLUMN IF NOT EXISTS "coming_soon_text" varchar;

    ALTER TABLE "resources" ADD COLUMN IF NOT EXISTS "image_id" integer;

    DO $$ BEGIN
      ALTER TABLE "resources" ADD CONSTRAINT "resources_image_id_media_id_fk"
        FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    CREATE INDEX IF NOT EXISTS "resources_image_idx" ON "resources" USING btree ("image_id");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "resources" DROP CONSTRAINT IF EXISTS "resources_image_id_media_id_fk";
    DROP INDEX IF EXISTS "resources_image_idx";
    ALTER TABLE "resources" DROP COLUMN IF EXISTS "image_id";
    ALTER TABLE "resources_page" DROP COLUMN IF EXISTS "coming_soon_text";
    ALTER TABLE "resources_page" DROP COLUMN IF EXISTS "coming_soon_title";
    ALTER TABLE "resources_page" DROP COLUMN IF EXISTS "section_visible";
  `)
}
