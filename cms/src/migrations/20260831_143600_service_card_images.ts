import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "pages_blocks_services_services" ADD COLUMN IF NOT EXISTS "image_id" integer;
    ALTER TABLE "pages_blocks_services_services" ADD COLUMN IF NOT EXISTS "image_url" varchar;
    ALTER TABLE "_pages_v_blocks_services_services" ADD COLUMN IF NOT EXISTS "image_id" integer;
    ALTER TABLE "_pages_v_blocks_services_services" ADD COLUMN IF NOT EXISTS "image_url" varchar;

    DO $$ BEGIN
      ALTER TABLE "pages_blocks_services_services"
        ADD CONSTRAINT "pages_blocks_services_services_image_id_media_id_fk"
        FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;

    DO $$ BEGIN
      ALTER TABLE "_pages_v_blocks_services_services"
        ADD CONSTRAINT "_pages_v_blocks_services_services_image_id_media_id_fk"
        FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;

    CREATE INDEX IF NOT EXISTS "pages_blocks_services_services_image_idx"
      ON "pages_blocks_services_services" USING btree ("image_id");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_services_services_image_idx"
      ON "_pages_v_blocks_services_services" USING btree ("image_id");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "pages_blocks_services_services" DROP CONSTRAINT IF EXISTS "pages_blocks_services_services_image_id_media_id_fk";
    ALTER TABLE "_pages_v_blocks_services_services" DROP CONSTRAINT IF EXISTS "_pages_v_blocks_services_services_image_id_media_id_fk";
    DROP INDEX IF EXISTS "pages_blocks_services_services_image_idx";
    DROP INDEX IF EXISTS "_pages_v_blocks_services_services_image_idx";
    ALTER TABLE "pages_blocks_services_services" DROP COLUMN IF EXISTS "image_id";
    ALTER TABLE "pages_blocks_services_services" DROP COLUMN IF EXISTS "image_url";
    ALTER TABLE "_pages_v_blocks_services_services" DROP COLUMN IF EXISTS "image_id";
    ALTER TABLE "_pages_v_blocks_services_services" DROP COLUMN IF EXISTS "image_url";
  `)
}
