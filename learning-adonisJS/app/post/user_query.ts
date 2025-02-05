import User from '#models/user'

export default class UserQuery {
  public async LoginQuery(data: { email: string; password: string }) {
    const { email } = data
    const user = await User.query().where('email', email).first()
    return user
  }
}
