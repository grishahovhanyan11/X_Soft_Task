const { body, validationResult } = require('express-validator')

const validateDomain = body('domain')
  .not()
  .isEmpty()
  .withMessage('Please put domain')
  .matches(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/)
  .withMessage('Invalid domain format')


function errorHandler(req, res, next) {
  const validErrors = validationResult(req).array()

  if (validErrors.length !== 0) {
    // RED INPUT 
    return res.render('newDomain', {
      userEmail: req.user.email,
      validationInfo: validErrors[0].msg
    })
  }

  next()
}

module.exports = {
  validateDomain,
  errorHandler
}