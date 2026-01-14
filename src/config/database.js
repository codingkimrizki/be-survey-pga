const { Sequelize } = require('sequelize')
require('dotenv').config()

// bikin koneksi ke database
const sequelize = new Sequelize(
  process.env.DB_NAME,   // nama database
  process.env.DB_USER,   // username
  process.env.DB_PASS,   // password
  {
    host: process.env.DB_HOST,   // server DB
    dialect: 'mysql', // jenis DB (mysql)
    logging: false, // matiin log SQL biar terminal bersih
  }
)

module.exports = sequelize
