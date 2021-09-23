const { httpCodes } = require('../helpers/httpCodes')
const UsersServices = require('../services/usersServices')
const UploadFileService = require('../services/localFileUpload')
const MailService = require('../services/mailService')
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
      const { id, email, avatarURL, verificationToken } = await UsersServices.createUser(req.body)
      await MailService.sendActivationMail(
        email,
        `${process.env.API_URL}/api/users/verify/${verificationToken}`,
      )
      res.status(httpCodes.CREATED).json({
        status: 'success',
        code: httpCodes.CREATED,
        data: {
          id,
          email,
          avatarURL,
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
      if (!user || !isValidPassword || !user.isVerified) {
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
      const { subscription, email, avatarURL } = await UsersServices.getCurrentUser(token)
      res.status(httpCodes.OK).json({ data: { subscription, email, avatarURL } })
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

  async updateAvatar(req, res, next) {
    try {
      const id = req.user.id
      const upload = new UploadFileService(process.env.AVATARS_DIR)
      const avatarURL = await upload.saveAvatar({ userId: id, file: req.file })
      await upload.updateAvatar(id, avatarURL)
      res.status(httpCodes.OK).json({ status: 'success', data: { avatarURL } })
    } catch (error) {
      next(error)
    }
  }

  async verify(req, res, next) {
    try {
      const user = await UsersServices.findByVerificationToken(req.params.verificationToken)
      if (user) {
        await UsersServices.updateVerificationToken(user.id, true, null)
        res
          .status(httpCodes.OK)
          .json({ status: 'success', message: 'Your account successfully verified' })
      }
      return res.status(httpCodes.BAD_REQUEST).json({
        status: 'error',
        code: httpCodes.BAD_REQUEST,
        message: 'Verification token is not valid',
      })
    } catch (error) {
      next(error)
    }
  }

  async repeatVerifyEmail(req, res, next) {
    try {
      const user = await UsersServices.findByEmail(req.body.email)
      if (user) {
        const { email, verificationToken, isVerified } = user
        if (!isVerified) {
          await MailService.sendActivationMail(
            email,
            `${process.env.API_URL}/api/users/verify/${verificationToken}`,
          )
          res.status(httpCodes.OK).json({ status: 'success', message: 'New activation link sent' })
        }
        res.status(httpCodes.CONFLICT).json({
          status: 'error',
          code: httpCodes.CONFLICT,
          message: 'Verification has already been passed',
        })
      }
      res.status(httpCodes.NOT_FOUND).json({
        status: 'error',
        code: httpCodes.NOT_FOUND,
        message: 'User not found',
      })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = new UsersControllers()
