const express = require('express')
const router = express.Router()
const UsersControllers = require('../../controllers/usersControllers')
const {
  validateCreateUser,
  validateLogin,
  validateVerification,
} = require('../../validators/usersValidator')

const guard = require('../../helpers/guard')
const upload = require('../../middleware/upload')

router.post('/signup', validateCreateUser, UsersControllers.register)
router.post('/login', validateLogin, UsersControllers.login)
router.post('/logout', guard, UsersControllers.logout)
router.get('/current', guard, UsersControllers.getCurrent)
router.patch('/current', guard, UsersControllers.updateSubscription)
router.patch('/avatars', guard, upload.single('avatarURL'), UsersControllers.updateAvatar)
router.get('/verify/:verificationToken', UsersControllers.verify)
router.post('/verify', validateVerification, UsersControllers.repeatVerifyEmail)

module.exports = router
