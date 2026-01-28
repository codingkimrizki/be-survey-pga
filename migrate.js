// migrate.js
const { spawnSync } = require('child_process');

console.log('🚀 Running migrations...');

// Jalankan migrate dulu
const migrate = spawnSync(
  'node',
  ['node_modules/sequelize-cli/lib/sequelize', 'db:migrate'],
  { stdio: 'inherit' }
);

if (migrate.status !== 0) {
  console.error('❌ Migration failed');
  process.exit(migrate.status);
}

console.log('✅ Migrations done!');

// Jalankan seed setelah migrate sukses
console.log('🚀 Running seeds...');

const seed = spawnSync(
  'node',
  ['node_modules/sequelize-cli/lib/sequelize', 'db:seed:all'],
  { stdio: 'inherit' }
);

if (seed.status !== 0) {
  console.error('❌ Seeding failed');
  process.exit(seed.status);
}

console.log('✅ Seeding done!');
