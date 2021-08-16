const Contact = require('../models/Contact')

class ContactsRepository {
  async getAll() {
    try {
      const result = await Contact.find()
      return result
    } catch (error) {
      console.log(error)
    }
  }

  async getById(id) {
    try {
      const result = await Contact.findById(id)
      return result
    } catch (error) {
      console.log(error)
    }
  }

  async create(body) {
    try {
      const result = await Contact.create(body)
      return result
    } catch (error) {
      console.log(error)
    }
  }

  async update(id, body) {
    try {
      const result = await Contact.findByIdAndUpdate(id, body, { new: true })
      return result
    } catch (error) {
      console.log(error)
    }
  }

  async delete(id) {
    try {
      const result = await Contact.findByIdAndRemove(id)
      return result
    } catch (error) {
      console.log(error)
    }
  }

  async updateStatus(id, body) {
    try {
      const result = await Contact.findByIdAndUpdate(id, body, { new: true })
      return result
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = new ContactsRepository()
