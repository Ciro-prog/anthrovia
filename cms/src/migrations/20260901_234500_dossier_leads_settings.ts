import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "leads" ADD COLUMN IF NOT EXISTS "company" varchar;
    ALTER TABLE "leads" ADD COLUMN IF NOT EXISTS "preferred_day" varchar;
    ALTER TABLE "leads" ADD COLUMN IF NOT EXISTS "preferred_slot" varchar;

    ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "privacy_title" varchar DEFAULT 'Política de Privacidad';
    ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "terms_title" varchar DEFAULT 'Términos y Condiciones';

    CREATE TABLE IF NOT EXISTS "site_settings_dossier_days" (
      "id" serial PRIMARY KEY NOT NULL,
      "order" integer NOT NULL,
      "parent_id" integer NOT NULL,
      "value" varchar
    );

    CREATE TABLE IF NOT EXISTS "site_settings_dossier_slots" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "label" varchar,
      "start" varchar,
      "end" varchar
    );

    CREATE TABLE IF NOT EXISTS "site_settings_privacy_sections" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "title" varchar,
      "content" varchar
    );

    CREATE TABLE IF NOT EXISTS "site_settings_terms_sections" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "title" varchar,
      "content" varchar
    );

    DO $$ BEGIN
      ALTER TABLE "site_settings_dossier_days" ADD CONSTRAINT "site_settings_dossier_days_parent_fk"
        FOREIGN KEY ("parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null;
    END $$;

    DO $$ BEGIN
      ALTER TABLE "site_settings_dossier_slots" ADD CONSTRAINT "site_settings_dossier_slots_parent_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null;
    END $$;

    DO $$ BEGIN
      ALTER TABLE "site_settings_privacy_sections" ADD CONSTRAINT "site_settings_privacy_sections_parent_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null;
    END $$;

    DO $$ BEGIN
      ALTER TABLE "site_settings_terms_sections" ADD CONSTRAINT "site_settings_terms_sections_parent_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null;
    END $$;

    CREATE INDEX IF NOT EXISTS "site_settings_dossier_days_parent_idx" ON "site_settings_dossier_days" USING btree ("parent_id");
    CREATE INDEX IF NOT EXISTS "site_settings_dossier_slots_parent_idx" ON "site_settings_dossier_slots" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "site_settings_privacy_sections_parent_idx" ON "site_settings_privacy_sections" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "site_settings_terms_sections_parent_idx" ON "site_settings_terms_sections" USING btree ("_parent_id");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE IF EXISTS "site_settings_dossier_days";
    DROP TABLE IF EXISTS "site_settings_dossier_slots";
    DROP TABLE IF EXISTS "site_settings_privacy_sections";
    DROP TABLE IF EXISTS "site_settings_terms_sections";
    ALTER TABLE "site_settings" DROP COLUMN IF EXISTS "privacy_title";
    ALTER TABLE "site_settings" DROP COLUMN IF EXISTS "terms_title";
    ALTER TABLE "leads" DROP COLUMN IF EXISTS "company";
    ALTER TABLE "leads" DROP COLUMN IF EXISTS "preferred_day";
    ALTER TABLE "leads" DROP COLUMN IF EXISTS "preferred_slot";
  `)
}
