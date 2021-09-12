const UsersRepository = require('../repository/usersRepo')

class UsersServices {
  constructor() {
    this.repositories = {
      users: UsersRepository,
    }
  }

  findByEmail(email) {
    const data = this.repositories.users.findByEmail(email)
    return data
  }

  createUser(body) {
    const data = this.repositories.users.create(body)
    return data
  }

  getCurrentUser(token) {
    const data = this.repositories.users.getCurrentUser(token)
    return data
  }

  updateSubscription(token, body) {
    const data = this.repositories.users.updateSubscription(token, body)
    return data
  }

  updateToken(id, token) {
    const data = this.repositories.users.updateToken(id, token)
    return data
  }
}

module.exports = new UsersServices()
