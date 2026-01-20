const express = require('express')
const router = express.Router()

const Users = require('../controllers/users.controller')

//post or register
router.post('/register', Users.UserRegister)
router.post('/login', Users.UserLogin)
router.post('/logout', Users.UserLogout)
router.post('/forgotpassword', Users.UserForgotPassword)
router.post('/resetPassword', Users.ResetPassword)
router.get('/allUsers', Users.getAllUsers)
router.put('/:id/role', Users.updateRole)

module.exports = router