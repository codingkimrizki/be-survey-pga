const express = require('express')
const router = express.Router()

const Users = require('../controllers/users.controller')

//post or register
router.post('/register', Users.UserRegister)
router.post('/login', Users.UserLogin)
router.post('/logout', Users.UserLogout)

module.exports = router