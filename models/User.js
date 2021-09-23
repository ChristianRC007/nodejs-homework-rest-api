const { Schema, model } = require('mongoose')
const gr = require('gravatar')
const { v4: uuid } = require('uuid')

const bcrypt = require('bcrypt')
const SALT = 8

const userSchema = new Schema({
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    validate(value) {
      const regExp = /\S+@\S+\.\S+/g
      return regExp.test(String(value).toLowerCase())
    },
  },
  subscription: {
    type: String,
    enum: ['starter', 'pro', 'business'],
    default: 'starter',
  },
  token: {
    type: String,
    default: null,
  },
  avatarURL: {
    type: String,
    default: function () {
      return gr.url(this.email, { s: '250' }, true)
    },
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
    required: true,
    default: uuid(),
  },
})

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(SALT)
    this.password = await bcrypt.hash(this.password, salt)
  }
  next()
})

userSchema.methods.isValidPassword = async function (password) {
  return await bcrypt.compare(password, this.password)
}

module.exports = model('user', userSchema)
