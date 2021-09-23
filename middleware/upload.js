const multer = require('multer')
require('dotenv').config()

const TEMP_DIR = process.env.TEMP_DIR

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, TEMP_DIR)
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now().toString()}-${file.originalname}`)
  },
})

const upload = multer({
  storage,
  limits: { fileSize: 2000000 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.includes('image')) {
      cb(null, true)
      return
    }
    const error = new Error('Wrong file format')
    error.status = 400
    cb(error)
  },
})

module.exports = upload
