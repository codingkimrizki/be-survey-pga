//start server, import app.js, listen port

require('dotenv').config()
const app = require('./app')
const sequelize = require('./config/database')

const PORT = process.env.PORT || 5000;

(
  async () => {
    // connect DB
    await sequelize.authenticate()

    app.listen(PORT, () => {
      console.log(`Server jalan di http://localhost:${PORT}`)
    })
  }
)();
