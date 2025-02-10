import { Exception } from '@adonisjs/core/exceptions'
import UserQuery from './user_query.js'

export default class Userservice {
  private userQuery: UserQuery
  constructor() {
    this.userQuery = new UserQuery()
  }
  async login(data: { username: string; password: string }) {
    const username = await this.userQuery.getUsernameQuery(data)
    if (!username) {
      throw new Exception('User not found')
    }
    const passwordMatch = await this.userQuery.getPasswordQuery(data)
    if (passwordMatch !== data.password) {
      throw new Exception('Invalid password')
    }
    return data
  }

  async register(data: { username: string; email: string; password: string }) {
    const userAlreadyRegistered = await this.userQuery.getUsernameQuery(data)
    if (userAlreadyRegistered) {
      throw new Exception('User already registered')
    }
    return await this.userQuery.RegisterQuery(data)
  }

  async getUsersWithMostPostCount() {
    const users = await this.userQuery.getUsersWithMostPostCountQuery()
    return users
  }
}
