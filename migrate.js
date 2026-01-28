// // migrate.js
// const { spawnSync } = require('child_process');

// console.log('🚀 Running migrations...');

// // Jalankan migrate dulu
// const migrate = spawnSync(
//   'node',
//   ['node_modules/sequelize-cli/lib/sequelize', 'db:migrate'],
//   { stdio: 'inherit' }
// );

// if (migrate.status !== 0) {
//   console.error('❌ Migration failed');
//   process.exit(migrate.status);
// }

// console.log('✅ Migrations done!');

// // Jalankan seed setelah migrate sukses
// console.log('🚀 Running seeds...');

// const seed = spawnSync(
//   'node',
//   ['node_modules/sequelize-cli/lib/sequelize', 'db:seed:all'],
//   { stdio: 'inherit' }
// );

// if (seed.status !== 0) {
//   console.error('❌ Seeding failed');
//   process.exit(seed.status);
// }

// console.log('✅ Seeding done!');

const { spawnSync } = require('child_process');
const { sequelize } = require('./models'); // sesuaikan path ke sequelize instance

async function run() {
  try {
    console.log('🚀 Running migrations...');

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

    // → cek dulu sebelum seed
    const tables = ['questions', 'user_role'];
    let needSeed = false;

    for (let table of tables) {
      const [res] = await sequelize.query(`SELECT COUNT(*) as count FROM ${table}`);
      if (res[0].count === 0) {
        needSeed = true;
        break;
      }
    }

    if (needSeed) {
      console.log('Database kosong → jalankan seed');
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
    } else {
      console.log('Data sudah ada → skip seed');
    }

    process.exit(0);

  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

run();
