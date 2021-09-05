const Joi = require('joi')
const { httpCodes } = require('../helpers/httpCodes')

const schemaCreateContact = Joi.object({
  name: Joi.string().alphanum().min(2).max(30).required(),
  phone: Joi.string()
    .pattern(/\(?([0-9]{3})\)?([ ]?)([0-9]{3})([-]?)([0-9]{4})/)
    .required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'co', 'uk', 'ru', 'ua'] } })
    .required(),
})

const schemaUpdateContact = Joi.object({
  name: Joi.string().alphanum().min(2).max(30).required().optional(),
  phone: Joi.string()
    .pattern(/\(?([0-9]{3})\)?([ ]?)([0-9]{3})([-]?)([0-9]{4})/)
    .optional(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'co', 'uk', 'ru', 'ua'] } })
    .optional(),
})

const validate = (schema, body, next) => {
  const { error } = schema.validate(body)
  if (error) {
    const [{ message }] = error.details
    return next({
      status: httpCodes.BAD_REQUEST,
      message: `field ${message.replace(/"/g, '')}`,
      data: 'Bad request',
    })
  }
  next()
}

module.exports = {
  validateCreateContact: (req, res, next) => {
    return validate(schemaCreateContact, req.body, next)
  },
  validateUpdateContact: (req, res, next) => {
    return validate(schemaUpdateContact, req.body, next)
  },
}
