const bcrypt = require('bcrypt')
const passport = require('passport')

const UserModel = require('../models/User.model')

const randomCode = require('../utils/randomCode')
const sendConfirmCodeToUserMail = require('../utils/sendConfirmCodeToUserMail')

// Register
function renderRegister(req, res) {
  res.render('register')
}

async function register(req, res) {
  try {
    const { email, password } = req.body

    // Search user in DB
    const userFromDb = await UserModel.findOne({ email })

    if (userFromDb) {
      // If user with such email already exist
      return res.render('register', {
        // To show already completed data
        email,
        password,
        // ---
        alreadyRegistered: true,
      })
    }

    // send email [in case no such user ]
    const code = randomCode()
    await sendConfirmCodeToUserMail(email, code)
    console.log(code, '<---- code')

    // Hash password and code
    const hashedPassword = await bcrypt.hash(password, 12)
    const hashedCode = await bcrypt.hash(code, 12)
    // Put user data in DB
    await UserModel.create({
      email,
      password: hashedPassword,
      confirmCode: hashedCode,
      // isEmailVerified: false (this is default)
    })

    res.redirect('/auth/verify')
  } catch (e) {
    res.send(`
    <h1>Server side error</h1>
    <div>${e.message}</div>`)
    console.log(e.message)
  }
}
// =======

// Restore password
function renderForgotPassword(req, res) {
  res.render('forgotPassword')
}

function renderRestorePassword(req, res) {
  res.render('restorePassword')
}

async function restorePassword(req, res) {
  try {
    const { confirmCode, password, passwordConfirm, email } = req.body

    const userFromDb = await UserModel.findOne({ email })

    const isCodeCorrect = await bcrypt.compare(
      confirmCode,
      userFromDb.confirmCode
    )

    if (!isCodeCorrect) {
      return res.render('restorePassword', {
        invalidValues: true,
        validationMessage: 'You are entered a wrong confirm code.',
        password,
        passwordConfirm,
      })
    }

    const hashedPassword = await bcrypt.hash(password, 12)
    userFromDb.password = hashedPassword
    await userFromDb.save()

    userFromDb.isEmailVerified = true
    await userFromDb.save()

    res.redirect('/auth/login')
  } catch (e) {
    res.send(`
    <h1>Server side error</h1>
    <div>${e.message}</div>`)
    console.log(e.message)
  }
}
// =======

// Verify account
function renderVerify(req, res) {
  res.render('verification')
}

async function sendCodeToMail(req, res) {
  try {
    const { email } = req.body
    console.log(email)
    const userFromDb = await UserModel.findOne({ email })

    if (!userFromDb) {
      return res.status(400).json({
        errMessage: 'No user with such email.',
      })
    }

    // Send code
    const code = randomCode()
    await sendConfirmCodeToUserMail(email, code)
    console.log(code, '<---- code')

    // Hash code
    const hashedCode = await bcrypt.hash(code, 12)
    userFromDb.confirmCode = hashedCode
    await userFromDb.save()

    res.json({
      message: 'Verify code was sended.',
    })
  } catch (e) {
    res.send(`
    <h1>Server side error</h1>
    <div>${e.message}</div>`)
    console.log(e.message)
  }
}

async function verify(req, res) {
  try {
    const { confirmCode, email } = req.body

    const userFromDb = await UserModel.findOne({ email })

    const isCodeCorrect = await bcrypt.compare(
      confirmCode,
      userFromDb.confirmCode
    )

    if (!isCodeCorrect) {
      return res.render('verification', {
        invalidValues: true,
        validationMessage: 'You are entered a wrong confirm code.',
      })
    }

    userFromDb.isEmailVerified = true
    await userFromDb.save()

    // res.render('login', {
    //   success: true,
    //   successInfoMessage: 'Your password was successfully changed.',
    // })
    res.redirect('/auth/login')
  } catch (e) {
    res.send(`
    <h1>Server side error</h1>
    <div>${e.message}</div>`)
    console.log(e.message)
  }
}
// =======

// Login
function renderLogin(req, res) {
  res.render('login')
}

async function login(req, res) {
  try {
    const { email, password } = req.body

    // If password field is empty
    if (!password) {
      return res.render('login', {
        email,
        invalidValues: true,
        validationMessage: 'Input password.',
      })
    }

    // Find user
    const userFromDb = await UserModel.findOne({ email })

    if (!userFromDb) {
      return res.render('login', {
        invalidValues: true,
        validationMessage: 'No user with such email.',
      })
    }

    // If usre already login with google which is used this email.
    if (!userFromDb.password) {
      return res.render('login', {
        email,
        invalidValues: true,
        validationMessage:
          'There is a user who is registered with google which is used this email.',
      })
    }

    // Check password
    const isPasswordCorrect = await bcrypt.compare(password, userFromDb.password)

    if (!isPasswordCorrect) {
      return res.render('login', {
        email,
        invalidValues: true,
        validationMessage: 'Incorrect password.',
      })
    }
  } catch (e) {
    res.send(`
    <h1>Server side error</h1>
    <div>${e.message}</div>`)
    console.log(e.message)
  }

  return passport.authenticate('local', {
    successRedirect: '/profile',
    failureRedirect: '/auth/login',
  })(req, res)
}
// =======

module.exports = {
  renderRegister,
  register,
  renderForgotPassword,
  renderRestorePassword,
  restorePassword,
  renderVerify,
  sendCodeToMail,
  verify,
  renderLogin,
  login
}
