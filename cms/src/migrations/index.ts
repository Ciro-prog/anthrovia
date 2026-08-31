import * as migration_20260831_041819_initial from './20260831_041819_initial';

export const migrations = [
  {
    up: migration_20260831_041819_initial.up,
    down: migration_20260831_041819_initial.down,
    name: '20260831_041819_initial'
  },
];
