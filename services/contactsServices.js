const ContactsRepository = require('../repository/contactsRepo')

class ContactsServices {
  constructor() {
    this.repositories = {
      contacts: ContactsRepository,
    }
  }

  refactorId(id) {
    return isNaN(id) ? id : Number(id)
  }

  listContacts() {
    const data = this.repositories.contacts.getAll()
    return data
  }

  getContactById({ contactId }) {
    const refactoredId = this.refactorId(contactId)
    const data = this.repositories.contacts.getById(refactoredId)
    return data
  }

  addContact(body) {
    const data = this.repositories.contacts.create(body)
    return data
  }

  updateContact({ contactId }, body) {
    const refactoredId = this.refactorId(contactId)
    const data = this.repositories.contacts.update(refactoredId, body)
    return data
  }

  removeContact({ contactId }) {
    const refactoredId = this.refactorId(contactId)
    const data = this.repositories.contacts.delete(refactoredId)
    return data
  }
}

module.exports = new ContactsServices()
