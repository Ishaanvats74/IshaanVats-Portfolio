import * as migration_20261019_194222_initial from './20261019_194222_initial';
import * as migration_20261023_083809_neon_storage_fields from './20261023_083809_neon_storage_fields';
import * as migration_20261025_151208 from './20261025_151208';
import * as migration_20261026_053300 from './20261026_053300';

export const migrations = [
  {
    up: migration_20261019_194222_initial.up,
    down: migration_20261019_194222_initial.down,
    name: '20261019_194222_initial',
  },
  {
    up: migration_20261023_083809_neon_storage_fields.up,
    down: migration_20261023_083809_neon_storage_fields.down,
    name: '20261023_083809_neon_storage_fields',
  },
  {
    up: migration_20261025_151208.up,
    down: migration_20261025_151208.down,
    name: '20261025_151208',
  },
  {
    up: migration_20261026_053300.up,
    down: migration_20261026_053300.down,
    name: '20261026_053300'
  },
];
