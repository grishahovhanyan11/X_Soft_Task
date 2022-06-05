const profileRouter = require('express').Router()

const profileController = require('../controllers/profile.controller')


profileRouter.get('/', profileController.renderProfile)
profileRouter.get('/logout', profileController.logout)


module.exports = profileRouter
