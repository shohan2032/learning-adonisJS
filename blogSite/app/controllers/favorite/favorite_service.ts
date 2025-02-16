import FavoriteQuery from './favorite_query.js'

export default class FavoriteService {
  private favoriteQuery: FavoriteQuery
  constructor() {
    this.favoriteQuery = new FavoriteQuery()
  }
  async addFavorite(user_id: number, blog_id: number) {
    return await this.favoriteQuery.addFavorite(user_id, blog_id)
  }
  async removeFavorite(user_id: number, blog_id: number) {
    return await this.favoriteQuery.removeFavorite(user_id, blog_id)
  }
  async getHasFavorite(user_id: number, blog_id: number) {
    return await this.favoriteQuery.getHasFavorite(user_id, blog_id)
  }
}
