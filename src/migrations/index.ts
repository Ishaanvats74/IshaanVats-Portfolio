import * as migration_20261019_194222_initial from './20261019_194222_initial';
import * as migration_20261023_083809_neon_storage_fields from './20261023_083809_neon_storage_fields';

export const migrations = [
  {
    up: migration_20261019_194222_initial.up,
    down: migration_20261019_194222_initial.down,
    name: '20261019_194222_initial',
  },
  {
    up: migration_20261023_083809_neon_storage_fields.up,
    down: migration_20261023_083809_neon_storage_fields.down,
    name: '20261023_083809_neon_storage_fields'
  },
];
