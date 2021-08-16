const { v4: uuid } = require('uuid')
const fs = require('fs/promises')

class ContactsRepository {
  async getAll() {
    try {
      const result = await fs.readFile('./db/contacts.json')
      return JSON.parse(result)
    } catch (error) {
      console.log(error)
    }
  }

  async getById(id) {
    try {
      const data = await this.getAll()
      const result = data.find((el) => el.id === id)
      return result
    } catch (error) {
      console.log(error)
    }
  }

  async create(body) {
    try {
      const id = uuid()
      const record = {
        id,
        ...body,
      }
      const data = await this.getAll()
      data.push(record)
      fs.writeFile('./db/contacts.json', JSON.stringify(data, null, 2))
      return record
    } catch (error) {
      console.log(error)
    }
  }

  async update(id, body) {
    try {
      const data = await this.getAll()
      const dataToUpdate = [...data]
      const contact = data.find((el) => el.id === id)
      const updatedContact = { ...contact, ...body }

      dataToUpdate[dataToUpdate.indexOf(contact)] = updatedContact
      fs.writeFile('./db/contacts.json', JSON.stringify(dataToUpdate, null, 2))

      return updatedContact
    } catch (error) {
      console.log(error)
    }
  }

  async delete(id) {
    try {
      const data = await this.getAll()
      const contact = data.find((el) => el.id === id)
      if (contact) {
        const updatedData = data.filter((el) => el.id !== id)
        fs.writeFile('./db/contacts.json', JSON.stringify(updatedData, null, 2))
      }
      return contact
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = new ContactsRepository()
