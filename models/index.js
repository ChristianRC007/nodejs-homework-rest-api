const ContactsRepository = require('../repository/contactsRepo')

class ContactsService {
  constructor() {
    this.repositories = {
      contacts: new ContactsRepository(),
    }
  }

  async listContacts() {
    const data = await this.repositories.contacts.getAll()
    return data
  }

  async getContactById({ contactId }) {
    const data = await this.repositories.contacts.getById(contactId)
    return data
  }

  async addContact(body) {
    const data = await this.repositories.contacts.create(body)
    return data
  }

  async updateContact({ contactId }, body) {
    const data = await this.repositories.contacts.update(contactId, body)
    return data
  }

  async removeContact({ contactId }) {
    const data = await this.repositories.contacts.delete(contactId)
    return data
  }

  async updateStatus({ contactId }, body) {
    const data = await this.repositories.contacts.updateStatus(contactId, body)
    return data
  }
}

module.exports = ContactsService
