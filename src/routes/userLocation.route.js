const express = require('express')
const router = express.Router()

const UserLocation = require('../controllers/userLocation.controller')

router.post('/submit', UserLocation.submitLocation)

module.exports = router