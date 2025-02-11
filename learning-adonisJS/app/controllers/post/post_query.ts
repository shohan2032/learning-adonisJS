import Post from '#models/post'
export default class PostQuery {
  public async CreatePost(data: { user_id: number; content: string }) {
    return await Post.create(data)
  }
  public async GetAllPosts() {
    // return Post.all()
    return await Post.query().paginate(1, 5)
  }
  public async GetPostsWithStats() {
    const posts = await Post.query()
      // .select('id', 'content', 'user_id')
      .preload('user', (query) => {
        query.select('id', 'username')
      })
      .withCount('reactions', (query) => {
        query.where('entity_type', 'post').as('total_reactions')
      })
      .withCount('comments', (query) => {
        query.as('total_comments')
      })
    return posts
  }
  public async GetPostsByUserId(userId: number) {
    return await Post.query().where('user_id', userId)
  }

  public async GetPostByPostId(postId: number) {
    return await Post.query().where('id', postId).first()
  }

  public async UpdatePost(id: number, content: string) {
    // this one is not recommended by lucid documentation
    // return await Post.query().update({ content: data.content }).where('id', data.id)
    const post = await Post.findOrFail(id)
    post.content = content
    await post.save()
    return post
  }

  public async DeletePost(data: { id: number }) {
    const post = await Post.findOrFail(data.id)
    await post.delete()
    return { message: 'Post deleted successfully' }
  }
}
