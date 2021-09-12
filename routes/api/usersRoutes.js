const express = require('express')
const router = express.Router()
const UsersControllers = require('../../controllers/usersControllers')
const { validateCreateUser, validateLogin } = require('../../validators/usersValidator')

const guard = require('../../helpers/guard')

router.post('/signup', validateCreateUser, UsersControllers.register)

router.post('/login', validateLogin, UsersControllers.login)

router.post('/logout', guard, UsersControllers.logout)

router.get('/current', guard, UsersControllers.getCurrent)

router.patch('/current', guard, UsersControllers.updateSubscription)

module.exports = router
