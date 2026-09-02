import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$ BEGIN
      CREATE TYPE "public"."enum_leads_source" AS ENUM('home-contact', 'learning-contact', 'dossier', 'contact-form');
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    ALTER TABLE "leads" ALTER COLUMN "source" DROP DEFAULT;
    ALTER TABLE "leads" ALTER COLUMN "source" TYPE "enum_leads_source" USING (
      CASE
        WHEN "source" IN ('home-contact', 'learning-contact', 'dossier', 'contact-form')
          THEN "source"::"enum_leads_source"
        ELSE 'contact-form'::"enum_leads_source"
      END
    );
    ALTER TABLE "leads" ALTER COLUMN "source" SET DEFAULT 'contact-form'::"enum_leads_source";

    ALTER TABLE "applications" ADD COLUMN IF NOT EXISTS "answers" jsonb;
    ALTER TABLE "applications" ALTER COLUMN "first_name" DROP NOT NULL;
    ALTER TABLE "applications" ALTER COLUMN "last_name" DROP NOT NULL;

    DO $$ BEGIN
      CREATE TYPE "public"."enum_application_form_fields_type" AS ENUM(
        'text', 'email', 'tel', 'textarea', 'select', 'checkbox', 'file'
      );
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    CREATE TABLE IF NOT EXISTS "application_form" (
      "id" serial PRIMARY KEY NOT NULL,
      "title" varchar DEFAULT 'Postulación – Asesor Comercial | Planes de Salud',
      "subtitle" varchar,
      "updated_at" timestamp(3) with time zone,
      "created_at" timestamp(3) with time zone
    );

    CREATE TABLE IF NOT EXISTS "application_form_fields" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "name" varchar,
      "label" varchar,
      "type" "enum_application_form_fields_type" DEFAULT 'text',
      "required" boolean DEFAULT true,
      "step" numeric DEFAULT 1
    );

    CREATE TABLE IF NOT EXISTS "application_form_fields_options" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "label" varchar,
      "value" varchar
    );

    DO $$ BEGIN
      ALTER TABLE "application_form_fields" ADD CONSTRAINT "application_form_fields_parent_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."application_form"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    DO $$ BEGIN
      ALTER TABLE "application_form_fields_options" ADD CONSTRAINT "application_form_fields_options_parent_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."application_form_fields"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    CREATE INDEX IF NOT EXISTS "application_form_fields_parent_idx"
      ON "application_form_fields" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "application_form_fields_order_idx"
      ON "application_form_fields" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "application_form_fields_options_parent_idx"
      ON "application_form_fields_options" USING btree ("_parent_id");

    INSERT INTO "application_form" ("id", "title", "subtitle", "updated_at", "created_at")
    SELECT 1,
      'Postulación – Asesor Comercial | Planes de Salud',
      'Gracias por tu interés en esta oportunidad. A través de este formulario buscamos conocer tu perfil, tu experiencia comercial y validar si estás alineado/a con la modalidad de trabajo y contratación.',
      now(),
      now()
    WHERE NOT EXISTS (SELECT 1 FROM "application_form");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE IF EXISTS "application_form_fields_options";
    DROP TABLE IF EXISTS "application_form_fields";
    DROP TABLE IF EXISTS "application_form";
    DROP TYPE IF EXISTS "public"."enum_application_form_fields_type";
    ALTER TABLE "applications" DROP COLUMN IF EXISTS "answers";
    ALTER TABLE "leads" ALTER COLUMN "source" DROP DEFAULT;
    ALTER TABLE "leads" ALTER COLUMN "source" TYPE varchar USING ("source"::text);
    ALTER TABLE "leads" ALTER COLUMN "source" SET DEFAULT 'contact-form';
    DROP TYPE IF EXISTS "public"."enum_leads_source";
  `)
}
