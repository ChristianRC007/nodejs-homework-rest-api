const express = require('express')
const router = express.Router()
const contactsControllers = require('../../controllers/contactsControllers')
const {
  validateCreateContact,
  validateUpdateContact,
} = require('../../validators/contactsValidator')

router.get('/', contactsControllers.getAll)

router.get('/:contactId', contactsControllers.getByID)

router.post('/', validateCreateContact, contactsControllers.postContact)

router.delete('/:contactId', contactsControllers.deleteContact)

router.put('/:contactId', validateUpdateContact, contactsControllers.updateContact)

router.patch('/:contactId/favourite', contactsControllers.updateStatusContact)

module.exports = router
