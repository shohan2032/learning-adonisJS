import User from '#models/user'

export default class UserQuery {
  public async getPasswordQuery(data: { username: string; password: string }) {
    const user = await User.findBy('username', data.username)
    if (user) {
      return user.password
    }
    return null
  }
  public async getUsernameQuery(data: { username: string }) {
    return await User.findBy('username', data.username)
  }
  public async RegisterQuery(data: { username: string; email: string; password: string }) {
    return await User.create(data)
  }
}
