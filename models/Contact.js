const { Schema, model } = require('mongoose')

const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact'],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favourite: {
    type: Boolean,
    default: false,
  },
})

module.exports = model('contact', contactSchema)
