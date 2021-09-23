const ContactsRepository = require('../repository/contactsRepo')

class ContactsServices {
  constructor() {
    this.repositories = {
      contacts: ContactsRepository,
    }
  }

  listContacts(userId, requestQuery) {
    const data = this.repositories.contacts.getAll(userId, requestQuery)
    return data
  }

  getContactById(userId, contactId) {
    const data = this.repositories.contacts.getById(userId, contactId)
    return data
  }

  addContact(userId, body) {
    const data = this.repositories.contacts.create(userId, body)
    return data
  }

  updateContact(userId, contactId, body) {
    const data = this.repositories.contacts.update(userId, contactId, body)
    return data
  }

  removeContact(userId, contactId) {
    const data = this.repositories.contacts.delete(userId, contactId)
    return data
  }

  updateStatus(userId, contactId, body) {
    const data = this.repositories.contacts.updateStatus(userId, contactId, body)
    return data
  }
}

module.exports = new ContactsServices()
