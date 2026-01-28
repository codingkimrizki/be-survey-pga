// migrate.js
const { run } = require('sequelize-cli/lib/sequelize');

async function main() {
  try {
    console.log('🚀 Running migrations...');
    await run(['db:migrate']);

    // console.log('🌱 Running seeds...');
    // await run(['db:seed:all']);

    console.log('✅ Done!');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

main();
