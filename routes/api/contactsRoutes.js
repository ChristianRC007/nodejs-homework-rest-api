const express = require('express')
const router = express.Router()
const ContactsControllers = require('../../controllers/contactsControllers')
const {
  validateCreateContact,
  validateUpdateContact,
} = require('../../validators/contactsValidator')

const guard = require('../../helpers/guard')

router.get('/', guard, ContactsControllers.getAll)
router.get('/:contactId', guard, ContactsControllers.getByID)
router.post('/', guard, validateCreateContact, ContactsControllers.postContact)
router.delete('/:contactId', guard, ContactsControllers.deleteContact)
router.put('/:contactId', guard, validateUpdateContact, ContactsControllers.updateContact)
router.patch('/:contactId/favourite', guard, ContactsControllers.updateStatusContact)

module.exports = router
