const app = require('../app')
const mongoose = require('mongoose')
const createFolderIsNotExist = require('../middleware/createFolder')
require('dotenv').config()

const PORT = process.env.PORT || 3000
const dbURI = process.env.DB_URI
const TEMP_DIR = process.env.TEMP_DIR
const AVATARS_DIR = process.env.AVATARS_DIR

const db = mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
})

mongoose.connection.on('connected', () => {
  console.log('Database connection successful')
})

mongoose.connection.on('error', (error) => {
  console.log(`Mongoose contction error: ${error.message}`)
})

mongoose.connection.on('disconnected', () => {
  console.log('Database disconnected')
})

db.then(() => {
  app.listen(PORT, async function () {
    await createFolderIsNotExist(TEMP_DIR)
    await createFolderIsNotExist(AVATARS_DIR)
    console.log(`Server running. Use our API on port: ${PORT}`)
  })
}).catch((err) => {
  console.log(`Server not running. Error message: ${err.message}`)
  process.exit(1)
})

module.exports = db
