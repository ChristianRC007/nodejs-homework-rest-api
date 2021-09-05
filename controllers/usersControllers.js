const { httpCodes } = require('../helpers/httpCodes')
const UsersServices = require('../services/usersServices')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const secret = process.env.SECRET_KEY

class UsersControllers {
  async register(req, res, next) {
    try {
      const user = await UsersServices.findByEmail(req.body.email)
      if (user) {
        return res.status(httpCodes.CONFLICT).json({
          status: 'error',
          code: httpCodes.CONFLICT,
          message: 'This email is already registered',
        })
      }
      const { id, name, email } = await UsersServices.createUser(req.body)
      res.status(httpCodes.CREATED).json({
        status: 'success',
        code: httpCodes.CREATED,
        data: {
          id,
          name,
          email,
        },
      })
    } catch (error) {
      next(error)
    }
  }

  async login(req, res, next) {
    try {
      const user = await UsersServices.findByEmail(req.body.email)
      const isValidPassword = await user?.isValidPassword(req.body.password)
      if (!user || !isValidPassword) {
        return res.status(httpCodes.UNAUTHORIZED).json({
          status: 'error',
          code: httpCodes.UNAUTHORIZED,
          message: 'Invalid email or password',
        })
      }
      const { id, email } = user
      const payload = { id, email }
      const token = jwt.sign(payload, secret, { expiresIn: '1h' })
      await UsersServices.updateToken(id, token)
      return res.json({
        status: 'success',
        code: httpCodes.OK,
        data: { token },
      })
    } catch (error) {
      next(error)
    }
  }

  async logout(req, res, next) {
    try {
      const id = req.user.id
      await UsersServices.updateToken(id, null)
      res.status(httpCodes.NO_CONTENT).json({})
    } catch (error) {
      next(error)
    }
  }

  async getCurrent(req, res, next) {
    try {
      const token = req.get('Authorization').split(' ')[1]
      const { subscription, email } = await UsersServices.getCurrentUser(token)
      res.status(httpCodes.OK).json({ data: { subscription, email } })
    } catch (error) {
      next(error)
    }
  }

  async updateSubscription(req, res, next) {
    try {
      const token = req.get('Authorization').split(' ')[1]
      const { subscription, email } = await UsersServices.updateSubscription(token, req.body)
      res.status(httpCodes.OK).json({ data: { subscription, email } })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = new UsersControllers()
