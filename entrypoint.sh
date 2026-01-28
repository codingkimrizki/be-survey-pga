#!/bin/sh
set -e

echo "⏳ Waiting for MySQL to be ready..."

# tunggu MySQL sampai bisa connect ke port 3306
while ! nc -z db 3306; do
  sleep 1
done

echo "✅ MySQL is ready!"

# migrate
echo "🚀 Running migrations..."

# npx sequelize db:migrate
node migrate.js

# start server
echo "🔥 Starting server..."
npm start
