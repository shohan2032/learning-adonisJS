import UserQuery from './user_query.js'

export default class Userservice {
  private userQuery: UserQuery
  constructor() {
    this.userQuery = new UserQuery()
  }
  async login(data: { email: string; password: string }) {
    const { password } = data
    console.log(password)
    return await this.userQuery.LoginQuery(data)
  }
}
