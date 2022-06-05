const domainRouter = require('express').Router()

const domainController = require('../controllers/domain.controller')

const { validateDomain, errorHandler } = require('../middlewares/validateDomain')

domainRouter.get('/',
  domainController.renderNewDomain)

domainRouter.post('/',
  validateDomain,
  errorHandler,
  domainController.addNewDomain)

domainRouter.get('/:domainId',
  domainController.renderDetails)

domainRouter.put('/:domainId',
  validateDomain,
  errorHandler,
  domainController.changeDomain)

domainRouter.delete('/:domainId',
  domainController.deleteDomain)

module.exports = domainRouter
