import Post from '#models/post'

export default class PostQuery {
  public async CreatePost(data: { user_id: number; content: string }) {
    return await Post.create(data)
  }
  public async GetAllPosts() {
    // return Post.all()
    return Post.query().paginate(1, 5)
  }
  public async GetPostsByUserId(userId: number) {
    return Post.query().where('user_id', userId)
  }

  public async GetPostByPostId(postId: number) {
    return Post.query().where('id', postId)
  }

  public async UpdatePost(data: { id: number; content: string }) {
    const post = await Post.findBy('id', data.id)
    if (!post) {
      throw new Error('Post not found')
    }
    post.content = data.content
    await post.save()
    return post
  }

  public async DeletePost(data: { id: number }) {
    const post = await Post.findBy('id', data.id)
    if (post) {
      await post.delete()
      return { message: 'Post deleted successfully' }
    }
  }
}
