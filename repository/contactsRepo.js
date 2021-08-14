const { v4: uuid } = require('uuid')
const fs = require('fs/promises')

class ContactsRepository {
  async getAll() {
    const result = await fs.readFile('./db/contacts.json')
    return JSON.parse(result)
  }

  async getById(id) {
    const data = await this.getAll()
    const result = data.find((el) => el.id === id)
    return result
  }

  async create(body) {
    const id = uuid()
    const record = {
      id,
      ...body,
    }
    const data = await this.getAll()
    data.push(record)
    fs.writeFile('./db/contacts.json', JSON.stringify(data, null, 2), (err) => {
      if (err) throw err
    })
    return record
  }

  async update(id, body) {
    const data = await this.getAll()
    const dataToUpdate = [...data]
    const contact = data.find((el) => el.id === id)
    const updatedContact = { ...contact, ...body }
    dataToUpdate[dataToUpdate.indexOf(contact)] = updatedContact

    fs.writeFile('./db/contacts.json', JSON.stringify(dataToUpdate, null, 2), (err) => {
      if (err) throw err
    })

    return updatedContact
  }

  async delete(id) {
    const data = await this.getAll()
    const contact = data.find((el) => el.id === id)
    if (contact) {
      const updatedData = data.filter((el) => el.id !== id)
      fs.writeFile('./db/contacts.json', JSON.stringify(updatedData, null, 2), (err) => {
        if (err) throw err
      })
      return contact
    }
    return false
  }
}

module.exports = ContactsRepository
