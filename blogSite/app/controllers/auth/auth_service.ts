import { Exception } from '@adonisjs/core/exceptions'
import AuthQuery from './auth_query.js'

export default class AuthService {
  private userQuery: AuthQuery
  constructor() {
    this.userQuery = new AuthQuery()
  }
  async registerUser(data: { username: string; password: string }) {
    const userAlreadyExist = await this.userQuery.getUserByUsername(data.username)
    if (userAlreadyExist) {
      throw new Exception('User already exist. Please choose a different username.', {
        status: 409,
        code: 'E_USER_ALREADY_EXIST',
      })
    }
    const user = await this.userQuery.registerUser(data.username, data.password)
    return user
  }
  async login(data: { username: string; password: string }) {
    const user = await this.userQuery.getVerifiedUser(data.username, data.password)
    return user
  }
}
