import { Exception } from '@adonisjs/core/exceptions'
import UserQuery from './user_query.js'
import hash from '@adonisjs/core/services/hash'

export default class Userservice {
  private userQuery: UserQuery
  constructor() {
    this.userQuery = new UserQuery()
  }
  async login(data: { email: string; password: string }) {
    const { password } = data
    const user = await this.userQuery.LoginQuery(data)
    if (!user) {
      throw new Exception('User not found', { status: 404, code: 'INVALID_REQUEST' })
    }
    const validate = await hash.verify(password, user?.password)
    if (!validate) {
      throw new Exception('Invalid credentials', { status: 401, code: 'INVALID_REQUEST' })
    }
    return user
  }
}
