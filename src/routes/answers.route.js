const express = require('express')
const router = express.Router()

const answers = require('../controllers/answers.controller')

router.post('/submit', answers.submitAnswers)
router.get('/all', answers.supplierAnswers)
router.post('/ollama', answers.saveOllamaAnswers)

module.exports = router