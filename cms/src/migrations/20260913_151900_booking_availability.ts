import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "bookings" ADD COLUMN IF NOT EXISTS "ends_at" timestamp(3) with time zone;

    CREATE TABLE IF NOT EXISTS "site_settings_booking_days" (
      "id" serial PRIMARY KEY NOT NULL,
      "order" integer NOT NULL,
      "parent_id" integer NOT NULL,
      "value" varchar
    );

    CREATE TABLE IF NOT EXISTS "site_settings_booking_windows" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "start" varchar,
      "end" varchar
    );

    CREATE TABLE IF NOT EXISTS "site_settings_booking_blocks" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "date" timestamp(3) with time zone,
      "all_day" boolean DEFAULT true,
      "start" varchar,
      "end" varchar
    );

    DO $$ BEGIN
      ALTER TABLE "site_settings_booking_days" ADD CONSTRAINT "site_settings_booking_days_parent_fk"
        FOREIGN KEY ("parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    DO $$ BEGIN
      ALTER TABLE "site_settings_booking_windows" ADD CONSTRAINT "site_settings_booking_windows_parent_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    DO $$ BEGIN
      ALTER TABLE "site_settings_booking_blocks" ADD CONSTRAINT "site_settings_booking_blocks_parent_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    CREATE INDEX IF NOT EXISTS "site_settings_booking_days_parent_idx"
      ON "site_settings_booking_days" USING btree ("parent_id");
    CREATE INDEX IF NOT EXISTS "site_settings_booking_windows_parent_idx"
      ON "site_settings_booking_windows" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "site_settings_booking_blocks_parent_idx"
      ON "site_settings_booking_blocks" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "bookings_ends_at_idx" ON "bookings" USING btree ("ends_at");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE IF EXISTS "site_settings_booking_days";
    DROP TABLE IF EXISTS "site_settings_booking_windows";
    DROP TABLE IF EXISTS "site_settings_booking_blocks";
    DROP INDEX IF EXISTS "bookings_ends_at_idx";
    ALTER TABLE "bookings" DROP COLUMN IF EXISTS "ends_at";
  `)
}
