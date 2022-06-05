const domainRouter = require('express').Router()

const domainController = require('../controllers/domain.controller')


domainRouter.get('/', domainController.renderNewDomain)


module.exports = domainRouter
