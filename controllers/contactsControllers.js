const { httpCodes } = require('../helpers/httpCodes')
const ContactsService = require('../model/index')

const contactsService = new ContactsService()

const getAll = async (req, res, next) => {
  try {
    const contacts = await contactsService.listContacts()
    console.log(contacts)
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

const getByID = async (req, res, next) => {
  try {
    const contact = await contactsService.getContactById(req.params)
    if (contact) {
      return res.status(httpCodes.OK).json({
        status: 'success',
        code: httpCodes.OK,
        data: {
          contact,
        },
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

const postContact = async (req, res, next) => {
  try {
    const contact = await contactsService.addContact(req.body)
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

const updateContact = async (req, res, next) => {
  try {
    if (req.headers['content-length'] === '0') {
      return res.status(httpCodes.BAD_REQUEST).json({
        status: httpCodes.BAD_REQUEST,
        message: 'missing fields',
      })
    }
    const contact = await contactsService.updateContact(req.params, req.body)
    if (contact?.id) {
      return res.status(httpCodes.OK).json({
        status: 'success',
        code: httpCodes.OK,
        data: {
          contact,
        },
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

const deleteContact = async (req, res, next) => {
  try {
    const contact = await contactsService.removeContact(req.params)
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

module.exports = {
  getAll,
  getByID,
  postContact,
  deleteContact,
  updateContact,
}
