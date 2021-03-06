const { Schema, model } = require('mongoose')

const UserSchema = new Schema({
  googleId: { type: String },
  email: { type: String },
  password: { type: String },
  isEmailVerified: { type: Boolean, default: false },
  confirmCode: { type: String },
  isAdmin: { type: Boolean, default: false },
  isCron: { type: Boolean, default: true }
}, { collection: 'users', strict: false })

module.exports = model('User', UserSchema)
