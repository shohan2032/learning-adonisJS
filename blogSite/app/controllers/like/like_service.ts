import LikeQuery from './like_query.js'

export default class LikeService {
  private likeQuery: LikeQuery
  constructor() {
    this.likeQuery = new LikeQuery()
  }
  async addLike(user_id: number, blog_id: number) {
    return await this.likeQuery.addLike(user_id, blog_id)
  }
  async removeLike(user_id: number, blog_id: number) {
    return await this.likeQuery.removeLike(user_id, blog_id)
  }
  async getHasLiked(user_id: number, blog_id: number) {
    return await this.likeQuery.getHasLiked(user_id, blog_id)
  }
}
