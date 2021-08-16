const ContactsRepository = require('../repository/contactsRepo')

class ContactsServices {
  constructor() {
    this.repositories = {
      contacts: ContactsRepository,
    }
  }

  listContacts() {
    const data = this.repositories.contacts.getAll()
    return data
  }

  getContactById({ contactId }) {
    const data = this.repositories.contacts.getById(contactId)
    return data
  }

  addContact(body) {
    const data = this.repositories.contacts.create(body)
    return data
  }

  updateContact({ contactId }, body) {
    const data = this.repositories.contacts.update(contactId, body)
    return data
  }

  removeContact({ contactId }) {
    const data = this.repositories.contacts.delete(contactId)
    return data
  }

  updateStatus({ contactId }, body) {
    const data = this.repositories.contacts.updateStatus(contactId, body)
    return data
  }
}

module.exports = new ContactsServices()
