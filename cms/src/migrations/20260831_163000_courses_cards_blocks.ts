import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "courses" ADD COLUMN IF NOT EXISTS "category" varchar;
    ALTER TABLE "courses" ADD COLUMN IF NOT EXISTS "description" varchar;
    ALTER TABLE "courses" ADD COLUMN IF NOT EXISTS "image_id" integer;
    ALTER TABLE "courses" ADD COLUMN IF NOT EXISTS "image_url" varchar;

    DO $$ BEGIN
      ALTER TABLE "courses" ADD CONSTRAINT "courses_image_id_media_id_fk"
        FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null;
    END $$;

    CREATE INDEX IF NOT EXISTS "courses_image_idx" ON "courses" USING btree ("image_id");

    ALTER TABLE "pages_blocks_services_formaciones" ADD COLUMN IF NOT EXISTS "course_id" integer;
    ALTER TABLE "_pages_v_blocks_services_formaciones" ADD COLUMN IF NOT EXISTS "course_id" integer;

    DO $$ BEGIN
      ALTER TABLE "pages_blocks_services_formaciones" ADD CONSTRAINT "pages_blocks_services_formaciones_course_id_fk"
        FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null;
    END $$;

    DO $$ BEGIN
      ALTER TABLE "_pages_v_blocks_services_formaciones" ADD CONSTRAINT "_pages_v_blocks_services_formaciones_course_id_fk"
        FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null;
    END $$;

    CREATE INDEX IF NOT EXISTS "pages_blocks_services_formaciones_course_idx"
      ON "pages_blocks_services_formaciones" USING btree ("course_id");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_services_formaciones_course_idx"
      ON "_pages_v_blocks_services_formaciones" USING btree ("course_id");

    ALTER TABLE "courses" ALTER COLUMN "blocks" DROP NOT NULL;
  `)

  await db.execute(sql`
    DO $$ BEGIN CREATE TYPE "public"."enum_courses_blocks_hero_layout" AS ENUM('editorial', 'centered'); EXCEPTION WHEN duplicate_object THEN null; END $$;
    DO $$ BEGIN CREATE TYPE "public"."enum_courses_blocks_hero_buttons_variant" AS ENUM('primary', 'secondary', 'outline'); EXCEPTION WHEN duplicate_object THEN null; END $$;
    DO $$ BEGIN CREATE TYPE "public"."enum_courses_blocks_rich_text_background" AS ENUM('surface', 'low', 'container'); EXCEPTION WHEN duplicate_object THEN null; END $$;
    DO $$ BEGIN CREATE TYPE "public"."enum_courses_blocks_rich_text_align" AS ENUM('left', 'center'); EXCEPTION WHEN duplicate_object THEN null; END $$;
    DO $$ BEGIN CREATE TYPE "public"."enum_courses_blocks_two_column_background" AS ENUM('surface', 'low', 'container'); EXCEPTION WHEN duplicate_object THEN null; END $$;
    DO $$ BEGIN CREATE TYPE "public"."enum_courses_blocks_icon_grid_background" AS ENUM('surface', 'low', 'container'); EXCEPTION WHEN duplicate_object THEN null; END $$;
    DO $$ BEGIN CREATE TYPE "public"."enum_courses_blocks_icon_grid_items_tone" AS ENUM('secondary', 'primary'); EXCEPTION WHEN duplicate_object THEN null; END $$;
    DO $$ BEGIN CREATE TYPE "public"."enum_courses_blocks_split_media_image_position" AS ENUM('left', 'right'); EXCEPTION WHEN duplicate_object THEN null; END $$;
    DO $$ BEGIN CREATE TYPE "public"."enum_courses_blocks_split_media_background" AS ENUM('surface', 'low', 'container', 'dark'); EXCEPTION WHEN duplicate_object THEN null; END $$;
    DO $$ BEGIN CREATE TYPE "public"."enum_courses_blocks_pricing_buttons_variant" AS ENUM('primary', 'secondary', 'outline'); EXCEPTION WHEN duplicate_object THEN null; END $$;
    DO $$ BEGIN CREATE TYPE "public"."enum_courses_blocks_schedule_cta_buttons_variant" AS ENUM('primary', 'secondary', 'outline'); EXCEPTION WHEN duplicate_object THEN null; END $$;
    DO $$ BEGIN CREATE TYPE "public"."enum_courses_blocks_closing_cta_primary_variant" AS ENUM('primary', 'secondary', 'outline'); EXCEPTION WHEN duplicate_object THEN null; END $$;
    DO $$ BEGIN CREATE TYPE "public"."enum_courses_blocks_closing_cta_secondary_variant" AS ENUM('primary', 'secondary', 'outline'); EXCEPTION WHEN duplicate_object THEN null; END $$;
  `)

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "courses_blocks_hero" (
      "_order" integer NOT NULL, "_parent_id" integer NOT NULL, "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL, "title" varchar, "title_italic" varchar,
      "paragraphs_text" varchar, "highlight" varchar, "image_id" integer, "image_url" varchar,
      "logo_id" integer, "logo_url" varchar, "layout" "enum_courses_blocks_hero_layout",
      "checks_text" varchar, "block_name" varchar
    );
    CREATE TABLE IF NOT EXISTS "courses_blocks_hero_buttons" (
      "_order" integer NOT NULL, "_parent_id" varchar NOT NULL, "id" varchar PRIMARY KEY NOT NULL,
      "text" varchar, "link" varchar, "variant" "enum_courses_blocks_hero_buttons_variant" DEFAULT 'primary'
    );
    CREATE TABLE IF NOT EXISTS "courses_blocks_rich_text" (
      "_order" integer NOT NULL, "_parent_id" integer NOT NULL, "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL, "eyebrow" varchar, "title" varchar, "title_italic" varchar,
      "body" varchar, "paragraphs_text" varchar, "background" "enum_courses_blocks_rich_text_background",
      "align" "enum_courses_blocks_rich_text_align", "block_name" varchar
    );
    CREATE TABLE IF NOT EXISTS "courses_blocks_context_split" (
      "_order" integer NOT NULL, "_parent_id" integer NOT NULL, "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL, "title" varchar, "title_italic" varchar,
      "paragraphs_text" varchar, "formula_label" varchar, "closing" varchar,
      "image_id" integer, "image_url" varchar, "block_name" varchar
    );
    CREATE TABLE IF NOT EXISTS "courses_blocks_context_split_formula_items" (
      "_order" integer NOT NULL, "_parent_id" varchar NOT NULL, "id" varchar PRIMARY KEY NOT NULL,
      "icon_name" varchar, "label" varchar
    );
    CREATE TABLE IF NOT EXISTS "courses_blocks_before_after" (
      "_order" integer NOT NULL, "_parent_id" integer NOT NULL, "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL, "title" varchar, "body" varchar,
      "before_title" varchar, "before_items_text" varchar, "after_title" varchar,
      "after_items_text" varchar, "block_name" varchar
    );
    CREATE TABLE IF NOT EXISTS "courses_blocks_triad" (
      "_order" integer NOT NULL, "_parent_id" integer NOT NULL, "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL, "title" varchar, "block_name" varchar
    );
    CREATE TABLE IF NOT EXISTS "courses_blocks_triad_items" (
      "_order" integer NOT NULL, "_parent_id" varchar NOT NULL, "id" varchar PRIMARY KEY NOT NULL,
      "title" varchar, "body" varchar, "featured" boolean DEFAULT false
    );
    CREATE TABLE IF NOT EXISTS "courses_blocks_desire_fear" (
      "_order" integer NOT NULL, "_parent_id" integer NOT NULL, "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL, "title" varchar, "desire_title" varchar,
      "desire_items_text" varchar, "fear_title" varchar, "fear_items_text" varchar, "block_name" varchar
    );
    CREATE TABLE IF NOT EXISTS "courses_blocks_pathway" (
      "_order" integer NOT NULL, "_parent_id" integer NOT NULL, "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL, "eyebrow" varchar, "intro_text" varchar,
      "for_you_label" varchar, "for_you_text" varchar, "note" varchar, "steps_title" varchar,
      "steps_title_italic" varchar, "aside" varchar, "block_name" varchar
    );
    CREATE TABLE IF NOT EXISTS "courses_blocks_pathway_steps" (
      "_order" integer NOT NULL, "_parent_id" varchar NOT NULL, "id" varchar PRIMARY KEY NOT NULL,
      "title" varchar, "paragraphs_text" varchar, "result" varchar, "image_id" integer,
      "image_url" varchar, "image_first" boolean DEFAULT false, "highlight" boolean DEFAULT false
    );
    CREATE TABLE IF NOT EXISTS "courses_blocks_tools_split" (
      "_order" integer NOT NULL, "_parent_id" integer NOT NULL, "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL, "title" varchar, "paragraphs_text" varchar,
      "image_id" integer, "image_url" varchar, "block_name" varchar
    );
    CREATE TABLE IF NOT EXISTS "courses_blocks_tools_split_categories" (
      "_order" integer NOT NULL, "_parent_id" varchar NOT NULL, "id" varchar PRIMARY KEY NOT NULL,
      "title" varchar, "tools" varchar
    );
    CREATE TABLE IF NOT EXISTS "courses_blocks_philosophy" (
      "_order" integer NOT NULL, "_parent_id" integer NOT NULL, "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL, "title" varchar, "paragraphs_text" varchar,
      "emphasis" varchar, "paragraphs_after_text" varchar, "block_name" varchar
    );
    CREATE TABLE IF NOT EXISTS "courses_blocks_testimonials" (
      "_order" integer NOT NULL, "_parent_id" integer NOT NULL, "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL, "title" varchar, "block_name" varchar
    );
    CREATE TABLE IF NOT EXISTS "courses_blocks_testimonials_items" (
      "_order" integer NOT NULL, "_parent_id" varchar NOT NULL, "id" varchar PRIMARY KEY NOT NULL,
      "quote" varchar, "author" varchar
    );
    CREATE TABLE IF NOT EXISTS "courses_blocks_teacher_band" (
      "_order" integer NOT NULL, "_parent_id" integer NOT NULL, "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL, "title" varchar, "lead" varchar, "name" varchar,
      "role" varchar, "experience_label" varchar, "experience_text" varchar,
      "paragraphs_text" varchar, "emphasis" varchar, "image_id" integer, "image_url" varchar,
      "block_name" varchar
    );
    CREATE TABLE IF NOT EXISTS "courses_blocks_investment_card" (
      "_order" integer NOT NULL, "_parent_id" integer NOT NULL, "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL, "title" varchar, "badge" varchar,
      "inclusions_text" varchar, "price_old" varchar, "price_new" varchar,
      "discount_badge" varchar, "block_name" varchar
    );
    CREATE TABLE IF NOT EXISTS "courses_blocks_bonuses" (
      "_order" integer NOT NULL, "_parent_id" integer NOT NULL, "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL, "title" varchar, "footer" varchar, "block_name" varchar
    );
    CREATE TABLE IF NOT EXISTS "courses_blocks_bonuses_items" (
      "_order" integer NOT NULL, "_parent_id" varchar NOT NULL, "id" varchar PRIMARY KEY NOT NULL,
      "label" varchar, "title" varchar, "description" varchar, "value_label" varchar,
      "featured" boolean DEFAULT false
    );
    CREATE TABLE IF NOT EXISTS "courses_blocks_closing_cta" (
      "_order" integer NOT NULL, "_parent_id" integer NOT NULL, "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL, "title" varchar, "title_italic" varchar,
      "primary_text" varchar, "primary_link" varchar,
      "primary_variant" "enum_courses_blocks_closing_cta_primary_variant",
      "doubt_title" varchar, "doubt_body" varchar, "secondary_text" varchar,
      "secondary_link" varchar, "secondary_variant" "enum_courses_blocks_closing_cta_secondary_variant",
      "block_name" varchar
    );
    CREATE TABLE IF NOT EXISTS "courses_blocks_two_column" (
      "_order" integer NOT NULL, "_parent_id" integer NOT NULL, "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL, "left_eyebrow" varchar, "left_title" varchar,
      "left_body" varchar, "right_eyebrow" varchar, "right_title" varchar, "right_body" varchar,
      "background" "enum_courses_blocks_two_column_background", "block_name" varchar
    );
    CREATE TABLE IF NOT EXISTS "courses_blocks_icon_grid" (
      "_order" integer NOT NULL, "_parent_id" integer NOT NULL, "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL, "title" varchar, "description" varchar,
      "background" "enum_courses_blocks_icon_grid_background", "block_name" varchar
    );
    CREATE TABLE IF NOT EXISTS "courses_blocks_icon_grid_items" (
      "_order" integer NOT NULL, "_parent_id" varchar NOT NULL, "id" varchar PRIMARY KEY NOT NULL,
      "icon_name" varchar, "title" varchar, "description" varchar,
      "tone" "enum_courses_blocks_icon_grid_items_tone"
    );
    CREATE TABLE IF NOT EXISTS "courses_blocks_split_media" (
      "_order" integer NOT NULL, "_parent_id" integer NOT NULL, "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL, "title" varchar, "body" varchar,
      "image_id" integer, "image_url" varchar,
      "image_position" "enum_courses_blocks_split_media_image_position",
      "background" "enum_courses_blocks_split_media_background", "block_name" varchar
    );
    CREATE TABLE IF NOT EXISTS "courses_blocks_dark_band" (
      "_order" integer NOT NULL, "_parent_id" integer NOT NULL, "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL, "title" varchar, "body" varchar,
      "image_id" integer, "image_url" varchar, "block_name" varchar
    );
    CREATE TABLE IF NOT EXISTS "courses_blocks_tags" (
      "_order" integer NOT NULL, "_parent_id" integer NOT NULL, "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL, "title" varchar, "body" varchar, "tags_text" varchar,
      "aside_title" varchar, "aside_body" varchar, "block_name" varchar
    );
    CREATE TABLE IF NOT EXISTS "courses_blocks_instructors" (
      "_order" integer NOT NULL, "_parent_id" integer NOT NULL, "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL, "title" varchar, "block_name" varchar
    );
    CREATE TABLE IF NOT EXISTS "courses_blocks_instructors_people" (
      "_order" integer NOT NULL, "_parent_id" varchar NOT NULL, "id" varchar PRIMARY KEY NOT NULL,
      "name" varchar, "role" varchar, "bio" varchar, "image_id" integer, "image_url" varchar
    );
    CREATE TABLE IF NOT EXISTS "courses_blocks_faq" (
      "_order" integer NOT NULL, "_parent_id" integer NOT NULL, "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL, "title" varchar, "block_name" varchar
    );
    CREATE TABLE IF NOT EXISTS "courses_blocks_faq_items" (
      "_order" integer NOT NULL, "_parent_id" varchar NOT NULL, "id" varchar PRIMARY KEY NOT NULL,
      "question" varchar, "answer" varchar
    );
    CREATE TABLE IF NOT EXISTS "courses_blocks_pricing" (
      "_order" integer NOT NULL, "_parent_id" integer NOT NULL, "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL, "title" varchar, "body" varchar, "price_label" varchar,
      "price_amount" varchar, "strikethrough" varchar, "badge" varchar, "block_name" varchar
    );
    CREATE TABLE IF NOT EXISTS "courses_blocks_pricing_items" (
      "_order" integer NOT NULL, "_parent_id" varchar NOT NULL, "id" varchar PRIMARY KEY NOT NULL,
      "title" varchar, "description" varchar, "value_label" varchar
    );
    CREATE TABLE IF NOT EXISTS "courses_blocks_pricing_buttons" (
      "_order" integer NOT NULL, "_parent_id" varchar NOT NULL, "id" varchar PRIMARY KEY NOT NULL,
      "text" varchar, "link" varchar, "variant" "enum_courses_blocks_pricing_buttons_variant" DEFAULT 'primary'
    );
    CREATE TABLE IF NOT EXISTS "courses_blocks_schedule_cta" (
      "_order" integer NOT NULL, "_parent_id" integer NOT NULL, "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL, "title" varchar, "body" varchar, "meta_title" varchar,
      "meta_body" varchar, "chips_text" varchar, "block_name" varchar
    );
    CREATE TABLE IF NOT EXISTS "courses_blocks_schedule_cta_buttons" (
      "_order" integer NOT NULL, "_parent_id" varchar NOT NULL, "id" varchar PRIMARY KEY NOT NULL,
      "text" varchar, "link" varchar, "variant" "enum_courses_blocks_schedule_cta_buttons_variant" DEFAULT 'primary'
    );
  `)

  await db.execute(sql`
    DO $$ BEGIN ALTER TABLE "courses_blocks_hero" ADD CONSTRAINT "courses_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action; EXCEPTION WHEN duplicate_object THEN null; END $$;
    DO $$ BEGIN ALTER TABLE "courses_blocks_hero_buttons" ADD CONSTRAINT "courses_blocks_hero_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses_blocks_hero"("id") ON DELETE cascade ON UPDATE no action; EXCEPTION WHEN duplicate_object THEN null; END $$;
    DO $$ BEGIN ALTER TABLE "courses_blocks_rich_text" ADD CONSTRAINT "courses_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action; EXCEPTION WHEN duplicate_object THEN null; END $$;
    DO $$ BEGIN ALTER TABLE "courses_blocks_context_split" ADD CONSTRAINT "courses_blocks_context_split_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action; EXCEPTION WHEN duplicate_object THEN null; END $$;
    DO $$ BEGIN ALTER TABLE "courses_blocks_context_split_formula_items" ADD CONSTRAINT "courses_blocks_context_split_formula_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses_blocks_context_split"("id") ON DELETE cascade ON UPDATE no action; EXCEPTION WHEN duplicate_object THEN null; END $$;
    DO $$ BEGIN ALTER TABLE "courses_blocks_before_after" ADD CONSTRAINT "courses_blocks_before_after_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action; EXCEPTION WHEN duplicate_object THEN null; END $$;
    DO $$ BEGIN ALTER TABLE "courses_blocks_triad" ADD CONSTRAINT "courses_blocks_triad_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action; EXCEPTION WHEN duplicate_object THEN null; END $$;
    DO $$ BEGIN ALTER TABLE "courses_blocks_triad_items" ADD CONSTRAINT "courses_blocks_triad_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses_blocks_triad"("id") ON DELETE cascade ON UPDATE no action; EXCEPTION WHEN duplicate_object THEN null; END $$;
    DO $$ BEGIN ALTER TABLE "courses_blocks_desire_fear" ADD CONSTRAINT "courses_blocks_desire_fear_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action; EXCEPTION WHEN duplicate_object THEN null; END $$;
    DO $$ BEGIN ALTER TABLE "courses_blocks_pathway" ADD CONSTRAINT "courses_blocks_pathway_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action; EXCEPTION WHEN duplicate_object THEN null; END $$;
    DO $$ BEGIN ALTER TABLE "courses_blocks_pathway_steps" ADD CONSTRAINT "courses_blocks_pathway_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses_blocks_pathway"("id") ON DELETE cascade ON UPDATE no action; EXCEPTION WHEN duplicate_object THEN null; END $$;
    DO $$ BEGIN ALTER TABLE "courses_blocks_tools_split" ADD CONSTRAINT "courses_blocks_tools_split_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action; EXCEPTION WHEN duplicate_object THEN null; END $$;
    DO $$ BEGIN ALTER TABLE "courses_blocks_tools_split_categories" ADD CONSTRAINT "courses_blocks_tools_split_categories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses_blocks_tools_split"("id") ON DELETE cascade ON UPDATE no action; EXCEPTION WHEN duplicate_object THEN null; END $$;
    DO $$ BEGIN ALTER TABLE "courses_blocks_philosophy" ADD CONSTRAINT "courses_blocks_philosophy_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action; EXCEPTION WHEN duplicate_object THEN null; END $$;
    DO $$ BEGIN ALTER TABLE "courses_blocks_testimonials" ADD CONSTRAINT "courses_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action; EXCEPTION WHEN duplicate_object THEN null; END $$;
    DO $$ BEGIN ALTER TABLE "courses_blocks_testimonials_items" ADD CONSTRAINT "courses_blocks_testimonials_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action; EXCEPTION WHEN duplicate_object THEN null; END $$;
    DO $$ BEGIN ALTER TABLE "courses_blocks_teacher_band" ADD CONSTRAINT "courses_blocks_teacher_band_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action; EXCEPTION WHEN duplicate_object THEN null; END $$;
    DO $$ BEGIN ALTER TABLE "courses_blocks_investment_card" ADD CONSTRAINT "courses_blocks_investment_card_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action; EXCEPTION WHEN duplicate_object THEN null; END $$;
    DO $$ BEGIN ALTER TABLE "courses_blocks_bonuses" ADD CONSTRAINT "courses_blocks_bonuses_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action; EXCEPTION WHEN duplicate_object THEN null; END $$;
    DO $$ BEGIN ALTER TABLE "courses_blocks_bonuses_items" ADD CONSTRAINT "courses_blocks_bonuses_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses_blocks_bonuses"("id") ON DELETE cascade ON UPDATE no action; EXCEPTION WHEN duplicate_object THEN null; END $$;
    DO $$ BEGIN ALTER TABLE "courses_blocks_closing_cta" ADD CONSTRAINT "courses_blocks_closing_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action; EXCEPTION WHEN duplicate_object THEN null; END $$;
    DO $$ BEGIN ALTER TABLE "courses_blocks_two_column" ADD CONSTRAINT "courses_blocks_two_column_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action; EXCEPTION WHEN duplicate_object THEN null; END $$;
    DO $$ BEGIN ALTER TABLE "courses_blocks_icon_grid" ADD CONSTRAINT "courses_blocks_icon_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action; EXCEPTION WHEN duplicate_object THEN null; END $$;
    DO $$ BEGIN ALTER TABLE "courses_blocks_icon_grid_items" ADD CONSTRAINT "courses_blocks_icon_grid_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses_blocks_icon_grid"("id") ON DELETE cascade ON UPDATE no action; EXCEPTION WHEN duplicate_object THEN null; END $$;
    DO $$ BEGIN ALTER TABLE "courses_blocks_split_media" ADD CONSTRAINT "courses_blocks_split_media_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action; EXCEPTION WHEN duplicate_object THEN null; END $$;
    DO $$ BEGIN ALTER TABLE "courses_blocks_dark_band" ADD CONSTRAINT "courses_blocks_dark_band_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action; EXCEPTION WHEN duplicate_object THEN null; END $$;
    DO $$ BEGIN ALTER TABLE "courses_blocks_tags" ADD CONSTRAINT "courses_blocks_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action; EXCEPTION WHEN duplicate_object THEN null; END $$;
    DO $$ BEGIN ALTER TABLE "courses_blocks_instructors" ADD CONSTRAINT "courses_blocks_instructors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action; EXCEPTION WHEN duplicate_object THEN null; END $$;
    DO $$ BEGIN ALTER TABLE "courses_blocks_instructors_people" ADD CONSTRAINT "courses_blocks_instructors_people_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses_blocks_instructors"("id") ON DELETE cascade ON UPDATE no action; EXCEPTION WHEN duplicate_object THEN null; END $$;
    DO $$ BEGIN ALTER TABLE "courses_blocks_faq" ADD CONSTRAINT "courses_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action; EXCEPTION WHEN duplicate_object THEN null; END $$;
    DO $$ BEGIN ALTER TABLE "courses_blocks_faq_items" ADD CONSTRAINT "courses_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses_blocks_faq"("id") ON DELETE cascade ON UPDATE no action; EXCEPTION WHEN duplicate_object THEN null; END $$;
    DO $$ BEGIN ALTER TABLE "courses_blocks_pricing" ADD CONSTRAINT "courses_blocks_pricing_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action; EXCEPTION WHEN duplicate_object THEN null; END $$;
    DO $$ BEGIN ALTER TABLE "courses_blocks_pricing_items" ADD CONSTRAINT "courses_blocks_pricing_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses_blocks_pricing"("id") ON DELETE cascade ON UPDATE no action; EXCEPTION WHEN duplicate_object THEN null; END $$;
    DO $$ BEGIN ALTER TABLE "courses_blocks_pricing_buttons" ADD CONSTRAINT "courses_blocks_pricing_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses_blocks_pricing"("id") ON DELETE cascade ON UPDATE no action; EXCEPTION WHEN duplicate_object THEN null; END $$;
    DO $$ BEGIN ALTER TABLE "courses_blocks_schedule_cta" ADD CONSTRAINT "courses_blocks_schedule_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action; EXCEPTION WHEN duplicate_object THEN null; END $$;
    DO $$ BEGIN ALTER TABLE "courses_blocks_schedule_cta_buttons" ADD CONSTRAINT "courses_blocks_schedule_cta_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses_blocks_schedule_cta"("id") ON DELETE cascade ON UPDATE no action; EXCEPTION WHEN duplicate_object THEN null; END $$;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "courses" DROP CONSTRAINT IF EXISTS "courses_image_id_media_id_fk";
    ALTER TABLE "courses" DROP COLUMN IF EXISTS "category";
    ALTER TABLE "courses" DROP COLUMN IF EXISTS "description";
    ALTER TABLE "courses" DROP COLUMN IF EXISTS "image_id";
    ALTER TABLE "courses" DROP COLUMN IF EXISTS "image_url";
    ALTER TABLE "pages_blocks_services_formaciones" DROP COLUMN IF EXISTS "course_id";
    ALTER TABLE "_pages_v_blocks_services_formaciones" DROP COLUMN IF EXISTS "course_id";
  `)
}
