const User = require('../models/User')

class UsersRepository {
  async findByEmail(email) {
    try {
      return await User.findOne({ email })
    } catch (error) {
      console.log(error)
    }
  }

  async findById(id) {
    try {
      return await User.findById(id)
    } catch (error) {
      console.log(error)
    }
  }

  async getCurrentUser(token) {
    try {
      return await User.findOne({ token })
    } catch (error) {
      console.log(error)
    }
  }

  async create(body) {
    try {
      const user = new User(body)
      return await user.save()
    } catch (error) {
      console.log(error)
    }
  }

  async updateSubscription(token, body) {
    try {
      return await User.findOneAndUpdate({ token }, { ...body }, { new: true })
    } catch (error) {
      console.log(error)
    }
  }

  async updateToken(id, token) {
    try {
      return await User.updateOne({ _id: id }, { token })
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = new UsersRepository()
