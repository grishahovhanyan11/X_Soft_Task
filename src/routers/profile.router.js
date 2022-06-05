const profileRouter = require('express').Router()

const profileController = require('../controllers/profile.controller')


profileRouter.get('/', profileController.renderProfile)
profileRouter.post('/', profileController.doRequests)
profileRouter.get('/logout', profileController.logout)


module.exports = profileRouter
