const sequelize = require('./config/database')

async function testDB() {
  try {
    await sequelize.authenticate()
    console.log('✅ DB CONNECTED. GAS TERUS 🔥')
  } catch (error) {
    console.error('❌ DB GAGAL:', error.message)
  }
}

testDB()