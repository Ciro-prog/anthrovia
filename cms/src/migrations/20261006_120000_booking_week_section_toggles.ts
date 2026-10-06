import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

const DAYS = ['lun', 'mar', 'mie', 'jue', 'vie', 'sab', 'dom'] as const

const weekColumns = DAYS.flatMap((day) => [
  `ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "booking_week_${day}_enabled" boolean;`,
  `ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "booking_week_${day}_morning_start" varchar;`,
  `ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "booking_week_${day}_morning_end" varchar;`,
  `ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "booking_week_${day}_afternoon_start" varchar;`,
  `ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "booking_week_${day}_afternoon_end" varchar;`,
]).join('\n')

const dropWeekColumns = DAYS.flatMap((day) => [
  `ALTER TABLE "site_settings" DROP COLUMN IF EXISTS "booking_week_${day}_enabled";`,
  `ALTER TABLE "site_settings" DROP COLUMN IF EXISTS "booking_week_${day}_morning_start";`,
  `ALTER TABLE "site_settings" DROP COLUMN IF EXISTS "booking_week_${day}_morning_end";`,
  `ALTER TABLE "site_settings" DROP COLUMN IF EXISTS "booking_week_${day}_afternoon_start";`,
  `ALTER TABLE "site_settings" DROP COLUMN IF EXISTS "booking_week_${day}_afternoon_end";`,
]).join('\n')

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql.raw(`
    ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "booking_duration_minutes" numeric DEFAULT 30;

    ${weekColumns}

    ALTER TABLE "pages_blocks_about" ADD COLUMN IF NOT EXISTS "show_purpose" boolean DEFAULT true;
    ALTER TABLE "pages_blocks_about" ADD COLUMN IF NOT EXISTS "show_mission" boolean DEFAULT true;
    ALTER TABLE "_pages_v_blocks_about" ADD COLUMN IF NOT EXISTS "show_purpose" boolean DEFAULT true;
    ALTER TABLE "_pages_v_blocks_about" ADD COLUMN IF NOT EXISTS "show_mission" boolean DEFAULT true;
  `))
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql.raw(`
    ${dropWeekColumns}
    ALTER TABLE "site_settings" DROP COLUMN IF EXISTS "booking_duration_minutes";
    ALTER TABLE "pages_blocks_about" DROP COLUMN IF EXISTS "show_purpose";
    ALTER TABLE "pages_blocks_about" DROP COLUMN IF EXISTS "show_mission";
    ALTER TABLE "_pages_v_blocks_about" DROP COLUMN IF EXISTS "show_purpose";
    ALTER TABLE "_pages_v_blocks_about" DROP COLUMN IF EXISTS "show_mission";
  `))
}
