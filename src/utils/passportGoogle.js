const passport = require('passport')
const { Strategy: GoogleStrategy } = require('passport-google-oauth20')

const UserModel = require('../models/User.model')

async function verifyGoogle(accessToken, refreshToken, profile, done) {
  const user = profile._json

  const userFromDb = await UserModel.findOne({ googleId: user.sub })

  // If first time 
  if (!userFromDb) {
    await UserModel.create({
      googleId: user.sub,
      email: user.email,
      isEmailVerified: user.email_verified,
    })
  }

  done(null, userFromDb)
}

passport.use(
  new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CLIENT_URL,
    profileFields: ['id', 'email', 'gender', 'picture.type(large)'],
    passReqToCallback: false,
  }, verifyGoogle)
)

passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser((object, done) => {
  done(null, object)
})
