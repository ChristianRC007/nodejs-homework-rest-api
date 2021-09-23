const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const path = require('path')
const { httpCodes } = require('./helpers/httpCodes')

const contactsRouter = require('./routes/api/contactsRoutes')
const usersRouter = require('./routes/api/usersRoutes')

require('dotenv').config()

const AVATARS_DIR = process.env.AVATARS_DIR

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use('/avatars', express.static(path.join(__dirname, AVATARS_DIR)))
app.use(cors())
app.use(express.json())

app.use('/api/contacts', contactsRouter)
app.use('/api/users', usersRouter)

app.use((req, res) => {
  res.status(httpCodes.NOT_FOUND).json({
    status: 'error',
    code: httpCodes.NOT_FOUND,
    message: `Use API on routes ${req.baseUrl}/api/contacts`,
    data: 'Not found',
  })
})

app.use((err, req, res, next) => {
  err.status = err.status ? err.status : httpCodes.INTERNAL_SERVER_ERROR
  res.status(err.status).json({
    status: err.status === 500 ? 'failed' : 'error',
    code: err.status,
    message: err.message,
    data: err.status === 500 ? 'Internal server error' : err.data,
  })
})

module.exports = app
