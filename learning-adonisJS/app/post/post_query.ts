import Post from '#models/post'

export default class PostQuery {
  public async GetAllPosts() {
    return Post.all()
  }
  public async GetPostsByUserId(userId: number) {
    return Post.query().where('user_id', userId)
  }
}
