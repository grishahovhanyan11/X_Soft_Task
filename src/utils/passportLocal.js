const { Strategy: LocalStrategy } = require('passport-local')
const passport = require('passport')

const UserModel = require('../models/User.model')

passport.use(
  new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    const user = await UserModel.findOne({ email })
    done(null, user)
  })
)

passport.serializeUser((user, done,) => {
  done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  done(null, await UserModel.findById(id))
})
