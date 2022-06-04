const { Schema, model } = require('mongoose')

const UserSchema = new Schema({
  googleId: { type: String },
  email: { type: String },
  password: { type: String },
  isEmailVerified: { type: Boolean, default: false },
  confirmCode: { type: String }
}, { collection: 'users', strict: false })

module.exports = model('User', UserSchema)
