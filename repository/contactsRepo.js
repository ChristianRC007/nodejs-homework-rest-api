const Contact = require('../models/Contact')

class ContactsRepository {
  async getAll(userId, requestQuery) {
    try {
      if (requestQuery.favourite) {
        const result = await Contact.find({ owner: userId, favourite: true })
        return result
      }
      const result = await Contact.find({ owner: userId })
        .populate({
          path: 'owner',
          select: 'email',
        })
        .limit(requestQuery.limit * 1)
        .skip((requestQuery.page - 1) * requestQuery.limit)
        .exec()
      const count = await Contact.countDocuments({ owner: userId })
      return { result, count }
    } catch (error) {
      console.log(error)
    }
  }

  async getById(userId, id) {
    try {
      const result = await Contact.findOne({ _id: id, owner: userId }).populate({
        path: 'owner',
        select: 'email',
      })
      return result
    } catch (error) {
      console.log(error)
    }
  }

  async create(userId, body) {
    try {
      const result = await Contact.create({ owner: userId, ...body })
      return result
    } catch (error) {
      console.log(error)
    }
  }

  async update(userId, id, body) {
    try {
      const result = await Contact.findOneAndUpdate(
        { _id: id, owner: userId },
        { ...body },
        { new: true },
      )
      return result
    } catch (error) {
      console.log(error)
    }
  }

  async delete(userId, id) {
    try {
      const result = await Contact.findOneAndRemove({ _id: id, owner: userId })
      return result
    } catch (error) {
      console.log(error)
    }
  }

  async updateStatus(userId, id, body) {
    try {
      const result = await Contact.findOneAndUpdate(
        { _id: id, owner: userId },
        { ...body },
        { new: true },
      )
      return result
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = new ContactsRepository()
