const express = require('express')
const router = express.Router()

const Roles = require('../controllers/roles.controller')

router.get('/options', Roles.getRoleOptions)

module.exports = router