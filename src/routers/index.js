const router = require('express').Router()

// Import Routes
const authRouter = require('./auth.router')

const check = require('../middlewares/checkAuthentication')

// Use Routes
router.get('/', (req, res) => {
  res.render('home')
})

router.use('/auth', authRouter)
router.get('/profile', check.authenticated, (req, res) => {
  res.send('<h1>Profile</h1>')
})

module.exports = router
