// migrate.js
const { spawnSync } = require('child_process');

console.log('🚀 Running migrations...');

const result = spawnSync('node', ['node_modules/sequelize-cli/lib/sequelize', 'db:migrate'], {
  stdio: 'inherit'
});

if (result.status !== 0) {
  console.error('❌ Migration failed');
  process.exit(result.status);
}

console.log('✅ Migrations done!');
