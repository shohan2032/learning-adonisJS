import User from '#models/user'

export default class AuthQuery {
  public async getUserByUsername(username: string) {
    return await User.findBy('username', username)
  }
  public async registerUser(username: string, password: string) {
    return await User.create({ username, password })
  }
  public async getVerifiedUser(username: string, password: string) {
    const user = await User.verifyCredentials(username, password)
    // console.log(user)
    return user
  }
}
