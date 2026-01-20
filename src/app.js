//app.js fokus buat app/middleware/route, jangan listen port

const express = require('express')
const cors = require('cors')

const app = express()

// middleware
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}))

app.use(express.json())

//questions
const questionsRoute = require('./routes/questions.route')
app.use('/api/questions', questionsRoute)

//Users
const UsersRoute = require('./routes/users.route')
app.use('/api/users', UsersRoute)

//answers
const AnswersRoute = require('./routes/answers.route')
app.use('/api/answers', AnswersRoute)

// route test
app.get('/', (req, res) => {
  res.send('HELLO WORLD 🔥')
})

module.exports = app
