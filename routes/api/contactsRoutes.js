const express = require('express')
const router = express.Router()
const ContactsControllers = require('../../controllers/contactsControllers')
const {
  validateCreateContact,
  validateUpdateContact,
} = require('../../validators/contactsValidator')

router.get('/', ContactsControllers.getAll)

router.get('/:contactId', ContactsControllers.getByID)

router.post('/', validateCreateContact, ContactsControllers.postContact)

router.delete('/:contactId', ContactsControllers.deleteContact)

router.put('/:contactId', validateUpdateContact, ContactsControllers.updateContact)

router.patch('/:contactId/favourite', ContactsControllers.updateStatusContact)

module.exports = router
