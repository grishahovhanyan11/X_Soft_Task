const passport = require('passport')

const authRouter = require('express').Router()

// Import controller
const authController = require('../controllers/auth.controller')

// Middlewares //
// Check Authentication 
const check = require('../middlewares/checkAuthentication')

// For validation
const {
  validateEmail,
  validatePassword,
  validatePasswordConfirm,
  errorHandler,
} = require('../middlewares/validationMid')

// ------- //

authRouter.use(check.notAuthenticated)

authRouter // Register
  .get('/register',
    authController.renderRegister)
  .post('/register',
    validateEmail,
    validatePassword,
    errorHandler,
    authController.register)

authRouter // Forgot and restore password
  .get('/forgotPassword',
    authController.renderForgotPassword)
  .get('/restorePassword',
    authController.renderRestorePassword)
  .post('/restorePassword',
    validatePassword,
    validatePasswordConfirm,
    errorHandler,
    authController.restorePassword)

authRouter // Verify account
  .get('/verify',
    authController.renderVerify)
  .post('/sendCode',
    authController.sendCodeToMail) // Get email and send code
  .post('/verify',
    authController.verify)

authRouter // Google login
  .get('/google',
    passport.authenticate('google', { scope: ['email', 'profile'] }))
  .get('/google/verify',
    passport.authenticate('google', {
      successRedirect: '/profile',
      failureRedirect: '/auth/login'
    }))

authRouter // Local login
  .get('/login',
    authController.renderLogin)
  .post('/login',
    validateEmail,
    errorHandler,
    authController.login)

module.exports = authRouter
