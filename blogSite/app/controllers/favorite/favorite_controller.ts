import FavoriteService from './favorite_service.js'
import {
  AddFavoriteValidator,
  RemoveFavoriteValidator,
  GetHasFavoriteValidator,
} from './favorite_validator.js'

import { HttpContext } from '@adonisjs/core/http'

export default class FavoriteController {
  private favoriteService: FavoriteService
  constructor() {
    this.favoriteService = new FavoriteService()
  }
  public async addFavorite({ request, response }: HttpContext) {
    const payload = await request.validateUsing(AddFavoriteValidator)
    await this.favoriteService.addFavorite(payload.user_id, payload.blog_id)
    return response.ok({ message: 'Favorite added successfully' })
  }
  public async removeFavorite({ request, response }: HttpContext) {
    const payload = await request.validateUsing(RemoveFavoriteValidator)
    const removeStatus = await this.favoriteService.removeFavorite(payload.user_id, payload.blog_id)
    if (!removeStatus) {
      return response.notFound({ message: 'Favorite not found' })
    }
    return response.ok({ message: 'Favorite removed successfully' })
  }
  public async getHasFavorite({ response, request }: HttpContext) {
    const payload = await request.validateUsing(GetHasFavoriteValidator)
    const hasFavorite = await this.favoriteService.getHasFavorite(payload.user_id, payload.blog_id)
    return response.ok({ hasFavorite })
  }
}
