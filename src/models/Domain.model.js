const { Schema, model } = require('mongoose')

const DomainSchema = new Schema({
  name: { type: String },
  requestsList: [{
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    status: { type: Number },
    statusText: { type: String },
    requestDate: { type: Date },
    _id: false
  }]
}, { collection: 'domains', strict: false })

module.exports = model('Domain', DomainSchema)
