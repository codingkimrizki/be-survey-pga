//app.js fokus buat app/middleware/route, jangan listen port

const express = require('express')
const cors = require('cors')

const app = express()

// middleware
app.use(cors({
    origin: [
    "http://localhost:5173",
    "http://192.168.147.210:4182",
    "http://192.168.148.201:4183",
    "https://rba-ethic.hrs-id.com/"
  ],
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

//roles
const RolesRoute = require('./routes/roles.route')
app.use('/api/role', RolesRoute)

// route test
app.get('/', (req, res) => {
  res.send('HELLO WORLD 🔥')
})

module.exports = app
