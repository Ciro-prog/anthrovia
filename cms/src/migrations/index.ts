import * as migration_20260831_041819_initial from './20260831_041819_initial'
import * as migration_20260831_143600_service_card_images from './20260831_143600_service_card_images'
import * as migration_20260831_163000_courses_cards_blocks from './20260831_163000_courses_cards_blocks'
import * as migration_20260901_231000_applications from './20260901_231000_applications'
import * as migration_20260901_234500_dossier_leads_settings from './20260901_234500_dossier_leads_settings'
import * as migration_20260902_001500_inbox_application_form from './20260902_001500_inbox_application_form'
import * as migration_20260902_054400_resources from './20260902_054400_resources'

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
]
