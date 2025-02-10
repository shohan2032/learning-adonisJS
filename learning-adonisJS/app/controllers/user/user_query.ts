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

  public async getUsersWithMostPostCountQuery() {
    // const users = User.query()
    //   .select('users.id', 'users.username')
    //   .leftJoin('posts', 'users.id', 'posts.user_id')
    //   .groupBy('users.id', 'users.username')
    //   .countDistinct('posts.id as total_posts')
    //   .orderBy('total_posts', 'desc')
    //   .pojo()
    const users = await User.query()
      .select('id', 'username')
      .withCount('posts')
      .orderBy('posts_count', 'desc')
    return users
  }
}
