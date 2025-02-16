import LikeService from './like_service.js'
import { AddLikeValidator, RemoveLikeValidator, GetHasLikedValidator } from './like_validator.js'
import { HttpContext } from '@adonisjs/core/http'

export default class LikeController {
  private likeService: LikeService
  constructor() {
    this.likeService = new LikeService()
  }
  public async addLike({ response, request }: HttpContext) {
    const payload = await request.validateUsing(AddLikeValidator)
    await this.likeService.addLike(payload.user_id, payload.blog_id)
    return response.ok({ message: 'Like added successfully' })
  }
  public async removeLike({ response, request }: HttpContext) {
    const payload = await request.validateUsing(RemoveLikeValidator)
    const removeStatus = await this.likeService.removeLike(payload.user_id, payload.blog_id)
    // console.log(removeStatus)
    if (!removeStatus) return response.notFound({ message: 'Like not found' })
    return response.ok({ message: 'Like removed successfully' })
  }
  public async getHasLiked({ response, request }: HttpContext) {
    const payload = await request.validateUsing(GetHasLikedValidator)
    const hasLiked = await this.likeService.getHasLiked(payload.user_id, payload.blog_id)
    return response.ok({ hasLiked })
  }
}
