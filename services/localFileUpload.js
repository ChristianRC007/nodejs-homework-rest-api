const jimp = require('jimp')
const path = require('path')
const fs = require('fs/promises')
const UsersRepository = require('../repository/usersRepo')
const createFolderIsNotExist = require('../middleware/createFolder')

class UploadFileService {
  constructor(folderAvatars) {
    this.folderAvatars = folderAvatars
    this.repositories = {
      users: UsersRepository,
    }
  }

  async transformAvatar(pathFile) {
    const pic = await jimp.read(pathFile)
    await pic
      .autocrop()
      .cover(250, 250, jimp.HORIZONTAL_ALIGN_CENTER | jimp.VERTICAL_ALIGN_MIDDLE)
      .writeAsync(pathFile)
  }

  async saveAvatar({ userId, file }) {
    await this.transformAvatar(file.path)
    const folderUserAvatar = path.join(this.folderAvatars, userId)
    await createFolderIsNotExist(folderUserAvatar)
    await fs.rename(file.path, path.join(folderUserAvatar, file.filename))
    return path.normalize(path.join(userId, file.filename))
  }

  async updateAvatar(id, avatarURL) {
    const data = this.repositories.users.updateAvatar(id, avatarURL)
    return data
  }
}

module.exports = UploadFileService
