import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$ BEGIN
      CREATE TYPE "public"."enum_resources_category" AS ENUM(
        'reclutamiento', 'empleabilidad', 'formacion', 'tecnologia'
      );
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    DO $$ BEGIN
      CREATE TYPE "public"."enum_resources_icon" AS ENUM(
        'description', 'fact_check', 'assignment_ind', 'co_present', 'smart_toy', 'analytics'
      );
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    CREATE TABLE IF NOT EXISTS "resources" (
      "id" serial PRIMARY KEY NOT NULL,
      "title" varchar NOT NULL,
      "slug" varchar NOT NULL,
      "category" "enum_resources_category" DEFAULT 'reclutamiento' NOT NULL,
      "icon" "enum_resources_icon" DEFAULT 'description',
      "excerpt" varchar NOT NULL,
      "body" varchar,
      "published" boolean DEFAULT true,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );

    CREATE UNIQUE INDEX IF NOT EXISTS "resources_slug_idx" ON "resources" USING btree ("slug");
    CREATE INDEX IF NOT EXISTS "resources_updated_at_idx" ON "resources" USING btree ("updated_at");
    CREATE INDEX IF NOT EXISTS "resources_created_at_idx" ON "resources" USING btree ("created_at");

    CREATE TABLE IF NOT EXISTS "resources_files" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "file_id" integer,
      "label" varchar
    );

    DO $$ BEGIN
      ALTER TABLE "resources_files" ADD CONSTRAINT "resources_files_parent_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."resources"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    DO $$ BEGIN
      ALTER TABLE "resources_files" ADD CONSTRAINT "resources_files_file_id_media_id_fk"
        FOREIGN KEY ("file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    CREATE INDEX IF NOT EXISTS "resources_files_parent_idx" ON "resources_files" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "resources_files_order_idx" ON "resources_files" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "resources_files_file_idx" ON "resources_files" USING btree ("file_id");

    ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "resources_id" integer;

    DO $$ BEGIN
      ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_resources_fk"
        FOREIGN KEY ("resources_id") REFERENCES "public"."resources"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_resources_id_idx"
      ON "payload_locked_documents_rels" USING btree ("resources_id");

    CREATE TABLE IF NOT EXISTS "resources_page" (
      "id" serial PRIMARY KEY NOT NULL,
      "eyebrow" varchar DEFAULT 'Recursos Gratuitos',
      "title" varchar,
      "subtitle" varchar,
      "cta_label" varchar DEFAULT 'VER RECURSOS',
      "intro_title" varchar,
      "intro_text" varchar,
      "intro_callout" varchar,
      "intro_image1_id" integer,
      "intro_image2_id" integer,
      "intro_image3_id" integer,
      "catalog_title" varchar DEFAULT 'Catálogo de Recursos',
      "how_title" varchar,
      "closing_title" varchar,
      "closing_text" varchar,
      "closing_cta" varchar DEFAULT 'EXPLORAR RECURSOS',
      "updated_at" timestamp(3) with time zone,
      "created_at" timestamp(3) with time zone
    );

    DO $$ BEGIN
      ALTER TABLE "resources_page" ADD CONSTRAINT "resources_page_intro_image1_id_media_id_fk"
        FOREIGN KEY ("intro_image1_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null; END $$;
    DO $$ BEGIN
      ALTER TABLE "resources_page" ADD CONSTRAINT "resources_page_intro_image2_id_media_id_fk"
        FOREIGN KEY ("intro_image2_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null; END $$;
    DO $$ BEGIN
      ALTER TABLE "resources_page" ADD CONSTRAINT "resources_page_intro_image3_id_media_id_fk"
        FOREIGN KEY ("intro_image3_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    CREATE TABLE IF NOT EXISTS "resources_page_steps" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "title" varchar,
      "text" varchar
    );

    DO $$ BEGIN
      ALTER TABLE "resources_page_steps" ADD CONSTRAINT "resources_page_steps_parent_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."resources_page"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    CREATE INDEX IF NOT EXISTS "resources_page_steps_parent_idx" ON "resources_page_steps" USING btree ("_parent_id");

    INSERT INTO "resources_page" ("id", "eyebrow", "title", "updated_at", "created_at")
    SELECT 1, 'Recursos Gratuitos',
      'Herramientas para potenciar tu desarrollo y tu gestión de personas.',
      now(), now()
    WHERE NOT EXISTS (SELECT 1 FROM "resources_page");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_resources_fk";
    DROP INDEX IF EXISTS "payload_locked_documents_rels_resources_id_idx";
    ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "resources_id";
    DROP TABLE IF EXISTS "resources_files";
    DROP TABLE IF EXISTS "resources";
    DROP TABLE IF EXISTS "resources_page_steps";
    DROP TABLE IF EXISTS "resources_page";
    DROP TYPE IF EXISTS "public"."enum_resources_category";
    DROP TYPE IF EXISTS "public"."enum_resources_icon";
  `)
}
