const domainRouter = require('express').Router()

const domainController = require('../controllers/domain.controller')

const { validateDomain, errorHandler } = require('../middlewares/validateDomain')

domainRouter.get('/',
  domainController.renderNewDomain)
domainRouter.post('/',
  validateDomain,
  errorHandler,
  domainController.addNewDomain)
domainRouter.get('/:id',
  domainController.renderEdit)
domainRouter.put('/:id',
  domainController.editDomain)
domainRouter.delete('/:id',
  domainController.deleteDomain)


module.exports = domainRouter
