import * as migration_20260831_041819_initial from './20260831_041819_initial'
import * as migration_20260831_143600_service_card_images from './20260831_143600_service_card_images'
import * as migration_20260831_163000_courses_cards_blocks from './20260831_163000_courses_cards_blocks'
import * as migration_20260901_231000_applications from './20260901_231000_applications'
import * as migration_20260901_234500_dossier_leads_settings from './20260901_234500_dossier_leads_settings'
import * as migration_20260902_001500_inbox_application_form from './20260902_001500_inbox_application_form'
import * as migration_20260902_054400_resources from './20260902_054400_resources'
import * as migration_20260913_151900_booking_availability from './20260913_151900_booking_availability'
import * as migration_20261006_120000_booking_week_section_toggles from './20261006_120000_booking_week_section_toggles'
import * as migration_20261015_140000_application_form_conditions from './20261015_140000_application_form_conditions'

export const migrations = [
  {
    up: migration_20260831_041819_initial.up,
    down: migration_20260831_041819_initial.down,
    name: '20260831_041819_initial',
  },
  {
    up: migration_20260831_143600_service_card_images.up,
    down: migration_20260831_143600_service_card_images.down,
    name: '20260831_143600_service_card_images',
  },
  {
    up: migration_20260831_163000_courses_cards_blocks.up,
    down: migration_20260831_163000_courses_cards_blocks.down,
    name: '20260831_163000_courses_cards_blocks',
  },
  {
    up: migration_20260901_231000_applications.up,
    down: migration_20260901_231000_applications.down,
    name: '20260901_231000_applications',
  },
  {
    up: migration_20260901_234500_dossier_leads_settings.up,
    down: migration_20260901_234500_dossier_leads_settings.down,
    name: '20260901_234500_dossier_leads_settings',
  },
  {
    up: migration_20260902_001500_inbox_application_form.up,
    down: migration_20260902_001500_inbox_application_form.down,
    name: '20260902_001500_inbox_application_form',
  },
  {
    up: migration_20260902_054400_resources.up,
    down: migration_20260902_054400_resources.down,
    name: '20260902_054400_resources',
  },
  {
    up: migration_20260913_151900_booking_availability.up,
    down: migration_20260913_151900_booking_availability.down,
    name: '20260913_151900_booking_availability',
  },
  {
    up: migration_20261006_120000_booking_week_section_toggles.up,
    down: migration_20261006_120000_booking_week_section_toggles.down,
    name: '20261006_120000_booking_week_section_toggles',
  },
  {
    up: migration_20261015_140000_application_form_conditions.up,
    down: migration_20261015_140000_application_form_conditions.down,
    name: '20261015_140000_application_form_conditions',
  },
]
