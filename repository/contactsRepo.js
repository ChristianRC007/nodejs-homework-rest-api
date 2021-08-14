const Contact = require('../models/Contact')

class ContactsRepository {
  async getAll() {
    const result = await Contact.find()
    return result
  }

  async getById(id) {
    const result = await Contact.findById(id)
    return result
  }

  async create(body) {
    const result = await Contact.create(body)
    return result
  }

  async update(id, body) {
    const result = await Contact.findByIdAndUpdate(id, body, { new: true })
    return result
  }

  async delete(id) {
    const result = await Contact.findByIdAndRemove(id)
    return result
  }

  async updateStatus(id, body) {
    const result = await Contact.findByIdAndUpdate(id, body, { new: true })
    return result
  }
}

module.exports = ContactsRepository
