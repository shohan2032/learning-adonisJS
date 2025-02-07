import User from '#models/user'

export default class UserQuery {
  public async LoginQuery(data: { email: string; password: string }) {
    console.log(data.email, data.password)
    return User.query()
  }
}
