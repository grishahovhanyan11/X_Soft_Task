const { body, validationResult } = require('express-validator')

const validateEmail = body('email')
  .not()
  .isEmpty()
  .withMessage('Email is required.')
  .isEmail()
  .withMessage('Such email format invalid.')

const validatePassword = body('password')
  .not()
  .isEmpty()
  .withMessage('Password is required.')
  .isLength({ min: 6, max: 30 })
  .withMessage('The minimum password length is 6 and the maximum 30.')

const validatePasswordConfirm = body('passwordConfirm').custom((value, { req }) => {
  if (value !== req.body.password) {
    throw new Error('Password confirmation does not match with password.')
  }
  return true
})

function errorHandler(req, res, next) {
  const validErrors = validationResult(req).array()

  if (validErrors.length !== 0) {
    console.log(req.body)

    return res.render(`${req.url.slice(1)}`, {
      // req.url.slice(1) === /url
      invalidValues: true,
      validationMessage: validErrors[0].msg,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      confirmCode: req.body.confirmCode,
    })
  }

  next()
}


module.exports = {
  validateEmail,
  validatePassword,
  validatePasswordConfirm,
  errorHandler
}

