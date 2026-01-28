// migrate.js
const { execSync } = require("child_process");

try {
  console.log("🚀 Running migrations...");
  execSync("node_modules/.bin/sequelize-cli db:migrate", { stdio: "inherit", shell: true });

  // console.log("🌱 Running seeds...");
  // execSync("node_modules/.bin/sequelize-cli db:seed:all", { stdio: "inherit", shell: true });

  console.log("✅ Done!");
} catch (err) {
  console.error(err);
  process.exit(1);
}
