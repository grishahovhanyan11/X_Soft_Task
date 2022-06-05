const router = require('express').Router()

// Import Routes
const authRouter = require('./auth.router')
const profileRouter = require('./profile.router')
const cronRouter = require('./cron.router')

// Middlewares
const check = require('../middlewares/checkAuthentication')

// Use Routes
router.get('/', (req, res) => {
  res.render('home')
})

router.use('/auth', check.notAuthenticated, authRouter)
router.use('/profile', check.authenticated, profileRouter)
router.use('/cron', /*check.authenticated,*/ cronRouter)

module.exports = router
