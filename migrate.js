// migrate.js
const { execSync } = require("child_process");

try {
  console.log("🚀 Running migrations...");
  execSync("npx sequelize-cli db:migrate", { stdio: "inherit" });

//   console.log("🌱 Running seeds...");
//   execSync("npx sequelize-cli db:seed:all", { stdio: "inherit" });

} catch (err) {
  console.error(err);
  process.exit(1);
}
