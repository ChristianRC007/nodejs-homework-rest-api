const Joi = require('joi')
const { httpCodes } = require('../helpers/httpCodes')

const schemaCreateUser = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'co', 'uk', 'ru', 'ua', 'org'] } })
    .required(),
  password: Joi.string().required().min(3).max(15),
})

const schemaLoginUser = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'co', 'uk', 'ru', 'ua', 'org'] } })
    .required(),
  password: Joi.string().required().min(3).max(15),
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
  validateCreateUser: (req, res, next) => {
    return validate(schemaCreateUser, req.body, next)
  },
  validateLogin: (req, res, next) => {
    return validate(schemaLoginUser, req.body, next)
  },
}
