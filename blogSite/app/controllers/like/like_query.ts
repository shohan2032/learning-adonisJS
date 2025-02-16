import Like from '#models/like'

export default class LikeQuery {
  public async addLike(user_id: number, blog_id: number) {
    return await Like.create({ user_id, blog_id })
  }
  public async removeLike(user_id: number, blog_id: number) {
    const like = await Like.query().where({ user_id, blog_id }).first()
    // console.log(like)
    if (!like) return false
    await like.delete()
    return like
  }
  public async getHasLiked(user_id: number, blog_id: number) {
    const like = await Like.query().where({ user_id, blog_id }).first()
    return like ? true : false
  }
  public async getLastTenLikedBlogsByUserId(user_id: number) {
    return await Like.query()
      .where('user_id', user_id)
      .preload('blog', (query) => {
        query.select(
          'id',
          'title',
          'author_id',
          'author_name',
          'image_url',
          'estimate_reading_time'
        )
      })
      .orderBy('created_at', 'desc')
      .limit(10)
  }
}
