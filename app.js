const express = require('express')
const mongoose = require('mongoose')

const app = express()

// Import routes //
const router = require('./src/routers/index')

// Template engineS //
app.set('view engine', 'pug')
app.use(express.static('public'))

// CORS //
const cors = require('cors')
app.use(cors({ origin: '*' }))

// Express-session // 
const session = require('express-session')
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true
}))

// passportJS //
const passport = require('passport')
require('./src/utils/passportLocal') // Local 
require('./src/utils/passportGoogle') // Google

app.use(passport.initialize())
app.use(passport.session())

// Middlewares //
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// // Use Routes //
app.use('/', router)

// Connections //
async function connections() {
  try {
    await mongoose.connect(`mongodb+srv://admin:${process.env.DB_PASSWORD}@xsofttask.dz7rt.mongodb.net/?retryWrites=true&w=majority`)
    console.log('Connection to DB success.')

    const port = process.env.PORT || 5005
    app.listen(port, () => console.log(`Server has been started on port: ${port}`))
  } catch (e) {
    console.log('Error in time connections.')
    console.log(e.message)
  }
}

connections()
