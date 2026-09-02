import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$ BEGIN CREATE TYPE "public"."enum_applications_status" AS ENUM('new', 'reviewing', 'interview', 'hired', 'rejected'); EXCEPTION WHEN duplicate_object THEN null; END $$;

    CREATE TABLE IF NOT EXISTS "applications" (
      "id" serial PRIMARY KEY NOT NULL,
      "first_name" varchar NOT NULL,
      "last_name" varchar NOT NULL,
      "age" varchar,
      "email" varchar NOT NULL,
      "phone" varchar,
      "linkedin" varchar,
      "country" varchar,
      "province" varchar,
      "city" varchar,
      "residency_status" varchar,
      "education_level" varchar,
      "secondary_status" varchar,
      "career_run" varchar,
      "sales_experience_years" varchar,
      "health_sales_experience" varchar,
      "health_sales_experience_desc" varchar,
      "is_working" varchar,
      "current_role" varchar,
      "looking_for_change" varchar,
      "willing_to_change" varchar,
      "change_condition" varchar,
      "start_date" varchar,
      "remote_work_agreement" varchar,
      "commission_scheme_agreement" varchar,
      "desired_income_scheme" varchar,
      "contract_type_agreement" varchar,
      "monotributo" varchar,
      "has_pc" varchar,
      "has_internet" varchar,
      "consent" boolean,
      "cv_id" integer,
      "status" "enum_applications_status" DEFAULT 'new',
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );

    DO $$ BEGIN
      ALTER TABLE "applications" ADD CONSTRAINT "applications_cv_id_media_id_fk"
        FOREIGN KEY ("cv_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null;
    END $$;

    CREATE INDEX IF NOT EXISTS "applications_cv_idx" ON "applications" USING btree ("cv_id");
    CREATE INDEX IF NOT EXISTS "applications_updated_at_idx" ON "applications" USING btree ("updated_at");
    CREATE INDEX IF NOT EXISTS "applications_created_at_idx" ON "applications" USING btree ("created_at");

    ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "applications_id" integer;

    DO $$ BEGIN
      ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_applications_fk"
        FOREIGN KEY ("applications_id") REFERENCES "public"."applications"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null;
    END $$;

    CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_applications_id_idx"
      ON "payload_locked_documents_rels" USING btree ("applications_id");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_applications_fk";
    DROP INDEX IF EXISTS "payload_locked_documents_rels_applications_id_idx";
    ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "applications_id";
    DROP TABLE IF EXISTS "applications";
    DROP TYPE IF EXISTS "public"."enum_applications_status";
  `)
}
