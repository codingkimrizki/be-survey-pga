const express = require('express')
const router = express.Router()

const Users = require('../controllers/users.controller')

//post or register
router.post('/register', Users.UserRegister)

module.exports = router