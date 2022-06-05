const router = require('express').Router()

// Import Routes
const authRouter = require('./auth.router')
const profileRouter = require('./profile.router')
const domainRouter = require('./domain.router')

// Middlewares
const check = require('../middlewares/checkAuthentication')

// Use Routes
router.get('/', (req, res) => {
  res.render('home')
})

router.use('/auth', check.notAuthenticated, authRouter)
router.use('/profile', check.authenticated, profileRouter)
router.use('/domain', check.authenticated, domainRouter)


module.exports = router
