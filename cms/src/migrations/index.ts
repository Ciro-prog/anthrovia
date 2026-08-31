import * as migration_20260831_041819_initial from './20260831_041819_initial'
import * as migration_20260831_143600_service_card_images from './20260831_143600_service_card_images'

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
]
