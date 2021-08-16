const { httpCodes } = require('../helpers/httpCodes')
const ContactsServices = require('../services/contactsServices')

class ContactsControllers {
  async getAll(req, res, next) {
    console.log(this)
    try {
      const contacts = await ContactsServices.listContacts()
      res.status(httpCodes.OK).json({
        status: 'success',
        code: httpCodes.OK,
        data: {
          contacts,
        },
      })
    } catch (error) {
      next(error)
    }
  }

  async getByID(req, res, next) {
    try {
      const contact = await ContactsServices.getContactById(req.params)
      if (contact) {
        return res.status(httpCodes.OK).json({
          status: 'success',
          code: httpCodes.OK,
          data: {
            contact,
          },
        })
      }
      return next({
        status: httpCodes.NOT_FOUND,
        message: 'Contact not found',
        data: 'Not found',
      })
    } catch (error) {
      next(error)
    }
  }

  async postContact(req, res, next) {
    try {
      const contact = await ContactsServices.addContact(req.body)
      res.status(httpCodes.CREATED).json({
        status: 'success',
        code: httpCodes.CREATED,
        data: {
          contact,
        },
      })
    } catch (error) {
      next(error)
    }
  }

  async updateContact(req, res, next) {
    try {
      if (req.headers['content-length'] === '0') {
        return res.status(httpCodes.BAD_REQUEST).json({
          status: httpCodes.BAD_REQUEST,
          message: 'missing fields',
        })
      }
      const contact = await ContactsServices.updateContact(req.params, req.body)
      if (contact) {
        return res.status(httpCodes.OK).json({
          status: 'success',
          code: httpCodes.OK,
          data: {
            contact,
          },
        })
      }
      return next({
        status: httpCodes.NOT_FOUND,
        message: 'Contact not found',
        data: 'Not found',
      })
    } catch (error) {
      next(error)
    }
  }

  async deleteContact(req, res, next) {
    try {
      const contact = await ContactsServices.removeContact(req.params)
      if (contact) {
        return res.status(httpCodes.OK).json({
          status: 'success',
          code: httpCodes.OK,
          message: 'contact deleted',
          id: contact.id,
        })
      } else {
        return next({
          status: httpCodes.NOT_FOUND,
          message: 'Contact not found',
          data: 'Not found',
        })
      }
    } catch (error) {
      next(error)
    }
  }
}

module.exports = new ContactsControllers()
