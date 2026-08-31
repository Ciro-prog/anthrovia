import * as migration_20260831_014732_initial from './20260831_014732_initial';

export const migrations = [
  {
    up: migration_20260831_014732_initial.up,
    down: migration_20260831_014732_initial.down,
    name: '20260831_014732_initial'
  },
];
