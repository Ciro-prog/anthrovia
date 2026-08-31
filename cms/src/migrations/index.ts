import * as migration_20260831_041819_initial from './20260831_041819_initial'
import * as migration_20260831_143600_service_card_images from './20260831_143600_service_card_images'
import * as migration_20260831_163000_courses_cards_blocks from './20260831_163000_courses_cards_blocks'

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
]
