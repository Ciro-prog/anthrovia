import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   DO $$ BEGIN
  IF to_regclass('public.pages') IS NOT NULL
     AND NOT EXISTS (
       SELECT 1
       FROM information_schema.columns
       WHERE table_schema = 'public'
         AND table_name = 'pages'
         AND column_name = '_status'
     )
  THEN
    DROP SCHEMA public CASCADE;
    CREATE SCHEMA public;
    GRANT ALL ON SCHEMA public TO PUBLIC;
    GRANT ALL ON SCHEMA public TO CURRENT_USER;
  END IF;
END $$;
  DO $$ BEGIN
  CREATE TYPE "public"."enum_pages_blocks_hero_buttons_variant" AS ENUM('primary', 'secondary');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
  DO $$ BEGIN
  CREATE TYPE "public"."enum_pages_blocks_hero_background_type" AS ENUM('color', 'media');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
  DO $$ BEGIN
  CREATE TYPE "public"."enum_pages_blocks_services_background_type" AS ENUM('color', 'media');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
  DO $$ BEGIN
  CREATE TYPE "public"."enum_pages_blocks_about_background_type" AS ENUM('color', 'media');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
  DO $$ BEGIN
  CREATE TYPE "public"."enum_pages_blocks_contact_social_links_platform" AS ENUM('whatsapp', 'linkedin', 'instagram', 'email');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
  DO $$ BEGIN
  CREATE TYPE "public"."enum_pages_blocks_contact_background_type" AS ENUM('color', 'media');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
  DO $$ BEGIN
  CREATE TYPE "public"."enum_pages_blocks_posts_posts_platform" AS ENUM('instagram', 'linkedin');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
  DO $$ BEGIN
  CREATE TYPE "public"."enum_pages_blocks_posts_background_type" AS ENUM('color', 'media');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
  DO $$ BEGIN
  CREATE TYPE "public"."enum_pages_blocks_news_news_items_media_type" AS ENUM('image', 'video');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
  DO $$ BEGIN
  CREATE TYPE "public"."enum_pages_blocks_news_news_items_attachments_type" AS ENUM('pdf', 'image', 'excel', 'link');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
  DO $$ BEGIN
  CREATE TYPE "public"."enum_pages_blocks_news_background_type" AS ENUM('color', 'media');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
  DO $$ BEGIN
  CREATE TYPE "public"."enum_pages_status" AS ENUM('draft', 'published');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
  DO $$ BEGIN
  CREATE TYPE "public"."enum__pages_v_blocks_hero_buttons_variant" AS ENUM('primary', 'secondary');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
  DO $$ BEGIN
  CREATE TYPE "public"."enum__pages_v_blocks_hero_background_type" AS ENUM('color', 'media');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
  DO $$ BEGIN
  CREATE TYPE "public"."enum__pages_v_blocks_services_background_type" AS ENUM('color', 'media');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
  DO $$ BEGIN
  CREATE TYPE "public"."enum__pages_v_blocks_about_background_type" AS ENUM('color', 'media');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
  DO $$ BEGIN
  CREATE TYPE "public"."enum__pages_v_blocks_contact_social_links_platform" AS ENUM('whatsapp', 'linkedin', 'instagram', 'email');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
  DO $$ BEGIN
  CREATE TYPE "public"."enum__pages_v_blocks_contact_background_type" AS ENUM('color', 'media');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
  DO $$ BEGIN
  CREATE TYPE "public"."enum__pages_v_blocks_posts_posts_platform" AS ENUM('instagram', 'linkedin');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
  DO $$ BEGIN
  CREATE TYPE "public"."enum__pages_v_blocks_posts_background_type" AS ENUM('color', 'media');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
  DO $$ BEGIN
  CREATE TYPE "public"."enum__pages_v_blocks_news_news_items_media_type" AS ENUM('image', 'video');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
  DO $$ BEGIN
  CREATE TYPE "public"."enum__pages_v_blocks_news_news_items_attachments_type" AS ENUM('pdf', 'image', 'excel', 'link');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
  DO $$ BEGIN
  CREATE TYPE "public"."enum__pages_v_blocks_news_background_type" AS ENUM('color', 'media');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
  DO $$ BEGIN
  CREATE TYPE "public"."enum__pages_v_version_status" AS ENUM('draft', 'published');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
  DO $$ BEGIN
  CREATE TYPE "public"."enum_courses_cohort_status" AS ENUM('open', 'upcoming', 'full', 'closed');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
  DO $$ BEGIN
  CREATE TYPE "public"."enum_leads_status" AS ENUM('new', 'contacted', 'booked', 'closed');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
  DO $$ BEGIN
  CREATE TYPE "public"."enum_bookings_status" AS ENUM('pending', 'confirmed', 'cancelled', 'completed');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
  CREATE TABLE IF NOT EXISTS "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE IF NOT EXISTS "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_thumbnail_url" varchar,
  	"sizes_thumbnail_width" numeric,
  	"sizes_thumbnail_height" numeric,
  	"sizes_thumbnail_mime_type" varchar,
  	"sizes_thumbnail_filesize" numeric,
  	"sizes_thumbnail_filename" varchar,
  	"sizes_card_url" varchar,
  	"sizes_card_width" numeric,
  	"sizes_card_height" numeric,
  	"sizes_card_mime_type" varchar,
  	"sizes_card_filesize" numeric,
  	"sizes_card_filename" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_hero_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"link" varchar,
  	"variant" "enum_pages_blocks_hero_buttons_variant" DEFAULT 'primary'
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_id" varchar,
  	"is_visible" boolean DEFAULT true,
  	"badge" varchar,
  	"title" varchar,
  	"title_highlight" varchar,
  	"subtitle" varchar,
  	"description" varchar,
  	"image_id" integer,
  	"image_url" varchar,
  	"video_id" integer,
  	"video_url" varchar,
  	"floating_card_title" varchar,
  	"floating_card_subtitle" varchar,
  	"stats_label" varchar,
  	"stats_value" varchar,
  	"background_type" "enum_pages_blocks_hero_background_type" DEFAULT 'color',
  	"background_color" varchar,
  	"title_color" varchar,
  	"subtitle_color" varchar,
  	"description_color" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_services_services_includes" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_services_services" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon_name" varchar,
  	"title" varchar,
  	"description" varchar,
  	"color" varchar DEFAULT 'primary',
  	"category" varchar,
  	"includes_label" varchar,
  	"cta_text" varchar,
  	"cta_link" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_services_modalidades" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon_name" varchar,
  	"title" varchar,
  	"description" varchar,
  	"featured" boolean DEFAULT false
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_services_formaciones" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item_id" varchar,
  	"title" varchar,
  	"description" varchar,
  	"category" varchar,
  	"image_id" integer,
  	"image_url" varchar,
  	"link" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_services_in_company_areas" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_services_in_company_modalities" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon_name" varchar,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_services" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_id" varchar,
  	"is_visible" boolean DEFAULT true,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"video_id" integer,
  	"video_url" varchar,
  	"background_type" "enum_pages_blocks_services_background_type",
  	"background_color" varchar,
  	"header_bg_color" varchar,
  	"title_color" varchar,
  	"description_color" varchar,
  	"modalidades_title" varchar,
  	"formaciones_title" varchar,
  	"formaciones_description" varchar,
  	"formaciones_coming_soon_title" varchar,
  	"formaciones_coming_soon_description" varchar,
  	"in_company_title" varchar,
  	"in_company_highlight" varchar,
  	"in_company_description" varchar,
  	"in_company_image_id" integer,
  	"in_company_image_url" varchar,
  	"in_company_modalities_title" varchar,
  	"in_company_cta_text" varchar,
  	"in_company_cta_link" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_about_specialties" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_about_intro_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_about_pillars" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon_name" varchar,
  	"title" varchar,
  	"description" varchar,
  	"color" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_about_values" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon_name" varchar,
  	"title" varchar,
  	"description" varchar,
  	"color" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_about" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_id" varchar,
  	"is_visible" boolean DEFAULT true,
  	"title" varchar,
  	"eyebrow" varchar,
  	"person_name" varchar,
  	"person_role" varchar,
  	"person_image_upload_id" integer,
  	"person_image" varchar,
  	"purpose_title" varchar,
  	"purpose_description" varchar,
  	"mission_title" varchar,
  	"mission_description" varchar,
  	"pillars_title" varchar,
  	"video_id" integer,
  	"video_url" varchar,
  	"background_type" "enum_pages_blocks_about_background_type",
  	"background_color" varchar,
  	"header_bg_color" varchar,
  	"title_color" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_contact_custom_training_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"number" varchar,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_contact_social_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" "enum_pages_blocks_contact_social_links_platform",
  	"url" varchar,
  	"label" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_contact" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_id" varchar,
  	"is_visible" boolean DEFAULT true,
  	"title" varchar,
  	"description" varchar,
  	"whatsapp_number" varchar,
  	"email" varchar,
  	"custom_training_title" varchar,
  	"custom_training_description" varchar,
  	"custom_training_cta_text" varchar,
  	"background_type" "enum_pages_blocks_contact_background_type",
  	"background_color" varchar,
  	"header_bg_color" varchar,
  	"title_color" varchar,
  	"description_color" varchar,
  	"video_id" integer,
  	"video_url" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_settings" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_id" varchar,
  	"is_visible" boolean DEFAULT true,
  	"cv_url" varchar,
  	"cv_text" varchar,
  	"footer_tagline" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_posts_posts" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item_id" varchar,
  	"image_id" integer,
  	"image_url" varchar,
  	"description" varchar,
  	"post_url" varchar,
  	"platform" "enum_pages_blocks_posts_posts_platform"
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_posts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_id" varchar,
  	"is_visible" boolean DEFAULT true,
  	"title" varchar,
  	"subtitle" varchar,
  	"background_type" "enum_pages_blocks_posts_background_type",
  	"background_color" varchar,
  	"header_bg_color" varchar,
  	"title_color" varchar,
  	"subtitle_color" varchar,
  	"video_id" integer,
  	"video_url" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_news_news_items_media" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"type" "enum_pages_blocks_news_news_items_media_type",
  	"file_id" integer,
  	"url" varchar,
  	"is_main" boolean DEFAULT false
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_news_news_items_attachments" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item_id" varchar,
  	"name" varchar,
  	"url" varchar,
  	"type" "enum_pages_blocks_news_news_items_attachments_type"
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_news_news_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item_id" varchar,
  	"title" varchar,
  	"excerpt" varchar,
  	"content" varchar,
  	"date" varchar,
  	"author" varchar,
  	"category" varchar,
  	"citation" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_news" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_id" varchar,
  	"is_visible" boolean DEFAULT true,
  	"title" varchar,
  	"subtitle" varchar,
  	"background_type" "enum_pages_blocks_news_background_type" DEFAULT 'color',
  	"background_color" varchar,
  	"header_bg_color" varchar,
  	"title_color" varchar,
  	"subtitle_color" varchar,
  	"description_color" varchar,
  	"underline_color" varchar,
  	"news_page_title" varchar,
  	"news_page_subtitle" varchar,
  	"video_id" integer,
  	"video_url" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_pages_status" DEFAULT 'draft'
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_hero_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"link" varchar,
  	"variant" "enum__pages_v_blocks_hero_buttons_variant" DEFAULT 'primary',
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"section_id" varchar,
  	"is_visible" boolean DEFAULT true,
  	"badge" varchar,
  	"title" varchar,
  	"title_highlight" varchar,
  	"subtitle" varchar,
  	"description" varchar,
  	"image_id" integer,
  	"image_url" varchar,
  	"video_id" integer,
  	"video_url" varchar,
  	"floating_card_title" varchar,
  	"floating_card_subtitle" varchar,
  	"stats_label" varchar,
  	"stats_value" varchar,
  	"background_type" "enum__pages_v_blocks_hero_background_type" DEFAULT 'color',
  	"background_color" varchar,
  	"title_color" varchar,
  	"subtitle_color" varchar,
  	"description_color" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_services_services_includes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"item" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_services_services" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon_name" varchar,
  	"title" varchar,
  	"description" varchar,
  	"color" varchar DEFAULT 'primary',
  	"category" varchar,
  	"includes_label" varchar,
  	"cta_text" varchar,
  	"cta_link" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_services_modalidades" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon_name" varchar,
  	"title" varchar,
  	"description" varchar,
  	"featured" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_services_formaciones" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"item_id" varchar,
  	"title" varchar,
  	"description" varchar,
  	"category" varchar,
  	"image_id" integer,
  	"image_url" varchar,
  	"link" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_services_in_company_areas" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"item" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_services_in_company_modalities" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon_name" varchar,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_services" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"section_id" varchar,
  	"is_visible" boolean DEFAULT true,
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"video_id" integer,
  	"video_url" varchar,
  	"background_type" "enum__pages_v_blocks_services_background_type",
  	"background_color" varchar,
  	"header_bg_color" varchar,
  	"title_color" varchar,
  	"description_color" varchar,
  	"modalidades_title" varchar,
  	"formaciones_title" varchar,
  	"formaciones_description" varchar,
  	"formaciones_coming_soon_title" varchar,
  	"formaciones_coming_soon_description" varchar,
  	"in_company_title" varchar,
  	"in_company_highlight" varchar,
  	"in_company_description" varchar,
  	"in_company_image_id" integer,
  	"in_company_image_url" varchar,
  	"in_company_modalities_title" varchar,
  	"in_company_cta_text" varchar,
  	"in_company_cta_link" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_about_specialties" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"item" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_about_intro_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"item" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_about_pillars" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon_name" varchar,
  	"title" varchar,
  	"description" varchar,
  	"color" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_about_values" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon_name" varchar,
  	"title" varchar,
  	"description" varchar,
  	"color" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_about" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"section_id" varchar,
  	"is_visible" boolean DEFAULT true,
  	"title" varchar,
  	"eyebrow" varchar,
  	"person_name" varchar,
  	"person_role" varchar,
  	"person_image_upload_id" integer,
  	"person_image" varchar,
  	"purpose_title" varchar,
  	"purpose_description" varchar,
  	"mission_title" varchar,
  	"mission_description" varchar,
  	"pillars_title" varchar,
  	"video_id" integer,
  	"video_url" varchar,
  	"background_type" "enum__pages_v_blocks_about_background_type",
  	"background_color" varchar,
  	"header_bg_color" varchar,
  	"title_color" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_contact_custom_training_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"number" varchar,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_contact_social_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"platform" "enum__pages_v_blocks_contact_social_links_platform",
  	"url" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_contact" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"section_id" varchar,
  	"is_visible" boolean DEFAULT true,
  	"title" varchar,
  	"description" varchar,
  	"whatsapp_number" varchar,
  	"email" varchar,
  	"custom_training_title" varchar,
  	"custom_training_description" varchar,
  	"custom_training_cta_text" varchar,
  	"background_type" "enum__pages_v_blocks_contact_background_type",
  	"background_color" varchar,
  	"header_bg_color" varchar,
  	"title_color" varchar,
  	"description_color" varchar,
  	"video_id" integer,
  	"video_url" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_settings" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"section_id" varchar,
  	"is_visible" boolean DEFAULT true,
  	"cv_url" varchar,
  	"cv_text" varchar,
  	"footer_tagline" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_posts_posts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"item_id" varchar,
  	"image_id" integer,
  	"image_url" varchar,
  	"description" varchar,
  	"post_url" varchar,
  	"platform" "enum__pages_v_blocks_posts_posts_platform",
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_posts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"section_id" varchar,
  	"is_visible" boolean DEFAULT true,
  	"title" varchar,
  	"subtitle" varchar,
  	"background_type" "enum__pages_v_blocks_posts_background_type",
  	"background_color" varchar,
  	"header_bg_color" varchar,
  	"title_color" varchar,
  	"subtitle_color" varchar,
  	"video_id" integer,
  	"video_url" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_news_news_items_media" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"type" "enum__pages_v_blocks_news_news_items_media_type",
  	"file_id" integer,
  	"url" varchar,
  	"is_main" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_news_news_items_attachments" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"item_id" varchar,
  	"name" varchar,
  	"url" varchar,
  	"type" "enum__pages_v_blocks_news_news_items_attachments_type",
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_news_news_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"item_id" varchar,
  	"title" varchar,
  	"excerpt" varchar,
  	"content" varchar,
  	"date" varchar,
  	"author" varchar,
  	"category" varchar,
  	"citation" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_news" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"section_id" varchar,
  	"is_visible" boolean DEFAULT true,
  	"title" varchar,
  	"subtitle" varchar,
  	"background_type" "enum__pages_v_blocks_news_background_type" DEFAULT 'color',
  	"background_color" varchar,
  	"header_bg_color" varchar,
  	"title_color" varchar,
  	"subtitle_color" varchar,
  	"description_color" varchar,
  	"underline_color" varchar,
  	"news_page_title" varchar,
  	"news_page_subtitle" varchar,
  	"video_id" integer,
  	"video_url" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__pages_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE IF NOT EXISTS "courses" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"course_id" varchar,
  	"blocks" jsonb NOT NULL,
  	"cohort_start_date" timestamp(3) with time zone,
  	"inscription_deadline" timestamp(3) with time zone,
  	"spots" numeric,
  	"cohort_status" "enum_courses_cohort_status" DEFAULT 'open',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "leads" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"phone" varchar,
  	"service" varchar,
  	"message" varchar,
  	"source" varchar DEFAULT 'contact-form',
  	"status" "enum_leads_status" DEFAULT 'new',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "event_types" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"description" varchar,
  	"duration_minutes" numeric DEFAULT 15 NOT NULL,
  	"active" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "bookings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"event_type_id" integer NOT NULL,
  	"name" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"phone" varchar,
  	"notes" varchar,
  	"starts_at" timestamp(3) with time zone NOT NULL,
  	"status" "enum_bookings_status" DEFAULT 'pending',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"pages_id" integer,
  	"courses_id" integer,
  	"leads_id" integer,
  	"event_types_id" integer,
  	"bookings_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"site_name" varchar DEFAULT 'Anthrovia HR',
  	"booking_enabled" boolean DEFAULT true,
  	"default_event_type_slug" varchar DEFAULT 'llamada-15',
  	"whatsapp_number" varchar,
  	"contact_email" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  DO $$ BEGIN
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
  DO $$ BEGIN
  ALTER TABLE "pages_blocks_hero_buttons" ADD CONSTRAINT "pages_blocks_hero_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
  DO $$ BEGIN
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
  DO $$ BEGIN
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_video_id_media_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
  DO $$ BEGIN
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
  DO $$ BEGIN
  ALTER TABLE "pages_blocks_services_services_includes" ADD CONSTRAINT "pages_blocks_services_services_includes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_services_services"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
  DO $$ BEGIN
  ALTER TABLE "pages_blocks_services_services" ADD CONSTRAINT "pages_blocks_services_services_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_services"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
  DO $$ BEGIN
  ALTER TABLE "pages_blocks_services_modalidades" ADD CONSTRAINT "pages_blocks_services_modalidades_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_services"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
  DO $$ BEGIN
  ALTER TABLE "pages_blocks_services_formaciones" ADD CONSTRAINT "pages_blocks_services_formaciones_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
  DO $$ BEGIN
  ALTER TABLE "pages_blocks_services_formaciones" ADD CONSTRAINT "pages_blocks_services_formaciones_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_services"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
  DO $$ BEGIN
  ALTER TABLE "pages_blocks_services_in_company_areas" ADD CONSTRAINT "pages_blocks_services_in_company_areas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_services"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
  DO $$ BEGIN
  ALTER TABLE "pages_blocks_services_in_company_modalities" ADD CONSTRAINT "pages_blocks_services_in_company_modalities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_services"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
  DO $$ BEGIN
  ALTER TABLE "pages_blocks_services" ADD CONSTRAINT "pages_blocks_services_video_id_media_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
  DO $$ BEGIN
  ALTER TABLE "pages_blocks_services" ADD CONSTRAINT "pages_blocks_services_in_company_image_id_media_id_fk" FOREIGN KEY ("in_company_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
  DO $$ BEGIN
  ALTER TABLE "pages_blocks_services" ADD CONSTRAINT "pages_blocks_services_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
  DO $$ BEGIN
  ALTER TABLE "pages_blocks_about_specialties" ADD CONSTRAINT "pages_blocks_about_specialties_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_about"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
  DO $$ BEGIN
  ALTER TABLE "pages_blocks_about_intro_text" ADD CONSTRAINT "pages_blocks_about_intro_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_about"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
  DO $$ BEGIN
  ALTER TABLE "pages_blocks_about_pillars" ADD CONSTRAINT "pages_blocks_about_pillars_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_about"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
  DO $$ BEGIN
  ALTER TABLE "pages_blocks_about_values" ADD CONSTRAINT "pages_blocks_about_values_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_about"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
  DO $$ BEGIN
  ALTER TABLE "pages_blocks_about" ADD CONSTRAINT "pages_blocks_about_person_image_upload_id_media_id_fk" FOREIGN KEY ("person_image_upload_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
  DO $$ BEGIN
  ALTER TABLE "pages_blocks_about" ADD CONSTRAINT "pages_blocks_about_video_id_media_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
  DO $$ BEGIN
  ALTER TABLE "pages_blocks_about" ADD CONSTRAINT "pages_blocks_about_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
  DO $$ BEGIN
  ALTER TABLE "pages_blocks_contact_custom_training_steps" ADD CONSTRAINT "pages_blocks_contact_custom_training_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_contact"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
  DO $$ BEGIN
  ALTER TABLE "pages_blocks_contact_social_links" ADD CONSTRAINT "pages_blocks_contact_social_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_contact"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
  DO $$ BEGIN
  ALTER TABLE "pages_blocks_contact" ADD CONSTRAINT "pages_blocks_contact_video_id_media_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
  DO $$ BEGIN
  ALTER TABLE "pages_blocks_contact" ADD CONSTRAINT "pages_blocks_contact_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
  DO $$ BEGIN
  ALTER TABLE "pages_blocks_settings" ADD CONSTRAINT "pages_blocks_settings_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
  DO $$ BEGIN
  ALTER TABLE "pages_blocks_posts_posts" ADD CONSTRAINT "pages_blocks_posts_posts_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
  DO $$ BEGIN
  ALTER TABLE "pages_blocks_posts_posts" ADD CONSTRAINT "pages_blocks_posts_posts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_posts"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
  DO $$ BEGIN
  ALTER TABLE "pages_blocks_posts" ADD CONSTRAINT "pages_blocks_posts_video_id_media_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
  DO $$ BEGIN
  ALTER TABLE "pages_blocks_posts" ADD CONSTRAINT "pages_blocks_posts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
  DO $$ BEGIN
  ALTER TABLE "pages_blocks_news_news_items_media" ADD CONSTRAINT "pages_blocks_news_news_items_media_file_id_media_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
  DO $$ BEGIN
  ALTER TABLE "pages_blocks_news_news_items_media" ADD CONSTRAINT "pages_blocks_news_news_items_media_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_news_news_items"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
  DO $$ BEGIN
  ALTER TABLE "pages_blocks_news_news_items_attachments" ADD CONSTRAINT "pages_blocks_news_news_items_attachments_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_news_news_items"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
  DO $$ BEGIN
  ALTER TABLE "pages_blocks_news_news_items" ADD CONSTRAINT "pages_blocks_news_news_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_news"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
  DO $$ BEGIN
  ALTER TABLE "pages_blocks_news" ADD CONSTRAINT "pages_blocks_news_video_id_media_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
  DO $$ BEGIN
  ALTER TABLE "pages_blocks_news" ADD CONSTRAINT "pages_blocks_news_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
  DO $$ BEGIN
  ALTER TABLE "_pages_v_blocks_hero_buttons" ADD CONSTRAINT "_pages_v_blocks_hero_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
  DO $$ BEGIN
  ALTER TABLE "_pages_v_blocks_hero" ADD CONSTRAINT "_pages_v_blocks_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
  DO $$ BEGIN
  ALTER TABLE "_pages_v_blocks_hero" ADD CONSTRAINT "_pages_v_blocks_hero_video_id_media_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
  DO $$ BEGIN
  ALTER TABLE "_pages_v_blocks_hero" ADD CONSTRAINT "_pages_v_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
  DO $$ BEGIN
  ALTER TABLE "_pages_v_blocks_services_services_includes" ADD CONSTRAINT "_pages_v_blocks_services_services_includes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_services_services"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
  DO $$ BEGIN
  ALTER TABLE "_pages_v_blocks_services_services" ADD CONSTRAINT "_pages_v_blocks_services_services_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_services"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
  DO $$ BEGIN
  ALTER TABLE "_pages_v_blocks_services_modalidades" ADD CONSTRAINT "_pages_v_blocks_services_modalidades_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_services"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
  DO $$ BEGIN
  ALTER TABLE "_pages_v_blocks_services_formaciones" ADD CONSTRAINT "_pages_v_blocks_services_formaciones_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
  DO $$ BEGIN
  ALTER TABLE "_pages_v_blocks_services_formaciones" ADD CONSTRAINT "_pages_v_blocks_services_formaciones_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_services"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
  DO $$ BEGIN
  ALTER TABLE "_pages_v_blocks_services_in_company_areas" ADD CONSTRAINT "_pages_v_blocks_services_in_company_areas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_services"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
  DO $$ BEGIN
  ALTER TABLE "_pages_v_blocks_services_in_company_modalities" ADD CONSTRAINT "_pages_v_blocks_services_in_company_modalities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_services"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
  DO $$ BEGIN
  ALTER TABLE "_pages_v_blocks_services" ADD CONSTRAINT "_pages_v_blocks_services_video_id_media_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
  DO $$ BEGIN
  ALTER TABLE "_pages_v_blocks_services" ADD CONSTRAINT "_pages_v_blocks_services_in_company_image_id_media_id_fk" FOREIGN KEY ("in_company_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
  DO $$ BEGIN
  ALTER TABLE "_pages_v_blocks_services" ADD CONSTRAINT "_pages_v_blocks_services_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
  DO $$ BEGIN
  ALTER TABLE "_pages_v_blocks_about_specialties" ADD CONSTRAINT "_pages_v_blocks_about_specialties_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_about"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
  DO $$ BEGIN
  ALTER TABLE "_pages_v_blocks_about_intro_text" ADD CONSTRAINT "_pages_v_blocks_about_intro_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_about"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
  DO $$ BEGIN
  ALTER TABLE "_pages_v_blocks_about_pillars" ADD CONSTRAINT "_pages_v_blocks_about_pillars_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_about"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
  DO $$ BEGIN
  ALTER TABLE "_pages_v_blocks_about_values" ADD CONSTRAINT "_pages_v_blocks_about_values_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_about"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
  DO $$ BEGIN
  ALTER TABLE "_pages_v_blocks_about" ADD CONSTRAINT "_pages_v_blocks_about_person_image_upload_id_media_id_fk" FOREIGN KEY ("person_image_upload_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
  DO $$ BEGIN
  ALTER TABLE "_pages_v_blocks_about" ADD CONSTRAINT "_pages_v_blocks_about_video_id_media_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
  DO $$ BEGIN
  ALTER TABLE "_pages_v_blocks_about" ADD CONSTRAINT "_pages_v_blocks_about_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
  DO $$ BEGIN
  ALTER TABLE "_pages_v_blocks_contact_custom_training_steps" ADD CONSTRAINT "_pages_v_blocks_contact_custom_training_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_contact"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
  DO $$ BEGIN
  ALTER TABLE "_pages_v_blocks_contact_social_links" ADD CONSTRAINT "_pages_v_blocks_contact_social_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_contact"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
  DO $$ BEGIN
  ALTER TABLE "_pages_v_blocks_contact" ADD CONSTRAINT "_pages_v_blocks_contact_video_id_media_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
  DO $$ BEGIN
  ALTER TABLE "_pages_v_blocks_contact" ADD CONSTRAINT "_pages_v_blocks_contact_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
  DO $$ BEGIN
  ALTER TABLE "_pages_v_blocks_settings" ADD CONSTRAINT "_pages_v_blocks_settings_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
  DO $$ BEGIN
  ALTER TABLE "_pages_v_blocks_posts_posts" ADD CONSTRAINT "_pages_v_blocks_posts_posts_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
  DO $$ BEGIN
  ALTER TABLE "_pages_v_blocks_posts_posts" ADD CONSTRAINT "_pages_v_blocks_posts_posts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_posts"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
  DO $$ BEGIN
  ALTER TABLE "_pages_v_blocks_posts" ADD CONSTRAINT "_pages_v_blocks_posts_video_id_media_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
  DO $$ BEGIN
  ALTER TABLE "_pages_v_blocks_posts" ADD CONSTRAINT "_pages_v_blocks_posts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
  DO $$ BEGIN
  ALTER TABLE "_pages_v_blocks_news_news_items_media" ADD CONSTRAINT "_pages_v_blocks_news_news_items_media_file_id_media_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
  DO $$ BEGIN
  ALTER TABLE "_pages_v_blocks_news_news_items_media" ADD CONSTRAINT "_pages_v_blocks_news_news_items_media_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_news_news_items"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
  DO $$ BEGIN
  ALTER TABLE "_pages_v_blocks_news_news_items_attachments" ADD CONSTRAINT "_pages_v_blocks_news_news_items_attachments_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_news_news_items"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
  DO $$ BEGIN
  ALTER TABLE "_pages_v_blocks_news_news_items" ADD CONSTRAINT "_pages_v_blocks_news_news_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_news"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
  DO $$ BEGIN
  ALTER TABLE "_pages_v_blocks_news" ADD CONSTRAINT "_pages_v_blocks_news_video_id_media_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
  DO $$ BEGIN
  ALTER TABLE "_pages_v_blocks_news" ADD CONSTRAINT "_pages_v_blocks_news_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
  DO $$ BEGIN
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
  DO $$ BEGIN
  ALTER TABLE "bookings" ADD CONSTRAINT "bookings_event_type_id_event_types_id_fk" FOREIGN KEY ("event_type_id") REFERENCES "public"."event_types"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
  DO $$ BEGIN
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
  DO $$ BEGIN
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
  DO $$ BEGIN
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
  DO $$ BEGIN
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
  DO $$ BEGIN
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_courses_fk" FOREIGN KEY ("courses_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
  DO $$ BEGIN
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_leads_fk" FOREIGN KEY ("leads_id") REFERENCES "public"."leads"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
  DO $$ BEGIN
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_event_types_fk" FOREIGN KEY ("event_types_id") REFERENCES "public"."event_types"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
  DO $$ BEGIN
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_bookings_fk" FOREIGN KEY ("bookings_id") REFERENCES "public"."bookings"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
  DO $$ BEGIN
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
  DO $$ BEGIN
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
  CREATE INDEX IF NOT EXISTS "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX IF NOT EXISTS "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX IF NOT EXISTS "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX IF NOT EXISTS "media_sizes_card_sizes_card_filename_idx" ON "media" USING btree ("sizes_card_filename");
  CREATE INDEX IF NOT EXISTS "pages_blocks_hero_buttons_order_idx" ON "pages_blocks_hero_buttons" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_hero_buttons_parent_id_idx" ON "pages_blocks_hero_buttons" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_hero_order_idx" ON "pages_blocks_hero" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_hero_parent_id_idx" ON "pages_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_hero_path_idx" ON "pages_blocks_hero" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_hero_image_idx" ON "pages_blocks_hero" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_hero_video_idx" ON "pages_blocks_hero" USING btree ("video_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_services_services_includes_order_idx" ON "pages_blocks_services_services_includes" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_services_services_includes_parent_id_idx" ON "pages_blocks_services_services_includes" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_services_services_order_idx" ON "pages_blocks_services_services" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_services_services_parent_id_idx" ON "pages_blocks_services_services" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_services_modalidades_order_idx" ON "pages_blocks_services_modalidades" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_services_modalidades_parent_id_idx" ON "pages_blocks_services_modalidades" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_services_formaciones_order_idx" ON "pages_blocks_services_formaciones" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_services_formaciones_parent_id_idx" ON "pages_blocks_services_formaciones" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_services_formaciones_image_idx" ON "pages_blocks_services_formaciones" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_services_in_company_areas_order_idx" ON "pages_blocks_services_in_company_areas" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_services_in_company_areas_parent_id_idx" ON "pages_blocks_services_in_company_areas" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_services_in_company_modalities_order_idx" ON "pages_blocks_services_in_company_modalities" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_services_in_company_modalities_parent_id_idx" ON "pages_blocks_services_in_company_modalities" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_services_order_idx" ON "pages_blocks_services" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_services_parent_id_idx" ON "pages_blocks_services" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_services_path_idx" ON "pages_blocks_services" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_services_video_idx" ON "pages_blocks_services" USING btree ("video_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_services_in_company_in_company_image_idx" ON "pages_blocks_services" USING btree ("in_company_image_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_about_specialties_order_idx" ON "pages_blocks_about_specialties" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_about_specialties_parent_id_idx" ON "pages_blocks_about_specialties" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_about_intro_text_order_idx" ON "pages_blocks_about_intro_text" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_about_intro_text_parent_id_idx" ON "pages_blocks_about_intro_text" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_about_pillars_order_idx" ON "pages_blocks_about_pillars" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_about_pillars_parent_id_idx" ON "pages_blocks_about_pillars" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_about_values_order_idx" ON "pages_blocks_about_values" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_about_values_parent_id_idx" ON "pages_blocks_about_values" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_about_order_idx" ON "pages_blocks_about" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_about_parent_id_idx" ON "pages_blocks_about" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_about_path_idx" ON "pages_blocks_about" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_about_person_image_upload_idx" ON "pages_blocks_about" USING btree ("person_image_upload_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_about_video_idx" ON "pages_blocks_about" USING btree ("video_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_contact_custom_training_steps_order_idx" ON "pages_blocks_contact_custom_training_steps" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_contact_custom_training_steps_parent_id_idx" ON "pages_blocks_contact_custom_training_steps" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_contact_social_links_order_idx" ON "pages_blocks_contact_social_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_contact_social_links_parent_id_idx" ON "pages_blocks_contact_social_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_contact_order_idx" ON "pages_blocks_contact" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_contact_parent_id_idx" ON "pages_blocks_contact" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_contact_path_idx" ON "pages_blocks_contact" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_contact_video_idx" ON "pages_blocks_contact" USING btree ("video_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_settings_order_idx" ON "pages_blocks_settings" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_settings_parent_id_idx" ON "pages_blocks_settings" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_settings_path_idx" ON "pages_blocks_settings" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_posts_posts_order_idx" ON "pages_blocks_posts_posts" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_posts_posts_parent_id_idx" ON "pages_blocks_posts_posts" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_posts_posts_image_idx" ON "pages_blocks_posts_posts" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_posts_order_idx" ON "pages_blocks_posts" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_posts_parent_id_idx" ON "pages_blocks_posts" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_posts_path_idx" ON "pages_blocks_posts" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_posts_video_idx" ON "pages_blocks_posts" USING btree ("video_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_news_news_items_media_order_idx" ON "pages_blocks_news_news_items_media" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_news_news_items_media_parent_id_idx" ON "pages_blocks_news_news_items_media" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_news_news_items_media_file_idx" ON "pages_blocks_news_news_items_media" USING btree ("file_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_news_news_items_attachments_order_idx" ON "pages_blocks_news_news_items_attachments" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_news_news_items_attachments_parent_id_idx" ON "pages_blocks_news_news_items_attachments" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_news_news_items_order_idx" ON "pages_blocks_news_news_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_news_news_items_parent_id_idx" ON "pages_blocks_news_news_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_news_order_idx" ON "pages_blocks_news" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_news_parent_id_idx" ON "pages_blocks_news" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_news_path_idx" ON "pages_blocks_news" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_news_video_idx" ON "pages_blocks_news" USING btree ("video_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "pages__status_idx" ON "pages" USING btree ("_status");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_hero_buttons_order_idx" ON "_pages_v_blocks_hero_buttons" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_hero_buttons_parent_id_idx" ON "_pages_v_blocks_hero_buttons" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_hero_order_idx" ON "_pages_v_blocks_hero" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_hero_parent_id_idx" ON "_pages_v_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_hero_path_idx" ON "_pages_v_blocks_hero" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_hero_image_idx" ON "_pages_v_blocks_hero" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_hero_video_idx" ON "_pages_v_blocks_hero" USING btree ("video_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_services_services_includes_order_idx" ON "_pages_v_blocks_services_services_includes" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_services_services_includes_parent_id_idx" ON "_pages_v_blocks_services_services_includes" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_services_services_order_idx" ON "_pages_v_blocks_services_services" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_services_services_parent_id_idx" ON "_pages_v_blocks_services_services" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_services_modalidades_order_idx" ON "_pages_v_blocks_services_modalidades" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_services_modalidades_parent_id_idx" ON "_pages_v_blocks_services_modalidades" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_services_formaciones_order_idx" ON "_pages_v_blocks_services_formaciones" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_services_formaciones_parent_id_idx" ON "_pages_v_blocks_services_formaciones" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_services_formaciones_image_idx" ON "_pages_v_blocks_services_formaciones" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_services_in_company_areas_order_idx" ON "_pages_v_blocks_services_in_company_areas" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_services_in_company_areas_parent_id_idx" ON "_pages_v_blocks_services_in_company_areas" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_services_in_company_modalities_order_idx" ON "_pages_v_blocks_services_in_company_modalities" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_services_in_company_modalities_parent_id_idx" ON "_pages_v_blocks_services_in_company_modalities" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_services_order_idx" ON "_pages_v_blocks_services" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_services_parent_id_idx" ON "_pages_v_blocks_services" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_services_path_idx" ON "_pages_v_blocks_services" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_services_video_idx" ON "_pages_v_blocks_services" USING btree ("video_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_services_in_company_in_company_image_idx" ON "_pages_v_blocks_services" USING btree ("in_company_image_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_about_specialties_order_idx" ON "_pages_v_blocks_about_specialties" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_about_specialties_parent_id_idx" ON "_pages_v_blocks_about_specialties" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_about_intro_text_order_idx" ON "_pages_v_blocks_about_intro_text" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_about_intro_text_parent_id_idx" ON "_pages_v_blocks_about_intro_text" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_about_pillars_order_idx" ON "_pages_v_blocks_about_pillars" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_about_pillars_parent_id_idx" ON "_pages_v_blocks_about_pillars" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_about_values_order_idx" ON "_pages_v_blocks_about_values" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_about_values_parent_id_idx" ON "_pages_v_blocks_about_values" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_about_order_idx" ON "_pages_v_blocks_about" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_about_parent_id_idx" ON "_pages_v_blocks_about" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_about_path_idx" ON "_pages_v_blocks_about" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_about_person_image_upload_idx" ON "_pages_v_blocks_about" USING btree ("person_image_upload_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_about_video_idx" ON "_pages_v_blocks_about" USING btree ("video_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_contact_custom_training_steps_order_idx" ON "_pages_v_blocks_contact_custom_training_steps" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_contact_custom_training_steps_parent_id_idx" ON "_pages_v_blocks_contact_custom_training_steps" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_contact_social_links_order_idx" ON "_pages_v_blocks_contact_social_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_contact_social_links_parent_id_idx" ON "_pages_v_blocks_contact_social_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_contact_order_idx" ON "_pages_v_blocks_contact" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_contact_parent_id_idx" ON "_pages_v_blocks_contact" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_contact_path_idx" ON "_pages_v_blocks_contact" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_contact_video_idx" ON "_pages_v_blocks_contact" USING btree ("video_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_settings_order_idx" ON "_pages_v_blocks_settings" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_settings_parent_id_idx" ON "_pages_v_blocks_settings" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_settings_path_idx" ON "_pages_v_blocks_settings" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_posts_posts_order_idx" ON "_pages_v_blocks_posts_posts" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_posts_posts_parent_id_idx" ON "_pages_v_blocks_posts_posts" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_posts_posts_image_idx" ON "_pages_v_blocks_posts_posts" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_posts_order_idx" ON "_pages_v_blocks_posts" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_posts_parent_id_idx" ON "_pages_v_blocks_posts" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_posts_path_idx" ON "_pages_v_blocks_posts" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_posts_video_idx" ON "_pages_v_blocks_posts" USING btree ("video_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_news_news_items_media_order_idx" ON "_pages_v_blocks_news_news_items_media" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_news_news_items_media_parent_id_idx" ON "_pages_v_blocks_news_news_items_media" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_news_news_items_media_file_idx" ON "_pages_v_blocks_news_news_items_media" USING btree ("file_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_news_news_items_attachments_order_idx" ON "_pages_v_blocks_news_news_items_attachments" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_news_news_items_attachments_parent_id_idx" ON "_pages_v_blocks_news_news_items_attachments" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_news_news_items_order_idx" ON "_pages_v_blocks_news_news_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_news_news_items_parent_id_idx" ON "_pages_v_blocks_news_news_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_news_order_idx" ON "_pages_v_blocks_news" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_news_parent_id_idx" ON "_pages_v_blocks_news" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_news_path_idx" ON "_pages_v_blocks_news" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_news_video_idx" ON "_pages_v_blocks_news" USING btree ("video_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_parent_idx" ON "_pages_v" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_version_slug_idx" ON "_pages_v" USING btree ("version_slug");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_version_updated_at_idx" ON "_pages_v" USING btree ("version_updated_at");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_version_created_at_idx" ON "_pages_v" USING btree ("version_created_at");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_version__status_idx" ON "_pages_v" USING btree ("version__status");
  CREATE INDEX IF NOT EXISTS "_pages_v_created_at_idx" ON "_pages_v" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "_pages_v_updated_at_idx" ON "_pages_v" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "_pages_v_latest_idx" ON "_pages_v" USING btree ("latest");
  CREATE UNIQUE INDEX IF NOT EXISTS "courses_slug_idx" ON "courses" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "courses_updated_at_idx" ON "courses" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "courses_created_at_idx" ON "courses" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "leads_updated_at_idx" ON "leads" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "leads_created_at_idx" ON "leads" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "event_types_slug_idx" ON "event_types" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "event_types_updated_at_idx" ON "event_types" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "event_types_created_at_idx" ON "event_types" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "bookings_event_type_idx" ON "bookings" USING btree ("event_type_id");
  CREATE INDEX IF NOT EXISTS "bookings_updated_at_idx" ON "bookings" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "bookings_created_at_idx" ON "bookings" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_courses_id_idx" ON "payload_locked_documents_rels" USING btree ("courses_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_leads_id_idx" ON "payload_locked_documents_rels" USING btree ("leads_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_event_types_id_idx" ON "payload_locked_documents_rels" USING btree ("event_types_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_bookings_id_idx" ON "payload_locked_documents_rels" USING btree ("bookings_id");
  CREATE INDEX IF NOT EXISTS "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX IF NOT EXISTS "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX IF NOT EXISTS "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "pages_blocks_hero_buttons" CASCADE;
  DROP TABLE "pages_blocks_hero" CASCADE;
  DROP TABLE "pages_blocks_services_services_includes" CASCADE;
  DROP TABLE "pages_blocks_services_services" CASCADE;
  DROP TABLE "pages_blocks_services_modalidades" CASCADE;
  DROP TABLE "pages_blocks_services_formaciones" CASCADE;
  DROP TABLE "pages_blocks_services_in_company_areas" CASCADE;
  DROP TABLE "pages_blocks_services_in_company_modalities" CASCADE;
  DROP TABLE "pages_blocks_services" CASCADE;
  DROP TABLE "pages_blocks_about_specialties" CASCADE;
  DROP TABLE "pages_blocks_about_intro_text" CASCADE;
  DROP TABLE "pages_blocks_about_pillars" CASCADE;
  DROP TABLE "pages_blocks_about_values" CASCADE;
  DROP TABLE "pages_blocks_about" CASCADE;
  DROP TABLE "pages_blocks_contact_custom_training_steps" CASCADE;
  DROP TABLE "pages_blocks_contact_social_links" CASCADE;
  DROP TABLE "pages_blocks_contact" CASCADE;
  DROP TABLE "pages_blocks_settings" CASCADE;
  DROP TABLE "pages_blocks_posts_posts" CASCADE;
  DROP TABLE "pages_blocks_posts" CASCADE;
  DROP TABLE "pages_blocks_news_news_items_media" CASCADE;
  DROP TABLE "pages_blocks_news_news_items_attachments" CASCADE;
  DROP TABLE "pages_blocks_news_news_items" CASCADE;
  DROP TABLE "pages_blocks_news" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_buttons" CASCADE;
  DROP TABLE "_pages_v_blocks_hero" CASCADE;
  DROP TABLE "_pages_v_blocks_services_services_includes" CASCADE;
  DROP TABLE "_pages_v_blocks_services_services" CASCADE;
  DROP TABLE "_pages_v_blocks_services_modalidades" CASCADE;
  DROP TABLE "_pages_v_blocks_services_formaciones" CASCADE;
  DROP TABLE "_pages_v_blocks_services_in_company_areas" CASCADE;
  DROP TABLE "_pages_v_blocks_services_in_company_modalities" CASCADE;
  DROP TABLE "_pages_v_blocks_services" CASCADE;
  DROP TABLE "_pages_v_blocks_about_specialties" CASCADE;
  DROP TABLE "_pages_v_blocks_about_intro_text" CASCADE;
  DROP TABLE "_pages_v_blocks_about_pillars" CASCADE;
  DROP TABLE "_pages_v_blocks_about_values" CASCADE;
  DROP TABLE "_pages_v_blocks_about" CASCADE;
  DROP TABLE "_pages_v_blocks_contact_custom_training_steps" CASCADE;
  DROP TABLE "_pages_v_blocks_contact_social_links" CASCADE;
  DROP TABLE "_pages_v_blocks_contact" CASCADE;
  DROP TABLE "_pages_v_blocks_settings" CASCADE;
  DROP TABLE "_pages_v_blocks_posts_posts" CASCADE;
  DROP TABLE "_pages_v_blocks_posts" CASCADE;
  DROP TABLE "_pages_v_blocks_news_news_items_media" CASCADE;
  DROP TABLE "_pages_v_blocks_news_news_items_attachments" CASCADE;
  DROP TABLE "_pages_v_blocks_news_news_items" CASCADE;
  DROP TABLE "_pages_v_blocks_news" CASCADE;
  DROP TABLE "_pages_v" CASCADE;
  DROP TABLE "courses" CASCADE;
  DROP TABLE "leads" CASCADE;
  DROP TABLE "event_types" CASCADE;
  DROP TABLE "bookings" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TYPE "public"."enum_pages_blocks_hero_buttons_variant";
  DROP TYPE "public"."enum_pages_blocks_hero_background_type";
  DROP TYPE "public"."enum_pages_blocks_services_background_type";
  DROP TYPE "public"."enum_pages_blocks_about_background_type";
  DROP TYPE "public"."enum_pages_blocks_contact_social_links_platform";
  DROP TYPE "public"."enum_pages_blocks_contact_background_type";
  DROP TYPE "public"."enum_pages_blocks_posts_posts_platform";
  DROP TYPE "public"."enum_pages_blocks_posts_background_type";
  DROP TYPE "public"."enum_pages_blocks_news_news_items_media_type";
  DROP TYPE "public"."enum_pages_blocks_news_news_items_attachments_type";
  DROP TYPE "public"."enum_pages_blocks_news_background_type";
  DROP TYPE "public"."enum_pages_status";
  DROP TYPE "public"."enum__pages_v_blocks_hero_buttons_variant";
  DROP TYPE "public"."enum__pages_v_blocks_hero_background_type";
  DROP TYPE "public"."enum__pages_v_blocks_services_background_type";
  DROP TYPE "public"."enum__pages_v_blocks_about_background_type";
  DROP TYPE "public"."enum__pages_v_blocks_contact_social_links_platform";
  DROP TYPE "public"."enum__pages_v_blocks_contact_background_type";
  DROP TYPE "public"."enum__pages_v_blocks_posts_posts_platform";
  DROP TYPE "public"."enum__pages_v_blocks_posts_background_type";
  DROP TYPE "public"."enum__pages_v_blocks_news_news_items_media_type";
  DROP TYPE "public"."enum__pages_v_blocks_news_news_items_attachments_type";
  DROP TYPE "public"."enum__pages_v_blocks_news_background_type";
  DROP TYPE "public"."enum__pages_v_version_status";
  DROP TYPE "public"."enum_courses_cohort_status";
  DROP TYPE "public"."enum_leads_status";
  DROP TYPE "public"."enum_bookings_status";`)
}
