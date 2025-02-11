import { HttpContext } from '@adonisjs/core/http'
import { CreateReactionValidator, DeleteReactionValidator } from './reaction_validator.js'
import ReactionService from './reaction_service.js'

export default class ReactionController {
  private reactionService: ReactionService
  constructor() {
    this.reactionService = new ReactionService()
  }
  public async createReaction(ctx: HttpContext) {
    const payload = await ctx.request.validateUsing(CreateReactionValidator)
    return this.reactionService.createReaction(
      payload.user_id,
      payload.entity_id,
      payload.entity_type as 'post' | 'comment' | 'reply',
      payload.reaction_type as 'like' | 'love' | 'haha' | 'wow' | 'sad' | 'angry'
    )
  }
  public async deleteReaction(ctx: HttpContext) {
    const payload = await ctx.request.validateUsing(DeleteReactionValidator)
    return this.reactionService.deleteReaction(payload.id, payload.user_id)
  }
}
