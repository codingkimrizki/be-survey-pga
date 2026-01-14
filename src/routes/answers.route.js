const express = require('express')
const router = express.Router()

const answers = require('../controllers/answers.controller')

router.post('/submit', answers.submitAnswers)

module.exports = router