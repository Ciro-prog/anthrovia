import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "dossier_page" (
      "id" serial PRIMARY KEY NOT NULL,
      "hero_title" varchar,
      "hero_highlight" varchar,
      "hero_subtitle" varchar,
      "hero_cta_primary" varchar,
      "hero_cta_secondary" varchar,
      "hero_image_id" integer,
      "trust_label" varchar,
      "challenge_title" varchar,
      "challenge_text" varchar,
      "challenge_quote" varchar,
      "challenge_cta" varchar,
      "familiar_title" varchar,
      "familiar_quote" varchar,
      "familiar_cta" varchar,
      "transform_title" varchar,
      "transform_image_id" integer,
      "transform_quote" varchar,
      "transform_cta" varchar,
      "features_title" varchar,
      "features_quote" varchar,
      "features_cta" varchar,
      "stats_title" varchar,
      "stats_cta" varchar,
      "why_title" varchar,
      "why_text" varchar,
      "why_cta" varchar,
      "why_image_id" integer,
      "why_quote" varchar,
      "path_title" varchar,
      "path_quote" varchar,
      "path_mailto_label" varchar,
      "form_title" varchar,
      "form_success_title" varchar,
      "form_success_text" varchar,
      "updated_at" timestamp(3) with time zone,
      "created_at" timestamp(3) with time zone
    );

    DO $$ BEGIN
      ALTER TABLE "dossier_page" ADD CONSTRAINT "dossier_page_hero_image_id_media_id_fk"
        FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null; END $$;
    DO $$ BEGIN
      ALTER TABLE "dossier_page" ADD CONSTRAINT "dossier_page_transform_image_id_media_id_fk"
        FOREIGN KEY ("transform_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null; END $$;
    DO $$ BEGIN
      ALTER TABLE "dossier_page" ADD CONSTRAINT "dossier_page_why_image_id_media_id_fk"
        FOREIGN KEY ("why_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    CREATE TABLE IF NOT EXISTS "dossier_page_trust_logos" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "name" varchar
    );
    CREATE TABLE IF NOT EXISTS "dossier_page_challenge_chips" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "label" varchar
    );
    CREATE TABLE IF NOT EXISTS "dossier_page_pain_points" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "icon" varchar,
      "title" varchar,
      "body" varchar
    );
    CREATE TABLE IF NOT EXISTS "dossier_page_pillars" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "icon" varchar,
      "title" varchar,
      "body" varchar
    );
    CREATE TABLE IF NOT EXISTS "dossier_page_features" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "icon" varchar,
      "title" varchar,
      "body" varchar,
      "wide" boolean DEFAULT false
    );
    CREATE TABLE IF NOT EXISTS "dossier_page_stats" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "icon" varchar,
      "value" varchar,
      "label" varchar
    );
    CREATE TABLE IF NOT EXISTS "dossier_page_why_items" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "title" varchar,
      "body" varchar
    );
    CREATE TABLE IF NOT EXISTS "dossier_page_steps" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "n" varchar,
      "title" varchar,
      "body" varchar
    );

    DO $$ BEGIN
      ALTER TABLE "dossier_page_trust_logos" ADD CONSTRAINT "dossier_page_trust_logos_parent_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."dossier_page"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null; END $$;
    DO $$ BEGIN
      ALTER TABLE "dossier_page_challenge_chips" ADD CONSTRAINT "dossier_page_challenge_chips_parent_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."dossier_page"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null; END $$;
    DO $$ BEGIN
      ALTER TABLE "dossier_page_pain_points" ADD CONSTRAINT "dossier_page_pain_points_parent_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."dossier_page"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null; END $$;
    DO $$ BEGIN
      ALTER TABLE "dossier_page_pillars" ADD CONSTRAINT "dossier_page_pillars_parent_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."dossier_page"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null; END $$;
    DO $$ BEGIN
      ALTER TABLE "dossier_page_features" ADD CONSTRAINT "dossier_page_features_parent_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."dossier_page"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null; END $$;
    DO $$ BEGIN
      ALTER TABLE "dossier_page_stats" ADD CONSTRAINT "dossier_page_stats_parent_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."dossier_page"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null; END $$;
    DO $$ BEGIN
      ALTER TABLE "dossier_page_why_items" ADD CONSTRAINT "dossier_page_why_items_parent_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."dossier_page"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null; END $$;
    DO $$ BEGIN
      ALTER TABLE "dossier_page_steps" ADD CONSTRAINT "dossier_page_steps_parent_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."dossier_page"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    CREATE INDEX IF NOT EXISTS "dossier_page_trust_logos_parent_idx" ON "dossier_page_trust_logos" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "dossier_page_challenge_chips_parent_idx" ON "dossier_page_challenge_chips" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "dossier_page_pain_points_parent_idx" ON "dossier_page_pain_points" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "dossier_page_pillars_parent_idx" ON "dossier_page_pillars" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "dossier_page_features_parent_idx" ON "dossier_page_features" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "dossier_page_stats_parent_idx" ON "dossier_page_stats" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "dossier_page_why_items_parent_idx" ON "dossier_page_why_items" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "dossier_page_steps_parent_idx" ON "dossier_page_steps" USING btree ("_parent_id");

    INSERT INTO "dossier_page" ("id", "updated_at", "created_at")
    SELECT 1, now(), now()
    WHERE NOT EXISTS (SELECT 1 FROM "dossier_page");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE IF EXISTS "dossier_page_steps";
    DROP TABLE IF EXISTS "dossier_page_why_items";
    DROP TABLE IF EXISTS "dossier_page_stats";
    DROP TABLE IF EXISTS "dossier_page_features";
    DROP TABLE IF EXISTS "dossier_page_pillars";
    DROP TABLE IF EXISTS "dossier_page_pain_points";
    DROP TABLE IF EXISTS "dossier_page_challenge_chips";
    DROP TABLE IF EXISTS "dossier_page_trust_logos";
    DROP TABLE IF EXISTS "dossier_page";
  `)
}
