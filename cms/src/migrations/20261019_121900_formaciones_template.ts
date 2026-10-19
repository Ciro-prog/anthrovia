import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$ BEGIN
      CREATE TYPE "public"."enum_pages_blocks_services_formaciones_template" AS ENUM(
        'cm-nivel-1',
        'cm-pro',
        'hablar-publico',
        'academia-comercial',
        'liderazgo-emocional'
      );
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    DO $$ BEGIN
      CREATE TYPE "public"."enum__pages_v_blocks_services_formaciones_template" AS ENUM(
        'cm-nivel-1',
        'cm-pro',
        'hablar-publico',
        'academia-comercial',
        'liderazgo-emocional'
      );
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    DO $$ BEGIN
      CREATE TYPE "public"."enum_courses_template" AS ENUM(
        'cm-nivel-1',
        'cm-pro',
        'hablar-publico',
        'academia-comercial',
        'liderazgo-emocional'
      );
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    ALTER TABLE "pages_blocks_services_formaciones"
      ADD COLUMN IF NOT EXISTS "template" "enum_pages_blocks_services_formaciones_template" DEFAULT 'cm-nivel-1';

    ALTER TABLE "_pages_v_blocks_services_formaciones"
      ADD COLUMN IF NOT EXISTS "template" "enum__pages_v_blocks_services_formaciones_template" DEFAULT 'cm-nivel-1';

    ALTER TABLE "courses"
      ADD COLUMN IF NOT EXISTS "template" "enum_courses_template" DEFAULT 'cm-nivel-1';

    UPDATE "courses" SET "template" = 'cm-nivel-1' WHERE "slug" = 'community-manager-nivel-1';
    UPDATE "courses" SET "template" = 'cm-pro' WHERE "slug" = 'community-manager-pro';
    UPDATE "courses" SET "template" = 'hablar-publico' WHERE "slug" = 'hablar-en-publico';
    UPDATE "courses" SET "template" = 'academia-comercial' WHERE "slug" = 'academia-desarrollo-comercial';
    UPDATE "courses" SET "template" = 'liderazgo-emocional' WHERE "slug" = 'liderazgo-emocional';

    UPDATE "pages_blocks_services_formaciones" SET "template" = 'cm-nivel-1' WHERE "item_id" = 'cm-nivel-1';
    UPDATE "pages_blocks_services_formaciones" SET "template" = 'cm-pro' WHERE "item_id" = 'cm-pro';
    UPDATE "pages_blocks_services_formaciones" SET "template" = 'hablar-publico' WHERE "item_id" = 'hablar-publico';
    UPDATE "pages_blocks_services_formaciones" SET "template" = 'academia-comercial' WHERE "item_id" = 'academia-comercial';
    UPDATE "pages_blocks_services_formaciones" SET "template" = 'liderazgo-emocional' WHERE "item_id" = 'liderazgo-emocional';
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "pages_blocks_services_formaciones" DROP COLUMN IF EXISTS "template";
    ALTER TABLE "_pages_v_blocks_services_formaciones" DROP COLUMN IF EXISTS "template";
    ALTER TABLE "courses" DROP COLUMN IF EXISTS "template";
    DROP TYPE IF EXISTS "public"."enum_pages_blocks_services_formaciones_template";
    DROP TYPE IF EXISTS "public"."enum__pages_v_blocks_services_formaciones_template";
    DROP TYPE IF EXISTS "public"."enum_courses_template";
  `)
}
