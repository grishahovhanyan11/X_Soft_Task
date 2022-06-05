const cronRouter = require('express').Router()

const cronController = require('../controllers/cron.controller')


cronRouter.post('/', cronController.doRequests)


module.exports = cronRouter
