#!/bin/sh

echo "⏳ Waiting for MySQL to be ready..."

# tunggu MySQL sampai bisa connect ke port 3306
while ! nc -z db 3306; do
  sleep 1
done

echo "✅ MySQL is ready!"

# migrate
echo "🚀 Running migrations..."

# npx sequelize db:migrate
npm run migrate

# seed
echo "🌱 Running seeds if needed..."
npm run seed

# start server
echo "🔥 Starting server..."
npm start
