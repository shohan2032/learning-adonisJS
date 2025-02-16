import Favorite from '#models/favorite'
export default class FavoriteQuery {
  public async addFavorite(userId: number, blogId: number) {
    return await Favorite.create({ user_id: userId, blog_id: blogId })
  }

  public async removeFavorite(user_id: number, blog_id: number) {
    const favorite = await Favorite.query().where({ user_id, blog_id }).first()
    if (!favorite) return false
    await favorite.delete()
    return favorite
  }
  public async getHasFavorite(user_id: number, blog_id: number) {
    const favorite = await Favorite.query().where({ user_id, blog_id }).first()
    return favorite ? true : false
  }
}
