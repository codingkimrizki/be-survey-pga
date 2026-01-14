const express = require('express')
const router = express.Router()

const questions = require('../controllers/questions.controller')

router.get('/all', questions.getAllQuestions)

module.exports = router